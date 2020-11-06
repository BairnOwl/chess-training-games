const SquareClass = require("./Square");


test("Square constructor", () => {
    // TODO Is this the correct way to check that this object creation succeeds
    expect(new SquareClass(2, 3)).toEqual(new SquareClass(2, 3));

    // Test the validity check of rank & file inputs (should be between 0-7 inclusive)
    expect(() => new SquareClass(8, 8)).toThrow('Ivalid rank/file: f-8 r-8');
    expect(() => new SquareClass(-1, -1)).toThrow('Ivalid rank/file: f--1 r--1');
    expect(() => new SquareClass(-1, 5)).toThrow('Ivalid rank/file: f--1 r-5');
    expect(() => new SquareClass(5, -1)).toThrow('Ivalid rank/file: f-5 r--1');
});

test("Square index getter", () => {
    let square = new SquareClass(1, 1);
    expect(square.index()).toBe(9);

    square = new SquareClass(7, 7);
    expect(square.index()).toBe(63);
});

test("Square notation getter", () => {
    let square = new SquareClass(0, 0);
    expect(square.notation()).toBe("a1");

    square = new SquareClass(1, 6);
    expect(square.notation()).toBe("b7");

    square = new SquareClass(7, 7);
    expect(square.notation()).toBe("h8");
});

test("Square color getter", () => {

});
