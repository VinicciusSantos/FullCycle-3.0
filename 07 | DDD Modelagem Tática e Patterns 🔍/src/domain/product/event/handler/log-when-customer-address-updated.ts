import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAdrressUpdatedEvent from "../customer-address-updated.event";

export default class LogWhenCustomerAddressUpdated
  implements EventHandlerInterface<CustomerAdrressUpdatedEvent>
{
  public handle(event: CustomerAdrressUpdatedEvent): void {
    console.log(
      `O endereço do cliente ${
        event.eventData.name
      } mudou para ${event.eventData.Address.toString()}`
    );
  }
}
