import { cx } from "../../lib/format";
import type { ReactNode } from "react";

export function Tabs({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: { key: string; label: ReactNode }[];
  active: string;
  onChange: (key: string) => void;
  className?: string;
}) {
  return (
    <div className={cx("flex items-center gap-1 overflow-x-auto border-b border-border-soft", className)}>
      {tabs.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={cx(
            "relative whitespace-nowrap px-3 py-2.5 text-sm font-medium transition-colors",
            active === t.key ? "text-brand" : "text-muted hover:text-ink"
          )}
        >
          {t.label}
          {active === t.key && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand" />}
        </button>
      ))}
    </div>
  );
}
