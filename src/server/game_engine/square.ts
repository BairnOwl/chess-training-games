/** Square color enum */
enum Color {
    White,
    Black
}


const FILES: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];
// create an array of numbers from 1-8 (inclusive)
const RANKS: number[] = Array.from(new Array(8), (x, i) => i + 1);
// 32-bit bitmask to determine the color of squares (all 1's represent black)
const COLOR_BITBOARD: number = 0xAA55AA55;


class Square{
    file: number;
    rank: number;

    constructor(file: number, rank: number) {
        if (!(0 <= file && file < 8) || !(0 <= rank && rank < 8)) {
            throw `Ivalid rank/file: f-${file} r-${rank}`;
        }

        this.file = file;
        this.rank = rank;
    }

    /** Alternative constructor for creating Square objects from 64-based index*/
    static fromIndex(index: number): Square {
        let rank = Math.floor(index / 8);
        let file = index % 8;
        return new this(file, rank)
    }

    /** Alternative constructor for creating Square objects from square notation (i.e. "a1", "d3"*/
    static fromNotation(notation: string): Square {
         if (notation.length !== 2) {
             throw `Wrong square format ${notation}`;
         }   

        notation = notation.toLowerCase();
        
        let fileStr = notation[0];
        let rankStr = notation[1];

        if (!(FILES.includes(fileStr)) || !(RANKS.includes(parseInt(rankStr)))) {
            throw `Wrong square format ${notation}`;;
        }

        let file = FILES.indexOf(fileStr)
        let rank = RANKS.indexOf(parseInt(rankStr)) 
        
        return new this(file, rank)
    }

    /** Return a 64-based index of the square */
    index(): number {
        return (this.rank * 8) + this.file;
    }

    /** Return a notation string of the square position (ex. a1, d3 etc.) */
    notation(): string {
        return `${FILES[this.file]}${RANKS[this.rank]}`
    }

    /** Return an enum value of the color of the square: Black or White */
    color(): Color {
        // Convert index to 32-bit representation since the board pattern is the same
        let index = this.index();
        if (index >= 32) {
            index = index - 32
        }

        let isBlack: number = (COLOR_BITBOARD >> index) & 1;

        return (isBlack ? Color.Black : Color.White);
    }
}


// ------
function assert(x: boolean) {
    if (x === false) {
        throw "AssertionError"
    }
}

let sq = new Square(1, 1);

// add tests/checks
assert(sq.index() === 9);
assert(sq.notation() === "b2");
assert(sq.color() === Color.Black);

assert(Square.fromNotation("b2").index() === 9);
assert(Square.fromIndex(9).notation() === "b2");

// todo translate & add unittests for square 
