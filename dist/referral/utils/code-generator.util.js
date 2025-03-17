"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateInviteCode = generateInviteCode;
exports.isValidCodeFormat = isValidCodeFormat;
const crypto = require("crypto");
const ALLOWED_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function generateInviteCode(length = 10) {
    let code = '';
    const randomBytes = crypto.randomBytes(length);
    for (let i = 0; i < length; i++) {
        const randomIndex = randomBytes[i] % ALLOWED_CHARS.length;
        code += ALLOWED_CHARS.charAt(randomIndex);
    }
    return code;
}
function isValidCodeFormat(code) {
    if (!code || code.length !== 10)
        return false;
    return code.split('').every(char => ALLOWED_CHARS.includes(char));
}
//# sourceMappingURL=code-generator.util.js.map