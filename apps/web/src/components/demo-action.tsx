import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
export function DemoAction({
  label,
  title,
  description,
  disabled = false,
}: {
  label: string;
  title?: string;
  description?: string;
  disabled?: boolean;
}) {
  return (
    <Dialog
      trigger={
        <Button variant="secondary" disabled={disabled}>
          {label}
        </Button>
      }
      title={title ?? `${label} · Vista conceptual`}
      description={
        description ??
        'Esta acción pertenece al prototipo A2. No se envió ninguna solicitud, no se guardaron datos y no se ejecutó ningún workflow.'
      }
    />
  );
}
