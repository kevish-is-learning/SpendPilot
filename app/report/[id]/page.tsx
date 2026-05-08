import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { AuditResult } from '@/services/audit-engine';
import { PageWrapper } from '@/components/layout/page-wrapper';
import { SummaryCards } from '@/components/dashboard/summary-cards';
import { SavingsChart } from '@/components/dashboard/savings-chart';
import { RecommendationList } from '@/components/dashboard/recommendation-list';
import { AISummary } from '@/components/dashboard/ai-summary';
import { CheckCircle2 } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const report = await prisma.auditReport.findUnique({
    where: { id },
    include: { lead: true }
  });

  if (!report) {
    return { title: 'Report Not Found' };
  }

  const company = report.lead.company ? `${report.lead.company}'s` : 'A company\'s';
  const savings = report.totalSavings.toLocaleString();

  return {
    title: `${company} AI Spend Audit | SpendPilot`,
    description: `We found $${savings} in potential savings on AI tools for this team. Generate your own free audit today.`,
    openGraph: {
      title: `${company} AI Spend Audit`,
      description: `We found $${savings} in potential savings.`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${company} AI Spend Audit`,
      description: `We found $${savings} in potential savings on AI tools.`,
    },
  };
}

export default async function PublicReportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = await prisma.auditReport.findUnique({
    where: { id },
    include: { lead: true },
  });

  if (!report) {
    notFound();
  }

  const result = report.auditData as unknown as AuditResult;
  const companyName = report.lead.company || 'This company';

  return (
    <PageWrapper className="flex-1 bg-muted/10 py-10 px-4">
      <div className="container mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Public Audit Report</h1>
            <p className="text-muted-foreground">
              {companyName}&apos;s AI spend analysis.
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Verified by SpendPilot
          </div>
        </div>

        <SummaryCards result={result} />

        <div className="grid gap-4 md:grid-cols-7">
          <div className="md:col-span-4">
            <SavingsChart result={result} />
          </div>
          <div className="md:col-span-3 space-y-4">
            <RecommendationList result={result} />
            {/* Run AI summary purely based on the saved result data */}
            <AISummary result={result} />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
