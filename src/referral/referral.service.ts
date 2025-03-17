import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { InviteCode } from './models/invite-code.model';
import { InviteUsage } from './models/invite-usage.model';
import { CreateInviteCodeDto } from './dto/create-invite-code.dto';
import { UseInviteCodeDto } from './dto/use-invite-code.dto';
import {
  generateInviteCode,
  isValidCodeFormat,
} from './utils/code-generator.util';

@Injectable()
export class ReferralService {
  constructor(
    private sequelize: Sequelize,
    @InjectModel(InviteCode)
    private inviteCodeModel: typeof InviteCode,
    @InjectModel(InviteUsage)
    private inviteUsageModel: typeof InviteUsage,
  ) {}

  async createInviteCode(createInviteCodeDto: CreateInviteCodeDto): Promise<string> {
    const { maxUses = 1, creatorEmail} = createInviteCodeDto;
    let code: string;
    let isUnique = false;
    while (!isUnique) {
      code = generateInviteCode();
      const existingCode = await this.inviteCodeModel.findOne({ 
        where: { code }
      });
      isUnique = !existingCode;
    }
    await this.inviteCodeModel.create({
      code,
      creatorEmail,
      maxUses,
    });
    return code;
  }

  async reserveSlot(useInviteCodeDto: UseInviteCodeDto): Promise<boolean> {
    const { code, email, walletAddress } = useInviteCodeDto;
    if (!isValidCodeFormat(code)) {
      throw new BadRequestException('Invalid invite code format');
    }
    const transaction = await this.sequelize.transaction();
    try {
      const existingEmail = await this.inviteUsageModel.findOne({
        where: { claimEmail: email },
        transaction,
      });
      if (existingEmail) {
        throw new ConflictException('Email has already used an invite code');
      }

      const existingWalletAddress = await this.inviteUsageModel.findOne({
        where: { claimWalletAddress: walletAddress },
        transaction,
      });
      if (existingWalletAddress) {
        throw new ConflictException('Wallet has already used an invite code');
      }
      const inviteCode = await this.inviteCodeModel.findOne({
        where: { code },
        lock: transaction.LOCK.UPDATE,
        transaction,
      });

      if (!inviteCode) {
        throw new NotFoundException('Invalid invite code');
      }
      if (inviteCode.currentUses >= inviteCode.maxUses) {
        throw new ConflictException('Invite code has reached maximum usage');
      }
      await this.inviteUsageModel.create({
        code,
        claimEmail: email,
        claimWalletAddress: walletAddress,
      }, { transaction });
      await inviteCode.increment('currentUses', { transaction });
      if (inviteCode.currentUses + 1 >= inviteCode.maxUses) {
        await inviteCode.update({ isActive: false }, { transaction });
      }
      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  
  async getInviteCodeStats(code: string): Promise<any> {
    const inviteCode = await this.inviteCodeModel.findOne({
      where: { code },
    });
    const inviteCodeUsages = await this.inviteUsageModel.findAll({
      where: { code },
    });
    if (!inviteCode) {
      throw new NotFoundException('Invite code not found');
    }
    return {
      id: inviteCode.id,
      code: inviteCode.code,
      maxUses: inviteCode.maxUses,
      currentUses: inviteCode.currentUses,
      usages: inviteCodeUsages,
    };
  }

  async getAllInviteCodes(): Promise<InviteCode[]> {
    return this.inviteCodeModel.findAll();
  }

  async verifyCode(code: string): Promise<boolean> {
    const inviteCode = await this.inviteCodeModel.findOne({
      where: { code },
    });
    return !!inviteCode;
  }

  async verifyWalletUsed(walletAddress: string): Promise<boolean> {
    const inviteUsage = await this.inviteUsageModel.findOne({
      where: { claimWalletAddress: walletAddress },
    });
    console.log('inviteUsage', inviteUsage);
    return !!inviteUsage;
  }

  async isEmailUsed(email: string): Promise<boolean> {
    const inviteUsage = await this.inviteUsageModel.findOne({
      where: { claimEmail: email },
    });
    return !!inviteUsage;
  }
}
