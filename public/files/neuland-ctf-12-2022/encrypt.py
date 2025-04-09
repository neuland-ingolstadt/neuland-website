def encrypt(msg, key):
    o = ''
    for i in range(len(msg)):
        o += chr(ord(msg[i]) ^ ord(key[i % len(key)]))
    return o


with open('flag', 'r') as f:
    flag = ''.join(f.readlines()).strip()

with open('key', 'r') as k:
    key = ''.join(k.readlines()).strip()

assert key.isalpha() and (len(key) == 6)
assert 'nland{' in flag

with open('encrypted', 'w') as file:
    file.write(encrypt(flag, key))
