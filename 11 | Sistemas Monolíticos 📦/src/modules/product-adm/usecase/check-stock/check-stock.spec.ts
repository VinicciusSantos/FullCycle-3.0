import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import CheckStockUsecase from "./chec-stock-usecase";
import { InputCheckStockDto } from "./check-stock.dto";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Description 1",
  purchasePrice: 10,
  stock: 10,
});

const MockRepository: ProductGateway = {
  add: jest.fn(),
  find: jest.fn().mockResolvedValue(product),
};

describe("Check stock usecase", () => {
  it("should get stock of a product", async () => {
    const checkStockUsecase = new CheckStockUsecase(MockRepository);
    const input: InputCheckStockDto = { productId: "1" };
    const output = await checkStockUsecase.execute(input);
    expect(MockRepository.find).toBeCalledWith("1");
    expect(output).toEqual({
      productId: "1",
      stock: 10,
    });
  });
});
