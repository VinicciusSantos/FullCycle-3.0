export interface InputPlaceOrderDto {
  clientId: string;
  products: {
    productId: string;
  }[];
}

export interface OutputPlaceOrderDto {
  id: string;
  products: {
    productId: string;
  }[];
  invoiceId: string;
  status: string;
  total: number;
}
