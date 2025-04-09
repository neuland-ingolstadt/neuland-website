#include <stdio.h>
#include <time.h>
#include <stdlib.h>

#define FLAG "nland{dummy_flag}"

int main() {
    
    const char *flag = FLAG;
    const char *numbers[10] = {
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
    };
    
    long index = 0;
    srand(time(NULL));
    int r = rand();

    printf("Which number between 0-9 am I thinking of?:\n");
    printf("Number: ");
    fflush(stdout);
    scanf("%ld", &index);
    printf("My number: %d\n", r);
    printf("Your number: %s\n", numbers[index]);

    return 0;
}