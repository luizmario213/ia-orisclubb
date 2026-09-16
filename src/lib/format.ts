// Formatação numérica padrão BR, centralizada — usada por todo o painel admin (e por
// qualquer tela nova) em vez de `.toFixed(2)` cru (que gera "1234.56" em vez de
// "1.234,56"). Mesma lógica que já existia solta em dashboard/gestao/page.tsx,
// só que compartilhada agora.

export function formatBRL(v: number | null | undefined): string {
  if (v === null || v === undefined || isNaN(v)) return "—";
  return v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Compacto pra números grandes em headline (ex: MRR) — "R$ 12.480,00" continua por
// extenso até um teto razoável; acima disso vira "R$ 128,4 mil" pra não estourar layout.
export function formatBRLCompact(v: number | null | undefined): string {
  if (v === null || v === undefined || isNaN(v)) return "—";
  if (Math.abs(v) < 100000) return formatBRL(v);
  return `R$ ${(v / 1000).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} mil`;
}

export function formatNumberBR(v: number | null | undefined): string {
  if (v === null || v === undefined || isNaN(v)) return "—";
  return v.toLocaleString("pt-BR");
}

export function formatPercent(v: number | null | undefined, signed = false): string {
  if (v === null || v === undefined || isNaN(v)) return "—";
  const sign = signed && v >= 0 ? "+" : "";
  return `${sign}${v.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
}

export function formatDateBR(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export function formatDateTimeBR(iso: string | null | undefined): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Dias até (ou desde, se negativo) uma data ISO — usado pra "renova em Xd" / "venceu há Xd".
export function diasAte(iso: string | null | undefined): number | null {
  if (!iso) return null;
  const ms = new Date(iso).getTime() - Date.now();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}
