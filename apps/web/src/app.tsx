import { lazy, Suspense, useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { PublicLayout } from '@/layouts/public-layout';
import { AppLayout } from '@/layouts/app-layout';
import { Landing } from '@/pages/landing';
import { AuthPage } from '@/pages/auth';
import { DocsPage, FeaturesPage, NotFoundPage, PricingPage } from '@/pages/public-pages';
import { Skeleton } from '@/components/ui/primitives';
import { navigation } from '@/lib/navigation';

const WorkspacePage = lazy(() =>
  import('@/pages/workspace').then((m) => ({ default: m.WorkspacePage })),
);

function RouteEffects() {
  const { pathname, hash } = useLocation();
  const previous = useRef(pathname);
  useEffect(() => {
    const page = navigation.find((n) => n.path === pathname);
    const titles: Record<string, string> = {
      '/': 'Gobernanza de versiones',
      '/features': 'Funciones',
      '/pricing': 'Planes',
      '/login': 'Iniciar sesión',
      '/register': 'Crear cuenta',
      '/register/organization': 'Registrar organización',
      '/forgot-password': 'Recuperar acceso',
      '/docs': 'Documentación',
    };
    document.title = `ReleaseVantra | ${page?.title ?? titles[pathname] ?? 'Prototipo A2'}`;
    if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    else {
      window.scrollTo(0, 0);
      if (previous.current !== pathname) {
        const main = document.getElementById('main');
        if (main) {
          main.tabIndex = -1;
          main.focus({ preventScroll: true });
        }
      }
    }
    previous.current = pathname;
  }, [pathname, hash]);
  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <RouteEffects />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Landing />} />
          <Route path="features" element={<FeaturesPage />} />
          <Route path="pricing" element={<PricingPage />} />
          <Route path="login" element={<AuthPage key="login" mode="login" />} />
          <Route path="register" element={<AuthPage key="register" mode="register" />} />
          <Route
            path="register/organization"
            element={<AuthPage key="organization" mode="organization" />}
          />
          <Route path="forgot-password" element={<AuthPage key="forgot" mode="forgot" />} />
          <Route path="invite/:token" element={<AuthPage key="invite" mode="invite" />} />
          <Route path="docs" element={<DocsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="app" element={<AppLayout />}>
          {[
            '',
            'projects',
            'projects/:id',
            'versions',
            'requests',
            'requests/new',
            'requests/:id',
            'approvals',
            'executions',
            'incidents',
            'audit',
            'integrations/github',
            'members',
            'subscription',
            'policies',
            'intelligence',
            'settings',
          ].map((path) => (
            <Route
              key={path}
              path={path}
              element={
                <Suspense fallback={<Skeleton />}>
                  <WorkspacePage />
                </Suspense>
              }
            />
          ))}
          <Route path="*" element={<NotFoundPage embedded />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
