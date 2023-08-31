import InvoiceFacade from "../facade/invoice.facade";
import { InvoiceFacadeInterface } from "../facade/invoice.facade.interface";
import InvoiceRepository from "../repository/invoce.repository";
import FindInvoiceUsecase from "../usecase/find/find.invoite.usecase";
import GenerateInvoiceUsecase from "../usecase/generate/generate.invoice.usecase";

export default class InvoiceFacadeFactory {
  static create(): InvoiceFacadeInterface {
    const repository = new InvoiceRepository();
    const generateUsecase = new GenerateInvoiceUsecase(repository);
    const findUsecase = new FindInvoiceUsecase(repository)
    return new InvoiceFacade(generateUsecase, findUsecase);
  }
}
