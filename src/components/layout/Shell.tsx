import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { cx } from "../../lib/format";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function Shell() {
  const location = useLocation();
  const [dark, setDark] = useState(() => localStorage.getItem("htops-theme") === "dark");

  useEffect(() => {
    localStorage.setItem("htops-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div className={cx("theme-fade flex h-screen overflow-hidden bg-app", dark && "dark")}>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar dark={dark} onToggleTheme={() => setDark((d) => !d)} />
        <main className="flex-1 overflow-y-auto">
          <div key={location.pathname} className="animate-route">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="font-display text-[22px] font-semibold tracking-tight text-ink">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
