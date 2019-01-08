/**
 * @jest-environment jsdom
 */

const { getValues } = require("../main");

describe("getValues", () => {
  it("should return value as number if 1 value is passed", () => {
    expect(getValues("1234")).toEqual([1234]);
  });

  it("should return value as array if comma seperated value is passed", () => {
    expect(getValues("1234,4567,5678,6789")).toEqual([1234, 4567, 5678, 6789]);
  });

  it("should return value as array if range value is passed", () => {
    expect(getValues("10-15")).toEqual([10, 11, 12, 13, 14, 15]);
  });

  it("should return value as array if comma seperated range values is passed", () => {
    expect(getValues("10-15, 20-25")).toEqual([10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25]);
  });
});
