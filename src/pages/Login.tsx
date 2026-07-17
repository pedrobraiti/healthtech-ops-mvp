import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Input, Label } from "../components/ui/primitives";
import { IconShield } from "../components/ui/icons";

export function Login() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState("Marcella.cl");
  const [pass, setPass] = useState("operador2026");

  function entrar(e: React.FormEvent) {
    e.preventDefault();
    navigate("/dashboard");
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-app px-4">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-50 via-app to-teal-50" />
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl" />

      <div className="relative w-full max-w-[400px]">
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white card-shadow">
            <IconShield width={28} height={28} />
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-ink">HealthTech Ops</div>
            <div className="text-xs text-muted">Operador Interno</div>
          </div>
        </div>

        <div className="pop-shadow rounded-2xl border border-border-soft bg-white p-7">
          <h1 className="text-xl font-semibold text-ink">Bem-vindo ao Sistema</h1>
          <p className="mt-1 text-sm text-muted">Insira suas credenciais para acessar.</p>

          <form onSubmit={entrar} className="mt-6 space-y-4">
            <div>
              <Label>Usuário</Label>
              <Input value={user} onChange={(e) => setUser(e.target.value)} placeholder="Digite seu usuário" autoFocus />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="label">Senha</span>
                <button type="button" className="text-xs font-medium text-info hover:underline">
                  Esqueci minha senha
                </button>
              </div>
              <div className="relative">
                <Input
                  type={show ? "text" : "password"}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Digite sua senha"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-ink"
                  aria-label="Mostrar senha"
                >
                  {show ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8" /><path d="M9.4 5.2A9.5 9.5 0 0112 5c6 0 9 7 9 7a15 15 0 01-3 3.6M6 6.5A15 15 0 003 12s3 7 9 7a9 9 0 004-.9" /></svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></svg>
                  )}
                </button>
              </div>
            </div>

            <Checkbox label="Lembre-se de mim" defaultChecked />

            <div className="space-y-2 pt-1">
              <Button type="submit" variant="primary" className="w-full">
                Entrar
              </Button>
              <Button type="button" variant="secondary" className="w-full" onClick={() => { setUser(""); setPass(""); }}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">v3.0 · onCPL</p>
      </div>
    </div>
  );
}
