import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { Code2, Globe, Binary, Boxes, Wrench, Network, type LucideIcon } from 'lucide-react';
import { skillGroups } from '@/data/portfolio';
import { useInView } from '@/hooks/useScroll';
import { useTilt } from '@/hooks/useInteractions';

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Globe,
  Binary,
  Boxes,
  Wrench,
  Network,
};

// Hover visual for specific skills
function SkillHoverVisual({ skill }: { skill: string | null }) {
  if (!skill) return null;
  const lower = skill.toLowerCase();

  if (lower === 'java') {
    return (
      <div className="font-mono text-[10px] text-indigo-300/70 space-y-0.5">
        <div>public class Solution {'{'}</div>
        <div className="pl-3">public static void main() {'{'}</div>
        <div className="pl-6">System.out.println("Hello");</div>
        <div className="pl-3">{'}'}</div>
        <div>{'}'}</div>
      </div>
    );
  }
  if (lower === 'react.js' || lower === 'react') {
    return (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded border border-cyan-400/30 bg-cyan-500/10 flex items-center justify-center text-[8px] text-cyan-300">A</div>
        <div className="text-cyan-300/70 text-[10px]">→</div>
        <div className="w-6 h-6 rounded border border-cyan-400/30 bg-cyan-500/10 flex items-center justify-center text-[8px] text-cyan-300">B</div>
        <div className="text-cyan-300/70 text-[10px]">→</div>
        <div className="w-6 h-6 rounded border border-cyan-400/30 bg-cyan-500/10 flex items-center justify-center text-[8px] text-cyan-300">C</div>
      </div>
    );
  }
  if (lower === 'opencv') {
    return (
      <div className="relative w-24 h-12 rounded border border-indigo-400/30 overflow-hidden bg-indigo-950/30">
        <motion.div
          animate={{ y: [0, 48, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
        />
        <div className="absolute inset-0 grid-pattern opacity-40" />
      </div>
    );
  }
  if (lower === 'leaflet.js' || lower === 'openstreetmap') {
    return (
      <svg width="96" height="48" viewBox="0 0 96 48" className="text-cyan-400/50">
        <path d="M10 38 Q30 10 50 28 T86 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="10" cy="38" r="2" fill="currentColor" />
        <circle cx="86" cy="14" r="2" fill="currentColor" />
      </svg>
    );
  }
  if (lower === 'binary search') {
    return (
      <div className="flex items-center gap-1">
        {[3, 6, 8, 11, 14, 17, 20].map((n, i) => (
          <div
            key={i}
            className={`w-5 h-5 rounded text-[8px] flex items-center justify-center font-mono ${
              i < 3 ? 'bg-red-500/10 text-red-400/40 line-through' : i === 3 ? 'bg-indigo-500/30 text-white border border-indigo-400' : 'bg-white/5 text-gray-400'
            }`}
          >
            {n}
          </div>
        ))}
      </div>
    );
  }
  if (lower === 'python') {
    return (
      <div className="font-mono text-[10px] text-yellow-300/70">
        <div>def solve():</div>
        <div className="pl-3">return [x for x in nums]</div>
      </div>
    );
  }
  return null;
}

// Constellation node positions (percentage around center)
const constellationNodes = [
  { label: 'Java', angle: -90, color: '#6366f1', group: 0 },
  { label: 'Python', angle: -54, color: '#a5b4fc', group: 0 },
  { label: 'C', angle: -18, color: '#818cf8', group: 0 },
  { label: 'JavaScript', angle: 18, color: '#06b6d4', group: 1 },
  { label: 'React.js', angle: 54, color: '#22d3ee', group: 1 },
  { label: 'Django', angle: 90, color: '#67e8f9', group: 1 },
  { label: 'DSA', angle: 126, color: '#818cf8', group: 2 },
  { label: 'Computer Vision', angle: 162, color: '#a5b4fc', group: 3 },
  { label: 'Git/GitHub', angle: 198, color: '#6366f1', group: 4 },
];

export default function Skills() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const constellationRef = useRef<HTMLDivElement>(null);
  const { ref: tiltRef, tilt, glow, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>(6);

  return (
    <section id="skills" className="relative py-20 md:py-28 section-pad overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-cyan-900/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5"
          >
            <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">Capabilities</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
          >
            Technical <span className="text-gradient">Arsenal</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-500 text-sm md:text-base max-w-xl mx-auto"
          >
            A focused toolkit built across languages, frameworks, and engineering tools.
          </motion.p>
        </div>

        {/* Interactive constellation */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-12 items-center">
          {/* Constellation visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            ref={tiltRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
              transform: `perspective(800px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transformStyle: 'preserve-3d',
            }}
            className="relative aspect-square max-w-[420px] mx-auto w-full"
          >
            {/* Cursor glow */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(200px circle at ${glow.x}% ${glow.y}%, rgba(99,102,241,0.12), transparent 70%)`,
                opacity: glow.active ? 1 : 0,
              }}
            />

            {/* Connecting lines */}
            <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full pointer-events-none">
              {constellationNodes.map((node, i) => {
                const rad = (node.angle * Math.PI) / 180;
                const r = 140;
                const x = 200 + r * Math.cos(rad);
                const y = 200 + r * Math.sin(rad);
                const isActive = activeGroup === node.group || hoveredSkill === node.label;
                return (
                  <motion.line
                    key={`line-${i}`}
                    x1="200"
                    y1="200"
                    x2={x}
                    y2={y}
                    stroke={isActive ? node.color : 'rgba(99,102,241,0.12)'}
                    strokeWidth={isActive ? 1.5 : 1}
                    strokeDasharray={isActive ? '0' : '3 3'}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                  />
                );
              })}
            </svg>

            {/* Center node */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-2xl glow-indigo"
              >
                <span className="text-[8px] md:text-[9px] font-mono font-semibold text-white text-center leading-tight px-2">
                  SOFTWARE<br/>DEVELOPMENT
                </span>
              </motion.div>
            </motion.div>

            {/* Orbiting nodes */}
            {constellationNodes.map((node, i) => {
              const rad = (node.angle * Math.PI) / 180;
              const r = 140;
              const x = 50 + (r / 4) * Math.cos(rad);
              const y = 50 + (r / 4) * Math.sin(rad);
              const isActive = activeGroup === node.group || hoveredSkill === node.label;
              return (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 200, damping: 14 }}
                  className="absolute z-10"
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
                    onMouseEnter={() => { setHoveredSkill(node.label); setActiveGroup(node.group); }}
                    onMouseLeave={() => { setHoveredSkill(null); setActiveGroup(null); }}
                    className="glass-strong rounded-xl px-2.5 py-2 cursor-pointer transition-all duration-300"
                    style={{
                      borderColor: isActive ? `${node.color}50` : undefined,
                      boxShadow: isActive ? `0 0 20px ${node.color}30` : undefined,
                    }}
                  >
                    <span
                      className="text-[9px] md:text-[10px] font-mono font-medium whitespace-nowrap transition-colors duration-300"
                      style={{ color: isActive ? node.color : '#9ca3af' }}
                    >
                      {node.label}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Skill clusters */}
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            {skillGroups.map((group, gi) => {
              const Icon = iconMap[group.icon] ?? Code2;
              return (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: gi * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative glass rounded-2xl p-5 md:p-6 hover:border-indigo-400/20 transition-colors duration-500 overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-700/10 flex items-center justify-center border border-indigo-400/20">
                      <Icon size={18} className="text-indigo-300" />
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-white">{group.title}</h3>
                  </div>

                  <div className="relative flex flex-wrap gap-2">
                    {group.skills.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={inView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: gi * 0.1 + 0.3 + si * 0.04 }}
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs md:text-sm text-gray-300 hover:text-white hover:border-indigo-400/30 hover:bg-indigo-500/5 transition-all duration-300 cursor-default"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Hover visual preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={hoveredSkill ? { opacity: 1 } : { opacity: 0 }}
          className="mt-8 h-16 glass rounded-xl flex items-center justify-center overflow-hidden"
        >
          <div className="text-center">
            <div className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">{hoveredSkill}</div>
            <SkillHoverVisual skill={hoveredSkill} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
