---
title: "Neuland CTF 2023 Winter - Open Source Intelligence"
authors: ["Neuland CTF Orga"]
date: 2023-12-09T21:00
published: true
tags:
- CTF
- Writeup
- Cybersecurity
---

</br>

Download challenges: [Neuland CTF Repository](https://github.com/neuland-ingolstadt/Neuland-CTF-2023-Winter)

</br>

## Geoguessr - Easy
*Can you find out which mountains I vacationed in last year?*</br>

*Flag format: nland{name of mountainous area} in all lowercase*

![](../src/blog/images/neuland-ctf-12-2023/Geoguessr.webp)

</br>

We get an image of a mountain range with no apparent clues. A good starting point for this type of task is [Google Images](https://images.google.de/). Images refers us to Besseggen, a piece of the Jotunheimen mountain range in Norway.

The flag is `nland{besseggen}` or `nland{jotunheimen}`.

<br>

## For old times sake - Easy
*What did the yellow dot on the Google front page draw on the window on Christmas 2016?*</br>

*Flag format: nland{\<drawing\>} in all lowercase*

For tasks that require web content at an earlier stage, the [Wayback Machine](https://web.archive.org/web/20161224150735/https://www.google.de/) is a good place to start. If we select the web address of Google on 24.13.2016, we can see that a star is drawn on the glass.

The flag is `nland{star}`.

<br>

## Dail in - Hard
*We are looking for one of the accomplices of the well-known group @0xc0c0c0ctf, which has been involved in multiple Bitcoin scams. We know that they talk to each other regularly on the phone. Find his phone number.*</br>

*Flag format: nland{\<phone number\>}*

</br>

The challenge already tells us the hacker group's name, which is why we can easily search for their social media presence. An automatic [Social Media Handle Checker](https://brandsnag.com/social-media-handle-checker) can quickly search for accounts on multiple platforms. Our hacker group has a Twitter account whose content matches their area of interest, Bitcoin. After a few dead ends and detours to Ethereum and Reddit, we came across a [video](https://twitter.com/0xc0c0c0ctf/status/1688861202397405184) in which a telephone keypad can be heard in addition to office noises. The sounds resemble DTMF (dual-tone multi-frequency signaling), a dialing technique commonly used in analog telephone technology. We remember that in some posts, it is mentioned that the hacker group does not trust any modern technology except the blockchain and does everything as analog as possible to avoid being caught. And we were right; an online [DTMF button key decoder](https://unframework.github.io/dtmf-detect/) spits out a phone number.

The flag is `nland{00133731415}`.

<br>

## Traveler - Medium
Author: [Fabi](https://github.com/fabifighter007)</br>

*Look what I have found: https://www.youtube.com/watch?v=_fMYrE9Qn7E*<br>

*Can you provide me the destination land of the trip and his home adress?*

<br>

*Please submit the flag in the following format:*
<br>
*nland{destination_home-zip-code_home-street}*
<br>
*Example: nland{Denmark_85049_Esplanade}*

<br>

The video contains photos of a trip. By using Google Lens it becomes clear that the building is the "Basilica Cathedral of Arequipa" and which is located in Arequipa, Peru. 

<br>

![](../src/blog/images/neuland-ctf-12-2023/traveler_1.webp)

<br>

This means that we have already solved the first part of the challenge. Next, we need the location of the person who published the video. At the end of the video, you can see a laptop that is apparently at home on his balcony:

<br>

![](../src/blog/images/neuland-ctf-12-2023/traveler_2.webp)

<br>

Within the last photo, we see SSIDs of nearby WLAN networks. By using [WIGLE](https://wigle.net/), it is possible to map SSIDs to exact locations. To do this, we search for a uncommon WLAN network name and are thus able to determine the location:

<br>

![](../src/blog/images/neuland-ctf-12-2023/traveler_3.webp)

<br>

![](../src/blog/images/neuland-ctf-12-2023/traveler_4.webp)

<br>

The flag is ```nland{Peru_12055_Kirchhofstraße}```
