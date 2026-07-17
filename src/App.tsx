import { Navigate, Route, Routes } from "react-router-dom";
import { Shell } from "./components/layout/Shell";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Agenda } from "./pages/Agenda";
import { AgendarAtendimento } from "./pages/AgendarAtendimento";
import { DetalheAtendimento } from "./pages/DetalheAtendimento";
import { LocalizarAtendimento } from "./pages/LocalizarAtendimento";
import { FrenteCaixa } from "./pages/FrenteCaixa";
import { ResumoCaixa } from "./pages/ResumoCaixa";
import { CadastroAssociado } from "./pages/CadastroAssociado";
import { CadastroParceiro } from "./pages/CadastroParceiro";
import { PesquisaProcedimentos } from "./pages/PesquisaProcedimentos";
import { EGuia } from "./pages/EGuia";
import { Financeiro } from "./pages/Financeiro";
import { Relatorios } from "./pages/Relatorios";
import { CadastroEspecialista } from "./pages/CadastroEspecialista";
import { Configuracoes } from "./pages/Configuracoes";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/atendimentos/:id/guia" element={<EGuia />} />

      <Route element={<Shell />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/atendimentos" element={<LocalizarAtendimento />} />
        <Route path="/atendimentos/novo" element={<AgendarAtendimento />} />
        <Route path="/atendimentos/:id" element={<DetalheAtendimento />} />
        <Route path="/associados" element={<CadastroAssociado />} />
        <Route path="/associados/:id" element={<CadastroAssociado />} />
        <Route path="/parceiros" element={<CadastroParceiro />} />
        <Route path="/parceiros/:id" element={<CadastroParceiro />} />
        <Route path="/especialistas" element={<CadastroEspecialista />} />
        <Route path="/procedimentos" element={<PesquisaProcedimentos />} />
        <Route path="/financeiro" element={<Financeiro />} />
        <Route path="/financeiro/pdv" element={<FrenteCaixa />} />
        <Route path="/financeiro/resumo" element={<ResumoCaixa />} />
        <Route path="/caixa" element={<Navigate to="/financeiro/pdv" replace />} />
        <Route path="/caixa/resumo" element={<Navigate to="/financeiro/resumo" replace />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
