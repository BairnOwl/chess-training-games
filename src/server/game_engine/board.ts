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

    // todo should this be a getter ?
    occupied(): Square[] {
        return this.pieces.map(piece => piece.square);
    }
}