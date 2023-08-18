import EventInterface from "../../@shared/event/event.interface";
import Customer from "../../customer/entity/customer";

export default class CustomerAdrressUpdatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: Customer) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}