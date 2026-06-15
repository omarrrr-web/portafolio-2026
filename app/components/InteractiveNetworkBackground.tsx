"use client";
import { useEffect, useRef } from "react";

export default function InteractiveNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position
    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 150, // interaction radius
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    // Node class representing connection points in infrastructure grid
    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseRadius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Slow movement for subtle ambient look
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.baseRadius = Math.random() * 2 + 1;
        this.radius = this.baseRadius;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
            // Push nodes slightly away from mouse or draw them closer
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * 2;
            this.y -= (dy / distance) * force * 2;
            this.radius = this.baseRadius + force * 2;
          } else {
            if (this.radius > this.baseRadius) {
              this.radius -= 0.1;
            }
          }
        } else {
          if (this.radius > this.baseRadius) {
            this.radius -= 0.1;
          }
        }
      }

      draw(context: CanvasRenderingContext2D, color: string) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = color;
        context.fill();
      }
    }

    // Packet class representing data packets traveling along the connections
    class DataPacket {
      startX: number = 0;
      startY: number = 0;
      endX: number = 0;
      endY: number = 0;
      progress: number = 0;
      speed: number = 0;
      color: string = "";

      constructor(nodes: Node[], accentColor: string) {
        this.reset(nodes, accentColor);
      }

      reset(nodes: Node[], accentColor: string) {
        if (nodes.length < 2) return;
        const startNode = nodes[Math.floor(Math.random() * nodes.length)];
        // Find a close node
        let endNode = nodes[Math.floor(Math.random() * nodes.length)];
        let attempts = 0;
        
        while (endNode === startNode || (Math.hypot(endNode.x - startNode.x, endNode.y - startNode.y) > 200 && attempts < 10)) {
          endNode = nodes[Math.floor(Math.random() * nodes.length)];
          attempts++;
        }

        this.startX = startNode.x;
        this.startY = startNode.y;
        this.endX = endNode.x;
        this.endY = endNode.y;
        this.progress = 0;
        this.speed = Math.random() * 0.01 + 0.005;
        this.color = accentColor;
      }

      update(nodes: Node[], accentColor: string) {
        this.progress += this.speed;
        if (this.progress >= 1) {
          this.reset(nodes, accentColor);
        }
      }

      draw(context: CanvasRenderingContext2D) {
        const currentX = this.startX + (this.endX - this.startX) * this.progress;
        const currentY = this.startY + (this.endY - this.startY) * this.progress;

        context.beginPath();
        context.arc(currentX, currentY, 2.5, 0, Math.PI * 2);
        context.fillStyle = this.color;
        context.shadowColor = this.color;
        context.shadowBlur = 8;
        context.fill();
        context.shadowBlur = 0; // reset shadow blur
      }
    }

    // Initialize nodes
    const nodeCount = Math.min(Math.floor((width * height) / 15000), 80);
    const nodes: Node[] = Array.from({ length: nodeCount }, () => new Node());
    
    // Dynamic color fetching from CSS variables
    let themeColors = {
      nodeColor: "rgba(0, 229, 255, 0.25)",
      lineColor: "rgba(27, 36, 49, 0.3)",
      accentColor: "#00E5FF"
    };

    const updateColors = () => {
      if (typeof window === "undefined") return;
      const isLight = document.documentElement.classList.contains("light-mode");
      if (isLight) {
        themeColors = {
          nodeColor: "rgba(59, 130, 246, 0.3)", // blue
          lineColor: "rgba(203, 213, 225, 0.5)", // light border gray
          accentColor: "#3B82F6"
        };
      } else {
        themeColors = {
          nodeColor: "rgba(0, 229, 255, 0.25)", // cyan
          lineColor: "rgba(27, 36, 49, 0.4)", // dark border
          accentColor: "#00E5FF"
        };
      }
    };

    updateColors();

    // Observe class changes on <html> to update colors
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          updateColors();
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    // Initialize packets
    const packets = Array.from({ length: 15 }, () => new DataPacket(nodes, themeColors.accentColor));

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.hypot(dx, dy);

          if (distance < 180) {
            // Fade lines based on distance
            const alpha = (180 - distance) / 180 * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            
            // Adapt opacity based on light/dark mode
            const isLight = document.documentElement.classList.contains("light-mode");
            ctx.strokeStyle = isLight 
              ? `rgba(203, 213, 225, ${alpha * 1.5})` 
              : `rgba(27, 36, 49, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Update and draw nodes
      nodes.forEach((node) => {
        node.update();
        node.draw(ctx, themeColors.nodeColor);
      });

      // Update and draw data packets
      packets.forEach((packet) => {
        packet.update(nodes, themeColors.accentColor);
        packet.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none -z-20 bg-transparent transition-opacity duration-500"
    />
  );
}
