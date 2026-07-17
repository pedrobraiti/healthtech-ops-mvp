import { useCountUp } from "../../lib/hooks";
import { brl } from "../../lib/format";

export function CountInt({ value }: { value: number }) {
  const v = useCountUp(value, 900);
  return <>{Math.round(v).toLocaleString("pt-BR")}</>;
}

export function CountMoney({ value }: { value: number }) {
  const v = useCountUp(value, 900);
  return <>{brl(v)}</>;
}
