import { Model } from 'sequelize-typescript';
export declare class InviteUsage extends Model {
    code: string;
    claimEmail: string;
    claimWalletAddress: string;
    usedAt: Date;
}
