"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { navLinks } from "@/lib/curriculum";
import { Brand } from "./brand";
import { IconArrowRight, IconMenu, IconX } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { Container } from "./ui";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled || menuOpen
          ? "border-b border-line/70 bg-paper/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4 sm:h-20">
          <a
            href="#atas"
            aria-label="Lughati — kembali ke atas"
            className="rounded-2xl"
            onClick={() => setMenuOpen(false)}
          >
            <Brand />
          </a>

          <nav
            aria-label="Navigasi utama"
            className="hidden items-center gap-1 lg:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/login"
              className="hidden rounded-full px-3.5 py-2 text-sm font-semibold text-muted transition-colors hover:bg-surface hover:text-ink sm:inline-flex"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="group hidden items-center gap-2 rounded-full bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-900/20 transition-colors hover:bg-emerald-700 sm:inline-flex"
            >
              Daftar akun
              <IconArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              className="grid size-10 place-items-center rounded-full border border-line/80 bg-surface/70 text-ink lg:hidden"
            >
              {menuOpen ? (
                <IconX className="size-5" />
              ) : (
                <IconMenu className="size-5" />
              )}
            </button>
          </div>
        </div>
      </Container>

      <div
        id="menu-mobile"
        hidden={!menuOpen}
        className="border-t border-line/70 bg-paper/95 backdrop-blur-xl lg:hidden"
      >
        <Container className="py-4">
          <nav aria-label="Navigasi seluler" className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-surface"
              >
                {link.label}
                <IconArrowRight className="size-4 text-muted" />
              </a>
            ))}
          </nav>
          <div className="mt-3 grid grid-cols-2 gap-2.5">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-surface/70 px-4 py-3 text-sm font-semibold text-ink"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white"
            >
              Daftar akun
              <IconArrowRight className="size-4" />
            </Link>
          </div>
          <p className="mt-3 text-center text-xs text-muted">
            Minggu 1–2 gratis di kedua jalur · tanpa kartu kredit
          </p>
        </Container>
      </div>
    </header>
  );
}
