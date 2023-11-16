#include <stdio.h>
int main() {
long n, result, i;
printf("\n\nFractorial Calculator\n");
printf("=====================\n\n");
while(1) {
printf("Please input an integer in the range from 0 to 25\n");
scanf("%ld", &n);
if (n <= 1) {
result = 1;
} else {
result = n;
for(i=n-1; i>1; i--)
result = result * i;
}
printf("%ld! = %ld\n\n", n, result);
}
return 0;
} 