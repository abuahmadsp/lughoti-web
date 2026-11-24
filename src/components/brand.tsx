import { cn } from "@/lib/cn";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-10 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-950 text-sand-100 shadow-lg shadow-emerald-900/25 ring-1 ring-emerald-900/20",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1/2 bg-white/10"
      />
      <span className="font-arabic -mt-1 text-[22px] leading-none">ل</span>
      <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-sand-300" />
    </span>
  );
}

export function Brand({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <BrandMark />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-bold tracking-tight">Lughati</span>
        <span className="font-arabic mt-1 text-[11px] leading-none text-muted">
          لُغَتِي
        </span>
      </span>
    </span>
  );
}
