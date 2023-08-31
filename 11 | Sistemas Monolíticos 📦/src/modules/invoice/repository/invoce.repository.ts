import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceItem from "../domain/invoice.item.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import InvoiceItemModel from "./invoice.item.model";
import InvoiceModel from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  public async generate(invoice: Invoice): Promise<void> {
    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      items: invoice.items,
      createdAt: invoice.createdAt || new Date(),
      updatedAt: invoice.createdAt || new Date(),
    });

    await Promise.all(
      invoice.items.map(async (item) =>
        InvoiceItemModel.create({
          id: item.id.id,
          name: item.name,
          price: item.price,
          invoiceId: invoice.id.id,
          createdAt: item.createdAt || new Date(),
          updatedAt: item.createdAt || new Date(),
        })
      )
    );
  }

  public async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findByPk(id, {
      include: [InvoiceItemModel],
    });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      items: invoice.items.map(
        (item) =>
          new InvoiceItem({
            id: new Id(item.id),
            name: item.name,
            price: item.price,
          })
      ),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });
  }
}
