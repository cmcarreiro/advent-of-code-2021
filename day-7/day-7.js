const fs = require('fs');

const input = fs.readFileSync('input.txt').toString()
                .split(',')
                .map(digit => parseInt(digit, 10));

console.log(input);

const maxPosition = Math.max(...input);
//console.log("max position", maxPosition);

let minFuel = input.length * maxPosition;
let minIndex = 0;

for (i = 0; i < maxPosition; i++ ) {
    //console.log(i);
    let tempFuel = 0;
    for (elem of input) {
        //console.log(elem);
        if (elem > i) {
            tempFuel += elem - i;
        } else if (elem < i ) {
            tempFuel += i - elem;
        } else if (elem == i) {
            tempFuel += 0;
        }
    }
    if (tempFuel < minFuel) {
        minFuel = tempFuel;
        minIndex = i;
    }

}

console.log(minFuel, minIndex);