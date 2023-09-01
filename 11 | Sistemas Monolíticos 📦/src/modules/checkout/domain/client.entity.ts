import BaseEntity from "../../@shared/domain/entity/base.entity";
import AgregateRoot from "../../@shared/domain/entity/agregate-root.interface";
import Id from "../../@shared/domain/value-object/id.value-object";

interface ClientProps {
  id?: Id;
  name: string;
  email: string;
  address: string;
}

export default class Client extends BaseEntity implements AgregateRoot {
  private _name: string;
  private _email: string;
  private _address: string;

  constructor(props: ClientProps) {
    super(props.id);
    this._name = props.name;
    this._email = props.email;
    this._address = props.address;
  }

  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }

  public get address(): string {
    return this._address;
  }
}
