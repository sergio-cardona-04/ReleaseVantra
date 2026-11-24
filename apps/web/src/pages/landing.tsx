import { Link } from 'react-router-dom';
import {
  GitBranch,
  ShieldCheck,
  FileClock,
  Workflow,
  Layers3,
  Check,
  LockKeyhole,
  CircleDot,
  GitCommitHorizontal,
} from 'lucide-react';
import { HeroEffects } from '@/components/react-bits/hero-effects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/primitives';
import { features } from '@/mocks/features';
import { Pricing } from '@/components/pricing';

function ReleasePreview() {
  return (
    <div
      className="release-preview"
      role="img"
      aria-label="Vista ilustrativa de Atlas API v2.4.0: solicitud en revisión, una de dos aprobaciones para Production y ejecución pendiente."
    >
      <div className="preview-toolbar">
        <span>
          <span className="window-dot" /> ReleaseVantra / Solicitudes
        </span>
        <span>Demostración</span>
      </div>
      <div className="preview-body">
        <div className="preview-project">
          <span className="project-symbol">
            <Layers3 size={24} />
          </span>
          <div>
            <span className="muted">Astera Digital / Atlas API</span>
            <strong className="preview-title">Release v2.4.0</strong>
          </div>
          <Badge tone="warning">En revisión</Badge>
        </div>
        <div className="preview-ref">
          <span>
            <GitBranch size={15} />
            main
          </span>
          <span>
            <GitCommitHorizontal size={16} />
            <code>c8e4a21</code>
          </span>
          <span>Production</span>
        </div>
        <div className="preview-path">
          <div>
            <span className="path-point done">
              <Check size={16} />
            </span>
            <strong>Solicitud</strong>
            <small>Versión definida</small>
          </div>
          <div>
            <span className="path-point current">
              <CircleDot size={16} />
            </span>
            <strong>Aprobación</strong>
            <small>1 de 2 revisiones</small>
          </div>
          <div>
            <span className="path-point">
              <Workflow size={16} />
            </span>
            <strong>Ejecución</strong>
            <small>Esperando aprobación</small>
          </div>
        </div>
        <div className="preview-foot">
          <ShieldCheck size={16} />
          <span>Production requiere dos aprobaciones.</span>
          <LockKeyhole size={14} />
        </div>
      </div>
    </div>
  );
}

export function Landing() {
  return (
    <main id="main">
      <section className="hero" data-enter>
        <div className="wrap hero-inner">
          <p className="hero-eyebrow">
            <span className="eyebrow-line" />
            GOBERNANZA DE VERSIONES PARA EQUIPOS
          </p>
          <HeroEffects />
          <p className="hero-description">
            Versiones, aprobaciones y GitHub Actions.
            <br />
            Un lugar para decidir qué llega a producción.
          </p>
          <div className="button-row">
            <Button asChild>
              <Link to="/register">Comenzar gratis</Link>
            </Button>
            <Button asChild variant="secondary">
              <a href="#features">Explorar funciones</a>
            </Button>
          </div>
          <p className="hero-note">Prototipo visual · 5 roles · 3 planes simulados</p>
          <div className="hero-bottom">
            <span>DEL COMMIT A LA DECISIÓN.</span>
            <a href="#features">
              Conoce el producto <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
      </section>
      <section id="features" className="landing-section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Visibilidad sobre cada cambio</p>
              <h2>
                Tu próxima versión.
                <br />
                <span className="muted">Con el contexto completo.</span>
              </h2>
            </div>
            <p>
              Explora la experiencia prevista. Las funciones empresariales se conectarán en fases
              posteriores.
            </p>
          </div>
          <ReleasePreview />
          <div className="feature-grid">
            {features.map(({ icon: Icon, name, text }) => (
              <article key={name}>
                <Icon size={23} aria-hidden="true" />
                <h3>{name}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="process" className="landing-section process-section">
        <div className="wrap">
          <p className="eyebrow">Un proceso, de principio a fin</p>
          <h2>Cada despliegue tiene una historia.</h2>
          <p className="section-intro">
            La experiencia prevista une el cambio, la decisión y su resultado.
          </p>
          <ol className="process-flow">
            {['Conectar', 'Solicitar', 'Aprobar', 'Ejecutar', 'Auditar'].map((label, i) => (
              <li key={label}>
                <span className="process-number">0{i + 1}</span>
                <h3>{label}</h3>
                <p>
                  {
                    [
                      'Autoriza los repositorios de tu organización.',
                      'Define versión, commit, ambiente y workflow.',
                      'Revisa el cambio según las políticas del equipo.',
                      'Sigue la ejecución y conserva su referencia.',
                      'Consulta la evidencia de cada decisión.',
                    ][i]
                  }
                </p>
              </li>
            ))}
          </ol>
          <div className="process-policy">
            <GitCommitHorizontal size={22} />
            <span>Un commit definido. Una decisión trazable.</span>
            <code>c8e4a21 → v2.4.0 → Production</code>
          </div>
        </div>
      </section>
      <section id="github" className="landing-section integration-section">
        <div className="wrap section-split">
          <div>
            <p className="eyebrow">Tu código sigue en GitHub</p>
            <h2>
              GitHub Actions.
              <br />
              <span className="muted">Con una decisión antes.</span>
            </h2>
            <p>
              La futura GitHub App permitirá autorizar repositorios y workflows. ReleaseVantra
              reunirá solicitudes, aprobaciones y seguimiento.
            </p>
            <p className="muted">
              En A2 puedes recorrer los estados de conexión con datos de demostración.
            </p>
            <Button asChild variant="secondary">
              <Link to="/app/integrations/github">Ver integración de ejemplo</Link>
            </Button>
          </div>
          <div
            className="integration-diagram"
            role="img"
            aria-label="Integración prevista: GitHub App conecta repositorios autorizados con las solicitudes, aprobaciones y ejecuciones de ReleaseVantra."
          >
            <div className="diagram-node">
              <GitBranch size={28} />
              <strong>GitHub</strong>
              <span>Repositorios autorizados</span>
            </div>
            <div className="diagram-connector">
              <span />
              <LockKeyhole size={19} />
              <span />
            </div>
            <div className="diagram-node">
              <Workflow size={28} />
              <strong>ReleaseVantra</strong>
              <span>Solicitud · Aprobación · Ejecución</span>
            </div>
            <div className="diagram-caption">GitHub App · Integración prevista</div>
          </div>
        </div>
      </section>
      <section id="security" className="landing-section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Responsabilidades claras</p>
              <h2>
                La seguridad forma
                <br />
                parte del plan.
              </h2>
            </div>
            <p>
              Estos controles están previstos para fases posteriores. La navegación de esta
              demostración no aplica autorización real.
            </p>
          </div>
          <div className="security-grid">
            {[
              {
                icon: ShieldCheck,
                title: 'Cinco roles definidos',
                text: 'Administración, desarrollo, aprobación, operación y auditoría con recorridos propios.',
              },
              {
                icon: LockKeyhole,
                title: 'Contexto por organización',
                text: 'Separación empresarial diseñada desde la estructura del producto.',
              },
              {
                icon: FileClock,
                title: 'Evidencia de las decisiones',
                text: 'Identidad, versión y acciones reunidas para reconstruir cada despliegue.',
              },
            ].map(({ icon: Icon, title, text }) => (
              <article key={title}>
                <Icon size={32} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="role-strip">
            {['ADMIN', 'DEVELOPER', 'APPROVER', 'OPERATOR', 'AUDITOR'].map((role) => (
              <span key={role}>{role}</span>
            ))}
          </div>
        </div>
      </section>
      <section id="pricing" className="landing-section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Un plan para cada equipo</p>
              <h2>
                Empieza con Team.
                <br />
                <span className="muted">Explora lo que sigue.</span>
              </h2>
            </div>
            <p>
              Compara límites y capacidades previstas. Los precios son simulados y no se realizan
              pagos.
            </p>
          </div>
          <Pricing />
        </div>
      </section>
      <section className="landing-section closing-section">
        <div className="wrap">
          <p className="eyebrow">El siguiente paso de tu equipo</p>
          <h2>
            El control de tus versiones
            <br />
            empieza aquí.
          </h2>
          <p>Recorre el registro de una organización o entra a conocer la demostración.</p>
          <div className="button-row">
            <Button asChild>
              <Link to="/register">Comenzar gratis</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/app">Explorar demostración</Link>
            </Button>
          </div>
          <div className="closing-word" aria-hidden="true">
            ReleaseVantra.
          </div>
        </div>
      </section>
    </main>
  );
}
