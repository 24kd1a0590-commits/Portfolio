import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, TrendingUp, Trophy, Wallet } from 'lucide-react';

export default function TravelMateVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const routeProgress = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const markerOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  const chartOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  const summaryOpacity = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]);
  const badgeOpacity = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);

  // Route path points (relative to viewBox 400x300)
  const routePoints = [
    { x: 60, y: 220 },
    { x: 120, y: 160 },
    { x: 180, y: 190 },
    { x: 240, y: 100 },
    { x: 320, y: 70 },
  ];
  const pathD = routePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <div ref={ref} className="relative w-full aspect-[4/3] max-w-[560px] mx-auto">
      {/* Map panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 glass-strong rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Map background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 to-slate-950/60">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          {/* Abstract map shapes */}
          <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
            {/* Roads */}
            <path d="M0 80 L400 60" stroke="rgba(255,255,255,0.04)" strokeWidth="8" fill="none" />
            <path d="M0 180 L400 200" stroke="rgba(255,255,255,0.04)" strokeWidth="6" fill="none" />
            <path d="M100 0 L120 300" stroke="rgba(255,255,255,0.03)" strokeWidth="5" fill="none" />
            <path d="M280 0 L260 300" stroke="rgba(255,255,255,0.03)" strokeWidth="5" fill="none" />
            {/* Water area */}
            <path d="M0 250 Q100 240 200 260 T400 250 L400 300 L0 300 Z" fill="rgba(6,182,212,0.05)" />
          </svg>
        </div>

        {/* Route line */}
        <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
          <motion.path
            d={pathD}
            fill="none"
            stroke="url(#travelmate-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="600"
            style={{ strokeDashoffset: useTransform(routeProgress, (v) => 600 - 600 * v) }}
          />
          <defs>
            <linearGradient id="travelmate-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>
        </svg>

        {/* Markers */}
        <motion.div style={{ opacity: markerOpacity }}>
          {routePoints.map((p, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: `${(p.x / 400) * 100}%`, top: `${(p.y / 300) * 100}%`, transform: 'translate(-50%, -100%)' }}
            >
              <motion.div
                initial={{ scale: 0, y: -10 }}
                whileInView={{ scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.15, type: 'spring' }}
                className="relative"
              >
                <MapPin size={20} className="text-indigo-400 drop-shadow-lg" fill="rgba(99,102,241,0.3)" />
                {i === 0 && (
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-indigo-300 whitespace-nowrap">START</span>
                )}
                {i === routePoints.length - 1 && (
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-cyan-300 whitespace-nowrap">END</span>
                )}
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Moving marker along route */}
        <motion.div
          style={{ opacity: markerOpacity }}
          className="absolute"
        >
          <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
            <motion.circle
              r="5"
              fill="#06b6d4"
              style={{
                cx: useTransform(routeProgress, (v) => {
                  const idx = v * (routePoints.length - 1);
                  const i = Math.floor(idx);
                  const f = idx - i;
                  const p1 = routePoints[Math.min(i, routePoints.length - 1)];
                  const p2 = routePoints[Math.min(i + 1, routePoints.length - 1)];
                  return p1.x + (p2.x - p1.x) * f;
                }),
                cy: useTransform(routeProgress, (v) => {
                  const idx = v * (routePoints.length - 1);
                  const i = Math.floor(idx);
                  const f = idx - i;
                  const p1 = routePoints[Math.min(i, routePoints.length - 1)];
                  const p2 = routePoints[Math.min(i + 1, routePoints.length - 1)];
                  return p1.y + (p2.y - p1.y) * f;
                }),
              }}
            />
          </svg>
        </motion.div>

        {/* Header bar */}
        <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between glass-strong border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center">
              <MapPin size={12} className="text-indigo-300" />
            </div>
            <span className="text-xs font-medium text-gray-200">TravelMate</span>
          </div>
          <span className="text-[9px] font-mono text-gray-500">LIVE TRACKING</span>
        </div>

        {/* Expense analytics overlay */}
        <motion.div
          style={{ opacity: chartOpacity }}
          className="absolute bottom-3 left-3 right-3 glass-strong rounded-xl p-3"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Wallet size={11} className="text-cyan-400" />
              <span className="text-[10px] font-medium text-gray-300">Expense Analytics</span>
            </div>
            <span className="text-[9px] text-gray-500 font-mono">₹2,450</span>
          </div>
          <div className="flex items-end gap-1.5 h-12">
            {[40, 65, 35, 80, 55, 90, 45].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
                className="flex-1 rounded-t bg-gradient-to-t from-indigo-500/40 to-cyan-400/60"
              />
            ))}
          </div>
        </motion.div>

        {/* Travel summary card */}
        <motion.div
          style={{ opacity: summaryOpacity }}
          className="absolute top-12 right-3 w-32 glass-strong rounded-lg p-2.5"
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <TrendingUp size={10} className="text-emerald-400" />
            <span className="text-[9px] font-medium text-gray-300">Trip Summary</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[8px]">
              <span className="text-gray-500">Distance</span>
              <span className="text-gray-300 font-mono">42 km</span>
            </div>
            <div className="flex justify-between text-[8px]">
              <span className="text-gray-500">Duration</span>
              <span className="text-gray-300 font-mono">2h 15m</span>
            </div>
            <div className="flex justify-between text-[8px]">
              <span className="text-gray-500">Stops</span>
              <span className="text-gray-300 font-mono">5</span>
            </div>
          </div>
        </motion.div>

        {/* SIH Achievement badge */}
        <motion.div
          style={{ opacity: badgeOpacity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="glass-strong rounded-xl px-4 py-3 flex items-center gap-2.5 shadow-2xl glow-indigo"
          >
            <Trophy size={18} className="text-amber-400" />
            <div>
              <div className="text-xs font-bold text-white">TOP 50</div>
              <div className="text-[8px] text-gray-400">Smart India Hackathon</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
