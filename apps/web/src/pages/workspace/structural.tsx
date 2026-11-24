import { PageHeading } from '@/components/workspace/page-heading';
import { useDemo } from '@/mocks/demo-context';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DemoAction } from '@/components/demo-action';
import { DataTable } from '@/components/data-table';
import { projects, requests } from '@/mocks/data';
import { Card, Alert, Badge, EmptyState, Skeleton } from '@/components/ui/primitives';
import { Dialog } from '@/components/ui/dialog';
import { HealthStatus } from '@/components/health-status';
import { Tabs } from '@/components/ui/tabs';
export function StructuralPage({ module }: { module: string }) {
  const { organization } = useDemo();
  const orgProjects = projects.filter((p) => p.organizationId === organization.id);
  if (module === 'versions')
    return (
      <>
        <PageHeading
          title="Versiones"
          description="Referencias de versiones y commits del conjunto de demostración."
        />
        <DataTable
          label="Versiones de ejemplo"
          rows={orgProjects}
          columns={[
            { key: 'project', title: 'Proyecto', render: (r) => r.name },
            { key: 'version', title: 'Versión', render: (r) => <code>{r.version}</code> },
            {
              key: 'sha',
              title: 'Commit SHA',
              render: (r) => (
                <code>{requests.find((q) => q.projectId === r.id)?.sha ?? 'a9b04c2'}</code>
              ),
            },
            {
              key: 'action',
              title: 'Solicitud',
              render: () => (
                <Link className="table-link" to="/app/requests/new">
                  Preparar solicitud
                </Link>
              ),
            },
          ]}
        />
      </>
    );
  if (module === 'incidents')
    return (
      <>
        <PageHeading
          title="Incidentes"
          description="Relación prevista entre incidentes y despliegues."
        />
        <EmptyState title="No hay incidentes en este ejemplo">
          El módulo permitirá documentar contexto, impacto y versiones relacionadas en una fase
          posterior.
        </EmptyState>
        <DemoAction label="Revisar registro de incidente" />
      </>
    );
  if (module === 'audit')
    return (
      <>
        <PageHeading
          title="Auditoría"
          description="Evidencia conceptual de las acciones por organización."
        />
        <DataTable
          label="Eventos de auditoría ilustrativos"
          rows={requests.filter((r) => r.organizationId === organization.id)}
          columns={[
            { key: 'event', title: 'Evento', render: () => <code>request.reviewed</code> },
            {
              key: 'ref',
              title: 'Referencia',
              render: (r) => <Link to={`/app/requests/${r.id}`}>{r.id}</Link>,
            },
            { key: 'actor', title: 'Actor ilustrativo', render: () => 'Aprobador de demostración' },
            { key: 'org', title: 'Organización', render: () => organization.name },
          ]}
        />
        <Alert>
          Eventos ficticios. El registro y su publicación mediante Outbox se implementarán en fases
          posteriores.
        </Alert>
      </>
    );
  if (module === 'policies')
    return (
      <>
        <PageHeading
          title="Políticas"
          description="Reglas de aprobación representadas visualmente."
        />
        <Card>
          <h2>Política de Production</h2>
          <dl className="detail-list">
            <div>
              <dt>Organización</dt>
              <dd>{organization.name}</dd>
            </div>
            <div>
              <dt>Aprobaciones requeridas</dt>
              <dd>{organization.approvals}</dd>
            </div>
            <div>
              <dt>Commit aprobado</dt>
              <dd>Debe coincidir con el solicitado</dd>
            </div>
            <div>
              <dt>Resultado desconocido</dt>
              <dd>Conciliar antes de reintentar</dd>
            </div>
          </dl>
          <DemoAction label="Revisar edición de política" />
        </Card>
      </>
    );
  return (
    <>
      <PageHeading
        title="Configuración"
        description="Preferencias y contexto del prototipo empresarial."
      />
      <div className="detail-grid">
        <Card>
          <h2>Organización</h2>
          <dl className="detail-list">
            <div>
              <dt>Nombre de demostración</dt>
              <dd>{organization.name}</dd>
            </div>
            <div>
              <dt>Preferencia visual</dt>
              <dd>Tema oscuro</dd>
            </div>
            <div>
              <dt>Sesión</dt>
              <dd>No existe una sesión autenticada</dd>
            </div>
          </dl>
          <DemoAction label="Revisar ajustes conceptuales" />
        </Card>
        <Card>
          <h2>Estado de la API local</h2>
          <HealthStatus />
        </Card>
      </div>
      <StateGallery />
    </>
  );
}

export function StateGallery() {
  const [state, setState] = useState('empty');
  return (
    <Card>
      <h2>Estados del sistema visual</h2>
      <Tabs
        label="Estados de presentación"
        value={state}
        onValueChange={setState}
        items={[
          { value: 'empty', label: 'Vacío' },
          { value: 'loading', label: 'Carga' },
          { value: 'error', label: 'Error' },
          { value: 'success', label: 'Éxito ilustrativo' },
          { value: 'disabled', label: 'Deshabilitado' },
          { value: 'permission', label: 'Permiso' },
        ]}
      >
        <div className="state-example">
          {state === 'empty' ? (
            <EmptyState title="Sin resultados">
              Los elementos aparecerán aquí cuando el módulo esté conectado.
            </EmptyState>
          ) : state === 'loading' ? (
            <Skeleton />
          ) : state === 'error' ? (
            <Alert danger>Error de ejemplo: no fue posible consultar el recurso.</Alert>
          ) : state === 'success' ? (
            <Badge tone="success">Completado · Estado ilustrativo</Badge>
          ) : state === 'disabled' ? (
            <Button disabled>Acción deshabilitada</Button>
          ) : (
            <Alert>
              Acceso restringido · Ejemplo visual. La autorización real corresponde al backend de
              A4.
            </Alert>
          )}
        </div>
      </Tabs>
      <Dialog
        trigger={<Button variant="secondary">Inspeccionar sesión vencida</Button>}
        title="Sesión vencida · Ejemplo visual"
        description="En la aplicación futura será necesario volver a iniciar sesión. Este prototipo no crea ni valida sesiones."
      />
    </Card>
  );
}
