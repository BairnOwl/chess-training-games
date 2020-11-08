import { Piece } from "./pieces"
import { Square } from "./square"


export class Board {
    pieces: Piece[];

    constructor() {
        this.pieces = [];
    }

    reset(): void {
        this.pieces = [];
    }

    addPiece(piece: Piece): void {
        this.pieces.push(piece);
    }

    /** Checks if a given square is already occupied by a piece or not. */
    isOccupied(square: Square): boolean {
        const occupiedSquares = this.pieces.map(piece => piece.square);
        return square.isContained(occupiedSquares);
    }
}