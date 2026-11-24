import { PageHeading } from '@/components/workspace/page-heading';
import { useDemo } from '@/mocks/demo-context';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { projects } from '@/mocks/data';
import { ShieldCheck } from 'lucide-react';
import { Card, Badge, Progress, Alert } from '@/components/ui/primitives';
export function IntelligencePage() {
  const { plan, organization } = useDemo();
  const project = projects.find((p) => p.organizationId === organization.id);
  return (
    <>
      <PageHeading
        title="Release Intelligence"
        description="Evaluación explicable del riesgo prevista para Enterprise."
      />
      {plan !== 'Enterprise' ? (
        <Card className="locked-panel">
          <ShieldCheck size={32} />
          <h2>Disponible en Enterprise</h2>
          <p>
            Selecciona Enterprise en «Plan visual» para inspeccionar el ejemplo. Esto no cambia una
            suscripción real.
          </p>
          <Button asChild variant="secondary">
            <Link to="/app/subscription">Comparar suscripción</Link>
          </Button>
        </Card>
      ) : (
        <>
          <Alert>
            Ejemplo ilustrativo. El puntaje es fijo y no se ha calculado con un algoritmo ni con
            datos de GitHub.
          </Alert>
          <div className="detail-grid">
            <Card>
              <h2>Riesgo ilustrativo</h2>
              <p className="risk-score">
                42<span>/ 100</span>
              </p>
              <Badge tone="warning">Riesgo moderado · Ejemplo</Badge>
              <p>
                {project?.name} · {project?.version} · Production
              </p>
              <Progress label="Puntaje de ejemplo" value={42} />
            </Card>
            <Card>
              <h2>Factores de evaluación previstos</h2>
              <dl className="detail-list">
                {[
                  ['Ambiente Production', '+20'],
                  ['Cambios sensibles', '+15'],
                  ['Antecedente de fallo', '+12'],
                  ['Revisión completada', '−5'],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>
          <Card>
            <h2>Recomendación de ejemplo</h2>
            <p>
              Revisar los cambios sensibles y reunir las {organization.approvals} aprobaciones antes
              de solicitar ejecución.
            </p>
            <p className="muted">
              El motor futuro usará reglas ponderadas y explicables; no un modelo de IA entrenado.
            </p>
            <div className="state-gallery">
              <Badge tone="warning">Advertencia: revisión adicional</Badge>
              <Badge tone="danger">Bloqueo: aprobaciones incompletas</Badge>
            </div>
          </Card>
        </>
      )}
    </>
  );
}
