"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { IconMoon, IconSun } from "./icons";

const THEME_EVENT = "lughati:theme-change";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle({ className }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggleTheme() {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("lughati-theme", next ? "dark" : "light");
    } catch {
      /* storage may be blocked; theme still applies for this visit */
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Aktifkan tema terang" : "Aktifkan tema gelap"}
      aria-pressed={isDark}
      className={cn(
        "grid size-10 place-items-center rounded-full border border-line/80 bg-surface/70 text-muted transition-colors hover:border-emerald-600/40 hover:text-ink",
        className,
      )}
    >
      {isDark ? (
        <IconSun className="size-[18px]" />
      ) : (
        <IconMoon className="size-[18px]" />
      )}
    </button>
  );
}
