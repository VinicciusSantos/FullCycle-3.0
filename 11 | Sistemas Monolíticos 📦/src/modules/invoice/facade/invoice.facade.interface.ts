export interface GenerateInvoiceFacadeInputDto {
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

export interface GenerateInvoiceFacadeOutputDto {
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

export interface FindInvoiceFacadeInputDTO {
  id: string;
}

export interface FindInvoiceFacadeOutputDTO {
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

export interface InvoiceFacadeInterface {
  generate(
    input: GenerateInvoiceFacadeInputDto
  ): Promise<GenerateInvoiceFacadeOutputDto>;
  find(input: FindInvoiceFacadeInputDTO): Promise<FindInvoiceFacadeOutputDTO>;
}
