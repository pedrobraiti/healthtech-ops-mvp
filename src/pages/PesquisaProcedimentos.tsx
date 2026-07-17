import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/layout/Shell";
import { Badge, Button, Card, Input } from "../components/ui/primitives";
import { Modal } from "../components/ui/Modal";
import { useToast } from "../components/ui/Toast";
import { pesquisaProcedimentos } from "../data/mock";
import { brl, cx } from "../lib/format";
import { IconPlus, IconSearch } from "../components/ui/icons";

export function PesquisaProcedimentos() {
  const navigate = useNavigate();
  const toast = useToast();
  const [sel, setSel] = useState<number | null>(1);
  const [cotacao, setCotacao] = useState(false);

  const procSelecionado = sel !== null ? pesquisaProcedimentos[sel] : null;
  const cotacoes = useMemo(() => {
    const nomeBase = (procSelecionado?.procedimento ?? "Consulta Clínica Geral").split(" (")[0];
    return pesquisaProcedimentos
      .filter((p) => p.procedimento.startsWith(nomeBase))
      .slice()
      .sort((a, b) => a.valor - b.valor);
  }, [procSelecionado]);

  function usarMelhorPreco() {
    const melhor = cotacoes[0];
    const idx = pesquisaProcedimentos.findIndex((p) => p === melhor);
    if (idx >= 0) setSel(idx);
    setCotacao(false);
    toast(`Selecionado: ${melhor.parceiro} — ${brl(melhor.valor)}`, "success");
  }

  return (
    <div className="p-6">
      <PageHeader title="Pesquisa de Procedimentos" subtitle="Busque procedimentos, consulte parceiros e compare cotações rapidamente." />

      <Card className="mt-5 p-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[220px] flex-1">
            <span className="label mb-1.5 block">Procedimento</span>
            <Input icon={<IconSearch width={16} height={16} />} placeholder="Ex.: Consulta Clínica Geral" />
          </div>
          <div className="min-w-[220px] flex-1">
            <span className="label mb-1.5 block">Parceiro</span>
            <Input icon={<IconSearch width={16} height={16} />} placeholder="Ex.: Ceccon & Etzel" />
          </div>
          <Button
            variant="secondary"
            title="Ver custos do procedimento selecionado"
            onClick={() =>
              procSelecionado
                ? toast(`Custo de repasse: ${brl(procSelecionado.valor * 0.7)} (70% do valor de tabela)`, "info")
                : toast("Selecione um procedimento na lista primeiro", "info")
            }
          >
            $ Custos
          </Button>
          <Button
            variant="secondary"
            title="Comparar o preço deste procedimento entre parceiros"
            onClick={() => setCotacao(true)}
          >
            Cotação
          </Button>
          <Button variant="primary" className="px-3" title="Adicionar procedimento" onClick={() => toast("Cadastro de procedimento disponível na versão completa", "info")}>
            <IconPlus width={16} height={16} />
          </Button>
        </div>
      </Card>

      <Card className="mt-5">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-muted">
              <th className="px-4 py-2.5 font-semibold">Procedimento</th>
              <th className="px-4 py-2.5 font-semibold">Parceiro</th>
              <th className="px-4 py-2.5 font-semibold">Região</th>
              <th className="px-4 py-2.5 text-right font-semibold">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {pesquisaProcedimentos.map((p, i) => (
              <tr
                key={i}
                onClick={() => setSel(i)}
                className={cx("cursor-pointer", sel === i ? "bg-brand-50/70" : "hover:bg-slate-50/60")}
              >
                <td className={cx("px-4 py-3 font-medium", sel === i ? "border-l-2 border-brand text-brand" : "text-ink")}>{p.procedimento}</td>
                <td className="px-4 py-3 text-muted">{p.parceiro}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-1 text-muted">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s7-6.3 7-11a7 7 0 10-14 0c0 4.7 7 11 7 11z" /><circle cx="12" cy="10" r="2.4" /></svg>
                    {p.regiao}
                  </span>
                </td>
                <td className={cx("px-4 py-3 text-right font-semibold tabular-nums", sel === i ? "text-brand" : "text-ink")}>{brl(p.valor)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {sel !== null && (
          <div className="flex items-center justify-between gap-3 border-t border-border-soft bg-brand-50/40 px-4 py-3">
            <span className="flex items-center gap-2 text-sm text-ink">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-xs text-white">✓</span>
              1 procedimento selecionado: <strong>{pesquisaProcedimentos[sel].parceiro}</strong> · {brl(pesquisaProcedimentos[sel].valor)}
            </span>
            <Button variant="primary" onClick={() => { toast("Adicionado ao atendimento", "success"); navigate("/atendimentos/novo"); }}>
              Adicionar ao atendimento
            </Button>
          </div>
        )}
      </Card>

      {/* Modal de cotação */}
      <Modal
        open={cotacao}
        onClose={() => setCotacao(false)}
        width="max-w-xl"
        title={`Cotação — ${(procSelecionado?.procedimento ?? "Consulta Clínica Geral").split(" (")[0]}`}
        subtitle="Comparação de valores entre os parceiros credenciados."
        footer={
          <>
            <Button variant="secondary" onClick={() => setCotacao(false)}>Fechar</Button>
            <Button variant="primary" onClick={usarMelhorPreco}>Usar melhor preço</Button>
          </>
        }
      >
        <div className="overflow-hidden rounded-lg border border-border-soft">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-muted">
                <th className="px-4 py-2 font-semibold">Parceiro</th>
                <th className="px-4 py-2 font-semibold">Região</th>
                <th className="px-4 py-2 text-right font-semibold">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {cotacoes.map((c, i) => (
                <tr key={c.parceiro} className={i === 0 ? "bg-success-50/50" : undefined}>
                  <td className="px-4 py-2.5">
                    <span className="flex items-center gap-2 font-medium text-ink">
                      {c.parceiro}
                      {i === 0 && <Badge tone="success">Melhor preço</Badge>}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 text-muted">{c.regiao}</td>
                  <td className={cx("px-4 py-2.5 text-right font-mono font-semibold tabular-nums", i === 0 ? "text-success" : "text-ink")}>{brl(c.valor)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {cotacoes.length > 1 && (
          <p className="mt-3 text-xs text-muted">
            Diferença de <strong className="text-ink">{brl(cotacoes[cotacoes.length - 1].valor - cotacoes[0].valor)}</strong> entre a maior e a menor cotação.
          </p>
        )}
      </Modal>
    </div>
  );
}
