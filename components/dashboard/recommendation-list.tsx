'use client';

import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuditResult } from '@/services/audit-engine';

export function RecommendationList({ result }: { result: AuditResult }) {
  const toolsWithRecommendations = result.breakdown.filter((t) => t.recommendation !== null);
  const toolsWithoutRecommendations = result.breakdown.filter((t) => t.recommendation === null);

  return (
    <Card className="border-border/50 bg-background/50 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle>Optimization Breakdown</CardTitle>
        <CardDescription>
          Specific actions to reduce your software spend.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {toolsWithRecommendations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-3">
            <div className="bg-green-500/10 p-3 rounded-full">
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            </div>
            <p className="font-medium">Your stack is perfectly optimized!</p>
            <p className="text-sm text-muted-foreground">We couldn&apos;t find any downgrades or consolidations based on your current setup.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {toolsWithRecommendations.map((item) => (
              <div key={item.id} className="p-4 rounded-lg border border-border/50 bg-muted/20 relative overflow-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/80"></div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-md mt-1">
                    <AlertTriangle className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">
                        {item.toolName} ({item.planName})
                      </h4>
                      <span className="text-xs font-medium text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                        Save ${item.recommendation?.monthlySavings}/mo
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.recommendation?.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {toolsWithoutRecommendations.length > 0 && (
          <div className="pt-4 border-t border-border/50">
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">Optimized Assets</h4>
            <ul className="space-y-2">
              {toolsWithoutRecommendations.map((item) => (
                <li key={item.id} className="flex items-center text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 opacity-70" />
                  {item.toolName} ({item.planName}) - {item.seats} seat(s)
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
