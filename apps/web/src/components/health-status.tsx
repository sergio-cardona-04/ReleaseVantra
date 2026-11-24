import { useEffect, useState } from 'react';
import { fetchHealth } from '@/lib/health';
import { Button } from '@/components/ui/button';

type Connection = 'checking' | 'connected' | 'unavailable';
const labels: Record<Connection, string> = {
  checking: 'Comprobando conexión con la API…',
  connected: 'API conectada',
  unavailable: 'No se pudo conectar con la API',
};
export function HealthStatus() {
  const [connection, setConnection] = useState<Connection>('checking');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    void fetchHealth(controller.signal).then(
      () => {
        if (!controller.signal.aborted) setConnection('connected');
      },
      () => {
        if (!controller.signal.aborted) setConnection('unavailable');
      },
    );
    return () => controller.abort();
  }, [attempt]);
  return (
    <div className="health-status">
      <p role="status" aria-live="polite">
        <span className={`connection-dot ${connection}`} aria-hidden="true" />
        {labels[connection]}
      </p>
      {connection === 'unavailable' && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setConnection('checking');
            setAttempt((a) => a + 1);
          }}
        >
          Reintentar conexión
        </Button>
      )}
      <small>Disponibilidad del proceso HTTP; no verifica integraciones.</small>
    </div>
  );
}
