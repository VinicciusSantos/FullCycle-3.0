import { Sequelize } from "sequelize-typescript";
import ClientModel from "./client.model";
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

describe("Client Repository", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find a client", async () => {
    const input = {
      id: "1",
      name: "John Doe",
      email: "john@mail.com",
      address: "Rua 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await ClientModel.create(input);

    const repository = new ClientRepository();
    const response = await repository.find(input.id);
    expect(response.id.id).toEqual(input.id);
    expect(response.name).toEqual(input.name);
    expect(response.email).toEqual(input.email);
    expect(response.address).toEqual(input.address);
  });

  it("should add a client", async () => {
    const input = {
      id: "1",
      name: "John Doe",
      email: "john@mail.com",
      address: "Rua 1",
    };
    const client = new Client({
      id: new Id(input.id),
      name: input.name,
      email: input.email,
      address: input.address,
    });

    const repository = new ClientRepository();
    await repository.add(client);

    const response = await ClientModel.findByPk(input.id);
    expect(response.id).toEqual(input.id);
    expect(response.name).toEqual(input.name);
    expect(response.email).toEqual(input.email);
    expect(response.address).toEqual(input.address);
  });
});
