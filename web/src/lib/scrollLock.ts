type LenisLike = {
  stop: () => void;
  start: () => void;
};

declare global {
  interface Window {
    __kkLenis?: LenisLike | null;
  }
}

let lockCount = 0;

export function registerLenis(lenis: LenisLike | null) {
  if (typeof window === "undefined") return;
  window.__kkLenis = lenis;
}

export function lockPageScroll() {
  if (typeof document === "undefined") return;
  lockCount += 1;
  if (lockCount === 1) {
    document.body.style.overflow = "hidden";
    window.__kkLenis?.stop();
  }
}

export function unlockPageScroll() {
  if (typeof document === "undefined") return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = "";
    window.__kkLenis?.start();
  }
}
