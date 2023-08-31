import {
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import InvoiceItemModel from "./invoice.item.model";

@Table({
  tableName: "invoices",
  timestamps: false,
})
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  public id!: string;

  @Column({ allowNull: false })
  public name!: string;

  @Column({ allowNull: false })
  public document!: string;

  @Column({ allowNull: false })
  public address!: string;

  @HasMany(() => InvoiceItemModel, 'invoiceId')
  public items!: InvoiceItemModel[];

  @Column({ allowNull: false })
  public createdAt!: Date;

  @Column({ allowNull: false })
  public updatedAt!: Date;
}
