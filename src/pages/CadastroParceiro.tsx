import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/layout/Shell";
import { Badge, Button, Checkbox, Input, Label, Radio, Section, Select, StatusBadge } from "../components/ui/primitives";
import { Modal } from "../components/ui/Modal";
import { CadastroList, type Column } from "../components/ui/CadastroList";
import { useToast } from "../components/ui/Toast";
import { especialistasParceiro, parceirosList } from "../data/mock";
import { IconParceiros, IconDownload, IconFile, IconPlus } from "../components/ui/icons";

const aliquotas = [
  { faixa: "Sociedade / Cooperado", repasse: "70%", retencao: "30%" },
  { faixa: "Mensalidade", repasse: "85%", retencao: "15%" },
  { faixa: "Preço Cheio (Particular)", repasse: "60%", retencao: "40%" },
];

type ParceiroRow = (typeof parceirosList)[number];
const parceirosColumns: Column<ParceiroRow>[] = [
  { key: "fantasia", header: "Nome Fantasia", render: (p) => <span className="font-medium text-ink">{p.fantasia}</span> },
  { key: "categoria", header: "Categoria", render: (p) => <span className="text-muted">{p.categoria}</span> },
  { key: "cidade", header: "Cidade", render: (p) => <span className="text-muted">{p.cidade}</span> },
  { key: "especialistas", header: "Especialistas", align: "center", render: (p) => <span className="font-mono text-[12px] text-ink">{p.especialistas}</span> },
  { key: "status", header: "Status", render: (p) => <StatusBadge status={p.status} /> },
];

export function CadastroParceiro() {
  const toast = useToast();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [canais, setCanais] = useState(false);
  const [canalWhats, setCanalWhats] = useState(true);
  const [canalSms, setCanalSms] = useState(false);
  const [canalEmail, setCanalEmail] = useState(true);

  return (
    <div className="p-6">
      <PageHeader
        title={<span className="flex items-center gap-2"><IconParceiros className="text-brand" /> Cadastro de Parceiro</span>}
        subtitle="Gerencie os dados e integrações da clínica ou profissional parceiro."
        actions={
          <>
            <Button variant="secondary">Novo</Button>
            <Button variant="secondary" className="text-danger">Excluir</Button>
            <Button variant="primary" onClick={() => toast("Parceiro salvo", "success")}>Salvar</Button>
          </>
        }
      />

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-5">
          {/* Identificação */}
          <Section icon={<IconParceiros />} title="Identificação">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>CPF/CNPJ</Label><Input placeholder="00.000.000/0001-00" /></div>
              <div><Label>Razão Social</Label><Input placeholder="Nome completo da empresa" /></div>
              <div><Label>Nome Fantasia</Label><Input /></div>
              <div><Label>Email Principal</Label><Input defaultValue="contato@parceiro.com.br" /></div>
              <div>
                <Label>Categoria</Label>
                <Select defaultValue="Clínica Médica"><option>Clínica Médica</option><option>Laboratório</option><option>Diagnóstico por Imagem</option></Select>
              </div>
              <div>
                <Label>Público</Label>
                <div className="flex h-9 items-center gap-4"><Radio name="publico" label="Sim" /><Radio name="publico" label="Não" defaultChecked /></div>
              </div>
              <div>
                <Label>Status</Label>
                <div className="flex h-9 items-center"><Badge tone="success">● Ativo</Badge></div>
              </div>
            </div>
          </Section>

          {/* Endereço */}
          <Section
            title="Endereço Principal"
            action={
              <div className="flex gap-3">
                <button onClick={() => toast("Múltiplos endereços disponíveis na versão completa", "info")} className="text-xs font-medium text-brand hover:underline">+ Endereços</button>
                <button
                  onClick={() => window.open("https://www.google.com/maps/search/?api=1&query=Rua+Rui+Barbosa+868+Campo+Largo+PR", "_blank", "noopener")}
                  className="text-xs font-medium text-info hover:underline"
                >
                  Ver no Maps
                </button>
              </div>
            }
          >
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div><Label>CEP</Label><Input placeholder="00000-000" /></div>
              <div className="col-span-2"><Label>Logradouro</Label><Input /></div>
              <div><Label>Nº</Label><Input /></div>
              <div><Label>Bairro</Label><Input /></div>
              <div><Label>Cidade</Label><Input /></div>
              <div><Label>UF</Label><Select defaultValue="SP"><option>SP</option><option>PR</option><option>RJ</option></Select></div>
            </div>
          </Section>

          {/* Especialistas */}
          <Section
            title="Especialistas"
            action={<Checkbox label="Somente ativos" defaultChecked />}
          >
            <div className="overflow-hidden rounded-lg border border-border-soft">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-muted">
                    <th className="px-4 py-2 font-semibold">Nome</th>
                    <th className="px-4 py-2 font-semibold">Especialidade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft">
                  {especialistasParceiro.map((e) => (
                    <tr key={e.nome} className="hover:bg-slate-50/60">
                      <td className="px-4 py-2.5"><span className="flex items-center gap-2 font-medium text-ink"><span className="h-2 w-2 rounded-full bg-success" />{e.nome}</span></td>
                      <td className="px-4 py-2.5 text-muted">{e.esp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button onClick={() => navigate("/especialistas")} className="mt-3 flex items-center gap-1.5 text-sm font-medium text-brand hover:underline"><IconPlus width={15} height={15} /> Vincular Especialista</button>
          </Section>

          {/* Dados Bancários + Telefones */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Section title="Dados Bancários">
              <div className="space-y-4">
                <div><Label>Banco</Label><Select defaultValue="001"><option value="001">001 - Banco do Brasil S.A.</option><option>237 - Bradesco</option><option>341 - Itaú</option></Select></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Tipo</Label><Select defaultValue="Corrente"><option>Corrente</option><option>Poupança</option></Select></div>
                  <div><Label>Agência</Label><Input placeholder="0000-0" /></div>
                </div>
                <div><Label>Conta</Label><Input placeholder="00000-0" /></div>
              </div>
            </Section>
            <Section title="Telefones">
              <div className="space-y-4">
                <div><Label>Telefone Principal</Label><Input placeholder="(00) 0000-0000" /></div>
                <div><Label>Telefone Secundário</Label><Input placeholder="(00) 0000-0000" /></div>
                <div><Label>WhatsApp / Recado</Label><Input placeholder="(00) 00000-0000" /></div>
              </div>
            </Section>
          </div>
        </div>

        {/* Coluna direita */}
        <div className="space-y-5">
          {/* Configuração Financeira — destaque âmbar */}
          <div className="card-shadow overflow-hidden rounded-xl border-2 border-warn/40 bg-gradient-to-br from-warn-50 to-amber-50/50">
            <div className="flex items-center gap-2 border-b border-warn/20 px-4 py-3">
              <span className="text-warn"><IconMoneyBag /></span>
              <h3 className="text-[15px] font-semibold text-amber-900">Configuração Financeira</h3>
            </div>
            <div className="p-4">
              <p className="text-[13px] text-amber-800">Defina as regras de repasse para este parceiro. É aqui que vive a precificação (sociedade / mensalidade / preço cheio).</p>
              <button onClick={() => setModal(true)} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-warn/40 bg-white px-4 py-2 text-sm font-semibold text-warn hover:bg-warn-50">
                <IconMoneyBag /> Alíquotas de Restituição
              </button>
            </div>
          </div>

          <Section title="Comunicação">
            <button onClick={() => setCanais(true)} className="flex w-full items-center justify-between rounded-lg border border-border-soft px-3 py-2.5 text-sm text-ink hover:bg-slate-50">
              Canais de Notificações
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 18l6-6-6-6" /></svg>
            </button>
            <p className="mt-2 text-[11px] text-muted">Define como o parceiro é avisado sobre novos agendamentos.</p>
          </Section>

          <Section title="GED" action={<button className="rounded-md p-1 text-brand hover:bg-brand-50"><IconPlus width={18} height={18} /></button>}>
            <div className="space-y-2">
              {["Contrato_Prestacao_Servicos_2026.pdf", "Alvara_Sanitario_Validade.jpg"].map((f) => (
                <div key={f} className="flex items-center justify-between rounded-lg border border-border-soft px-3 py-2 text-sm">
                  <span className="flex min-w-0 items-center gap-2"><IconFile width={16} height={16} className="shrink-0 text-muted" /><span className="truncate text-ink">{f}</span></span>
                  <button className="rounded p-1 text-slate-400 hover:text-brand"><IconDownload width={16} height={16} /></button>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </div>

      <div className="mt-5">
        <CadastroList
          title="Parceiros cadastrados"
          columns={parceirosColumns}
          rows={parceirosList}
          searchKeys={["fantasia", "categoria", "cidade"]}
          placeholder="Buscar por nome, categoria ou cidade…"
          onRowClick={(p) => toast(`Abrindo cadastro de ${p.fantasia}`, "info")}
        />
      </div>

      {/* Canais de Notificações */}
      <Modal
        open={canais}
        onClose={() => setCanais(false)}
        title="Canais de Notificações"
        subtitle="Como este parceiro recebe avisos de novos agendamentos."
        footer={
          <>
            <Button variant="secondary" onClick={() => setCanais(false)}>Cancelar</Button>
            <Button variant="primary" onClick={() => { setCanais(false); toast("Canais de notificação salvos", "success"); }}>Salvar canais</Button>
          </>
        }
      >
        <div className="divide-y divide-border-soft">
          {[
            { label: "WhatsApp", desc: "Mensagem no número principal do parceiro", on: canalWhats, set: setCanalWhats },
            { label: "SMS", desc: "Fallback quando o WhatsApp não confirmar entrega", on: canalSms, set: setCanalSms },
            { label: "E-mail", desc: "Resumo diário da agenda do dia seguinte", on: canalEmail, set: setCanalEmail },
          ].map((c) => (
            <div key={c.label} className="flex items-center justify-between py-3">
              <div>
                <div className="text-sm font-medium text-ink">{c.label}</div>
                <div className="text-xs text-muted">{c.desc}</div>
              </div>
              <button
                role="switch"
                aria-checked={c.on}
                onClick={() => c.set((v: boolean) => !v)}
                className={c.on ? "h-6 w-11 shrink-0 rounded-full bg-brand p-0.5 transition-colors" : "h-6 w-11 shrink-0 rounded-full bg-slate-300 p-0.5 transition-colors"}
              >
                <span className={c.on ? "block h-5 w-5 translate-x-5 rounded-full bg-white transition-transform" : "block h-5 w-5 rounded-full bg-white transition-transform"} />
              </button>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        width="max-w-xl"
        title="Alíquotas de Restituição"
        subtitle="Regras de repasse aplicadas na cobrança deste parceiro."
        footer={<><Button variant="secondary" onClick={() => setModal(false)}>Fechar</Button><Button variant="primary" onClick={() => { toast("Alíquotas salvas", "success"); setModal(false); }}>Salvar alíquotas</Button></>}
      >
        <div className="overflow-hidden rounded-lg border border-border-soft">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-muted">
                <th className="px-4 py-2 font-semibold">Faixa / Modalidade</th>
                <th className="px-4 py-2 text-center font-semibold">Repasse</th>
                <th className="px-4 py-2 text-center font-semibold">Retenção</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {aliquotas.map((a) => (
                <tr key={a.faixa}>
                  <td className="px-4 py-2.5 font-medium text-ink">{a.faixa}</td>
                  <td className="px-4 py-2.5 text-center font-semibold text-success">{a.repasse}</td>
                  <td className="px-4 py-2.5 text-center font-semibold text-warn">{a.retencao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
}

function IconMoneyBag() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M9 3h6l-1.5 3h-3z" /><path d="M12 6c-4 2-6 5-6 9a6 6 0 0012 0c0-4-2-7-6-9z" /><path d="M12 10v6M10.5 12h2.2a1.3 1.3 0 010 2.6H10.8" /></svg>
  );
}
