import * as crypto from 'crypto';
const ALLOWED_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function generateInviteCode(length = 10): string {
  let code = '';
  const randomBytes = crypto.randomBytes(length);
  
  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytes[i] % ALLOWED_CHARS.length;
    code += ALLOWED_CHARS.charAt(randomIndex);
  }
  
  return code;
}
export function isValidCodeFormat(code: string): boolean {
  if (!code || code.length !== 10) return false;
  
  return code.split('').every(char => ALLOWED_CHARS.includes(char));
} 