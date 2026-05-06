'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CTA() {
  return (
    <section className="w-full py-24 md:py-32 overflow-hidden relative">
      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-16 flex flex-col items-center text-center space-y-8 relative overflow-hidden shadow-2xl"
        >
          {/* Decorative Background inside CTA */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-black/10 blur-3xl"></div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-2xl mx-auto relative z-10">
            Ready to stop burning money on AI tools?
          </h2>
          <p className="max-w-[600px] text-primary-foreground/80 md:text-xl relative z-10">
            Join hundreds of companies that have optimized their AI stack. Get your personalized audit in less than 2 minutes.
          </p>
          <div className="relative z-10 w-full sm:w-auto">
            <Link href="/audit">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto h-14 px-8 rounded-full text-lg font-semibold group">
                Get Your Free Audit
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
