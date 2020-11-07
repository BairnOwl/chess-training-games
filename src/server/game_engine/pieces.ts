import { Square } from "./square"


interface DirectionVec {
    file: number;
    rank: number;
}

const ORTHOGONAL: DirectionVec[] = [
    { file:  0, rank: -1 }, // North
    { file:  0, rank:  1 }, // South
    { file: -1, rank:  0 }, // West
    { file:  0, rank: -1 }, // East
];

const DIAGONAL: DirectionVec[] = [
    { file: -1, rank: -1 }, // Topleft
    { file: -1, rank:  1 }, // Topright
    { file:  1, rank: -1 }, // Bottomleft
    { file:  1, rank:  1 }, // Bottomright
];

const COMBINED: DirectionVec[] = [
    ...ORTHOGONAL,
    ...DIAGONAL
];

const KNIGHT: DirectionVec[] = [
    { file: -1, rank: -2}, // TL
    { file: -2, rank: -1}, // TL2
    { file: -2, rank:  1}, // BL
    { file: -1, rank:  2}, // BL2
    { file:  1, rank: -2}, // TR
    { file:  2, rank: -1}, // TR2
    { file:  2, rank:  1}, // BR
    { file:  1, rank:  2}, // BR2
];

const PIECE_ABBREVIATIONS: string[] = ["B", "R", "Q", "K", "N"];


export abstract class Piece {
    static directions: DirectionVec[];
    static abbreviation: string;

    square: Square;
    // pointer to board object used to get info about occupied squares
    readonly board: any;
        
    constructor(square: Square, board: any) {
        this.square = square;
        this.board = board;
    }

    abstract getMoves(): Square[]
}

abstract class SlidingPiece extends Piece {
    getMoves(): Square[] {
        let moves: Square[]

        return moves
    }
}

abstract class NonSlidingPiece extends Piece {
    getMoves(): Square[] {
        let moves: Square[]

        return moves
    }
}

export class Bishop extends SlidingPiece {
    static directions = DIAGONAL;
    static abbreviation = "B";
}

export class Rook extends SlidingPiece {
    static directions = ORTHOGONAL;
    static abbreviation = "R";
}

export class Queen extends SlidingPiece {
    static directions = COMBINED;
    static abbreviation = "Q";
}

export class King extends NonSlidingPiece {
    static directions = COMBINED;
    static abbreviation = "K";
} 

export class Knight extends NonSlidingPiece {
    static directions = KNIGHT;
    static abbreviation = "N";
} 
