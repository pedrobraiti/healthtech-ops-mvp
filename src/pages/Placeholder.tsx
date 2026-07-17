import { PageHeader } from "../components/layout/Shell";
import { Card } from "../components/ui/primitives";
import { IconRelatorios } from "../components/ui/icons";

export function Placeholder({ title }: { title: string }) {
  return (
    <div className="p-6">
      <PageHeader title={title} subtitle="Módulo em construção neste protótipo." />
      <Card className="mt-6 flex flex-col items-center justify-center gap-3 py-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand">
          <IconRelatorios width={26} height={26} />
        </div>
        <div>
          <div className="text-[15px] font-semibold text-ink">{title}</div>
          <p className="mt-1 max-w-md text-sm text-muted">
            Esta seção faz parte do escopo do produto, mas não entra neste MVP de frontend.
          </p>
        </div>
      </Card>
    </div>
  );
}
