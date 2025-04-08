---
title: "HackTheBox 'Ready' Writeup"
authors: ["0xFFD700", "M4GNV5"]
date: 2021-03-23T13:37
published: true
tags:
- hackthebox
- writeup
- security
- cyber
- cybersecurity
---

- **OS: Linux**
- **Difficulty: Medium**
- **Points: 30**
- **Release: 12 Dec 2020**

# Initial Access

Nmap shows an open ssh and onscreen port.

![](../../src/blog/images/htb-ready1.png)

With the Onscreenport <ip>:5080 a website hosting Gitlab can be accessed.

![](../../src/blog/images/htb-ready2.png)

A short google search reveals a fitting CVE, https://www.exploit-db.com/exploits/49257. Download the code, register a user, gather the necessary data and run the script to get a shell with the *git* user.

![](../../src/blog/images/htb-ready3.png)

To get a prettier shell, run 
```python
spawn shell python3 -c "import pty;pty.spawn('/bin/bash')" $ export Term=xterm
```
# Privilege Escalation


After a bit of enumeration, the directory */opt/backup* with a bunch of interesting files can be found. With the help of ```grep -i pass gitlab.rb``` the files reveal a password.

![](../../src/blog/images/htb-ready4.png)

The password works on the gitlab root account, ```root -i wW59U!ZKMbG9+*#h``` does the trick. But we are still in a docker container and can't access the root directory. Follow the [guide](https://betterprogramming.pub/escaping-docker-privileged-containers-a7ae7d17f5a1) and change the ```ps aux``` to whatever command you want to execute. In our case ```cat /root/root.txt```, the command output can be found in /output.
