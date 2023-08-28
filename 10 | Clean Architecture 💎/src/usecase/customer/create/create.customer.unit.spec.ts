import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import { InputCreateCustomerDto } from "./create.customer.dto";
import CreateCustomerUsecase from "./create.customer.usecase";

const input: InputCreateCustomerDto = {
  name: "John Doe",
  address: {
    street: "Rua dos Bobos",
    city: "São Paulo",
    number: 1,
    zip: "00000-000",
  },
};

const MockRepository: CustomerRepositoryInterface = {
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

describe("Unit test create customer usecase", () => {
  it("should create a customer", async () => {
    const cutomerCreateUsecase = new CreateCustomerUsecase(MockRepository);

    const output = {
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        city: input.address.city,
        number: input.address.number,
        zip: input.address.zip,
      },
    };

    const result = await cutomerCreateUsecase.execute(input);
    expect(result).toEqual(output);
  });

  it("should throw an error when name is missing", async () => {
    const cutomerCreateUsecase = new CreateCustomerUsecase(MockRepository);

    const input: InputCreateCustomerDto = {
      name: "",
      address: {
        street: "Rua dos Bobos",
        city: "São Paulo",
        number: 1,
        zip: "00000-000",
      },
    };

    await expect(async () => {
      await cutomerCreateUsecase.execute(input);
    }).rejects.toThrow("Name is required");
  });

  it("should throw an error when street is missing", async () => {
    const cutomerCreateUsecase = new CreateCustomerUsecase(MockRepository);

    const input: InputCreateCustomerDto = {
      name: "John Doe",
      address: {
        street: "",
        city: "São Paulo",
        number: 1,
        zip: "00000-000",
      },
    };

    await expect(async () => {
      await cutomerCreateUsecase.execute(input);
    }).rejects.toThrow("Street is required");
  });
});
