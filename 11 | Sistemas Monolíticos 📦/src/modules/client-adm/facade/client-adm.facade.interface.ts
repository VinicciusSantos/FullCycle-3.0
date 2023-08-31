export interface InputAddClientFacadeDto {
  id?: string;
  name: string;
  email: string;
  address: string;
}

export interface OutputAddClientFacadeDto {
  id: string;
  name: string;
  email: string;
  address: string;
}

export interface InputFindClientDto {
  clientId: string;
}

export interface OutputFindClientDto {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientAdmFacadeInterface {
  add(input: InputAddClientFacadeDto): Promise<OutputAddClientFacadeDto>;
  find(input: InputFindClientDto): Promise<OutputFindClientDto>;
}
