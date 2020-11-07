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
    console.log(moves);
    // todo this does not check for equality by elements in the list
    //  instead it checks for identity => investigate other usages of includes() and fix them
    expect(moves.includes(Square.fromNotation("b3"))).toBeTruthy();
    expect(moves.includes(Square.fromNotation("c2"))).toBeTruthy();
});