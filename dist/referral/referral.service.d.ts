import { Sequelize } from 'sequelize-typescript';
import { InviteCode } from './models/invite-code.model';
import { InviteUsage } from './models/invite-usage.model';
import { CreateInviteCodeDto } from './dto/create-invite-code.dto';
import { UseInviteCodeDto } from './dto/use-invite-code.dto';
export declare class ReferralService {
    private sequelize;
    private inviteCodeModel;
    private inviteUsageModel;
    constructor(sequelize: Sequelize, inviteCodeModel: typeof InviteCode, inviteUsageModel: typeof InviteUsage);
    createInviteCode(createInviteCodeDto: CreateInviteCodeDto): Promise<string>;
    reserveSlot(useInviteCodeDto: UseInviteCodeDto): Promise<boolean>;
    getInviteCodeStats(code: string): Promise<any>;
    getAllInviteCodes(): Promise<InviteCode[]>;
    verifyCode(code: string): Promise<boolean>;
    verifyWalletUsed(walletAddress: string): Promise<boolean>;
    isEmailUsed(email: string): Promise<boolean>;
}
