import { useState } from "react";
import { PageHeader } from "../components/layout/Shell";
import { Button, Card, Select, StatusBadge } from "../components/ui/primitives";
import { atendimentosPorStatus, faturamentoMensal, topParceiros, type Status } from "../data/mock";
import { brl, cx } from "../lib/format";
import { IconArrowUp, IconDownload } from "../components/ui/icons";

const statusColor: Record<string, string> = {
  PAGO: "#16A34A",
  "IMPRESSO NO CAIXA": "#D97706",
  AGENDADO: "#2563EB",
  CANCELADO: "#94A3B8",
};

function Kpi({ label, value, delta, tone = "brand" }: { label: string; value: string; delta?: string; tone?: "brand" | "success" | "info" | "warn" }) {
  const accent = { brand: "text-brand", success: "text-success", info: "text-info", warn: "text-warn" }[tone];
  return (
    <Card className="p-4">
      <div className="label">{label}</div>
      <div className={cx("mt-1.5 font-display text-[26px] font-bold tabular-nums", accent)}>{value}</div>
      {delta && (
        <div className="mt-1 flex items-center gap-1 text-xs font-medium text-success">
          <IconArrowUp width={13} height={13} /> {delta} vs. mês anterior
        </div>
      )}
    </Card>
  );
}

export function Relatorios() {
  const [periodo, setPeriodo] = useState("Últimos 6 meses");
  const maxFat = Math.max(...faturamentoMensal.map((m) => m.valor));
  const maxStatus = Math.max(...atendimentosPorStatus.map((s) => s.valor));
  const maxParc = Math.max(...topParceiros.map((p) => p.valor));
  const totalAtend = atendimentosPorStatus.reduce((s, a) => s + a.valor, 0);

  return (
    <div className="p-6">
      <PageHeader
        title="Relatórios"
        subtitle="Desempenho operacional e financeiro da unidade."
        actions={
          <>
            <Select className="w-44"><option>{periodo}</option><option>Este mês</option><option>Este ano</option></Select>
            <Button variant="secondary" onClick={() => window.print()}><IconDownload width={16} height={16} /> Exportar</Button>
          </>
        }
      />

      {/* KPIs */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Faturamento (Jul)" value={brl(58730)} delta="+12,6%" tone="brand" />
        <Kpi label="Atendimentos no mês" value="1.288" delta="+8,3%" tone="info" />
        <Kpi label="Ticket médio" value={brl(178.4)} delta="+3,1%" tone="success" />
        <Kpi label="Taxa de comparecimento" value="92,4%" delta="+1,4%" tone="warn" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        {/* Faturamento mensal — barras verticais, hue único da marca */}
        <Card className="xl:col-span-2">
          <div className="flex items-center justify-between border-b border-border-soft px-4 py-3">
            <h3 className="text-[15px] font-semibold text-ink">Faturamento mensal</h3>
            <span className="flex items-center gap-1.5 text-xs text-muted"><span className="h-2.5 w-2.5 rounded-sm bg-brand" /> Receita bruta</span>
          </div>
          <div className="px-5 pb-5 pt-8">
            <div className="flex items-end gap-3">
              {faturamentoMensal.map((m) => {
                const h = (m.valor / maxFat) * 100;
                const isMax = m.valor === maxFat;
                return (
                  <div key={m.mes} className="group flex flex-1 flex-col items-center gap-2">
                    <div className="flex h-52 w-full items-end">
                      <div
                        title={`${m.mes}: ${brl(m.valor)}`}
                        style={{ height: `${h}%` }}
                        className={cx(
                          "relative w-full rounded-t-[4px] transition-colors",
                          isMax ? "bg-brand" : "bg-brand/35 group-hover:bg-brand/60"
                        )}
                      >
                        <span className={cx(
                          "absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[11px] font-semibold tabular-nums text-ink transition-opacity",
                          isMax ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )}>
                          {(m.valor / 1000).toFixed(1)}k
                        </span>
                      </div>
                    </div>
                    <span className="text-[12px] font-medium text-muted">{m.mes}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>

        {/* Atendimentos por status — barras horizontais, cores de status + rótulos */}
        <Card>
          <div className="flex items-center justify-between border-b border-border-soft px-4 py-3">
            <h3 className="text-[15px] font-semibold text-ink">Atendimentos por status</h3>
            <span className="font-mono text-xs tabular-nums text-muted">{totalAtend.toLocaleString("pt-BR")}</span>
          </div>
          <div className="space-y-3.5 p-5">
            {atendimentosPorStatus.map((s) => (
              <div key={s.label}>
                <div className="mb-1 flex items-center justify-between text-[13px]">
                  <span className="flex items-center gap-2 text-ink">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: statusColor[s.status] }} />
                    {s.label}
                  </span>
                  <span className="font-mono tabular-nums text-muted">{s.valor}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full" style={{ width: `${(s.valor / maxStatus) * 100}%`, background: statusColor[s.status] }} title={`${s.label}: ${s.valor}`} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top parceiros */}
      <Card className="mt-4">
        <div className="border-b border-border-soft px-4 py-3 text-[15px] font-semibold text-ink">Top parceiros por faturamento</div>
        <div className="divide-y divide-border-soft">
          {topParceiros.map((p, i) => (
            <div key={p.nome} className="flex items-center gap-4 px-4 py-3">
              <span className="w-5 font-mono text-[13px] font-semibold text-slate-400">{i + 1}</span>
              <span className="w-52 shrink-0 truncate text-sm font-medium text-ink">{p.nome}</span>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-brand" style={{ width: `${(p.valor / maxParc) * 100}%` }} title={`${p.nome}: ${brl(p.valor)}`} />
              </div>
              <span className="w-24 shrink-0 text-right font-mono text-[13px] font-semibold tabular-nums text-ink">{brl(p.valor)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
