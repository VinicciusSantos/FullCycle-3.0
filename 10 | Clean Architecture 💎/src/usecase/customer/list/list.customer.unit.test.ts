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
          address: {
            city: "00000-000",
            number: 1,
            street: "Rua dos Bobos",
            zip: "São Paulo",
          },
          id: "43762fdd-d5ac-4eea-a51d-ce34a727d8e9",
          name: "John Doe",
        },
        {
          address: {
            city: "00000-000",
            number: 1,
            street: "Avenida Paulista",
            zip: "São Paulo",
          },
          id: "ecfd117b-59ae-4b2b-84b1-2563a54de285",
          name: "Jane Doe",
        },
      ],
    });
  });
});
