import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { AuditResult } from '@/services/audit-engine';

// Define the request schema for safety
const requestSchema = z.object({
  auditData: z.any(), // In a real app, strict type this against AuditResult
});

export const maxDuration = 30; // Max execution time for Vercel

export async function POST(req: NextRequest) {
  try {
    // If no API key is present, fallback gracefully
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ 
          fallback: true, 
          message: "API Key not configured. Here is a static summary: Based on your input, you have opportunities to optimize your AI spend by adjusting seat counts or switching to more cost-effective tiers." 
        }), 
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const json = await req.json();
    const { auditData } = requestSchema.parse(json);
    const result = auditData as AuditResult;

    // Construct a focused system prompt based on the deterministic results
    const prompt = `
      You are an expert SaaS CFO and technical architect.
      Analyze the following AI tool audit and write a concise, professional, 2-3 paragraph executive summary.
      Focus on actionable advice. Do NOT invent numbers. Use only the provided data.
      
      Total Current Annual Spend: $${result.totalCurrentAnnual}
      Total Proposed Annual Spend: $${result.totalProposedAnnual}
      Total Annual Savings: $${result.annualSavings}
      
      Details:
      ${result.breakdown.map(t => `- ${t.toolName} (${t.planName}): ${t.seats} seats. ${t.recommendation ? `Recommended: ${t.recommendation.message}` : 'Optimized.'}`).join('\n')}
    `;

    // Stream the text directly to the client
    const stream = await streamText({
      model: openai('gpt-4o-mini'),
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
    });

    return stream.toTextStreamResponse();
  } catch (error) {
    console.error('AI Generation Error:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Failed to generate summary. Please try again later.' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
