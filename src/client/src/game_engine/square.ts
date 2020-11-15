import { Square } from "chess.js"

export class SquareFunctions {
    static FILES: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"];
    // create an array of numbers from 1-8 (inclusive)
    static RANKS: number[] = Array.from(new Array(8), (x, i) => i + 1);

    static toIndex(square: Square): number {
        let squareStr = square as string;
        squareStr = squareStr.toLowerCase();

        let fileStr = squareStr[0];
        let rankStr = squareStr[1];

        let file = this.FILES.indexOf(fileStr);
        let rank = this.RANKS.indexOf(parseInt(rankStr));

        return (rank * 8) + file;
    }

    static fromIndex(index: number): Square {
        if (!(0 <= index && index < 64)) {
            throw new Error(`Wrong index: ${index}. Index should be in range [0, 63]`);
        }
        let rank = Math.floor(index / 8);
        let file = index % 8;
        let square = `${this.FILES[file]}${this.RANKS[rank]}`;
        return square as Square;
    }
}