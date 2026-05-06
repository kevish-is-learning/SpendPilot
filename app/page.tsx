import { PageWrapper } from '@/components/layout/page-wrapper';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <PageWrapper className="flex flex-col items-center justify-center flex-1 w-full max-w-5xl px-4 py-24 mx-auto text-center">
      <div className="space-y-6 max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Stop Overpaying for <span className="text-primary">AI Tools.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl">
          Analyze your company&apos;s AI subscriptions, discover hidden savings, and get tailored recommendations to downgrade or switch to better alternatives.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/audit">
            <Button size="lg" className="h-12 px-8 rounded-full text-base font-medium group">
              Start Free Audit
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline" className="h-12 px-8 rounded-full text-base font-medium">
              View Pricing
            </Button>
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
