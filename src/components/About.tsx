import { motion } from 'framer-motion';
import { Code2, Cpu, Brain, GitBranch, Boxes } from 'lucide-react';
import { aboutChips } from '@/data/portfolio';
import { useInView } from '@/hooks/useScroll';

const nodes = [
  { label: 'Java', icon: Code2, angle: -90, color: '#6366f1' },
  { label: 'Web', icon: Boxes, angle: -18, color: '#06b6d4' },
  { label: 'DSA', icon: GitBranch, angle: 54, color: '#818cf8' },
  { label: 'AI', icon: Brain, angle: 126, color: '#a5b4fc' },
  { label: 'Problem Solving', icon: Cpu, angle: 198, color: '#22d3ee' },
];

export default function About() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="about" className="relative py-20 md:py-28 section-pad overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left: text */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5"
          >
            <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">Who I Am</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
          >
            More Than Just <span className="text-gradient-animated">Code.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg leading-relaxed mb-8"
          >
            I'm a Computer Science Engineering student passionate about building practical software solutions and solving problems through technology. My current focus is strengthening software development fundamentals, Data Structures and Algorithms, and modern web development while building real-world projects.
          </motion.p>

          <motion.div
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.4 } } }}
            className="flex flex-wrap gap-2.5"
          >
            {aboutChips.map((chip) => (
              <motion.span
                key={chip}
                variants={{ hidden: { opacity: 0, scale: 0.8, y: 10 }, show: { opacity: 1, scale: 1, y: 0 } }}
                className="px-4 py-2 rounded-full glass text-sm font-medium text-gray-300 hover:text-white hover:border-indigo-400/30 transition-colors duration-300"
              >
                {chip}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Right: technical profile visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative aspect-square max-w-[460px] mx-auto w-full"
        >
          {/* Connecting lines */}
          <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
            {nodes.map((node, i) => {
              const rad = (node.angle * Math.PI) / 180;
              const r = 140;
              const x = 200 + r * Math.cos(rad);
              const y = 200 + r * Math.sin(rad);
              return (
                <motion.line
                  key={i}
                  x1="200"
                  y1="200"
                  x2={x}
                  y2={y}
                  stroke="rgba(99,102,241,0.2)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                />
              );
            })}
          </svg>

          {/* Center node */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-2xl glow-indigo">
              <span className="text-white font-bold text-lg md:text-xl font-mono">DEV</span>
            </div>
          </motion.div>

          {/* Orbiting nodes */}
          {nodes.map((node, i) => {
            const rad = (node.angle * Math.PI) / 180;
            const r = 140;
            const x = 50 + (r / 4) * Math.cos(rad);
            const y = 50 + (r / 4) * Math.sin(rad);
            const Icon = node.icon;
            return (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.15, type: 'spring', stiffness: 200, damping: 14 }}
                className="absolute z-10"
                style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                  className="glass-strong rounded-xl px-3 py-2.5 flex items-center gap-2 hover:border-indigo-400/40 transition-colors duration-300"
                >
                  <Icon size={14} style={{ color: node.color }} />
                  <span className="text-xs font-medium text-gray-200 whitespace-nowrap">{node.label}</span>
                </motion.div>
              </motion.div>
            );
          })}

          {/* Pulsing rings */}
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-indigo-400/20"
          />
        </motion.div>
      </div>
    </section>
  );
}
