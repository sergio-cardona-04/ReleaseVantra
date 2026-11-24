import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { plans } from '@/mocks/data';
import { Button } from '@/components/ui/button';

export function Pricing() {
  return (
    <>
      <div className="pricing-grid">
        {plans.map((plan) => (
          <article
            className={`price-card ${plan.name === 'Business' ? 'price-featured' : ''}`}
            key={plan.name}
          >
            <div className="price-heading">
              <h3>{plan.name}</h3>
              {plan.name === 'Business' && (
                <span className="small-label">Para equipos en crecimiento</span>
              )}
            </div>
            <p className="price">
              US${plan.price}
              <span>/mes</span>
            </p>
            <p className="muted">Precio simulado · Sin cobros</p>
            <Button asChild variant={plan.name === 'Business' ? 'default' : 'secondary'}>
              <Link to={`/register?plan=${plan.name}`}>Elegir {plan.name}</Link>
            </Button>
            <ul>
              {[
                [plan.users, 'usuarios'],
                [plan.projects, 'proyectos'],
                [plan.repos, 'repositorios'],
                [plan.runs, 'ejecuciones/mes'],
              ].map(([amount, label]) => (
                <li key={label}>
                  <Check size={15} aria-hidden="true" />
                  <span>
                    {amount === 'Sin cuota comercial'
                      ? `${label}: ${amount}`
                      : `${amount} ${label}`}
                  </span>
                </li>
              ))}
              <li>
                <Sparkles size={15} aria-hidden="true" />
                {plan.feature}
              </li>
            </ul>
          </article>
        ))}
      </div>
      <p className="pricing-note">
        Los límites corresponden a ejecuciones iniciadas por ReleaseVantra. Enterprise sigue sujeto
        a restricciones técnicas y de GitHub. Todos los planes son conceptuales.
      </p>
    </>
  );
}
