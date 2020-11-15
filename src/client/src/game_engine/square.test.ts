import { SquareFunctions } from "./square"


test("SquareFunctions toIndex", () => {
    let index = SquareFunctions.toIndex("a1");
    expect(index).toBe(0);

    index = SquareFunctions.toIndex("a2");
    expect(index).toBe(8);

    index = SquareFunctions.toIndex("h8");
    expect(index).toBe(63);

    index = SquareFunctions.toIndex("d4");
    expect(index).toBe(27);
});

test("SquareFunctions toIndex", () => {
    let square = SquareFunctions.fromIndex(63);
    expect(square).toEqual("h8");

    square = SquareFunctions.fromIndex(5);
    expect(square).toEqual("f1");
});
