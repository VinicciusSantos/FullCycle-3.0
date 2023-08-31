import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import Invoice from "../../domain/invoice.entity";
import InvoiceItem from "../../domain/invoice.item.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto,
} from "./generate.invoice.dto";

export default class GenerateInvoiceUsecase implements UseCaseInterface {
  constructor(private invoiceGateway: InvoiceGateway) {}

  public async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const invoice = new Invoice({
      id: new Id(input.id),
      name: input.name,
      document: input.document,
      address: input.address,
      items: input.items.map(
        (item) =>
          new InvoiceItem({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
          })
      ),
      createdAt: input.createdAt || new Date(),
      updatedAt: input.updatedAt || new Date(),
    });
    await this.invoiceGateway.generate(invoice);

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      total: invoice.items.reduce(
        (acc: number, item: InvoiceItem) => acc + item.price,
        0
      ),
      items: invoice.items.map((item: InvoiceItem) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    };
  }
}
