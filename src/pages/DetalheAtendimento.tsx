import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Select, StatusBadge, Textarea } from "../components/ui/primitives";
import { Tabs } from "../components/ui/Tabs";
import { Modal } from "../components/ui/Modal";
import { useToast } from "../components/ui/Toast";
import { procedimentosRealizados, motivosCancelamento, type Status } from "../data/mock";
import { brl, cx } from "../lib/format";
import { IconAssociados, IconParceiros, IconAgenda, IconEdit, IconShield } from "../components/ui/icons";

const TABS = [
  { key: "basico", label: "Básico" },
  { key: "historico", label: "Histórico de alterações" },
  { key: "caixa", label: "Caixa" },
  { key: "2via", label: "2ª via" },
  { key: "obs", label: "Observações (1)" },
  { key: "cancelamento", label: "Cancelamento" },
  { key: "recibos", label: "Recibos" },
  { key: "restituicao", label: "Restituição" },
  { key: "rest-online", label: "Rest. Online" },
];

function InfoCard({ icon, label, title, sub }: { icon: React.ReactNode; label: string; title: string; sub: string }) {
  return (
    <Card className="p-4">
      <div className="mb-1 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
        <span className="text-brand">{icon}</span> {label}
      </div>
      <div className="text-[15px] font-semibold text-ink">{title}</div>
      <div className="mt-0.5 text-xs text-muted">{sub}</div>
    </Card>
  );
}

export function DetalheAtendimento() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [tab, setTab] = useState("basico");
  const [status, setStatus] = useState<Status>("IMPRESSO NO CAIXA");
  const [motivo, setMotivo] = useState("");
  const [obs, setObs] = useState("");
  const [confirm, setConfirm] = useState(false);

  const total = procedimentosRealizados.reduce((s, p) => s + p.total, 0);
  const obrigatorioObs = motivo === "Outro";

  function preCancelar() {
    setStatus("CANCELADO");
    setConfirm(false);
    toast("Atendimento marcado como CANCELADO", "success");
  }

  return (
    <div className="p-6">
      <Link to="/atendimentos" className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 18l-6-6 6-6" /></svg>
        Voltar para Atendimentos <span className="text-slate-300">/</span> <span className="text-ink">Detalhe</span>
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-[22px] font-semibold tracking-tight text-ink">
            Atendimento <span className="font-mono text-[19px] font-semibold text-brand">{id ?? "26742169"}</span>
          </h1>
          <StatusBadge status={status} />
        </div>
        <div className="flex items-center gap-2">
          <Link to={`/atendimentos/${id ?? "26742169"}/guia`}>
            <Button variant="secondary"><IconShield width={16} height={16} /> Ver E-Guia</Button>
          </Link>
          <Button variant="secondary"><IconEdit width={16} height={16} /> Editar</Button>
        </div>
      </div>

      <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
        <span className="font-medium text-ink">Marcella Grings Lanes</span>
        <span>Parceiro: <span className="text-ink">Ciclo</span></span>
        <span>Especialista: <span className="text-ink">Julia de Freitas Azzolini</span></span>
        <span>22/07/2026 13:10</span>
        <span>Total: <span className="font-semibold text-brand">{brl(total)}</span></span>
      </div>

      <div className="mt-4">
        <Tabs tabs={TABS} active={tab} onChange={setTab} />
      </div>

      <div className="mt-5">
        {tab === "basico" && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              <InfoCard icon={<IconAssociados width={15} height={15} />} label="Associado" title="Marcella Grings Lanes" sub="ID 984512 · Plano: Padrão" />
              <InfoCard icon={<IconParceiros width={15} height={15} />} label="Parceiro" title="Ciclo" sub="Contrato Ativo" />
              <InfoCard icon={<IconShield width={15} height={15} />} label="Especialista" title="Julia de Freitas Azzolini" sub="Clínico Geral · CRM 12345" />
              <InfoCard icon={<IconAgenda width={15} height={15} />} label="Data do Atendimento" title="22/07/2026 · 13:10" sub="Horário Local" />
            </div>

            <Card>
              <div className="border-b border-border-soft px-4 py-3 text-[15px] font-semibold text-ink">Procedimentos Realizados</div>
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-muted">
                    <th className="px-4 py-2 font-semibold">Cód.</th>
                    <th className="px-4 py-2 font-semibold">Descrição</th>
                    <th className="px-4 py-2 font-semibold">Convênio</th>
                    <th className="px-4 py-2 text-center font-semibold">Qtd</th>
                    <th className="px-4 py-2 text-right font-semibold">Valor Unit.</th>
                    <th className="px-4 py-2 text-right font-semibold">Valor Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft">
                  {procedimentosRealizados.map((p) => (
                    <tr key={p.cod} className="hover:bg-slate-50/60">
                      <td className="px-4 py-2.5 text-muted">{p.cod}</td>
                      <td className="px-4 py-2.5 font-medium text-ink">{p.descricao}</td>
                      <td className="px-4 py-2.5 text-muted">{p.convenio}</td>
                      <td className="px-4 py-2.5 text-center">{p.qtd}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{brl(p.unit)}</td>
                      <td className="px-4 py-2.5 text-right tabular-nums">{brl(p.total)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50 font-semibold">
                    <td colSpan={5} className="px-4 py-2.5 text-right text-muted">Total do Atendimento:</td>
                    <td className="px-4 py-2.5 text-right text-brand tabular-nums">{brl(total)}</td>
                  </tr>
                </tfoot>
              </table>
            </Card>

            {/* Ações de Cancelamento */}
            <Card className="border-danger/30">
              <div className="flex items-center gap-2 border-b border-danger/20 bg-danger-50/60 px-4 py-3 text-[15px] font-semibold text-danger">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9" /><path d="M15 9l-6 6M9 9l6 6" /></svg>
                Ações de Cancelamento
              </div>
              <div className="p-4">
                <p className="mb-3 text-[13px] text-muted">
                  Utilize esta área apenas se for necessário iniciar o processo de cancelamento deste atendimento impresso. Esta ação requer justificativa.
                </p>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[240px_1fr_auto] md:items-end">
                  <div>
                    <span className="label mb-1.5 block">Motivo do Cancelamento</span>
                    <Select value={motivo} onChange={(e) => setMotivo(e.target.value)}>
                      <option value="">Selecione um motivo…</option>
                      {motivosCancelamento.map((m) => (
                        <option key={m}>{m}</option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <span className="label mb-1.5 block">Observações {obrigatorioObs && <span className="text-danger">(obrigatório)</span>}</span>
                    <input
                      value={obs}
                      onChange={(e) => setObs(e.target.value)}
                      placeholder="Detalhe o motivo…"
                      className="h-9 w-full rounded-lg border border-border-soft bg-white px-3 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                    />
                  </div>
                  <Button
                    variant="danger"
                    disabled={!motivo || (obrigatorioObs && !obs) || status === "CANCELADO"}
                    onClick={() => setConfirm(true)}
                  >
                    Ativar Pré-Cancelamento
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {tab === "rest-online" && (
          <Card className="p-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                <IconShield width={18} height={18} />
              </span>
              <div className="text-sm leading-relaxed text-ink">
                Este atendimento está no protocolo <strong>W9515227192026171364</strong> · Status:{" "}
                <StatusBadge status="RESTITUÍDO" /> · Agendado para 12/06/2026 · Última alteração em 03/06/2026 17:14.
              </div>
            </div>
          </Card>
        )}

        {tab === "historico" && (
          <Card className="p-5">
            <ol className="relative ml-2 space-y-5 border-l border-border-soft pl-6">
              {[
                { t: "22/07/2026 13:12", tit: "Impresso no caixa", by: "Admin", tone: "bg-warn" },
                { t: "22/07/2026 13:10", tit: "Enviado ao caixa", by: "Marcella.cl", tone: "bg-info" },
                { t: "20/07/2026 09:41", tit: "Procedimentos atualizados", by: "Marcella.cl", tone: "bg-slate-400" },
                { t: "18/07/2026 16:03", tit: "Atendimento agendado", by: "Marcella.cl", tone: "bg-brand" },
              ].map((e, i) => (
                <li key={i}>
                  <span className={cx("absolute -left-[7px] mt-1 h-3.5 w-3.5 rounded-full border-2 border-white", e.tone)} />
                  <div className="text-sm font-medium text-ink">{e.tit}</div>
                  <div className="mt-0.5 text-xs text-muted">
                    <span className="font-mono">{e.t}</span> · por {e.by}
                  </div>
                </li>
              ))}
            </ol>
          </Card>
        )}

        {tab === "caixa" && (
          <Card>
            <div className="border-b border-border-soft px-4 py-3 text-[15px] font-semibold text-ink">Pagamentos vinculados</div>
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-muted">
                  <th className="px-4 py-2 font-semibold">Data</th>
                  <th className="px-4 py-2 font-semibold">Forma</th>
                  <th className="px-4 py-2 text-center font-semibold">Parcelas</th>
                  <th className="px-4 py-2 text-right font-semibold">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft">
                <tr className="hover:bg-slate-50/60">
                  <td className="px-4 py-2.5 font-mono text-[12px] text-muted">22/07/2026 13:12</td>
                  <td className="px-4 py-2.5 text-ink">Cartão de crédito</td>
                  <td className="px-4 py-2.5 text-center">1/1</td>
                  <td className="px-4 py-2.5 text-right font-mono font-semibold tabular-nums text-success">{brl(50)}</td>
                </tr>
                <tr className="bg-slate-50 font-semibold">
                  <td colSpan={3} className="px-4 py-2.5 text-right text-muted">Saldo devedor:</td>
                  <td className="px-4 py-2.5 text-right font-mono tabular-nums text-warn">{brl(161)}</td>
                </tr>
              </tbody>
            </table>
          </Card>
        )}

        {tab === "recibos" && (
          <Card>
            <div className="border-b border-border-soft px-4 py-3 text-[15px] font-semibold text-ink">Recibos emitidos</div>
            <div className="divide-y divide-border-soft">
              {["Recibo 22/07/2026 · R$ 50,00", "Guia de autorização (E-Guia)"].map((r) => (
                <div key={r} className="flex items-center justify-between px-4 py-3 text-sm">
                  <span className="text-ink">{r}</span>
                  <Button variant="secondary" onClick={() => toast("Documento enviado para impressão", "info")}>
                    <IconEdit width={14} height={14} /> 2ª via
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {!["basico", "rest-online", "historico", "caixa", "recibos"].includes(tab) && (
          <Card className="flex flex-col items-center justify-center gap-2 py-16 text-center text-muted">
            <span className="text-sm">Sem registros nesta aba para este atendimento.</span>
          </Card>
        )}
      </div>

      <Modal
        open={confirm}
        onClose={() => setConfirm(false)}
        title="Confirmar Pré-Cancelamento"
        subtitle="Esta ação altera o status do atendimento."
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirm(false)}>Voltar</Button>
            <Button variant="danger" onClick={preCancelar}>Confirmar Cancelamento</Button>
          </>
        }
      >
        <p className="text-sm text-ink">
          Confirmar o pré-cancelamento do atendimento <strong>{id ?? "26742169"}</strong>?
        </p>
        <div className="mt-3 rounded-lg bg-slate-50 p-3 text-sm">
          <div><span className="text-muted">Motivo:</span> <span className="font-medium text-ink">{motivo}</span></div>
          {obs && <div className="mt-1"><span className="text-muted">Observações:</span> {obs}</div>}
        </div>
      </Modal>
    </div>
  );
}
