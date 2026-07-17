import { NavLink } from "react-router-dom";
import { cx } from "../../lib/format";
import { IconCaixa, IconFinanceiro, IconRelatorios } from "../ui/icons";

const tabs = [
  { to: "/financeiro", label: "Contas & Fluxo", Icon: IconFinanceiro, end: true },
  { to: "/financeiro/pdv", label: "Frente de Caixa (PDV)", Icon: IconCaixa, end: false },
  { to: "/financeiro/resumo", label: "Resumo de Caixa", Icon: IconRelatorios, end: false },
];

export function FinanceiroNav() {
  return (
    <div className="flex flex-wrap gap-1 rounded-xl border border-border-soft bg-white p-1 card-shadow">
      {tabs.map(({ to, label, Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cx(
              "flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
              isActive ? "bg-brand text-white" : "text-muted hover:bg-slate-50 hover:text-ink"
            )
          }
        >
          <Icon width={16} height={16} /> {label}
        </NavLink>
      ))}
    </div>
  );
}
