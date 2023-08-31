import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "./invoice.model";
import InvoiceRepository from "./invoce.repository";
import Invoice from "../domain/invoice.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItemModel from "./invoice.item.model";
import InvoiceItem from "../domain/invoice.item.entity";

describe("InvoiceRepository", () => {
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
    const input = new Invoice({
      id: new Id("1"),
      name: "John Doe",
      document: "123456789",
      address: "Rua 1",
      items: [
        new InvoiceItem({
          id: new Id("1"),
          name: "Item 1",
          price: 10,
        }),
        new InvoiceItem({
          id: new Id("2"),
          name: "Item 2",
          price: 20,
        }),
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const invoiceRepository = new InvoiceRepository();
    await invoiceRepository.generate(input);

    const response = await InvoiceModel.findByPk(input.id.id, {
      include: [InvoiceItemModel],
    });

    expect(response.id).toEqual(input.id.id);
    expect(response.name).toEqual(input.name);
    expect(response.document).toEqual(input.document);
    expect(response.address).toEqual(input.address);
    expect(response.createdAt).toEqual(input.createdAt);
    expect(response.updatedAt).toEqual(input.updatedAt);
    expect(response.items.length).toEqual(input.items.length);
    expect(response.items[0].id).toEqual(input.items[0].id.id);
    expect(response.items[0].name).toEqual(input.items[0].name);
    expect(response.items[0].price).toEqual(input.items[0].price);
    expect(response.items[1].id).toEqual(input.items[1].id.id);
    expect(response.items[1].name).toEqual(input.items[1].name);
    expect(response.items[1].price).toEqual(input.items[1].price);
  });

  it("should find a invoice", async () => {
    const input = new Invoice({
      id: new Id("1"),
      name: "John Doe",
      document: "123456789",
      address: "Rua 1",
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await InvoiceModel.create({
      id: input.id.id,
      name: input.name,
      document: input.document,
      address: input.address,
      items: input.items,
      createdAt: input.createdAt,
      updatedAt: input.createdAt,
    });

    const invoiceRepository = new InvoiceRepository();
    const response = await invoiceRepository.find(input.id.id);

    expect(response.id).toEqual(input.id);
    expect(response.name).toEqual(input.name);
    expect(response.document).toEqual(input.document);
    expect(response.address).toEqual(input.address);
    expect(response.items).toEqual(input.items);
    expect(response.createdAt).toEqual(input.createdAt);
    expect(response.updatedAt).toEqual(input.updatedAt);
  });
});
