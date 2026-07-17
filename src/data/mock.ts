export type Status =
  | "AGENDADO"
  | "IMPRESSO NO CAIXA"
  | "PAGO"
  | "REALIZADO"
  | "CANCELADO"
  | "RESTITUÍDO"
  | "PENDENTE"
  | "URGENTE"
  | "ATIVO"
  | "INATIVO";

export interface Atendimento {
  id: string;
  matricula: string;
  usuario: string;
  status: Status;
  valor: number;
  agenda: string;
}

export const HOJE = "04/07/2026";

export const atendimentos: Atendimento[] = [
  { id: "26730673", matricula: "8050219", usuario: "Ana Beatriz Maciel", status: "IMPRESSO NO CAIXA", valor: 143, agenda: "03/07/2026 15:22" },
  { id: "26712809", matricula: "6212990", usuario: "Ana Carolina Ossowsky", status: "IMPRESSO NO CAIXA", valor: 165, agenda: "10/07/2026 13:30" },
  { id: "26705838", matricula: "2421178", usuario: "Ana Carolina Ribeiro", status: "AGENDADO", valor: 195, agenda: "20/07/2026 08:45" },
  { id: "26677066", matricula: "8040586", usuario: "Ana Beatriz De Lima", status: "IMPRESSO NO CAIXA", valor: 494, agenda: "13/07/2026 10:00" },
  { id: "26654751", matricula: "1157303", usuario: "Ana Paula Marchi", status: "AGENDADO", valor: 166, agenda: "08/07/2026 14:00" },
  { id: "26742169", matricula: "5795861", usuario: "Marcella Grings Lanes", status: "IMPRESSO NO CAIXA", valor: 211, agenda: "22/07/2026 13:10" },
];

export const proximosHorarios = [
  { hora: "14:00", nome: "Maria Silva Oliveira", prof: "Dr. Carlos Mendes", esp: "Cardiologia", status: "AGENDADO" as Status, id: "26742169" },
  { hora: "14:30", nome: "João Pedro Santos", prof: "Dra. Ana Costa", esp: "Ecocardiograma", status: "IMPRESSO NO CAIXA" as Status, id: "26742169" },
  { hora: "15:00", nome: "Lucia Helena", prof: "Dr. Carlos Mendes", esp: "Cardiologia", status: "AGENDADO" as Status, id: "26742169" },
];

export interface AgendaSlot {
  hora: string;
  fim?: string;
  tipo: "livre" | "ocupado" | "bloqueio";
  nome?: string;
  procedimento?: string;
  status?: Status;
  agora?: boolean;
  aviso?: string;
}

export const agendaColunas: {
  especialista: string;
  especialidade: string;
  slots: AgendaSlot[];
}[] = [
  {
    especialista: "Julia de Freitas Azzolini",
    especialidade: "Ecografia",
    slots: [
      { hora: "08:00", tipo: "livre" },
      { hora: "08:30", fim: "09:00", tipo: "ocupado", nome: "Roberto P. Silva", procedimento: "Eco Abdome Total", status: "REALIZADO" },
      { hora: "09:00", tipo: "livre" },
      { hora: "09:30", tipo: "livre" },
      { hora: "10:00", tipo: "livre" },
      { hora: "10:30", tipo: "livre" },
      { hora: "11:00", tipo: "livre" },
      { hora: "11:20", fim: "11:50", tipo: "ocupado", nome: "Ana Beatriz Maciel", procedimento: "Eco Abdome Total", status: "AGENDADO", agora: true },
      { hora: "12:00", tipo: "livre" },
      { hora: "12:30", tipo: "livre" },
      { hora: "13:00", tipo: "livre" },
      { hora: "13:30", tipo: "livre" },
      { hora: "14:00", fim: "15:30", tipo: "bloqueio", aviso: "Bloqueio: Manutenção Equip." },
      { hora: "15:30", tipo: "livre" },
      { hora: "16:00", tipo: "livre" },
      { hora: "16:30", tipo: "livre" },
      { hora: "17:00", tipo: "livre" },
    ],
  },
  {
    especialista: "Carlos Eduardo Lima",
    especialidade: "Cardiologia",
    slots: [],
  },
];

export const listaEspera = [
  { nome: "Marcos Silva", procedimento: "Eco Doppler Carótidas", status: "URGENTE" as Status },
  { nome: "Renata Alves", procedimento: "Ecocardiograma", status: "PENDENTE" as Status },
];

export interface ProcedimentoAtend {
  n: number;
  descricao: string;
  qtd: number;
  valor: number;
}

export const procedimentosAtendimento: ProcedimentoAtend[] = [
  { n: 1, descricao: "Eco Abdome Total", qtd: 1, valor: 113 },
  { n: 2, descricao: "Eco Parede Abdominal", qtd: 1, valor: 98 },
];

export const procedimentosRealizados = [
  { cod: "101", descricao: "Consulta Médica Eletiva", convenio: "Particular", qtd: 1, unit: 150, total: 150 },
  { cod: "342", descricao: "Exame Laboratorial - Hemograma Completo", convenio: "Ciclo Saúde", qtd: 1, unit: 45, total: 45 },
  { cod: "089", descricao: "Taxa de Material Descartável", convenio: "Isento", qtd: 2, unit: 8, total: 16 },
];

export const pesquisaProcedimentos = [
  { procedimento: "Consulta Clínica Geral", parceiro: "Ceccon & Etzel S/S - EPP", regiao: "Centro", valor: 75 },
  { procedimento: "Consulta Clínica Geral", parceiro: "Clínica Working Medicina Trabalho", regiao: "Centro", valor: 48 },
  { procedimento: "Consulta Clínica Geral", parceiro: "Saúde da Família Ltda - IMOC", regiao: "Centro", valor: 60 },
  { procedimento: "Consulta Clínica Geral (a partir de 15 anos)", parceiro: "Mauren Denise Zilli", regiao: "Rebouças", valor: 189 },
  { procedimento: "Consulta Clínica Médica", parceiro: "Humberto Ramon Blanco Rodriguez", regiao: "Curitiba", valor: 162 },
  { procedimento: "Eletrocardiograma (ECG)", parceiro: "Cardio Prime Diagnósticos", regiao: "Zona Sul", valor: 120 },
];

export const formasPagamento = [
  "DINHEIRO",
  "CARTÃO DE CRÉDITO",
  "CARTÃO DE DÉBITO",
  "PIX REMOTO",
  "LINK DE PGTO",
  "TROCA DE GUIA",
  "DESCONTO",
];

export const resumoCaixaFormas = [
  { forma: "PIX REMOTO", qtd: 15, entradas: 1500, saidas: 0, total: 1500 },
  { forma: "DINHEIRO", qtd: 3, entradas: 336, saidas: 0, total: 336 },
  { forma: "CARTÃO DE CRÉDITO", qtd: 5, entradas: 500, saidas: 0, total: 500 },
];

export const resumoCaixaDetalhe = [
  { hora: "08:15", atendimento: "ATD-90210", origem: "Recepção", parcelas: "1/1", valor: 150, motivo: "Pagamento de Consulta - Clínico Geral" },
  { hora: "09:30", atendimento: "ATD-90215", origem: "Recepção", parcelas: "3/3", valor: 450, motivo: "Pacote Exames Laboratoriais" },
  { hora: "10:45", atendimento: "ATD-90222", origem: "Totem", parcelas: "1/1", valor: 80, motivo: "Retorno" },
  { hora: "11:20", atendimento: "ATD-90228", origem: "Recepção", parcelas: "1/1", valor: 200, motivo: "Consulta Especialista" },
];

export const dependentes = [
  { nome: "Marcio Lourenço", vinculo: "Outros" },
  { nome: "Leonel Marchewski", vinculo: "Esposo(a)" },
  { nome: "Wladimir Rafael Ruiz Arias", vinculo: "Esposo(a)" },
];

export const especialistasParceiro = [
  { nome: "Dr. Carlos Silva", esp: "Cardiologia" },
  { nome: "Dra. Ana Beatriz", esp: "Dermatologia" },
  { nome: "Dr. João Pedro", esp: "Ortopedia" },
];

export const eguiaProcedimentos = [
  { qtd: 1, cod: "4.03.16.29-3", descricao: "Estradiol - 17 Beta Estradiol" },
  { qtd: 1, cod: "4.03.01.63-0", descricao: "Creatinina" },
  { qtd: 1, cod: "4.03.16.51-0", descricao: "T3 - Triiodotironina Livre" },
  { qtd: 1, cod: "4.03.16.66-9", descricao: "TGO - AST" },
  { qtd: 1, cod: "4.03.01.20-7", descricao: "Hemograma Completo" },
  { qtd: 1, cod: "4.03.16.20-0", descricao: "Ferritina" },
  { qtd: 1, cod: "4.03.16.03-0", descricao: "FAN - Fator Anti-Nuclear" },
  { qtd: 1, cod: "4.03.16.63-4", descricao: "TSH - Hormônio Tireoestimulante" },
  { qtd: 1, cod: "4.03.01.99-1", descricao: "Glicemia em Jejum" },
];

export const motivosCancelamento = [
  "Paciente desistiu",
  "Erro de agendamento",
  "Duplicidade",
  "Parceiro indisponível",
  "Outro",
];

export const unidades = ["Unidade Matriz", "Unidade Sul", "Unidade Norte"];

/* ---------- Listas de cadastro (tabelas "Excel") ---------- */
export const associadosList = [
  { nome: "Marcella Grings Lanes", cpf: "052.448.409-08", matricula: "5795861", cidade: "Curitiba/PR", telefone: "(41) 99812-4407", status: "ATIVO" as Status },
  { nome: "Ana Beatriz Maciel", cpf: "118.402.559-21", matricula: "8050219", cidade: "Curitiba/PR", telefone: "(41) 99640-1188", status: "ATIVO" as Status },
  { nome: "João Pedro Santos", cpf: "394.220.180-55", matricula: "6212990", cidade: "Campo Largo/PR", telefone: "(41) 99203-7754", status: "ATIVO" as Status },
  { nome: "Ana Carolina Ribeiro", cpf: "701.559.328-04", matricula: "2421178", cidade: "Curitiba/PR", telefone: "(41) 98871-9032", status: "ATIVO" as Status },
  { nome: "Alziro Nogueira de Souza", cpf: "205.667.910-72", matricula: "8040586", cidade: "Pinhais/PR", telefone: "(41) 99567-3320", status: "CANCELADO" as Status },
  { nome: "Ana Paula Marchi", cpf: "630.114.802-19", matricula: "1157303", cidade: "Curitiba/PR", telefone: "(41) 99745-2201", status: "ATIVO" as Status },
];

export const parceirosList = [
  { fantasia: "Ciclo Diagnósticos", categoria: "Clínica Médica", cidade: "Curitiba/PR", especialistas: 8, status: "ATIVO" as Status },
  { fantasia: "Laboratório Hadiak", categoria: "Laboratório", cidade: "Campo Largo/PR", especialistas: 4, status: "ATIVO" as Status },
  { fantasia: "Ceccon & Etzel S/S", categoria: "Clínica Médica", cidade: "Curitiba/PR", especialistas: 6, status: "ATIVO" as Status },
  { fantasia: "Cardio Prime Diagnósticos", categoria: "Diagnóstico por Imagem", cidade: "Curitiba/PR", especialistas: 3, status: "ATIVO" as Status },
  { fantasia: "Clínica Working Med. Trabalho", categoria: "Clínica Médica", cidade: "Curitiba/PR", especialistas: 2, status: "CANCELADO" as Status },
];

export interface Especialista {
  nome: string;
  conselho: string;
  especialidade: string;
  tipo: "Médico" | "Enfermeiro" | "Técnico" | "Fisioterapeuta";
  parceiro: string;
  status: Status;
}

export const especialistasList: Especialista[] = [
  { nome: "Dra. Julia de Freitas Azzolini", conselho: "CRM-PR 45.221", especialidade: "Ecografia / Radiologia", tipo: "Médico", parceiro: "Ciclo Diagnósticos", status: "ATIVO" },
  { nome: "Dr. Carlos Eduardo Lima", conselho: "CRM-PR 38.104", especialidade: "Cardiologia", tipo: "Médico", parceiro: "Cardio Prime Diagnósticos", status: "ATIVO" },
  { nome: "Dra. Ana Beatriz Costa", conselho: "CRM-PR 51.933", especialidade: "Dermatologia", tipo: "Médico", parceiro: "Ceccon & Etzel S/S", status: "ATIVO" },
  { nome: "Dr. João Pedro Nogueira", conselho: "CRM-PR 42.780", especialidade: "Ortopedia", tipo: "Médico", parceiro: "Ciclo Diagnósticos", status: "ATIVO" },
  { nome: "Enf. Marina Salles", conselho: "COREN-PR 220.145", especialidade: "Enfermagem / Coleta", tipo: "Enfermeiro", parceiro: "Laboratório Hadiak", status: "ATIVO" },
  { nome: "Téc. Rafael Andrade", conselho: "CRTR-6 9.882", especialidade: "Radiologia (Técnico)", tipo: "Técnico", parceiro: "Cardio Prime Diagnósticos", status: "CANCELADO" },
];

/* ---------- Relatórios ---------- */
export const faturamentoMensal = [
  { mes: "Fev", valor: 38200 },
  { mes: "Mar", valor: 41750 },
  { mes: "Abr", valor: 39980 },
  { mes: "Mai", valor: 47320 },
  { mes: "Jun", valor: 52140 },
  { mes: "Jul", valor: 58730 },
];

export const atendimentosPorStatus: { label: string; valor: number; status: Status }[] = [
  { label: "Pagos", valor: 812, status: "PAGO" },
  { label: "Impressos no caixa", valor: 418, status: "IMPRESSO NO CAIXA" },
  { label: "Agendados", valor: 356, status: "AGENDADO" },
  { label: "Cancelados", valor: 94, status: "CANCELADO" },
];

export const topParceiros = [
  { nome: "Ciclo", valor: 18420 },
  { nome: "Laboratório Hadiak", valor: 14980 },
  { nome: "Ceccon & Etzel", valor: 11250 },
  { nome: "Cardio Prime Diagnósticos", valor: 8730 },
  { nome: "Saúde da Família", valor: 5350 },
];

/* ---------- Financeiro ---------- */
export interface LancamentoFinanceiro {
  id: string;
  descricao: string;
  contraparte: string;
  vencimento: string;
  valor: number;
  status: "PAGO" | "PENDENTE" | "AGENDADO";
}

export const contasReceber: LancamentoFinanceiro[] = [
  { id: "REC-4823", descricao: "Faturamento convênio Ciclo Saúde", contraparte: "Ciclo Saúde (convênio)", vencimento: "15/07/2026", valor: 6840, status: "AGENDADO" },
  { id: "REC-4822", descricao: "Pacote empresarial — exames ocupacionais", contraparte: "Working Medicina do Trabalho", vencimento: "12/07/2026", valor: 4560, status: "PENDENTE" },
  { id: "REC-4821", descricao: "Cobrança de atendimento", contraparte: "Marcella Grings Lanes", vencimento: "05/07/2026", valor: 211, status: "PENDENTE" },
  { id: "REC-4820", descricao: "Pacote Exames Laboratoriais", contraparte: "Ana Carolina Ossowsky", vencimento: "04/07/2026", valor: 494, status: "PAGO" },
  { id: "REC-4819", descricao: "Consulta Especialista", contraparte: "Ana Paula Marchi", vencimento: "08/07/2026", valor: 166, status: "AGENDADO" },
  { id: "REC-4818", descricao: "Retorno", contraparte: "João Pedro Santos", vencimento: "03/07/2026", valor: 80, status: "PAGO" },
];

export const contasPagar: LancamentoFinanceiro[] = [
  { id: "REP-2210", descricao: "Repasse de procedimentos", contraparte: "Ciclo", vencimento: "10/07/2026", valor: 4820, status: "PENDENTE" },
  { id: "REP-2209", descricao: "Repasse de exames", contraparte: "Laboratório Hadiak", vencimento: "10/07/2026", valor: 3210, status: "PENDENTE" },
  { id: "REP-2208", descricao: "Repasse de consultas", contraparte: "Ceccon & Etzel", vencimento: "05/07/2026", valor: 1890, status: "PAGO" },
];
