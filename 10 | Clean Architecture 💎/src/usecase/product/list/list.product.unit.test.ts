import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ListProductUsecase from "./list.product.usecase";

const product1 = ProductFactory.create("a", "Product 1", 10.0);
const product2 = ProductFactory.create("b", "Product 2", 20.0);

const MockRepository: ProductRepositoryInterface = {
  findAll: jest.fn().mockReturnValue([product1, product2]),
  find: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

describe("Unit test list product usecase", () => {
  it("should list all products", async () => {
    const usecase = new ListProductUsecase(MockRepository);

    const result = await usecase.execute();
    expect(result).toEqual({
      products: [
        {
          id: product1.id,
          name: product1.name,
          price: product1.price,
        },
        {
          id: product2.id,
          name: product2.name,
          price: product2.price,
        },
      ],
    });
  });
});
