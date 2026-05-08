'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { saveLeadAndReport } from '@/actions/lead-capture';
import { AuditResult } from '@/services/audit-engine';

export function LeadCaptureForm({ result, onUnlock }: { result: AuditResult, onUnlock: (reportId: string) => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    // Call server action
    const response = await saveLeadAndReport(formData, result);
    
    setLoading(false);

    if (response.success && response.reportId) {
      onUnlock(response.reportId);
    } else {
      setError(response.error || 'Something went wrong');
    }
  }

  return (
    <Card className="border-border/50 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/40"></div>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-primary" />
          Unlock Your AI Summary & Save Report
        </CardTitle>
        <CardDescription>
          Enter your email to save this dashboard and unlock the AI-generated actionable summary of your spend.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input 
              type="email" 
              name="email" 
              placeholder="work@company.com" 
              required 
              className="bg-background/50"
            />
          </div>
          <div className="space-y-2">
            <Input 
              type="text" 
              name="company" 
              placeholder="Company Name (Optional)" 
              className="bg-background/50"
            />
          </div>
          {error && <p className="text-sm text-destructive font-medium">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              'Unlock Report'
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground pt-2">
            We will never spam you or sell your data.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
