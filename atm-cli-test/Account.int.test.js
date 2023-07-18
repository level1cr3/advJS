/*
in package.json we can give regex to find our different test like below would only run the integration test.
"test:int": "jest \\.int\\. --coverage"

integration test are slower when compare to unit test because here we have actually do things that deal with sideEffect like 
creating file or connecting to db and so on instead of mocking all these.
*/

const Account = require("./Account");
const fs = require("fs"); // instead of mocking we will actually deal with the files

beforeEach(() => {
  try {
    fs.mkdirSync("accounts");
  } catch {
    //Ignore if file is created
  }
});

afterEach(() => {
  fs.rmSync("accounts", { recursive: true, force: true });
});

// we write the 'static' method with '.' instead of #
describe(".create", () => {
  test("It creates an account and file", async () => {
    const name = "kyle";
    const account = await Account.create(name);
    expect(account.name).toBe(name);
    expect(account.balance).toBe(0);
    expect(fs.readFileSync(account.filePath).toString()).toBe("0");
  });
});

describe(".find", () => {
  test("It returns the account", async () => {
    const name = "kyle";
    const balance = 10;
    fs.writeFileSync(`accounts/${name}.txt`, balance.toString());
    const account = await Account.find(name);
    expect(account.name).toBe(name);
    expect(account.balance).toBe(balance);
  });

  describe("when there is no file", () => {
    test("it returns undefined", async () => {
      const name = "kyle";
      const account = await Account.find(name);
      expect(account).toBeUndefined();
    });
  });
});
