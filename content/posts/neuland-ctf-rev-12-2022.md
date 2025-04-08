---
title: "Neuland CTF 2022 Winter - Reversing"
authors: ["0xFFD700", "manuv"]
date: 2022-12-07T18:05
published: true
tags:
- ctf
- writeup
- security
- cyber
- cybersecurity
---

## Strings - Easy

*The flag is hidden somewhere in this binary.*

<br>

[strings](/files/neuland-ctf-12-2022/strings)

<br>

The challenge is straightforward if you already know what `strings` is. It is a program that display printable strings in files.
We can execute `strings` on our binary `strings` and we can find the flag in the output.

```
$ strings strings               
/lib64/ld-linux-x86-64.so.2
__cxa_finalize
__libc_start_main
puts
libc.so.6
GLIBC_2.2.5
GLIBC_2.34
_ITM_deregisterTMCloneTable
__gmon_start__
_ITM_registerTMCloneTable
PTE1
u+UH
nland{f0H
und_y0u}H
Try to get the flag!
;*3$"
...
```

The flag is `nland{f0und_y0u}`.

<br>

## Tracer - Easy

*Can you trace down the admin password? Strings won't help you this time. <br>
Flag format: nland{admin-password}*

<br>

[tracer](/files/neuland-ctf-12-2022/tracer)

<br>

We are asked to find the admin password. We can't use `strings` this time as the binary contains a lot of strings. We have to find another tool that we can used for reverse engineering. The title and description hints us towards ltrace. We can use it to trace the library calls of a given program.

```
$ ltrace ./tracer            
printf("Enter admin password: ")                                                                             = 22
__isoc99_scanf(0x55cd2f78d01b, 0x7ffc5a4f50f0, 0, 0Enter admin password: test
)                                                                              = 1
strcmp("test", "42ceec6b744d41bc8044fee516003183"...)                                                        = 64
printf("Wrong password")                                                                                     = 14
Wrong password+++ exited (status 0) +++
``` 

Our input is compared with the string "42ceec6b744d41bc8044fee516003183" followed by the call to `printf("Wrong password")`. This seems promising. We will try this again with the found string.

```
$ ltrace ./tracer
printf("Enter admin password: ")                                                                             = 22
__isoc99_scanf(0x55ec8584001b, 0x7fff1f04d610, 0, 0Enter admin password: 42ceec6b744d41bc8044fee516003183
)                                                                              = 1
strcmp("42ceec6b744d41bc8044fee516003183"..., "42ceec6b744d41bc8044fee516003183"...)                         = 0
printf("Right password")                                                                                     = 14
Right password+++ exited (status 0) +++
```

We found the right password.

The flag is `nland{42ceec6b744d41bc8044fee516003183}`.

<br>

## Snek Encoder - Medium

*I encoded the flag with a custom script that I wrote. I lost the source code to it. I just found this odd file in the project folder. It seems to describe operations and commands in some way to encode the flag. Maybe this helps you to find a way to decode the flag.
This is the encoded flag: `urfrg}qy6f-jZ.e-'U]((QSi&!POf`.*

<br>

[encode](/files/neuland-ctf-12-2022/encode)

<br>

The contents or the structure of the `encode` file are probably unfamiliar for most people. After some research you will find out that this is Python bytecode. It describes your source code as a low-level platform-independent representation. The challenge description states that this script is used to encode the flag. After we get the hang of how Python bytecode looks we can recover the original encode funtion.

```python
def encode(flag):
    o = ''
    for i, b in enumerate(flag):
        b = ord(b)
        b = b + 7 - i
        a = chr(b)
        o += a
    return o
```

Now we know how the flag was encoded. However, we need to decode it. We are going to reverse the encode function to get the decode function. We end up with something like this.

```python
def decode(flag):
    f = ''
    for i, b in enumerate(flag):
        c = ord(b)
        c = c - 7 + i
        c = chr(c)
        f += c
    return f
```

If we input the encoded flag into our decode function, we can retrieve the flag.

The flag is `nland{py7h0n_4l50_h45_by73c0d3}`.

<br>

## Password - Medium

*Don't Worry, Relax, Chill and Try harder*

[password](/files/neuland-ctf-12-2022/password)

<br>

The program asks for a password. The challenge is to get the password through reversing the binary. There is some string stacking implemented within the binary.

The solution requires to reverse the binary and check which variables are used to fulfill the last `if`. Another solution requires to check what the last `print` prints. This is the flag, if the user provided the correct password. However, the printed variable (`v4`) is stacked too, which requires some work to determine which strings are used to build the flag.

```go
package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
    "bytes"
)

func main() {
    s1 := "nland{th1s_1s_d3f1n3tly_n0t_th3_fl4g"
    s2 := "nland{w0w_y0u_f0und_"
    s3 := "th3_fl4g!}"
    s4 := "nland{"
    s5 := "s0_m3ny_"
    s6 := "4w3s0m3_fl4gs_"
    s7 := "1n_th1s_b1n4ry}"
    s8 := "nland{1t_1s_"
    s9 := "th3_fl4g_"
    s10 := "1_w4s_"
    s11 := "l00k1ng_for!}"

    var b bytes.Buffer
    b.WriteString(s4)
    b.WriteString(s5) 
    b.WriteString(s6)
    b.WriteString(s7)

    var sb strings.Builder
    sb.WriteString(s8)
    sb.WriteString(s9)
    sb.WriteString(s10)
    sb.WriteString(s11)

    fmt.Println("Welcome to NEULAND CTF!")
    fmt.Println("Please enter the password:")
    inp, _, err := bufio.NewReader(os.Stdin).ReadLine()
    if err != nil {
            fmt.Println("Uhm, something went wrong!", err)
            fmt.Println("nland{th1s_1s_d3f1n3tly_n0t_th3_fl4g")
    }

    v1 := s1
    _ = v1
    v2 := fmt.Sprintf("%s%s", s2, s3)
    _ = v2
    v3 := b.String()
    _ = v3
    v4 := sb.String()
    _ = v4

    if string(inp) == s6 + s9 + s11 {
        fmt.Println("You got it!")
        fmt.Println(v4)
    } else {
        fmt.Println("Don't Worry, Relax, Chill and Try harder")
    }
}
```

The password is: `4w3s0m3_fl4gs_th3_fl4g_l00k1ng_for!}`

The flag is: `nland{1t_1s_th3_fl4g_1_w4s_l00k1ng_for!}`.
