---
title: "Neuland CTF 2022 Winter - Cryptography"
authors: ["0xFFD700", "manuv"]
date: 2022-12-07T18:00
published: true
tags:
- ctf
- writeup
- security
- cyber
- cybersecurity
---

## Bitwise operator - Easy

*The key to happiness is love.*
```
`bo`juc:7?m:?Q6?9y?;=Q>~=<:9><s.
```

</br>

The headline already implies that it is a bitwise encryption. The description gives the next hint that the key is love. With this information, the most likely cipher is XOR. With the [CyberChef](https://gchq.github.io/CyberChef/#recipe=XOR(%7B'option':'Hex','string':'love'%7D,'Standard',false)&input=YGJvYGp1Yzo3P206P1E2Pzl5Pzs9UT5%2BPTw6OT48cy4) XOR function the string can be decrypted.

The flag is `nland{m491c41_817w153_0p324702}`.

</br>

## Black box - Medium

*My friend gave me a black box to communicate.*

![](../src/blog/images/neuland-ctf-12-2022/blackbox.webp)

</br>

On the side of the black box is a translucent opening behind which a LED flashes. If you decode the irregular flashing according to the international Morse code you get the flag.

```
s   ...
a   .-
m   --
```

The flag is `nland{sam}`.

</br>

## RSA - Medium

*Can you help decrypt the message?*

</br>

```
c: 207557546560859169576945127953007210120874560172495774733332113176052380374259008176000473940275124997746175571544779705475479684555026646029009
e: 65537
n: 398777541563043737059353117039052367438379031798809882266113550550889422915327876451213155884493233655798282644321599384995454457054595596193529
```

</br>

There was a similar task last semester. This time the title already reveals that it is an RSA challenge. Since n is a relatively small number, we have a good chance of finding its two prime factors.
[FactorDB](http://factordb.com/index.php?id=1100000003935143215) has the factors which are q = 9058385098643201 and p = 44023028080664636076928415706635475780415467068429427621606805998837244807327108600025160059258108909394857318936421945725300729.
We know n, e, q and p which can be used to decrypt the message.
Let's take a closer look at how RSA works.

### Key Generation:
1. Select  p,q (prime numbers and p!=q)
2. Calculate n = p * q
3. Calculate phi(n) = ( p - 1 ) * ( q - 1 )
4. Select integer e       GCD ( ϕ(n) , e ) = 1; 1 < e < ϕ(n)
5. Calculate d = inverse(e) % ϕ(n)
6. Public Key {e,n}
7. Private Key {d,n}

### Encryption: 
C = pow( M , e) % n

### Decryption:
M = pow(C , d) % n

### Python script:

```
from Crypto.Util.number import *

q = 9058385098643201
p = 44023028080664636076928415706635475780415467068429427621606805998837244807327108600025160059258108909394857318936421945725300729
n = 398777541563043737059353117039052367438379031798809882266113550550889422915327876451213155884493233655798282644321599384995454457054595596193529
c = 207557546560859169576945127953007210120874560172495774733332113176052380374259008176000473940275124997746175571544779705475479684555026646029009
e = 65537

# decrypt
d = inverse(e,(p-1)*(q-1))
m = pow(c,d,p*q)
print("Message: ", long_to_bytes(m))
```

The flag is `nland{7h15_15_f1n3}`.

<br>

## Truly magical operator - Medium

*This time it won't be as easy. Can you figure out the key yourself?*

```
") %!?|-l%ui}rlzpi>v7x7q}'-x8
```

</br>

We can quickly see that this is a XOR encryption again by looking at the provided encrypt.py. The python script also tells us that the decrypted plaintext will contain "nland{" at the start. The key we are looking for is 6 characters long and only contains letters. 
We know that XOR is reversible. We can use this to our advantage. As we know that the flag will start with "nland{" we can find the first 6 characters of the key with [CyberChef](https://gchq.github.io/CyberChef/#recipe=XOR(%7B'option':'UTF8','string':'nland%7B'%7D,'Standard',false)&input=IikgJSE/fC1sJXVpfXJsenBpPnY3eDdxfScteDg). Now we leaked the 6 characters of our key: "LEAKED". If we try this as the key, we can retrieve the flag [CyberChef](https://gchq.github.io/CyberChef/#recipe=XOR(%7B'option':'UTF8','string':'LEAKED'%7D,'Standard',false)&input=IikgJSE/fC1sJXVpfXJsenBpPnY3eDdxfScteDg).

The flag is `nland{0h-n0-17-15-r3v3r51bl3}`.
