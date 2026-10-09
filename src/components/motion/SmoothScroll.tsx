import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

export function SmoothScroll() {
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | undefined;
    let frame = 0;
    let focusTimer: ReturnType<typeof setTimeout> | undefined;
    const destroy = () => { cancelAnimationFrame(frame); clearTimeout(focusTimer); lenis?.destroy(); lenis = undefined; };
    const create = () => {
      destroy();
      if (preference.matches) return;
      lenis = new Lenis({ lerp: 0.1, anchors: false, autoRaf: false, prevent: element => element.hasAttribute("data-lenis-prevent") });
      const raf = (time: number) => { lenis?.raf(time); frame = requestAnimationFrame(raf); };
      frame = requestAnimationFrame(raf);
    };
    const beforeSwap = () => destroy();
    const afterLoad = () => create();
    const anchor = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href]') : null;
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target || link.hasAttribute("download")) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
      let target: HTMLElement | null;
      try { target = document.getElementById(decodeURIComponent(url.hash.slice(1))); } catch { return; }
      if (!target) return;
      event.preventDefault();
      const focus = () => { target!.setAttribute("tabindex", "-1"); target!.focus({ preventScroll: true }); };
      // Lenis reads the document's scroll-padding; adding another offset would
      // count the fixed-header allowance twice.
      if (lenis) lenis.scrollTo(target, { onComplete: focus }); else target.scrollIntoView({ behavior: "instant" });
      history.pushState(null, "", url.hash);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
      focus();
      // Sheet focus restoration runs after its link's React handler. Restore the
      // destination after closing, rather than leaving focus on the menu trigger.
      if (link.closest('[role="dialog"]')) { clearTimeout(focusTimer); focusTimer = setTimeout(focus, preference.matches ? 0 : 250); }
    };
    create();
    preference.addEventListener("change", create);
    document.addEventListener("astro:before-swap", beforeSwap);
    document.addEventListener("astro:page-load", afterLoad);
    // Handle same-page anchors before ClientRouter's bubbling navigation handler.
    document.addEventListener("click", anchor, true);
    return () => { destroy(); preference.removeEventListener("change", create); document.removeEventListener("astro:before-swap", beforeSwap); document.removeEventListener("astro:page-load", afterLoad); document.removeEventListener("click", anchor, true); };
  }, []);
  return null;
}
