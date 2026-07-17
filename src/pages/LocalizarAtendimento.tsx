import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageHeader } from "../components/layout/Shell";
import { Badge, Button, Card, Checkbox, Input, Label, Select, StatusBadge } from "../components/ui/primitives";
import { atendimentos } from "../data/mock";
import { brl } from "../lib/format";
import { IconDots, IconSearch } from "../components/ui/icons";

export function LocalizarAtendimento() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [termo, setTermo] = useState(params.get("q") ?? "");
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const filtrados = termo
    ? atendimentos.filter((a) => (a.usuario + a.matricula + a.id).toLowerCase().includes(termo.toLowerCase()))
    : atendimentos.slice(0, 5);

  return (
    <div className="p-6">
      <PageHeader title="Localizar Atendimento" subtitle="Pesquise e gerencie os registros de atendimentos realizados ou agendados." />

      <Card className="mt-5 p-4">
        <div className="grid grid-cols-1 items-end gap-3 md:grid-cols-[220px_1fr_auto]">
          <div>
            <Label>Critério</Label>
            <Select>
              <option>Nome ou Matrícula</option>
              <option>Nº do Atendimento</option>
              <option>CPF</option>
            </Select>
          </div>
          <div>
            <Label>Termo de busca</Label>
            <Input icon={<IconSearch width={16} height={16} />} value={termo} onChange={(e) => setTermo(e.target.value)} placeholder="Digite para buscar…" />
          </div>
          <Button variant="primary"><IconSearch width={16} height={16} /> Buscar</Button>
        </div>
        <div className="mt-3">
          <Checkbox label="Listar apenas atendimentos com datas a partir de hoje" defaultChecked />
        </div>
      </Card>

      <Card className="mt-5">
        <div className="flex items-center justify-between border-b border-border-soft px-4 py-3">
          <h3 className="text-[15px] font-semibold text-ink">Resultados da Busca</h3>
          <Badge tone="info">{filtrados.length} registros encontrados</Badge>
        </div>
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-slate-50 text-left text-[11px] uppercase tracking-wide text-muted">
              <th className="px-4 py-2.5 font-semibold">Atendimento</th>
              <th className="px-4 py-2.5 font-semibold">Matrícula</th>
              <th className="px-4 py-2.5 font-semibold">Usuário</th>
              <th className="px-4 py-2.5 font-semibold">Status</th>
              <th className="px-4 py-2.5 text-right font-semibold">Valor</th>
              <th className="px-4 py-2.5 font-semibold">Agenda</th>
              <th className="w-12 px-4 py-2.5 text-center font-semibold">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-soft">
            {filtrados.map((a) => (
              <tr key={a.id} className="cursor-pointer hover:bg-slate-50/60" onClick={() => navigate(`/atendimentos/${a.id}`)}>
                <td className="px-4 py-3 font-mono text-[12.5px] font-semibold text-brand">{a.id}</td>
                <td className="px-4 py-3 font-mono text-[12.5px] text-muted">{a.matricula}</td>
                <td className="px-4 py-3 font-medium text-ink">{a.usuario}</td>
                <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                <td className="px-4 py-3 text-right tabular-nums">{brl(a.valor)}</td>
                <td className="px-4 py-3 text-muted">{a.agenda}</td>
                <td className="px-4 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                  <div className="relative inline-block">
                    <button onClick={() => setOpenMenu(openMenu === a.id ? null : a.id)} className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-ink">
                      <IconDots width={16} height={16} />
                    </button>
                    {openMenu === a.id && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setOpenMenu(null)} />
                        <div className="pop-shadow absolute right-0 z-20 mt-1 w-36 rounded-lg border border-border-soft bg-white py-1 text-left text-sm">
                          <button onClick={() => navigate(`/atendimentos/${a.id}`)} className="w-full px-3 py-1.5 text-left hover:bg-slate-50">Abrir</button>
                          <button onClick={() => navigate(`/atendimentos/${a.id}/guia`)} className="w-full px-3 py-1.5 text-left hover:bg-slate-50">2ª via</button>
                          <button onClick={() => navigate(`/atendimentos/${a.id}`)} className="w-full px-3 py-1.5 text-left text-danger hover:bg-danger-50">Cancelar</button>
                        </div>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-muted">Nenhum atendimento encontrado para “{termo}”.</td></tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
