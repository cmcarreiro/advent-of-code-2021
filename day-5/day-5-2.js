var fs = require('fs');

//IMPROVEMENTS TO BE MADE EVENTUALLY
// same as other file
// use switch case

input_array = fs.readFileSync('input.txt')
                    .toString()
                    .split("\n")
                    .map(lines => lines.split(" -> ")
                    .map(item => item.split(",")
                    .map(digit => parseInt(digit,10))
                    ))
var width = 0;
var height = 0;

for (let i = 0; i < input_array.length; i++ ) {
     //checking for width
     if (input_array[i][0][0] > width) {
        width = input_array[i][0][0]
    }
    if (input_array[i][0][1] > width) {
        width = input_array[i][0][1]
    }

    //checking for height
    if (input_array[i][0][1] > height) {
        height= input_array[i][0][1]
    }
    if (input_array[i][1][1] > height) {
        height= input_array[i][1][1]
    }
}

console.log(width);
console.log(height);
var seaFloor = [];

//initialize seaFloor
for (let x = 0; x < width + 1; x++) {
    seaFloor[x] = []
    for (let y = 0; y < height + 1; y++) {
        seaFloor[x][y] = 0;
    }
}


//populate seaFloor
for (let i = 0; i < input_array.length; i++ ) {

    // same line -> y is the same
    if (input_array[i][0][1] == input_array[i][1][1]) {
        let y = input_array[i][0][1];
        let beginningX = input_array[i][0][0];
        let endingX = input_array[i][1][0];

        if (beginningX < endingX) {
            for (x = beginningX; x <= endingX; x++ ){
                seaFloor[x][y]++;
            }
        } else {
            for (x = endingX; x <= beginningX; x++) {
                seaFloor[x][y]++;
            }
        }
    }

    // same column -> x is the same
    if (input_array[i][0][0] == input_array[i][1][0]) {
        let x = input_array[i][0][0];
        let beginningY = input_array[i][0][1];
        let endingY = input_array[i][1][1];

        if (beginningY < endingY) {
            for (y = beginningY; y <= endingY; y++ ){
                seaFloor[x][y]++;
            }
        } else {
            for (y = endingY; y <= beginningY; y++) {
                seaFloor[x][y]++;
            }
        }
    }

    if ((input_array[i][0][1] != input_array[i][1][1]) && (input_array[i][0][0] != input_array[i][1][0])) {
        let x1 = input_array[i][0][0]
        let y1 = input_array[i][0][1]

        let x2 = input_array[i][1][0]
        let y2 = input_array[i][1][1]

        if ( x1 < x2 && y1 < y2) {
            for (let x = x1, y = y1; x <= x2, y <= y2; x++, y++) {
                seaFloor[x][y]++;
            }
        }

        if ( x1 < x2 && y1 > y2) {
            for (let x = x1, y = y1; x <= x2, y >= y2; x++, y--) {
                seaFloor[x][y]++;
            }
        }

        if ( x1 > x2 && y1 < y2) {
            for (let x = x1, y = y1; x >= x2, y <= y2; x--, y++) {
                seaFloor[x][y]++;
            }
        }

        if ( x1 > x2 && y1 > y2) {
            for (let x = x1,  y = y1; x >= x2, y >= y2; x--, y--) {
                seaFloor[x][y]++;
            }
        }
    }

}

sum = 0;
for (let x = 0; x < width + 1; x++) {
    for (let y = 0; y < height + 1; y++ ) {
        if (seaFloor[x][y] >= 2 ) sum++;
    }
}

console.log("here ->", sum);
