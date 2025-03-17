import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReferralService } from './referral.service';
import { ReferralController } from './referral.controller';
import { InviteCode } from './models/invite-code.model';
import { InviteUsage } from './models/invite-usage.model';

@Module({
  imports: [
    SequelizeModule.forFeature([InviteCode, InviteUsage]),
  ],
  controllers: [ReferralController],
  providers: [ReferralService],
})
export class ReferralModule {}
