import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {
  ClientAdmFacadeInterface,
  InputAddClientFacadeDto,
  InputFindClientDto,
  OutputAddClientFacadeDto,
  OutputFindClientDto,
} from "./client-adm.facade.interface";

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  constructor(
    private readonly addClientUsecase: UseCaseInterface,
    private readonly findClientUsecase: UseCaseInterface
  ) {}

  public async find(input: InputFindClientDto): Promise<OutputFindClientDto> {
    const response = await this.findClientUsecase.execute({
      id: input.clientId,
    });
    return {
      id: response.id,
      name: response.name,
      email: response.email,
      address: response.address,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    };
  }

  public async add(
    input: InputAddClientFacadeDto
  ): Promise<OutputAddClientFacadeDto> {
    const response = await this.addClientUsecase.execute(input);
    return {
      id: response.id.id,
      name: response.name,
      email: response.email,
      address: response.address,
    };
  }
}
