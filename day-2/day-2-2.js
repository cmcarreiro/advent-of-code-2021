// (x,y)
// forward (+,y)
// down (x, + )
// up (x, -)

/*
position = (x, y)
loop ( input ) {
    if (input = "forward number" ) {
            position = (x + number, y);
    }
    else if (input = "down number") {
        position = (x, y + number);
    }
    else if (input = "up number") {
        position = (x, y - number);
    }
}
x * y
*/

var fs = require('fs');
var lines = fs.readFileSync('day-2-input.txt')
            .toString().split("\n");



var inputs = []

for (let i = 0; i < lines.length; i++) {
    inputs[i] = lines[i].split(" ");
    inputs[i][1] = parseInt(inputs[i][1]);
}

//console.log(inputs);

//input[0] = instruction
//input = ["instruction", number]

//submarine[0] = x
//submarine[1] = y

// x, y, aim
            //x, y, aim
submarine = [0,0,0]
for (let i = 0; i < inputs.length; i++) {
    if (inputs[i][0] == "forward") {
        // x = x + numbers
        submarine[0] = submarine[0] + inputs[i][1];
        // y = y + number * aim
        submarine[1] = submarine[1] + inputs[i][1] * submarine[2];
        
    }
    else if (inputs[i][0] == "down") {
        // aim = aim + number
        submarine[2] = submarine[2] + inputs[i][1];
    }
    else if (inputs[i][0] == "up") {
        // aim = aim - number
        submarine[2] = submarine[2] - inputs[i][1];
    }
    //console.log(submarine);
}

result = submarine[0] * submarine[1];

console.log(submarine);
console.log(result);

//done with bee :)
