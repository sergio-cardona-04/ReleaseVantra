import { PageHeading } from '@/components/workspace/page-heading';
import { useDemo } from '@/mocks/demo-context';
import { useState } from 'react';
import { DemoAction } from '@/components/demo-action';
import { FolderGit2 } from 'lucide-react';
import { projects } from '@/mocks/data';
import { Card, Badge, Select, Alert } from '@/components/ui/primitives';
export function GitHubPage() {
  const { organization } = useDemo();
  const states = [
    'Sin conexión',
    'Instalación autorizada',
    'Repositorios disponibles',
    'Workflows autorizados',
    'Error de conexión',
    'Acceso revocado',
  ];
  const [state, setState] = useState('Sin conexión');
  return (
    <>
      <PageHeading
        title="Integración GitHub"
        description="Diseño de la conexión mediante una GitHub App con permisos mínimos."
      />
      <Card>
        <div className="panel-heading">
          <h2>Estado de la integración</h2>
          <Badge
            tone={
              state.includes('Error') || state.includes('revocado')
                ? 'danger'
                : state === 'Sin conexión'
                  ? 'neutral'
                  : 'info'
            }
          >
            {state}
          </Badge>
        </div>
        <label htmlFor="github-state">Estado de demostración</label>
        <Select id="github-state" value={state} onChange={(e) => setState(e.target.value)}>
          {states.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
        <p className="section-intro">
          {state === 'Sin conexión'
            ? 'La organización todavía no tiene una instalación vinculada.'
            : state === 'Error de conexión'
              ? 'No fue posible obtener la instalación. Revisa su disponibilidad antes de reintentar.'
              : state === 'Acceso revocado'
                ? 'La instalación perdió su autorización. La ejecución debe permanecer deshabilitada.'
                : 'Vista conceptual de una instalación con repositorios y workflows autorizados.'}
        </p>
        <DemoAction
          label={
            state === 'Sin conexión'
              ? 'Revisar conexión conceptual'
              : 'Revisar instalación conceptual'
          }
        />
      </Card>
      {['Instalación autorizada', 'Repositorios disponibles', 'Workflows autorizados'].includes(
        state,
      ) && (
        <Card>
          <h2>Repositorios de ejemplo</h2>
          <ul className="repository-list">
            {projects
              .filter((p) => p.organizationId === organization.id)
              .map((p) => (
                <li key={p.id}>
                  <FolderGit2 size={20} />
                  <div>
                    <strong>{p.repository}</strong>
                    <small>Workflow previsto: deploy.yml · Rama: main</small>
                  </div>
                  <Badge tone="info">Autorización ilustrativa</Badge>
                </li>
              ))}
          </ul>
        </Card>
      )}
      <Alert>
        No se realizan solicitudes a GitHub. Instalación, repositorios, permisos y workflows son
        datos ficticios del prototipo.
      </Alert>
    </>
  );
}
