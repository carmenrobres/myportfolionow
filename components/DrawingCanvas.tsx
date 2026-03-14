import React, { useRef, useEffect, useState, useCallback } from 'react';

type BrushPreset = {
  label: string;
  size: number;
  opacity: number;
  color: string;
  blur: number;
};

const BRUSHES: BrushPreset[] = [
  { label: '✦',  size: 3,  opacity: 0.9, color: '#0f0f0f', blur: 0 },    // fine ink
  { label: '●',  size: 12, opacity: 0.55, color: '#0f0f0f', blur: 0 },   // marker
  { label: '◆',  size: 28, opacity: 0.18, color: '#0f0f0f', blur: 6 },   // soft shadow
  { label: '★',  size: 8,  opacity: 0.8,  color: '#b8ccb4', blur: 0 },   // sage
  { label: '◯',  size: 22, opacity: 0.35, color: '#b8ccb4', blur: 4 },   // sage wash
];

const DARK_BRUSHES: BrushPreset[] = [
  { label: '✦',  size: 3,  opacity: 0.9, color: '#f0efe9', blur: 0 },
  { label: '●',  size: 12, opacity: 0.55, color: '#f0efe9', blur: 0 },
  { label: '◆',  size: 28, opacity: 0.18, color: '#f0efe9', blur: 6 },
  { label: '★',  size: 8,  opacity: 0.85, color: '#b8ccb4', blur: 0 },
  { label: '◯',  size: 22, opacity: 0.35, color: '#b8ccb4', blur: 4 },
];

interface Point { x: number; y: number; pressure: number; }

const DrawingCanvas: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef<Point | null>(null);
  const [activeBrush, setActiveBrush] = useState(0);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const brushes = isDark ? DARK_BRUSHES : BRUSHES;

  // Resize canvas to fill parent
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const { width, height } = canvas.parentElement!.getBoundingClientRect();
      // Save existing drawing
      const tmp = document.createElement('canvas');
      tmp.width = canvas.width;
      tmp.height = canvas.height;
      tmp.getContext('2d')!.drawImage(canvas, 0, 0);
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d')!.drawImage(tmp, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const getPoint = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement): Point => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      const t = e.touches[0];
      return {
        x: (t.clientX - rect.left) * scaleX,
        y: (t.clientY - rect.top) * scaleY,
        pressure: (t as any).force ?? 0.5,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
      pressure: 0.5,
    };
  };

  const drawStroke = useCallback((from: Point, to: Point, brush: BrushPreset) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const dist = Math.hypot(to.x - from.x, to.y - from.y);
    const steps = Math.max(1, Math.floor(dist / 2));

    ctx.save();
    if (brush.blur > 0) {
      ctx.filter = `blur(${brush.blur}px)`;
    }

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const x = from.x + (to.x - from.x) * t;
      const y = from.y + (to.y - from.y) * t;
      const pressure = from.pressure + (to.pressure - from.pressure) * t;
      const radius = (brush.size * (0.5 + pressure * 0.5)) / 2;

      ctx.beginPath();
      ctx.arc(x, y, Math.max(0.5, radius), 0, Math.PI * 2);
      ctx.fillStyle = brush.color;
      ctx.globalAlpha = brush.opacity * (0.6 + pressure * 0.4);
      ctx.fill();
    }

    ctx.restore();
    ctx.globalAlpha = 1;
    ctx.filter = 'none';
  }, []);

  // Mouse events
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onDown = (e: MouseEvent) => {
      if (!isActive) return;
      isDrawing.current = true;
      lastPoint.current = getPoint(e, canvas);
      setHasDrawn(true);
    };

    const onMove = (e: MouseEvent) => {
      if (!isDrawing.current || !lastPoint.current || !isActive) return;
      const pt = getPoint(e, canvas);
      drawStroke(lastPoint.current, pt, brushes[activeBrush]);
      lastPoint.current = pt;
    };

    const onUp = () => { isDrawing.current = false; lastPoint.current = null; };

    // Touch
    const onTouchStart = (e: TouchEvent) => {
      if (!isActive) return;
      e.preventDefault();
      isDrawing.current = true;
      lastPoint.current = getPoint(e, canvas);
      setHasDrawn(true);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDrawing.current || !lastPoint.current || !isActive) return;
      e.preventDefault();
      const pt = getPoint(e, canvas);
      drawStroke(lastPoint.current, pt, brushes[activeBrush]);
      lastPoint.current = pt;
    };

    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onUp);

    return () => {
      canvas.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onUp);
    };
  }, [activeBrush, brushes, drawStroke, isActive]);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  return (
    <div className="absolute inset-0 z-20">
      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          cursor: isActive ? 'crosshair' : 'default',
          pointerEvents: isActive ? 'auto' : 'none',
        }}
      />

      {/* Toolbar — bottom right of hero */}
      <div
        className="absolute bottom-8 right-6 sm:right-10 lg:right-16 flex items-center gap-3 z-30"
        style={{ pointerEvents: 'auto' }}
      >
        {/* Toggle draw mode */}
        <button
          onClick={() => setIsActive(v => !v)}
          title={isActive ? 'Stop drawing' : 'Draw on the page'}
          className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] px-3 py-2 border transition-all duration-200 font-mono"
          style={{
            fontFamily: "'DM Mono', monospace",
            background: isActive ? (isDark ? '#f0efe9' : '#0f0f0f') : 'transparent',
            color: isActive ? (isDark ? '#0f0f0f' : '#f0efe9') : (isDark ? '#6b6b63' : '#8a8a82'),
            borderColor: isActive ? (isDark ? '#f0efe9' : '#0f0f0f') : (isDark ? '#2a2a27' : '#e0dfd8'),
          }}
        >
          <span style={{ fontSize: '14px' }}>✏</span>
          {isActive ? 'Drawing' : 'Draw'}
        </button>

        {/* Brush picker — only when active */}
        {isActive && (
          <div className="flex items-center gap-1.5">
            {brushes.map((b, i) => (
              <button
                key={i}
                onClick={() => setActiveBrush(i)}
                title={`Brush ${i + 1}`}
                className="w-8 h-8 flex items-center justify-center transition-all duration-150"
                style={{
                  fontSize: i === 0 ? '10px' : i === 1 ? '14px' : i === 2 ? '18px' : '12px',
                  opacity: activeBrush === i ? 1 : 0.35,
                  background: activeBrush === i
                    ? (isDark ? 'rgba(240,239,233,0.12)' : 'rgba(15,15,15,0.08)')
                    : 'transparent',
                  color: b.color,
                  border: activeBrush === i
                    ? `1px solid ${b.color}`
                    : '1px solid transparent',
                  transform: activeBrush === i ? 'scale(1.15)' : 'scale(1)',
                }}
              >
                {b.label}
              </button>
            ))}

            {/* Clear */}
            {hasDrawn && (
              <button
                onClick={clear}
                title="Clear canvas"
                className="w-8 h-8 flex items-center justify-center text-[10px] transition-opacity duration-150"
                style={{
                  opacity: 0.5,
                  fontFamily: "'DM Mono', monospace",
                  color: isDark ? '#f0efe9' : '#0f0f0f',
                  border: `1px solid ${isDark ? '#2a2a27' : '#e0dfd8'}`,
                }}
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>

      {/* Hint — only on first load, fades out */}
      {!hasDrawn && !isActive && (
        <div
          className="absolute bottom-8 right-6 sm:right-10 lg:right-[200px] pointer-events-none"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: isDark ? '#3a3a37' : '#c8c7c0',
          }}
        >
          ← draw on me
        </div>
      )}
    </div>
  );
};

export default DrawingCanvas;
