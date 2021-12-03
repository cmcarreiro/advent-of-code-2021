var fs = require('fs');
var nums = fs.readFileSync('day-1-input.txt')
            .toString().split("\n")
            .map( item => parseInt(item, 10) );


var totalIncrease = 0;
let lastMeasurement = nums[0];
for (let i = 1; i < nums.length; i++) {
    if (nums[i] > lastMeasurement) totalIncrease++;
    lastMeasurement = nums[i];
}

console.log(totalIncrease);

