var fs = require('fs');

//IMPROVEMENTS TO MAKE EVENTUALLY
//read from argv
//actually put functions into this
// stop doing input_array[i][0][0] etc... and declare x1, x2, y1, y2
//solution -> 7674

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

    // console.log(`------${input_array[i]}-------`)
    // for (let y = 0; y < height + 1; y++) {
    //     str = '';
    //     for (let x = 0; x < width +1; x++ ) {
    //         str = str + seaFloor[x][y].toString() + ' ';
    //     }
    //     console.log(str);
    // }
    // console.log("--------------------------------");
    
    
}

console.log(seaFloor.flat(1).reduce((previousSum, elem) => elem >= 2 ? previousSum + 1 : previousSum))

// for (let y = 0; y < height + 1; x++) {
//     str = '';
//     for (let x = 0; x < width +1; x++ ) {
//         str = str + seaFloor[x][y].toString() + ' ';
//     }
//     console.log(str);
// }