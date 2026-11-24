import { PageHeading } from '@/components/workspace/page-heading';
import { useDemo } from '@/mocks/demo-context';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GitPullRequest, Plus, ArrowUpRight, CheckCircle2, Clock3, Circle } from 'lucide-react';
import { requests, projects } from '@/mocks/data';
import {
  Card,
  Select,
  Badge,
  EmptyState,
  Progress,
  Textarea,
  Alert,
} from '@/components/ui/primitives';
import { Field } from '@/components/form-fields';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { DemoAction } from '@/components/demo-action';
export function RequestsPage({ approvals = false }: { approvals?: boolean }) {
  const { organization } = useDemo();
  const [filter, setFilter] = useState('all');
  const rows = requests.filter(
    (r) =>
      r.organizationId === organization.id &&
      (!approvals || r.status === 'Pendiente') &&
      (filter === 'all' || r.status === filter),
  );
  return (
    <>
      <PageHeading
        title={approvals ? 'Aprobaciones' : 'Solicitudes'}
        description={
          approvals
            ? 'Revisa el contexto de los cambios que esperan una decisión.'
            : 'Cada cambio tiene un commit, un ambiente y una decisión.'
        }
        action={
          !approvals && (
            <Button asChild>
              <Link to="/app/requests/new">
                <Plus size={16} />
                Preparar solicitud
              </Link>
            </Button>
          )
        }
      />
      {approvals && (
        <Alert>
          Política ilustrativa de {organization.name}: Production requiere {organization.approvals}{' '}
          {organization.approvals === 1 ? 'aprobación' : 'aprobaciones'}. Los botones no registran
          decisiones reales.
        </Alert>
      )}
      <div className="filter-bar">
        <label className="inline-field">
          Estado
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">Todos los estados</option>
            <option>Pendiente</option>
            {!approvals && <option>Autorizada</option>}
          </Select>
        </label>
      </div>
      <div className="content-panel">
        <DataTable
          label={approvals ? 'Bandeja de aprobaciones' : 'Solicitudes de demostración'}
          rows={rows}
          columns={[
            {
              key: 'id',
              title: 'Solicitud / proyecto',
              render: (r) => (
                <Link className="table-project" to={`/app/requests/${r.id}`}>
                  <span className="table-icon">
                    <GitPullRequest size={18} />
                  </span>
                  <div>
                    <strong>{r.id}</strong>
                    <small>
                      {projects.find((p) => p.id === r.projectId)?.name} · {r.version}
                    </small>
                  </div>
                </Link>
              ),
            },
            { key: 'commit', title: 'Commit', render: (r) => <code>{r.sha}</code> },
            {
              key: 'environment',
              title: 'Ambiente',
              render: (r) => <span className="environment">{r.environment}</span>,
            },
            {
              key: 'approval',
              title: 'Aprobaciones',
              render: (r) => (
                <span>
                  {r.approvals} / {r.required}
                </span>
              ),
            },
            {
              key: 'status',
              title: 'Estado',
              render: (r) => (
                <Badge tone={r.status === 'Autorizada' ? 'success' : 'warning'}>{r.status}</Badge>
              ),
            },
            {
              key: 'action',
              title: 'Revisión',
              render: (r) => (
                <Link className="table-link" to={`/app/requests/${r.id}`}>
                  Revisar solicitud
                  <ArrowUpRight size={14} />
                </Link>
              ),
            },
          ]}
        />
      </div>
    </>
  );
}

export function RequestDetail() {
  const { id } = useParams();
  const { organization, role } = useDemo();
  const request = requests.find((r) => r.id === id && r.organizationId === organization.id);
  if (!request)
    return (
      <EmptyState title="Solicitud fuera del ejemplo activo">
        Regresa al listado y elige una solicitud de esta organización.
      </EmptyState>
    );
  const project = projects.find((p) => p.id === request.projectId);
  return (
    <>
      <Link className="back-link" to="/app/requests">
        Solicitudes / {request.id}
      </Link>
      <PageHeading
        title={`${request.id} · ${project?.name}`}
        description="Detalle ilustrativo de la versión propuesta."
        action={
          <Badge tone={request.status === 'Autorizada' ? 'success' : 'warning'}>
            {request.status}
          </Badge>
        }
      />
      <div className="request-detail-layout">
        <Card>
          <h2>Versión solicitada</h2>
          <dl className="detail-list">
            {[
              ['Proyecto', project?.name],
              ['Versión', request.version],
              ['Commit SHA', request.sha],
              ['Referencia Git', 'main'],
              ['Ambiente', request.environment],
              ['Workflow previsto', 'deploy.yml'],
              ['Solicitante', request.requester],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <h3>Justificación de ejemplo</h3>
          <p className="muted">
            Publicar la versión revisada del proyecto y comprobar su resultado en el ambiente
            seleccionado.
          </p>
        </Card>
        <div>
          <Card>
            <h2>Revisión del cambio</h2>
            <p className="approval-count">
              <strong>{request.approvals}</strong> / {request.required} aprobaciones
            </p>
            <Progress
              label="Revisiones recibidas"
              value={Math.round((request.approvals / request.required) * 100)}
            />
            <p className="muted">
              {request.environment === 'Production'
                ? `Production requiere ${request.required} revisiones independientes en este ejemplo.`
                : 'Revisión ilustrativa para Staging.'}
            </p>
            <div className="button-row">
              <DemoAction
                label="Aprobar · demo"
                disabled={!['ADMIN', 'APPROVER'].includes(role)}
                description="La aprobación sería registrada tras verificar identidad, rol y política. En A2 no se registra ninguna decisión."
              />
              <DemoAction
                label="Rechazar · demo"
                disabled={!['ADMIN', 'APPROVER'].includes(role)}
              />
            </div>
            <p className="field-hint">
              Acciones visibles para ADMIN y APPROVER en el selector de demostración.
            </p>
          </Card>
          <Card>
            <h2>Historial conceptual</h2>
            <ol className="timeline">
              <li>
                <CheckCircle2 size={16} />
                <div>
                  <strong>Solicitud preparada</strong>
                  <small>Versión y commit definidos</small>
                </div>
              </li>
              <li>
                <Clock3 size={16} />
                <div>
                  <strong>En revisión</strong>
                  <small>
                    {request.approvals} de {request.required} aprobaciones
                  </small>
                </div>
              </li>
              <li>
                <Circle size={16} />
                <div>
                  <strong>Ejecución pendiente</strong>
                  <small>No se ha enviado ningún workflow real</small>
                </div>
              </li>
            </ol>
            <DemoAction
              label="Revisar ejecución · demo"
              disabled={request.status !== 'Autorizada' || !['ADMIN', 'OPERATOR'].includes(role)}
            />
          </Card>
        </div>
      </div>
    </>
  );
}

export function NewRequest() {
  const { organization, role } = useDemo();
  const orgProjects = projects.filter((p) => p.organizationId === organization.id);
  const [project, setProject] = useState(orgProjects[0]?.id ?? '');
  const selected = orgProjects.find((p) => p.id === project) ?? orgProjects[0];
  return (
    <>
      <PageHeading
        title="Preparar solicitud"
        description="Recorrido visual del desarrollador. No se envían ni guardan solicitudes."
      />
      <Card className="form-card">
        <div className="form-stack">
          <label htmlFor="request-project">Proyecto</label>
          <Select
            id="request-project"
            value={selected?.id ?? ''}
            onChange={(e) => setProject(e.target.value)}
          >
            {orgProjects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </Select>
          <Field label="Versión de ejemplo" value={selected?.version ?? ''} readOnly />
          <Field
            label="Commit SHA de ejemplo"
            value={requests.find((r) => r.projectId === selected?.id)?.sha ?? 'a9b04c2'}
            readOnly
          />
          <label htmlFor="request-env">Ambiente</label>
          <Select id="request-env">
            <option>Staging</option>
            <option>Production</option>
          </Select>
          <Field label="Workflow previsto" value="deploy.yml" readOnly />
          <label htmlFor="request-reason">Justificación conceptual</label>
          <Textarea id="request-reason" rows={4} />
          <DemoAction
            label="Revisar envío conceptual"
            disabled={!['ADMIN', 'DEVELOPER'].includes(role)}
            description="El servicio futuro comprobará commit, membresía, cuotas y política antes de crear una solicitud. En esta vista no se envía nada."
          />
        </div>
      </Card>
    </>
  );
}
