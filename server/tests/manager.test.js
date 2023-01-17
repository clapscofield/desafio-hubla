const request = require("supertest");
const app = require("../app");

jest.setTimeout(20000);

describe("Create transaction", () => {
  it("create new transaction successfully", async () => {
    const response = await request(app).post("/transactions").send({
      type: 1,
      date: "22/12/2022",
      product: "CURSO BEM ESTAR",
      salesman: "Joao Silva",
      value: "5000"
    });

    expect(response.ok).toBeTruthy();
    expect(response.body).toHaveProperty("id");
  });
});

describe("Get all transaction", () => {
  it("get all transactions successfully", async () => {
    const response = await request(app).get("/transactions");

    expect(response.ok).toBeTruthy();
  });
});

describe("Get all transactions by producer", () => {
  it("get all transactions successfully", async () => {
    const response = await request(app).get("/transactions/getByProducer").query({
      name: "Joao Silva"
    });

    expect(response.ok).toBeTruthy();
  });
});
