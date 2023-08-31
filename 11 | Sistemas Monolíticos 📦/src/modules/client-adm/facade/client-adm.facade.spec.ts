import { Sequelize } from "sequelize-typescript";
import ClientModel from "../repository/client.model";
import ClientAdmFacadeFactory from "../factory/facade.factory";

describe("Client Adm Facade", () => {
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
    const facade = ClientAdmFacadeFactory.create();
    const result = await facade.find({ clientId: "1" });

    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(input.name);
    expect(result.email).toEqual(input.email);
    expect(result.address).toEqual(input.address);
  });

  it("should add a client", async () => {
    const facade = ClientAdmFacadeFactory.create();
    await facade.add({
      id: "1",
      name: "John Doe",
      email: "john@mail.com",
      address: "Rua 1",
    });

    const result = await ClientModel.findOne({ where: { id: "1" } });

    expect(result.id).toEqual("1");
    expect(result.name).toEqual("John Doe");
    expect(result.email).toEqual("john@mail.com")
    expect(result.address).toEqual("Rua 1");
  });
});
