import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/primitives";
import { useToast } from "../components/ui/Toast";
import { eguiaProcedimentos } from "../data/mock";
import { IconChevronLeft, IconDownload, IconPrint, IconShield, IconInfo } from "../components/ui/icons";

export function EGuia() {
  const navigate = useNavigate();
  const toast = useToast();

  return (
    <div className="min-h-screen bg-app py-8">
      {/* barra de ações */}
      <div className="no-print mx-auto mb-6 flex max-w-[820px] items-center justify-between px-4">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink">
          <IconChevronLeft width={16} height={16} /> Voltar
        </button>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => window.print()}><IconPrint width={16} height={16} /> Imprimir</Button>
          <Button variant="primary" onClick={() => { toast("Use “Salvar como PDF” na janela de impressão", "info"); window.print(); }}><IconDownload width={16} height={16} /> Baixar PDF</Button>
        </div>
      </div>

      {/* folha A4 */}
      <div className="print-sheet card-shadow mx-auto max-w-[820px] rounded-lg border border-border-soft bg-white p-10">
        {/* Cabeçalho */}
        <div className="flex items-start justify-between border-b-2 border-brand pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand text-white"><IconShield width={24} height={24} /></div>
            <div>
              <div className="text-xl font-bold text-brand">E-Guia</div>
              <div className="text-xs text-muted">Documento de Autorização</div>
            </div>
          </div>
          <div className="text-right text-xs leading-relaxed text-muted">
            <div>Data de emissão: <span className="font-semibold text-ink">20/06/2026</span></div>
            <div># Atendimento: <span className="font-mono font-semibold text-ink">26.571.732</span></div>
            <div># Chave: <span className="font-mono font-semibold text-brand">HIMALNB8</span></div>
          </div>
        </div>

        {/* Associado */}
        <Bloco titulo="Dados do Associado">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 md:grid-cols-3">
            <Campo label="Nome Completo" valor="Rosilene Leandro Cunha" />
            <Campo label="CPF" valor="101.859.728-02" />
            <Campo label="Nascimento" valor="04/07/1969" />
            <Campo label="Matrícula" valor="4.108.805" />
            <Campo label="Data de agendamento" valor="16/06/2026 10:19" />
          </div>
        </Bloco>

        {/* Parceiro */}
        <Bloco titulo="Local de Atendimento (Parceiro)">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 md:grid-cols-3">
            <Campo label="Razão Social / Fantasia" valor="Laboratório Hadiak" />
            <Campo label="Telefone" valor="(41) 3335-0480" />
            <Campo label="Atendente" valor="Treinamento2" />
            <div className="md:col-span-3"><Campo label="Endereço" valor="Rua Rui Barbosa, 868 — Campo Largo/PR" /></div>
          </div>
        </Bloco>

        {/* Procedimentos */}
        <Bloco titulo="Procedimentos Autorizados">
          <div className="overflow-hidden rounded-lg border border-border-soft">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-muted">
                  <th className="w-14 px-4 py-2 text-center font-semibold">Qtd</th>
                  <th className="w-40 px-4 py-2 font-semibold">Código</th>
                  <th className="px-4 py-2 font-semibold">Descrição</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-soft">
                {eguiaProcedimentos.map((p) => (
                  <tr key={p.cod}>
                    <td className="px-4 py-2 text-center">{p.qtd}</td>
                    <td className="px-4 py-2 font-mono text-[12px] text-muted">{p.cod}</td>
                    <td className="px-4 py-2 font-medium text-ink">{p.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Bloco>

        {/* Preparo */}
        <div className="mt-6 flex gap-3 rounded-lg border-l-4 border-warn bg-warn-50 p-4">
          <IconInfo className="mt-0.5 shrink-0 text-warn" width={18} height={18} />
          <div>
            <div className="text-sm font-semibold text-warn">Preparo do Exame</div>
            <p className="mt-1 text-[13px] leading-relaxed text-amber-800">
              Jejum de 8h a 12h; tomar água 1h antes; evitar alimentos gordurosos na última refeição; tomar dimeticona 60 gotas 3h antes do exame.
              Documento válido por 30 dias a partir da emissão. Apresentar documento oficial com foto no atendimento.
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-border-soft pt-4 text-center text-[11px] text-slate-400">
          HealthTech Ops · Documento gerado eletronicamente · v3.0
        </div>
      </div>
    </div>
  );
}

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <div className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-brand">{titulo}</div>
      {children}
    </div>
  );
}

function Campo({ label, valor }: { label: string; valor: string }) {
  return (
    <div>
      <div className="text-[11px] text-muted">{label}</div>
      <div className="text-sm font-medium text-ink">{valor}</div>
    </div>
  );
}
