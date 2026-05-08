'use client';

import { useEffect, useState } from 'react';
import { useCompletion } from 'ai/react';
import { Sparkles, AlertCircle, RefreshCcw } from 'lucide-react';
import { AuditResult } from '@/services/audit-engine';
import { Button } from '@/components/ui/button';

export function AISummary({ result }: { result: AuditResult }) {
  const [fallbackMessage, setFallbackMessage] = useState<string | null>(null);

  const { completion, complete, isLoading, error } = useCompletion({
    api: '/api/generate-summary',
    onResponse: async (response: any) => {
      // Handle the custom fallback JSON response if API key is missing
      if (response.headers.get('content-type')?.includes('application/json')) {
        const data = await response.clone().json();
        if (data.fallback) {
          setFallbackMessage(data.message);
        }
      }
    },
  });

  useEffect(() => {
    // Automatically trigger generation when the component mounts
    if (!completion && !isLoading && !fallbackMessage && !error) {
      complete('', { body: { auditData: result } });
    }
  }, [complete, completion, isLoading, result, fallbackMessage, error]);

  const handleRetry = () => {
    setFallbackMessage(null);
    complete('', { body: { auditData: result } });
  };

  return (
    <div className="p-6 rounded-xl border border-primary/20 bg-primary/5 relative overflow-hidden shadow-sm">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Sparkles className="w-24 h-24 text-primary" />
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-primary/20 p-2 rounded-md">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold tracking-tight">Executive Summary</h3>
      </div>

      <div className="relative z-10 text-sm md:text-base text-muted-foreground leading-relaxed min-h-[100px]">
        {error ? (
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Failed to generate summary</span>
            </div>
            <Button variant="outline" size="sm" onClick={handleRetry}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        ) : fallbackMessage ? (
          <p className="italic">{fallbackMessage}</p>
        ) : (
          <div className="whitespace-pre-wrap">
            {completion || (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin inline-block"></span>
                Generating AI analysis...
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
