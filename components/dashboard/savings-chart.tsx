'use client';

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuditResult } from '@/services/audit-engine';

export function SavingsChart({ result }: { result: AuditResult }) {
  const data = result.breakdown.map((item) => {
    const proposedAnnual = item.recommendation 
      ? item.currentAnnualCost - item.recommendation.annualSavings 
      : item.currentAnnualCost;

    return {
      name: item.toolName,
      Current: item.currentAnnualCost,
      Proposed: proposedAnnual,
    };
  });

  return (
    <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Annual Spend Comparison</CardTitle>
        <CardDescription>
          Current vs. proposed annualized costs per tool.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `$${value}`} 
              />
              <Tooltip 
                cursor={{ fill: 'hsl(var(--muted))', opacity: 0.2 }}
                contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                itemStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }} />
              <Bar dataKey="Current" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} maxBarSize={50} />
              <Bar dataKey="Proposed" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
