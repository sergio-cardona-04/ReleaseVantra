import { PageHeading } from '@/components/workspace/page-heading';
import { useDemo } from '@/mocks/demo-context';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FolderGit2, Search, ArrowUpRight } from 'lucide-react';
import { projects } from '@/mocks/data';
import { Card, Input, Select, Badge, EmptyState } from '@/components/ui/primitives';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { DemoAction } from '@/components/demo-action';
export function ProjectsPage() {
  const { organization } = useDemo();
  const [search, setSearch] = useState('');
  const [environment, setEnvironment] = useState('all');
  const rows = projects.filter(
    (p) =>
      p.organizationId === organization.id &&
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (environment === 'all' || p.environment === environment),
  );
  return (
    <>
      <PageHeading
        title="Proyectos"
        description="Repositorios, ambientes y versiones de tu organización."
        action={<DemoAction label="Nuevo proyecto" />}
      />
      <div className="filter-bar">
        <div className="search-field">
          <Search size={17} />
          <Input
            aria-label="Buscar proyectos"
            placeholder="Buscar proyecto…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <label className="inline-field">
          Ambiente
          <Select value={environment} onChange={(e) => setEnvironment(e.target.value)}>
            <option value="all">Todos los ambientes</option>
            <option>Production</option>
            <option>Staging</option>
          </Select>
        </label>
        <span className="muted">{rows.length} proyectos de ejemplo</span>
      </div>
      <div className="content-panel">
        <DataTable
          label="Listado de proyectos"
          rows={rows}
          columns={[
            {
              key: 'name',
              title: 'Proyecto',
              render: (r) => (
                <Link className="table-project" to={`/app/projects/${r.id}`}>
                  <span className="table-icon">
                    <FolderGit2 size={18} />
                  </span>
                  <div>
                    <strong>{r.name}</strong>
                    <small>{r.repository}</small>
                  </div>
                </Link>
              ),
            },
            {
              key: 'status',
              title: 'Estado',
              render: (r) => <Badge tone="success">{r.status}</Badge>,
            },
            {
              key: 'env',
              title: 'Ambientes',
              render: (r) => <span className="environment">{r.environment}</span>,
            },
            { key: 'version', title: 'Última versión', render: (r) => <code>{r.version}</code> },
            {
              key: 'detail',
              title: 'Detalle',
              render: (r) => (
                <Link className="table-link" to={`/app/projects/${r.id}`}>
                  Ver proyecto
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

export function ProjectDetail() {
  const { id } = useParams();
  const { organization } = useDemo();
  const project = projects.find((p) => p.id === id && p.organizationId === organization.id);
  if (!project)
    return (
      <EmptyState title="Proyecto fuera del ejemplo activo">
        Elige un proyecto de la organización seleccionada desde el listado.
      </EmptyState>
    );
  return (
    <>
      <Link className="back-link" to="/app/projects">
        Proyectos / Detalle
      </Link>
      <PageHeading
        title={project.name}
        description={project.repository}
        action={
          <Button asChild>
            <Link to="/app/requests/new">Preparar solicitud</Link>
          </Button>
        }
      />
      <div className="detail-grid">
        <Card>
          <h2>Contexto del proyecto</h2>
          <dl className="detail-list">
            <div>
              <dt>Repositorio</dt>
              <dd>{project.repository}</dd>
            </div>
            <div>
              <dt>Estado</dt>
              <dd>
                <Badge tone="success">Activo</Badge>
              </dd>
            </div>
            <div>
              <dt>Última versión</dt>
              <dd>
                <code>{project.version}</code>
              </dd>
            </div>
            <div>
              <dt>Ambientes previstos</dt>
              <dd>Development · Staging · Production</dd>
            </div>
          </dl>
        </Card>
        <Card>
          <h2>Workflow previsto</h2>
          <p>deploy.yml</p>
          <p className="muted">
            Referencia ilustrativa de un workflow autorizado. No existe una conexión real con
            GitHub.
          </p>
          <DemoAction label="Revisar workflow" />
        </Card>
      </div>
    </>
  );
}
