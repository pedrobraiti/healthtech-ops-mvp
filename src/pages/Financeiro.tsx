import { useState } from "react";
import { PageHeader } from "../components/layout/Shell";
import { FinanceiroNav } from "../components/layout/FinanceiroNav";
import { CountMoney } from "../components/ui/Animated";
import { Badge, Button, Card, Select } from "../components/ui/primitives";
import { Tabs } from "../components/ui/Tabs";
import { useToast } from "../components/ui/Toast";
import { contasPagar, contasReceber, type LancamentoFinanceiro } from "../data/mock";
import { brl } from "../lib/format";
import { IconArrowDown, IconArrowUp, IconDownload, IconMoney } from "../components/ui/icons";

function statusTone(s: LancamentoFinanceiro["status"]) {
  return s === "PAGO" ? "success" : s === "PENDENTE" ? "warn" : "info";
}

function Tabela({ dados }: { dados: LancamentoFinanceiro[] }) {
  return (
    <table className="w-full text-[13px]">
      <thead>
        <tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-muted">
          <th className="px-4 py-2.5 font-semibold">Lançamento</th>
          <th className="px-4 py-2.5 font-semibold">Descrição</th>
          <th className="px-4 py-2.5 font-semibold">Contraparte</th>
          <th className="px-4 py-2.5 font-semibold">Vencimento</th>
          <th className="px-4 py-2.5 font-semibold">Status</th>
          <th className="px-4 py-2.5 text-right font-semibold">Valor</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border-soft">
        {dados.map((l) => (
          <tr key={l.id} className="hover:bg-slate-50/60">
            <td className="px-4 py-3 font-mono text-[12.5px] font-semibold text-brand">{l.id}</td>
            <td className="px-4 py-3 font-medium text-ink">{l.descricao}</td>
            <td className="px-4 py-3 text-muted">{l.contraparte}</td>
            <td className="px-4 py-3 font-mono text-[12px] text-muted">{l.vencimento}</td>
            <td className="px-4 py-3"><Badge tone={statusTone(l.status)}>{l.status}</Badge></td>
            <td className="px-4 py-3 text-right font-mono text-[13px] font-semibold tabular-nums text-ink">{brl(l.valor)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function Financeiro() {
  const toast = useToast();
  const [tab, setTab] = useState("receber");

  const totalReceber = contasReceber.reduce((s, l) => s + l.valor, 0);
  const totalPagar = contasPagar.reduce((s, l) => s + l.valor, 0);
  const saldo = totalReceber - totalPagar;

  return (
    <div className="space-y-5 p-6">
      <FinanceiroNav />
      <PageHeader
        title="Financeiro"
        subtitle="Contas a receber, repasses a parceiros e fluxo de caixa."
        actions={
          <>
            <Select className="w-40"><option>Julho 2026</option><option>Junho 2026</option></Select>
            <Button variant="secondary" onClick={() => toast("Relatório exportado", "info")}><IconDownload width={16} height={16} /> Exportar</Button>
          </>
        }
      />

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="label">A Receber</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success-50 text-success"><IconArrowUp width={17} height={17} /></span>
          </div>
          <div className="mt-2 font-display text-2xl font-bold tabular-nums text-success"><CountMoney value={totalReceber} /></div>
          <div className="mt-1 text-xs text-muted">{contasReceber.length} lançamentos em aberto</div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="label">A Pagar (repasses)</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-danger-50 text-danger"><IconArrowDown width={17} height={17} /></span>
          </div>
          <div className="mt-2 font-display text-2xl font-bold tabular-nums text-danger"><CountMoney value={totalPagar} /></div>
          <div className="mt-1 text-xs text-muted">{contasPagar.length} repasses programados</div>
        </Card>
        <Card className="border-brand-100 bg-brand-50/40 p-4">
          <div className="flex items-center justify-between">
            <span className="label">Saldo projetado</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white"><IconMoney width={16} height={16} /></span>
          </div>
          <div className="mt-2 font-display text-2xl font-bold tabular-nums text-brand"><CountMoney value={saldo} /></div>
          <div className="mt-1 text-xs text-muted">Receber − Pagar no período</div>
        </Card>
      </div>

      <Card className="mt-5">
        <div className="px-4 pt-2">
          <Tabs
            tabs={[
              { key: "receber", label: `Contas a Receber (${contasReceber.length})` },
              { key: "pagar", label: `Repasses a Parceiros (${contasPagar.length})` },
              { key: "fluxo", label: "Fluxo de Caixa" },
            ]}
            active={tab}
            onChange={setTab}
          />
        </div>
        {tab === "receber" && <Tabela dados={contasReceber} />}
        {tab === "pagar" && <Tabela dados={contasPagar} />}
        {tab === "fluxo" && (
          <div className="flex flex-col items-center gap-2 py-16 text-center text-muted">
            <IconMoney width={26} height={26} className="text-slate-300" />
            <span className="text-sm">Projeção de fluxo de caixa consolidada por dia — disponível na versão completa.</span>
          </div>
        )}
      </Card>
    </div>
  );
}
