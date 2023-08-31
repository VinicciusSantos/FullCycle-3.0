import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import InvoiceItem from "../../domain/invoice.item.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import FindInvoiceUsecase from "./find.invoite.usecase";

const invoice = new Invoice({
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

const mockRepository: InvoiceGateway = {
  generate: jest.fn(),
  find: jest.fn().mockReturnValue(invoice),
};

describe("Find Invoice usecase", () => {
  it("should find a invoice", async () => {
    const input = {
      id: invoice.id.id,
    };

    const findInvoice = new FindInvoiceUsecase(mockRepository);
    const result = await findInvoice.execute(input);

    expect(mockRepository.find).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      total: 30,
      items: [
        {
          id: invoice.items[0].id.id,
          name: invoice.items[0].name,
          price: invoice.items[0].price,
        },
        {
          id: invoice.items[1].id.id,
          name: invoice.items[1].name,
          price: invoice.items[1].price,
        },
      ],
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });
  });
});
