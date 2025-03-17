import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReferralModule } from './referral/referral.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { InviteCode } from './referral/models/invite-code.model';
import { InviteUsage } from './referral/models/invite-usage.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: ':memory:', // This creates an in-memory database
      autoLoadModels: true,
      synchronize: true,
      models: [InviteCode, InviteUsage],
    }),
    ReferralModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
