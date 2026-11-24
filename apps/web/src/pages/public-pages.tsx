import { Link } from 'react-router-dom';
import { features } from '@/mocks/features';
import { Pricing } from '@/components/pricing';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/primitives';

export function FeaturesPage() {
  return (
    <main id="main" className="public-page wrap">
      <p className="eyebrow">El producto</p>
      <h1>Contexto para cada versión.</h1>
      <p className="page-lead">
        Las capacidades previstas de ReleaseVantra, reunidas en una experiencia navegable.
      </p>
      <Alert>
        Fase A2: las pantallas utilizan datos de demostración. Las funciones de negocio todavía no
        están operativas.
      </Alert>
      <div className="feature-grid">
        {features.map(({ icon: Icon, name, text }) => (
          <article key={name}>
            <Icon />
            <h2>{name}</h2>
            <p>{text}</p>
          </article>
        ))}
      </div>
      <Button asChild>
        <Link to="/app">Explorar demostración</Link>
      </Button>
    </main>
  );
}
export function PricingPage() {
  return (
    <main id="main" className="public-page wrap">
      <p className="eyebrow">Planes simulados</p>
      <h1>Un espacio para tu equipo.</h1>
      <p className="page-lead">
        Compara los límites y elige un plan para recorrer el registro visual.
      </p>
      <Pricing />
    </main>
  );
}
export function DocsPage() {
  return (
    <main id="main" className="public-page wrap">
      <p className="eyebrow">Documentación</p>
      <h1>La base de ReleaseVantra.</h1>
      <p className="page-lead">
        A1 establece la arquitectura y A2 presenta el prototipo de navegación.
      </p>
      <div className="doc-grid">
        <article>
          <h2>Arquitectura</h2>
          <p>
            Monorepositorio con React, Vite y TypeScript; API Express y contratos compartidos. Salud
            HTTP disponible en /api/health.
          </p>
          <code>docs/fase_a1/architecture.md</code>
        </article>
        <article>
          <h2>Diseño y navegación</h2>
          <p>
            Identidad oscura, rutas públicas y empresariales, formularios conceptuales y datos
            tipados en memoria.
          </p>
          <code>docs/fase_a2/implementation.md</code>
        </article>
        <article>
          <h2>Desarrollo local</h2>
          <p>
            Instala dependencias con npm ci e inicia el proyecto con npm run dev. Consulta las
            verificaciones en el repositorio.
          </p>
          <code>docs/development.md</code>
        </article>
      </div>
      <Button asChild variant="secondary">
        <a
          href="https://github.com/sergio-cardona-04/ReleaseVantra/tree/main/docs"
          target="_blank"
          rel="noreferrer"
        >
          Abrir documentación en GitHub
        </a>
      </Button>
      <p className="muted">
        Los documentos de A2 estarán disponibles en GitHub cuando el propietario publique la rama.
      </p>
    </main>
  );
}
export function NotFoundPage({ embedded = false }: { embedded?: boolean }) {
  const Container = embedded ? 'section' : 'main';
  return (
    <Container id={embedded ? undefined : 'main'} className="not-found wrap">
      <p className="eyebrow">404</p>
      <h1>Esta ruta no existe.</h1>
      <p>Regresa al inicio o continúa explorando el prototipo.</p>
      <div className="button-row">
        <Button asChild>
          <Link to="/">Volver al inicio</Link>
        </Button>
        <Button asChild variant="secondary">
          <Link to="/app">Explorar demostración</Link>
        </Button>
      </div>
    </Container>
  );
}
