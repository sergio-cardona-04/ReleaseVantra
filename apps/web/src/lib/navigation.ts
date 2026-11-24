import {
  LayoutDashboard,
  FolderGit2,
  Tags,
  GitPullRequest,
  ShieldCheck,
  Workflow,
  TriangleAlert,
  FileClock,
  GitFork,
  Users,
  CreditCard,
  SlidersHorizontal,
  ScanLine,
  Settings2,
  type LucideIcon,
} from 'lucide-react';
import type { Role } from '@/mocks/data';
export const navigation: {
  path: string;
  title: string;
  icon: LucideIcon;
  group: string;
  roles: Role[];
}[] = [
  {
    path: '/app',
    title: 'Dashboard',
    icon: LayoutDashboard,
    group: 'Espacio de trabajo',
    roles: ['ADMIN', 'DEVELOPER', 'APPROVER', 'OPERATOR', 'AUDITOR'],
  },
  {
    path: '/app/projects',
    title: 'Proyectos',
    icon: FolderGit2,
    group: 'Espacio de trabajo',
    roles: ['ADMIN', 'DEVELOPER', 'AUDITOR'],
  },
  {
    path: '/app/versions',
    title: 'Versiones',
    icon: Tags,
    group: 'Espacio de trabajo',
    roles: ['ADMIN', 'DEVELOPER', 'AUDITOR'],
  },
  {
    path: '/app/requests',
    title: 'Solicitudes',
    icon: GitPullRequest,
    group: 'Espacio de trabajo',
    roles: ['ADMIN', 'DEVELOPER', 'APPROVER', 'OPERATOR', 'AUDITOR'],
  },
  {
    path: '/app/approvals',
    title: 'Aprobaciones',
    icon: ShieldCheck,
    group: 'Espacio de trabajo',
    roles: ['ADMIN', 'APPROVER', 'AUDITOR'],
  },
  {
    path: '/app/executions',
    title: 'Ejecuciones',
    icon: Workflow,
    group: 'Espacio de trabajo',
    roles: ['ADMIN', 'OPERATOR', 'AUDITOR'],
  },
  {
    path: '/app/incidents',
    title: 'Incidentes',
    icon: TriangleAlert,
    group: 'Espacio de trabajo',
    roles: ['ADMIN', 'OPERATOR', 'AUDITOR'],
  },
  {
    path: '/app/audit',
    title: 'Auditoría',
    icon: FileClock,
    group: 'Espacio de trabajo',
    roles: ['ADMIN', 'AUDITOR'],
  },
  {
    path: '/app/integrations/github',
    title: 'GitHub',
    icon: GitFork,
    group: 'Organización',
    roles: ['ADMIN'],
  },
  { path: '/app/members', title: 'Miembros', icon: Users, group: 'Organización', roles: ['ADMIN'] },
  {
    path: '/app/subscription',
    title: 'Suscripción',
    icon: CreditCard,
    group: 'Organización',
    roles: ['ADMIN'],
  },
  {
    path: '/app/policies',
    title: 'Políticas',
    icon: SlidersHorizontal,
    group: 'Organización',
    roles: ['ADMIN', 'APPROVER', 'AUDITOR'],
  },
  {
    path: '/app/intelligence',
    title: 'Release Intelligence',
    icon: ScanLine,
    group: 'Organización',
    roles: ['ADMIN', 'APPROVER', 'AUDITOR'],
  },
  {
    path: '/app/settings',
    title: 'Configuración',
    icon: Settings2,
    group: 'Organización',
    roles: ['ADMIN', 'DEVELOPER', 'APPROVER', 'OPERATOR', 'AUDITOR'],
  },
];
