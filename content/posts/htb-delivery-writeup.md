---
title: "HackTheBox 'Delivery' Writeup"
authors: ["0xFFD700", "M4GNV5"]
date: 2021-03-28T13:37
published: true
tags:
- hackthebox
- writeup
- security
- cyber
- cybersecurity
---

- **OS: Linux**
- **Difficulty: Easy**
- **Points: 10**

The nmap scan shows an open SSH and HTTP port. On the corresponding website we can find a Helpdesk Application and a Mattermost. To actually access the helpdesk.delivery.htb server, the IP and servername has to be added to */etc/host* on the local machine. Mattermost can be accessed over the URL http://<ip>:8065. Go to the support center and "Open a new Ticket", upon submit you get an E-Mail Address associated with your ticket `7493836@delivery.htb` which can be used to create a valid Mattermost account. The Mattermost activation E-Mails can be retrieved from the delivery support ticket system.

![](../../src/blog/images/htb-delivery1.webp)

After a bit of searching we can find numerous messages from *root* that mention the user `maildeliverer` with the password `Youve_G0t_Mail!`. 

![](../../src/blog/images/htb-delivery2.webp)

We can use the acquired account to log into the server via SSH and retrieve the user flag. By enumerating the server further the file `/opt/mattermost/config/config.json` can be found. It includes the DB user `mmuser` and the password `Crack_The_MM_Admin` that can be used to retrieve hashed root user credentials. After logging into MariaDB with `mysql -u mmuser -D mattermost -p` the data can be retrieved by executing `SELECT username, password FROM Users WHERE username = 'root';`.

![](../../src/blog/images/htb-delivery3.webp)

The Hash is a bcrypt and can be cracked with hashcat. To make things easier we used [Hob0Rules](https://github.com/praetorian-inc/Hob0Rules/) `hashcat -a 0 -m 3200 hash.hash Hob0Rules/wordlists/wordlist.txt -r Hob0Rules/d3adhob0.rule -o cracked.txt -w 3 -O`

![](../../src/blog/images/htb-delivery4.webp)
