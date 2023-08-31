export interface InputAddProductFacadeDto {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export interface InputCheckStockFacadeDto {
  productId: string;
}

export interface OutputCheckStockFacadeDto {
  productId: string;
  stock: number;
}

export default interface ProductAdmFacadeInterface {
  addProduct(product: InputAddProductFacadeDto): Promise<void>;
  checkStock(id: InputCheckStockFacadeDto): Promise<boolean>;
}
