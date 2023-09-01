import { Order } from "sequelize";
import Id from "../../../@shared/domain/value-object/id.value-object";
import { ClientAdmFacadeInterface } from "../../../client-adm/facade/client-adm.facade.interface";
import { InvoiceFacadeInterface } from "../../../invoice/facade/invoice.facade.interface";
import PaymentFacadeInterface from "../../../payment/facade/facade.interface";
import ProductAdmFacadeInterface, {
  InputCheckStockFacadeDto,
} from "../../../product-adm/facade/product-adm.facade.interface";
import { StoreCatalogFacadeInterface } from "../../../store-catalog/facade/store-catalog.facade.interface";
import Product from "../../domain/product.entity";
import CheckoutGateway from "../../gateway/checkout.gateway";
import { InputPlaceOrderDto } from "./place-order.dto";
import PlaceOrderUsecase from "./place-order.usecase";

const mockDate = new Date("2021-01-01");

describe("PlaceOrder usecase", () => {
  let placeOrderUsecase: PlaceOrderUsecase;
  let mockClientFacade: ClientAdmFacadeInterface;
  let mockProductFacade: ProductAdmFacadeInterface;
  let mockCatalogFacade: StoreCatalogFacadeInterface;
  let mockPaymentFacade: PaymentFacadeInterface;
  let mockInvoiceFacade: InvoiceFacadeInterface;
  let mockCheckoutRepo: CheckoutGateway;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    mockClientFacade = {
      find: jest.fn().mockResolvedValue(null),
      add: jest.fn(),
    };

    mockProductFacade = {
      addProduct: jest.fn(),
      checkStock: jest.fn(({ productId }: InputCheckStockFacadeDto) =>
        Promise.resolve(productId !== "1")
      ),
    };

    mockCatalogFacade = {
      findAll: jest.fn().mockResolvedValue([]),
      findById: jest.fn(({ productId }: InputCheckStockFacadeDto) => {
        if (productId === "0") throw new Error("Product not found");
        return Promise.resolve({
          id: productId,
          name: `Product ${productId}`,
          description: `Product ${productId} description`,
          salesPrice: 100,
        });
      }),
    };

    mockPaymentFacade = {
      process: jest.fn(),
    };

    mockInvoiceFacade = {
      generate: jest.fn().mockResolvedValue({ id: "123" }),
      find: jest.fn().mockResolvedValue(null),
    };

    mockCheckoutRepo = {
      addOrder: jest.fn(),
      findOrder: jest.fn(),
    };

    placeOrderUsecase = new PlaceOrderUsecase(
      mockCheckoutRepo,
      mockClientFacade,
      mockProductFacade,
      mockCatalogFacade,
      mockInvoiceFacade,
      mockPaymentFacade
    );
  });

  describe("get products method", () => {
    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(mockDate);
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it("should throw an error when product is not found", async () => {
      await expect(placeOrderUsecase["getProduct"]("0")).rejects.toThrow(
        "Product not found"
      );
      expect(mockCatalogFacade.findById).toHaveBeenCalledTimes(1);
    });

    it("should return a product", async () => {
      const product = await placeOrderUsecase["getProduct"]("1");
      expect(product.id.id).toBe("1");
      expect(product.name).toBe("Product 1");
      expect(product.description).toBe("Product 1 description");
      expect(product.salesPrice).toBe(100);
    });
  });

  describe("validateProducts method", () => {
    it("should throw an error if there is no product selected", async () => {
      const input: InputPlaceOrderDto = {
        clientId: "123",
        products: [],
      };
      await expect(
        placeOrderUsecase["validateProducts"](input)
      ).rejects.toThrow("No products selected");
    });

    it("should throw an error when product is out of stock", async () => {
      let input: InputPlaceOrderDto = {
        clientId: "123",
        products: [{ productId: "1" }],
      };
      await expect(
        placeOrderUsecase["validateProducts"](input)
      ).rejects.toThrow("Product out of stock");

      input.products = [{ productId: "0" }, { productId: "1" }];
      await expect(
        placeOrderUsecase["validateProducts"](input)
      ).rejects.toThrow("Product out of stock");
      expect(mockProductFacade.checkStock).toHaveBeenCalledTimes(3);
    });
  });

  describe("execute method", () => {
    it("should throw an error if the user not found", async () => {
      const input: InputPlaceOrderDto = { clientId: "123", products: [] };
      await expect(placeOrderUsecase.execute(input)).rejects.toThrow(
        "Client not found"
      );
    });

    it("should throw an error if the products are not valid", async () => {
      mockClientFacade.find = jest.fn().mockResolvedValue({});

      const mockValidateProduct = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUsecase, "validateProducts")
        //@ts-expect-error - not return never
        .mockRejectedValue(new Error("No products selected"));

      const input: InputPlaceOrderDto = { clientId: "123", products: [] };

      await expect(placeOrderUsecase.execute(input)).rejects.toThrow(
        "No products selected"
      );
      expect(mockValidateProduct).toHaveBeenCalledTimes(1);
    });

    describe("place an order", () => {
      const clientProps = {
        id: "123",
        name: "John Doe",
        document: "12345678900",
        email: "john@mail.com",
        address: "John Doe Street",
      };

      beforeEach(() => {
        mockClientFacade.find = jest.fn().mockResolvedValue(clientProps);
        const products = {
          "1": new Product({
            id: new Id("1"),
            name: "Product 1",
            description: "Product 1 description",
            salesPrice: 100,
          }),
          "2": new Product({
            id: new Id("2"),
            name: "Product 2",
            description: "Product 2 description",
            salesPrice: 200,
          }),
        };

        jest
          //@ts-expect-error - spy on private method
          .spyOn(placeOrderUsecase, "validateProducts")
          .mockImplementation();

        jest
          //@ts-expect-error - spy on private method
          .spyOn(placeOrderUsecase, "getProduct")
          //@ts-expect-error - not return never
          .mockImplementation((productId: keyof typeof products) => {
            return products[productId];
          });
      });

      it("should not be approved", async () => {
        mockPaymentFacade.process = jest.fn().mockResolvedValue({
          transactionId: "123",
          orderId: "123",
          amount: 100,
          status: "123",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const input: InputPlaceOrderDto = {
          clientId: "123",
          products: [{ productId: "1" }, { productId: "2" }],
        };

        const output = await placeOrderUsecase.execute(input);

        expect(output.invoiceId).toBeNull();
        expect(output.status).toBe("pending");
        expect(output.products).toEqual([
          { productId: "1" },
          { productId: "2" },
        ]);
        expect(output.total).toBe(300);
        expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1);
        expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(0);
        expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledWith(
          expect.objectContaining({
            amount: 300,
          })
        );
        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({
          clientId: "123",
        });
      });

      it("should be approved", async () => {
        mockPaymentFacade.process = jest.fn().mockResolvedValue({
          transactionId: "123",
          orderId: "123",
          amount: 100,
          status: "approved",
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        const input: InputPlaceOrderDto = {
          clientId: "123",
          products: [{ productId: "1" }, { productId: "2" }],
        };

        const output = await placeOrderUsecase.execute(input);

        expect(output.invoiceId).toBe("123");
        expect(output.status).toBe("approved");
        expect(output.products).toEqual([
          { productId: "1" },
          { productId: "2" },
        ]);
        expect(output.total).toBe(300);
        expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1);
        expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledWith(
          expect.objectContaining({
            amount: 300,
          })
        );
        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({
          clientId: "123",
        });
      });
    });
  });
});
