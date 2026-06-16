"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Spline from "@splinetool/react-spline";

export default function InteractiveRobot() {
  const [isLoading, setIsLoading] = useState(true);
  const [bubbleText, setBubbleText] = useState("¡Hola! Soy Sentinel 3D. Listo para escanear la red.");
  const [clickCount, setClickCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSplineLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Remove Spline watermark, enforce transparent background, and global cursor tracking
  useEffect(() => {
    if (isLoading || !containerRef.current) return;

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

    const forwardMouseMove = (e: MouseEvent) => {
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

    const cleanupSpline = () => {
      // 1. Force all canvases inside the container to have transparent background
      const canvases = container.querySelectorAll("canvas");
      canvases.forEach((canvas) => {
        canvas.style.background = "transparent";
      });

      // 2. Target the Spline watermark logo inside shadow DOM
      const splineViewers = container.querySelectorAll("spline-viewer");
      splineViewers.forEach((viewer) => {
        const shadow = (viewer as HTMLElement & { shadowRoot: ShadowRoot | null }).shadowRoot;
        if (shadow) {
          const logo = shadow.querySelector("#logo") as HTMLElement | null;
          if (logo) {
            logo.style.display = "none";
          }
        }
      });

      // 3. Also target any direct child elements that look like watermarks
      const watermarkSelectors = [
        'a[href*="spline.design"]',
        'div[class*="watermark"]',
        'div[class*="logo"]',
      ];
      watermarkSelectors.forEach((selector) => {
        const elements = container.querySelectorAll(selector);
        elements.forEach((el) => {
          (el as HTMLElement).style.display = "none";
        });
      });
    };

    // Run cleanup immediately
    cleanupSpline();

    // Also run after a brief delay to catch late-rendering watermarks
    const timer1 = setTimeout(cleanupSpline, 500);
    const timer2 = setTimeout(cleanupSpline, 1500);
    const timer3 = setTimeout(cleanupSpline, 3000);

    // MutationObserver to catch dynamically injected watermarks
    const observer = new MutationObserver(() => {
      cleanupSpline();
    });
    observer.observe(container, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", forwardMouseMove);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      observer.disconnect();
    };
  }, [isLoading]);

  const handleDialogueTrigger = () => {
    const messages = [
      "Escaneando estado de red... // Todo en orden.",
      "Mis sensores detectan un visitante interesante.",
      "¡Bip! Sistema optimizado al 100%.",
      "Sentinel Online. Monitoreando infraestructura de TI.",
      "¿Has probado escribir 'diagnostico' en la consola de Omar?",
      "Estado de CPU: Estable. Conexiones de red: Seguras.",
      "¡Bup! Cargando protocolos de seguridad.",
    ];
    setBubbleText(messages[clickCount % messages.length]);
    setClickCount((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[500px] min-h-[420px] relative select-none">
      
      {/* Dialogue Bubble */}
      <div className="h-16 flex items-center justify-center mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            key={bubbleText}
            onClick={handleDialogueTrigger}
            className="cursor-pointer px-4 py-3 bg-dark-surface/90 border border-dark-border hover:border-primary-cyan/50 text-text-title rounded-2xl text-xs font-mono tracking-wide shadow-xl max-w-[320px] text-center relative after:content-[''] after:absolute after:bottom-[-6px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-3 after:h-3 after:bg-dark-surface after:border-r after:border-b after:border-dark-border after:rotate-45 transition-colors"
          >
            <span className="text-primary-cyan mr-1.5">&gt;</span>
            {bubbleText}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Robot 3D Canvas / Frame */}
      <div 
        ref={containerRef}
        onClick={handleDialogueTrigger}
        className="spline-container relative w-full aspect-square md:w-[420px] md:h-[420px] rounded-3xl overflow-hidden flex items-center justify-center transition-all group"
        style={{ background: "transparent" }}
      >
        {/* Futuristic Cybernetic Loader */}
        {isLoading && (
          <div className="absolute inset-0 bg-dark-bg/90 flex flex-col items-center justify-center p-6 z-20">
            {/* Spinning radar core */}
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary-cyan/20 animate-spin [animation-duration:10s]" />
              <div className="absolute inset-1.5 rounded-full border border-dashed border-accent-amber/30 animate-spin [animation-duration:6s] [animation-direction:reverse]" />
              <div className="absolute inset-3.5 rounded-full border border-primary-cyan animate-pulse flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-primary-cyan rounded-full" />
              </div>
            </div>
            {/* Sci-Fi Loading text */}
            <div className="font-mono text-center space-y-1">
              <p className="text-xs text-primary-cyan tracking-[0.2em] uppercase animate-pulse">
                INICIANDO INTERFAZ 3D
              </p>
              <p className="text-[10px] text-text-muted/60 tracking-wider">
                CARGANDO ASISTENTE VIRTUAL...
              </p>
            </div>
          </div>
        )}

        {/* Spline 3D Scene */}
        <div className="w-full h-full relative z-10">
          <Spline
            scene="https://prod.spline.design/dTYyor1ImubMAu32/scene.splinecode"
            onLoad={handleSplineLoad}
            style={{ background: "transparent" }}
          />
        </div>

        {/* Bottom-right cover strip to visually mask any residual watermark */}
        <div className="absolute bottom-0 right-0 w-[160px] h-[40px] z-30 bg-gradient-to-l from-dark-bg via-dark-bg/95 to-transparent pointer-events-none" />
      </div>

      {/* Hint at the bottom */}
      <span className="mt-3 font-mono text-[10px] text-text-muted/40 tracking-wider">
        // INTERACTÚA CON EL ROBOT 3D
      </span>
    </div>
  );
}
