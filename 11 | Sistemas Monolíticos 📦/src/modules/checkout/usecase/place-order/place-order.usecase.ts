import Id from "../../../@shared/domain/value-object/id.value-object";
import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import { ClientAdmFacadeInterface } from "../../../client-adm/facade/client-adm.facade.interface";
import { InvoiceFacadeInterface } from "../../../invoice/facade/invoice.facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import { StoreCatalogFacadeInterface } from "../../../store-catalog/facade/store-catalog.facade.interface";
import Client from "../../domain/client.entity";
import Order from "../../domain/order.entity";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { InputPlaceOrderDto, OutputPlaceOrderDto } from "./place-order.dto";

export default class PlaceOrderUsecase implements UseCaseInterface {
  constructor(
    private readonly _checkoutGateway: CheckoutGateway,
    private readonly _clientFacade: ClientAdmFacadeInterface,
    private readonly _productFacade: ProductAdmFacadeInterface,
    private readonly _catalogFacade: StoreCatalogFacadeInterface,
    private readonly _mockInvoiceFacade: InvoiceFacadeInterface,
    private readonly _mockPaymentFacade: PaymentFacadeInterface
  ) {}

  public async execute(
    input: InputPlaceOrderDto
  ): Promise<OutputPlaceOrderDto> {
    const client = await this._clientFacade.find({ clientId: input.clientId });
    if (!client) throw new Error("Client not found");

    await this.validateProducts(input);

    const products = await Promise.all(
      input.products.map(async (product) => this.getProduct(product.productId))
    );

    const myClient = new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: client.address,
    });

    const order = new Order({
      client: myClient,
      products,
    });

    const payment = await this._mockPaymentFacade.process({
      orderId: new Id(order?.id?.id).id,
      amount: order.total,
    });

    const invoice =
      payment.status === "approved"
        ? await this._mockInvoiceFacade.generate({
            name: myClient.name,
            address: myClient.address,
            items: products.map((product) => ({
              id: product.id.id,
              name: product.name,
              price: product.salesPrice,
            })),
          })
        : null;

    payment.status === "approved" && order.approve();
    await this._checkoutGateway.addOrder(order);

    return {
      id: new Id(order?.id?.id).id,
      invoiceId: payment.status === "approved" ? invoice.id : null,
      status: order.status,
      total: order.total,
      products: order.products.map((product) => ({
        productId: product.id.id,
      })),
    };
  }

  private async validateProducts(input: InputPlaceOrderDto): Promise<void> {
    if (!input.products.length) throw new Error("No products selected");

    for (const product of input.products) {
      const isAvailable = await this._productFacade.checkStock({
        productId: product.productId,
      });

      if (!isAvailable) throw new Error("Product out of stock");
    }
  }

  private async getProduct(productId: string): Promise<Product> {
    const product = await this._catalogFacade.findById({ productId });
    if (!product) throw new Error("Product not found");
    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    });
  }
}
