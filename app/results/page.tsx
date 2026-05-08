'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Share2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

import { useAuditStore } from '@/hooks/use-audit-store';
import { AuditEngine, AuditResult } from '@/services/audit-engine';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { SavingsChart } from '@/components/dashboard/savings-chart';
import { RecommendationList } from '@/components/dashboard/recommendation-list';
import { LeadCaptureForm } from '@/components/lead-capture/email-form';
import { AISummary } from '@/components/dashboard/ai-summary';
import { Button } from '@/components/ui/button';

export default function ResultsPage() {
  const router = useRouter();
  const { auditData } = useAuditStore();
  const [mounted, setMounted] = useState(false);
  const [unlockedReportId, setUnlockedReportId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (!auditData || auditData.tools.length === 0) {
      router.replace('/audit');
    }
  }, [auditData, router]);

  const result: AuditResult | null = useMemo(() => {
    if (!auditData || auditData.tools.length === 0) return null;
    try {
      return AuditEngine.run(auditData);
    } catch (error) {
      console.error("Audit Engine Error:", error);
      return null;
    }
  }, [auditData]);

  if (!mounted || !result) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="text-muted-foreground text-sm">Analyzing spend...</p>
        </div>
      </div>
    );
  }

  return (
    <PageWrapper className="flex-1 bg-muted/10 py-10 px-4">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-1">
            <Link href="/audit" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-2 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Editor
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Audit Dashboard</h1>
            <p className="text-muted-foreground">
              Here is your personalized AI spend analysis.
            </p>
          </div>
          <Button 
            variant="outline" 
            className="hidden md:flex" 
            disabled={!unlockedReportId}
            onClick={() => {
              if (unlockedReportId) {
                const url = `${window.location.origin}/report/${unlockedReportId}`;
                navigator.clipboard.writeText(url);
                alert('Public report link copied to clipboard!');
              }
            }}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share Report
          </Button>
        </div>

        <SummaryCards result={result} />

        <div className="grid gap-4 md:grid-cols-7">
          <motion.div 
            className="md:col-span-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SavingsChart result={result} />
          </motion.div>
          <motion.div 
            className="md:col-span-3 space-y-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <RecommendationList result={result} />
            
            {/* Lead Capture or AI Summary */}
            <AnimatePresence mode="wait">
              {!unlockedReportId ? (
                <motion.div
                  key="lead-capture"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <LeadCaptureForm result={result} onUnlock={(id) => setUnlockedReportId(id)} />
                </motion.div>
              ) : (
                <motion.div
                  key="ai-summary"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <p className="text-sm text-muted-foreground">
                      Report Saved! ID: <span className="font-mono bg-muted px-1 py-0.5 rounded text-xs">{unlockedReportId}</span>
                    </p>
                  </div>
                  <AISummary result={result} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </PageWrapper>
  );
}
