import { useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { unidades } from "../../data/mock";
import { cx } from "../../lib/format";
import { useToast } from "../ui/Toast";
import { Modal } from "../ui/Modal";
import { Badge, Button, Input } from "../ui/primitives";
import { ThemeContext } from "./Shell";
import { IconBell, IconCheckIn, IconHelp, IconMoon, IconSearch, IconSun } from "../ui/icons";

const notificacoes = [
  { titulo: "Atendimento impresso no caixa", sub: "Marcella Grings Lanes · R$ 211,00", tempo: "há 4 min", dot: "bg-warn", to: "/atendimentos/26742169" },
  { titulo: "Novo agendamento", sub: "Ana Carolina Ribeiro · 20/07 08:45", tempo: "há 22 min", dot: "bg-info", to: "/agenda" },
  { titulo: "Restituição concluída", sub: "Protocolo W9515227192026171364", tempo: "há 1 h", dot: "bg-purple-500", to: "/atendimentos/26742169" },
  { titulo: "Sistema da operadora regional", sub: "Manutenção programada até as 16h", tempo: "há 2 h", dot: "bg-slate-400", to: "/dashboard" },
];

const agendaHoje = [
  { hora: "14:00", nome: "Maria Silva Oliveira", detalhe: "Dr. Carlos Mendes · Cardiologia", matricula: "8050219" },
  { hora: "14:30", nome: "João Pedro Santos", detalhe: "Dra. Ana Costa · Ecocardiograma", matricula: "6212990" },
  { hora: "15:00", nome: "Lucia Helena", detalhe: "Dr. Carlos Mendes · Cardiologia", matricula: "2421178" },
];

export function Topbar() {
  const navigate = useNavigate();
  const toast = useToast();
  const { dark, toggle } = useContext(ThemeContext);
  const [unidade, setUnidade] = useState(unidades[0]);
  const [busca, setBusca] = useState("");
  const [menu, setMenu] = useState(false);
  const [notif, setNotif] = useState(false);
  const [lidas, setLidas] = useState(false);
  const [checkin, setCheckin] = useState(false);
  const [buscaCheckin, setBuscaCheckin] = useState("");
  const [chegaram, setChegaram] = useState<string[]>([]);

  const pacientesFiltrados = useMemo(() => {
    if (!buscaCheckin) return agendaHoje;
    const t = buscaCheckin.toLowerCase();
    return agendaHoje.filter((p) => p.nome.toLowerCase().includes(t) || p.matricula.includes(t));
  }, [buscaCheckin]);

  function submitBusca(e: React.FormEvent) {
    e.preventDefault();
    navigate(`/atendimentos${busca ? `?q=${encodeURIComponent(busca)}` : ""}`);
  }

  function confirmarChegada(nome: string) {
    setChegaram((prev) => [...prev, nome]);
    toast(`Check-in de ${nome} confirmado`, "success");
  }

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b border-border-soft bg-white px-4">
      <form onSubmit={submitBusca} className="w-full min-w-0 max-w-xs">
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

      <nav className="flex shrink-0 items-center gap-1">
        {unidades.map((u) => (
          <button
            key={u}
            onClick={() => setUnidade(u)}
            className={cx(
              "relative whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors",
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
          onClick={() => setCheckin(true)}
          className="card-shadow flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg bg-brand px-3.5 text-sm font-semibold text-white hover:bg-brand-600"
        >
          <IconCheckIn width={16} height={16} /> Check-in Paciente
        </button>

        <div className="relative">
          <button onClick={() => setNotif((n) => !n)} className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-ink">
            <IconBell />
            {!lidas && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[9px] font-bold text-white">138</span>
            )}
          </button>
          {notif && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setNotif(false)} />
              <div className="pop-shadow absolute right-0 z-20 mt-1 w-80 rounded-lg border border-border-soft bg-white text-sm">
                <div className="flex items-center justify-between border-b border-border-soft px-3 py-2.5">
                  <span className="font-semibold text-ink">Notificações</span>
                  {!lidas && (
                    <button
                      onClick={() => { setLidas(true); toast("Notificações marcadas como lidas", "info"); }}
                      className="text-xs font-medium text-info hover:underline"
                    >
                      Marcar todas como lidas
                    </button>
                  )}
                </div>
                {lidas ? (
                  <div className="flex flex-col items-center gap-2 px-3 py-8 text-center">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-success-50 text-success">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
                    </span>
                    <span className="text-sm text-muted">Tudo em dia — nenhuma notificação pendente.</span>
                  </div>
                ) : (
                  <div className="max-h-80 divide-y divide-border-soft overflow-y-auto">
                    {notificacoes.map((n, i) => (
                      <button key={i} onClick={() => { setNotif(false); navigate(n.to); }} className="flex w-full gap-3 px-3 py-2.5 text-left hover:bg-slate-50">
                        <span className={cx("mt-1.5 h-2 w-2 shrink-0 rounded-full", n.dot)} />
                        <span className="min-w-0">
                          <span className="block text-[13px] font-medium text-ink">{n.titulo}</span>
                          <span className="block text-xs text-muted">{n.sub}</span>
                          <span className="mt-0.5 block text-[11px] text-slate-400">{n.tempo}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <button onClick={toggle} aria-label="Alternar tema" title="Alternar tema claro/escuro" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-ink">
          {dark ? <IconSun /> : <IconMoon />}
        </button>
        <button onClick={() => toast("Central de ajuda — em breve", "info")} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-ink">
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
                <button onClick={() => { navigate("/configuracoes"); setMenu(false); }} className="w-full px-3 py-2 text-left text-ink hover:bg-slate-50">Perfil e configurações</button>
                <button onClick={() => { setUnidade(unidades[(unidades.indexOf(unidade) + 1) % unidades.length]); setMenu(false); }} className="w-full px-3 py-2 text-left text-ink hover:bg-slate-50">Trocar unidade</button>
                <button onClick={() => navigate("/login")} className="w-full border-t border-border-soft px-3 py-2 text-left text-danger hover:bg-danger-50">Sair</button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal de Check-in */}
      <Modal
        open={checkin}
        onClose={() => setCheckin(false)}
        width="max-w-xl"
        title="Check-in de Paciente"
        subtitle="Confirme a chegada do associado para os atendimentos de hoje."
        footer={<Button variant="secondary" onClick={() => setCheckin(false)}>Fechar</Button>}
      >
        <Input
          icon={<IconSearch width={15} height={15} />}
          value={buscaCheckin}
          onChange={(e) => setBuscaCheckin(e.target.value)}
          placeholder="Buscar por nome ou matrícula…"
          autoFocus
        />
        <div className="mt-3 divide-y divide-border-soft overflow-hidden rounded-lg border border-border-soft">
          {pacientesFiltrados.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-muted">Nenhum paciente encontrado para “{buscaCheckin}”.</div>
          )}
          {pacientesFiltrados.map((p) => {
            const chegou = chegaram.includes(p.nome);
            return (
              <div key={p.nome} className="flex items-center gap-3 px-4 py-3">
                <span className="w-12 shrink-0 font-mono text-[13px] font-semibold text-ink">{p.hora}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-ink">{p.nome}</div>
                  <div className="truncate text-xs text-muted">{p.detalhe} · Matrícula <span className="font-mono">{p.matricula}</span></div>
                </div>
                {chegou ? (
                  <Badge tone="success">✓ Chegou</Badge>
                ) : (
                  <Button variant="secondary" className="h-8 px-3 text-[13px]" onClick={() => confirmarChegada(p.nome)}>
                    Confirmar chegada
                  </Button>
                )}
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs text-muted">Ao confirmar, o atendimento entra na fila da recepção e o parceiro é notificado.</p>
      </Modal>
    </header>
  );
}
