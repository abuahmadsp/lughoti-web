import { IconArrowUpRight, IconShield } from "./icons";
import { Brand } from "./brand";
import { Container } from "./ui";

const columns = [
  {
    title: "Belajar",
    links: [
      { label: "Kurikulum 12 minggu", href: "#kurikulum" },
      { label: "Pratinjau pelajaran", href: "#pratinjau" },
      { label: "Fitur", href: "#fitur" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Jalur",
    links: [
      { label: "Fushah", href: "#ragam" },
      { label: "Amiyah Saudi", href: "#ragam" },
      { label: "Najdi & Hijazi", href: "#ragam" },
      { label: "Perbandingan frasa", href: "#ragam" },
    ],
  },
  {
    title: "Tentang",
    links: [
      { label: "Filosofi belajar", href: "#cara-belajar" },
      { label: "Status konten", href: "#faq" },
      { label: "Mulai gratis", href: "#daftar" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-line/80 bg-surface/50">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Brand />
            <p className="mt-5 text-sm leading-6 text-muted">
              Belajar bahasa Arab baku dan percakapan Saudi dalam satu alur.
              Dua ragam, satu progres, tanpa kehilangan arah.
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-paper/70 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              <IconShield className="size-3.5 text-emerald-700 dark:text-emerald-300" />
              Konten tahap review
            </span>
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-ink/80 transition-colors hover:text-emerald-700 dark:hover:text-emerald-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line/70 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Lughati. Dibuat untuk pembelajar bahasa Arab di Indonesia.</p>
          <div className="flex items-center gap-4">
            <span className="font-arabic text-sm text-ink/70" lang="ar" dir="rtl">
              لُغَتِي
            </span>
            <a
              href="#atas"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-ink"
            >
              Kembali ke atas
              <IconArrowUpRight className="size-3.5" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
