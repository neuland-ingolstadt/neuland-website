---
title: "Cyber Santa CTF - Bamboozled Challenge Writeup"
authors: ["M4GNV5"]
date: 2021-12-05T21:30:00+01:00
published: true
tags:
- CTF
- Writeup
- Cybersecurity
---

The challenge input consists of a single .pyc file, which is a bytecode for a program run with python 3.8.

There are existing tools to decompile .pyc back to .py such as [decompyle3](https://pypi.org/project/decompyle3/) or [uncompyle6](https://pypi.org/project/uncompyle6/), but unfortunately both of these tools and some others we tested fail to decompile the given pyc file. The two mentioned ones print the JIT opcodes in human readable format and print `Parse error at or near 'None' instruction at offset -1`

We started off trying to fix the pyc file, maybe something was modified manually? But in the end we just took a look at the JIT opcodes manually. It contains a lot code blocks looking similar to this:

```
                4  LOAD_GLOBAL              sum
                6  LOAD_FAST                'password'
                8  LOAD_CONST               0
               10  LOAD_CONST               3
               12  BUILD_SLICE_2         2 
               14  BINARY_SUBSCR    
               16  CALL_FUNCTION_1       1  ''
               18  LOAD_CONST               222

 L.   3        20  COMPARE_OP               !=
               22  POP_JUMP_IF_FALSE    28  'to 28'
               24  LOAD_GLOBAL              exit
               26  LOAD_CONST               -1
             28_0  COME_FROM            22  '22'

 L.   4        28  CALL_FUNCTION_1       1  ''
               30  POP_TOP          
               32  LOAD_FAST                'password'
               34  LOAD_CONST               0
               36  BINARY_SUBSCR    
               38  LOAD_FAST                'password'
               40  LOAD_CONST               1
               42  BINARY_SUBSCR    
               44  BINARY_XOR       
               46  LOAD_FAST                'password'
               48  LOAD_CONST               2
               50  BINARY_SUBSCR    
               52  BINARY_XOR       
               54  LOAD_CONST               94

 L.   5        56  COMPARE_OP               !=
               58  POP_JUMP_IF_FALSE    64  'to 64'
               60  LOAD_GLOBAL              exit
               62  LOAD_CONST               -1
             64_0  COME_FROM            58  '58'

 L.   6        64  CALL_FUNCTION_1       1  ''


```

As we can see there seems to be a local variable `password` which is probably a string or list, maybe even the flag. First we get characters `0-3` from it and calculate their sum. This sum is required to be `222` or the function will call `exit(-1)`. Afterwards the first three characters are XORed and the result needs to be `94` or the function will call `exit(-1)`.
In python this logic would look something like this:
```python
if sum(password[0:3]) != 222:
    exit(-1)
if (password[0] ^ password[1] ^ password[2]) != 94:
    exit(-1)
```

After the code above the pyc file repeats this process, always summing and xoring three, comparing the results to a constant.
The start and end are always incremented by one such that in the second step `sum(password[1:4])` is calculated and so on.

At this point we just assumed the correct password is the flag we are looking for and we can confirm this is probably the case using:

```python
password = [ord(x) for x in "HTB"]

if sum(password[0:3]) != 222:
    exit(-1)
if (password[0] ^ password[1] ^ password[2]) != 94:
    exit(-1)
		
print("the first three seem to be correct!")
```

Running above program prints `the first three seem to be correct!`. This means we know the password we are looking for is porbably our flag as flags have the format `HTB{...}`.

Given the first three characters as `HTB` we can calculate the remaining letters one by one. After the `sum(password[0:3]) != 222` check the pyc file checks `sum(password[1:4]) != 273`. Thus we can calculate the forth character using `chr(273 - ord("B") - ord("T"))`. Then the fifth character using the next sum check and so on.
In total there are 46 characters i.e. 46 `sum(password[i : i + 3]) == z` checks. We used the following bash/grep line to extract all constants `z`:

```bash
uncompyle6 bamboozled.pyc | sed '/^[[:space:]]*$/d' | grep -E -B 2 'COMPARE_OP\s+!=' | grep -E -A 1 'CALL' | grep -E 'LOAD_CONST' | grep -Eo '\s[0-9]+$' | tr '\n' ','
```

Which prints

```
# file bamboozled.pyc
# Deparsing stopped due to parse error
 222, 273, 301, 356, 349, 341, 268, 262, 253, 305, 244, 202, 155, 158, 158, 156, 213, 258, 315, 257, 273, 218, 262, 245, 241, 256, 275, 321, 264, 196, 196, 247, 251, 270, 266, 309, 311, 259, 259, 241, 307, 263, 217, 210, 192, 265,
```

Using this data one can trivially calculate the full flag:

```python
sum_results = [ 222, 273, 301, 356, 349, 341, 268, 262, 253, 305, 244, 202, 155, 158, 158, 156, 213, 258, 315, 257, 273, 218, 262, 245, 241, 256, 275, 321, 264, 196, 196, 247, 251, 270, 266, 309, 311, 259, 259, 241, 307, 263, 217, 210, 192, 265]

result = "HTB"
for i in range(1, len(sum_results)):
    c = chr(sum_results[i] - ord(result[i]) - ord(result[i + 1]))
    result += c

print("flag:", result)
```

Which prints:
```
flag: HTB{pyth0n_d155453mbl3r5_a1nt_50_h4rd_t0_br34k!}
```

We do not really need the constants from the XOR checks, but one can extract them using:

```bash
uncompyle6 bamboozled.pyc | sed '/^[[:space:]]*$/d' | grep -E -B 2 'COMPARE_OP\s+!=' | grep -E -A 1 'BINARY_XOR' | grep -E 'LOAD_CONST' | grep -Eo '\s[0-9]+$' | tr '\n' ','
```
