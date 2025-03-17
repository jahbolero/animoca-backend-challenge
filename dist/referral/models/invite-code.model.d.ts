import { Model } from 'sequelize-typescript';
export declare class InviteCode extends Model {
    code: string;
    creatorEmail: string;
    maxUses: number;
    currentUses: number;
}
