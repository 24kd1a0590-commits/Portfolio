import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowRight, X, Github, CheckCircle2, Trophy, Layers } from 'lucide-react';
import { projects, type Project } from '@/data/portfolio';
import { useInView } from '@/hooks/useScroll';
import TravelMateVisual from './visuals/TravelMateVisual';
import RouteNovaVisual from './visuals/RouteNovaVisual';
import MediQVisual from './visuals/MediQVisual';

const visuals: Record<Project['visual'], React.ComponentType> = {
  travelmate: TravelMateVisual,
  routenova: RouteNovaVisual,
  mediq: MediQVisual,
};

export default function Projects() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" ref={ref} className="relative py-20 md:py-28 section-pad overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-900/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5"
          >
            <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">Portfolio</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
          >
            Selected <span className="text-gradient">Work</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-500 text-sm md:text-base"
          >
            Turning ideas into working software.
          </motion.p>
        </div>

        {/* Projects */}
        <div className="space-y-24 md:space-y-32">
          {projects.map((project, i) => {
            const Visual = visuals[project.visual];
            const isReversed = i % 2 === 1;
            return (
              <div key={project.id} className="relative">
                {/* Project index */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="absolute -top-8 left-0 text-6xl md:text-8xl font-bold text-white/[0.03] font-mono select-none"
                >
                  0{i + 1}
                </motion.div>

                <div className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isReversed ? 'lg:[direction:rtl]' : ''}`}>
                  {/* Visual */}
                  <motion.div
                    initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="[direction:ltr] group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative">
                      <Visual />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="[direction:ltr]"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono text-indigo-400">PROJECT 0{i + 1}</span>
                      {project.achievement && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/20">
                          <Trophy size={10} className="text-amber-400" />
                          <span className="text-[10px] text-amber-300 font-medium">Awarded</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">{project.title}</h3>
                    <p className="text-sm md:text-base text-indigo-300/80 mb-4">{project.subtitle}</p>
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">{project.description}</p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/5 text-[11px] md:text-xs text-gray-400 font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Key features preview */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {project.features.slice(0, 4).map((feat) => (
                        <div key={feat} className="flex items-center gap-1.5 text-xs text-gray-400">
                          <CheckCircle2 size={12} className="text-indigo-400/60 shrink-0" />
                          {feat}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setSelected(project)}
                      className="btn-ghost group"
                    >
                      View Details
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative glass-strong rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 glass-strong px-6 py-4 flex items-center justify-between border-b border-white/5 z-10">
          <div>
            <h3 className="text-xl font-bold">{project.title}</h3>
            <p className="text-xs text-indigo-300/80">{project.subtitle}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Layers size={12} /> Overview
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">{project.description}</p>
          </div>

          {/* Problem & Solution */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass rounded-xl p-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Problem</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                {project.id === 'travelmate' && 'Travelers struggle to track journeys, manage expenses, and generate summaries in one place.'}
                {project.id === 'routenova' && 'Rural last-mile delivery suffers from unused vehicle capacity and inefficient route planning.'}
                {project.id === 'mediq' && 'Visitors face unpredictable queues with no way to monitor crowd before arriving.'}
              </p>
            </div>
            <div className="glass rounded-xl p-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Solution</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                {project.id === 'travelmate' && 'A unified travel companion with GPS tracking, route visualization, expense analytics, and automated summaries.'}
                {project.id === 'routenova' && 'A logistics platform matching vehicle capacity to shipments with QR-based delivery verification.'}
                {project.id === 'mediq' && 'A computer-vision system using YOLOv8 for real-time person detection and queue-size estimation.'}
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Key Features</h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {project.features.map((feat) => (
                <div key={feat} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle2 size={14} className="text-indigo-400/60 shrink-0" />
                  {feat}
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Technology Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-gray-300 font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Achievement */}
          {project.achievement && (
            <div className="glass rounded-xl p-4 border-amber-400/20">
              <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <Trophy size={12} /> Achievement
              </h4>
              <p className="text-sm text-gray-300">{project.achievement}</p>
            </div>
          )}

          {/* GitHub */}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost w-full justify-center"
            >
              <Github size={16} />
              View on GitHub
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
