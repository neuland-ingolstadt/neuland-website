---
title: "Neuland CTF 2023 Winter - Reverse Engineering"
authors: ["Neuland CTF Orga"]
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

## Login - Easy
*Log into my account to get the flag.*

[login.exe](/files/neuland-ctf-12-2023/login.exe)

</br>

We get a portable executable with the MD5 hash ***A97F6CA98E275F846150A4E1EC45FBD0***. A closer look in a PE editor and process viewer like [CFF Explorer](https://ntcore.com/?page_id=388) tells us the file is probably not packed or compressed. Strings can be identified, and in the ***IMAGE_SECTION_HEADER*** the raw data size roughly corresponds to the virtual data size. This should enable us to read the strings used in the program code without using a software reverse engineering framework like [Ghidra](https://ghidra-sre.org/). We can search for the string ***nland{*** in the Ascii representation under the Hex Editor tab to find the rest of the flag.

![](../../src/blog/images/neuland-ctf-12-2023/login.webp)

</br>

The flag is `nland{NEw_P422w0rD_c4NN07_8E_7HE_54mE_45_Y0u_0ld_p422W0rd}`.

</br>

## Easy Bypass - Easy
Author: [Jonny](https://github.com/Baikuya) </br>

*Can you Bypass the authentication and find my Flag?*

[Easy_Bypass.zip](/files/neuland-ctf-12-2023/Easy_Bypass.zip)

</br>

The Challenge has 2 steps which I experienced on a real engagement when I had to reverse a .NET
Client.
1. Bypass the „Login“
2. Reading a Key from Memory

To prevent reading the Flag by using a decompiler or trying to read it from source the executable is
obscured.

![](../../src/blog/images/neuland-ctf-12-2023/jonny_1.webp)

After starting the executable you must enter a username and a password.

![](../../src/blog/images/neuland-ctf-12-2023/jonny_2.webp)

On a false login you must reenter username and password. There is actually no username and
password which is correct implemented in the binary.
You must bypass this check() function to get to the next step. Since this is just a Client which has no
server side validation the user has full control over the binary and can change the binary execution

![](../../src/blog/images/neuland-ctf-12-2023/jonny_3.webp)

If (flag2) will check if the check() function returned true which is no possible without changing the
value from false to true or use a decompiler such as [dnspy](https://github.com/0xd4d/dnSpy) which
lets you easily jump into the Instruction even without passing the check. In the figure above you can
use “Nächste Anweisung setzen” which means “Set next Instruction”. Sorry that it’s in german

![](../../src/blog/images/neuland-ctf-12-2023/jonny_4.webp)

After bypassing the check() function you must enter the secret key. The key will be initialized in the
flag() function which is also checks If the key is valid. So you must read the key from memory. You
can set up a break point at line 35 where the key is initialized and watch the local variables

![](../../src/blog/images/neuland-ctf-12-2023/jonny_5.webp)

![](../../src/blog/images/neuland-ctf-12-2023/jonny_6.webp)

After entering a false key you can read the right key from memory as shown in this figure.
The right Key is: ThisIsAReallyReallySecureKeyButYouCanReadItFromSourceSoItSucks
It could be also possible to just jump into the if() which validates, if the key is correct.

![](../../src/blog/images/neuland-ctf-12-2023/jonny_7.webp)

After passing the correct key you get the Flag.

The flag is `nland{Kekw_Andi_C0P1UM_xD}`.

</br>

## TicTacToe - Easy
*State of Game.*</br>

*java -jar TicTacToe.jar*

[TicTacToe.jar](/files/neuland-ctf-12-2023/TicTacToe.jar)

</br>

To solve the task, we get a Java *jar* file that plays TicTacToe against us. The tasks indicate that, apart from winning and losing, there is another state that we have to reach to get the flag. We need to open the Java archive to take a closer look at the files. To do this, we can, for example, rename the file to a *ZIP* and then unzip it with 7ZIP. This gives us two *.class* files and the manifest. The *.class* files are not human-readable at the moment. To decompile them, you can use the Visual Studio Code Extension [“Decompiler”](https://github.com/tintinweb/vscode-decompiler) from tintinweb. The extension does exactly what it says: “Decompiles the $h\*! out of things”. IT decompiles the .class files into readable Java code. In the *TicTacToe$Board.class*, the game state *F* causes the flag to be displayed.

![](../../src/blog/images/neuland-ctf-12-2023/decompiled_jar.webp)

</br>

The flag is `nland{tH1nk_0Ut51d3_tH3_B0x}`.

</br>

## Stacked - Easy
Author: [Kevin](https://github.com/k-gomez)</br>

*I found this binary in a br0 forum. I don't know whats happening here...*

[stacked.zip](/files/neuland-ctf-12-2023/stacked.zip)

</br>

Look in Ghidra.

```
package main

import (
    "fmt"
    "bufio"
    "os"
    "strings"
    "bytes"
)

func main() {
    s1 := "nland{"
    s2 := "th1s_"
    s3 := "1s"
    s4 := "_d3f1n3tly_"
    s5 := "n0t_th3" 
    s6 := "_g4lf"
    s7 := "w0w_"
    s8 := "y0u_f0und_"
    s9 := "th3_"
    s10 := "g4lf!}"
    s11 := "fxfs"
    s12 := "s0_m3ny_"
    s13 := "4w3s0m3_g4lfs"
    s14 := "1n_th1s_b1n4ry}"
    s15 := "nland{1t_1s_"
    s16 := "th3_g4lf_"
    s17 := "1_w4s_"
    s18 := "l00k1ng_for!}"
    s19 := "th3_"

    a1 := []string{"x33", "g00", "h3r3", s16, s19}
    a2 := []string{"x33", "g00", "h3r3", s19}
    a3 := []string{"xf33", s11, s17}
    a4 := []string{s11, "xf33"}

    b1 := xor(a1, a2)
    b2 := xor(a3, a4)

    var b3 bytes.Buffer
    b3.WriteString(s1)
    b3.WriteString(s4)
    b3.WriteString(s5) 
    b3.WriteString(s6)
    b3.WriteString(s7)

    var b4 strings.Builder
    b4.WriteString(s2)
    b4.WriteString(s8)
    b4.WriteString(s9)
    b4.WriteString(s10)
    b4.WriteString(s11)

    var b5 bytes.Buffer 
    b5.WriteString(s3)
    b5.WriteString(s12)
    b5.WriteString(s13)
    b5.WriteString(s14)
    b5.WriteString(s15)

    var b6 strings.Builder 
    b6.WriteString(s16)
    b6.WriteString(s17)
    b6.WriteString(s18)


    welcome := `Yo, my dudes! 🤘 Just wanted to drop in and let you know, I'm absolutely stacked right now - gains on gains, you feel me? 💪 But here's the deal, I'm on a mission, and I need your help to find this elusive "galf".
I'm talking about a digital treasure hunt, bros! 🚩 Imagine it's like the Olympics of the internet, and I'm out here flexing my mental muscles, but the galf is playing hard to get. It's like the final boss level, and I need my squad to assemble and help me conquer it!
So, if any of you have the 411 on where this galf is hiding, hit me up ASAP. Slide into my DMs, drop a comment, whatever it takes. We're in this together, and together we're unstoppable! Let's get that W, my internet comrades! 🏆 #GalfHunters #SquadGoals #InternetChampions
    `

    fail := `Oh, snap! 🙈 It looks like you might've taken a wrong turn in the cyber-jungle and snagged the wrong galf. Your internet compass got a little wonky, you know how it is. 🧭😅
    Or how real hackers would say: "Nix gibt's!"
But hey, no worries, we're all about that trial and error life. We learn from our mishaps and come back even stronger. So, if anyone's got the deets on the actual galf location, hit me up, and let's get back on the grind. We'll laugh about this one day when we're sitting on the digital throne of victory. 💻👑
Keep the faith, my internet warriors! You got this! 💪🌐 #GalfMisadventures #NextTimeForSure #StillStacked
    `

    success := `Boom! You did it, my internet legends! 🚩💥 You've got the right galf, and you're officially champions of the cyber realm. Cue victory dance. 💃💻
Massive shoutout to the squad for coming through and dropping those knowledge bombs. You guys are the real MVPs! 🏆 You conquered the digital wilderness and claimed our prize. This is like our digital trophy, a symbol of our collective awesomeness.
Celebrate with me, fam! Pop virtual confetti, do a little victory dab, or whatever feels right in the cyber-party. 🎉🕺 #InternetChamps #SquadGoalsUnlocked
    `

    fmt.Println(welcome)

    fmt.Println("Hit me with the flag bro:")
    inp, _, err := bufio.NewReader(os.Stdin).ReadLine()
    if err != nil {
            fmt.Println("Uhm, something went wrong!", err)
            fmt.Println("nland{th1s_1s_d3f1n3tly_n0t_th3_g4lf")
    }

    v1 := s1
    _ = v1
    v2 := fmt.Sprintf("%s%s", s2, s3)
    _ = v2
    v3 := b1[0]
    _ = v3
    v4 := b2[0]
    _ = v4

    if string(inp) == s6 + s9 + s11 + b1[0] + a1[1] {
        fmt.Println(success)
        fmt.Println(s1 + s7 + s8 + b1[0] + b2[0] + s18)
    } else {
        fmt.Println(fail)
    }
}

func xor(list1, list2 []string) []string {
    set1 := make(map[string]bool)
    for _, s := range list1 {
        set1[s] = true
    }
    set2 := make(map[string]bool)
    for _, s := range list2 {
        set2[s] = true
    }

    var c []string
    for _, s := range list1 {
        if !set2[s] {
          c = append(c, s)
        }
    }
    for _, s := range list2 {
        if !set1[s] {
          c = append(c, s)
        }
    }
    return c
}
```

The flag is `nland{w0w_y0u_f0und_th3_g4lf_1_w4s_l00k1ng_for!}`.

</br>

## License Key - Hard
*I really want to use the app for free.*</br>

*Flag format: nland{\<Valid Activation Code\>}*

</br>

We received an Android Package Kit (APK) file to solve the task. After installing, you will be greeted with a page that asks you to enter a valid activation key. 

![](../../src/blog/images/neuland-ctf-12-2023/flutter_app.webp)

</br>

You can also find out that the app was written with Flutter in the app's information. The internet tells us two things: a good Flutter decompiler has yet to be developed, and reverse engineering is complex. This is thanks, among other things, to the compiler optimization and the custom stack. There are a few ways to get there; the simplest is probably a mixture of the [reFlutter](https://github.com/Impact-I/reFlutter) project and decompiling with a standard APK tool like [jadx](https://github.com/skylot/jadx). This allows multiple strings to be extracted that look suspiciously like RegEx, the perfect tool to validate an activation key.

![](../../src/blog/images/neuland-ctf-12-2023/flutter_code.webp)

- *Part 1:* `^(-)$|^(([Pp]?[a-h](x[a-h])?([2-7]|[18]=?[QRBNqrbn]))|([KQRBNkqrbn][a-h ]?[1-8]?x?[a-h][1-8]))[+#]?` matches valid chess moves
- *Part 2:* `([0-9])` single-digit numbers from 0 to 9
- *Part 3:* `([a-z])` lower case letters are accepted
- *Part 4:* `([0-9]{2}/[0-9]{2}/[0-9]{4})` validates whether it is a date in the format DD/MM/YYYY
- *Part 5:* The string "Regex_is_fun"

Full regex: 

```
^(-)$|^(([Pp]?[a-h](x[a-h])?([2-7]|[18]=?[QRBNqrbn]))|([KQRBNkqrbn][a-h]?[1-8]?x?[a-h][1-8]))[+#]?(-)([0-9])(-)([a-z])(-)([0-9]{2}/[0-9]{2}/[0-9]{4})(-)(Regex_is_fun)$
```

The individual *if* statements are connected by a *-*. All strings following the scheme &lt;valid chess notation&gt;-&lt;numbers from 0-9&gt;-&lt;lower case a-z&gt-&lt;DD/MM/YYYY&gt;-&lt;string "Regex_is_fun"&gt; are accepted.

</br>

The flag is for example `nland{g4-5-b-06/06/2022-Regex_is_fun}`.
