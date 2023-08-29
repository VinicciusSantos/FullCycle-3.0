import Customer from "../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer-repository.interface";
import {
  InputListCustomerDto,
  OutputListCustomerDto,
} from "./list.customer.dto";

export default class ListCustomersUseCase {
  constructor(
    private readonly customerRepository: CustomerRepositoryInterface
  ) {}

  public async execute(
    _input?: InputListCustomerDto
  ): Promise<OutputListCustomerDto> {
    const resut = await this.customerRepository.findAll();
    return OutputMapper.toOutput(resut);
  }
}

class OutputMapper {
  public static toOutput(customer: Customer[]): OutputListCustomerDto {
    return {
      customers: customer.map((customer) => {
        return {
          id: customer.id,
          name: customer.name,
          address: {
            street: customer.Address.street,
            city: customer.Address.city,
            number: customer.Address.number,
            zip: customer.Address.zip,
          },
        };
      }),
    };
  }
}
