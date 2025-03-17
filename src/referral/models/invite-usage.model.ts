import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@Table
export class InviteUsage extends Model {

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  claimEmail: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  claimWalletAddress: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  usedAt: Date;
}