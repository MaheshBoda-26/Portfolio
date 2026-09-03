"use client";

import { useRef, useEffect, useState, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  char: string;
  baseAlpha: number;
  currentAlpha: number;
  delay: number;
  shimmer: number;
}

const CHARS = " .:-=+*#%@".split("");
const CANVAS_SIZE = 400;
const FONT_SIZE = 7;
const COL_GAP = FONT_SIZE * 0.7;
const ROW_GAP = FONT_SIZE * 1.1;

const generateTextParticles = (text: string, canvasSize: number): Particle[] => {
  const offscreen = document.createElement("canvas");
  const offCtx = offscreen.getContext("2d")!;
  offscreen.width = canvasSize;
  offscreen.height = canvasSize;

  offCtx.font = `${FONT_SIZE}px monospace`;
  offCtx.fillStyle = "white";
  offCtx.textAlign = "center";
  offCtx.textBaseline = "middle";

  const lines = text.split("\n");
  const lineHeight = FONT_SIZE * 1.5;
  const startY = (canvasSize - lines.length * lineHeight) / 2;

  lines.forEach((line, lineIndex) => {
    offCtx.fillText(line, canvasSize / 2, startY + lineIndex * lineHeight);
  });

  const imageData = offCtx.getImageData(0, 0, canvasSize, canvasSize);
  const pixels = imageData.data;

  const particles: Particle[] = [];

  for (let y = 0; y < canvasSize; y += ROW_GAP) {
    for (let x = 0; x < canvasSize; x += COL_GAP) {
      const i = (Math.floor(y) * canvasSize + Math.floor(x)) * 4;
      const a = pixels[i + 3];

      if (a > 128) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const brightness = (r + g + b) / (3 * 255);
        const charIndex = Math.floor(brightness * (CHARS.length - 1));

        particles.push({
          x: x + (Math.random() - 0.5) * 400,
          y: y + (Math.random() - 0.5) * 400,
          targetX: x,
          targetY: y,
          vx: 0,
          vy: 0,
          char: CHARS[charIndex],
          baseAlpha: 0.4 + brightness * 0.6,
          currentAlpha: 0,
          delay: Math.random() * 0.4,
          shimmer: Math.random() * Math.PI * 2,
        });
      }
    }
  }

  return particles;
};

export function AsciiPortrait({ text = "MAHESH\nBODA", size = 400 }: { text?: string; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef<number | null>(null);
  const animationIdRef = useRef<number>();
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    const particles = generateTextParticles(text, size);
    particlesRef.current = particles;
    startTimeRef.current = performance.now();
    setDataReady(true);

    const animate = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsed = (time - startTimeRef.current) / 1000;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${FONT_SIZE}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      particlesRef.current.forEach((p) => {
        const elapsedSinceStart = elapsed - p.delay;
        if (elapsedSinceStart < 0) return;

        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.hypot(dx, dy);

        const mx = mouseRef.current.x - p.x;
        const my = mouseRef.current.y - p.y;
        const mDist = Math.hypot(mx, my);

        const spring = 0.03;
        const damp = 0.85;
        const repelStrength = 8000;

        p.vx += dx * spring;
        p.vy += dy * spring;

        if (mouseRef.current.active && mDist < 150 && mDist > 0) {
          const force = (repelStrength / (mDist * mDist)) * (1 - mDist / 150);
          p.vx -= (mx / mDist) * force;
          p.vy -= (my / mDist) * force;
        }

        p.vx *= damp;
        p.vy *= damp;
        p.x += p.vx;
        p.y += p.vy;

        p.currentAlpha = Math.min(p.currentAlpha + 0.02, p.baseAlpha);

        const shimmerAlpha = Math.sin(elapsed * 3 + p.shimmer) * 0.1;
        const alpha = Math.max(0, Math.min(1, p.currentAlpha + shimmerAlpha));

        ctx.globalAlpha = alpha;
        ctx.fillStyle = `rgba(100, 255, 218, ${alpha})`;
        ctx.fillText(p.char, p.x, p.y);
      });

      ctx.globalAlpha = 1;
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [text, size]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    mouseRef.current.active = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
  }, []);

  if (!dataReady) {
    return (
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="ascii-portrait"
        aria-hidden="true"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="ascii-portrait"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
      role="img"
      aria-label="ASCII art portrait"
    />
  );
}