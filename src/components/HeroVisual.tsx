import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HeroVisual() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const coreTechs = ['JAVA', 'REACT', 'PYTHON', 'DSA'];

  return (
    <div className="relative w-full aspect-square max-w-[520px] mx-auto">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-cyan-500/10 rounded-full blur-3xl" />

      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="200" cy="200" r="195" fill="none" stroke="rgba(99,102,241,0.08)" strokeWidth="1" strokeDasharray="2 6" />
        </svg>
      </motion.div>

      {/* Middle ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-8"
      >
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(6,182,212,0.08)" strokeWidth="1" strokeDasharray="1 4" />
        </svg>
      </motion.div>

      {/* Grid backdrop */}
      <div className="absolute inset-16 rounded-full grid-pattern opacity-30" />

      {/* Terminal window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={mounted ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[70%] glass-strong rounded-xl overflow-hidden shadow-2xl"
      >
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
          <div className="w-2 h-2 rounded-full bg-green-500/60" />
          <span className="ml-2 text-[9px] font-mono text-gray-500">terminal</span>
        </div>
        <div className="p-3 font-mono text-[9px] leading-relaxed">
          <div className="text-gray-500">$ <span className="text-cyan-400">git</span> <span className="text-gray-300">log --oneline</span></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, staggerChildren: 0.3 }}
            className="mt-1 space-y-0.5"
          >
            {['feat: add route optimization', 'fix: queue detection logic', 'refactor: DSA solutions', 'init: portfolio deploy'].map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.5 + i * 0.3 }}
                className="text-indigo-300/70"
              >
                <span className="text-gray-600">{i + 1}.</span> {line}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Core tech nodes - positioned around center */}
      {coreTechs.map((tech, i) => {
        const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
        const radius = 38; // percentage
        const x = 50 + radius * Math.cos(angle);
        const y = 50 + radius * Math.sin(angle);
        return (
          <motion.div
            key={tech}
            initial={{ opacity: 0, scale: 0 }}
            animate={mounted ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4 + i * 0.15, type: 'spring', stiffness: 200, damping: 15 }}
            className="absolute z-10"
            style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="glass-strong rounded-xl px-3 py-2 md:px-4 md:py-2.5 shadow-xl border-white/10 hover:border-indigo-400/40 transition-colors duration-300">
                <span className="text-[10px] md:text-xs font-mono font-semibold text-gradient-indigo">{tech}</span>
              </div>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Connecting lines from center to nodes */}
      <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full pointer-events-none">
        {coreTechs.map((_, i) => {
          const angle = (i / 4) * Math.PI * 2 - Math.PI / 2;
          const radius = 38;
          const x = 200 + radius * 4 * Math.cos(angle);
          const y = 200 + radius * 4 * Math.sin(angle);
          return (
            <motion.line
              key={i}
              x1="200"
              y1="200"
              x2={x}
              y2={y}
              stroke="rgba(99,102,241,0.15)"
              strokeWidth="1"
              strokeDasharray="3 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
            />
          );
        })}
      </svg>

      {/* Center node */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={mounted ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 14 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-2xl glow-indigo"
        >
          <span className="text-white font-bold text-lg md:text-xl font-mono">&lt;/&gt;</span>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-50" />
        </motion.div>
      </motion.div>

      {/* Floating code fragments */}
      {[
        { text: 'const solve = () =>', top: '8%', left: '4%', delay: 1.2 },
        { text: 'O(n log n)', top: '75%', left: '6%', delay: 1.6 },
        { text: '{ }', top: '70%', right: '8%', delay: 1.4 },
        { text: 'async/await', top: '15%', right: '4%', delay: 1.8 },
      ].map((frag, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={mounted ? { opacity: 0.5, scale: 1 } : {}}
          transition={{ delay: frag.delay, duration: 0.6 }}
          className="absolute font-mono text-[9px] md:text-[10px] text-indigo-300/40 pointer-events-none"
          style={{ top: frag.top, left: frag.left, right: frag.right }}
        >
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
          >
            {frag.text}
          </motion.span>
        </motion.div>
      ))}

      {/* Data particles */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const r = 45 + (i % 3) * 5;
        return (
          <motion.div
            key={`p-${i}`}
            className="absolute w-1 h-1 rounded-full bg-indigo-400/60"
            style={{ left: `${50 + r * Math.cos(angle)}%`, top: `${50 + r * Math.sin(angle)}%` }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        );
      })}
    </div>
  );
}
