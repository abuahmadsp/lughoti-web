"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type Track = "fushah" | "amiyah";

export function DashboardTracks({
  fushah,
  amiyah,
}: {
  fushah: ReactNode;
  amiyah: ReactNode;
}) {
  const [track, setTrack] = useState<Track>("fushah");

  useEffect(() => {
    function onTrackChange(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      if (detail === "fushah" || detail === "amiyah") setTrack(detail);
    }
    window.addEventListener("lughati:track-change", onTrackChange);
    return () =>
      window.removeEventListener("lughati:track-change", onTrackChange);
  }, []);

  return (
    <div id="jalur" className="grid scroll-mt-24 grid-cols-1 gap-4 lg:max-w-2xl">
      <p aria-live="polite" className="sr-only">
        Menampilkan jalur {track === "fushah" ? "Fushah" : "Amiyah Saudi"} saja.
      </p>
      {track === "fushah" ? fushah : amiyah}
    </div>
  );
}
