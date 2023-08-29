import ProductInterface from "../../../domain/product/entity/product.interface";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUsecase {
  constructor(private productRepository: ProductRepositoryInterface) {}

  public async execute(
    _input?: InputListProductDto
  ): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();
    return OutputMapper.toOutput(products);
  }
}

class OutputMapper {
  public static toOutput(products: ProductInterface[]): OutputListProductDto {
    return {
      products: products.map((product) => {
        return {
          id: product.id,
          name: product.name,
          price: product.price,
        };
      }),
    };
  }
}
