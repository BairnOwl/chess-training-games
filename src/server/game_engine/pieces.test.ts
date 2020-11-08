import { Knight } from "./pieces"
import { Square } from "./square"
import { Board } from "./board"
 

test("Knight moves", () => {
    let square = Square.fromNotation("a1");
    let board = new Board();

    let knight = new Knight(square, board);

    expect(knight.square).toEqual(square);

    const moves = knight.getMoves();
    expect(moves.length).toBe(2);
    expect(Square.fromNotation("b3").isContained(moves)).toBeTruthy();
    expect(Square.fromNotation("c2").isContained(moves)).toBeTruthy();
});