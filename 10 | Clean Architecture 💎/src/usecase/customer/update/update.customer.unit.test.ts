import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUsecase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
  "John Doe",
  new Address("Rua dos Bobos", 1, "00000-000", "São Paulo")
);

const input = {
  id: customer.id,
  name: "John  updated",
  address: {
    street: "Rua dos Bobos updated",
    number: 2,
    zip: "11111-111",
    city: "São Paulo updated",
  },
};

const MockRepository: CustomerRepositoryInterface = {
  find: jest.fn().mockReturnValue(customer),
  update: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
};

describe("Unit test update customer usecase", () => {
  it("should update a customer", async () => {
    const usecase = new UpdateCustomerUsecase(MockRepository);
    const result = await usecase.execute(input);
    expect(result).toEqual(input);
  });
});
