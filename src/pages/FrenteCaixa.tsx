import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FinanceiroNav } from "../components/layout/FinanceiroNav";
import { Button, Card, Checkbox, Input, Label, Select } from "../components/ui/primitives";
import { Tabs } from "../components/ui/Tabs";
import { Modal } from "../components/ui/Modal";
import { useToast } from "../components/ui/Toast";
import { formasPagamento, motivosCancelamento } from "../data/mock";
import { brl } from "../lib/format";
import { IconRefresh, IconSearch, IconTrash } from "../components/ui/icons";

interface Lancamento {
  id: number;
  forma: string;
  valor: number;
}

const TOTAL = 211;
let lancId = 1;

export function FrenteCaixa() {
  const navigate = useNavigate();
  const toast = useToast();
  const [selecionado, setSelecionado] = useState(false);
  const [aba, setAba] = useState("avista");
  const [forma, setForma] = useState(formasPagamento[1]);
  const [valor, setValor] = useState("161,00");
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([{ id: lancId++, forma: "Cartão de crédito", valor: 50 }]);
  const [naoEmitir, setNaoEmitir] = useState(false);
  const [sangria, setSangria] = useState(false);
  const [suprimento, setSuprimento] = useState(false);
  const [linkModal, setLinkModal] = useState(false);

  const cobrado = lancamentos.reduce((s, l) => s + l.valor, 0);
  const saldo = Math.max(TOTAL - cobrado, 0);

  function adicionar() {
    const num = parseFloat(valor.replace(".", "").replace(",", ".")) || 0;
    if (num <= 0) return;
    setLancamentos((prev) => [...prev, { id: lancId++, forma: forma.charAt(0) + forma.slice(1).toLowerCase(), valor: num }]);
    setValor("0,00");
  }

  function registrar() {
    toast("Cobrança registrada — atendimento PAGO", "success");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border-soft bg-white px-4 py-2.5">
        <FinanceiroNav />
      </div>
      {/* barra superior */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border-soft bg-white px-4 py-2.5">
        <div className="flex items-center gap-3 pr-3">
          <div className="flex items-center gap-1.5 text-brand">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><rect x="2.5" y="6" width="19" height="13" rx="2" /><path d="M2.5 10h19M6 15h4" /></svg>
            <span className="text-[15px] font-semibold text-ink">Frente de Caixa (PDV)</span>
          </div>
          <div className="text-xs text-muted">
            Controle <span className="font-mono font-semibold text-ink">#982</span> · Operador <span className="font-semibold text-ink">Admin</span>
          </div>
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-1.5">
          <Button variant="secondary" onClick={() => toast("Gaveta aberta", "info")}>Abrir Gaveta</Button>
          <Button variant="secondary" onClick={() => navigate("/financeiro/resumo")}>Resumo do Caixa</Button>
          <Button variant="secondary" onClick={() => setSangria(true)}>Lançar Sangria</Button>
          <Button variant="secondary" onClick={() => setSuprimento(true)}>Lançar Suprimento</Button>
          <Button variant="danger" onClick={() => toast("Fechamento de caixa iniciado", "info")}>Fechamento de Caixa</Button>
          <span className="ml-1 flex items-center gap-1.5 rounded-md bg-slate-100 px-2 py-1 text-[11px] font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-danger" /> Epson TM-T20: INATIVA
          </span>
        </div>
      </div>

      {/* 3 colunas */}
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 overflow-y-auto p-4 lg:grid-cols-[300px_1fr_340px]">
        {/* Coluna 1 */}
        <Card className="flex min-h-0 flex-col">
          <div className="border-b border-border-soft px-4 py-3">
            <h3 className="text-sm font-semibold text-ink">Atendimentos enviados ao caixa</h3>
            <div className="mt-2 flex items-center gap-2">
              <Input icon={<IconSearch width={15} height={15} />} placeholder="Buscar por Nome, Matrícula…" className="flex-1" />
              <button className="rounded-lg border border-border-soft p-2 text-muted hover:bg-slate-50"><IconRefresh width={16} height={16} /></button>
            </div>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto p-3">
            {!selecionado ? (
              <button onClick={() => setSelecionado(true)} className="w-full rounded-lg border border-border-soft p-3 text-left transition-colors hover:border-brand hover:bg-brand-50/40">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">Matrícula: <span className="font-mono normal-case tracking-normal">5795861</span></span>
                  <span className="text-sm font-bold text-brand">{brl(TOTAL)}</span>
                </div>
                <div className="mt-1 text-sm font-semibold text-ink">Marcella Grings Lanes</div>
                <div className="text-xs text-muted">1 Atendimento(s)</div>
              </button>
            ) : (
              <div className="flex flex-col items-center justify-center gap-1 py-10 text-center text-xs text-muted">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" /></svg>
                Atendimento movido para cobrança.
              </div>
            )}
          </div>
        </Card>

        {/* Coluna 2 */}
        <Card className="flex min-h-0 flex-col">
          <div className="border-b border-border-soft px-4 py-3">
            <h3 className="text-sm font-semibold text-ink">Selecionados para cobrança</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-muted">
                  <th className="px-4 py-2 font-semibold">Atendimento</th>
                  <th className="px-4 py-2 font-semibold">Dados</th>
                  <th className="px-4 py-2 text-right font-semibold">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft">
                {selecionado ? (
                  <tr className="hover:bg-slate-50/60">
                    <td className="px-4 py-3 font-mono text-[12.5px] font-semibold text-brand">26742169</td>
                    <td className="px-4 py-3">
                      <div className="text-ink">Paciente: Marcella Grings Lanes</div>
                      <div className="text-xs text-muted">Parceiro: Ciclo</div>
                    </td>
                    <td className="px-4 py-3 text-right font-medium tabular-nums">{brl(TOTAL)}</td>
                  </tr>
                ) : (
                  <tr><td colSpan={3} className="px-4 py-16 text-center text-muted">Selecione um atendimento na coluna ao lado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-border-soft px-4 py-2.5 text-sm">
            <span className="text-muted">Subtotal <span className="ml-2 font-semibold text-ink">{brl(selecionado ? TOTAL : 0)}</span></span>
            <span className="text-muted">Descontos <span className="ml-2 font-semibold text-ink">{brl(0)}</span></span>
          </div>
        </Card>

        {/* Coluna 3 */}
        <Card className="flex min-h-0 flex-col">
          <div className="border-b border-border-soft px-4 py-3">
            <h3 className="text-sm font-semibold text-ink">Definir pagamento</h3>
          </div>
          <div className="p-4">
            <Tabs
              tabs={[{ key: "avista", label: "À vista" }, { key: "aprazo", label: "A prazo" }]}
              active={aba}
              onChange={setAba}
              className="mb-4"
            />
            <div className="grid grid-cols-[90px_1fr] gap-2">
              <div>
                <Label>Valor (R$)</Label>
                <Input value={valor} onChange={(e) => setValor(e.target.value)} className="text-right tabular-nums" />
              </div>
              <div>
                <Label>Forma de pagamento</Label>
                <div className="flex gap-1.5">
                  <Select value={forma} onChange={(e) => setForma(e.target.value)} className="flex-1">
                    {formasPagamento.map((f) => (
                      <option key={f}>{f}</option>
                    ))}
                  </Select>
                  <Button variant="primary" onClick={adicionar} className="px-3">Adicionar</Button>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="label mb-2">Lançamentos</div>
              <div className="space-y-1.5">
                {lancamentos.map((l) => (
                  <div key={l.id} className="flex items-center justify-between rounded-lg border border-border-soft px-3 py-2 text-sm">
                    <span className="flex items-center gap-2 text-ink">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="text-muted"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
                      {l.forma}
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="font-medium tabular-nums">{brl(l.valor)}</span>
                      <button onClick={() => setLancamentos((prev) => prev.filter((x) => x.id !== l.id))} className="rounded p-0.5 text-slate-400 hover:text-danger">
                        <IconTrash width={15} height={15} />
                      </button>
                    </span>
                  </div>
                ))}
                {lancamentos.length === 0 && <div className="rounded-lg border border-dashed border-border-soft px-3 py-4 text-center text-xs text-muted">Nenhum lançamento.</div>}
              </div>
            </div>
          </div>

          <div className="mt-auto space-y-1 border-t border-border-soft px-4 py-3 text-sm">
            <div className="flex justify-between"><span className="text-muted">Total Cobrado</span><span className="font-semibold text-ink tabular-nums">{brl(cobrado)}</span></div>
            <div className="flex justify-between"><span className="text-muted">Saldo Devedor</span><span className="text-base font-bold text-warn tabular-nums">{brl(saldo)}</span></div>
          </div>
        </Card>
      </div>

      {/* barra inferior */}
      <div className="flex flex-wrap items-center gap-3 border-t border-border-soft bg-white px-4 py-3">
        <div>
          <div className="label">Total a pagar</div>
          <div className="font-display text-2xl font-bold tabular-nums text-ink">{brl(selecionado ? TOTAL : 0)}</div>
        </div>
        <Checkbox label="Não emitir guia(s) e/ou recibo(s)" checked={naoEmitir} onChange={(e) => setNaoEmitir(e.target.checked)} className="ml-4" />
        <div className="ml-auto flex flex-wrap items-center gap-2">
          <Button variant="secondary" onClick={() => setLinkModal(true)}>Gerar Link de Pagamento</Button>
          <Button variant="secondary" onClick={() => toast(`Troco: ${brl(0)}`, "info")}>Calcular Troco</Button>
          <Button variant="primary" disabled={!selecionado} onClick={registrar} className="px-6">
            Registrar Cobrança →
          </Button>
        </div>
      </div>

      {/* Modais */}
      <ModalCaixa open={sangria} onClose={() => setSangria(false)} tipo="sangria" toast={toast} />
      <ModalCaixa open={suprimento} onClose={() => setSuprimento(false)} tipo="suprimento" toast={toast} />

      <Modal
        open={linkModal}
        onClose={() => setLinkModal(false)}
        title="Link de Pagamento"
        footer={<Button variant="primary" onClick={() => { toast("Link copiado", "success"); setLinkModal(false); }}>Copiar link</Button>}
      >
        <div className="rounded-lg border border-border-soft bg-slate-50 px-3 py-2.5 text-sm text-info break-all">
          https://pay.healthtechops.com.br/l/HIMALNB8-{TOTAL}
        </div>
      </Modal>
    </div>
  );
}

function ModalCaixa({
  open,
  onClose,
  tipo,
  toast,
}: {
  open: boolean;
  onClose: () => void;
  tipo: "sangria" | "suprimento";
  toast: (m: string, k?: "success" | "error" | "info") => void;
}) {
  const isSangria = tipo === "sangria";
  return (
    <Modal
      open={open}
      onClose={onClose}
      width="max-w-xl"
      title={`${isSangria ? "Sangria" : "Suprimento"} de valores no caixa 677738`}
      subtitle={isSangria ? "Retire valores do caixa (ex.: depósito, troco)." : "Adicione fundo de troco ou outros recebimentos não vinculados a vendas."}
      footer={
        <div className="flex w-full items-center justify-between">
          <span className={`text-sm font-semibold ${isSangria ? "text-danger" : "text-success"}`}>
            {isSangria ? "Saída" : "Entrada"} de {brl(0)}
          </span>
          <div className="flex gap-2">
            <Button variant="secondary" onClick={onClose}>Fechar</Button>
            <Button variant="primary" onClick={() => { toast("Comprovante enviado à impressora", "info"); }}>Imprimir Comprovante</Button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label required>Valor da {isSangria ? "Sangria" : "operação"}</Label>
            <Input defaultValue="R$ 0,00" className="text-right" />
          </div>
          <div>
            <Label>Forma</Label>
            <Select defaultValue="Dinheiro"><option>Dinheiro</option></Select>
          </div>
        </div>
        <div>
          <Label required>Motivo</Label>
          <Select><option value="">Selecione o motivo da operação…</option>{motivosCancelamento.map((m) => <option key={m}>{m}</option>)}</Select>
        </div>
        <div>
          <Label>Observações</Label>
          <textarea placeholder="Detalhes adicionais sobre esta operação…" className="min-h-[70px] w-full rounded-lg border border-border-soft px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20" />
        </div>
        <div>
          <div className="label mb-2">Lançamentos efetuados neste caixa</div>
          <div className="rounded-lg border border-dashed border-border-soft py-8 text-center text-xs text-muted">
            Nenhum{isSangria ? "a sangria registrada" : " suprimento registrado"} neste turno.
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="primary" onClick={() => { toast(`${isSangria ? "Sangria" : "Suprimento"} lançado`, "success"); onClose(); }}>Lançar</Button>
        </div>
      </div>
    </Modal>
  );
}
