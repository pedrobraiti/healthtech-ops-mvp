import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { unidades } from "../../data/mock";
import { cx } from "../../lib/format";
import { useToast } from "../ui/Toast";
import { IconBell, IconCheckIn, IconHelp, IconSearch } from "../ui/icons";

export function Topbar() {
  const navigate = useNavigate();
  const toast = useToast();
  const [unidade, setUnidade] = useState(unidades[0]);
  const [busca, setBusca] = useState("");
  const [menu, setMenu] = useState(false);

  function submitBusca(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/atendimentos${busca ? `?q=${encodeURIComponent(busca)}` : ""}`);
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border-soft bg-white px-4">
      <form onSubmit={submitBusca} className="w-full max-w-sm">
        <div className="relative">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <IconSearch width={16} height={16} />
          </span>
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar associado, guia…"
            className="h-9 w-full rounded-lg border border-border-soft bg-slate-50 pl-9 pr-3 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>
      </form>

      <nav className="flex items-center gap-1">
        {unidades.map((u) => (
          <button
            key={u}
            onClick={() => setUnidade(u)}
            className={cx(
              "relative px-3 py-2 text-sm font-medium transition-colors",
              unidade === u ? "text-brand" : "text-muted hover:text-ink"
            )}
          >
            {u}
            {unidade === u && <span className="absolute inset-x-2 -bottom-2.5 h-0.5 rounded-full bg-brand" />}
          </button>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => toast("Check-in de paciente iniciado", "info")}
          className="card-shadow flex h-9 items-center gap-2 rounded-lg bg-brand px-3.5 text-sm font-semibold text-white hover:bg-brand-600"
        >
          <IconCheckIn width={16} height={16} /> Check-in Paciente
        </button>

        <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-ink">
          <IconBell />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[9px] font-bold text-white">138</span>
        </button>
        <button className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-ink">
          <IconHelp />
        </button>

        <div className="relative">
          <button onClick={() => setMenu((m) => !m)} className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-slate-100">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand to-teal-500 text-xs font-semibold text-white">MC</div>
          </button>
          {menu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenu(false)} />
              <div className="pop-shadow absolute right-0 z-20 mt-1 w-52 rounded-lg border border-border-soft bg-white py-1 text-sm">
                <div className="border-b border-border-soft px-3 py-2">
                  <div className="font-semibold text-ink">Marcella.cl</div>
                  <div className="text-xs text-muted">Operador Interno · {unidade}</div>
                </div>
                <button className="w-full px-3 py-2 text-left text-ink hover:bg-slate-50">Perfil</button>
                <button className="w-full px-3 py-2 text-left text-ink hover:bg-slate-50">Trocar unidade</button>
                <button onClick={() => navigate("/login")} className="w-full border-t border-border-soft px-3 py-2 text-left text-danger hover:bg-danger-50">Sair</button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
