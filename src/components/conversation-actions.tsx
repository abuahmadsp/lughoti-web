"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { IconBookmark, IconMic } from "./icons";

export function ConversationActions() {
  const [bookmarked, setBookmarked] = useState(true);

  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        onClick={() => setBookmarked((value) => !value)}
        aria-pressed={bookmarked}
        className="flex items-center gap-2 rounded-lg border border-line/70 bg-surface px-3.5 py-2 text-[12px] font-semibold text-ink shadow-sm transition-colors hover:text-brand"
      >
        <IconBookmark
          className={cn("size-4 text-sand-500", bookmarked && "fill-current")}
        />
        <span>{bookmarked ? "Tersimpan" : "Simpan"}</span>
      </button>
      <a
        href="#latih-pelafalan"
        className="flex items-center gap-2 rounded-lg bg-brand px-3.5 py-2 text-[12px] font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
      >
        <IconMic className="size-4" />
        Mulai Roleplay
      </a>
    </div>
  );
}
