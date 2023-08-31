import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {
  InputFindByIdFacade,
  OutputFindAllFacade,
  OutputFindByIdFacade,
  StoreCatalogFacadeInterface,
} from "./store-catalog.facade.interface";

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  constructor(
    private findByIdProductsUsecase: UseCaseInterface,
    private findAllProductsUsecase: UseCaseInterface
  ) {}

  async findById(input: InputFindByIdFacade): Promise<OutputFindByIdFacade> {
    return await this.findByIdProductsUsecase.execute(input);
  }

  async findAll(): Promise<OutputFindAllFacade> {
    return await this.findAllProductsUsecase.execute({});
  }
}
