/* Julho de 2026 — dia 4 destacado (data canônica do protótipo). 01/07/2026 é uma quarta-feira. */
const WEEK = ["D", "S", "T", "Q", "Q", "S", "S"];
const FIRST_WEEKDAY = 3; // quarta-feira
const DAYS = 31;

export function MiniCalendar({ highlight = 4, compact = false }: { highlight?: number; compact?: boolean }) {
  const cells: (number | null)[] = [];
  for (let i = 0; i < FIRST_WEEKDAY; i++) cells.push(null);
  for (let d = 1; d <= DAYS; d++) cells.push(d);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-ink">Julho 2026</span>
        <div className="flex gap-1">
          <button className="rounded p-0.5 text-muted hover:bg-slate-100">‹</button>
          <button className="rounded p-0.5 text-muted hover:bg-slate-100">›</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-y-1 text-center">
        {WEEK.map((w, i) => (
          <span key={i} className="text-[11px] font-medium text-muted">
            {w}
          </span>
        ))}
        {cells.map((d, i) => (
          <div key={i} className="flex justify-center">
            {d === null ? (
              <span />
            ) : (
              <button
                className={
                  d === highlight
                    ? "flex h-7 w-7 items-center justify-center rounded-full bg-brand text-[12.5px] font-semibold text-white"
                    : `flex h-7 w-7 items-center justify-center rounded-full text-[12.5px] text-ink hover:bg-slate-100 ${compact ? "" : ""}`
                }
              >
                {d}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
