import * as z from 'zod';

export const toolEntrySchema = z.object({
  id: z.string(),
  toolName: z.string().min(1, 'Please select a tool.'),
  plan: z.string().min(1, 'Please select a plan.'),
  seats: z.number().min(1, 'At least 1 seat is required.').max(10000, 'Max 10000 seats.'),
});

export const auditFormSchema = z.object({
  tools: z.array(toolEntrySchema).min(1, 'Please add at least one tool to audit.'),
});

export type AuditFormValues = z.infer<typeof auditFormSchema>;
export type ToolEntry = z.infer<typeof toolEntrySchema>;
