import InvoiceGateway from "../../gateway/invoice.gateway";
import GenerateInvoiceUsecase from "./generate.invoice.usecase";

const mockRepository: InvoiceGateway = {
  generate: jest.fn(),
  find: jest.fn(),
};

describe("Generate Invoice usecase", () => {
  it("should generate a invoice", async () => {
    const input = {
      id: "1",
      name: "John Doe",
      document: "123456789",
      address: "Rua 1",
      items: [
        {
          id: "1",
          name: "Item 1",
          price: 10,
        },
        {
          id: "2",
          name: "Item 2",
          price: 20,
        },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const generateInvoice = new GenerateInvoiceUsecase(mockRepository);
    const result = await generateInvoice.execute(input);

    expect(mockRepository.generate).toHaveBeenCalledTimes(1);

    expect(result).toEqual({
      id: input.id,
      name: input.name,
      total: 30,
      document: input.document,
      address: input.address,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
      items: [
        {
          id: input.items[0].id,
          name: input.items[0].name,
          price: input.items[0].price,
        },
        {
          id: input.items[1].id,
          name: input.items[1].name,
          price: input.items[1].price,
        },
      ],
    });
  });
});
