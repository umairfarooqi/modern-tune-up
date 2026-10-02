import type { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground ${className}`}
    >
      <span className="size-1.5 shrink-0 rounded-full bg-cobalt" aria-hidden="true" />
      {children}
    </span>
  );
}
