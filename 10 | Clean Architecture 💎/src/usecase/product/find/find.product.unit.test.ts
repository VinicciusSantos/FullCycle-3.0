import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";
import FindProductUsecase from "./find.product.usecase";

const product = ProductFactory.create("a", "Product 1", 10.0);

const MockRepository: ProductRepositoryInterface = {
  findAll: jest.fn(),
  find: jest.fn().mockReturnValue(product),
  create: jest.fn(),
  update: jest.fn(),
};

describe("Unit test find product usecase", () => {
  it("should find a product", async () => {
    const usecase = new FindProductUsecase(MockRepository);

    const input: InputFindProductDto = {
      id: product.id,
    };

    const output: OutputFindProductDto = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    const result = await usecase.execute(input);
    expect(result).toEqual(output);
  });

  it("should throw an error when product is not found", async () => {
    MockRepository.find = jest.fn().mockReturnValue(null);
    const usecase = new FindProductUsecase(MockRepository);

    const input: InputFindProductDto = {
      id: "random-id",
    };

    await expect(usecase.execute(input)).rejects.toThrowError(
      "Product not found!"
    );
  });
});
