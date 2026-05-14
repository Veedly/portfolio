"use client";

import { useEffect, useRef } from "react";

type ThermodynamicGridProps = React.HTMLAttributes<HTMLDivElement> & {
  resolution?: number;
  coolingFactor?: number;
};

export default function ThermodynamicGrid({
  className = "",
  resolution = 12,
  coolingFactor = 0.975,
  ...props
}: ThermodynamicGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let frameId = 0;
    let grid = new Float32Array();
    let cols = 0;
    let rows = 0;
    let width = 0;
    let height = 0;
    let backgroundColor = "#050505";
    let coldCellColor = "#151515";
    const mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000, active: false };

    const getThermalColor = (temperature: number) => {
      const r = Math.min(255, Math.max(0, temperature * 2.1 * 255));
      const g = Math.min(255, Math.max(0, (temperature * 2.2 - 1) * 210));
      const b = Math.min(255, Math.max(0, (temperature * 2.6 - 2) * 255 + temperature * 90));

      return `rgb(${r + 8}, ${g + 8}, ${b + 16})`;
    };

    const syncThemeColors = () => {
      const styles = window.getComputedStyle(document.documentElement);
      const canvasColor = styles.getPropertyValue("--color-bg-canvas").trim();
      const raisedColor = styles.getPropertyValue("--color-bg-surface").trim();

      backgroundColor = canvasColor || "#050505";
      coldCellColor = raisedColor || "#151515";
    };

    const resize = () => {
      syncThemeColors();

      const nextWidth = container.offsetWidth;
      const nextHeight = container.offsetHeight;
      const ratio = window.devicePixelRatio || 1;

      width = nextWidth;
      height = nextHeight;
      canvas.width = Math.floor(nextWidth * ratio);
      canvas.height = Math.floor(nextHeight * ratio);
      canvas.style.width = `${nextWidth}px`;
      canvas.style.height = `${nextHeight}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      cols = Math.ceil(width / resolution);
      rows = Math.ceil(height / resolution);
      grid = new Float32Array(cols * rows);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      mouse.x = x;
      mouse.y = y;
      mouse.active = isInside;
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
    };

    const update = () => {
      if (mouse.active) {
        const dx = mouse.x - mouse.prevX;
        const dy = mouse.y - mouse.prevY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.max(1, Math.ceil(distance / (resolution / 2)));

        for (let step = 0; step <= steps; step += 1) {
          const progress = step / steps;
          const col = Math.floor((mouse.prevX + dx * progress) / resolution);
          const row = Math.floor((mouse.prevY + dy * progress) / resolution);
          const radius = 1.45;
          const cellRadius = Math.ceil(radius);

          for (let x = -cellRadius; x <= cellRadius; x += 1) {
            for (let y = -cellRadius; y <= cellRadius; y += 1) {
              const nextCol = col + x;
              const nextRow = row + y;
              const distanceFromCenter = Math.sqrt(x * x + y * y);

              if (nextCol >= 0 && nextCol < cols && nextRow >= 0 && nextRow < rows && distanceFromCenter <= radius) {
                const index = nextCol + nextRow * cols;
                grid[index] = Math.min(1, grid[index] + 0.12 * (1 - distanceFromCenter / radius));
              }
            }
          }
        }
      }

      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      syncThemeColors();

      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const index = col + row * cols;
          const temperature = grid[index];
          grid[index] *= coolingFactor;

          if (temperature > 0.05) {
            const size = resolution * (0.72 + temperature * 0.56);
            const offset = (resolution - size) / 2;

            ctx.fillStyle = getThermalColor(temperature);
            ctx.fillRect(col * resolution + offset, row * resolution + offset, size, size);
          } else if (col % 2 === 0 && row % 2 === 0) {
            ctx.fillStyle = coldCellColor;
            ctx.fillRect(col * resolution + resolution / 2 - 1, row * resolution + resolution / 2 - 1, 2, 2);
          }
        }
      }

      frameId = requestAnimationFrame(update);
    };

    resize();
    frameId = requestAnimationFrame(update);

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [coolingFactor, resolution]);

  return (
    <div ref={containerRef} className={`thermodynamic-grid ${className}`.trim()} {...props}>
      <canvas ref={canvasRef} />
    </div>
  );
}
