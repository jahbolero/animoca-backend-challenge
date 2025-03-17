import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ReferralService } from './referral.service';
import { CreateInviteCodeDto } from './dto/create-invite-code.dto';
import { UseInviteCodeDto } from './dto/use-invite-code.dto';

@Controller('api/referral')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) {}

  @Get("verifyCode")
  async verifyCode(@Query('code') code: string) {
    return this.referralService.verifyCode(code);
  }

  @Get("isWalletUsed")
  async verifyWalletUsed(@Query('wallet') walletAddress: string) {
    return this.referralService.verifyWalletUsed(walletAddress);
  }

  @Get("isEmailUsed")
  async isEmailUsed(@Query('email') email: string) {
    return this.referralService.isEmailUsed(email);
  }

  @Post('inviteCodes')
  async createInviteCode(@Body() createInviteCodeDto: CreateInviteCodeDto) {
    console.log('createInviteCodeDto', createInviteCodeDto);
    const code = await this.referralService.createInviteCode(createInviteCodeDto);
    return { code };
  }

  @Post('reserveSlot')
  async reserveSlot(@Body() useInviteCodeDto: UseInviteCodeDto) {
    await this.referralService.reserveSlot(useInviteCodeDto);
    return { success: true };
  }

  @Get('inviteCodes/:code/stats')
  async getInviteCodeStats(@Param('code') code: string) {
    return this.referralService.getInviteCodeStats(code);
  }

  @Get('inviteCodes')
  async getAllInviteCodes() {
    return this.referralService.getAllInviteCodes();
  }

  @Get('generateTestCodes')
  async generateTestCodes() {
    const codes = await Promise.all([this.referralService.createInviteCode({
      creatorEmail: 'test@test.com',
      maxUses: 10,
    }),this.referralService.createInviteCode({
      creatorEmail: 'test2@test.com',
      maxUses: 10,
    }),this.referralService.createInviteCode({
      creatorEmail: 'test3@test.com',
      maxUses: 10,
    })]);
    return codes;
  }
}
