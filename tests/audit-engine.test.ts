import { AuditEngine } from '@/services/audit-engine';
import { AuditFormValues } from '@/lib/validations/audit';

describe('AuditEngine', () => {
  it('calculates current spend correctly without recommendations', () => {
    const data: AuditFormValues = {
      tools: [
        { id: '1', toolName: 'cursor', plan: 'pro', seats: 2 }
      ]
    };
    const result = AuditEngine.run(data);
    
    // Cursor Pro is $20/mo, so 2 seats is $40/mo, $480/yr
    expect(result.totalCurrentMonthly).toBe(40);
    expect(result.totalCurrentAnnual).toBe(384); // Annual price is $16/mo * 2 * 12 = $384
    expect(result.monthlySavings).toBe(0);
  });

  it('generates downgrade recommendation for small GitHub Copilot Business teams', () => {
    const data: AuditFormValues = {
      tools: [
        { id: '1', toolName: 'github-copilot', plan: 'business', seats: 2 }
      ]
    };
    const result = AuditEngine.run(data);
    
    // Business is $19/mo, Individual is $10/mo. Savings = $9 * 2 = $18/mo
    expect(result.monthlySavings).toBe(18);
    expect(result.breakdown[0].recommendation?.type).toBe('DOWNGRADE');
  });

  it('enforces minimum seat requirements for ChatGPT Team', () => {
    const data: AuditFormValues = {
      tools: [
        { id: '1', toolName: 'chatgpt', plan: 'team', seats: 1 } // User enters 1 seat incorrectly
      ]
    };
    const result = AuditEngine.run(data);
    
    // Minimum is 2 seats, so $30 * 2 = $60
    expect(result.totalCurrentMonthly).toBe(60);
    expect(result.breakdown[0].seats).toBe(2);
  });
});
