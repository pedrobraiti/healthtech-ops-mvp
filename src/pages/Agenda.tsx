import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Select, StatusBadge } from "../components/ui/primitives";
import { MiniCalendar } from "../components/ui/MiniCalendar";
import { useToast } from "../components/ui/Toast";
import { agendaColunas, listaEspera, type AgendaSlot } from "../data/mock";
import { cx } from "../lib/format";
import { IconChevronLeft, IconDrag } from "../components/ui/icons";

const START = 8 * 60;
const END = 18 * 60;
const PX_PER_MIN = 64 / 60; // 1h = 64px
const HOURS = Array.from({ length: (END - START) / 60 + 1 }, (_, i) => 8 + i);

function toMin(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}
function fmt(min: number) {
  return `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;
}

const statusBlockStyle: Record<string, string> = {
  REALIZADO: "border-l-success bg-success-50",
  AGENDADO: "border-l-info bg-info-50",
  "IMPRESSO NO CAIXA": "border-l-warn bg-warn-50",
};

interface ColunaProps {
  especialista: string;
  especialidade: string;
  slots: AgendaSlot[];
  draggable?: boolean;
  dragIdx: number | null;
  overTime: number | null;
  onDragStartSlot?: (slotIdx: number) => void;
  onDragEndSlot?: () => void;
  onOverCell?: (t: number | null) => void;
  onDropCell?: (t: number) => void;
}

function ColHeader({ nome, esp }: { nome: string; esp: string }) {
  return (
    <div className="sticky top-0 z-20 border-b border-border-soft bg-slate-50/80 px-3 py-2.5 text-center backdrop-blur">
      <div className="truncate text-[12.5px] font-semibold uppercase tracking-wide text-ink">{nome}</div>
      <div className="text-[11px] text-muted">{esp}</div>
    </div>
  );
}

function ColunaAgenda({ especialista, especialidade, slots, draggable, dragIdx, overTime, onDragStartSlot, onDragEndSlot, onOverCell, onDropCell }: ColunaProps) {
  const navigate = useNavigate();
  const cells: number[] = [];
  for (let t = START; t < END; t += 30) cells.push(t);

  if (slots.length === 0) {
    return (
      <div className="flex min-w-[240px] flex-1 flex-col border-r border-border-soft">
        <ColHeader nome={especialista} esp={especialidade} />
        <div className="flex flex-1 flex-col items-center justify-center gap-2 py-16 text-center text-muted">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4M9 14l6 4M15 14l-6 4" /></svg>
          <span className="text-sm">Sem agenda para hoje</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-[240px] flex-1 border-r border-border-soft">
      <ColHeader nome={especialista} esp={especialidade} />
      <div className="relative" style={{ height: (END - START) * PX_PER_MIN }}>
        {cells.map((t) => {
          const isOver = draggable && overTime === t;
          return (
            <button
              key={t}
              onClick={() => navigate("/atendimentos/novo")}
              onDragOver={draggable ? (e) => { e.preventDefault(); onOverCell?.(t); } : undefined}
              onDrop={draggable ? (e) => { e.preventDefault(); onDropCell?.(t); } : undefined}
              style={{ top: (t - START) * PX_PER_MIN, height: 30 * PX_PER_MIN }}
              className={cx(
                "group absolute inset-x-0 flex items-center px-2 text-left transition-colors",
                (t / 30) % 2 === 0 ? "border-t border-border-soft" : "border-t border-dashed border-slate-100",
                isOver && "bg-brand-50 ring-1 ring-inset ring-brand/40"
              )}
            >
              <span className={cx("text-[11px] font-medium", isOver ? "text-brand" : "text-transparent group-hover:text-brand")}>
                {isOver ? `Soltar em ${fmt(t)}` : `+ ${fmt(t)} - Livre`}
              </span>
            </button>
          );
        })}

        {slots.map((s, i) => {
          if (s.tipo === "livre") return null;
          const start = toMin(s.hora);
          const end = s.fim ? toMin(s.fim) : start + 30;
          const top = (start - START) * PX_PER_MIN;
          const height = Math.max((end - start) * PX_PER_MIN - 4, 30);
          if (s.tipo === "bloqueio") {
            return (
              <div key={i} style={{ top: top + 2, height }} className="absolute inset-x-1 z-10 overflow-hidden rounded-md border border-l-4 border-warn/30 border-l-warn bg-warn-50 px-3 py-2">
                <div className="flex items-center gap-1.5 text-[12.5px] font-semibold text-warn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v4M12 17h0" /><path d="M10.3 3.9L2 18a2 2 0 001.7 3h16.6A2 2 0 0022 18L13.7 3.9a2 2 0 00-3.4 0z" /></svg>
                  {s.aviso}
                </div>
                <div className="mt-0.5 text-[11px] text-amber-700">{s.hora} às {s.fim} — Não agendar.</div>
              </div>
            );
          }
          return (
            <div
              key={i}
              draggable={draggable}
              onDragStart={draggable ? () => onDragStartSlot?.(i) : undefined}
              onDragEnd={draggable ? () => onDragEndSlot?.() : undefined}
              onClick={() => navigate("/atendimentos/26742169")}
              style={{ top: top + 2, height }}
              className={cx(
                "group/appt absolute inset-x-1 z-10 overflow-hidden rounded-md border border-border-soft border-l-4 px-3 py-1.5 text-left transition-shadow hover:card-shadow",
                statusBlockStyle[s.status ?? "AGENDADO"],
                draggable && "cursor-grab active:cursor-grabbing",
                dragIdx === i && "opacity-40"
              )}
            >
              {s.agora && <span className="absolute -left-1 right-0 top-0 z-20 flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-danger" /><span className="h-px flex-1 bg-danger/70" /></span>}
              <div className="flex items-start justify-between gap-2">
                <span className="truncate text-[13px] font-semibold text-ink">{s.nome}</span>
                {s.status && <StatusBadge status={s.status} />}
              </div>
              <div className="mt-0.5 truncate text-[11px] text-muted">{s.procedimento}</div>
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                {draggable && <IconDrag width={12} height={12} className="opacity-0 transition-opacity group-hover/appt:opacity-100" />}
                {s.hora} - {s.fim}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Agenda() {
  const navigate = useNavigate();
  const toast = useToast();
  const [view, setView] = useState<"Dia" | "Semana">("Dia");
  const [colunas, setColunas] = useState(agendaColunas);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overTime, setOverTime] = useState<number | null>(null);

  function moverAgendamento(destinoMin: number) {
    if (dragIdx === null) return;
    setColunas((prev) => {
      const next = prev.map((c) => ({ ...c, slots: c.slots.map((s) => ({ ...s })) }));
      const slots = next[0].slots;
      const slot = slots[dragIdx];
      if (!slot || slot.tipo !== "ocupado") return prev;
      // não permite soltar sobre um bloqueio
      const dur = (slot.fim ? toMin(slot.fim) : toMin(slot.hora) + 30) - toMin(slot.hora);
      const conflita = slots.some((s, idx) => {
        if (idx === dragIdx || s.tipo === "livre") return false;
        const a = toMin(s.hora);
        const b = s.fim ? toMin(s.fim) : a + 30;
        return destinoMin < b && destinoMin + dur > a;
      });
      if (conflita) {
        toast("Horário ocupado — escolha outro slot", "error");
        return prev;
      }
      slot.hora = fmt(destinoMin);
      slot.fim = fmt(destinoMin + dur);
      slot.agora = false;
      return next;
    });
    const s = colunas[0].slots[dragIdx];
    if (s) toast(`${s.nome} movido para ${fmt(destinoMin)}`, "success");
    setDragIdx(null);
    setOverTime(null);
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-3 border-b border-border-soft bg-white px-6 py-3">
        <h1 className="font-display text-[19px] font-semibold tracking-tight text-ink">Agenda Operacional</h1>
        <div className="flex rounded-lg border border-border-soft p-0.5">
          {(["Dia", "Semana"] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} className={cx("rounded-md px-3 py-1 text-sm font-medium", view === v ? "bg-brand text-white" : "text-muted hover:text-ink")}>
              {v}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1">
          <button className="rounded-md p-1.5 text-muted hover:bg-slate-100"><IconChevronLeft width={16} height={16} /></button>
          <span className="text-sm font-medium text-ink">Hoje, 04 Jul 2026</span>
          <button className="rotate-180 rounded-md p-1.5 text-muted hover:bg-slate-100"><IconChevronLeft width={16} height={16} /></button>
        </div>
        <span className="hidden items-center gap-1.5 rounded-md bg-brand-50 px-2 py-1 text-[11px] font-medium text-brand lg:inline-flex">
          <IconDrag width={13} height={13} /> Arraste os agendamentos para reagendar
        </span>
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <Select className="w-40"><option>Todos os Parceiros</option></Select>
          <Select className="w-44"><option>Todas Especialidades</option></Select>
          <Select className="w-40"><option>Todos Especialistas</option></Select>
          <Button variant="secondary">Mais</Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        <div className="flex min-w-0 flex-1 overflow-auto">
          <div className="sticky left-0 z-30 w-14 shrink-0 border-r border-border-soft bg-white">
            <div className="sticky top-0 z-20 h-[45px] border-b border-border-soft bg-slate-50/80" />
            <div className="relative" style={{ height: (END - START) * PX_PER_MIN }}>
              {HOURS.map((h) => (
                <div key={h} style={{ top: (h * 60 - START) * PX_PER_MIN }} className="absolute right-2 -translate-y-1/2 text-[11px] font-medium text-slate-400">
                  {String(h).padStart(2, "0")}:00
                </div>
              ))}
            </div>
          </div>
          <div className="flex min-w-max flex-1">
            {colunas.map((c, idx) => (
              <ColunaAgenda
                key={c.especialista}
                especialista={c.especialista}
                especialidade={c.especialidade}
                slots={c.slots}
                draggable={idx === 0}
                dragIdx={idx === 0 ? dragIdx : null}
                overTime={idx === 0 ? overTime : null}
                onDragStartSlot={setDragIdx}
                onDragEndSlot={() => { setDragIdx(null); setOverTime(null); }}
                onOverCell={setOverTime}
                onDropCell={moverAgendamento}
              />
            ))}
          </div>
        </div>

        <div className="hidden w-72 shrink-0 space-y-4 overflow-y-auto border-l border-border-soft bg-white p-4 xl:block">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="label">Minicalendário</span>
            </div>
            <MiniCalendar compact />
          </div>
          <div className="border-t border-border-soft pt-3">
            <div className="label mb-2">Lista de Espera ({listaEspera.length})</div>
            <div className="space-y-2">
              {listaEspera.map((p, i) => (
                <div key={i} className="rounded-lg border border-border-soft p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-semibold text-ink">{p.nome}</span>
                    <StatusBadge status={p.status} />
                  </div>
                  <div className="mt-0.5 text-xs text-muted">{p.procedimento}</div>
                  <button onClick={() => navigate("/atendimentos/novo")} className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5v14" /></svg>
                    Encaixar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
