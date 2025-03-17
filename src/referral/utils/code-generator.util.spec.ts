import { generateInviteCode } from './code-generator.util';

describe('Invite Code Generator', () => {
  it('should generate code of correct length', () => {
    const code = generateInviteCode();
    expect(code.length).toBe(10);
  });
}); 