import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuditFormValues } from '@/lib/validations/audit';

interface AuditState {
  auditData: AuditFormValues | null;
  setAuditData: (data: AuditFormValues) => void;
  clearAuditData: () => void;
}

export const useAuditStore = create<AuditState>()(
  persist(
    (set) => ({
      auditData: null,
      setAuditData: (data) => set({ auditData: data }),
      clearAuditData: () => set({ auditData: null }),
    }),
    {
      name: 'spendpilot-audit-storage',
    }
  )
);
