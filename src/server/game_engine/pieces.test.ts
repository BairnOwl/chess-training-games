import { Knight, Bishop } from "./pieces"
import { Square } from "./square"
import { Board } from "./board"
 

test("Knight moves (from a1)", () => {
    const square = Square.fromNotation("a1");
    const board = new Board();
    const knight = new Knight(square, board);

    expect(knight.square).toEqual(square);

    const moves = knight.getMoves();
    expect(moves.length).toBe(2);
    expect(Square.fromNotation("b3").isContained(moves)).toBeTruthy();
    expect(Square.fromNotation("c2").isContained(moves)).toBeTruthy();
});

test("Knight moves (from d4)", () => {
    const square = Square.fromNotation("d4");
    const board = new Board();
    const knight = new Knight(square, board);

    expect(knight.square).toEqual(square);

    const moves = knight.getMoves();
    expect(moves.length).toBe(8);

    const expectedMoves: string[] = ["b3", "b5", "c6", "c2", "e2", "e6", "f5", "f3"];
    for (const expectedMove of expectedMoves) {
        expect(Square.fromNotation(expectedMove).isContained(moves)).toBeTruthy();
    }
});

test("Knight moves (from d4) with blocker (on c2)", () => {
    const board = new Board();

    const knightSquare = Square.fromNotation("d4");
    const knight = new Knight(knightSquare, board);
    
    const bishopSquare = Square.fromNotation("c2");
    const bishop = new Bishop(bishopSquare, board);

    // add blocking piece to the board
    board.addPiece(bishop);

    const moves = knight.getMoves();
    expect(moves.length).toBe(7);

    // expect c2 is not longer in move list
    expect(Square.fromNotation("c2").isContained(moves)).toBeFalsy();

    const expectedMoves: string[] = ["b3", "b5", "c6", "e2", "e6", "f5", "f3"];
    for (const expectedMove of expectedMoves) {
        expect(Square.fromNotation(expectedMove).isContained(moves)).toBeTruthy();
    }
});

