import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/layout/Shell";
import { Button, Card, CardHeader, Badge, StatusBadge } from "../components/ui/primitives";
import { MiniCalendar } from "../components/ui/MiniCalendar";
import { CountInt } from "../components/ui/Animated";
import { useToast } from "../components/ui/Toast";
import { brl } from "../lib/format";
import { proximosHorarios } from "../data/mock";
import { IconAgenda, IconCaixa, IconDrag, IconInfo, IconMoon, IconPlus } from "../components/ui/icons";

function Tile({ label, value, tone }: { label: string; value: number; tone: "info" | "warn" | "success" }) {
  const bar = { info: "bg-info", warn: "bg-warn", success: "bg-success" }[tone];
  const text = { info: "text-info", warn: "text-warn", success: "text-success" }[tone];
  return (
    <div className="relative flex items-center gap-4 rounded-lg border border-border-soft bg-white px-4 py-4">
      <span className={`absolute inset-y-2 left-0 w-1 rounded-full ${bar}`} />
      <div className="flex-1">
        <div className="text-sm font-medium text-ink">{label}</div>
      </div>
      <div className={`font-display text-3xl font-bold tabular-nums ${text}`}><CountInt value={value} /></div>
    </div>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const toast = useToast();
  const [welcome, setWelcome] = useState(() => localStorage.getItem("htops-welcome") !== "off");
  const [nota, setNota] = useState("");

  function dispensarWelcome() {
    localStorage.setItem("htops-welcome", "off");
    setWelcome(false);
  }

  return (
    <div className="p-6">
      <PageHeader title="Visão Geral" subtitle="Sábado, 04 de julho de 2026 · Unidade Matriz" />

      {welcome && (
        <div className="relative mt-5 overflow-hidden rounded-xl border border-brand-100 bg-gradient-to-r from-brand-50 to-teal-50 p-5 dark:to-brand-50">
          <button
            onClick={dispensarWelcome}
            aria-label="Dispensar boas-vindas"
            className="absolute right-3 top-3 rounded-md p-1 text-muted hover:bg-white/60 hover:text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" /></svg>
          </button>
          <h2 className="font-display text-[17px] font-semibold text-ink">Bem-vindo ao protótipo do HealthTech Ops 👋</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Este é um ambiente de demonstração — todos os dados são fictícios. Explore à vontade: nada aqui afeta sistemas reais.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 rounded-lg bg-white/70 px-3 py-1.5 text-xs font-medium text-ink dark:bg-white/10">
              <IconPlus width={14} height={14} className="text-brand" /> “+ Nova Guia” cria um agendamento
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-white/70 px-3 py-1.5 text-xs font-medium text-ink dark:bg-white/10">
              <IconDrag width={14} height={14} className="text-brand" /> Na Agenda, arraste um horário para reagendar
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-white/70 px-3 py-1.5 text-xs font-medium text-ink dark:bg-white/10">
              <IconMoon width={14} height={14} className="text-brand" /> Alterne o tema escuro no topo da tela
            </span>
          </div>
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px]">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* Caixa de Hoje */}
          <Card>
            <CardHeader
              icon={<IconCaixa />}
              title="Caixa de Hoje"
              action={
                <span className="flex items-center gap-3">
                  <button onClick={() => navigate("/financeiro/resumo")} className="text-xs font-medium text-info hover:underline">
                    Ver resumo →
                  </button>
                  <Badge tone="success">ABERTO</Badge>
                </span>
              }
            />
            <div className="grid grid-cols-3 gap-3 p-4">
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="label">Entradas</div>
                <div className="mt-1 text-lg font-bold text-success">{brl(2336)}</div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="label">Saídas</div>
                <div className="mt-1 text-lg font-bold text-danger">{brl(0)}</div>
              </div>
              <div className="rounded-lg bg-brand-50 p-3">
                <div className="label">Saldo Total</div>
                <div className="mt-1 text-lg font-bold text-brand">{brl(2336)}</div>
              </div>
            </div>
          </Card>

          {/* Pendências */}
          <Card>
            <CardHeader title="Pendências" />
            <div className="divide-y divide-border-soft">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="flex items-center gap-2 text-sm text-ink">
                  <span className="h-2 w-2 rounded-full bg-success" /> MAXCORE
                </span>
                <Badge tone="success">Em dia</Badge>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="flex items-center gap-2 text-sm text-ink">
                  <span className="h-2 w-2 rounded-full bg-slate-300" /> Franqueador
                </span>
                <Badge>N/D</Badge>
              </div>
            </div>
          </Card>

          {/* Atendimentos do Dia */}
          <Card>
            <CardHeader title="Atendimentos do Dia" />
            <div className="flex flex-col justify-center gap-3 p-4">
              <Tile label="Agendados" value={42} tone="info" />
              <Tile label="Impressos" value={18} tone="warn" />
              <Tile label="Pagos" value={12} tone="success" />
            </div>
          </Card>

          {/* Próximos Horários */}
          <Card>
            <CardHeader title="Próximos Horários" />
            <div className="divide-y divide-border-soft">
              {proximosHorarios.map((h, i) => (
                <button
                  key={i}
                  onClick={() => navigate(`/atendimentos/${h.id}`)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50"
                >
                  <div className="w-12 shrink-0 text-[15px] font-bold text-ink">{h.hora}</div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium text-ink">{h.nome}</div>
                    <div className="truncate text-xs text-muted">
                      {h.prof} · {h.esp}
                    </div>
                  </div>
                  <StatusBadge status={h.status} />
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Painel direito */}
        <div className="space-y-5">
          <Card className="p-4">
            <MiniCalendar />
          </Card>

          <Card>
            <CardHeader title="Anotações Rápidas" />
            <div className="space-y-3 p-4">
              <div className="flex gap-2.5 rounded-lg border-l-4 border-warn bg-warn-50 p-3">
                <IconInfo className="mt-0.5 shrink-0 text-warn" width={16} height={16} />
                <div>
                  <div className="text-sm font-semibold text-warn">Aviso Geral</div>
                  <p className="mt-0.5 text-xs text-amber-700/90">
                    Sistema da operadora regional em manutenção até as 16h.
                  </p>
                </div>
              </div>
              <textarea
                value={nota}
                onChange={(e) => setNota(e.target.value)}
                placeholder="Digite uma nota rápida…"
                className="min-h-[110px] w-full resize-none rounded-lg border border-border-soft bg-slate-50 p-3 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand/20"
              />
              <div className="flex justify-end">
                <Button
                  variant="secondary"
                  className="h-8 px-3 text-[13px]"
                  disabled={!nota.trim()}
                  onClick={() => { toast("Nota salva", "success"); setNota(""); }}
                >
                  Salvar nota
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
