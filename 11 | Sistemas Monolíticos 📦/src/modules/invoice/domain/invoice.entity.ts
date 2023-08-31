import BaseEntity from "../../@shared/domain/entity/base.entity";
import AgregateRoot from "../../@shared/domain/entity/agregate-root.interface";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "./invoice.item.entity";

interface InvoiceProps {
  id?: Id;
  name: string;
  document: string;
  address: string;
  items: InvoiceItem[];
  createdAt?: Date;
  updatedAt?: Date;
}

export default class Invoice extends BaseEntity implements AgregateRoot {
  private _name: string;
  private _document: string;
  private _address: string;
  private _items: InvoiceItem[];

  constructor(props: InvoiceProps) {
    super(props.id || new Id());
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;
    this._createdAt = props.createdAt || new Date();
    this._updatedAt = props.updatedAt || new Date();
  }

  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get address(): string {
    return this._address;
  }

  get items(): InvoiceItem[] {
    return this._items;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(date: Date) {
    this._updatedAt = date;
  }
}
