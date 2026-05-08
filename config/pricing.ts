export interface PricingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPricePerMonth: number; // Price per month if billed annually
  minimumSeats: number;
}

export interface ToolPricing {
  id: string;
  name: string;
  category: 'coding' | 'chat' | 'api' | 'design';
  plans: PricingPlan[];
}

export const PRICING_DATA: Record<string, ToolPricing> = {
  'github-copilot': {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    category: 'coding',
    plans: [
      { id: 'individual', name: 'Individual', monthlyPrice: 10, annualPricePerMonth: 8.33, minimumSeats: 1 },
      { id: 'business', name: 'Business', monthlyPrice: 19, annualPricePerMonth: 19, minimumSeats: 1 },
      { id: 'enterprise', name: 'Enterprise', monthlyPrice: 39, annualPricePerMonth: 39, minimumSeats: 1 },
    ],
  },
  'cursor': {
    id: 'cursor',
    name: 'Cursor',
    category: 'coding',
    plans: [
      { id: 'pro', name: 'Pro', monthlyPrice: 20, annualPricePerMonth: 16, minimumSeats: 1 },
      { id: 'business', name: 'Business', monthlyPrice: 40, annualPricePerMonth: 40, minimumSeats: 1 },
    ],
  },
  'chatgpt': {
    id: 'chatgpt',
    name: 'ChatGPT',
    category: 'chat',
    plans: [
      { id: 'plus', name: 'Plus', monthlyPrice: 20, annualPricePerMonth: 20, minimumSeats: 1 },
      { id: 'team', name: 'Team', monthlyPrice: 30, annualPricePerMonth: 25, minimumSeats: 2 },
      { id: 'enterprise', name: 'Enterprise', monthlyPrice: 60, annualPricePerMonth: 60, minimumSeats: 150 },
    ],
  },
  'claude': {
    id: 'claude',
    name: 'Claude',
    category: 'chat',
    plans: [
      { id: 'pro', name: 'Pro', monthlyPrice: 20, annualPricePerMonth: 20, minimumSeats: 1 },
      { id: 'team', name: 'Team', monthlyPrice: 30, annualPricePerMonth: 25, minimumSeats: 5 },
    ],
  },
  'openai-api': {
    id: 'openai-api',
    name: 'OpenAI API',
    category: 'api',
    plans: [
      { id: 'pay-as-you-go', name: 'Pay-as-you-go (Estimated monthly)', monthlyPrice: 100, annualPricePerMonth: 100, minimumSeats: 1 },
    ],
  },
  'anthropic-api': {
    id: 'anthropic-api',
    name: 'Anthropic API',
    category: 'api',
    plans: [
      { id: 'pay-as-you-go', name: 'Pay-as-you-go (Estimated monthly)', monthlyPrice: 100, annualPricePerMonth: 100, minimumSeats: 1 },
    ],
  },
  'gemini': {
    id: 'gemini',
    name: 'Gemini',
    category: 'chat',
    plans: [
      { id: 'advanced', name: 'Advanced', monthlyPrice: 20, annualPricePerMonth: 20, minimumSeats: 1 },
    ],
  },
  'windsurf': {
    id: 'windsurf',
    name: 'Windsurf',
    category: 'coding',
    plans: [
      { id: 'pro', name: 'Pro', monthlyPrice: 15, annualPricePerMonth: 15, minimumSeats: 1 },
    ],
  },
  'v0': {
    id: 'v0',
    name: 'v0',
    category: 'design',
    plans: [
      { id: 'premium', name: 'Premium', monthlyPrice: 20, annualPricePerMonth: 20, minimumSeats: 1 },
      { id: 'enterprise', name: 'Enterprise', monthlyPrice: 50, annualPricePerMonth: 50, minimumSeats: 10 },
    ],
  },
};
