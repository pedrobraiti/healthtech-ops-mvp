import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "../components/layout/Shell";
import { Badge, Button, Checkbox, Input, Label, Section, Select, Textarea } from "../components/ui/primitives";
import { Modal } from "../components/ui/Modal";
import { useToast } from "../components/ui/Toast";
import { dependentes } from "../data/mock";
import { IconAssociados, IconPlus } from "../components/ui/icons";

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
            <Button variant="secondary">Carteirinha</Button>
            <Button variant="secondary">Imprimir cadastro</Button>
            <Button variant="secondary" className="text-danger">Excluir</Button>
            <Button variant="secondary">Novo</Button>
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
              <div className="mt-1 text-xl font-bold text-ink tabular-nums">5795861</div>
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
