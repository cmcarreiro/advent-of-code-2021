var fs = require('fs');

// TO BE FIXED WHEN I HAVE TIME 
// this has a lot of commented print debugs

class InputParser {
    constructor(file) {
        this._file = file;
        this._input = [];
    }

    //method
    parseInput () {
        this._input = fs.readFileSync(this._file)
                    .toString()
                    .split("\n")
                    .map(lines => lines.split(" -> ")
                    .map(item => item.split(",")
                    .map(digit => parseInt(digit,10))
                    ))
        
        return this._input;
    }
}

class Point {
    constructor(x, y, numVents) {
        this._x = x;
        this._y = y;
        this._numVents = 0;
    }

    //getters
    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }

    getNumVents() {
        return this._numVents;
    }

    getPoint() {
        return this;
    }

    //setters 
    setNumVents(num) {
        this._numVents = num;
        return num;
    }

    increaseNumVents() {
        //console.log("INCREASE NUMBER OF VENTS HAS BEEN ACCESSED");
        this._numVents += 1;
        //console.log(this);
        return this.numVents;
    }

    printPoint() {
        return this.getNumVents();
    }
}

class Line {
    constructor(y, boardWidth) {
        this._y = y;
        this._points = [];
        for (let i = 0; i < boardWidth + 1; i++ ) {
            this._points[i] = new Point(i, this._y, 0);
            //console.log(this._points[i]);
        }
    }

    //getters
    getPoints() {
        return this._points;
    }

    getY() {
        return this._y;
    }

    getPoint(x) {
        return this._points[x];
    }

    getLine() {
        return this;
    }

    setPoint(x, point) {
        this._points[x] = point;
    }

    populateLine(beginningX, endingX) {

        //PRINT DEBUGGING
        //console.log("---------POPULATE LINE------------------");
        if (beginningX < endingX ) {
            for (let x = beginningX; x <= endingX; x++) {
                //console.log(`POINT: ${this._points[x].getPoint().getX()}, ${this._points[x].getPoint().getY()}, ${this._points[x].getPoint().getNumVents()}`);
    
                this._points[x].increaseNumVents()
    
                //console.log(`POINT AFTER INCREASING NUMBER OF VENTS: ${this._points[x].getPoint().getX()}, ${this._points[x].getPoint().getY()}, ${this._points[x].getPoint().getNumVents()}`);
            }
        } else {
            //console.log("BEGINNING X IS HIGHER THAN ENDING X");
            //console.log(endingX);
            //console.log(beginningX);
            let x = endingX;
            //console.log(x);
            //console.log(this._points[x]);
            for (x; x <= beginningX; x++) {
                //console.log(x);
                //console.log(`POINT: ${this._points[x].getPoint().getX()}, ${this._points[x].getPoint().getY()}, ${this._points[x].getPoint().getNumVents()}`);
    
                this._points[x].increaseNumVents()
    
                //console.log(`POINT AFTER INCREASING NUMBER OF VENTS: ${this._points[x].getPoint().getX()}, ${this._points[x].getPoint().getY()}, ${this._points[x].getPoint().getNumVents()}`);
            }
        }
        
    }

    printLine() {
        let lineStr = '';
        for (let i = 0; i < this._points.length; i++ ) {
            
            lineStr = lineStr + this._points[i].getNumVents().toString() + ' ';
        }
        return lineStr;
    }

    debugLine() {
        for (let i = 0; i < this._points.length; i++ ) {
            //console.log(this._points[i]);
        }
    }
}

class Column {
    constructor(x, points) {
        this._x = x;
        this._points = points;
    }

    //getters
    getPoints() {
        return this._points;
    }

    getX() {
        return this._x;
    }

    getPoint(y) {
        return this._points[y];
    }

    getColumn() {
        return this;
    }

    setPoint(y, point) {
        this._points[y] = point;
    }

    populateColumn(beginningY, endingY) {

        //PRINT DEBUGGING
        //console.log("---------POPULATE COLUMN------------------");

        if (beginningY < endingY) {
            for (let y = beginningY; y <= endingY; y++) {
                //console.log(`POINT: ${this._points[y].getPoint().getX()}, ${this._points[y].getPoint().getY()}, ${this._points[y].getPoint().getNumVents()}`);
    
                this._points[y].increaseNumVents()
    
                //console.log(`POINT AFTER INCREASING NUMBER OF VENTS: ${this._points[y].getPoint().getX()}, ${this._points[y].getPoint().getY()}, ${this._points[y].getPoint().getNumVents()}`);            
            }
        } else {
            for (let y = endingY; y <= beginningY; y++) {
                //console.log(`POINT: ${this._points[y].getPoint().getX()}, ${this._points[y].getPoint().getY()}, ${this._points[y].getPoint().getNumVents()}`);
    
                this._points[y].increaseNumVents()
    
                //console.log(`POINT AFTER INCREASING NUMBER OF VENTS: ${this._points[y].getPoint().getX()}, ${this._points[y].getPoint().getY()}, ${this._points[y].getPoint().getNumVents()}`);       
            }
        }
    }

    printColumn() {
        let columnStr = '';
        for (let i = 0; i < this._points.length; i++ ) {   
            columnStr = columnStr + this._points[i].getNumVents().toString() + ' ';
        }
        return columnStr;
    }

    debugColumn() {
        for (let i = 0; i < this._points.length; i++ ) {
            //console.log(this._points[i]);
        }
    }

}

class SeaFloor {
    constructor(ventsLists) {
        this._ventsLists = ventsLists;
        //console.log(this._ventsLists);

        this._width = 0;
        this._height = 0;

        for (let i = 0; i < ventsLists.length; i++) {

            //checking for width
            if (ventsLists[i][0][0] > this._width) {
                this._width = ventsLists[i][0][0]
            }
            if (ventsLists[i][0][1] > this._width) {
                this._width = ventsLists[i][0][1]
            }

            //checking for height
            if (ventsLists[i][0][1] > this._height) {
                this._height= ventsLists[i][0][1]
            }
            if (ventsLists[i][1][1] > this._height) {
                this._height= ventsLists[i][1][1]
            }
        }

        //initializing the lines
        this._lines = [];
        for (let y = 0; y < this._height + 1; y++ ) {
            this._lines[y] = new Line(y, this._width);
        }

        //initializing the columns;
        this._columns = [];
        for (let x = 0; x < this._width + 1; x++) {
            let column = [];
            for (let y = 0; y < this._height + 1; y++ ) {
                column.push(this._lines[y].getPoint(x));
            }
            this._columns[x] = new Column(x, column);
        }
    }

    getLine(y) {
        return this._lines[y];
    }

    getColumn(x) {
        return this._columns[x];
    }

    populateSeaFloor() {
        for (let i = 0; i < this._ventsLists.length; i++) {

            // PRINT DEBUGGING
            //console.log("---------HERE'S THE INPUT----------------");
            //console.log(this._ventsLists[i]);


            //same line -> y is the same
            if (this._ventsLists[i][0][1] == this._ventsLists[i][1][1]) {
                let y = this._ventsLists[i][0][1];
                let beginningX = this._ventsLists[i][0][0];
                let endingX = this._ventsLists[i][1][0];

                //PRINT DEBUGGING
                //console.log("------------------SAME LINE----------------");
                //console.log(`x1, x2, ${this._ventsLists[i][0][0]}, ${this._ventsLists[i][1][0]}`);
                //console.log(`y1, y2, ${this._ventsLists[i][0][1]}, ${this._ventsLists[i][1][1]}`);
                //console.log(`y: ${y}`);
                //console.log(`beginningX: ${beginningX}`);
                //console.log(`endingX: ${endingX}`);
                //console.log("Line before it is populated:");
                //console.log(this._lines[i].printLine());
                this._lines[y].populateLine(beginningX, endingX);
                //console.log("Line after it is populated:");
                //console.log(this._lines[i].printLine());
            }


            //same column -> x is the same
            if (this._ventsLists[i][0][0] == this._ventsLists[i][1][0]) {
                let x = this._ventsLists[i][0][0];
                let beginningY = this._ventsLists[i][0][1];
                let endingY = this._ventsLists[i][1][1];

                //console.log("------------------SAME COLUMN----------------");
                //console.log(`x1, x2, ${this._ventsLists[i][0][0]}, ${this._ventsLists[i][1][0]}`);
                //console.log(`y1, y2, ${this._ventsLists[i][0][1]}, ${this._ventsLists[i][1][1]}`);
                //console.log(`x: ${x}`);
                //console.log(`beginningY: ${beginningY}`);
                //console.log(`endingY: ${endingY}`);
                //console.log("Column before it is populated:");
                //console.log(this._lines[i].printLine());


                this._columns[x].populateColumn(beginningY, endingY);


                //console.log("Column after it is populated:");
                //console.log(this._columns[i].printColumn());

            }
        }
    }

    printSeaFloor() {
        for (let i = 0; i < this._lines.length; i++) {
           console.log(this.getLine(i).printLine());
            
        }
    }

    debugSeaFloor() {
        for (let i = 0; i < this._lines.length; i++ ) {
            //console.log(this._lines[i].debugLine());
        }
    }

    findDangerousAreas() {
        var numDangerousAreas = 0;
        for (let y = 0; y < this._lines.length; y++) {
            for (let x = 0; x <this._width; x++ ) {
                if(this._lines[y].getPoint(x).getNumVents() >= 2) {
                    numDangerousAreas++;
                }
            }
        }
    }

}

function main() {
    var inpParse = new InputParser('input-test.txt');

    ////console.log(inpParse.parseInput());
    var seaFloor = new SeaFloor(inpParse.parseInput());
    //seaFloor.printSeaFloor();
    seaFloor.populateSeaFloor();
    seaFloor.printSeaFloor();
    //seaFloor.debugSeaFloor();
    console.log(seaFloor.findDangerousAreas());
    
}

main();