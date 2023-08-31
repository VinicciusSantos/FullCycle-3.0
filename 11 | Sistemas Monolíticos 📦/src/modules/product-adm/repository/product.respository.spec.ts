import { Sequelize } from "sequelize-typescript";
import ProductModel from "./product.model";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import ProductRepository from "./product.repository";

describe("ProductRepository test", () => {
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
    const productRepository = new ProductRepository();
    const productProps = {
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
    };
    const product = new Product(productProps);
    await productRepository.add(product);

    const productDb = await ProductModel.findByPk(productProps.id.id);
    expect(productDb).toEqual(
      expect.objectContaining({
        id: productProps.id.id,
        name: productProps.name,
        description: productProps.description,
        purchasePrice: productProps.purchasePrice,
        stock: productProps.stock,
      })
    );
    expect(productDb.createdAt).toEqual(expect.any(Date));
    expect(productDb.updatedAt).toEqual(expect.any(Date));
  });

  it("should find a product", async () => {
    const productProps = {
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await ProductModel.create(productProps);
    const productRepository = new ProductRepository();
    const result = await productRepository.find(productProps.id);
    expect(result).toBeInstanceOf(Product);
    expect(result).toEqual(
      new Product({
        id: new Id(productProps.id),
        name: productProps.name,
        description: productProps.description,
        purchasePrice: productProps.purchasePrice,
        stock: productProps.stock,
        createdAt: productProps.createdAt,
        updatedAt: productProps.updatedAt,
      })
    );
  });
});
