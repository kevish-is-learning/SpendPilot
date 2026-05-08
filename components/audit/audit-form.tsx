'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, Trash2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

import { auditFormSchema, AuditFormValues } from '@/lib/validations/audit';
import { useAuditStore } from '@/hooks/use-audit-store';
import { SUPPORTED_TOOLS } from '@/config/tools';

export function AuditForm() {
  const router = useRouter();
  const { auditData, setAuditData } = useAuditStore();

  const form = useForm<AuditFormValues>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: auditData || {
      tools: [{ id: crypto.randomUUID(), toolName: '', plan: '', seats: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'tools',
    control: form.control,
  });

  function onSubmit(data: AuditFormValues) {
    setAuditData(data);
    router.push('/results');
  }

  return (
    <Card className="w-full max-w-4xl mx-auto border-border/50 shadow-2xl bg-background/60 backdrop-blur-xl">
      <CardHeader className="space-y-2 text-center md:text-left">
        <CardTitle className="text-3xl font-bold">Your AI Stack</CardTitle>
        <CardDescription className="text-lg">
          Add all the AI tools your team currently pays for. We&apos;ll calculate if you are overspending.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {fields.map((field, index) => {
                  const selectedToolId = form.watch(`tools.${index}.toolName`);
                  const availablePlans = SUPPORTED_TOOLS.find((t) => t.id === selectedToolId)?.plans || [];

                  return (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, height: 0, scale: 0.95 }}
                      animate={{ opacity: 1, height: 'auto', scale: 1 }}
                      exit={{ opacity: 0, height: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col md:flex-row gap-4 items-start md:items-end p-4 rounded-xl border border-border/50 bg-muted/20"
                    >
                      <FormField
                        control={form.control}
                        name={`tools.${index}.toolName`}
                        render={({ field }) => (
                          <FormItem className="flex-1 w-full">
                            <FormLabel className="text-xs uppercase text-muted-foreground tracking-wider">Tool</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-background">
                                  <SelectValue placeholder="Select a tool" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {SUPPORTED_TOOLS.map((tool) => (
                                  <SelectItem key={tool.id} value={tool.id}>
                                    {tool.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`tools.${index}.plan`}
                        render={({ field }) => (
                          <FormItem className="flex-1 w-full">
                            <FormLabel className="text-xs uppercase text-muted-foreground tracking-wider">Plan</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedToolId}>
                              <FormControl>
                                <SelectTrigger className="bg-background">
                                  <SelectValue placeholder="Select plan" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {availablePlans.map((plan) => (
                                  <SelectItem key={plan.id} value={plan.id}>
                                    {plan.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`tools.${index}.seats`}
                        render={({ field }) => (
                          <FormItem className="w-full md:w-32">
                            <FormLabel className="text-xs uppercase text-muted-foreground tracking-wider">Seats</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                className="bg-background"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="mt-2 md:mt-0 md:mb-[2px] shrink-0 text-muted-foreground hover:text-destructive"
                        onClick={() => remove(index)}
                        disabled={fields.length === 1}
                      >
                        <Trash2 className="h-5 w-5" />
                        <span className="sr-only">Remove tool</span>
                      </Button>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full md:w-auto border-dashed border-2"
              onClick={() => append({ id: crypto.randomUUID(), toolName: '', plan: '', seats: 1 })}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add another tool
            </Button>

            <div className="pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                Your data is stored locally. We don&apos;t save this until you explicitly share the report.
              </p>
              <Button type="submit" size="lg" className="w-full sm:w-auto px-8 rounded-full">
                Analyze Spend
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
