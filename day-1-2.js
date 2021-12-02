var fs = require('fs');
var nums = fs.readFileSync('day-1-input.txt').toString().split("\n").map( item => {
    return parseInt(item, 10);
});

var totalIncrease = 0;
let lastMeasurement = nums[0] + nums[1] + nums[2];
for (let i = 1; i < nums.length - 2; i++) {
    if (nums[i] + nums[i + 1] + nums[i + 2] > lastMeasurement) totalIncrease++;
    lastMeasurement = nums[i] + nums[i + 1] + nums[i + 2];
}

console.log(totalIncrease);
