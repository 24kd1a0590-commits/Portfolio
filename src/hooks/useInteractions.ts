import { useRef, useState, useCallback, useEffect } from 'react';

/**
 * Magnetic button effect — element translates slightly toward the cursor on hover.
 * Disabled on touch / small screens via pointer check.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const handleLeave = () => {
      el.style.transform = 'translate(0, 0)';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  return ref;
}

/**
 * 3D tilt effect for cards — rotates on X/Y based on cursor position.
 * Returns ref + handlers to attach to the element.
 */
export function useTilt<T extends HTMLElement>(maxTilt = 8) {
  const ref = useRef<T>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50, active: false });

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(hover: none)').matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - py) * maxTilt * 2, ry: (px - 0.5) * maxTilt * 2 });
    setGlow({ x: px * 100, y: py * 100, active: true });
  }, [maxTilt]);

  const onMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
    setGlow((g) => ({ ...g, active: false }));
  }, []);

  return { ref, tilt, glow, onMouseMove, onMouseLeave };
}

/**
 * Global cursor position for cursor-reactive lighting effects.
 * Returns normalized -1..1 coordinates relative to viewport center.
 */
export function useCursorGlow() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const handler = (e: MouseEvent) => {
      setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return pos;
}
