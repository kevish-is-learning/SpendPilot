'use client';

import { motion } from 'framer-motion';
import { DollarSign, TrendingDown, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuditResult } from '@/services/audit-engine';

export function SummaryCards({ result }: { result: AuditResult }) {
  const cards = [
    {
      title: 'Current Annual Spend',
      value: `$${result.totalCurrentAnnual.toLocaleString()}`,
      description: 'Based on current seats & plans',
      icon: DollarSign,
      trend: null,
    },
    {
      title: 'Proposed Annual Spend',
      value: `$${result.totalProposedAnnual.toLocaleString()}`,
      description: 'After applying optimizations',
      icon: Wallet,
      trend: null,
    },
    {
      title: 'Total Annual Savings',
      value: `$${result.annualSavings.toLocaleString()}`,
      description: result.annualSavings > 0 ? 'Money left on the table' : 'Your stack is fully optimized',
      icon: TrendingDown,
      trend: result.annualSavings > 0 ? 'positive' : 'neutral',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="border-border/50 bg-background/50 backdrop-blur-sm relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${card.trend === 'positive' ? 'text-green-500' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold tracking-tight ${card.trend === 'positive' ? 'text-green-500' : ''}`}>
                {card.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
            </CardContent>
            {card.trend === 'positive' && (
              <div className="absolute inset-0 bg-green-500/5 pointer-events-none" />
            )}
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
