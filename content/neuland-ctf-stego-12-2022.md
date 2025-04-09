---
title: "Neuland CTF 2022 Winter - Steganography"
authors: ["0xFFD700", "manuv"]
date: 2022-12-07T18:06
published: true
tags:
- ctf
- writeup
- security
- cyber
- cybersecurity
---

## Meta - Easy

![](../src/blog/images/neuland-ctf-12-2022/nature.webp)

</br>

The flag is hidden in the exif tag artist. This can be read using the strings or exif command.

![](../src/blog/images/neuland-ctf-12-2022/strings.webp)

</br>

![](../src/blog/images/neuland-ctf-12-2022/exif.webp)

</br>

The flag is `nland{w32_h47_un5_v322473n_m374d473n}`.

</br>

## Quick response - Easy

*The flag is hidden in the text file.*

<br>

[quick_response.txt](/files/neuland-ctf-12-2022/quick_response.txt)

<br>

QR code stands for quick response code. That is what the challenge aims for. The text file contains unicode characters that will form a QR code with the right line wrap. Find an editor or a terminal that allows you to adjust the line wrap and play a bit around until you are left with a scannable QR code. The result will look like this:

![](../src/blog/images/neuland-ctf-12-2022/qr_code.webp)

Scan the QR code and you get the flag.

The flag is `nland{un1c0d3_4r7_15_fun}`.

<br>

## Color - Medium
*Can you find the hidden message?*

![](../src/blog/images/neuland-ctf-12-2022/color.webp)

</br>

In the image we can see the outlines of circles and stars that look suspiciously like a QR code. The special thing about QR Codes is that they contain a lot of redundancy and error-handling, so changing shapes does not affect functionality. If we change the color of the outer area to white, we get a scannable QR code containing the flag.

</br>

![](../src/blog/images/neuland-ctf-12-2022/QR-Scan.webp)

</br>

The flag is `nland{411_814ck_3v32y7h1n9}`.

<br>

## Moon transmission - Medium

*I received this transmission from our moon station. The result looks odd. The technology we use for the transmissions is pretty old. It was already used back in the days. It's probably just a disturbance. It has been a long shift for me. So it might as well be me and I did something wrong while decoding. Can you have a look as well and tell me whats wrong with it? Something is out of place.*

*Submit your answer in lowercase and wrapped in nland{}.*

*Please avoid playing the audio over and over again. It gets a bit annoying. There is a way to get the answer without playing the audio*

<br>

[transmission.wav](https://github.com/neuland-ingolstadt/Neuland-CTF-2022-Winter/blob/ced4cc975bdbe9e96325c74e69775142f68267f6/CTF%20Aufgaben/Stego/Moon%20transmission%20-%20Medium/Public/transmission.wav)

<br>

Slow Scan TeleVision (SSTV) was used for the transmission. The technology was already used to transmit the footage of the Apollo 11 moon mission. There are a few tools to decode SSTV. Don't worry, the websites are mostly pretty old as well and will look a bit sketchy. There are different SSTV modes. Most tools will allow you to automatically detect the mode so you don't have to worry about it. RX-SSTV for example can be used to decode the WAV file. However, you will have to input the audio through your microphone. This gets a bit annoying if everyone plays the audio. The resulting image also won't have the best qualitity and you will have a hard time to understand the image if there is background noise. Below is the result from RX-SSTV:

![](../src/blog/images/neuland-ctf-12-2022/decode_rxsstv.webp)

The better option is to use this [command line tool](https://github.com/colaclanth/sstv) for example. It allows you to specify the WAV file and simply outputs the image. 

```
$ sstv -d ~/Downloads/transmission.wav -o test.webp
[sstv] Searching for calibration header... Found!    
[sstv] Detected SSTV mode Robot 36
[sstv] Decoding image...   [#####################################################################]  99%
[sstv] Reached end of audio whilst decoding.
[sstv] Drawing image data...
[sstv] ...Done!
```

The result looks like this:

![](../src/blog/images/neuland-ctf-12-2022/decode_cli_sstv.webp)

We can clearly see that the dog is out of place.

The flag is `nland{dog}`.

<br>

## Trust issues - Hard

*You might have trust issues after you worked on this challenge. I do not take any responsibility for that.*

*Nothing is like it seems.*

<br>

[dog.webp](../src/blog/images/neuland-ctf-12-2022/dog.webp)

<br>

You will start the challenge with this cute picture of a dog. 

![](../src/blog/images/neuland-ctf-12-2022/dog.webp)

The standard tools `file`, `exiftools` won't return anything usefull. `Binwalk` and `foremost` will show you that there is a zip file inside the picture. However, they can not extract the zip file correctly as it will be broken. If you finished the OSINT challenge `Polyglot` already or if you have heard about polyglots, you might have another guess here.
Polyglot in this context does not refer to the term multilingualism as you might think. In computing, a polyglot is a computer program or script written in a valid form of multiple programming languages or file formats. `David Buchanan` wrote a script which allows you to combine a zip file with an image and the result will be both a valid image and a zip file. [This](https://github.com/DavidBuchanan314/tweetable-polyglot-png) is the link to his GitHub repository. Simply changing the file extension to `.zip` will do the trick and we have a valid zip file. The zip file contains one file called `secret.mp3`. The archive is password protected. There are no hints to guess the password. We will have to start brute forcing. `Fcrackzip` won't work here as it does not recognice the polyglot zip file as a valid zip. We can use `John` to crack the zip.

```
zip2john dog.zip > hash.txt
```

```
john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
```

The password is `ITRUSTNO1`. 

<br>

Now we can extract the `secret.mp3`. It is not a valid mp3. Opening `secret.mp3` in a hexeditor we can see that the first bytes are set to zero followed by the hex representation of JFIF. 

![](../src/blog/images/neuland-ctf-12-2022/hexeditor.webp)

This leads to the assumption that this should be a JPG file. We can replace the 0s at the start of the file with the magic bytes of a JPG file: `FF D8 FF E0`. Then we can rename the file extension to jpg. Once we are done with all of that we are presented with another image:

![](../src/blog/images/neuland-ctf-12-2022/this_is_fine.webp)

The flag is `nland{b3_r3luc74n7_70_7ru57}`.
