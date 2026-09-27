import { motion } from 'framer-motion';
import { dsaConcepts } from '@/data/portfolio';
import { useInView } from '@/hooks/useScroll';

const flow = [
  { label: 'ARRAY', color: '#6366f1', icon: '[]' },
  { label: 'HASH', color: '#06b6d4', icon: '#' },
  { label: 'WINDOW', color: '#818cf8', icon: '▭' },
  { label: 'PREFIX', color: '#22d3ee', icon: '∑' },
  { label: 'SEARCH', color: '#a5b4fc', icon: '⌕' },
  { label: 'SOLUTION', color: '#6366f1', icon: '✓' },
];

export default function ProblemSolving() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="problem-solving" className="relative py-20 md:py-28 section-pad overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-900/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5"
          >
            <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">Approach</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
          >
            How I <span className="text-gradient">Think.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-500 text-sm md:text-base"
          >
            106+ LeetCode Problems · Language: Java
          </motion.p>
        </div>

        {/* DSA Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative glass rounded-2xl p-6 md:p-10 overflow-hidden"
        >
          <div className="absolute inset-0 grid-pattern opacity-20" />

          {/* Flow diagram */}
          <div className="relative flex items-center justify-between gap-1 md:gap-2 mb-10 overflow-x-auto pb-2">
            {flow.map((step, i) => (
              <div key={step.label} className="flex items-center gap-1 md:gap-2 shrink-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, type: 'spring', stiffness: 200 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div
                    className="w-12 h-12 md:w-16 md:h-16 rounded-xl glass-strong flex items-center justify-center border transition-colors duration-300"
                    style={{ borderColor: `${step.color}30` }}
                  >
                    <span className="text-lg md:text-xl font-mono font-bold" style={{ color: step.color }}>
                      {step.icon}
                    </span>
                  </div>
                  <span className="text-[8px] md:text-[10px] font-mono text-gray-400 tracking-wider">{step.label}</span>
                </motion.div>
                {i < flow.length - 1 && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.4 + i * 0.12, duration: 0.3 }}
                    className="w-4 md:w-8 h-px bg-gradient-to-r from-indigo-400/40 to-cyan-400/40 origin-left"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Algorithm laboratory */}
          <div className="relative grid md:grid-cols-3 gap-4">
            {/* Array cells */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="glass rounded-xl p-4"
            >
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-3">Array Traversal</div>
              <div className="flex gap-1">
                {[3, 1, 4, 1, 5, 9, 2, 6].map((n, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.7 + i * 0.06 }}
                    className={`w-7 h-7 rounded text-xs font-mono flex items-center justify-center ${
                      i === 4 ? 'bg-indigo-500/30 text-white border border-indigo-400' : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    {n}
                  </motion.div>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-1 text-[9px] text-indigo-300/60 font-mono">
                <span>ptr →</span>
                <span>index 4</span>
              </div>
            </motion.div>

            {/* Binary search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="glass rounded-xl p-4"
            >
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-3">Binary Search</div>
              <div className="flex gap-1">
                {[2, 5, 8, 11, 14, 17, 20, 23].map((n, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.9 + i * 0.05 }}
                    className={`w-7 h-7 rounded text-xs font-mono flex items-center justify-center transition-colors ${
                      i < 3
                        ? 'bg-red-500/10 text-red-400/40 line-through'
                        : i === 3
                        ? 'bg-indigo-500/30 text-white border border-indigo-400'
                        : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    {n}
                  </motion.div>
                ))}
              </div>
              <div className="mt-2 text-[9px] text-cyan-300/60 font-mono">target found at mid</div>
            </motion.div>

            {/* Sliding window */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.0 }}
              className="glass rounded-xl p-4"
            >
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-wider mb-3">Sliding Window</div>
              <div className="flex gap-1">
                {[4, 2, 7, 1, 9, 3, 5, 8].map((n, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.1 + i * 0.05 }}
                    className={`w-7 h-7 rounded text-xs font-mono flex items-center justify-center ${
                      i >= 2 && i <= 4
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30'
                        : 'bg-white/5 text-gray-400'
                    }`}
                  >
                    {n}
                  </motion.div>
                ))}
              </div>
              <div className="mt-2 text-[9px] text-indigo-300/60 font-mono">window [2..4]</div>
            </motion.div>
          </div>

          {/* Concepts */}
          <motion.div
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 1.2 } } }}
            className="mt-8 flex flex-wrap gap-2 justify-center"
          >
            {dsaConcepts.map((concept) => (
              <motion.span
                key={concept}
                variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
                className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-gray-400 font-mono hover:border-indigo-400/30 hover:text-gray-200 transition-colors"
              >
                {concept}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
