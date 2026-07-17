import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { cx } from "../../lib/format";

type ToastKind = "success" | "error" | "info";
interface ToastItem {
  id: number;
  kind: ToastKind;
  message: string;
}

const ToastContext = createContext<(message: string, kind?: ToastKind) => void>(() => {});

export function useToast() {
  return useContext(ToastContext);
}

let counter = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const push = useCallback((message: string, kind: ToastKind = "success") => {
    const id = counter++;
    setItems((prev) => [...prev, { id, kind, message }]);
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), 3200);
  }, []);

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2">
        {items.map((t) => (
          <div
            key={t.id}
            className={cx(
              "animate-toast pop-shadow flex items-center gap-2.5 rounded-lg border bg-white px-4 py-3 text-sm font-medium",
              t.kind === "success" && "border-success/30 text-ink",
              t.kind === "error" && "border-danger/30 text-ink",
              t.kind === "info" && "border-info/30 text-ink"
            )}
          >
            <span
              className={cx(
                "flex h-5 w-5 items-center justify-center rounded-full text-xs text-white",
                t.kind === "success" && "bg-success",
                t.kind === "error" && "bg-danger",
                t.kind === "info" && "bg-info"
              )}
            >
              {t.kind === "success" ? "✓" : t.kind === "error" ? "!" : "i"}
            </span>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
