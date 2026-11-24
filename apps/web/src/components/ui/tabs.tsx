import { Tabs as Primitive } from 'radix-ui';
import type { ReactNode } from 'react';

export function Tabs({
  value,
  onValueChange,
  items,
  label,
  children,
}: {
  value: string;
  onValueChange: (value: string) => void;
  items: { value: string; label: string }[];
  label: string;
  children: ReactNode;
}) {
  return (
    <Primitive.Root value={value} onValueChange={onValueChange}>
      <Primitive.List className="tabs-list" aria-label={label}>
        {items.map((item) => (
          <Primitive.Trigger key={item.value} className="tab-trigger" value={item.value}>
            {item.label}
          </Primitive.Trigger>
        ))}
      </Primitive.List>
      <Primitive.Content value={value}>{children}</Primitive.Content>
    </Primitive.Root>
  );
}
