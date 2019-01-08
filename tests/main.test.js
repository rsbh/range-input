/**
 * @jest-environment jsdom
 */

const { getValues, addItemToList } = require("../main");

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

  it("should return value as array if comma seperated range values are passed", () => {
    expect(getValues("10-15, 20-25")).toEqual([10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25]);
  });

  it("should return value as array if comma seperated range values and number are passed", () => {
    expect(getValues("10-15, 20-25, 30, 50")).toEqual([10, 11, 12, 13, 14, 15, 20, 21, 22, 23, 24, 25, 30, 50]);
  });

  it("should return null if string is passed", () => {
    expect(getValues("abcd")).toEqual(null);
  });

  it("should return null if string range is passed", () => {
    expect(getValues("abcd-efgh")).toEqual(null);
  });

  it("should return only valid values if invalid comma seperated range values and number are passed", () => {
    expect(getValues("abcd-efgh, abcd-efgh, abcd-efgh, 1, 2, 3")).toEqual([1, 2, 3]);
  });
});

describe("addItemToList", () => {
  it("should add item to list", () => {
    const items = [1];
    const list = [];
    const duplicates = [];
    const expectedOutupt = { duplicatesList: [], itemslist: [1] };
    expect(addItemToList(items, list, duplicates)).toEqual(expectedOutupt);
  });

  it("should add all items to list", () => {
    const items = [1, 2, 4, 5];
    const list = [];
    const duplicates = [];
    const expectedOutupt = { duplicatesList: [], itemslist: [1, 2, 4, 5] };
    expect(addItemToList(items, list, duplicates)).toEqual(expectedOutupt);
  });

  it("should add duplicates items to duplicates list", () => {
    const items = [1, 2, 4, 5];
    const list = [1, 4];
    const duplicates = [];
    const expectedOutupt = { duplicatesList: [1, 4], itemslist: [1, 4, 2, 5] };
    expect(addItemToList(items, list, duplicates)).toEqual(expectedOutupt);
  });
});
