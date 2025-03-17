import {
    Column,
    Model,
    Table,
    DataType,
  } from 'sequelize-typescript';

@Table
export class InviteCode extends Model {
  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    unique: true,
  })
  code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  creatorEmail: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
  })
  maxUses: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  currentUses: number;
} 