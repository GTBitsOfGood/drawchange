const chai = require("chai");
const { expect } = chai;

describe("Example mocha test cases", () => {
  it("test A", async () => {
    expect(0).to.eq(0);
  });
  it("test B", async () => {
    expect(1).to.eq(1);
  });
});
