import { Hero } from '@/components/landing/hero';
import { TrustIndicators } from '@/components/landing/trust-indicators';
import { Features } from '@/components/landing/features';
import { CTA } from '@/components/landing/cta';

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Hero />
      <TrustIndicators />
      <Features />
      <CTA />
    </div>
  );
}
