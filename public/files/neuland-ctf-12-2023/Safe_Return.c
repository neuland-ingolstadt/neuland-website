#undef _FORTIFY_SOURCE
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

void safe_function()  {
	char buf[64];
	read(STDIN_FILENO, buf,128);
}

void priv_fix() {
	gid_t gid = getegid();
	setresgid(gid, gid, gid);
}

void greeting()
{
  char buf[48];
  read(0, buf, sizeof(buf)+4);
  puts(buf);
}

int main(int argc, char** argv) {
        priv_fix();
	greeting();
	safe_function();
	write(STDOUT_FILENO, "Hello, Neuland\n", 13);
}
