const FileSystem = require("./FileSystem.js"); // we will get the thing that we want to mock.
const Account = require("./Account.js");

beforeAll(() => {
  jest.restoreAllMocks();
});

describe("#deposit", () => {
  test("It adds money to the account", async () => {
    const startingBalance = 5;
    const account = await createAccount("josh", startingBalance);
    const amount = 10;
    const spy = jest
      .spyOn(FileSystem, "write")
      .mockReturnValue(Promise.resolve());
    // we will pass the string of the method we want to check in. and want to overWrite.

    await account.deposit(amount);
    expect(account.balance).toBe(amount + startingBalance);
    expect(spy).toBeCalledWith(account.filePath, amount + startingBalance); // this will allow us to pass the arguments that we want this method to be called with.
  });
});
// inside of unit test we don't wanna deal with side effects or things outside of our account.js module. But file section deal
// creating a file and it also deals with FileSystem class that we created.
// So we essentially wanna 'mock out' all of these information's

// spyOn : allows us to overwrite the implementation of a method if we want. and it also allows us to check to see if the method was
// called. what arguments it was called with and so on.

describe("#withdraw", () => {});

async function createAccount(name, balance) {
  const spy = jest
    .spyOn(FileSystem, "read")
    .mockRejectedValueOnce(Promise.resolve(balance));

  const account = await Account.find(name);
  spy.mockRestore();
  return account;
}
