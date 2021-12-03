var fs = require('fs');

function parseInput() {
    inp = fs.readFileSync('input.txt')
    .toString().split("\n")
    .map(item => item = item.split("").map(
        digit => parseInt(digit, 2)
    ))
    
    return inp;
}

// iterate through every item in input
// check if each element in the item is 0 or 1
// add it
// end up with a list of frequencies

function calculateRates(binaryList) {
    let numZeros = [];
    let numOnes = [];

    let gammaRateTemp = []
    let epsilonRateTemp = []

    let gamRate = 0;
    let epsRate = 0;

    //initialize the array
    for (let i = 0; i < binaryList[0].length; i++) {
        numZeros[i] = 0;
        numOnes[i] = 0;
        gammaRateTemp[i] = 0;
        epsilonRateTemp[i] = 0;
    }

    for (binaryNumber of binaryList) {
        for (let i = 0; i < binaryNumber.length; i++) {
            if (binaryNumber[i] == 0) {
                numZeros[i] += 1;
            } else {
                numOnes[i] += 1;
            }
        }
    }

    for (let i = 0; i < numZeros.length; i++) {
        if (numZeros[i] > numOnes[i]) {
            gammaRateTemp[i] = 0
            epsilonRateTemp[i] = 1
        } else {
            gammaRateTemp[i] = 1
            epsilonRateTemp[i] = 0
        }
    }

    let power = 0;
    for (let i = gammaRateTemp.length-1; i >= 0 ; i--) {
        //console.log("GAMMARATETEMP: ",i, gammaRateTemp[i], 2 ** power);
        gamRate += gammaRateTemp[i] * (2 ** power);
        //console.log("GAMRATE: ", gamRate);
        epsRate += epsilonRateTemp[i] * (2 ** power);
        power += 1;
    }

    //console.log(gamRate, epsRate);

    return [gamRate, epsRate];
    
}


function main () {
    var input = [];
    var gammaRate = 0;
    var epsilonRate = 0;
    var powerConsumption = 0;

    input = parseInput();
    [gammaRate, epsilonRate] = calculateRates(input);

    //console.log(gammaRate, epsilonRate);
    powerConsumption = gammaRate * epsilonRate;
    console.log(powerConsumption);

}

main();