import { AuditFormValues, ToolEntry } from '@/lib/validations/audit';
import { PRICING_DATA } from '@/config/pricing';

export interface AuditRecommendation {
  type: 'DOWNGRADE' | 'ALTERNATIVE' | 'CONSOLIDATION' | 'OPTIMIZED';
  message: string;
  monthlySavings: number;
  annualSavings: number;
  proposedToolId?: string;
  proposedPlanId?: string;
}

export interface ToolBreakdown {
  id: string; // UUID from form
  toolId: string;
  toolName: string;
  planId: string;
  planName: string;
  seats: number;
  currentMonthlyCost: number;
  currentAnnualCost: number;
  recommendation: AuditRecommendation | null;
}

export interface AuditResult {
  totalCurrentMonthly: number;
  totalCurrentAnnual: number;
  totalProposedMonthly: number;
  totalProposedAnnual: number;
  monthlySavings: number;
  annualSavings: number;
  breakdown: ToolBreakdown[];
}

export class AuditEngine {
  static run(data: AuditFormValues): AuditResult {
    let totalCurrentMonthly = 0;
    let totalCurrentAnnual = 0;
    let totalProposedMonthly = 0;
    let totalProposedAnnual = 0;

    const breakdown: ToolBreakdown[] = data.tools.map((entry) => {
      const pricing = PRICING_DATA[entry.toolName];
      if (!pricing) throw new Error(`Unknown tool: ${entry.toolName}`);

      const plan = pricing.plans.find((p) => p.id === entry.plan);
      if (!plan) throw new Error(`Unknown plan: ${entry.plan} for tool ${entry.toolName}`);

      // Calculate actual seats based on minimum seat requirements
      const actualSeats = Math.max(entry.seats, plan.minimumSeats);
      const currentMonthlyCost = actualSeats * plan.monthlyPrice;
      const currentAnnualCost = actualSeats * plan.annualPricePerMonth * 12;

      totalCurrentMonthly += currentMonthlyCost;
      totalCurrentAnnual += currentAnnualCost;

      // Deterministic rules engine
      let recommendation = this.generateRecommendation(entry.toolName, entry.plan, actualSeats, data.tools);

      let proposedMonthlyCost = currentMonthlyCost;
      let proposedAnnualCost = currentAnnualCost;

      if (recommendation) {
        proposedMonthlyCost -= recommendation.monthlySavings;
        proposedAnnualCost -= recommendation.annualSavings;
      }

      totalProposedMonthly += proposedMonthlyCost;
      totalProposedAnnual += proposedAnnualCost;

      return {
        id: entry.id,
        toolId: pricing.id,
        toolName: pricing.name,
        planId: plan.id,
        planName: plan.name,
        seats: actualSeats,
        currentMonthlyCost,
        currentAnnualCost,
        recommendation,
      };
    });

    return {
      totalCurrentMonthly,
      totalCurrentAnnual,
      totalProposedMonthly,
      totalProposedAnnual,
      monthlySavings: totalCurrentMonthly - totalProposedMonthly,
      annualSavings: totalCurrentAnnual - totalProposedAnnual,
      breakdown,
    };
  }

  private static generateRecommendation(
    toolId: string,
    planId: string,
    seats: number,
    allTools: ToolEntry[]
  ): AuditRecommendation | null {
    // Rule 1: ChatGPT Team downgrade if seats are artificially low
    if (toolId === 'chatgpt' && planId === 'team' && seats <= 3) {
      const savingsPerMonth = (seats * 30) - (seats * 20); // Team is 30, Plus is 20
      return {
        type: 'DOWNGRADE',
        message: 'Switching to ChatGPT Plus provides similar benefits for small teams without the $30/seat minimum requirement.',
        monthlySavings: savingsPerMonth,
        annualSavings: savingsPerMonth * 12,
        proposedToolId: 'chatgpt',
        proposedPlanId: 'plus',
      };
    }

    // Rule 2: GitHub Copilot Business downgrade
    if (toolId === 'github-copilot' && planId === 'business' && seats <= 3) {
      const savingsPerMonth = (seats * 19) - (seats * 10);
      return {
        type: 'DOWNGRADE',
        message: 'For small teams without strict enterprise IP requirements, Copilot Individual is significantly cheaper.',
        monthlySavings: savingsPerMonth,
        annualSavings: savingsPerMonth * 12,
        proposedToolId: 'github-copilot',
        proposedPlanId: 'individual',
      };
    }

    // Rule 3: Consolidation (ChatGPT Plus + Copilot Individual -> Cursor Pro)
    if (toolId === 'chatgpt' && planId === 'plus') {
      const hasCopilot = allTools.some((t) => t.toolName === 'github-copilot' && t.plan === 'individual');
      if (hasCopilot) {
        // We only attach the savings to one of the tools to avoid double counting
        // ChatGPT ($20) + Copilot ($10) = $30. Cursor Pro is $20. Savings = $10.
        return {
          type: 'CONSOLIDATION',
          message: 'You are paying for both ChatGPT and Copilot. Cursor Pro combines top-tier AI chat with native IDE coding for $20/mo total.',
          monthlySavings: 10 * seats,
          annualSavings: 10 * 12 * seats,
          proposedToolId: 'cursor',
          proposedPlanId: 'pro',
        };
      }
    }

    // Rule 4: Claude Team downgrade
    if (toolId === 'claude' && planId === 'team' && seats <= 5) {
      const savingsPerMonth = (seats * 30) - (seats * 20);
      return {
        type: 'DOWNGRADE',
        message: 'Claude Team requires a 5-seat minimum. Buying individual Claude Pro seats is cheaper for small groups.',
        monthlySavings: savingsPerMonth,
        annualSavings: savingsPerMonth * 12,
        proposedToolId: 'claude',
        proposedPlanId: 'pro',
      };
    }

    return null;
  }
}
