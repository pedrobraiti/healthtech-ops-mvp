import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/layout/Shell";
import { Badge, Button, Checkbox, Input, Label, Section, Select, StatusBadge, Textarea } from "../components/ui/primitives";
import { Modal } from "../components/ui/Modal";
import { CadastroList, type Column } from "../components/ui/CadastroList";
import { useToast } from "../components/ui/Toast";
import { associadosList, dependentes } from "../data/mock";
import { IconAssociados, IconPlus } from "../components/ui/icons";

type AssociadoRow = (typeof associadosList)[number];
const associadosColumns: Column<AssociadoRow>[] = [
  { key: "nome", header: "Nome", render: (a) => <span className="font-medium text-ink">{a.nome}</span> },
  { key: "cpf", header: "CPF", render: (a) => <span className="font-mono text-[12px] text-muted">{a.cpf}</span> },
  { key: "matricula", header: "Matrícula", render: (a) => <span className="font-mono text-[12px] text-brand">{a.matricula}</span> },
  { key: "cidade", header: "Cidade", render: (a) => <span className="text-muted">{a.cidade}</span> },
  { key: "telefone", header: "Telefone", render: (a) => <span className="font-mono text-[12px] text-muted">{a.telefone}</span> },
  { key: "status", header: "Status", render: (a) => <StatusBadge status={a.status} /> },
];

const duplicados = [
  { nome: "Marcella Grings Lanes", nascimento: "05/03/1994", cidade: "Curitiba", uf: "PR" },
  { nome: "Marcella G. Lanes", nascimento: "05/03/1994", cidade: "São José dos Pinhais", uf: "PR" },
];

export function CadastroAssociado() {
  const navigate = useNavigate();
  const toast = useToast();
  const [cpf, setCpf] = useState("052.448.409-08");
  const [cpfTouched, setCpfTouched] = useState(false);
  const [dedup, setDedup] = useState(false);
  const [carteirinha, setCarteirinha] = useState(false);
  const [confirmExcluir, setConfirmExcluir] = useState(false);

  function onCpfBlur() {
    if (cpfTouched && cpf.replace(/\D/g, "").length >= 11) setDedup(true);
  }

  return (
    <div className="p-6">
      <PageHeader
        title="Cadastro de Associado"
        actions={
          <>
            <Button variant="secondary" onClick={() => navigate("/atendimentos/novo")}>Cadastro de atendimento</Button>
            <Button variant="secondary" onClick={() => setCarteirinha(true)}>Carteirinha</Button>
            <Button variant="secondary" onClick={() => toast("Cadastro enviado para impressão", "info")}>Imprimir cadastro</Button>
            <Button variant="secondary" className="text-danger" onClick={() => setConfirmExcluir(true)}>Excluir</Button>
            <Button variant="secondary" onClick={() => toast("Formulário limpo para novo cadastro", "info")}>Novo</Button>
            <Button variant="primary" onClick={() => toast("Cadastro salvo", "success")}>Salvar</Button>
          </>
        }
      />

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[2fr_1fr]">
        <div className="space-y-5">
          {/* Dados Pessoais */}
          <Section icon={<IconAssociados />} title="Dados Pessoais">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <div className="col-span-2 md:col-span-3">
                <Label required>Nome</Label>
                <Input defaultValue="Marcella Grings Lanes" />
              </div>
              <div>
                <Label required>CPF</Label>
                <Input value={cpf} onChange={(e) => { setCpf(e.target.value); setCpfTouched(true); }} onBlur={onCpfBlur} />
              </div>
              <div>
                <Label>RG</Label>
                <Input />
              </div>
              <div>
                <Label>Nascimento</Label>
                <Input defaultValue="05/03/1994" />
              </div>
              <div>
                <Label>Estado Civil</Label>
                <Select><option value="">—</option><option>Solteiro(a)</option><option>Casado(a)</option><option>Outros</option></Select>
              </div>
              <div>
                <Label>Gênero</Label>
                <Select defaultValue="Feminino"><option>Feminino</option><option>Masculino</option><option>Outro</option></Select>
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="email@exemplo.com" />
              </div>
              <div className="col-span-2 md:col-span-3">
                <Label>Nome dos Pais</Label>
                <Input />
              </div>
            </div>
          </Section>

          {/* Endereço */}
          <Section title="Endereço">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div><Label>CEP</Label><Input defaultValue="82.315-010" /></div>
              <div className="col-span-2"><Label>Cidade</Label><Input defaultValue="Curitiba" /></div>
              <div><Label>UF</Label><Input defaultValue="PR" /></div>
              <div><Label>Bairro</Label><Input defaultValue="São Braz" /></div>
              <div className="col-span-2"><Label>Rua</Label><Input defaultValue="Rua Brasilio Cuman" /></div>
              <div><Label>Nº</Label><Input defaultValue="427" /></div>
              <div className="col-span-2 md:col-span-4"><Label>Complemento / Obs</Label><Input defaultValue="Casa 05" /></div>
            </div>
          </Section>

          {/* Contatos */}
          <Section title="Contatos">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Celular</Label><Input placeholder="(00) 00000-0000" /></div>
              <div><Label>Telefone Recado</Label><Input placeholder="(00) 0000-0000" /></div>
              <div><Label>Residencial</Label><Input placeholder="(00) 0000-0000" /></div>
              <div><Label>Comercial</Label><Input placeholder="(00) 0000-0000" /></div>
            </div>
            <div className="mt-3"><Checkbox label="Marketing (Dependente)" /></div>
          </Section>
        </div>

        {/* Coluna direita */}
        <div className="space-y-5">
          <Section title="Registro">
            <div className="rounded-lg border border-border-soft bg-slate-50 p-3">
              <div className="flex items-center justify-between">
                <span className="label">Matrícula</span>
                <Badge tone="success">ATIVO</Badge>
              </div>
              <div className="mt-1 font-mono text-xl font-bold text-ink">5795861</div>
            </div>
            <div className="mt-3">
              <Label>Observações</Label>
              <Textarea />
            </div>
          </Section>

          <Section title="Dependentes" action={<button className="rounded-md p-1 text-brand hover:bg-brand-50"><IconPlus width={18} height={18} /></button>}>
            <div className="space-y-2">
              {dependentes.map((d) => (
                <div key={d.nome} className="flex items-center justify-between rounded-lg border border-border-soft px-3 py-2 text-sm">
                  <span className="text-ink">{d.nome}</span>
                  <Badge>{d.vinculo}</Badge>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Convênios" action={<button className="rounded-md p-1 text-brand hover:bg-brand-50"><IconPlus width={18} height={18} /></button>}>
            <div className="flex flex-col items-center gap-1 py-6 text-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="text-slate-300"><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>
              <span className="text-sm text-muted">Nenhum convênio cadastrado.</span>
              <button className="text-sm font-medium text-info hover:underline">Adicionar convênio</button>
            </div>
          </Section>
        </div>
      </div>

      <div className="mt-5">
        <CadastroList
          title="Associados cadastrados"
          columns={associadosColumns}
          rows={associadosList}
          searchKeys={["nome", "cpf", "matricula", "cidade"]}
          placeholder="Buscar por nome, CPF ou matrícula…"
          onRowClick={(a) => toast(`Abrindo cadastro de ${a.nome}`, "info")}
        />
      </div>

      {/* Carteirinha do associado */}
      <Modal
        open={carteirinha}
        onClose={() => setCarteirinha(false)}
        title="Carteirinha do Associado"
        subtitle="Versão digital — a física pode ser emitida na recepção."
        footer={
          <>
            <Button variant="secondary" onClick={() => setCarteirinha(false)}>Fechar</Button>
            <Button variant="primary" onClick={() => toast("Carteirinha enviada para impressão", "info")}>Imprimir carteirinha</Button>
          </>
        }
      >
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-700 via-brand to-teal-500 p-5 text-white shadow-lg">
          <div className="pointer-events-none absolute -right-10 -top-14 h-44 w-44 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-white/5" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></svg>
              </span>
              <div className="leading-tight">
                <div className="font-display text-sm font-bold">HealthTech Ops</div>
                <div className="text-[10px] text-white/70">Cartão do Associado</div>
              </div>
            </div>
            <span className="rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide">PLANO PADRÃO</span>
          </div>
          <div className="mt-6 font-display text-lg font-semibold tracking-wide">MARCELLA GRINGS LANES</div>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <div className="text-[9px] uppercase tracking-widest text-white/60">Matrícula</div>
              <div className="font-mono text-base font-semibold tracking-widest">5795861</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest text-white/60">Desde</div>
              <div className="font-mono text-sm">03/2024</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-widest text-white/60">Validade</div>
              <div className="font-mono text-sm">12/2027</div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-muted">Apresente com documento oficial com foto no atendimento.</p>
      </Modal>

      {/* Confirmação de exclusão */}
      <Modal
        open={confirmExcluir}
        onClose={() => setConfirmExcluir(false)}
        title="Excluir cadastro"
        subtitle="Esta ação não pode ser desfeita."
        footer={
          <>
            <Button variant="secondary" onClick={() => setConfirmExcluir(false)}>Cancelar</Button>
            <Button variant="danger" onClick={() => { setConfirmExcluir(false); toast("Cadastro excluído (simulação)", "success"); }}>Excluir definitivamente</Button>
          </>
        }
      >
        <p className="text-sm text-ink">
          Excluir o cadastro de <strong>Marcella Grings Lanes</strong> (matrícula <span className="font-mono">5795861</span>)?
          O histórico de atendimentos será mantido para fins fiscais.
        </p>
      </Modal>

      {/* Modal de deduplicação */}
      <Modal
        open={dedup}
        onClose={() => setDedup(false)}
        width="max-w-2xl"
        title="Foi encontrada mais de uma pessoa com este mesmo CPF"
        subtitle="Selecione a pessoa correta para continuar o cadastro."
      >
        <div className="overflow-hidden rounded-lg border border-border-soft">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-muted">
                <th className="px-4 py-2 font-semibold">Nome</th>
                <th className="px-4 py-2 font-semibold">Nascimento</th>
                <th className="px-4 py-2 font-semibold">Cidade</th>
                <th className="px-4 py-2 font-semibold">UF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-soft">
              {duplicados.map((p) => (
                <tr key={p.nome} onClick={() => { setDedup(false); toast(`Selecionado: ${p.nome}`, "success"); }} className="cursor-pointer hover:bg-brand-50/50">
                  <td className="px-4 py-2.5 font-medium text-ink">{p.nome}</td>
                  <td className="px-4 py-2.5 text-muted">{p.nascimento}</td>
                  <td className="px-4 py-2.5 text-muted">{p.cidade}</td>
                  <td className="px-4 py-2.5 text-muted">{p.uf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
}
