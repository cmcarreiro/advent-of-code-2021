var fs = require('fs');
// 5 x 5 boards

//solution
//lastWinningSum = 208
//lastNum = 39

var boardSize = 5
var lastWinningSum = -1;
var lastNum = -1;

function parseInput() {
    let inp = fs.readFileSync('input.txt')
    .toString().split("\n")

    let nums = inp[0].split(',').map(
        digit => parseInt(digit, 10)
    )


    let tempBoards = inp.slice(1).filter( item => item != '')
                    .map(boardLine => boardLine.split(" ")
                    .filter( item => item != '')
                    .map(digit => parseInt(digit, 10)))

    var boards = [];
    while(tempBoards.length) boards.push(tempBoards.splice(0,boardSize));

    return [nums, boards];
}

function findAndReplaceInBoard(numCheck, board) {
    for (lineIndex = 0; lineIndex < boardSize; lineIndex++ ) {
        if (board[lineIndex].indexOf(numCheck) != -1) {
            board[lineIndex][board[lineIndex].indexOf(numCheck)] = 'x';
        }
    }
}

function isWinningBoard(board) {

    let win = 0;

    for (let lineIndex = 0; lineIndex < boardSize; lineIndex++ ) {
        win += board[lineIndex].every( element => element == 'x')
    }

    //check columns
    transpose = m => m[0].map((x,i) => m.map(x => x[i]))
    tempBoard = transpose(board)

    for (let colIndex = 0; colIndex < boardSize; colIndex++ ) {
        win += tempBoard[colIndex].every( element => element == 'x')
    }

    return win > 0;
}

function sumBoard(board) {
    let num = board.flat(1).filter(elem => elem != 'x').reduce((previousSum, elem) => previousSum + elem)

    return num;
}

function playBingo(listNums, boards) {
    //ending condition

    if (boards.length == 0) {
        return lastWinningSum * lastNum;
        
    } else {
        for (let i = 0; i < listNums.length; i++) {
            for (board of boards) {

                findAndReplaceInBoard(listNums[i], board)
                if (isWinningBoard(board)) {
                   
                    lastWinningSum = sumBoard(board);
                    lastNum = listNums[i];
                    playBingo(listNums.slice(i), boards.filter(elem => elem != board));

                    //note to self: if this doesn't exist, everything breaks
                    return lastWinningSum * lastNum;
                }
            }
        }
    }

    //shouldn't reach this
    return -1;
}


function main() {
    var nums, boards;

    [nums, boards] = parseInput();

    let result = playBingo(nums, boards);
    console.log(result);
}

main()