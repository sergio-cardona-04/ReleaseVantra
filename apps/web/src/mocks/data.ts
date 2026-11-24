export type Role = 'ADMIN' | 'DEVELOPER' | 'APPROVER' | 'OPERATOR' | 'AUDITOR';
export type Plan = 'Team' | 'Business' | 'Enterprise';
export type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';
export const roles: Role[] = ['ADMIN', 'DEVELOPER', 'APPROVER', 'OPERATOR', 'AUDITOR'];
export const plans: {
  name: Plan;
  price: number;
  users: string;
  projects: string;
  repos: string;
  runs: string;
  feature: string;
}[] = [
  {
    name: 'Team',
    price: 0,
    users: '5',
    projects: '2',
    repos: '2',
    runs: '30',
    feature: 'Gestión y auditoría básicas',
  },
  {
    name: 'Business',
    price: 29,
    users: '15',
    projects: '8',
    repos: '8',
    runs: '150',
    feature: 'Analítica y reportes ampliados',
  },
  {
    name: 'Enterprise',
    price: 199,
    users: 'Sin cuota comercial',
    projects: 'Sin cuota comercial',
    repos: 'Sin cuota comercial',
    runs: 'Sin cuota comercial',
    feature: 'Release Intelligence y reglas de riesgo',
  },
];
export const organizations = [
  {
    id: 'astera',
    name: 'Astera Digital',
    initials: 'AD',
    plan: 'Business' as Plan,
    users: 7,
    quota: 150,
    approvals: 2,
  },
  {
    id: 'faro',
    name: 'FaroWare Systems',
    initials: 'FS',
    plan: 'Team' as Plan,
    users: 5,
    quota: 30,
    approvals: 1,
  },
];
export const projects = [
  {
    id: 'atlas',
    organizationId: 'astera',
    name: 'Atlas API',
    repository: 'astera-digital/atlas-api',
    version: 'v2.4.0',
    environment: 'Production',
    status: 'Activo',
  },
  {
    id: 'portal',
    organizationId: 'astera',
    name: 'Customer Portal',
    repository: 'astera-digital/customer-portal',
    version: 'v1.8.2',
    environment: 'Staging',
    status: 'Activo',
  },
  {
    id: 'billing',
    organizationId: 'astera',
    name: 'Billing Service',
    repository: 'astera-digital/billing-service',
    version: 'v1.2.0',
    environment: 'Production',
    status: 'Activo',
  },
  {
    id: 'faro-api',
    organizationId: 'faro',
    name: 'Faro API',
    repository: 'faroware-systems/faro-api',
    version: 'v1.3.0',
    environment: 'Production',
    status: 'Activo',
  },
  {
    id: 'faro-web',
    organizationId: 'faro',
    name: 'Faro Web',
    repository: 'faroware-systems/faro-web',
    version: 'v1.1.2',
    environment: 'Staging',
    status: 'Activo',
  },
];
export const requests = [
  {
    id: 'REQ-024',
    organizationId: 'astera',
    projectId: 'atlas',
    version: 'v2.4.0',
    sha: 'c8e4a21',
    environment: 'Production',
    status: 'Pendiente',
    requester: 'Desarrollador de Astera',
    approvals: 1,
    required: 2,
  },
  {
    id: 'REQ-023',
    organizationId: 'astera',
    projectId: 'portal',
    version: 'v1.8.2',
    sha: 'f1b09d3',
    environment: 'Staging',
    status: 'Autorizada',
    requester: 'Desarrollador de Astera',
    approvals: 1,
    required: 1,
  },
  {
    id: 'REQ-022',
    organizationId: 'astera',
    projectId: 'billing',
    version: 'v1.2.0',
    sha: 'b7d2c90',
    environment: 'Production',
    status: 'Pendiente',
    requester: 'Desarrollador de Astera',
    approvals: 0,
    required: 2,
  },
  {
    id: 'REQ-008',
    organizationId: 'faro',
    projectId: 'faro-api',
    version: 'v1.3.0',
    sha: 'a9b04c2',
    environment: 'Production',
    status: 'Pendiente',
    requester: 'Desarrollador de FaroWare',
    approvals: 0,
    required: 1,
  },
];
export const executionStates: { label: string; tone: Tone }[] = [
  { label: 'Solicitada', tone: 'neutral' },
  { label: 'Enviándose', tone: 'info' },
  { label: 'En cola', tone: 'warning' },
  { label: 'Ejecutándose', tone: 'info' },
  { label: 'Completada', tone: 'success' },
  { label: 'Fallida', tone: 'danger' },
  { label: 'Resultado desconocido', tone: 'warning' },
];
export const executions = [
  {
    id: 'RUN-108',
    organizationId: 'astera',
    project: 'Atlas API',
    version: 'v2.3.9',
    sha: 'c7f93a1',
    environment: 'Production',
    status: 'Completada',
    tone: 'success' as Tone,
    duration: '1 min 42 s',
  },
  {
    id: 'RUN-107',
    organizationId: 'astera',
    project: 'Customer Portal',
    version: 'v1.8.2',
    sha: 'f1b09d3',
    environment: 'Staging',
    status: 'Ejecutándose',
    tone: 'info' as Tone,
    duration: '38 s',
  },
  {
    id: 'RUN-106',
    organizationId: 'astera',
    project: 'Billing Service',
    version: 'v1.1.9',
    sha: 'b7d2c90',
    environment: 'Staging',
    status: 'Fallida',
    tone: 'danger' as Tone,
    duration: '2 min 18 s',
  },
  {
    id: 'RUN-031',
    organizationId: 'faro',
    project: 'Faro API',
    version: 'v1.2.9',
    sha: 'a8d09b1',
    environment: 'Production',
    status: 'Completada',
    tone: 'success' as Tone,
    duration: '1 min 12 s',
  },
];
