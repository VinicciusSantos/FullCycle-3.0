
import Id from "../../../@shared/domain/value-object/id.value-object";
import Product from "../../domain/product.entity";
import ProductGateway from "../../gateway/product.gateway";
import FindProductUsecase from "./find.product.usecase";

const product = new Product({
  id: new Id("1"),
  name: "Product 1",
  description: "Description 1",
  salesPrice: 100,
});

const MockRepository: ProductGateway = {
  findAll: jest.fn(),
  findById: jest.fn().mockReturnValue(product),
};

describe("FindProduct", () => {
  it("should find a product", async () => {
    const findProduct = new FindProductUsecase(MockRepository);
    const product = await findProduct.execute({ productId: "1" });

    expect(product).toEqual({
      id: "1",
      name: "Product 1",
      description: "Description 1",
      salesPrice: 100,
    });
  });
});
