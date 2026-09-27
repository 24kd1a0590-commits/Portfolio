import { motion, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion';
import { useRef, useState } from 'react';
import { Camera, Users, Activity, AlertTriangle } from 'lucide-react';

export default function MediQVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scanLineY = useTransform(scrollYProgress, [0.1, 0.5], [0, 100]);
  const boxOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  const counterValue = useTransform(scrollYProgress, [0.3, 0.6], [0, 7]);
  const queueOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  // Detection box positions (percentage)
  const detections = [
    { x: 15, y: 25, w: 14, h: 28, label: 'person', conf: '0.95' },
    { x: 38, y: 30, w: 12, h: 25, label: 'person', conf: '0.91' },
    { x: 58, y: 22, w: 15, h: 30, label: 'person', conf: '0.88' },
    { x: 75, y: 35, w: 11, h: 22, label: 'person', conf: '0.86' },
    { x: 25, y: 55, w: 13, h: 26, label: 'person', conf: '0.82' },
    { x: 52, y: 58, w: 12, h: 24, label: 'person', conf: '0.79' },
    { x: 68, y: 60, w: 10, h: 20, label: 'person', conf: '0.74' },
  ];

  return (
    <div ref={ref} className="relative w-full aspect-[4/3] max-w-[560px] mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 glass-strong rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between glass-strong border-b border-white/5 z-20">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <Camera size={12} className="text-indigo-300" />
            </div>
            <span className="text-xs font-medium text-gray-200">MediQ</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-[9px] font-mono text-red-400/80">REC</span>
          </div>
        </div>

        {/* Camera frame */}
        <div className="absolute top-10 left-0 right-0 bottom-0 bg-gradient-to-b from-slate-900/40 to-indigo-950/30">
          {/* CV grid */}
          <div className="absolute inset-0 grid-pattern opacity-20" />

          {/* People silhouettes */}
          <svg viewBox="0 0 400 260" className="absolute inset-0 w-full h-full">
            {detections.map((d, i) => (
              <motion.ellipse
                key={`head-${i}`}
                cx={(d.x + d.w / 2) * 4}
                cy={d.y * 2.6 + 10}
                rx={d.w * 2}
                ry={d.w * 2}
                fill="rgba(99,102,241,0.08)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
              />
            ))}
            {detections.map((d, i) => (
              <motion.rect
                key={`body-${i}`}
                x={(d.x + d.w / 2 - d.w / 3) * 4}
                y={(d.y + 5) * 2.6}
                width={(d.w / 1.5) * 4}
                height={d.h * 2.6 * 0.6}
                rx="6"
                fill="rgba(99,102,241,0.06)"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 + i * 0.1 }}
              />
            ))}
          </svg>

          {/* Detection boxes */}
          <motion.div style={{ opacity: boxOpacity }} className="absolute inset-0">
            {detections.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
                className="absolute border border-indigo-400/60 rounded"
                style={{
                  left: `${d.x}%`,
                  top: `${d.y}%`,
                  width: `${d.w}%`,
                  height: `${d.h}%`,
                }}
              >
                <div className="absolute -top-4 left-0 px-1 py-0.5 bg-indigo-500/80 rounded text-[7px] font-mono text-white whitespace-nowrap">
                  {d.label} {d.conf}
                </div>
                {/* Corner accents */}
                <div className="absolute -top-px -left-px w-2 h-2 border-t border-l border-cyan-400" />
                <div className="absolute -top-px -right-px w-2 h-2 border-t border-r border-cyan-400" />
                <div className="absolute -bottom-px -left-px w-2 h-2 border-b border-l border-cyan-400" />
                <div className="absolute -bottom-px -right-px w-2 h-2 border-b border-r border-cyan-400" />
              </motion.div>
            ))}
          </motion.div>

          {/* Scanning line */}
          <motion.div
            style={{ top: useTransform(scanLineY, (v) => `${v}%`) }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
          >
            <div className="absolute inset-0 h-8 -translate-y-4 bg-gradient-to-b from-cyan-400/10 to-transparent" />
          </motion.div>
        </div>

        {/* Person counter */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="absolute top-14 right-3 glass-strong rounded-xl p-2.5 z-20"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Users size={11} className="text-indigo-300" />
            <span className="text-[9px] font-medium text-gray-300">Detected</span>
          </div>
          <div className="text-2xl font-bold text-gradient-indigo font-mono">
            <CounterDisplay progress={counterValue} />
          </div>
        </motion.div>

        {/* Queue estimation */}
        <motion.div
          style={{ opacity: queueOpacity }}
          className="absolute bottom-3 left-3 right-3 glass-strong rounded-xl p-3 z-20"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Activity size={11} className="text-cyan-400" />
              <span className="text-[10px] font-medium text-gray-300">Queue Monitor</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/20">
              <AlertTriangle size={9} className="text-amber-400" />
              <span className="text-[8px] text-amber-300">Congested</span>
            </div>
          </div>
          {/* Queue visualization */}
          <div className="flex items-end gap-1 h-8">
            {[60, 75, 85, 90, 82, 95, 88].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.06, duration: 0.4 }}
                className={`flex-1 rounded-t ${h > 85 ? 'bg-amber-400/50' : 'bg-indigo-400/40'}`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1.5 text-[7px] text-gray-500 font-mono">
            <span>EST. WAIT: 8m</span>
            <span>QUEUE: 7</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function CounterDisplay({ progress }: { progress: MotionValue<number> }) {
  const [count, setCount] = useState(0);
  useMotionValueEvent(progress, 'change', (v) => setCount(Math.round(v)));
  return <span>{count}</span>;
}
