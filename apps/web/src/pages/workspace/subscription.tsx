import { PageHeading } from '@/components/workspace/page-heading';
import { useDemo } from '@/mocks/demo-context';
import { DemoAction } from '@/components/demo-action';
import { plans, executions } from '@/mocks/data';
import { Card, Progress } from '@/components/ui/primitives';
export function SubscriptionPage() {
  const { organization, plan } = useDemo();
  const selected = plans.find((p) => p.name === plan)!;
  const count = executions.filter((e) => e.organizationId === organization.id).length;
  return (
    <>
      <PageHeading
        title="Suscripción"
        description="Límites y consumo ilustrativos. Sin pagos ni facturación."
      />
      <Card>
        <h2>Plan visual {plan}</h2>
        <p className="subscription-price">
          US${selected.price}
          <span>/mes simulado</span>
        </p>
        <p>{selected.feature}</p>
        <div className="usage-grid">
          <Progress
            label="Usuarios de ejemplo"
            value={
              plan === 'Enterprise'
                ? 0
                : Math.min(100, Math.round((organization.users / Number(selected.users)) * 100))
            }
          />
          <Progress
            label="Ejecuciones del conjunto de ejemplo"
            value={plan === 'Enterprise' ? 0 : Math.round((count / Number(selected.runs)) * 100)}
          />
        </div>
        <p className="muted">
          {organization.users} usuarios · {count} ejecuciones mostradas. Enterprise sigue sujeto a
          restricciones técnicas y de GitHub.
        </p>
      </Card>
      <div className="plan-comparison">
        {plans.map((p) => (
          <Card key={p.name}>
            <h2>{p.name}</h2>
            <p>US${p.price}/mes simulado</p>
            <p>
              {p.users} usuarios · {p.projects} proyectos · {p.repos} repositorios · {p.runs}{' '}
              ejecuciones/mes
            </p>
            <DemoAction label={`Revisar ${p.name}`} />
          </Card>
        ))}
      </div>
    </>
  );
}
