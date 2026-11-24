import type { ReactNode } from 'react';
export interface Column<T> {
  key: string;
  title: string;
  render: (row: T) => ReactNode;
}
export function DataTable<T extends { id: string }>({
  label,
  columns,
  rows,
}: {
  label: string;
  columns: Column<T>[];
  rows: T[];
}) {
  return (
    <div className="table-scroll" role="region" aria-label={label} tabIndex={0}>
      <table>
        <caption className="sr-only">{label}</caption>
        <thead>
          <tr>
            {columns.map((c) => (
              <th scope="col" key={c.key}>
                {c.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((c) => (
                <td key={c.key}>{c.render(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && <p className="table-empty">No hay resultados para estos filtros.</p>}
    </div>
  );
}
