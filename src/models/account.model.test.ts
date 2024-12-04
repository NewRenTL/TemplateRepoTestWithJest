import { Account } from "./account.model"

describe("Account Model Tests", () => {
  it("should create an account successfully", () => {
    const account = new Account("12345", "John Doe", 500, ["67890"]);
    expect(account.number).toBe("12345");
    expect(account.name).toBe("John Doe");
    expect(account.money).toBe(500);
    expect(account.contacts).toEqual(["67890"]);
  });

  it("should throw an error if money is negative", () => {
    expect(() => new Account("12345", "John Doe", -500, ["67890"])).toThrow(
      "Money cannot be negative"
    );
  });

  it("should throw an error if account number is empty", () => {
    expect(() => new Account("", "John Doe", 500, ["67890"])).toThrow(
      "Account number cannot be empty"
    );
  });

  it("should throw an error if name is empty", () => {
    expect(() => new Account("12345", "", 500, ["67890"])).toThrow(
      "Name cannot be empty"
    );
  });

  it("should create an account without contacts", () => {
    const account = new Account("67890", "Jane Doe", 1000, []);
    expect(account.contacts).toEqual([]);
  });
});
