import { useContext, useState } from "react";
import { PageHeader, ThemeContext } from "../components/layout/Shell";
import { Button, Input, Label, Section, Select } from "../components/ui/primitives";
import { useToast } from "../components/ui/Toast";
import { cx } from "../lib/format";
import { unidades } from "../data/mock";
import { IconConfig, IconMoon, IconPrint, IconSun } from "../components/ui/icons";

function Toggle({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-ink">{label}</span>
      <button
        role="switch"
        aria-checked={on}
        onClick={onChange}
        className={cx("h-6 w-11 shrink-0 rounded-full p-0.5 transition-colors", on ? "bg-brand" : "bg-slate-300")}
      >
        <span className={cx("block h-5 w-5 rounded-full bg-white transition-transform", on && "translate-x-5")} />
      </button>
    </div>
  );
}

export function Configuracoes() {
  const toast = useToast();
  const { dark, toggle } = useContext(ThemeContext);
  const [notifCaixa, setNotifCaixa] = useState(true);
  const [notifAgenda, setNotifAgenda] = useState(true);
  const [notifEmail, setNotifEmail] = useState(false);

  return (
    <div className="p-6">
      <PageHeader
        title="Configurações"
        subtitle="Preferências do operador, aparência e periféricos desta estação."
        actions={<Button variant="primary" onClick={() => toast("Preferências salvas", "success")}>Salvar alterações</Button>}
      />

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Perfil */}
        <Section icon={<IconConfig />} title="Perfil do Operador">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand to-teal-500 text-lg font-semibold text-white">MC</div>
            <div>
              <div className="text-[15px] font-semibold text-ink">Marcella Cardoso</div>
              <div className="text-xs text-muted">Operador Interno · desde 03/2024</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Usuário</Label>
              <Input defaultValue="Marcella.cl" disabled className="opacity-70" />
            </div>
            <div>
              <Label>Unidade padrão</Label>
              <Select defaultValue={unidades[0]}>
                {unidades.map((u) => <option key={u}>{u}</option>)}
              </Select>
            </div>
            <div className="col-span-2">
              <Label>E-mail</Label>
              <Input type="email" defaultValue="marcella.cl@healthtechops.com.br" />
            </div>
          </div>
        </Section>

        {/* Aparência */}
        <Section title="Aparência">
          <p className="mb-3 text-[13px] text-muted">Escolha o tema da interface. A preferência fica salva nesta estação.</p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => dark && toggle()}
              className={cx(
                "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors",
                !dark ? "border-brand bg-brand-50" : "border-border-soft hover:border-slate-300"
              )}
            >
              <span className={cx("flex h-10 w-10 items-center justify-center rounded-full", !dark ? "bg-brand text-white" : "bg-slate-100 text-muted")}>
                <IconSun width={20} height={20} />
              </span>
              <span className="text-sm font-semibold text-ink">Claro</span>
              <span className="text-[11px] text-muted">Padrão da recepção</span>
            </button>
            <button
              onClick={() => !dark && toggle()}
              className={cx(
                "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors",
                dark ? "border-brand bg-brand-50" : "border-border-soft hover:border-slate-300"
              )}
            >
              <span className={cx("flex h-10 w-10 items-center justify-center rounded-full", dark ? "bg-brand text-white" : "bg-slate-100 text-muted")}>
                <IconMoon width={20} height={20} />
              </span>
              <span className="text-sm font-semibold text-ink">Escuro</span>
              <span className="text-[11px] text-muted">Conforto em turnos longos</span>
            </button>
          </div>
        </Section>

        {/* Notificações */}
        <Section title="Notificações">
          <div className="divide-y divide-border-soft">
            <Toggle on={notifCaixa} onChange={() => setNotifCaixa((v) => !v)} label="Avisar quando um atendimento chegar ao caixa" />
            <Toggle on={notifAgenda} onChange={() => setNotifAgenda((v) => !v)} label="Avisar sobre novos agendamentos e encaixes" />
            <Toggle on={notifEmail} onChange={() => setNotifEmail((v) => !v)} label="Receber resumo diário por e-mail" />
          </div>
        </Section>

        {/* Impressora */}
        <Section icon={<IconPrint />} title="Impressora de Guias">
          <div className="mb-4 flex items-center justify-between rounded-lg border border-border-soft bg-slate-50 px-3 py-2.5">
            <span className="flex items-center gap-2 text-sm font-medium text-ink">
              <span className="h-2 w-2 rounded-full bg-danger" /> Epson TM-T20
            </span>
            <span className="text-xs font-semibold text-danger">INATIVA</span>
          </div>
          <div className="grid grid-cols-2 items-end gap-4">
            <div>
              <Label>Modelo</Label>
              <Select defaultValue="epson">
                <option value="epson">Epson TM-T20</option>
                <option>Bematech MP-4200</option>
                <option>Daruma DR800</option>
              </Select>
            </div>
            <Button variant="secondary" onClick={() => toast("Página de teste enviada à impressora", "info")}>
              Imprimir página de teste
            </Button>
          </div>
        </Section>

        {/* Segurança */}
        <Section title="Segurança">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label>Senha atual</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div>
              <Label>Nova senha</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
            <div>
              <Label>Confirmar nova senha</Label>
              <Input type="password" placeholder="••••••••" />
            </div>
          </div>
          <div className="mt-3 flex justify-end">
            <Button variant="secondary" onClick={() => toast("Senha atualizada", "success")}>Atualizar senha</Button>
          </div>
        </Section>

        {/* Sobre */}
        <Section title="Sobre o sistema">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted">Versão</span><span className="font-mono text-ink">v3.0 · onCPL</span></div>
            <div className="flex justify-between"><span className="text-muted">Ambiente</span><span className="text-ink">Protótipo de demonstração</span></div>
            <div className="flex justify-between"><span className="text-muted">Dados</span><span className="text-ink">Fictícios — nenhum dado real de paciente</span></div>
          </div>
        </Section>
      </div>
    </div>
  );
}
