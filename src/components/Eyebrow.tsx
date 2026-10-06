import type { ReactNode } from "react";
import { Snowflake } from "lucide-react";

export function Eyebrow({
  children,
  className = "",
  framed = false,
  trailingIcon = false,
}: {
  children: ReactNode;
  className?: string;
  framed?: boolean;
  trailingIcon?: boolean;
}) {
  return (
    <span
      className={`inline-flex w-fit items-center gap-2 align-middle ${framed ? "text-base" : "text-xs"} font-medium leading-none text-foreground ${className}`}
    >
      <Snowflake className="block size-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
      {framed ? (
        <span className="inline-flex min-h-6 items-center">{children}</span>
      ) : (
        <span className="inline-flex items-center gap-0.5">
          {(children === "Popular now" ? ["Popular", "Now"] : [children]).map((label, index) => (
            <span
              key={index}
              className="inline-flex min-h-6 items-center rounded-full border border-foreground/70 px-2 py-1 leading-none"
            >
              {label}
            </span>
          ))}
        </span>
      )}
      {(framed || trailingIcon) && (
        <Snowflake className="block size-3.5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
      )}
    </span>
  );
}
