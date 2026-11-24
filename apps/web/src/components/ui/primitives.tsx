import type { ComponentProps, ReactNode } from 'react';
import { AlertCircle, CheckCircle2, Clock3, LoaderCircle, MinusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn('input', className)} {...props} />;
}
export function Select({ className, ...props }: ComponentProps<'select'>) {
  return <select className={cn('input select', className)} {...props} />;
}
export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea className={cn('input textarea', className)} {...props} />;
}
export function Card({ className, ...props }: ComponentProps<'section'>) {
  return <section className={cn('card', className)} {...props} />;
}
export function Badge({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'success' | 'warning' | 'danger' | 'info';
}) {
  const Icon = {
    neutral: MinusCircle,
    success: CheckCircle2,
    warning: Clock3,
    danger: AlertCircle,
    info: LoaderCircle,
  }[tone];
  return (
    <span className={`badge badge-${tone}`}>
      <Icon size={13} aria-hidden="true" />
      {children}
    </span>
  );
}
export function Alert({ children, danger = false }: { children: ReactNode; danger?: boolean }) {
  return (
    <div className={cn('alert', danger && 'alert-danger')} role={danger ? 'alert' : 'note'}>
      <AlertCircle size={17} aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
export function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="empty-state">
      <MinusCircle size={28} aria-hidden="true" />
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}
export function Skeleton() {
  return <div className="skeleton" aria-label="Cargando contenido" role="status" />;
}
export function Progress({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="progress-label">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div
        className="progress"
        role="progressbar"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
