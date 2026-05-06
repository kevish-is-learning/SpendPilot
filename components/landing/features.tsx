'use client';

import { motion } from 'framer-motion';
import { LineChart, Search, Zap, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    title: 'Analyze Overspending',
    description: 'Input your current AI tool stack and let our engine calculate exactly how much you are overpaying based on your actual seat counts and usage.',
    icon: Search,
  },
  {
    title: 'Smart Alternatives',
    description: 'Get matched with highly capable but cheaper alternatives. We compare ChatGPT, Claude, GitHub Copilot, Cursor, and more.',
    icon: Zap,
  },
  {
    title: 'Savings Visualized',
    description: 'See your projected monthly and annualized savings through a beautiful, easy-to-read dashboard breakdown.',
    icon: LineChart,
  },
  {
    title: 'Actionable Advice',
    description: 'Receive an AI-generated personalized summary explaining exactly how to transition tools without losing productivity.',
    icon: ShieldCheck,
  },
];

export function Features() {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Everything you need to optimize your SaaS spend.
          </h2>
          <p className="max-w-[85%] text-muted-foreground md:text-lg/relaxed lg:text-xl/relaxed">
            Our deterministic audit engine leaves no dollar unchecked. Stop guessing and start saving.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
