import Address from "../value-object/address";
import Customer from "./customer";
import EventDispatcher from '../../@shared/event/event-dispatcher';
import LogWhenCustomerAddressUpdated from "../../product/event/handler/log-when-customer-address-updated";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      let customer = new Customer("", "John");
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      let customer = new Customer("123", "");
    }).toThrowError("Name is required");
  });

  it("should change name", () => {
    // Arrange
    const customer = new Customer("123", "John");

    // Act
    customer.changeName("Jane");

    // Assert
    expect(customer.name).toBe("Jane");
  });

  it("should activate customer", () => {
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.Address = address;

    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    expect(() => {
      const customer = new Customer("1", "Customer 1");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");
  });

  it("should deactivate customer", () => {
    const customer = new Customer("1", "Customer 1");

    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Customer 1");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  });

  it('should dispatch event when address is changed', () => {
    const eventDispatcher = new EventDispatcher();
    const handler = new LogWhenCustomerAddressUpdated();
    eventDispatcher.register('CustomerAdrressUpdatedEvent', handler);

    const handlerSpy = jest.spyOn(handler, 'handle');
    const consoleSpy = jest.spyOn(console, 'log');

    const customer = new Customer("1", "Customer 1", eventDispatcher);
    const address = new Address("Street 1", 123, "13330-250", "São Paulo");
    customer.changeAddress(address);

    const expectedEvent = expect.objectContaining({
      dataTimeOccurred: expect.any(Date),
      eventData: customer,
    });

    expect(handlerSpy).toBeCalledTimes(1);
    expect(handlerSpy).toBeCalledWith(expectedEvent);
    expect(consoleSpy).toBeCalledTimes(1);
    expect(consoleSpy).toBeCalledWith(`O endereço do cliente ${customer.name} mudou para ${address.toString()}`);
  });
});
