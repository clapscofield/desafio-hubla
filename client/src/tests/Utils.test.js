import { transactionValue } from "../utils/utils";

const transactions = [
  {
    type: 1,
    date: "22/12/2022",
    product: "CURSO BEM ESTAR",
    salesman: "Joao Silva",
    value: "5000"
  },
  {
    type: 2,
    date: "22/12/2022",
    product: "CURSO BEM ESTAR",
    salesman: "Joao Silva",
    value: "5000"
  },
  {
    type: 3,
    date: "22/12/2022",
    product: "CURSO BEM ESTAR",
    salesman: "Joao Silva",
    value: "5000"
  },
  {
    type: 4,
    date: "22/12/2022",
    product: "CURSO BEM ESTAR",
    salesman: "Joao Silva",
    value: "5000"
  }
];

const transactionsError = [
    {
      type: 5,
      date: "22/12/2022",
      product: "CURSO BEM ESTAR",
      salesman: "Joao Silva",
      value: "5000"
    }
];

describe("Transaction Value", () => {
  it("Should return transaction value", () => {
    expect(transactionValue(transactions)).toBe(10000);
  });

  it("Should return error value", () => {
    expect(transactionValue(transactionsError)).toBe(-1);
  });
});
