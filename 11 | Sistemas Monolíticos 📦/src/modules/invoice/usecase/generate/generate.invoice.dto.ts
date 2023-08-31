export interface GenerateInvoiceUseCaseInputDto {
  id?: string;
  name: string;
  document: string;
  address: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GenerateInvoiceUseCaseOutputDto {
  id: string;
  name: string;
  document: string;
  address: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
  createdAt: Date;
  updatedAt: Date;
}
