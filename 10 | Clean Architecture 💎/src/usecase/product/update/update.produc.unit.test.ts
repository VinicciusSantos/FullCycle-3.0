import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";
import UpdateProductUsecase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product 1", 10.0);

const MockRepository: ProductRepositoryInterface = {
    findAll: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn().mockReturnValue(product),
};

describe("Unit test update product usecase", () => {
    it("should update a product", async () => {
        const usecase = new UpdateProductUsecase(MockRepository);
        const input: InputUpdateProductDto = {
            id: product.id,
            name: product.name,
            price: product.price,
        }
        const output: OutputUpdateProductDto = {
            id: product.id,
            name: product.name,
            price: product.price,
        }
        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    })
})