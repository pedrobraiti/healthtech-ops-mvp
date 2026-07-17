import { NavLink, useNavigate } from "react-router-dom";
import { cx } from "../../lib/format";
import {
  IconAgenda,
  IconAssociados,
  IconAtendimentos,
  IconCaixa,
  IconConfig,
  IconDashboard,
  IconFinanceiro,
  IconParceiros,
  IconPlus,
  IconProcedimentos,
  IconRelatorios,
  IconSair,
  IconShield,
} from "../ui/icons";

const items = [
  { to: "/dashboard", label: "Dashboard", Icon: IconDashboard },
  { to: "/agenda", label: "Agenda", Icon: IconAgenda },
  { to: "/atendimentos", label: "Atendimentos", Icon: IconAtendimentos },
  { to: "/associados", label: "Associados", Icon: IconAssociados },
  { to: "/parceiros", label: "Parceiros", Icon: IconParceiros },
  { to: "/procedimentos", label: "Procedimentos", Icon: IconProcedimentos },
  { to: "/caixa", label: "Caixa", Icon: IconCaixa },
  { to: "/financeiro", label: "Financeiro", Icon: IconFinanceiro },
  { to: "/relatorios", label: "Relatórios", Icon: IconRelatorios },
];

export function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-border-soft bg-white">
      <div className="flex items-center gap-2.5 px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand text-white">
          <IconShield width={20} height={20} />
        </div>
        <div className="leading-tight">
          <div className="text-[15px] font-bold text-ink">HealthTech Ops</div>
          <div className="text-[11px] text-muted">Operador Interno</div>
        </div>
      </div>

      <div className="px-3 pb-2 pt-1">
        <button
          onClick={() => navigate("/atendimentos/novo")}
          className="card-shadow flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-600"
        >
          <IconPlus width={18} height={18} /> Nova Guia
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2">
        {items.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cx(
                "relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-brand-50 text-brand" : "text-slate-600 hover:bg-slate-50 hover:text-ink"
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && <span className="absolute inset-y-1.5 left-0 w-1 rounded-full bg-brand" />}
                <span className={cx(isActive ? "text-brand" : "text-slate-400")}>
                  <Icon />
                </span>
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-0.5 border-t border-border-soft px-3 py-3">
        <NavLink to="/configuracoes" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-ink">
          <span className="text-slate-400"><IconConfig /></span> Configurações
        </NavLink>
        <button onClick={() => navigate("/login")} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-ink">
          <span className="text-slate-400"><IconSair /></span> Sair
        </button>
      </div>
    </aside>
  );
}
