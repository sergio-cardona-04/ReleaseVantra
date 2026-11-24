import { Layers3, GitPullRequest, Workflow, FileClock, ShieldCheck, ScanLine } from 'lucide-react';
export const features = [
  {
    icon: Layers3,
    name: 'Proyectos y versiones',
    text: 'El repositorio, el commit y el ambiente de cada cambio en un mismo lugar.',
  },
  {
    icon: GitPullRequest,
    name: 'Solicitudes y aprobaciones',
    text: 'Revisión explícita de los cambios antes de llegar a Production.',
  },
  {
    icon: Workflow,
    name: 'GitHub Actions',
    text: 'Workflows autorizados, seguimiento de ejecuciones y estados claros.',
  },
  {
    icon: FileClock,
    name: 'Auditoría y trazabilidad',
    text: 'Un historial para conocer quién solicitó, aprobó y ejecutó cada versión.',
  },
  {
    icon: ShieldCheck,
    name: 'Organizaciones y permisos',
    text: 'Espacios por empresa y cinco roles con responsabilidades diferenciadas.',
  },
  {
    icon: ScanLine,
    name: 'Release Intelligence',
    text: 'Evaluación explicable del riesgo, prevista para el plan Enterprise.',
  },
];
