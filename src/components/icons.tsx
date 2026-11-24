import type { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Svg>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </Svg>
  );
}

export function IconPlay(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 5.5v13l11-6.5Z" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m5 12 4.5 4.5L19 7" />
    </Svg>
  );
}

export function IconSparkles(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 13.7 8l4.5 1.7-4.5 1.7L12 15.9l-1.7-4.5L5.8 9.7 10.3 8Z" />
      <path d="m18.5 15 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8Z" />
    </Svg>
  );
}

export function IconBook(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5Z" />
      <path d="M4 5.5v15" />
      <path d="M8.5 7.5H16" />
    </Svg>
  );
}

export function IconLayers(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m12 3 9 5-9 5-9-5Z" />
      <path d="m3 13 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </Svg>
  );
}

export function IconMic(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
      <path d="M12 17.5V21" />
      <path d="M8.5 21h7" />
    </Svg>
  );
}

export function IconChart(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 20V11" />
      <path d="M10 20V4" />
      <path d="M16 20v-6" />
      <path d="M22 20H2" />
    </Svg>
  );
}

export function IconHeadphones(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <path d="M4 14h3v6H5a1 1 0 0 1-1-1Z" />
      <path d="M20 14h-3v6h2a1 1 0 0 0 1-1Z" />
    </Svg>
  );
}

export function IconLock(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="10" width="16" height="10" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </Svg>
  );
}

export function IconGlobe(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.4 2.5 3.7 5.5 3.7 9s-1.3 6.5-3.7 9c-2.4-2.5-3.7-5.5-3.7-9S9.6 5.5 12 3Z" />
    </Svg>
  );
}

export function IconMoon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1Z" />
    </Svg>
  );
}

export function IconSun(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M4.9 4.9l1.4 1.4" />
      <path d="m17.7 17.7 1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m4.9 19.1 1.4-1.4" />
      <path d="m17.7 6.3 1.4-1.4" />
    </Svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </Svg>
  );
}

export function IconX(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </Svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  );
}

export function IconStar(props: IconProps) {
  return (
    <Svg {...props}>
      <path
        d="m12 3 2.7 5.7 6.3.8-4.6 4.4 1.2 6.1-5.6-3-5.6 3 1.2-6.1L3 9.5l6.3-.8Z"
        fill="currentColor"
        stroke="none"
      />
    </Svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3 19 6v5.2c0 4.3-2.9 8.2-7 9.3-4.1-1.1-7-5-7-9.3V6Z" />
      <path d="m8.8 11.8 2.2 2.2 4.3-4.4" />
    </Svg>
  );
}

export function IconZap(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M13 2.5 4.5 13H11l-1 8.5L18.5 11H12Z" />
    </Svg>
  );
}

export function IconVolume(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 9.5h3L12 6v12l-5-3.5H4Z" />
      <path d="M16 9a4.2 4.2 0 0 1 0 6" />
      <path d="M18.5 6.5a8 8 0 0 1 0 11" />
    </Svg>
  );
}

export function IconCompass(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5Z" />
    </Svg>
  );
}

export function IconGraduation(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m2.5 8.5 9.5-4 9.5 4-9.5 4Z" />
      <path d="M6.5 10.5V16c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-5.5" />
      <path d="M21.5 8.5v5" />
    </Svg>
  );
}

export function IconChat(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 12a7.5 7.5 0 0 1-11 6.6L4 20l1.4-4.5A7.5 7.5 0 1 1 20 12Z" />
      <path d="M8.5 11h7" />
      <path d="M8.5 14h4" />
    </Svg>
  );
}

export function IconTarget(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </Svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </Svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 5a3.5 3.5 0 0 1 0 7" />
      <path d="M17.5 14.2A6.5 6.5 0 0 1 21.5 20" />
    </Svg>
  );
}

export function IconQuote(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9.5 6.5C6.5 7.5 5 10 5 13v4.5h5V12H7.8c0-1.4.6-2.5 1.7-3.2Z" />
      <path d="M19 6.5c-3 1-4.5 3.5-4.5 6.5v4.5h5V12h-2.2c0-1.4.6-2.5 1.7-3.2Z" />
    </Svg>
  );
}

export function IconUser(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </Svg>
  );
}

export function IconEye(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </Svg>
  );
}

export function IconEyeOff(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m3 3 18 18" />
      <path d="M10.6 6.1A9.8 9.8 0 0 1 12 6c6 0 9.5 6 9.5 6a17 17 0 0 1-3 3.4" />
      <path d="M6.2 6.2C3.8 8.1 2.5 12 2.5 12S6 18 12 18a9.8 9.8 0 0 0 4.1-.9" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </Svg>
  );
}

export function IconLogin(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m10 17 5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
    </Svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </Svg>
  );
}

export function IconBot(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="7" width="16" height="12" rx="3" />
      <path d="M12 3v4" />
      <circle cx="9" cy="13" r="1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none" />
      <path d="M9.5 17h5" />
      <path d="M2 12v3" />
      <path d="M22 12v3" />
    </Svg>
  );
}

export function IconGrid(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </Svg>
  );
}

export function IconSettings(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </Svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4.2-4.2" />
    </Svg>
  );
}

export function IconLanguages(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 5.5h9" />
      <path d="M8 5.5V7c0 3.3-1.7 5.6-4.5 7" />
      <path d="M5 9.5c1.4 2 3.3 3.2 5.5 3.7" />
      <path d="m13 20 3.5-9 3.5 9" />
      <path d="M14.4 17h4.2" />
    </Svg>
  );
}

export function IconBell(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M18 8.5a6 6 0 1 0-12 0c0 4.8-2 6-2 6h16s-2-1.2-2-6" />
      <path d="M10.4 20a2 2 0 0 0 3.2 0" />
    </Svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Svg>
  );
}

export function IconPlusCircle(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8.5v7" />
      <path d="M8.5 12h7" />
    </Svg>
  );
}

export function IconLogout(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9.5 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.5" />
      <path d="m15.5 16.5 4.5-4.5-4.5-4.5" />
      <path d="M20 12H9" />
    </Svg>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M3.5 10h17" />
    </Svg>
  );
}

export function IconDownload(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5v11" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4 16.5v1.5a2.5 2.5 0 0 0 2.5 2.5h11a2.5 2.5 0 0 0 2.5-2.5v-1.5" />
    </Svg>
  );
}

export function IconMegaphone(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 10.5v3a1.5 1.5 0 0 0 1.5 1.5H7l7 4V5.5l-7 4H4.5A1.5 1.5 0 0 0 3 10.5Z" />
      <path d="M7 15v3.5A2.5 2.5 0 0 0 9.5 21H10" />
      <path d="M18 9a4.5 4.5 0 0 1 0 6" />
    </Svg>
  );
}

export function IconTrendingUp(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m3 17 5.5-5.5 4 4L21 7" />
      <path d="M15.5 7H21v5.5" />
    </Svg>
  );
}

export function IconArrowUp(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 19.5v-15" />
      <path d="m6 10.5 6-6 6 6" />
    </Svg>
  );
}

export function IconWallet(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M19 7.5V6a2 2 0 0 0-2-2H5.5a2.5 2.5 0 0 0 0 5H19a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6.5" />
      <path d="M16 13h5v4h-5a2 2 0 0 1 0-4Z" />
    </Svg>
  );
}

export function IconAward(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="m8.6 13.6-1.6 7 5-2.4 5 2.4-1.6-7" />
    </Svg>
  );
}

export function IconBadgeCheck(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m12 3 2.2 1.6 2.7-.2 1 2.5 2.3 1.5-.6 2.6.6 2.6-2.3 1.5-1 2.5-2.7-.2L12 21l-2.2-1.6-2.7.2-1-2.5L3.8 15.6l.6-2.6-.6-2.6 2.3-1.5 1-2.5 2.7.2Z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m9.5 6 6 6-6 6" />
    </Svg>
  );
}

export function IconChevronLeft(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m14.5 6-6 6 6 6" />
    </Svg>
  );
}

export function IconFilter(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 5h16l-6.3 7.4V19l-3.4 1.7v-8.3Z" />
    </Svg>
  );
}

export function IconSort(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h9" />
      <path d="M4 12h6" />
      <path d="M4 17h3" />
      <path d="M17 6v12" />
      <path d="m14 15 3 3 3-3" />
    </Svg>
  );
}

export function IconReceipt(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2Z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
    </Svg>
  );
}

export function IconRefresh(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20 11a8 8 0 1 0-2.3 6.4" />
      <path d="M20 4v7h-7" />
    </Svg>
  );
}

export function IconQrCode(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="3.5" width="6" height="6" rx="1" />
      <rect x="14.5" y="3.5" width="6" height="6" rx="1" />
      <rect x="3.5" y="14.5" width="6" height="6" rx="1" />
      <path d="M14.5 14.5h2.5v2.5h-2.5z" />
      <path d="M18.5 18.5H21v2.5h-2.5z" />
      <path d="M14.5 19.5v1.5" />
      <path d="M19.5 14.5H21" />
    </Svg>
  );
}

export function IconCreditCard(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
      <path d="M2.5 10h19" />
      <path d="M6.5 14.5h4" />
    </Svg>
  );
}

export function IconBank(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m12 3 9 5H3Z" />
      <path d="M5 10.5V18" />
      <path d="M9.5 10.5V18" />
      <path d="M14.5 10.5V18" />
      <path d="M19 10.5V18" />
      <path d="M3 21h18" />
    </Svg>
  );
}

export function IconCopy(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
    </Svg>
  );
}

export function IconTimer(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l3 2" />
      <path d="M9 2h6" />
      <path d="M12 2v3" />
    </Svg>
  );
}

export function IconTag(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 11.5 11 4h7a2 2 0 0 1 2 2v7l-7.5 7.5a2 2 0 0 1-2.8 0L3.5 14.3a2 2 0 0 1 0-2.8Z" />
      <circle cx="16.5" cy="7.5" r="1.2" />
    </Svg>
  );
}

export function IconCurrencyExchange(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 8h13" />
      <path d="m14 5 3 3-3 3" />
      <path d="M20 16H7" />
      <path d="m10 13-3 3 3 3" />
    </Svg>
  );
}

export function IconWaveform(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 10v4" />
      <path d="M7 7v10" />
      <path d="M11 4v16" />
      <path d="M15 8v8" />
      <path d="M19 11v2" />
    </Svg>
  );
}

export function IconRoute(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="19" r="2.5" />
      <circle cx="18" cy="5" r="2.5" />
      <path d="M15.5 5H12a4.5 4.5 0 0 0 0 9h.5a4.5 4.5 0 0 1 0 9H8.5" />
    </Svg>
  );
}

export function IconCards(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="8" y="3.5" width="12" height="15" rx="2" />
      <path d="M16 21H6a2 2 0 0 1-2-2V7" />
    </Svg>
  );
}

export function IconClipboard(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="5" y="4.5" width="14" height="17" rx="2.5" />
      <path d="M9 4.5V3.5h6v1" />
      <path d="m9 12.5 2 2 4-4" />
    </Svg>
  );
}

export function IconPause(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="7" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" />
      <rect x="13.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function IconKeyboard(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <path d="M6.5 10h.01M10 10h.01M13.5 10h.01M17 10h.01" />
      <path d="M6.5 13.5h.01M10 13.5h.01M13.5 13.5h.01M17 13.5h.01" />
      <path d="M8.5 16.5h7" />
    </Svg>
  );
}

export function IconLightbulb(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.5 10.9c.5.4.8 1 .8 1.6V18h5.4v-2.5c0-.6.3-1.2.8-1.6A6 6 0 0 0 12 3Z" />
    </Svg>
  );
}

export function IconShare(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="18" cy="5.5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="18.5" r="2.5" />
      <path d="m8.2 10.8 7.6-4" />
      <path d="m8.2 13.2 7.6 4" />
    </Svg>
  );
}

export function IconGauge(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20.5 16a9 9 0 1 0-17 0" />
      <path d="m12 12 4-3.5" />
      <circle cx="12" cy="12" r="1.6" />
    </Svg>
  );
}

export function IconVideo(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m10.5 9.5 4.5 2.5-4.5 2.5Z" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function IconSkipBack(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M18.5 6v12L9 12Z" fill="currentColor" stroke="none" />
      <path d="M6 6v12" />
    </Svg>
  );
}

export function IconSkipForward(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5.5 6v12L15 12Z" fill="currentColor" stroke="none" />
      <path d="M18 6v12" />
    </Svg>
  );
}

export function IconRepeat(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m17 2.5 3 3-3 3" />
      <path d="M20 5.5H7a4 4 0 0 0-4 4v1" />
      <path d="m7 21.5-3-3 3-3" />
      <path d="M4 18.5h13a4 4 0 0 0 4-4v-1" />
    </Svg>
  );
}

export function IconBookmark(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6.5 4.5h11a1 1 0 0 1 1 1v14l-6.5-4-6.5 4v-14a1 1 0 0 1 1-1Z" />
    </Svg>
  );
}

export function IconLocation(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  );
}

export function IconRestaurant(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 3v7a2.5 2.5 0 0 0 5 0V3" />
      <path d="M8.5 3v18" />
      <path d="M17.5 3c-1.7 1.5-2.5 3.7-2.5 6.5 0 2 .8 3.3 2.5 3.5V21" />
    </Svg>
  );
}

export function IconStorefront(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 9.5 5 4h14l2 5.5a3 3 0 0 1-5.5 1.7A3 3 0 0 1 12 12a3 3 0 0 1-3.5-.8A3 3 0 0 1 3 9.5Z" />
      <path d="M5 10.5V20h14v-9.5" />
      <path d="M9.5 20v-5h5v5" />
    </Svg>
  );
}

export function IconSubtitles(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M6.5 11h4" />
      <path d="M13.5 11h4" />
      <path d="M6.5 15h7" />
    </Svg>
  );
}

export function IconMore(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
    </Svg>
  );
}

export function IconFlag(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5.5 21V4" />
      <path d="M5.5 5h11l-2 3.5 2 3.5h-11" />
    </Svg>
  );
}

export function IconBranch(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="6" cy="5" r="2" />
      <circle cx="18" cy="7" r="2" />
      <circle cx="6" cy="19" r="2" />
      <path d="M6 7v10" />
      <path d="M8 5h4a4 4 0 0 1 4 4" />
    </Svg>
  );
}

export function IconArrowLeft(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </Svg>
  );
}

export function IconLink(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M10 13.5a3.5 3.5 0 0 0 5 0l3-3a3.5 3.5 0 0 0-5-5l-1.5 1.5" />
      <path d="M14 10.5a3.5 3.5 0 0 0-5 0l-3 3a3.5 3.5 0 0 0 5 5l1.5-1.5" />
    </Svg>
  );
}

export function IconTable(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M9 10v10" />
    </Svg>
  );
}

export function IconFileText(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6" />
      <path d="M9 17h4" />
    </Svg>
  );
}

export function IconFlame(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </Svg>
  );
}

export function IconCompare(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 4 3 8l4 4" />
      <path d="M3 8h13" />
      <path d="m17 20 4-4-4-4" />
      <path d="M21 16H8" />
    </Svg>
  );
}

export function IconBrain(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5a3 3 0 0 0-5.6 1.5A3 3 0 0 0 5 12a3 3 0 0 0 1.4 2.5A3 3 0 0 0 12 17" />
      <path d="M12 5a3 3 0 0 1 5.6 1.5A3 3 0 0 1 19 12a3 3 0 0 1-1.4 2.5A3 3 0 0 1 12 17" />
      <path d="M12 5V3" />
      <path d="M12 17v3" />
    </Svg>
  );
}

export function IconHistory(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
      <path d="M12 8v4l3 2" />
    </Svg>
  );
}

export function IconPencil(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4z" />
    </Svg>
  );
}

export function IconPremium(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m3 8 4.5 4L12 5l4.5 7L21 8" />
      <path d="M5 12v5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-5" />
      <path d="M7 21v-6h10v6" />
    </Svg>
  );
}

export function IconHourglass(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 3h12" />
      <path d="M6 21h12" />
      <path d="M7 3v3c0 2 2.5 3.5 5 6-2.5 2.5-5 4-5 6v3" />
      <path d="M17 3v3c0 2-2.5 3.5-5 6 2.5 2.5 5 4 5 6v3" />
    </Svg>
  );
}

export function IconShieldCheck(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3 4.5 6v6c0 5 3.2 8.2 7.5 9 4.3-.8 7.5-4 7.5-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  );
}

export function IconMinus(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h14" />
    </Svg>
  );
}

export function IconInfinity(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M17.6 8.5c-2.4 0-3.6 3.5-5.6 3.5s-3.2-3.5-5.6-3.5A3.4 3.4 0 0 0 3 12a3.4 3.4 0 0 0 3.4 3.5c2.4 0 3.6-3.5 5.6-3.5s3.2 3.5 5.6 3.5A3.4 3.4 0 0 0 21 12a3.4 3.4 0 0 0-3.4-3.5Z" />
    </Svg>
  );
}

export function IconLaptop(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="5" width="16" height="11" rx="2" />
      <path d="M2 19h20" />
    </Svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M11 18.5h2" />
    </Svg>
  );
}

export function IconImage(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <circle cx="8.5" cy="10" r="1.5" />
      <path d="m4 17 5-5 3.5 3.5 3-2.5 4.5 4" />
    </Svg>
  );
}

export function IconCamera(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 8h3l1.5-2h7L17 8h3a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 20 19H4a1.5 1.5 0 0 1-1.5-1.5v-8A1.5 1.5 0 0 1 4 8Z" />
      <circle cx="12" cy="13" r="3" />
    </Svg>
  );
}

export function IconAlert(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M10.3 4 2.7 17.2A2 2 0 0 0 4.4 20.2h15.2a2 2 0 0 0 1.7-3L13.7 4a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4.5" />
      <path d="M12 17h.01" />
    </Svg>
  );
}

export function IconPrint(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 8V3.5h10V8" />
      <path d="M7 17H5a2 2 0 0 1-2-2v-4a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v4a2 2 0 0 1-2 2h-2" />
      <path d="M7 14h10v6.5H7z" />
    </Svg>
  );
}

export function IconTree(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="3" width="6" height="5" rx="1.5" />
      <rect x="15" y="3" width="6" height="5" rx="1.5" />
      <rect x="9" y="16" width="6" height="5" rx="1.5" />
      <path d="M6 8v4h12V8" />
      <path d="M12 12v4" />
    </Svg>
  );
}

export function IconTimeline(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 5h10" />
      <path d="M4 12h16" />
      <path d="M4 19h7" />
      <circle cx="18" cy="5" r="2" />
      <circle cx="14" cy="12" r="2" />
      <circle cx="15" cy="19" r="2" />
    </Svg>
  );
}

export function IconDownloadDone(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3v11" />
      <path d="m7.5 10 4.5 4.5 4.5-4.5" />
      <path d="M4 17v2.5A1.5 1.5 0 0 0 5.5 21h13a1.5 1.5 0 0 0 1.5-1.5V17" />
      <path d="m9.5 19 2 2 3.5-3.5" />
    </Svg>
  );
}

export function IconTune(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h9" />
      <path d="M17 7h3" />
      <circle cx="15" cy="7" r="2" />
      <path d="M4 17h3" />
      <path d="M11 17h9" />
      <circle cx="9" cy="17" r="2" />
    </Svg>
  );
}

export function IconVerifiedUser(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3 5 5.6v5.2c0 3.9 2.7 7.5 7 9.2 4.3-1.7 7-5.3 7-9.2V5.6Z" />
      <path d="m9.2 12 2 2 3.7-4" />
    </Svg>
  );
}

export function IconFilterOff(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 5h16" />
      <path d="M7 10h10" />
      <path d="M10 15h4" />
      <path d="M11 20h2" />
      <path d="m3 3 18 18" />
    </Svg>
  );
}

export function IconList(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3.5 6h.01" />
      <path d="M3.5 12h.01" />
      <path d="M3.5 18h.01" />
    </Svg>
  );
}

export function IconPie(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3a9 9 0 1 0 9 9h-9Z" />
      <path d="M15 3.5A9 9 0 0 1 20.5 9H15Z" />
    </Svg>
  );
}

export function IconCloudDownload(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 18a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 18 10a4 4 0 0 1 0 8Z" />
      <path d="M12 13v5" />
      <path d="m9.5 15.5 2.5 2.5 2.5-2.5" />
    </Svg>
  );
}

export function IconServer(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M7 7h.01" />
      <path d="M7 17h.01" />
      <path d="M11 7h6" />
      <path d="M11 17h6" />
    </Svg>
  );
}

export function IconInfo(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 8h.01" />
    </Svg>
  );
}

export function IconSend(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="m21 3-9.5 18-2.2-7.3L2 11.5 21 3Z" />
      <path d="m9.3 13.7 4-4" />
    </Svg>
  );
}

export function IconCloudCheck(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M7 18a4.5 4.5 0 0 1-.4-9A6 6 0 0 1 18 10a4 4 0 0 1 0 8Z" />
      <path d="m9.5 14 2 2 3.5-4" />
    </Svg>
  );
}

export function IconCpu(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </Svg>
  );
}

export function IconSave(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 3h11l3 3v15H5z" />
      <path d="M8 3v6h8V3" />
      <rect x="8" y="13" width="8" height="8" rx="1" />
    </Svg>
  );
}

export function IconBuilding(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 21v-5h6v5" />
      <path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01" />
    </Svg>
  );
}
