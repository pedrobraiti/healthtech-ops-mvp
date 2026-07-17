import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cx } from "../../lib/format";
import type { Status } from "../../data/mock";

/* ---------- Button ---------- */
type Variant = "primary" | "secondary" | "danger" | "link" | "ghost";
export function Button({
  variant = "secondary",
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/40";
  const styles: Record<Variant, string> = {
    primary: "bg-brand text-white hover:bg-brand-600 px-4 h-9 card-shadow",
    secondary: "bg-white text-ink border border-border-soft hover:bg-slate-50 px-4 h-9",
    danger: "bg-danger text-white hover:bg-red-700 px-4 h-9 card-shadow",
    link: "text-info hover:underline px-1 h-auto",
    ghost: "text-muted hover:bg-slate-100 hover:text-ink px-3 h-9",
  };
  return (
    <button className={cx(base, styles[variant], className)} {...rest}>
      {children}
    </button>
  );
}

/* ---------- Field label ---------- */
export function Label({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <label className="label mb-1.5 block">
      {children}
      {required && <span className="ml-0.5 text-danger">*</span>}
    </label>
  );
}

/* ---------- Input ---------- */
export function Input({ className, icon, ...rest }: InputHTMLAttributes<HTMLInputElement> & { icon?: ReactNode }) {
  if (icon) {
    return (
      <div className={cx("relative", className)}>
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted">{icon}</span>
        <input
          className="h-9 w-full rounded-lg border border-border-soft bg-white pl-9 pr-3 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          {...rest}
        />
      </div>
    );
  }
  return (
    <input
      className={cx(
        "h-9 w-full rounded-lg border border-border-soft bg-white px-3 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20",
        className
      )}
      {...rest}
    />
  );
}

/* ---------- Textarea ---------- */
export function Textarea({ className, ...rest }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cx(
        "min-h-[80px] w-full rounded-lg border border-border-soft bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20",
        className
      )}
      {...rest}
    />
  );
}

/* ---------- Select ---------- */
export function Select({ className, children, ...rest }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={cx("relative", className)}>
      <select
        className="h-9 w-full appearance-none rounded-lg border border-border-soft bg-white pl-3 pr-9 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        {...rest}
      >
        {children}
      </select>
      <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
      </svg>
    </div>
  );
}

/* ---------- Checkbox ---------- */
export function Checkbox({ label, ...rest }: InputHTMLAttributes<HTMLInputElement> & { label?: ReactNode }) {
  return (
    <label className="inline-flex cursor-pointer select-none items-center gap-2 text-sm text-ink">
      <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-brand accent-[#0F766E]" {...rest} />
      {label}
    </label>
  );
}

/* ---------- Radio ---------- */
export function Radio({ label, ...rest }: InputHTMLAttributes<HTMLInputElement> & { label?: ReactNode }) {
  return (
    <label className="inline-flex cursor-pointer select-none items-center gap-2 text-sm text-ink">
      <input type="radio" className="h-4 w-4 border-slate-300 text-brand accent-[#0F766E]" {...rest} />
      {label}
    </label>
  );
}

/* ---------- Card ---------- */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("card-shadow rounded-xl border border-border-soft bg-white", className)}>{children}</div>;
}

export function CardHeader({ icon, title, action }: { icon?: ReactNode; title: ReactNode; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-border-soft px-4 py-3">
      <h3 className="flex items-center gap-2 text-[15px] font-semibold text-ink">
        {icon && <span className="text-brand">{icon}</span>}
        {title}
      </h3>
      {action}
    </div>
  );
}

/* ---------- Section (form group) ---------- */
export function Section({ icon, title, action, children, className }: { icon?: ReactNode; title: ReactNode; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <Card className={className}>
      <CardHeader icon={icon} title={title} action={action} />
      <div className="p-4">{children}</div>
    </Card>
  );
}

/* ---------- Status Badge ---------- */
const statusStyles: Record<Status, string> = {
  AGENDADO: "bg-info-50 text-info border-info/20",
  "IMPRESSO NO CAIXA": "bg-warn-50 text-warn border-warn/20",
  PAGO: "bg-success-50 text-success border-success/20",
  REALIZADO: "bg-success-50 text-success border-success/20",
  CANCELADO: "bg-slate-100 text-slate-500 border-slate-200",
  "RESTITUÍDO": "bg-purple-50 text-purple-600 border-purple-200",
  PENDENTE: "bg-danger-50 text-danger border-danger/20",
  URGENTE: "bg-danger-50 text-danger border-danger/20",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center whitespace-nowrap rounded-md border px-2 py-0.5 text-[10.5px] font-semibold tracking-wide",
        statusStyles[status],
        className
      )}
    >
      {status}
    </span>
  );
}

/* ---------- Generic Badge ---------- */
export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: "neutral" | "brand" | "success" | "warn" | "info"; className?: string }) {
  const tones = {
    neutral: "bg-slate-100 text-slate-600 border-slate-200",
    brand: "bg-brand-50 text-brand border-brand-100",
    success: "bg-success-50 text-success border-success/20",
    warn: "bg-warn-50 text-warn border-warn/20",
    info: "bg-info-50 text-info border-info/20",
  };
  return <span className={cx("inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold", tones[tone], className)}>{children}</span>;
}
