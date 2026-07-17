# HealthTech Ops — MVP de Frontend

Painel de operação de uma **facilitadora de saúde** (agenda consultas/exames em clínicas parceiras, cobra e emite a guia). Ferramenta **interna, desktop-first**, em português do Brasil. Este repositório é um **protótipo de frontend** — sem backend, banco ou integrações reais; todos os dados são mockados.

## Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v4
- React Router

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em **http://localhost:5173** (inicia na tela de Login → `Entrar` leva ao Dashboard).

## Telas implementadas

| Rota | Tela |
|---|---|
| `/login` | Login |
| `/dashboard` | Visão Geral |
| `/agenda` | Agenda Operacional (grade por especialista + lista de espera) |
| `/atendimentos` | Localizar Atendimento |
| `/atendimentos/novo` | Agendar Atendimento |
| `/atendimentos/:id` | Detalhe do Atendimento (abas + pré-cancelamento) |
| `/atendimentos/:id/guia` | E-Guia (folha A4 imprimível) |
| `/associados` | Cadastro de Associado (+ modal de deduplicação por CPF) |
| `/parceiros` | Cadastro de Parceiro (+ modal de Alíquotas de Restituição) |
| `/procedimentos` | Pesquisa de Procedimentos |
| `/caixa` | Frente de Caixa (PDV) + modais de Sangria/Suprimento |
| `/caixa/resumo` | Resumo de Caixa |

## Design system

Tokens definidos em `src/index.css` (`@theme`): marca teal `#0F766E`, fundo `#F5F7FA`, e as cores de status (agendado/azul, impresso/âmbar, pago/verde, cancelado/cinza, restituído/roxo, pendente/vermelho). Data canônica do protótipo: **04/07/2026**.

## Estrutura

```
src/
  components/ui/        primitivos (Button, Input, Card, Modal, Tabs, Badge, Toast…)
  components/layout/    Shell, Sidebar, Topbar
  data/mock.ts          dados fictícios (fonte única)
  pages/                uma tela por arquivo
```
