const fs = require('fs');

const input = fs.readFileSync('input.txt').toString()
                .split(',')
                .map(digit => parseInt(digit, 10));

console.log(input);

const maxPosition = Math.max(...input);
//console.log("max position", maxPosition);

let minFuel = input.length * maxPosition * maxPosition * maxPosition;
let minIndex = 0;

for (i = 0; i < maxPosition; i++ ) {
    let tempFuel = 0;
    for (elem of input) {
        if (elem > i) {
            //console.log(i, elem, ((elem - i)*(elem-i+1)) / 2);
            tempFuel += ((elem - i)*(elem-i+1)) / 2;
        } else if (elem < i ) {
            //console.log(i, elem, ((i - elem)*(i - elem +1)) / 2);
            tempFuel += ((i - elem)*(i -elem +1 )) / 2;
        } else if (elem == i) {
            tempFuel += 0;
        }
    }
    if (tempFuel < minFuel) {
        //console.log(tempFuel, minFuel, i);
        minFuel = tempFuel;
        minIndex = i;
    }

}

console.log(minFuel, minIndex);