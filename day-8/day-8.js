
const fs = require("fs");

const filename = process.argv.slice(2)[0];
const input = fs
  .readFileSync(filename)
  .toString()
  .split("\n")
  .map((values) => values.split("|")[1].trim().split(" "))
  .flat();

const targetLengths = [2, 3, 4, 7];

const result = input
            .reduce((prevSum, elem) => targetLengths
            .includes(elem.length) ? ++prevSum : prevSum
            , 0);

console.log(result);
