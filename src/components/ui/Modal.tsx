import type { ReactNode } from "react";
import { cx } from "../../lib/format";

export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = "max-w-lg",
}: {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-6 backdrop-blur-[1px]" onClick={onClose}>
      <div className={cx("pop-shadow mt-[6vh] w-full rounded-xl border border-border-soft bg-white", width)} onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between border-b border-border-soft px-5 py-4">
          <div>
            <h2 className="text-[17px] font-semibold text-ink">{title}</h2>
            {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-muted hover:bg-slate-100 hover:text-ink" aria-label="Fechar">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 border-t border-border-soft bg-slate-50/60 px-5 py-3">{footer}</div>}
      </div>
    </div>
  );
}
