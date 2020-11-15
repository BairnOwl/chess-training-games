import { Chess, ChessInstance, PieceType, Square } from "chess.js"
import { Board } from "./board"
import { SquareFunctions } from "./square"


test("Board isOccupied", () => {
    const board = new Board();

    const bishopSquare: Square = "a1";
    const bishop: PieceType = board.chess.BISHOP;

    board.addPiece(bishop, bishopSquare);

    // Iterate over all possible square indices and check that
    // none of them are occupied (except for the index on which the bishop stands)
    for (let i = 0; i < 64; i++) {
        const square = SquareFunctions.fromIndex(i);

        if (square !== bishopSquare) {
            expect(board.isOccupied(square)).toBeFalsy();
        } else {
            expect(board.isOccupied(square)).toBeTruthy();;
        }
    }
});

test("Board getSingularSquares", () => {
    const board = new Board();

    const bishopSquare: Square = "a1";
    const bishop: PieceType = board.chess.BISHOP;

    const knightSquare: Square = "b1";
    const knight: PieceType = board.chess.KNIGHT;

    board.addPiece(bishop, bishopSquare);
    board.addPiece(knight, knightSquare);

    const moves = board.getSingularSquares()
    expect(moves.length).toBe(8);

    // expect square which can be reached by both pieces to not be in the array of moves
    expect(moves.includes("c3")).toBeFalsy();

    const expectedMoves: Square[] = ["b2", "d4", "e5", "f6", "g7", "h8", "a3", "d2"];
    for (const expectedMove of expectedMoves) {
        expect(moves.includes(expectedMove)).toBeTruthy();
    }
});

test("Board getPieceThatReachesSquare", () => {
    const board = new Board();

    const squareBishop = "a1";
    const bishop = board.chess.BISHOP;

    const squareKnight = "b1";
    const knight = board.chess.KNIGHT;

    board.addPiece(bishop, squareBishop);
    board.addPiece(knight, squareKnight);

    expect(board.getPieceThatReachesSquare("b2")).toBe(bishop);
    expect(board.getPieceThatReachesSquare("a3")).toBe(knight);
    expect(board.getPieceThatReachesSquare("d8")).toBeNull();
    expect(board.getPieceThatReachesSquare("e2")).toBeNull();
});
