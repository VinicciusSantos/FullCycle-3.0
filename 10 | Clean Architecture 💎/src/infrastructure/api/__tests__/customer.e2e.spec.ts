import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test customer api", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const input = {
      name: "John Doe",
      address: {
        street: "Rua dos Bobos",
        number: 1,
        city: "São Paulo",
        zip: "00000-000",
      },
    };
    const response = await request(app).post("/customer").send(input);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      id: expect.any(String),
      ...input,
    });
  });

  it("should not create a customer with invalid input", async () => {
    const input = {
      name: "John Doe",
    };
    const response = await request(app).post("/customer").send(input);
    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
    const input = {
      name: "John Doe",
      address: {
        street: "Rua dos Bobos",
        number: 1,
        city: "São Paulo",
        zip: "00000-000",
      },
    };
    await request(app).post("/customer").send(input);

    const input2 = {
      name: "Jane Doe",
      address: {
        street: "Avenida Paulista",
        number: 1,
        city: "São Paulo",
        zip: "00000-000",
      },
    };
    await request(app).post("/customer").send(input2);

    const response = await request(app).get("/customer");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      customers: [
        { id: expect.any(String), ...input },
        { id: expect.any(String), ...input2 },
      ],
    });
  });
});
