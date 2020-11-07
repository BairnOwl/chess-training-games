import { Knight } from "./pieces"
import { Square } from "./square"


test("Knight moves", () => {
    let square = new Square(7, 7);

    let knight = new Knight(square, "a");

    // expect(Knight.abbreviation).toBe("N");
    expect(knight.square).toEqual(square);
});