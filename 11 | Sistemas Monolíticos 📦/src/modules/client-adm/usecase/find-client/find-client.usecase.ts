import ClientGateway from "../../gateway/client.gateway";
import ClientModel from "../../repository/client.model";
import {
  FindClientUseCaseInputDto,
  FindClientUseCaseOutputDto,
} from "./find-client.usecase.dto";

export default class FindClientUseCase {
  private _clientRepository: ClientGateway;

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository;
  }

  public async execute(
    input: FindClientUseCaseInputDto
  ): Promise<FindClientUseCaseOutputDto> {
    const result = await this._clientRepository.find(input.id);

    if (!result) throw new Error("Client not found");

    return {
      id: result.id.id,
      name: result.name,
      email: result.email,
      address: result.address,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }
}
