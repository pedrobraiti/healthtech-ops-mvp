import { useState } from "react";
import { PageHeader } from "../components/layout/Shell";
import { Badge, Button, Card, Select } from "../components/ui/primitives";
import { Tabs } from "../components/ui/Tabs";
import { useToast } from "../components/ui/Toast";
import { resumoCaixaDetalhe, resumoCaixaFormas } from "../data/mock";
import { brl } from "../lib/format";
import { IconArrowDown, IconArrowUp, IconMoney, IconPrint } from "../components/ui/icons";

const TABS = [
  { key: "detalhe", label: "Detalhamento da forma" },
  { key: "descontos", label: "Descontos" },
  { key: "cancelamentos", label: "Cancelamentos" },
  { key: "suprimentos", label: "Suprimentos" },
  { key: "sangrias", label: "Sangrias" },
];

export function ResumoCaixa() {
  const toast = useToast();
  const [tab, setTab] = useState("detalhe");

  const totalGeral = resumoCaixaFormas.reduce(
    (acc, f) => ({ qtd: acc.qtd + f.qtd, entradas: acc.entradas + f.entradas, saidas: acc.saidas + f.saidas, total: acc.total + f.total }),
    { qtd: 0, entradas: 0, saidas: 0, total: 0 }
  );

  return (
    <div className="p-6">
      <PageHeader
        title="Resumo de Caixa"
        actions={
          <>
            <Button variant="secondary" onClick={() => window.print()}><IconPrint width={16} height={16} /> Imprimir</Button>
            <Button variant="primary" onClick={() => toast("Caixa fechado", "success")}>Fechar Caixa</Button>
          </>
        }
      />

      <div className="mt-2 flex items-center gap-3">
        <Select className="w-72"><option>Caixa 677738 de 04/07/2026 → HOJE</option></Select>
        <Badge tone="success">ABERTO</Badge>
      </div>

      {/* 3 cards */}
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="label">Entradas</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success-50 text-success"><IconArrowUp width={18} height={18} /></span>
          </div>
          <div className="mt-2 font-display text-2xl font-bold tabular-nums text-success">{brl(2336)}</div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="label">Saídas</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-danger-50 text-danger"><IconArrowDown width={18} height={18} /></span>
          </div>
          <div className="mt-2 font-display text-2xl font-bold tabular-nums text-danger">{brl(0)}</div>
        </Card>
        <Card className="border-brand-100 bg-brand-50/40 p-4">
          <div className="flex items-center justify-between">
            <span className="label">Saldo Atual</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white"><IconMoney width={16} height={16} /></span>
          </div>
          <div className="mt-2 font-display text-2xl font-bold tabular-nums text-brand">{brl(2336)}</div>
        </Card>
      </div>

      {/* Totais por forma */}
      <Card className="mt-5">
        <div className="border-b border-border-soft px-4 py-3 text-[15px] font-semibold text-ink">Totais por Forma de Pagamento</div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-muted">
              <th className="px-4 py-2 font-semibold">Forma</th>
              <th className="px-4 py-2 text-center font-semibold">Qtd</th>
              <th className="px-4 py-2 text-right font-semibold">Entradas</th>
              <th className="px-4 py-2 text-right font-semibold">Saídas</th>
              <th className="px-4 py-2 text-right font-semibold">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {resumoCaixaFormas.map((f) => (
              <tr key={f.forma} className="hover:bg-slate-50/60">
                <td className="px-4 py-2.5 font-medium text-ink">{f.forma}</td>
                <td className="px-4 py-2.5 text-center">{f.qtd}</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-success">{brl(f.entradas)}</td>
                <td className="px-4 py-2.5 text-right tabular-nums text-danger">{brl(f.saidas)}</td>
                <td className="px-4 py-2.5 text-right font-medium tabular-nums">{brl(f.total)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-border-soft bg-slate-50 font-semibold">
              <td className="px-4 py-2.5">Total Geral</td>
              <td className="px-4 py-2.5 text-center">{totalGeral.qtd}</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-success">{brl(totalGeral.entradas)}</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-danger">{brl(totalGeral.saidas)}</td>
              <td className="px-4 py-2.5 text-right tabular-nums text-brand">{brl(totalGeral.total)}</td>
            </tr>
          </tfoot>
        </table>
      </Card>

      {/* Detalhamento */}
      <Card className="mt-5">
        <div className="px-4 pt-2">
          <Tabs tabs={TABS} active={tab} onChange={setTab} />
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <Select className="w-44"><option>Todas as Formas</option></Select>
          <span className="text-xs text-muted">Exibindo {resumoCaixaDetalhe.length} de 23 registros</span>
        </div>
        {tab === "detalhe" ? (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-muted">
                <th className="px-4 py-2 font-semibold">Hora</th>
                <th className="px-4 py-2 font-semibold">Atendimento</th>
                <th className="px-4 py-2 font-semibold">Origem</th>
                <th className="px-4 py-2 text-center font-semibold">Parcelas</th>
                <th className="px-4 py-2 text-right font-semibold">Valor</th>
                <th className="px-4 py-2 font-semibold">Motivo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {resumoCaixaDetalhe.map((d) => (
                <tr key={d.atendimento} className="hover:bg-slate-50/60">
                  <td className="px-4 py-2.5 font-mono text-[12px] text-muted">{d.hora}</td>
                  <td className="px-4 py-2.5 font-mono text-[12.5px] font-medium text-ink">{d.atendimento}</td>
                  <td className="px-4 py-2.5">
                    <Badge tone={d.origem === "Totem" ? "info" : "neutral"}>{d.origem}</Badge>
                  </td>
                  <td className="px-4 py-2.5 text-center tabular-nums">{d.parcelas}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-success">{brl(d.valor)}</td>
                  <td className="px-4 py-2.5 text-muted">{d.motivo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-12 text-center text-sm text-muted">Sem registros de {TABS.find((t) => t.key === tab)?.label.toLowerCase()} neste caixa.</div>
        )}
      </Card>
    </div>
  );
}
