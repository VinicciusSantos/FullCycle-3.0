import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test products api", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const input = {
      name: "Product 1",
      price: 10.0,
      type: "a",
    };
    const response = await request(app).post("/product").send(input);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      name: "Product 1",
      price: 10.0,
    });
  });

  it("should not create a product with invalid input", async () => {
    const input = {
      name: "Product 1",
    };
    const response = await request(app).post("/product").send(input);
    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const input = {
      name: "Product 1",
      price: 10.0,
      type: "a",
    };
    await request(app).post("/product").send(input);

    const input2 = {
      name: "Product 2",
      price: 20.0,
      type: "a",
    };
    await request(app).post("/product").send(input2);

    const response = await request(app).get("/product");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      products: [
        { id: expect.any(String), name: input.name, price: input.price },
        { id: expect.any(String), name: input2.name, price: input2.price },
      ],
    });
  });
});
