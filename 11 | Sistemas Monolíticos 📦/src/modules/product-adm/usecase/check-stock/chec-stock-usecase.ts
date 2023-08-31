import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { InputCheckStockDto, OutputCheckStockDto } from "./check-stock.dto";

export default class CheckStockUsecase implements UseCaseInterface {
  constructor(private productGateway: ProductGateway) {}

  public async execute(
    input: InputCheckStockDto
  ): Promise<OutputCheckStockDto> {
    const result = await this.productGateway.find(input.productId);

    if (!result) {
      throw new Error("Product not found");
    }

    return {
      productId: result.id.id,
      stock: result.stock,
    };
  }
}
