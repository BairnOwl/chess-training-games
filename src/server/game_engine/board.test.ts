import { Board } from "./board"
import { Bishop } from "./pieces"
import { Square } from "./square"

test("Board isOccupied", () => {
    const board = new Board();

    const square = Square.fromNotation("a1");
    const bishop = new Bishop(square, board);

    board.addPiece(bishop);
    
    // Iterate over all possible square indices and check that
    // none of them are occupied (except for the index on which the bishop stands)
    for (let i = 0; i < 64; i++ ) {
        if (i !== square.index()) {
            expect(board.isOccupied(Square.fromIndex(i))).toBeFalsy();
        } else {
            expect(board.isOccupied(Square.fromIndex(i))).toBeTruthy();
        }
    }
});
