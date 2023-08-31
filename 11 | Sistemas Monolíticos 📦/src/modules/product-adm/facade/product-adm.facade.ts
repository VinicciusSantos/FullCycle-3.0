import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, {
  InputAddProductFacadeDto,
  InputCheckStockFacadeDto,
} from "./product-adm.facade.interface";

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  constructor(
    private addUsecase: UseCaseInterface,
    private checkStockUsecase: UseCaseInterface
  ) {}

  public async addProduct(product: InputAddProductFacadeDto): Promise<void> {
    this.addUsecase.execute(product);
  }

  public async checkStock(input: InputCheckStockFacadeDto): Promise<boolean> {
    return this.checkStockUsecase.execute(input);
  }
}
