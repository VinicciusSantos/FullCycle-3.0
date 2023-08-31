import { Column, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({
  tableName: "clients",
  timestamps: false,
})
export default class ClientModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  public id!: string;

  @Column({ allowNull: false })
  public name!: string;

  @Column({ allowNull: false })
  public email!: string;

  @Column({ allowNull: false })
  public address!: string;

  @Column({ allowNull: false })
  public createdAt!: Date;

  @Column({ allowNull: false })
  public updatedAt!: Date;
}
