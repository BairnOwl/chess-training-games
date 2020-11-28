import { ChessInstance, Piece, PieceType, Square } from "chess.js"
import SquareFunctions from "./square"

const Chess = require('chess.js');


export default class Board {
    chess: ChessInstance;
    pieces: PieceType[];

    constructor() {
        this.chess = new Chess();
        this.chess.clear(); // remove all pieces from the board
        this.pieces = [];
    }

    /** Resets board (i.e. removes all pieces from the board). */
    reset(): void {
        this.chess.clear();
        this.pieces = [];
    }

    /** Add a piece to the board */
    addPiece(piece: PieceType, square: Square): void {
        // always add the same piece color, otherwise move generation
        // might generate some capture moves
        const pieceObj: Piece = {type: piece, color: this.chess.WHITE}
        this.chess.put(pieceObj, square);

        // keep track of all pieces on the board
        this.pieces.push(piece);
    }

    /** Moves a piece from one location to another. */
    movePiece(piece: PieceType, square: Square): void {
        try {
            const fromSquare = this.getSquareForPiece(piece);
            this.chess.move({ from: fromSquare, to: square });
        } catch (e) {
            console.log(e);
        }
    }

    /** Checks if a given square is already occupied by a piece or not. */
    isOccupied(square: Square): boolean {
        const pieceAtSquare = this.chess.get(square);
        return pieceAtSquare !== null;
    }

    /** Return an array of squares to which only 1 piece can go. */
    getSingularSquares(): Square[] {
        let allMoves: Array<Set<Square>> = [];

        // Iterate over all piece on the board
        // For every piece add the set of squares it can go to to an array
        for (let i = 0; i < 64; i++) {
            const square = SquareFunctions.fromIndex(i);

            if (this.isOccupied(square)) {
                console.log('occupied: ' + square);
                const moves = this.chess.moves({ verbose: true, square: square });
                console.log(this.chess.moves());
                allMoves.push(new Set(moves.map(move => move.to)));
            }
        }

        console.log(this.chess.ascii());

        // Calculate the symmetric difference between all square.
        // This results in a set of squares which cannot be reached by more than one piece.
        const singularSquaresSet: Set<Square> = allMoves.reduce(symmetricSquareDifference);
        return Array.from(singularSquaresSet);
    }

    /** Get piece object that can reach the given square. */
    getPieceThatReachesSquare(square: Square): PieceType {
        const allMoves = this.chess.moves({ verbose: true });
        for (const move of allMoves) {
            if (move.to === square) {
                return move.piece;
            }
        }
        throw new Error('Error: cannot find piece that reaches square: ' + square);
        // return null;
    }

    /** Gets the square where a given piece is located. */
    getSquareForPiece(piece: PieceType): Square {
        // if (!piece) {
        //     return null;
        // }

        // Iterate over all the squares on the board
        // For every square, check to see if it is occupied by the given piece.
        for (let i = 0; i < 64; i++) {
            const square = SquareFunctions.fromIndex(i);
            const pieceAtSquare = this.chess.get(square);

            if (!!pieceAtSquare) {
              if (piece === pieceAtSquare.type) {
                  return square;
              }
            }
        }

        throw new Error('Error: cannot find piece for a given piece: ' + piece);

        // return null;
    }
}

/**
 * Calculates symmetric difference between 2 sets of squares.
 * Returns the squares which are not overlapping between the two input sets.
 */
const symmetricSquareDifference = (accumulator: Set<Square>, currentValue: Set<Square>, currentIndex: any, array: any) => {
    // this implementation is taken directly from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
    let _difference = new Set(accumulator);

    currentValue.forEach(elem => {
      if (_difference.has(elem)) {
          _difference.delete(elem);
      } else {
          _difference.add(elem);
      }
    });

    return _difference;
}
