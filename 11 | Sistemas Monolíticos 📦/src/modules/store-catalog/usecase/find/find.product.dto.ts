export interface InputFindProductDto {
  productId: string;
}

export interface OutputFindProductDto {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}
