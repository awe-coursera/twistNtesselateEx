/*
 ============================================================================
 Name        : checkerboard.c
 Author      : 
 Version     :
 Copyright   : Your copyright notice
 Description : Hello World in C, Ansi-style
 ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

int main(int argc, char * argv[]) {
	unsigned char red1, green1, blue1, red2, green2, blue2;
	unsigned char pixelSize;
	unsigned char numW, numH;
	int i, j, k;
	char buffer [256];
	char * oddEvenPixelRow;
	char * evenOddPixelRow;
	FILE * dataFile;
	unsigned char oddState;

	// Note: should really check the ranges of the args carefully
	// Here, assuming, the user is playing along nicely
	// that the arguments are all strings corresponding
	// to +ve integers in the range 0 - 255
	// 2^size is the number of pixels per square element and a power of 2
	// 2^numW is the checkerboard width in squares and it is a power of 2
	// 2^numH is the checkerboard height in squares and it is a power of 2

	if (argc != 10) {
		fprintf(stderr, "Usage is checkerboard red1 green1 blue1 red2 green2 blue2 size width height\n");
		return EXIT_FAILURE;
	}



	// Create and open a file for writing ..
	printf("Enter name of file :\n");
	gets(buffer);
	dataFile = fopen(buffer,"w");
	if (!dataFile) {
		fprintf(stderr, "Error creating image file\n");
				return EXIT_FAILURE;
	}

	red1 = atoi(argv[1]);
	green1 = atoi(argv[2]);
	blue1 = atoi(argv[3]);

	red2 = atoi(argv[4]);
	green2 = atoi(argv[5]);
	blue2 = atoi(argv[6]);

	pixelSize = atoi(argv[7]);
	pixelSize = (int)pow(2,pixelSize);
	numW = atoi(argv[8]);
	numW = (int)pow(2,numW);
	numH = atoi(argv[9]);
	numH = (int)pow(2,numH);

	printf("red1 %d, green1 %d, blue1 %d, red2 %d, green2 %d, blue2 %d, pixelSize %d, numW %d, numH %d\n",
			red1, green1, blue1, red2, green2, blue2, pixelSize, numW, numH);

	// allocate memory for evenOdd and oddEven pixel rows ...

	//  create pixel row for 121212... colour rows ...
	//  create pixel row for 212121... colour rows ...
	//  multiply by 4 as each pixel will be represented by 4 bytes RGBA ...

	oddEvenPixelRow = malloc (pixelSize * numW * 4 * ( sizeof(unsigned char)));
	if(oddEvenPixelRow == NULL) {
		return EXIT_FAILURE;
	}


	for ( i = 0, k = 0, oddState = 1 ; i < numW; i++)
	{
		for (j = 0; j < pixelSize; j++)
		{
			if(oddState){
				oddEvenPixelRow[k++] = red1;
				oddEvenPixelRow[k++] = green1;
				oddEvenPixelRow[k++] = blue1;
				oddEvenPixelRow[k++] = 255;
			} else {
				oddEvenPixelRow[k++] = red2;
				oddEvenPixelRow[k++] = green2;
				oddEvenPixelRow[k++] = blue2;
				oddEvenPixelRow[k++] = 255;
			}
		}
		oddState = !oddState;
	}

	// don't really need an evenOddPixelRow as could simply flip the pixels in the oddEvenPixelRow	..
	// but, not optimising code here ... just getting it to work ...

	evenOddPixelRow = malloc (pixelSize * numW * 4 * ( sizeof(unsigned char)));
	if(evenOddPixelRow == NULL) {
		return EXIT_FAILURE;
	}

	for ( i = 0, k = 0, oddState = 0 ; i < numW; i++)
	{
		for (j = 0; j < pixelSize; j++)
		{
			if(oddState){
				evenOddPixelRow[k++] = red1;
				evenOddPixelRow[k++] = green1;
				evenOddPixelRow[k++] = blue1;
				evenOddPixelRow[k++] = 255;
			} else {
				evenOddPixelRow[k++] = red2;
				evenOddPixelRow[k++] = green2;
				evenOddPixelRow[k++] = blue2;
				evenOddPixelRow[k++] = 255;
			}
		}
		oddState = !oddState;
	}

	// Now, write out the checkerboard pixels to file ...

	for( i = 0, oddState = 1 ; i < numH; i++) {
		for (j = 0; j < pixelSize; j++) {
			if(oddState){
				fwrite(oddEvenPixelRow, sizeof(unsigned char), pixelSize * numW * 4, dataFile );
			}
			else {
				fwrite(evenOddPixelRow, sizeof(unsigned char), pixelSize * numW * 4, dataFile );
			}
		}
		oddState = !oddState;
	}
	return EXIT_SUCCESS;
}
