// every fish creates a new fish every 7 days
// if it's new, then it needs at least two more days
// 0 is included -> max is 6

var fs = require('fs');

var beginningState = fs.readFileSync('input.txt')
                    .toString()
                    .split(",")
                    .map(elem => parseInt(elem, 10));

//console.log(beginningState);

//knowing that at most the fish have 8 days

//          [0, 1, 2, 3, 4, 5, 6, 7, 8]
var state = [0, 0, 0, 0, 0, 0, 0, 0, 0]

//once you get to 0, you remove from 0
//add one to 6, and one to 8

for (let i = 0; i < beginningState.length; i++) {
    state[beginningState[i]]++;
}

for (let i = 0; i < 80; i++) {
    //console.log(state);
    var lastValue = state[8];
    for ( let i = 7; i >= 0; i--) {
        var currentValue = state[i];
        state[i] = lastValue;
        lastValue = currentValue;
    }
    state[8] = lastValue;
    state[6] += lastValue;
}

var numFishes = state.reduce((previousSum, elem) => elem + previousSum);

console.log(numFishes);