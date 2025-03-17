"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralService = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const sequelize_typescript_1 = require("sequelize-typescript");
const invite_code_model_1 = require("./models/invite-code.model");
const invite_usage_model_1 = require("./models/invite-usage.model");
const code_generator_util_1 = require("./utils/code-generator.util");
let ReferralService = class ReferralService {
    constructor(sequelize, inviteCodeModel, inviteUsageModel) {
        this.sequelize = sequelize;
        this.inviteCodeModel = inviteCodeModel;
        this.inviteUsageModel = inviteUsageModel;
    }
    async createInviteCode(createInviteCodeDto) {
        const { maxUses = 1, creatorEmail } = createInviteCodeDto;
        let code;
        let isUnique = false;
        while (!isUnique) {
            code = (0, code_generator_util_1.generateInviteCode)();
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
    async reserveSlot(useInviteCodeDto) {
        const { code, email, walletAddress } = useInviteCodeDto;
        if (!(0, code_generator_util_1.isValidCodeFormat)(code)) {
            throw new common_1.BadRequestException('Invalid invite code format');
        }
        const transaction = await this.sequelize.transaction();
        try {
            const existingEmail = await this.inviteUsageModel.findOne({
                where: { claimEmail: email },
                transaction,
            });
            if (existingEmail) {
                throw new common_1.ConflictException('Email has already used an invite code');
            }
            const existingWalletAddress = await this.inviteUsageModel.findOne({
                where: { claimWalletAddress: walletAddress },
                transaction,
            });
            if (existingWalletAddress) {
                throw new common_1.ConflictException('Wallet has already used an invite code');
            }
            const inviteCode = await this.inviteCodeModel.findOne({
                where: { code },
                lock: transaction.LOCK.UPDATE,
                transaction,
            });
            if (!inviteCode) {
                throw new common_1.NotFoundException('Invalid invite code');
            }
            if (inviteCode.currentUses >= inviteCode.maxUses) {
                throw new common_1.ConflictException('Invite code has reached maximum usage');
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
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
    async getInviteCodeStats(code) {
        const inviteCode = await this.inviteCodeModel.findOne({
            where: { code },
        });
        const inviteCodeUsages = await this.inviteUsageModel.findAll({
            where: { code },
        });
        if (!inviteCode) {
            throw new common_1.NotFoundException('Invite code not found');
        }
        return {
            id: inviteCode.id,
            code: inviteCode.code,
            maxUses: inviteCode.maxUses,
            currentUses: inviteCode.currentUses,
            usages: inviteCodeUsages,
        };
    }
    async getAllInviteCodes() {
        return this.inviteCodeModel.findAll();
    }
    async verifyCode(code) {
        const inviteCode = await this.inviteCodeModel.findOne({
            where: { code },
        });
        return !!inviteCode;
    }
    async verifyWalletUsed(walletAddress) {
        const inviteUsage = await this.inviteUsageModel.findOne({
            where: { claimWalletAddress: walletAddress },
        });
        console.log('inviteUsage', inviteUsage);
        return !!inviteUsage;
    }
    async isEmailUsed(email) {
        const inviteUsage = await this.inviteUsageModel.findOne({
            where: { claimEmail: email },
        });
        return !!inviteUsage;
    }
};
exports.ReferralService = ReferralService;
exports.ReferralService = ReferralService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, sequelize_1.InjectModel)(invite_code_model_1.InviteCode)),
    __param(2, (0, sequelize_1.InjectModel)(invite_usage_model_1.InviteUsage)),
    __metadata("design:paramtypes", [sequelize_typescript_1.Sequelize, Object, Object])
], ReferralService);
//# sourceMappingURL=referral.service.js.map