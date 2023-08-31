import Id from "../value-object/id.value-object";

export default class BaseEntity {
  public _id: Id;
  public _createdAt: Date;
  public _updatedAt: Date;

  constructor(id?: Id) {
    this._id = id;
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  public get id(): Id {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public set updatedAt(date: Date) {
    this._updatedAt = date;
  }
}
