'use server';

import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { AuditResult } from '@/services/audit-engine';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

const leadSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  auditData: z.any(),
  totalSavings: z.number(),
});

export async function saveLeadAndReport(formData: FormData, auditResult: AuditResult) {
  try {
    const rawData = {
      email: formData.get('email'),
      company: formData.get('company'),
      auditData: auditResult,
      totalSavings: auditResult.annualSavings,
    };

    const validated = leadSchema.parse(rawData);

    // 1. Upsert Lead (if they already exist, just link the new report)
    const lead = await prisma.lead.upsert({
      where: { email: validated.email },
      update: { company: validated.company || undefined },
      create: {
        email: validated.email,
        company: validated.company || null,
      },
    });

    // 2. Create Audit Report linked to lead
    const report = await prisma.auditReport.create({
      data: {
        leadId: lead.id,
        auditData: validated.auditData,
        totalSavings: validated.totalSavings,
        isPublic: false,
      },
    });

    // 3. (Optional) Trigger Resend Email here
    // if (process.env.RESEND_API_KEY) {
    //   await resend.emails.send({
    //     from: 'SpendPilot <audit@yourdomain.com>',
    //     to: [validated.email],
    //     subject: 'Your SpendPilot AI Audit Report',
    //     html: `<p>Thanks for running an audit. We found $${validated.totalSavings} in savings.</p>`,
    //   });
    // }

    return { success: true, reportId: report.id };
  } catch (error) {
    console.error('Lead capture error:', error);
    return { success: false, error: 'Failed to save your report. Please try again.' };
  }
}
