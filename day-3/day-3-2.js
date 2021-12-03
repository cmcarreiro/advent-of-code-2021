var fs = require('fs');

// returns list with all the binary numbers as strings
function parseInput() {
    let inp = fs.readFileSync('input.txt')
    .toString().split("\n")

    return inp;
}


// matches all the strings in an array with a certain pattern
// meaning: takes an array, finds all the strings that start
// with a certain pattern, returns an array with the filtered results
function filterList(inp, pattern) {
    return inp.filter(str => str.indexOf(pattern) == 0)
}


function calculateOxygen(inp) {
    let pattern = '';

    while (filterList(inp, pattern).length != 1) {
        
        //more zeros than ones
        if (filterList(inp, pattern + '0').length > filterList(inp, pattern + '1').length) {
            pattern += '0'
        } 
        //more ones than zeros OR as many zeros and ones
        else 
        {
            pattern += '1'
        }
    }

    return parseInt(filterList(inp, pattern)[0],2);
}

function calculateScrub(inp) {
    let pattern = '';

    while (filterList(inp, pattern).length != 1) {
        
        //more zeros than ones
        if (filterList(inp, pattern + '0').length > filterList(inp, pattern + '1').length) {
            pattern += '1'
        } 
        //more ones than zeros OR as many zeros and ones
        else 
        {
            pattern += '0'
        }
    }

    return parseInt(filterList(inp, pattern)[0],2);
}

function main() {
    var input = [];
    var oxygenRating;
    var scrubRating;
    var lifeSupportRating;
    

    input = parseInput();
    //var filteredArray = filterList(pattern, input);
    //console.log(filteredArray);
    oxygenRating = calculateOxygen(input);
    //console.log("oxygen", oxygen);
    scrubRating = calculateScrub(input);
    //console.log("scrub", scrub);
    lifeSupportRating = oxygenRating * scrubRating;
    console.log("oxygen rating", oxygenRating);
    console.log("scrub rating", scrubRating);
    console.log("life support rating", lifeSupportRating);
}

main();
