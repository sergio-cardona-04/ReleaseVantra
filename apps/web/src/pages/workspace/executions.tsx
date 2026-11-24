import { useState } from 'react';
import { Workflow } from 'lucide-react';
import { PageHeading } from '@/components/workspace/page-heading';
import { useDemo } from '@/mocks/demo-context';
import { executionStates, projects, requests } from '@/mocks/data';
import { Card, Badge, Select } from '@/components/ui/primitives';
import { ExecutionTable } from '@/components/workspace/execution-table';
export function ExecutionsPage() {
  const { organization } = useDemo();
  const project = projects.find((p) => p.organizationId === organization.id);
  const request = requests.find((r) => r.organizationId === organization.id);
  const [state, setState] = useState('Ejecutándose');
  const selected = executionStates.find((s) => s.label === state)!;
  return (
    <>
      <PageHeading
        title="Ejecuciones"
        description="Seguimiento visual de workflows y resultados de despliegue."
      />
      <ExecutionTable />
      <Card className="state-panel">
        <h2>Explorar estados de una ejecución</h2>
        <p className="muted">Selecciona un estado ilustrativo. No inicia ni modifica workflows.</p>
        <label htmlFor="execution-state">Estado de demostración</label>
        <Select id="execution-state" value={state} onChange={(e) => setState(e.target.value)}>
          {executionStates.map((s) => (
            <option key={s.label}>{s.label}</option>
          ))}
        </Select>
        <div className="execution-state">
          <Workflow size={26} />
          <div>
            <Badge tone={selected.tone}>{state}</Badge>
            <p>
              {state === 'Resultado desconocido'
                ? 'El resultado requiere conciliación. No debe reintentarse ciegamente.'
                : state === 'Fallida'
                  ? 'Consulta el resultado antes de preparar un nuevo intento.'
                  : state === 'Completada'
                    ? 'Ejemplo de resultado exitoso; no corresponde a una ejecución real.'
                    : 'Estado conceptual de seguimiento del workflow.'}
            </p>
          </div>
        </div>
        <pre className="log-view">{`# Registro ilustrativo · deploy.yml\n[${state}] ${project?.name} / ${project?.version}\ncommit: ${request?.sha}\nNo se ha solicitado una ejecución real a GitHub.`}</pre>
      </Card>
    </>
  );
}
