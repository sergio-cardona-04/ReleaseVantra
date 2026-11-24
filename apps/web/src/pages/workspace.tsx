import { Link, useLocation } from 'react-router-dom';
import { useDemo } from '@/mocks/demo-context';
import { navigation } from '@/lib/navigation';
import { PageHeading } from '@/components/workspace/page-heading';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/primitives';
import { Dashboard } from './workspace/dashboard';
import { ProjectsPage, ProjectDetail } from './workspace/projects';
import { RequestsPage, RequestDetail, NewRequest } from './workspace/requests';
import { ExecutionsPage } from './workspace/executions';
import { GitHubPage } from './workspace/github';
import { IntelligencePage } from './workspace/intelligence';
import { MembersPage } from './workspace/members';
import { SubscriptionPage } from './workspace/subscription';
import { StructuralPage } from './workspace/structural';
export function WorkspacePage() {
  const location = useLocation();
  const { role } = useDemo();
  const item = navigation.find((n) => n.path !== '/app' && location.pathname.startsWith(n.path));
  if (item && !item.roles.includes(role))
    return (
      <>
        <PageHeading title={item.title} description="Vista por rol de demostración." />
        <Alert>
          Este módulo no forma parte del recorrido visual de {role}. Selecciona un rol apropiado en
          la barra de demostración. Esto es presentación UX, no autorización real.
        </Alert>
        <Button asChild variant="secondary">
          <Link to="/app">Volver al dashboard</Link>
        </Button>
      </>
    );
  const path = location.pathname;
  if (path === '/app' || path === '/app/') return <Dashboard />;
  if (path === '/app/projects') return <ProjectsPage />;
  if (path.startsWith('/app/projects/')) return <ProjectDetail />;
  if (path === '/app/requests/new') return <NewRequest />;
  if (path === '/app/requests') return <RequestsPage />;
  if (path.startsWith('/app/requests/')) return <RequestDetail />;
  if (path === '/app/approvals') return <RequestsPage approvals />;
  if (path === '/app/executions') return <ExecutionsPage />;
  if (path === '/app/integrations/github') return <GitHubPage />;
  if (path === '/app/intelligence') return <IntelligencePage />;
  if (path === '/app/members') return <MembersPage />;
  if (path === '/app/subscription') return <SubscriptionPage />;
  return <StructuralPage module={path.split('/')[2] ?? 'settings'} />;
}
