---
title: "Neuland CTF 2022 Winter - Open Source Intelligence"
authors: ["0xFFD700", "manuv"]
date: 2022-12-07T18:03
published: true
tags:
- CTF
- Writeup
- Cybersecurity
---

## Finders keepers - Easy

*Can you find the missing person?*
*Flag format nland{<first name\>_<last name\>} in all lowercase*

![](../src/blog/images/neuland-ctf-12-2022/lost_person.webp)

</br>

An efficient way to find the origin of images on the Internet is Google Images. We upload the image and find out the person it Hugh Herr.

![](../src/blog/images/neuland-ctf-12-2022/Solution.webp)

</br>

The flag is `nland{hugh_herr}`.

</br>

## Time Machine - Easy

*A few weeks ago I accidentally inserted a flag while updating the website, but then immediately fixed the error. 
Can you still find it?*

*https://ctf.neuland-ingolstadt.de/*

</br>

The wayback machine is an internet archive that maps websites and other media and makes these old versions accessible to users. If we search for the [url in the Waybackmachine](https://web.archive.org/web/20221024120345/https://ctf.neuland-ingolstadt.de/) we find an image from 24 October 2022.

![](../src/blog/images/neuland-ctf-12-2022/wayback.webp)

</br>

The flag is `nland{7h3_1n732n37_n3v32_f029375}`.

<br>

## Lost connection - Medium

*One of our Neuland members went on a trip to London. I tried to call her a few days ago but she didn't pick up. I am a bit worried as she missed our last meeting as well and we haven't heard back from her.*

<br>

*Can you find out what happened? Here is here email address as the phone number isn't of much use: elisabeth.hacker1337@gmail.com*

<br>

*It would be great if you could tell me the name of the city she is currently in.*

*Flag format: nland{City-name}*

<br>

The only useful information we get from the task description is a Gmail address: elisabeth.hacker1337@gmail.com. We are tasked to find the most recent location of a person. The flag is the city name the person was last in. 

<br>

Some research on the topic "OSINT" and "Gmail" will reveal the concept of Google IDs. There are several ways to obtain the corresponding Google ID for a Gmail address. You can use G-Hunt or websites like [Epieos](https://epieos.com/) or [Identificator](https://identificator.space/search) to obtain the Google ID. 

<br>

The Google ID of Elisabeth Hacker is `114037517009879435623`. The Google ID can be used to access the information of several Google products that are connected to it. As we are looking for a location we will start of with Google Maps. 
The following link can be used to view the Google Maps contributions, reviews and photos of the person with the specified Google ID: https://www.google.com/maps/contrib/google-id 

<br>

[Here](https://www.google.com/maps/contrib/114037517009879435623/) we can see that she posted a photo at Western Computer in Oxford. It seems like she had troubles with her old phone and had to buy a new one. This explains why we weren't able to contact here.

![](../src/blog/images/neuland-ctf-12-2022/google_maps_contrib.webp)

The flag is `nland{Oxford}`.

<br>

## Schnitzeljagd im Görli -Medium

*Let's go! →→→↓ 0x60B268593E71E3ADa6Dc33982d9b2bEBB38C65C1*
*Tipps: We missed the tree by a hair's breadth! Bounds-Checking is essential work.*

</br>

- Ethereum transactions with associated call data
- Following the transactions results in a tree
- Leaves of the tree contain data ("RIVING" or sign of the flag)
- Breadth-first search on the tree yields the flag

95 transactions in total, over 96 accounts. Possible manually, but much faster via script - web3py or similar.

[Jupyter Notebooks Solution](https://github.com/neuland-ingolstadt/Neuland-CTF-2022-Winter/blob/main/CTF%20Aufgaben/OSINT/Schnitzeljagd%20-%20Medium/solution.ipynb)

The flag is `nland{h4ppy_tree_friend}`.

<br>

## Polyglot - Hard

*I received an anonymous, mysterious letter. It told me to look for a Polyglot on my way to find the flag. It also mentioned the following email address: friedrichvonhacker@gmail.com.*

<br>

*I have no idea where to start. Can you help me?*

<br>

We will start the challenge with only an email address again. The information from the Google account won't help us this time. There are other ways to perform email OSINT. [Holehe](https://github.com/megadose/holehe) is one of these tools. It allows you to efficiently find the registered accounts from an email address. The output for the provided email looks like this:

![](../src/blog/images/neuland-ctf-12-2022/output_holehe_scan.webp)

This is just a snippet from the output but Twitter is the only website we have a hit. So we head over to Twitter and find the account assigned to the email address `friedrichvonhacker@gmail.com`. Searching for persons with the name `Friedrich von Hacker` we will find [this Twitter account](https://twitter.com/FriedrichHacker). There are quite a few hints that we can find here. The oldest post does show a PC setup. 

![](../src/blog/images/neuland-ctf-12-2022/setup.webp)

The password `supersecret` is written on a paper that is on the desk. The Twitter account of `David Buchanan` is open on the main monitor. The challenge description tells us to look for a Polyglot on the way to find the flag. Polyglot in this context does not refer to the term multilingualism as the second post from `Friedrich von Hacker` might suggest. In computing, a polyglot is a computer program or script written in a valid form of multiple programming languages or file formats. By looking at the [Twitter profile of David Buchanan](https://twitter.com/David3141593) or by searching for `David Buchanan polyglot` you will find [this GitHub repository](https://github.com/DavidBuchanan314/tweetable-polyglot-png). The script allows one to generate a polyglot that can be uploaded to Twitter. As described on the GitHub and in the tweets of David Buchanan we will download the picture form the latest post from `Friedrich von Hacker`. Make sure to download the full sized image. We will end up with this image:

![](../src/blog/images/neuland-ctf-12-2022/polyglot.webp)

We can change the file extension to `.zip` after we downloaded the file and can try to unzip the [archive](https://github.com/neuland-ingolstadt/Neuland-CTF-2022-Winter/blob/main/CTF%20Aufgaben/OSINT/Polyglot%20-%20Hard/Private/polyglot.zip). It contains the file `flag.txt`. We have to provide a password to unzip the archive. The password `supersecret` that we found earlier will do the job.

The flag is `nland{h0w_d1d_7h15_3nd_up_1n_h3r3?}`.
