import ProductAdmFacade from "../facade/product-adm.facade";
import ProductAdmFacadeInterface from "../facade/product-adm.facade.interface";
import ProductRepository from "../repository/product.repository";
import AddProductUsecase from "../usecase/add-product/add-product.usecase";
import CheckStockUsecase from "../usecase/check-stock/chec-stock-usecase";

export default class ProductAdmFacadeFactory {
  public static create(): ProductAdmFacadeInterface {
    const productRepository = new ProductRepository();
    const addProductUsecase = new AddProductUsecase(productRepository);
    const checkStockUsecase = new CheckStockUsecase(productRepository);
    const productAdmFacade = new ProductAdmFacade(
      addProductUsecase,
      checkStockUsecase
    );
    return productAdmFacade;
  }
}
