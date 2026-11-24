import { Link } from 'react-router-dom';
import { Workflow, ArrowUpRight } from 'lucide-react';
import { executions } from '@/mocks/data';
import { useDemo } from '@/mocks/demo-context';
import { Badge } from '@/components/ui/primitives';
import { DataTable } from '@/components/data-table';
export function ExecutionTable() {
  const { organization } = useDemo();
  return (
    <DataTable
      label="Despliegues recientes de demostración"
      rows={executions.filter((e) => e.organizationId === organization.id)}
      columns={[
        {
          key: 'project',
          title: 'Proyecto / versión',
          render: (r) => (
            <div className="table-project">
              <span className="table-icon">
                <Workflow size={17} />
              </span>
              <div>
                <strong>{r.project}</strong>
                <small>
                  {r.version} · <code>{r.sha}</code>
                </small>
              </div>
            </div>
          ),
        },
        {
          key: 'environment',
          title: 'Ambiente',
          render: (r) => <span className="environment">{r.environment}</span>,
        },
        { key: 'status', title: 'Estado', render: (r) => <Badge tone={r.tone}>{r.status}</Badge> },
        {
          key: 'duration',
          title: 'Duración',
          render: (r) => <span className="muted mono">{r.duration}</span>,
        },
        {
          key: 'detail',
          title: 'Referencia',
          render: (r) => (
            <Link className="table-link" to="/app/executions">
              {r.id}
              <ArrowUpRight size={14} />
            </Link>
          ),
        },
      ]}
    />
  );
}
