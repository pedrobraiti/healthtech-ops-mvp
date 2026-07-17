import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/layout/Shell";
import { Badge, Button, Input, Label, Section, Select, Textarea } from "../components/ui/primitives";
import { Modal } from "../components/ui/Modal";
import { useToast } from "../components/ui/Toast";
import { procedimentosAtendimento } from "../data/mock";
import { brl } from "../lib/format";
import { IconAssociados, IconParceiros, IconProcedimentos, IconAgenda, IconSearch, IconTrash, IconInfo, IconPlus } from "../components/ui/icons";

export function AgendarAtendimento() {
  const navigate = useNavigate();
  const toast = useToast();
  const [procs, setProcs] = useState(procedimentosAtendimento);
  const [linkModal, setLinkModal] = useState(false);
  const total = procs.reduce((s, p) => s + p.valor * p.qtd, 0);

  function gravar() {
    toast("Atendimento gravado como AGENDADO", "success");
    setTimeout(() => navigate("/atendimentos/26742169"), 400);
  }

  return (
    <div className="pb-24">
      <div className="p-6">
        <PageHeader
          title="Agendar Atendimento"
          subtitle="Preencha os dados para registrar um novo agendamento no sistema."
          actions={<Badge tone="info">RASCUNHO</Badge>}
        />

        <div className="mt-5 space-y-5">
          {/* Associado */}
          <Section icon={<IconAssociados />} title="Associado">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label>Buscar Associado</Label>
                <Input icon={<IconSearch width={16} height={16} />} defaultValue="Marcella" placeholder="Nome, CPF, carteirinha ou RG" />
              </div>
              <div>
                <Label>Resumo do Paciente</Label>
                <div className="flex items-center justify-between rounded-lg border border-border-soft bg-slate-50 px-3 py-2">
                  <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-ink">
                      Marcella Grings Lanes
                      <Badge tone="brand">Score: 67.08</Badge>
                    </div>
                    <button className="mt-0.5 flex items-center gap-1 text-xs font-medium text-info hover:underline">
                      <IconPlus width={12} height={12} /> Gerar identificador para este atendimento
                    </button>
                  </div>
                  <span className="text-xs text-muted">Matrícula: 987123-01</span>
                </div>
              </div>
            </div>
          </Section>

          {/* Local e Profissional */}
          <Section icon={<IconParceiros />} title="Local e Profissional">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label>Parceiro / Clínica</Label>
                <Select defaultValue="Ciclo">
                  <option>Ciclo</option>
                  <option>Ceccon &amp; Etzel</option>
                  <option>Laboratório Hadiak</option>
                </Select>
              </div>
              <div>
                <Label>Especialista</Label>
                <Select defaultValue="Julia">
                  <option value="Julia">Julia de Freitas Azzolini</option>
                  <option>Carlos Eduardo Lima</option>
                </Select>
              </div>
            </div>
          </Section>

          {/* Procedimentos */}
          <Section
            icon={<IconProcedimentos />}
            title="Procedimentos"
            action={
              <Button variant="link" onClick={() => navigate("/procedimentos")}>
                Abrir pesquisa de procedimentos
              </Button>
            }
          >
            <div className="mb-3">
              <Input icon={<IconSearch width={16} height={16} />} placeholder="Buscar código ou descrição…" onFocus={() => navigate("/procedimentos")} />
            </div>
            <div className="overflow-hidden rounded-lg border border-border-soft">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-muted">
                    <th className="w-10 px-3 py-2 font-semibold">#</th>
                    <th className="px-3 py-2 font-semibold">Procedimento</th>
                    <th className="w-16 px-3 py-2 text-center font-semibold">Qtd</th>
                    <th className="w-28 px-3 py-2 text-right font-semibold">Valor (R$)</th>
                    <th className="w-14 px-3 py-2 text-center font-semibold">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft">
                  {procs.map((p) => (
                    <tr key={p.n} className="hover:bg-slate-50/60">
                      <td className="px-3 py-2.5 text-muted">{p.n}</td>
                      <td className="px-3 py-2.5 font-medium text-ink">{p.descricao}</td>
                      <td className="px-3 py-2.5 text-center">{p.qtd}</td>
                      <td className="px-3 py-2.5 text-right tabular-nums">{p.valor.toFixed(2).replace(".", ",")}</td>
                      <td className="px-3 py-2.5 text-center">
                        <button onClick={() => setProcs((prev) => prev.filter((x) => x.n !== p.n))} className="rounded p-1 text-slate-400 hover:bg-danger-50 hover:text-danger">
                          <IconTrash width={16} height={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {procs.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-3 py-6 text-center text-sm text-muted">Nenhum procedimento adicionado.</td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-50 font-semibold">
                    <td colSpan={3} className="px-3 py-2.5 text-right text-muted">Total Bruto:</td>
                    <td className="px-3 py-2.5 text-right text-brand tabular-nums">{total.toFixed(2).replace(".", ",")}</td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Preparo do Exame */}
            <div className="mt-4 flex gap-3 rounded-lg border-l-4 border-warn bg-warn-50 p-4">
              <IconInfo className="mt-0.5 shrink-0 text-warn" width={18} height={18} />
              <div>
                <div className="text-sm font-semibold text-warn">Preparo do Exame Necessário</div>
                <p className="mt-1 text-[13px] leading-relaxed text-amber-800">
                  O paciente deve realizar <strong>jejum de 8 horas</strong>. Beber bastante <strong>água</strong> 1 hora antes do exame para reter urina.
                  Tomar <strong>dimeticona</strong> 40 gotas, 2 horas antes do procedimento.
                </p>
              </div>
            </div>
          </Section>

          {/* Agendamento */}
          <Section icon={<IconAgenda />} title="Agendamento">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="md:col-span-3">
                <Label>Especialidade</Label>
                <Input defaultValue="Médico em radiologia e diagnóstico por imagem" />
              </div>
              <div>
                <Label required>Data</Label>
                <Input defaultValue="22/07/2026" />
              </div>
              <div>
                <Label required>Hora</Label>
                <Input defaultValue="13:10" />
              </div>
              <div>
                <Label>Código de indicação</Label>
                <Input placeholder="Opcional" />
              </div>
              <div className="md:col-span-3">
                <Label>Observações</Label>
                <Textarea placeholder="Observações livres sobre o atendimento…" />
              </div>
            </div>
          </Section>
        </div>
      </div>

      {/* Barra de ações fixa */}
      <div className="fixed bottom-0 left-60 right-0 flex flex-wrap items-center gap-2 border-t border-border-soft bg-white px-6 py-3">
        <Button variant="primary" onClick={gravar}>Gravar</Button>
        <Button variant="secondary" onClick={() => setLinkModal(true)}>Gerar link de pagamento</Button>
        <Button variant="secondary" onClick={() => toast("Enviado para impressão", "info")}>Imprimir orçamento</Button>
        <Button variant="secondary" onClick={() => toast("Enviado para o representante", "info")}>Enviar para representante</Button>
        <Button variant="ghost" onClick={() => window.location.reload()}>Novo</Button>
        <div className="ml-auto text-sm text-muted">
          Total Bruto: <span className="font-bold text-brand">{brl(total)}</span>
        </div>
      </div>

      <Modal
        open={linkModal}
        onClose={() => setLinkModal(false)}
        title="Link de Pagamento"
        subtitle="Compartilhe com o paciente para pagamento remoto."
        footer={
          <>
            <Button variant="secondary" onClick={() => setLinkModal(false)}>Fechar</Button>
            <Button variant="primary" onClick={() => { toast("Link copiado", "success"); setLinkModal(false); }}>Copiar link</Button>
          </>
        }
      >
        <div className="rounded-lg border border-border-soft bg-slate-50 px-3 py-2.5 text-sm text-info break-all">
          https://pay.healthtechops.com.br/l/HIMALNB8-{total}
        </div>
        <p className="mt-2 text-xs text-muted">Válido por 24 horas · Valor {brl(total)}</p>
      </Modal>
    </div>
  );
}
