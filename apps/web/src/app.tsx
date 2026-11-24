import { useEffect, useState } from 'react';
import { fetchHealth } from '@/lib/health';

type Connection = 'checking' | 'connected' | 'unavailable';

const connectionLabels: Record<Connection, string> = {
  checking: 'Comprobando conexión con la API…',
  connected: 'API conectada',
  unavailable: 'No se pudo conectar con la API',
};

export function App() {
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

  function retry() {
    setConnection('checking');
    setAttempt((current) => current + 1);
  }

  return (
    <main className="flex min-h-svh items-center justify-center bg-slate-100 px-5 py-12 text-slate-900">
      <section
        aria-labelledby="title"
        className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-12"
      >
        <p className="mb-7 text-lg font-semibold tracking-tight">ReleaseVantra</p>
        <p className="mb-3 text-sm font-medium text-blue-700">
          Fase A1 · Inicialización y arquitectura
        </p>
        <h1 id="title" className="text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
          Entorno de desarrollo preparado.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-600">
          La base de ReleaseVantra ya está en marcha. Este es el punto de partida para desarrollar
          la gestión y gobernanza de versiones de tus equipos.
        </p>

        <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p role="status" aria-live="polite" className="flex items-center gap-3 font-medium">
            <span
              aria-hidden="true"
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${connection === 'connected' ? 'bg-emerald-600' : connection === 'unavailable' ? 'bg-red-600' : 'bg-slate-400'}`}
            />
            {connectionLabels[connection]}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {connection === 'connected'
              ? 'El frontend y el backend se comunican correctamente en tu entorno local.'
              : connection === 'unavailable'
                ? 'Comprueba que el backend esté en ejecución y vuelve a intentarlo.'
                : 'Verificando la respuesta del servicio de salud.'}
          </p>
          {connection === 'unavailable' && (
            <button
              type="button"
              onClick={retry}
              className="mt-4 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-700"
            >
              Reintentar conexión
            </button>
          )}
        </div>

        <p className="mt-7 text-sm leading-relaxed text-slate-500">
          Base técnica inicial. Las funciones empresariales y el diseño definitivo se incorporarán
          en las siguientes fases.
        </p>
      </section>
    </main>
  );
}
