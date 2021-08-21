describe("package", () => {
  it("prints to the console", () => {
    expect.assertions(2);

    const __log = console.log;

    try {
      const log = jest.fn();

      console.log = log;

      require("../src/index");

      expect(log).toHaveBeenCalledTimes(1);
      expect(log).toHaveBeenCalledWith("Hello World 👋!");
    } finally {
      console.log = __log;
    }
  });
});
