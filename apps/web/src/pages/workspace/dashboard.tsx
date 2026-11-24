import { PageHeading } from '@/components/workspace/page-heading';
import { useDemo } from '@/mocks/demo-context';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { executions, projects, requests } from '@/mocks/data';
import {
  FolderGit2,
  GitPullRequest,
  CheckCircle2,
  Activity,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  GitBranch,
} from 'lucide-react';
import { Card } from '@/components/ui/primitives';
import { ExecutionTable } from '@/components/workspace/execution-table';
export function Dashboard() {
  const { organization } = useDemo();
  const orgProjects = projects.filter((p) => p.organizationId === organization.id);
  const pending = requests.filter(
    (r) => r.organizationId === organization.id && r.status === 'Pendiente',
  );
  const orgExecutions = executions.filter((e) => e.organizationId === organization.id);
  const metrics = [
    {
      label: 'Proyectos activos',
      value: orgProjects.length,
      detail: 'Repositorios de demostración',
      icon: FolderGit2,
    },
    {
      label: 'Solicitudes pendientes',
      value: pending.length,
      detail: 'Esperando una decisión',
      icon: GitPullRequest,
    },
    {
      label: 'Ejecuciones exitosas',
      value: orgExecutions.filter((e) => e.tone === 'success').length,
      detail: 'En el conjunto de ejemplo',
      icon: CheckCircle2,
    },
    {
      label: 'Ejecuciones fallidas',
      value: orgExecutions.filter((e) => e.tone === 'danger').length,
      detail: 'En el conjunto de ejemplo',
      icon: Activity,
    },
  ];
  return (
    <>
      <PageHeading
        title="Dashboard"
        description={`Todo el contexto de ${organization.name}, en un solo lugar.`}
        action={
          <Button asChild>
            <Link to="/app/requests/new">
              <Plus size={16} />
              Preparar solicitud
            </Link>
          </Button>
        }
      />
      <div className="metrics-grid">
        {metrics.map(({ label, value, detail, icon: Icon }) => (
          <Card key={label} className="metric-card">
            <div>
              <span>{label}</span>
              <Icon size={17} />
            </div>
            <strong>{String(value).padStart(2, '0')}</strong>
            <small>{detail}</small>
          </Card>
        ))}
      </div>
      <div className="content-panel">
        <div className="panel-heading">
          <div>
            <h2>Despliegues recientes</h2>
            <p>Últimas ejecuciones del conjunto de demostración.</p>
          </div>
          <Link to="/app/executions">
            Ver ejecuciones <ArrowUpRight size={15} />
          </Link>
        </div>
        <ExecutionTable />
      </div>
      <div className="dashboard-lower">
        <section className="content-panel">
          <div className="panel-heading">
            <h2>Pendientes de aprobación</h2>
            <span className="count-label">{pending.length} solicitudes</span>
          </div>
          {pending.map((r) => (
            <Link className="request-row" to={`/app/requests/${r.id}`} key={r.id}>
              <span className="table-icon">
                <GitPullRequest size={18} />
              </span>
              <div>
                <strong>
                  {projects.find((p) => p.id === r.projectId)?.name}{' '}
                  <span className="muted">{r.version}</span>
                </strong>
                <small>
                  {r.environment} · {r.approvals} de {r.required} aprobaciones
                </small>
              </div>
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </section>
        <section className="content-panel">
          <div className="panel-heading">
            <h2>Actividad del equipo</h2>
            <span className="small-label">Ejemplo</span>
          </div>
          <ol className="activity-list">
            <li>
              <CheckCircle2 size={17} />
              <div>
                <p>Operador completó una ejecución.</p>
                <small>
                  {orgExecutions[0]?.project} · {orgExecutions[0]?.id}
                </small>
              </div>
            </li>
            <li>
              <ShieldCheck size={17} />
              <div>
                <p>Aprobador revisó una solicitud.</p>
                <small>{pending[0]?.id} · Revisión parcial</small>
              </div>
            </li>
            <li>
              <GitBranch size={17} />
              <div>
                <p>Desarrollador preparó una versión.</p>
                <small>{orgProjects[0]?.version} · Commit definido</small>
              </div>
            </li>
          </ol>
        </section>
      </div>
    </>
  );
}
