---
title: "Neuland CTF 2023 Winter - Blue Team"
authors: ["Neuland CTF Orga"]
description: "Neuland CTF 2023 Winter Writeups"
date: 2023-12-09T21:00
published: true
tags:
- ctf
- writeup
- security
- cyber
- cybersecurity
---

</br>

Download challenges: [Neuland CTF Repository](https://github.com/neuland-ingolstadt/Neuland-CTF-2023-Winter)

</br>

## Accounting - Easy
*An employee from the finance department downloaded an accounting template from the Internet; now he is writing an e-mail to the helpdesk that his computer is behaving strangely.*

[Abrechnung_2023.xlsm](/files/neuland-ctf-12-2023/Abrechnung_2023.xlsm)

</br>

We receive an Excel file with a seemingly ordinary payroll table that prompts us to activate macros. After activating macros, multiple notepads open with the text "Hacked!!!". The hacker used the VBA macros to take over our computer. This is fine. We can look closer at the code used via the developer tools.

```
Private Sub Workbook_Open()
Dim z8a9fa09fd5f8180f361a949fb207feea As Integer
For z8a9fa09fd5f8180f361a949fb207feea = 0 To 5
n6df744f79d2e0f38bd80503af826d2c6 = Shell("Notepad", vbNormalFocus)
SendKeys "Hacked!!!", True
Next z8a9fa09fd5f8180f361a949fb207feea
Dim objUserEnvVars As Object
Set objUserEnvVars = CreateObject("WScript.Shell").Environment("User")
objUserEnvVars.Item("YOU_GOT_PWNED_NEULAND") = Range("X117").Value + Range("F153").Value + Range("AI254").Value + Range("B749").Value
For z8a9fa09fd5f8180f361a949fb207feea = 0 To 5
n6df744f79d2e0f38bd80503af826d2c6 = Shell("Notepad", vbNormalFocus)
SendKeys "Hacked!!!", True
Next z8a9fa09fd5f8180f361a949fb207feea
End Sub
```

Since none of the Notepads contain the flag, we'll focus on line 7 and beyond. Here an ***objUserEnvVars*** is created to manage user environment variables. In the following line, we get the value from different cells and save them in the environment variable ***YOU_GOT_PWNED_NEULAND***. If we take a closer look at these cells in the Excel file, we see that they contain text hidden by the white text color. You get the flag if you put all the cells together or look at the newly created environment variable.

The flag is `nland{D4s_H4b3n_W1R_s0_pR09r4MM13Rt,_1n_3xc3L}`.

</br>

## Broken File - Easy
Author: [Kevin](https://github.com/k-gomez) </br>

*This file is broken. Can you find out what was used to "create" it?*</br>

*Flag format: nland{\<your-input-without-spaces\>}*

[broken.zip](/files/neuland-ctf-12-2023/broken.zip)

</br>

Run ***strings*** on it to find various metadata. This is a ***.mov*** file where the header is corrupted (Broken File - Medium). However, the strings indicate that it was recorded with an iPhone 13 mini.

The flag is `nland{iPhone13mini}`.

</br>

## Bad Ducky - Easy
*You found a USB stick on the floor, of course you plug it into your private computer. What was the previous owner up to?*

</br>

To solve the problem, we received a black USB stick with no external peculiarities. After plugging it into a computer, the USB stick mounts with the meaningless name "Generic Flash Disk USB Drive". There is a file in which the BSI describes the correct handling of removable storage devices. No further data can be found even after activating hidden files in the Windows Explorer. After a few attempts to examine the file, it turns out it is a dead end and does not contain the flag. However, one passage from the directive is interesting.

![](../../src/blog/images/neuland-ctf-12-2023/BSI.png)

As long as deleted data has not been overwritten, it can be restored. A free online tool like [Disk Drill Data Recovery](https://www.cleverfiles.com/disk-drill-win.html) can make the files visible. And we were right; the previous owner deleted a file named after the flag.

![](../../src/blog/images/neuland-ctf-12-2023/disk_drill.png)

The flag is `nland{Wer_hat_uns_verraten?_Metadaten!}`.

</br>

## Broken File - Medium
Author: [Kevin](https://github.com/k-gomez)</br>

*Get the file from the challenge "Broken File - Easy" and reconstruct it.*

[broken.zip](/files/neuland-ctf-12-2023/broken.zip)

</br>

The challenge "Broken File - Easy" already indicated that this is a video format. However, the header was modified. This is a ***.mov*** file (can be idientified through the strings).

A ***.mov*** file has it's magic bytes at byte 4. Those are ***66 74 79 70 71 74 20 20***. Those were removed from the file. However, this is not the core part that is missing. Various blog posts and the .mov standard references the ***MOOV*** atom. This atom is missing too. The exact position of the atom is not standardized. Nevertheless, a hexdump indicates the bytes ***DE AD BE EF***. This is the position where the ***MOOV*** atom is missing. Therefore, the bytes ***6D 6F 6F 76*** (***MOOV*** in ASCII) must be added.

Interesting detail: most video players don't care about the magic bytes. They just need the MOOV atom.

</br>

The flag is `nland{1_l1k3_f1l3h34d3Rs}`.

</br>

## Malware Beaconing - Medium
*Malware beaconing is a C2 technique to establish continuous communication between malware and a server controlled by the attacker. Find the host infected with malware.*</br>

*Flag format: nland{\<IP\>}*

[traffic.zip](/files/neuland-ctf-12-2023/traffic.zip)

</br>

To solve the task, we receive a CSV file that contains network traffic from the internal company network to websites. To solve the problem, we should first take a closer look at what properties malware beaconing has. Malware beaconing is a C2 technique to establish continuous communication between malware and a server the attacker controls. The attacker uses the server to share commands to control the malware individually at any time after the initial infection and to exfiltrate data from the host. Some of the most critical characteristics of malware beacons are described below.
- Communication occurs through common protocols such as Hypertext Transfer Protocol (HTTP), Hypertext Transfer Protocol Secure (HTTPS), Domain Name System (DNS), and Simple Mail Transfer Protocol (SMTP) to look like ordinary traffic and tunnel firewalls.
- Popular cloud services like Google Documents or Dropbox are used to evade restrictions.
- C2 communication can be encrypted with HTTPS, only leaving the traffic destination visible.
- Beacons communicate in regular intervals ranging from every few seconds to days.
- Most requests from the compromised system will include the same commands being transmitted, resulting in a similar packet size.
- To evade detection, malware beacon payloads can be encoded or encrypted.
- A jitter is often used to add randomness to the beaconing communication. The jitter is set to a time interval in which bounds the beacon generates a random time to request the next instruction.

### Domain Generation Algorithm (DGA)
A DGA is a function that generates new domains on demand. Since botnet malware needs a server to get commands from to work correctly, using only one fixed domain or IP is often too risky for the attacker. The domain or IP can be blocked or taken down when detected, bringing an entire botnet to a halt. We should look for websites with cheap top-level domains and random letter/number combinations.

### Traffic Information
This includes a high amount of HTTP POST requests. Malware beacons regularly check the C2 infrastructure and ask for new commands. Therefore, the devices are sorted and displayed according to the number of HTTP POST requests. The same applies to a high number of messages
with an HTTP 404 error code, meaning that a page or file was not found. For example, if a DGA  is used to generate the next C2 domain, it may already be owned or not set up yet, and the request returns an HTTP 404 response.

### Periodic-based Detection
Periodic-based detection focuses on detecting malware beacons. Since these queries contact the attacker via the C2 infrastructure at regular intervals, these signals can be recognized in the network logs. The difficulty lies in discerning C2 communications among the multitude of non-malicious network activities. There are different approaches, such as the recognition by Discrete Fourier Transforms, which can recognize multiple distinct period lengths in a given time series. Alternatively, calculating the signal-to-noise ratio that compares the level of a harmonic signal to the background noise and therefore recognizes the periodic malware beaconing as a signal. The advantage of this approach
is that even unknown malware can be detected this way. However, attackers have also evolved and developed methods such as configuring a jitter to distort the regular queries. A jitter randomizes the time delta a beacon sleeps between contacting the C2 infrastructure. For example, a beacon is set to ask for new commands every 60 minutes. By adding a jitter of 50%, beaconing calls can now vary by up to 30 minutes. Interactions would occur within a time delta interval of 30 to 90 minutes.
This variance in timing makes detecting beacons more difficult since they are less predictable.

### Packet Size and Backdoor
With malware beaconing, numerous small packets are sent if the C2 infrastructure does not have new commands for the malware. A smaller data average additionally indicates malware beaconing since user traffic usually involves data-intensive pictures and media. A backdoor is the part of the malware that allows the attacker to gain access or control a system after infecting a device. In the case of malware with a beacon function, the backdoor is said to be activated when the C2 infrastructure sends the first command to the beacon. If the backdoor still needs to be activated, the beacon traffic looks uniform. The malware asks the C2 infrastructure for new commands at regular intervals, which then responds with a sleep command. The answer is always the same and, therefore, always has the same size when the data is transmitted. However, the backdoor has probably been activated if there are other data transfers of different sizes.

### Open Source Software
Alternatively, specially designed open-source software such as [Hunting Elastic Stack](https://github.com/Cyb3r-Monk/RITA-J) (HELK) or [RITA](https://github.com/activecm/rita) can also be used. 

The connections showing most indicators are from 172.31.133.55 to 31.13.82.26 (7asjne3s.buzz). It is a cheap top-level domain with a website name with DGA use characteristics. Connections were established every hour and contained small, uniform amounts of data. This is only interrupted twice, with the amount of data indicating the activation of a backdoor. RITA and HELK recognize this connection as a malware beacon with an almost perfect score.

The flag is `nland{172.31.133.55}`.

</br>

## KeePass - Easy
Author: [Fabi](https://github.com/fabifighter007)</br>

*Last year, we captured a memory dump of a locked Keepass process along with its corresponding Keepass database. Unfortunately, our attempts to unlock it have not been successful. Can you assist us to open the database?*

We have a memory dump and a Keepass database for which we do not have the password. We learn from the instructions that the memory dump was created a year ago. After a short search, we come across [CVE-2023-32784](https://nvd.nist.gov/vuln/detail/CVE-2023-32784): "In KeePass 2.x before 2.54, it is possible to recover the cleartext master password from a memory dump, even when a workspace is locked or no longer running. The memory dump can be a KeePass process dump, swap file (pagefile.sys), hibernation file (hiberfil.sys), or RAM dump of the entire system. The first character cannot be recovered." We are able to find a corresponding [PoC on Github](https://github.com/vdohney/keepass-password-dumper) which even contains a step by step guide. The script produces following output:

<br>

![](../../src/blog/images/neuland-ctf-12-2023/keepass1.png)

<br>

Through educated guessing we are able to recognize the first letters of the password, which gives us the complete password `nland-SuperSecretPassword`. Now, we are able to unlock the provided Keepass database and discover the flag.

<br>

![](../../src/blog/images/neuland-ctf-12-2023/keepass2.png)

<br>

The flag ist `nland{DoN7_stEaL_My_pA5Sw0Rd$!}`.
