import { Knight, Bishop, King, Rook, Queen } from "./pieces"
import { Square } from "./square"
import { Board } from "./board"
 
// ----------------- KNIGHT -----------------
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

// ----------------- KING -----------------
test("King moves (from a1)", () => {
    const square = Square.fromNotation("a1");
    const board = new Board();
    const king = new King(square, board);

    expect(king.square).toEqual(square);

    const moves = king.getMoves();

    expect(moves.length).toBe(3);
    expect(Square.fromNotation("a2").isContained(moves)).toBeTruthy();
    expect(Square.fromNotation("b2").isContained(moves)).toBeTruthy();
    expect(Square.fromNotation("b1").isContained(moves)).toBeTruthy();
});

test("King moves (from d4)", () => {
    const square = Square.fromNotation("d4");
    const board = new Board();
    const king = new King(square, board);

    expect(king.square).toEqual(square);

    const moves = king.getMoves();
    expect(moves.length).toBe(8);

    const expectedMoves: string[] = ["c3", "c4", "c5", "c3", "d5", "e3", "e4", "e5"];
    for (const expectedMove of expectedMoves) {
        expect(Square.fromNotation(expectedMove).isContained(moves)).toBeTruthy();
    }
});

test("King moves (from d4) with blocker (on c5)", () => {
    const board = new Board();

    const kingSquare = Square.fromNotation("d4");
    const king = new King(kingSquare, board);

    const bishopSquare = Square.fromNotation("c5");
    const bishop = new Bishop(bishopSquare, board);

    // add blocking piece to the board
    board.addPiece(bishop);

    const moves = king.getMoves();
    expect(moves.length).toBe(7);


    // expect c5 is not longer in move list
    expect(Square.fromNotation("c5").isContained(moves)).toBeFalsy();

    const expectedMoves: string[] = ["c3", "c4", "d3", "d5", "e3", "e4", "e5"];
    for (const expectedMove of expectedMoves) {
        expect(Square.fromNotation(expectedMove).isContained(moves)).toBeTruthy();
    }
});
