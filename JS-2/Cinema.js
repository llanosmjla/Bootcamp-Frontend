class Seat {
    #letter;
    #isAvailable
    #column;
    #row;

    constructor(letter, column, row) {
        this.letter = letter;
        this.column = column;
        this.row = row;
        this.#isAvailable = true;
    }

    get isAvailable() { return this.#isAvailable; }
    set isAvailable(value) { this.#isAvailable = value;}

    get letter() { return this.#letter; }
    set letter(value) { this.#letter = value; }

    get column() { return this.#column; }
    set column(value) { this.#column = value; }

    get row() { return this.#row; }
    set row(value) { this.#row = value; }
}

class Cinema {
    columns;
    rows;

    seats;
    seat;
    constructor(columns, rows) {
        this.columns = columns;
        this.rows = rows;
        this.seats = [];
        this.assignSeats(columns, rows);
    }

    assignSeats(columns, rows) {
        let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        for (let i = 0; i < columns; i++) {
            this.seats[i] = [];
            for (let j = 0; j < rows; j++) {
                this.seats[i][j] = new Seat(letters[i], i, j);
            }
        }
    }

    reserve(column, row) {
        if (!this.seats[column][row].isAvailable) {
            console.log(`Seat is already reserved : |${this.seats[column][row].letter} - ${this.seats[column][row].row} : Reserved |`);
            return;
        }
        this.seats[column][row].isAvailable = false;
    }

    showCine() {
        const red = '\x1b[31m';
        const green = '\x1b[32m';
        const reset = '\x1b[0m';
        
        console.log('- Vacant = V | Reserved = R -');
        console.log('*********************************************************');

        this.seats.forEach(element => {
            element.forEach(seat => {
                const statusSeat = !seat.isAvailable ? `${red} R ${reset}` : `${green} V ${reset}`;
                process.stdout.write(` |${seat.letter} - ${seat.row} : ${statusSeat}`);
            });
            console.log();
        });
    }
}

const cine = new Cinema(5, 5);
console.log('----------------Welcome to the Cinema------------------');
cine.showCine();
console.log('*****************************************************************');

cine.reserve(2, 2);
cine.showCine();
console.log('*****************************************************************');

console.log('--------------------------------------------------------');
cine.reserve(2, 2);
console.log('--------------------------------------------------------');

cine.reserve(2, 3);
cine.reserve(2, 4);
cine.reserve(2, 0);
cine.reserve(0, 0);

cine.showCine();
console.log('*****************************************************************');

console.log('--------------------------------------------------------');
cine.reserve(0, 0);
console.log('--------------------------------------------------------');

cine.reserve(0, 1);
cine.reserve(0, 2);
cine.showCine();
console.log('*****************************************************************');