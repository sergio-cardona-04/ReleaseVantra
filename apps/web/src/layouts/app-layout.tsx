import { useState, useRef, useCallback, useSyncExternalStore } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { DropdownMenu } from 'radix-ui';
import { ChevronDown, Menu, X, FlaskConical, Settings2, LogOut } from 'lucide-react';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { Brand } from '@/components/brand';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/primitives';
import { organizations, roles, type Plan, type Role } from '@/mocks/data';
import { DemoContext } from '@/mocks/demo-context';
import { navigation } from '@/lib/navigation';

function subscribeMobile(callback: () => void) {
  const query = window.matchMedia('(max-width: 1023px)');
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

export function AppLayout() {
  const [organizationId, setOrganizationId] = useState('astera');
  const [role, setRole] = useState<Role>('ADMIN');
  const [plan, setPlan] = useState<Plan>('Business');
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpen(false), []);
  const mobile = useSyncExternalStore(
    subscribeMobile,
    () => window.matchMedia('(max-width: 1023px)').matches,
    () => false,
  );
  useFocusTrap(open && mobile, sidebarRef, close);
  const location = useLocation();
  const organization = organizations.find((o) => o.id === organizationId) ?? organizations[0]!;
  const active =
    navigation.find((n) => n.path !== '/app' && location.pathname.startsWith(n.path)) ??
    navigation[0]!;
  function changeOrganization(id: string) {
    const next = organizations.find((o) => o.id === id);
    if (next) {
      setOrganizationId(id);
      setPlan(next.plan);
    }
  }
  return (
    <DemoContext.Provider
      value={{ organization, setOrganizationId: changeOrganization, role, setRole, plan, setPlan }}
    >
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <div className="app-shell">
        {open && (
          <button
            className="sidebar-backdrop"
            aria-label="Cerrar navegación"
            onClick={() => setOpen(false)}
          />
        )}
        <aside
          ref={sidebarRef}
          inert={mobile && !open}
          aria-hidden={mobile && !open}
          className={`sidebar ${open ? 'sidebar-open' : ''}`}
        >
          <div className="sidebar-brand">
            <Brand />
            <Button
              className="mobile-toggle"
              variant="ghost"
              size="icon"
              aria-label="Cerrar menú empresarial"
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
          </div>
          <div className="organization-control">
            <span className="org-avatar">{organization.initials}</span>
            <div>
              <label htmlFor="organization">Organización de demostración</label>
              <Select
                id="organization"
                value={organizationId}
                onChange={(e) => changeOrganization(e.target.value)}
              >
                {organizations.map((o) => (
                  <option value={o.id} key={o.id}>
                    {o.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <nav aria-label="Navegación empresarial">
            {['Espacio de trabajo', 'Organización'].map((group) => (
              <div className="nav-group" key={group}>
                <p>{group}</p>
                {navigation
                  .filter((n) => n.group === group && n.roles.includes(role))
                  .map(({ path, title, icon: Icon }) => (
                    <NavLink
                      key={path}
                      to={path}
                      end={path === '/app'}
                      onClick={() => setOpen(false)}
                    >
                      <Icon size={17} aria-hidden="true" />
                      <span>{title}</span>
                      {path === '/app/approvals' && (
                        <span className="nav-count">{organizationId === 'astera' ? '2' : '1'}</span>
                      )}
                    </NavLink>
                  ))}
              </div>
            ))}
          </nav>
          <div className="sidebar-foot">
            <FlaskConical size={17} />
            <div>
              <strong>Entorno de demostración</strong>
              <span>Datos ficticios · Solo en memoria</span>
            </div>
          </div>
        </aside>
        <div className="app-body" inert={mobile && open}>
          <header className="app-topbar">
            <div className="topbar-context">
              <Button
                variant="ghost"
                size="icon"
                className="app-menu-toggle"
                aria-label="Abrir menú empresarial"
                aria-expanded={open}
                onClick={() => setOpen(!open)}
              >
                <Menu />
              </Button>
              <span className="muted">Espacio de trabajo</span>
              <span className="breadcrumb-separator">/</span>
              <strong>{active.title}</strong>
            </div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button className="user-menu">
                  <span className="user-avatar">DM</span>
                  <span>Usuario demo</span>
                  <ChevronDown size={14} />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content className="dropdown-content" align="end" sideOffset={8}>
                  <DropdownMenu.Label className="dropdown-label">
                    Vista conceptual · Sin sesión
                  </DropdownMenu.Label>
                  <DropdownMenu.Item asChild>
                    <Link to="/app/settings">
                      <Settings2 size={16} />
                      Configuración
                    </Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item asChild>
                    <Link to="/">
                      <LogOut size={16} />
                      Volver a la landing
                    </Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </header>
          <div className="demo-toolbar">
            <span>
              <FlaskConical size={15} />
              Demostración A2 · Sin acciones reales
            </span>
            <div>
              <label htmlFor="demo-role">Rol visual</label>
              <Select id="demo-role" value={role} onChange={(e) => setRole(e.target.value as Role)}>
                {roles.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </Select>
              <label htmlFor="demo-plan">Plan visual</label>
              <Select id="demo-plan" value={plan} onChange={(e) => setPlan(e.target.value as Plan)}>
                <option>Team</option>
                <option>Business</option>
                <option>Enterprise</option>
              </Select>
            </div>
          </div>
          <main id="main" className="app-main">
            <Outlet key={organization.id} />
          </main>
          <footer className="app-footer">
            <span>{organization.name} · Datos de ejemplo</span>
            <Link to="/docs">Documentación del prototipo</Link>
          </footer>
        </div>
      </div>
    </DemoContext.Provider>
  );
}
