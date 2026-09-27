import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Package, Truck, Route, MapPin, QrCode, CheckCircle2 } from 'lucide-react';

const steps = [
  { icon: Package, label: 'Shipment', desc: 'Create bundle' },
  { icon: Truck, label: 'Vehicle', desc: 'Find transport' },
  { icon: Package, label: 'Capacity', desc: 'Match load' },
  { icon: Route, label: 'Route', desc: 'Plan delivery' },
  { icon: MapPin, label: 'Delivery', desc: 'Last-mile drop' },
  { icon: QrCode, label: 'Verify', desc: 'QR confirm' },
];

export default function RouteNovaVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const activeStep = useTransform(scrollYProgress, [0.1, 0.8], [0, 5]);
  const routeDraw = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
  const qrOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

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
        <div className="absolute top-0 left-0 right-0 p-3 flex items-center justify-between glass-strong border-b border-white/5 z-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Truck size={12} className="text-cyan-300" />
            </div>
            <span className="text-xs font-medium text-gray-200">RouteNova</span>
          </div>
          <span className="text-[9px] font-mono text-gray-500">RURAL LOGISTICS</span>
        </div>

        {/* Map background */}
        <div className="absolute inset-0 top-10 bottom-0">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 to-slate-950/40" />
          <div className="absolute inset-0 dot-pattern opacity-30" />
          <svg viewBox="0 0 400 280" className="absolute inset-0 w-full h-full">
            {/* Rural road network */}
            <path d="M50 140 Q100 100 150 130 T280 90 L350 60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
            <path d="M50 200 L150 180 L250 210 L350 180" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="4" />
            {/* Main delivery route */}
            <motion.path
              d="M50 140 Q100 100 150 130 T280 90 L350 60"
              fill="none"
              stroke="url(#routenova-gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="400"
              style={{ strokeDashoffset: useTransform(routeDraw, (v) => 400 - 400 * v) }}
            />
            <defs>
              <linearGradient id="routenova-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            {/* Route points */}
            {[
              { x: 50, y: 140 },
              { x: 150, y: 130 },
              { x: 280, y: 90 },
              { x: 350, y: 60 },
            ].map((p, i) => (
              <motion.circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="4"
                fill="#06b6d4"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.15 }}
              />
            ))}
          </svg>
        </div>

        {/* Workflow steps - left side vertical */}
        <div className="absolute top-12 left-2 flex flex-col gap-1.5 z-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-1.5"
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-colors duration-300 ${
                    i <= 3 ? 'bg-cyan-500/15 border-cyan-400/30' : 'bg-white/[0.02] border-white/5'
                  }`}
                >
                  <Icon size={12} className={i <= 3 ? 'text-cyan-300' : 'text-gray-500'} />
                </div>
                <span className={`text-[8px] font-medium ${i <= 3 ? 'text-gray-200' : 'text-gray-600'}`}>
                  {step.label}
                </span>
                {i < steps.length - 1 && (
                  <div className={`absolute left-[13px] top-7 w-px h-1.5 ${i < 3 ? 'bg-cyan-400/30' : 'bg-white/5'}`} />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Shipment card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="absolute top-14 right-3 w-28 glass-strong rounded-lg p-2 z-10"
        >
          <div className="flex items-center gap-1 mb-1">
            <Package size={10} className="text-cyan-400" />
            <span className="text-[8px] font-medium text-gray-300">Bundle #A12</span>
          </div>
          <div className="space-y-0.5">
            <div className="flex justify-between text-[7px]">
              <span className="text-gray-500">Items</span>
              <span className="text-gray-300 font-mono">12</span>
            </div>
            <div className="flex justify-between text-[7px]">
              <span className="text-gray-500">Weight</span>
              <span className="text-gray-300 font-mono">45kg</span>
            </div>
            <div className="flex justify-between text-[7px]">
              <span className="text-gray-500">Capacity</span>
              <span className="text-cyan-300 font-mono">85%</span>
            </div>
          </div>
          {/* Capacity bar */}
          <div className="mt-1.5 h-1 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '85%' }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="h-full bg-gradient-to-r from-cyan-400 to-indigo-400"
            />
          </div>
        </motion.div>

        {/* Vehicle tracking */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-16 right-3 glass-strong rounded-lg p-2 z-10"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <Truck size={10} className="text-indigo-300" />
            <span className="text-[8px] font-medium text-gray-300">Vehicle #V07</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[7px] text-gray-400">En route · 12 min</span>
          </div>
        </motion.div>

        {/* QR verification */}
        <motion.div
          style={{ opacity: qrOpacity }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 glass-strong rounded-xl p-2.5 flex items-center gap-2 z-20"
        >
          <div className="relative w-12 h-12 rounded-lg bg-white/5 border border-cyan-400/20 p-1.5">
            <div className="grid grid-cols-3 gap-px h-full">
              {Array.from({ length: 9 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: Math.random() > 0.4 ? 1 : 0.2 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.03 }}
                  className="bg-cyan-400/60 rounded-sm"
                />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <CheckCircle2 size={12} className="text-emerald-400" />
              <span className="text-[10px] font-semibold text-white">Verified</span>
            </div>
            <div className="text-[8px] text-gray-500">QR delivery confirmed</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
