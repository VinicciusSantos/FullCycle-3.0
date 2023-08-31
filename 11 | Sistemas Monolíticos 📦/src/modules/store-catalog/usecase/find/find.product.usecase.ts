import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class FindProductUsecase implements UseCaseInterface {
  constructor(private productGateway: ProductGateway) {}

  public async execute(
    input: InputFindProductDto
  ): Promise<OutputFindProductDto> {
    const product = await this.productGateway.findById(input.productId);

    if (!product) {
      throw new Error("Product not found");
    }

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };
  }
}
