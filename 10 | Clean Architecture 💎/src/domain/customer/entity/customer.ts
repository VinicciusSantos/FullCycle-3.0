import EntityAbstract from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import Address from "../value-object/address";

export default class Customer extends EntityAbstract {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get rewardPoints(): number {
    return this._rewardPoints;
  }

  public get Address(): Address {
    return this._address;
  }

  public set Address(address: Address) {
    this._address = address;
  }

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();
  }

  public validate() {
    if (this._id.length === 0) {
      this.notification.addError({
        message: "Id is required",
        context: "customer",
      });
    }
    if (this._name.length === 0) {
      this.notification.addError({
        message: "Name is required",
        context: "customer",
      });
    }

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  public changeName(name: string) {
    this._name = name;
    this.validate();
  }

  public changeAddress(address: Address) {
    this._address = address;
  }

  public isActive(): boolean {
    return this._active;
  }

  public activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  public deactivate() {
    this._active = false;
  }

  public addRewardPoints(points: number) {
    this._rewardPoints += points;
  }
}
