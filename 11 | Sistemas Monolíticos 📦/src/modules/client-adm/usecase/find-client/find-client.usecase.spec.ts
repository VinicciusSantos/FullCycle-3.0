import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
  id: new Id("1"),
  name: "Lucian",
  email: "lucian@123.com",
  address: "Rua 1",
});

const MockRepository = {
  add: jest.fn(),
  find: jest.fn().mockReturnValue(Promise.resolve(client)),
};

describe("Find Client use case unit test", () => {
  it("should find a client", async () => {
    const usecase = new FindClientUseCase(MockRepository);

    const input = {
      id: "1",
    };

    const result = await usecase.execute(input);

    expect(MockRepository.find).toHaveBeenCalled();
    expect(result.id).toEqual(input.id);
    expect(result.name).toEqual(client.name);
    expect(result.email).toEqual(client.email);
    expect(result.address).toEqual(client.address);
    expect(result.createdAt).toEqual(client.createdAt);
    expect(result.updatedAt).toEqual(client.updatedAt);
  });
});
