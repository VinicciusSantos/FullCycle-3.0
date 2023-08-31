import StoreCatalogFacade from "../facade/store-catalog.facade";
import { StoreCatalogFacadeInterface } from "../facade/store-catalog.facade.interface";
import ProductRepository from "../repository/product.repository";
import FindAllProductsUsecase from "../usecase/find-all/find-all-products.usecase";
import FindProductUsecase from "../usecase/find/find.product.usecase";

export default class StoreCatalogFacadeFactory {
  static create(): StoreCatalogFacadeInterface {
    const repository = new ProductRepository();
    const findAllProductsUsecase = new FindAllProductsUsecase(repository);
    const findByIdProductsUsecase = new FindProductUsecase(repository);
    return new StoreCatalogFacade(
      findByIdProductsUsecase,
      findAllProductsUsecase
    );
  }
}
