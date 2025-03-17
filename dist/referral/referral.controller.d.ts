import { ReferralService } from './referral.service';
import { CreateInviteCodeDto } from './dto/create-invite-code.dto';
import { UseInviteCodeDto } from './dto/use-invite-code.dto';
export declare class ReferralController {
    private readonly referralService;
    constructor(referralService: ReferralService);
    verifyCode(code: string): Promise<boolean>;
    verifyWalletUsed(walletAddress: string): Promise<boolean>;
    isEmailUsed(email: string): Promise<boolean>;
    createInviteCode(createInviteCodeDto: CreateInviteCodeDto): Promise<{
        code: string;
    }>;
    reserveSlot(useInviteCodeDto: UseInviteCodeDto): Promise<{
        success: boolean;
    }>;
    getInviteCodeStats(code: string): Promise<any>;
    getAllInviteCodes(): Promise<import("./models/invite-code.model").InviteCode[]>;
    generateTestCodes(): Promise<[string, string, string]>;
}
