#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>

int main(int argc, char *argv[])
{
    char flag[15] = "nland{<flag>}";
    int *ptr = flag;
    char buffer[100];
    
    printf("Welcome to Secure4Sure!\n");
    printf("Please provide a valid access code:\n");

    fgets(buffer, 100, stdin);
    buffer[strcspn(buffer, "\n")] = '\0'; 

    if(!strncmp(flag, buffer, sizeof(flag))){
        printf("Welcome Secure4Sure member!\n");
        return 0;
    } else {
        printf(buffer);
        printf(" is not valid!\n");
        exit(0);
    }

    return 0;
}