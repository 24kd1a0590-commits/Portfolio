import { useEffect, useRef, useState } from 'react';

type Props = {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  start?: boolean;
};

export default function Counter({ value, duration = 2000, decimals = 0, suffix = '', start = true }: Props) {
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!start || started.current) return;
    started.current = true;

    const isFloat = !Number.isInteger(value);
    const dec = decimals > 0 ? decimals : isFloat ? 2 : 0;

    let startTime: number | null = null;
    const animate = (ts: number) => {
      if (startTime === null) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplay(value);
    };
    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  const isFloat = !Number.isInteger(value);
  const dec = decimals > 0 ? decimals : isFloat ? 2 : 0;

  return (
    <>
      {display.toFixed(dec)}
      {suffix}
    </>
  );
}
