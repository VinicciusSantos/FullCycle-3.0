import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import InvoiceModel from "../repository/invoice.model";
import InvoiceItemModel from "../repository/invoice.item.model";

describe("InvoiceFacade", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a invoice", async () => {
    const input = {
      name: "John Doe",
      document: "123456789",
      address: "Rua 1",
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 10,
        },
        {
          id: "2",
          name: "Product 2",
          price: 20,
        },
      ],
    };
    const invoiceFacade = InvoiceFacadeFactory.create();
    const response = await invoiceFacade.generate(input);

    expect(response.id).toBeDefined();
    expect(response.name).toEqual(input.name);
    expect(response.document).toEqual(input.document);
    expect(response.address).toEqual(input.address);
    expect(response.items.length).toEqual(input.items.length);
    expect(response.items[0].name).toEqual(input.items[0].name);
    expect(response.items[0].price).toEqual(input.items[0].price);
    expect(response.items[1].name).toEqual(input.items[1].name);
    expect(response.items[1].price).toEqual(input.items[1].price);
  });
});
