export interface InputFindByIdFacade {
  productId: string;
}

export interface OutputFindByIdFacade {
  id: string;
  name: string;
  description: string;
  salesPrice: number;
}

export interface OutputFindAllFacade {
  products: {
    id: string;
    name: string;
    description: string;
    salesPrice: number;
  }[];
}

export interface StoreCatalogFacadeInterface {
  findById(input: InputFindByIdFacade): Promise<OutputFindByIdFacade>;
  findAll(): Promise<OutputFindAllFacade>;
}
