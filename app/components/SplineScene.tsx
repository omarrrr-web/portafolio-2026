"use client";
import Spline from "@splinetool/react-spline";
import { useState, useEffect, useRef, useCallback } from "react";

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export default function SplineScene({ scene, className = "" }: SplineSceneProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const splineApp = useRef<any>(null);

  const handleLoad = useCallback((app: any) => {
    splineApp.current = app;
    // Optimize: Set pixel ratio to 1 (huge performance gain on retina/high-dpi screens)
    if (app.setPixelRatio) app.setPixelRatio(1);
    setIsLoading(false);
  }, []);

  // Intersection Observer to stop tracking and rendering when not visible
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        // Pause/Play spline render loop
        if (splineApp.current) {
          if (entry.isIntersecting) {
            splineApp.current.play();
          } else {
            splineApp.current.stop();
          }
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Global cursor tracking + watermark cleanup
  useEffect(() => {
    if (isLoading || !containerRef.current || !isVisible) return;

    const container = containerRef.current;

    // Robust helper to find the canvas in either light DOM or shadow DOM
    const findCanvas = (): HTMLCanvasElement | null => {
      const direct = container.querySelector("canvas");
      if (direct) return direct;
      const viewer = container.querySelector("spline-viewer");
      if (viewer && viewer.shadowRoot) {
        return viewer.shadowRoot.querySelector("canvas");
      }
      return null;
    };

    const canvas = findCanvas();

    const blockLeaveEvents = (e: Event) => {
      // Prevent Spline runtime from learning that the cursor left the canvas
      e.stopImmediatePropagation();
    };

    if (canvas) {
      canvas.addEventListener("pointerout", blockLeaveEvents, true);
      canvas.addEventListener("pointerleave", blockLeaveEvents, true);
      canvas.addEventListener("mouseout", blockLeaveEvents, true);
      canvas.addEventListener("mouseleave", blockLeaveEvents, true);
    }

    let lastMove = 0;
    const forwardMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMove < 32) return; // ~30fps throttle for tracking
      lastMove = now;

      const activeCanvas = findCanvas();
      if (!activeCanvas) return;

      // Avoid double-dispatching if the mouse is already over the canvas
      if (e.target === activeCanvas) return;

      // Use actual viewport coordinates
      const clientX = e.clientX;
      const clientY = e.clientY;

      // Dispatch "enter" events to ensure Spline is active
      const enterEvent = new PointerEvent("pointerenter", {
        clientX,
        clientY,
        bubbles: false,
        cancelable: true,
      });
      activeCanvas.dispatchEvent(enterEvent);

      const overEvent = new PointerEvent("pointerover", {
        clientX,
        clientY,
        bubbles: true,
        cancelable: true,
      });
      activeCanvas.dispatchEvent(overEvent);

      // Dispatch PointerEvents (modern Spline runtime)
      const moveEvent = new PointerEvent("pointermove", {
        clientX,
        clientY,
        screenX: e.screenX,
        screenY: e.screenY,
        movementX: e.movementX,
        movementY: e.movementY,
        bubbles: true,
        cancelable: true,
      });
      activeCanvas.dispatchEvent(moveEvent);

      // Also dispatch legacy MouseEvent just in case
      const mouseMoveEvent = new MouseEvent("mousemove", {
        clientX,
        clientY,
        screenX: e.screenX,
        screenY: e.screenY,
        movementX: e.movementX,
        movementY: e.movementY,
        bubbles: true,
        cancelable: true,
      });
      activeCanvas.dispatchEvent(mouseMoveEvent);
    };

    window.addEventListener("mousemove", forwardMouseMove);

    // ─── Spline watermark cleanup ───
    const cleanupSpline = () => {
      // Force canvas transparent background
      const canvases = container.querySelectorAll("canvas");
      canvases.forEach((c) => {
        c.style.background = "transparent";
      });

      // Target watermark inside shadow DOM
      const viewers = container.querySelectorAll("spline-viewer");
      viewers.forEach((viewer) => {
        const shadow = (viewer as HTMLElement & { shadowRoot: ShadowRoot | null }).shadowRoot;
        if (shadow) {
          const logo = shadow.querySelector("#logo") as HTMLElement | null;
          if (logo) logo.style.display = "none";
        }
      });

      // Target direct watermark elements
      const selectors = [
        'a[href*="spline.design"]',
        'a[href*="spline"]',
        'div[class*="watermark"]',
        'div[class*="logo"]',
      ];
      selectors.forEach((sel) => {
        container.querySelectorAll(sel).forEach((el) => {
          (el as HTMLElement).style.display = "none";
        });
      });
    };

    cleanupSpline();
    const t1 = setTimeout(cleanupSpline, 500);
    const t2 = setTimeout(cleanupSpline, 1500);
    const t3 = setTimeout(cleanupSpline, 3000);

    const observer = new MutationObserver(cleanupSpline);
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", forwardMouseMove);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      observer.disconnect();
    };
  }, [isLoading]);

  if (hasError) {
    return null; // Silently fail — page content is still fully usable without the 3D layer
  }

  return (
    <div
      ref={containerRef}
      className={`spline-container ${className}`}
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {/* Sci-Fi loader */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <div className="relative w-14 h-14 mb-3">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-cyan/20 animate-spin [animation-duration:10s]" />
            <div className="absolute inset-1.5 rounded-full border border-dashed border-accent-amber/30 animate-spin [animation-duration:6s] [animation-direction:reverse]" />
            <div className="absolute inset-3.5 rounded-full border border-primary-cyan animate-pulse flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-primary-cyan rounded-full" />
            </div>
          </div>
          <p className="text-[10px] text-primary-cyan/60 font-mono tracking-[0.2em] uppercase animate-pulse">
            CARGANDO INTERFAZ 3D
          </p>
        </div>
      )}

      {/* Spline 3D Canvas */}
      <Spline
        scene={scene}
        onLoad={handleLoad}
        onError={() => setHasError(true)}
        style={{ background: "transparent" }}
      />
    </div>
  );
}
