import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import InvoiceItem from "../../domain/invoice.item.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO,
} from "./find.invoice.dto";

export default class FindInvoiceUsecase implements UseCaseInterface {
  constructor(private invoiceGateway: InvoiceGateway) {}

  public async execute(
    Input: FindInvoiceUseCaseInputDTO
  ): Promise<FindInvoiceUseCaseOutputDTO> {
    const invoice = await this.invoiceGateway.find(Input.id);

    if (!invoice) {
      throw new Error("Invoice not found");
    }

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
