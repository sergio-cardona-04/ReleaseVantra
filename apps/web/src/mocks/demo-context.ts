import { createContext, useContext } from 'react';
import { organizations, type Plan, type Role } from './data';

export interface DemoContextValue {
  organization: (typeof organizations)[number];
  setOrganizationId: (id: string) => void;
  role: Role;
  setRole: (role: Role) => void;
  plan: Plan;
  setPlan: (plan: Plan) => void;
}
export const DemoContext = createContext<DemoContextValue | null>(null);
export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error('La vista requiere el contexto de demostración.');
  return value;
}
