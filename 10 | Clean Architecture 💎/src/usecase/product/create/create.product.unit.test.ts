import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from "./create.product.dto";
import CreateProductUsecase from "./create.product.usecase";

const MockRepository: ProductRepositoryInterface = {
  findAll: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

describe("Unit test create product usecase", () => {
  it("should create a product", async () => {
    const usecase = new CreateProductUsecase(MockRepository);

    const input: InputCreateProductDto = {
      name: "Product 1",
      price: 10.0,
      type: 'a'
    };

    const output: OutputCreateProductDto = {
      id: expect.any(String),
      name: input.name,
      price: input.price,
    };

    const result = await usecase.execute(input);
    expect(result).toEqual(output);
  });
});
