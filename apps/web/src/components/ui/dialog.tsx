// Radix composition following shadcn/ui. MIT; see docs/third-party-notices.md.
import type { ReactNode } from 'react';
import { Dialog as Primitive } from 'radix-ui';
import { X } from 'lucide-react';
import { Button } from './button';

export function Dialog({
  trigger,
  title,
  description,
  children,
}: {
  trigger: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <Primitive.Root>
      <Primitive.Trigger asChild>{trigger}</Primitive.Trigger>
      <Primitive.Portal>
        <Primitive.Overlay className="dialog-overlay" />
        <Primitive.Content className="dialog-content">
          <Primitive.Title className="dialog-title">{title}</Primitive.Title>
          <Primitive.Description className="dialog-description">
            {description}
          </Primitive.Description>
          {children}
          <Primitive.Close asChild>
            <Button variant="secondary">Volver a la demostración</Button>
          </Primitive.Close>
          <Primitive.Close className="dialog-close" aria-label="Cerrar diálogo">
            <X size={20} />
          </Primitive.Close>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  );
}
