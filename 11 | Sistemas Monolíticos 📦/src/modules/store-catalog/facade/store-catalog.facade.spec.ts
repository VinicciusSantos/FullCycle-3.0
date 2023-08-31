import { Sequelize } from "sequelize-typescript";
import StoreCatalogFacadeFactory from "../factory/facade.factory";
import ProductModel from "../repository/product.model";

describe("StoreCatalogFacade", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });
    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should find all products in store", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });

    await ProductModel.create({
      id: "2",
      name: "Product 2",
      description: "Description 2",
      salesPrice: 200,
    });

    const facade = StoreCatalogFacadeFactory.create();
    const result = await facade.findAll();
    expect(result.products.length).toBe(2);
    expect(result.products).toEqual([
      {
        id: "1",
        name: "Product 1",
        description: "Description 1",
        salesPrice: 100,
      },
      {
        id: "2",
        name: "Product 2",
        description: "Description 2",
        salesPrice: 200,
      },
    ]);
  });

  it("should find a product in store", async () => {
    await ProductModel.create({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });

    const facade = StoreCatalogFacadeFactory.create();
    const result = await facade.findById({ productId: "1" });
    expect(result).toEqual({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });
  });
});
