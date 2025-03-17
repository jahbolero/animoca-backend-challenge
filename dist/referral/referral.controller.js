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
exports.ReferralController = void 0;
const common_1 = require("@nestjs/common");
const referral_service_1 = require("./referral.service");
const create_invite_code_dto_1 = require("./dto/create-invite-code.dto");
const use_invite_code_dto_1 = require("./dto/use-invite-code.dto");
let ReferralController = class ReferralController {
    constructor(referralService) {
        this.referralService = referralService;
    }
    async verifyCode(code) {
        return this.referralService.verifyCode(code);
    }
    async verifyWalletUsed(walletAddress) {
        return this.referralService.verifyWalletUsed(walletAddress);
    }
    async isEmailUsed(email) {
        return this.referralService.isEmailUsed(email);
    }
    async createInviteCode(createInviteCodeDto) {
        console.log('createInviteCodeDto', createInviteCodeDto);
        const code = await this.referralService.createInviteCode(createInviteCodeDto);
        return { code };
    }
    async reserveSlot(useInviteCodeDto) {
        await this.referralService.reserveSlot(useInviteCodeDto);
        return { success: true };
    }
    async getInviteCodeStats(code) {
        return this.referralService.getInviteCodeStats(code);
    }
    async getAllInviteCodes() {
        return this.referralService.getAllInviteCodes();
    }
    async generateTestCodes() {
        const codes = await Promise.all([this.referralService.createInviteCode({
                creatorEmail: 'test@test.com',
                maxUses: 10,
            }), this.referralService.createInviteCode({
                creatorEmail: 'test2@test.com',
                maxUses: 10,
            }), this.referralService.createInviteCode({
                creatorEmail: 'test3@test.com',
                maxUses: 10,
            })]);
        return codes;
    }
};
exports.ReferralController = ReferralController;
__decorate([
    (0, common_1.Get)("verifyCode"),
    __param(0, (0, common_1.Query)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "verifyCode", null);
__decorate([
    (0, common_1.Get)("isWalletUsed"),
    __param(0, (0, common_1.Query)('wallet')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "verifyWalletUsed", null);
__decorate([
    (0, common_1.Get)("isEmailUsed"),
    __param(0, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "isEmailUsed", null);
__decorate([
    (0, common_1.Post)('inviteCodes'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invite_code_dto_1.CreateInviteCodeDto]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "createInviteCode", null);
__decorate([
    (0, common_1.Post)('reserveSlot'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [use_invite_code_dto_1.UseInviteCodeDto]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "reserveSlot", null);
__decorate([
    (0, common_1.Get)('inviteCodes/:code/stats'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "getInviteCodeStats", null);
__decorate([
    (0, common_1.Get)('inviteCodes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "getAllInviteCodes", null);
__decorate([
    (0, common_1.Get)('generateTestCodes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "generateTestCodes", null);
exports.ReferralController = ReferralController = __decorate([
    (0, common_1.Controller)('api/referral'),
    __metadata("design:paramtypes", [referral_service_1.ReferralService])
], ReferralController);
//# sourceMappingURL=referral.controller.js.map