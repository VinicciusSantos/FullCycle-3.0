import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
  tableName: "invoice_items",
  timestamps: false,
})
export default class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  public id!: string;

  @Column({ allowNull: false })
  public name!: string;

  @Column({ allowNull: false })
  public price!: number;

  @ForeignKey(() => InvoiceModel)
  @Column
  public invoiceId!: string;
}
