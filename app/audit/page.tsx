import { PageWrapper } from '@/components/layout/page-wrapper';
import { AuditForm } from '@/components/audit/audit-form';

export const metadata = {
  title: 'Start Free Audit | SpendPilot',
  description: 'Enter your AI tools to calculate your savings.',
};

export default function AuditPage() {
  return (
    <PageWrapper className="flex-1 flex flex-col justify-center py-12 md:py-24 px-4 bg-muted/10 relative">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]"></div>

      <div className="container mx-auto">
        <AuditForm />
      </div>
    </PageWrapper>
  );
}
