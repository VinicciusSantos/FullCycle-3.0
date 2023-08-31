import ClientAdmFacade from "../facade/client-adm.facade";
import { ClientAdmFacadeInterface } from "../facade/client-adm.facade.interface";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
  public static create(): ClientAdmFacadeInterface {
    const repository = new ClientRepository();
    const addClientUsecase = new AddClientUseCase(repository);
    const findClientUsecase = new FindClientUseCase(repository);
    return new ClientAdmFacade(addClientUsecase, findClientUsecase);
  }
}
