import { useState, useRef, useCallback } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { Brand } from '@/components/brand';
import { Button } from '@/components/ui/button';

export function PublicLayout() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useFocusTrap(open, ref, close);
  return (
    <>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <header className="public-header" ref={ref}>
        <div className="wrap header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label="Navegación pública">
            <NavLink to="/features">Funciones</NavLink>
            <NavLink to="/pricing">Planes</NavLink>
            <Link to="/#github">GitHub</Link>
            <Link to="/#security">Seguridad</Link>
          </nav>
          <div className="header-actions">
            <Link className="login-link" to="/login">
              Iniciar sesión
            </Link>
            <Button asChild size="sm">
              <Link to="/register">Comenzar gratis</Link>
            </Button>
            <Button
              className="mobile-toggle"
              variant="ghost"
              size="icon"
              aria-label={open ? 'Cerrar navegación' : 'Abrir navegación'}
              aria-expanded={open}
              aria-controls="public-menu"
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {open && (
          <nav
            id="public-menu"
            className="mobile-menu"
            aria-label="Navegación pública móvil"
            onClick={() => setOpen(false)}
          >
            <Link to="/features">Funciones</Link>
            <Link to="/pricing">Planes</Link>
            <Link to="/#github">GitHub</Link>
            <Link to="/#security">Seguridad</Link>
            <Link to="/login">Iniciar sesión</Link>
            <Link to="/app">Explorar demostración</Link>
          </nav>
        )}
      </header>
      <Outlet />
      <footer className="public-footer">
        <div className="wrap">
          <div className="footer-top">
            <Brand />
            <p>Gobernanza de versiones para equipos.</p>
            <nav aria-label="Enlaces del pie">
              <Link to="/features">Funciones</Link>
              <Link to="/pricing">Planes</Link>
              <Link to="/app">Explorar demostración</Link>
              <Link to="/docs">Documentación</Link>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>© 2026 ReleaseVantra</span>
            <span>Prototipo visual A2 · Sin operaciones empresariales reales</span>
          </div>
        </div>
      </footer>
    </>
  );
}
