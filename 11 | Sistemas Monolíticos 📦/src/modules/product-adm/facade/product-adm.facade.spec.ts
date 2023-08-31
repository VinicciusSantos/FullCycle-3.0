import { Sequelize } from "sequelize-typescript";
import ProductModel from "../repository/product.model";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import { InputAddProductFacadeDto } from "./product-adm.facade.interface";

describe("ProductDamFacade", () => {
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

  it("should add a product", async () => {
    const productAdmFacade = ProductAdmFacadeFactory.create();

    await productAdmFacade.addProduct({
      name: "Product 1",
      description: "Description 1",
      purchasePrice: 10,
      stock: 10,
    });

    const product = await ProductModel.findOne({
      where: { name: "Product 1" },
    });

    expect(product).toBeDefined();
    expect(product.name).toBe("Product 1");
    expect(product.description).toBe("Description 1");
    expect(product.purchasePrice).toBe(10);
    expect(product.stock).toBe(10);
  });

  it("should check stock of a product", async () => {
    const productAdmFacade = ProductAdmFacadeFactory.create();

    const input: InputAddProductFacadeDto = {
      id: "1",
      name: "Product 1",
      description: "Description 1",
      purchasePrice: 10,
      stock: 10,
    };
    await productAdmFacade.addProduct(input);

    const result = await productAdmFacade.checkStock({ productId: "1" });

    expect(result).toEqual({
      productId: input.id,
      stock: input.stock,
    });
  });
});
