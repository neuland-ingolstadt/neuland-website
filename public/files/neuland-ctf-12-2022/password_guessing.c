#include <stdio.h>
#include <string.h>
#include <time.h>
#include <stdlib.h>

int main() {
    char password[50];
    int logged_in = 0;

    printf("Guess the random password:\n");
    fflush(stdout);
    gets(password);

    srand(time(NULL));
    int r = rand();
    char rng[128];
    sprintf(rng, "%d", r);

    if (strcmp(password, rng)) {
        printf("Wrong Password\n\n");
    } else {
        printf("Correct Password\n\n");
        logged_in = 1;
    }

    if (logged_in) {
        printf("nland{dummy-flag}\n\n");
    }
    
    return(0);
}
