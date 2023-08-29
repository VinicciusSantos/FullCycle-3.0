import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import ListCustomersUseCase from "./list.custumer.usecase";

const customer1 = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Rua dos Bobos", 1, "São Paulo", "00000-000")
);

const customer2 = CustomerFactory.createWithAddress(
  "Jane Doe",
  new Address("Avenida Paulista", 1, "São Paulo", "00000-000")
);

const MockRepository: CustomerRepositoryInterface = {
  findAll: jest.fn().mockReturnValue([customer1, customer2]),
  find: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

describe("Unit test list customer usecase", () => {
  it("should list all customers", async () => {
    const cutomerListUsecase = new ListCustomersUseCase(MockRepository);

    const result = await cutomerListUsecase.execute();
    expect(result).toEqual({
      customers: [
        {
          id: customer1.id,
          name: customer1.name,
          address: {
            street: customer1.Address.street,
            number: customer1.Address.number,
            city: customer1.Address.city,
            zip: customer1.Address.zip,
          },
        },
        {
          id: customer2.id,
          name: customer2.name,
          address: {
            street: customer2.Address.street,
            number: customer2.Address.number,
            city: customer2.Address.city,
            zip: customer2.Address.zip,
          },
        },
      ],
    });
  });
});
