import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";
import EventDispatcher from "../../../../domain/@shared/event/event-dispatcher";
import EventDispatcherInterface from "../../../../domain/@shared/event/event-dispatcher.interface";
import CustomerCreatedHandler1 from "../../../../domain/product/event/handler/log1-when-customer-created";
import CustomerCreatedHandler2 from "../../../../domain/product/event/handler/log2-when-customer-created";

describe("Customer repository test", () => {
  const eventDispatcher: EventDispatcherInterface = new EventDispatcher();
  let sequelize: Sequelize;
  let customerRepository: CustomerRepository;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([CustomerModel]);
    await sequelize.sync();

    customerRepository = new CustomerRepository(eventDispatcher);
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });
  });

  it("should dispatch event when customer is created", async () => {
    const handler1 = new CustomerCreatedHandler1();
    const handler2 = new CustomerCreatedHandler2();
    const handlerSpy1 = jest.spyOn(handler1, "handle");
    const handlerSpy2 = jest.spyOn(handler2, "handle");
    eventDispatcher.register("CustomerCreatedEvent", handler1);
    eventDispatcher.register("CustomerCreatedEvent", handler2);

    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;

    const consoleSpy = jest.spyOn(console, "log");
    await customerRepository.create(customer);

    const expectedEvent = expect.objectContaining({
      dataTimeOccurred: expect.any(Date),
      eventData: customer,
    });

    expect(handlerSpy1).toBeCalledTimes(1);
    expect(handlerSpy1).toBeCalledWith(expectedEvent);

    expect(handlerSpy2).toBeCalledTimes(1);
    expect(handlerSpy2).toBeCalledWith(expectedEvent);

    expect(consoleSpy).toBeCalledWith(
      "Esse é o primeiro console.log do evento: CustomerCreated",
      expectedEvent
    );
    expect(consoleSpy).toBeCalledWith(
      "Esse é o segundo console.log do evento: CustomerCreated",
      expectedEvent
    );
  });

  it("should update a customer", async () => {
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;
    await customerRepository.create(customer);

    customer.changeName("Customer 2");
    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findOne({ where: { id: "123" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "123",
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
    });
  });

  it("should find a customer", async () => {
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.Address = address;
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  it("should throw an error when customer is not found", async () => {
    expect(async () => {
      await customerRepository.find("456ABC");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customer1 = new Customer("123", "Customer 1");
    const address1 = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer1.Address = address1;
    customer1.addRewardPoints(10);
    customer1.activate();

    const customer2 = new Customer("456", "Customer 2");
    const address2 = new Address("Street 2", 2, "Zipcode 2", "City 2");
    customer2.Address = address2;
    customer2.addRewardPoints(20);

    await customerRepository.create(customer1);
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toContainEqual(customer1);
    expect(customers).toContainEqual(customer2);
  });
});
