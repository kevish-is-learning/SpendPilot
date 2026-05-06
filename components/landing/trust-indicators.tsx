'use client';

import { motion } from 'framer-motion';

export function TrustIndicators() {
  const companies = [
    { name: 'Acme Corp', logo: 'ACME' },
    { name: 'Global Tech', logo: 'GLOBAL' },
    { name: 'Nexus', logo: 'NEXUS' },
    { name: 'Stark Ind.', logo: 'STARK' },
    { name: 'Wayne Ent.', logo: 'WAYNE' },
  ];

  return (
    <section className="w-full py-12 border-y border-border/40 bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Trusted by forward-thinking teams optimizing their AI spend
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale">
            {companies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-xl md:text-2xl font-black tracking-tighter text-foreground/80"
              >
                {company.logo}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
