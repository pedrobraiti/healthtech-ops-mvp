import { useMemo, useState, type ReactNode } from "react";
import { Card } from "./primitives";
import { Input } from "./primitives";
import { IconSearch } from "./icons";
import { useFakeLoading } from "../../lib/hooks";
import { cx } from "../../lib/format";

export interface Column<T> {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  width?: string;
  render: (row: T) => ReactNode;
}

export function CadastroList<T>({
  title,
  columns,
  rows,
  searchKeys,
  onRowClick,
  placeholder = "Buscar…",
}: {
  title: string;
  columns: Column<T>[];
  rows: T[];
  searchKeys: (keyof T)[];
  onRowClick?: (row: T) => void;
  placeholder?: string;
}) {
  const loading = useFakeLoading();
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q) return rows;
    const term = q.toLowerCase();
    return rows.filter((r) => searchKeys.some((k) => String((r as Record<string, unknown>)[k as string] ?? "").toLowerCase().includes(term)));
  }, [q, rows, searchKeys]);

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-soft px-4 py-3">
        <h3 className="flex items-center gap-2 text-[15px] font-semibold text-ink">
          {title}
          <span className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-medium text-muted">{rows.length}</span>
        </h3>
        <div className="w-full max-w-xs">
          <Input icon={<IconSearch width={15} height={15} />} value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-muted">
              {columns.map((c) => (
                <th key={c.key} className={cx("px-4 py-2.5 font-semibold", c.align === "right" && "text-right", c.align === "center" && "text-center")} style={c.width ? { width: c.width } : undefined}>
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3">
                      <div className="skeleton h-3.5" style={{ width: `${45 + ((i * 13 + c.key.length * 7) % 45)}%` }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center text-muted">
                  Nenhum registro encontrado para “{q}”.
                </td>
              </tr>
            ) : (
              filtered.map((row, i) => (
                <tr
                  key={i}
                  onClick={() => onRowClick?.(row)}
                  className={cx("transition-colors", onRowClick && "cursor-pointer", "hover:bg-slate-50/60")}
                >
                  {columns.map((c) => (
                    <td key={c.key} className={cx("px-4 py-3", c.align === "right" && "text-right", c.align === "center" && "text-center")}>
                      {c.render(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
