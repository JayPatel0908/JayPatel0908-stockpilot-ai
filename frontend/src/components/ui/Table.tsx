import type { ReactNode, ThHTMLAttributes, TdHTMLAttributes, HTMLAttributes } from 'react';
import { twMerge } from '@/lib/cx';

export interface Column<T> {
  key: string;
  header: string;
  className?: string;
  render?: (row: T) => ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
}

export function Table<T>({ columns, data, rowKey, onRowClick, emptyMessage = 'No records found' }: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-ink-200">
            {columns.map((col) => (
              <th
                key={col.key}
                className={twMerge(
                  'px-5 py-3 text-left text-xs font-600 uppercase tracking-wide text-ink-400 whitespace-nowrap',
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-5 py-12 text-center text-ink-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={rowKey(row)}
                onClick={() => onRowClick?.(row)}
                className={twMerge(
                  'border-b border-ink-100 transition-colors',
                  onRowClick && 'cursor-pointer',
                  'hover:bg-ink-50/70'
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className={twMerge('px-5 py-3.5 text-ink-700 align-middle', col.className)}>
                    {col.render ? col.render(row) : (row as Record<string, ReactNode>)[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export function Th({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={twMerge('px-5 py-3 text-left text-xs font-600 uppercase tracking-wide text-ink-400', className)} {...props} />;
}

export function Td({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={twMerge('px-5 py-3.5 text-ink-700 align-middle', className)} {...props} />;
}

export function Tr({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={twMerge('border-b border-ink-100 transition-colors hover:bg-ink-50/70', className)} {...props} />;
}
