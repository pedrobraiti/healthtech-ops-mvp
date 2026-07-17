import { PageHeader } from "../components/layout/Shell";
import { Badge, Button, Input, Label, Section, Select, StatusBadge } from "../components/ui/primitives";
import { CadastroList, type Column } from "../components/ui/CadastroList";
import { useToast } from "../components/ui/Toast";
import { especialistasList, type Especialista } from "../data/mock";
import { IconStetho } from "../components/ui/icons";

const columns: Column<Especialista>[] = [
  { key: "nome", header: "Nome", render: (e) => <span className="font-medium text-ink">{e.nome}</span> },
  { key: "conselho", header: "Conselho / Registro", render: (e) => <span className="font-mono text-[12px] text-muted">{e.conselho}</span> },
  { key: "especialidade", header: "Especialidade", render: (e) => <span className="text-muted">{e.especialidade}</span> },
  { key: "tipo", header: "Tipo", render: (e) => <Badge tone="brand">{e.tipo}</Badge> },
  { key: "parceiro", header: "Parceiro vinculado", render: (e) => <span className="text-muted">{e.parceiro}</span> },
  { key: "status", header: "Status", render: (e) => <StatusBadge status={e.status} /> },
];

export function CadastroEspecialista() {
  const toast = useToast();

  return (
    <div className="space-y-5 p-6">
      <PageHeader
        title={<span className="flex items-center gap-2"><IconStetho className="text-brand" /> Especialistas</span>}
        subtitle="Cadastre os profissionais que realizam os atendimentos (médicos, enfermeiros e técnicos)."
        actions={
          <>
            <Button variant="secondary">Novo</Button>
            <Button variant="secondary" className="text-danger">Excluir</Button>
            <Button variant="primary" onClick={() => toast("Especialista salvo", "success")}>Salvar</Button>
          </>
        }
      />

      <Section icon={<IconStetho />} title="Dados do Profissional">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          <div className="col-span-2 md:col-span-2">
            <Label required>Nome completo</Label>
            <Input placeholder="Ex.: Dra. Julia de Freitas Azzolini" />
          </div>
          <div>
            <Label required>Tipo</Label>
            <Select><option>Médico</option><option>Enfermeiro</option><option>Técnico</option><option>Fisioterapeuta</option></Select>
          </div>
          <div>
            <Label>Conselho / Registro</Label>
            <Input placeholder="CRM-PR 00.000" />
          </div>
          <div>
            <Label required>Especialidade</Label>
            <Input placeholder="Ex.: Cardiologia" />
          </div>
          <div>
            <Label>Status</Label>
            <Select><option>Ativo</option><option>Inativo</option></Select>
          </div>
          <div>
            <Label>Parceiro vinculado</Label>
            <Select><option>Ciclo Diagnósticos</option><option>Laboratório Hadiak</option><option>Ceccon &amp; Etzel S/S</option><option>Cardio Prime Diagnósticos</option></Select>
          </div>
          <div>
            <Label>E-mail</Label>
            <Input type="email" placeholder="profissional@parceiro.com.br" />
          </div>
          <div>
            <Label>Telefone / WhatsApp</Label>
            <Input placeholder="(00) 00000-0000" />
          </div>
        </div>
      </Section>

      <CadastroList
        title="Especialistas cadastrados"
        columns={columns}
        rows={especialistasList}
        searchKeys={["nome", "especialidade", "parceiro", "conselho"]}
        placeholder="Buscar por nome, especialidade ou parceiro…"
        onRowClick={(e) => toast(`Editando ${e.nome}`, "info")}
      />
    </div>
  );
}
