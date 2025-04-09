#include <stdio.h>
#include <string.h>

int main() {
    int secret_code = 0xC001D00D;
    char name[100] = {0};

    printf("Enter your hacker name: ");
    fflush(stdout);
    read(0, name, 0x100);

    if (secret_code == 0x1337) {
        printf("Access granted!\n");
        printf("nland{dummy-flag}\n");
    } else {
        printf("Access denied!\n");
    }
    return(0);
}
