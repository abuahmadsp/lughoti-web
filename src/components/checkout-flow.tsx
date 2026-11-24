"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { CheckoutWorkspace } from "./checkout-workspace";
import { SuccessModalContent } from "./success-modal-content";
import { IconBadgeCheck, IconCheck, IconX } from "./icons";

type Stage = "closed" | "checkout" | "success";

type CheckoutFlowValue = {
  openCheckout: (plan?: string) => void;
  closeCheckout: () => void;
};

const CheckoutFlowContext = createContext<CheckoutFlowValue | null>(null);

export function useCheckoutFlow() {
  const value = useContext(CheckoutFlowContext);
  if (!value) {
    throw new Error("useCheckoutFlow harus dipakai di dalam CheckoutFlowProvider");
  }
  return value;
}

export function CheckoutOpenButton({
  plan,
  title,
  className,
  children,
}: {
  plan?: string;
  title?: string;
  className?: string;
  children: ReactNode;
}) {
  const { openCheckout } = useCheckoutFlow();
  return (
    <button
      type="button"
      title={title}
      onClick={() => openCheckout(plan)}
      className={className}
    >
      {children}
    </button>
  );
}

export function CheckoutFlowProvider({
  children,
  accountCard,
  assurances,
}: {
  children: ReactNode;
  accountCard: ReactNode;
  assurances: ReactNode;
}) {
  const [stage, setStage] = useState<Stage>("closed");
  const [plan, setPlan] = useState("Pro Learner (Dual-Track)");

  const openCheckout = useCallback((nextPlan?: string) => {
    setPlan(nextPlan ?? "Pro Learner (Dual-Track)");
    setStage("checkout");
  }, []);

  const closeCheckout = useCallback(() => setStage("closed"), []);

  const showSuccess = useCallback(() => setStage("success"), []);

  return (
    <CheckoutFlowContext.Provider value={{ openCheckout, closeCheckout }}>
      {children}
      {stage !== "closed" ? (
        <CheckoutFlowDialog
          stage={stage}
          plan={plan}
          accountCard={accountCard}
          assurances={assurances}
          onClose={closeCheckout}
          onSuccess={showSuccess}
        />
      ) : null}
    </CheckoutFlowContext.Provider>
  );
}

function CheckoutFlowDialog({
  stage,
  plan,
  accountCard,
  assurances,
  onClose,
  onSuccess,
}: {
  stage: Exclude<Stage, "closed">;
  plan: string;
  accountCard: ReactNode;
  assurances: ReactNode;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const isSuccess = stage === "success";

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-emerald-950/65 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-flow-title"
        className="animate-flow-in relative my-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-line/70 bg-paper shadow-2xl outline-none"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line/70 bg-surface/95 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={`grid size-8 shrink-0 place-items-center rounded-full ${
                isSuccess
                  ? "bg-sand-300 text-sand-900"
                  : "bg-brand text-white"
              }`}
            >
              {isSuccess ? (
                <IconCheck className="size-4" />
              ) : (
                <IconBadgeCheck className="size-4" />
              )}
            </span>
            <div className="min-w-0">
              <p
                id="checkout-flow-title"
                className="truncate text-[12px] font-bold text-ink"
              >
                {isSuccess
                  ? "Langkah 3 dari 3 — Akses Pro Aktif"
                  : "Langkah 2 dari 3 — Metode Pembayaran & Data"}
              </p>
              <p className="truncate text-[10px] text-muted">
                {isSuccess
                  ? "Konfirmasi sukses • pratinjau"
                  : `Paket: ${plan} • pratinjau`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pratinjau"
            className="grid size-8 shrink-0 place-items-center rounded-lg border border-line/80 bg-paper text-muted transition-colors hover:bg-line/40 hover:text-ink"
          >
            <IconX className="size-4" />
          </button>
        </header>

        <div className="max-h-[calc(100dvh-6rem)] overflow-y-auto p-4 sm:p-6">
          {isSuccess ? (
            <SuccessModalContent onClose={onClose} />
          ) : (
            <CheckoutWorkspace
              accountCard={accountCard}
              assurances={assurances}
              plan={plan}
              onSuccess={onSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
}
