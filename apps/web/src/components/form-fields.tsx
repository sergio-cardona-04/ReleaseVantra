import { useId, useState, type ComponentProps } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/primitives';
import { Button } from '@/components/ui/button';

export function Field({
  label,
  error,
  hint,
  ...props
}: ComponentProps<'input'> & { label: string; error?: string | undefined; hint?: string }) {
  const generated = useId();
  const id = props.id ?? generated;
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <Input
        {...props}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error || hint ? `${id}-help` : undefined}
      />
      {(error || hint) && (
        <p className={error ? 'field-error' : 'field-hint'} id={`${id}-help`}>
          {error || hint}
        </p>
      )}
    </div>
  );
}
export function PasswordField({
  label = 'Contraseña',
  ...props
}: Omit<ComponentProps<typeof Field>, 'type' | 'label'> & { label?: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="password-field">
      <Field label={label} {...props} type={show ? 'text' : 'password'} />
      <Button
        type="button"
        className="password-toggle"
        variant="ghost"
        size="icon"
        aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        aria-pressed={show}
        onClick={() => setShow(!show)}
      >
        {show ? <EyeOff size={17} /> : <Eye size={17} />}
      </Button>
    </div>
  );
}
