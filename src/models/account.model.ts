export class Account {
    constructor(
      public number: string,
      public name: string,
      public money: number,
      public contacts: string[]
    ) {
      if (!number || number.trim() === "") {
        throw new Error("Account number cannot be empty");
      }
      if (!name || name.trim() === "") {
        throw new Error("Name cannot be empty");
      }
      if (money < 0) {
        throw new Error("Money cannot be negative");
      }
    }
  }
  