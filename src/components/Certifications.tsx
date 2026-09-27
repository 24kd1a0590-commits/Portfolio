import { motion } from 'framer-motion';
import {
  Layers,
  BrainCircuit,
  Cloud,
  Smartphone,
  ShieldCheck,
  Cpu,
  BarChart3,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react';
import { certifications } from '@/data/portfolio';
import { useInView } from '@/hooks/useScroll';

const iconMap: Record<string, LucideIcon> = {
  Layers,
  BrainCircuit,
  Cloud,
  Smartphone,
  ShieldCheck,
  Cpu,
  BarChart3,
};

export default function Certifications() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section id="certifications" ref={ref} className="relative py-20 md:py-28 section-pad overflow-hidden">
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-violet-900/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5"
          >
            <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">Credentials</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
          >
            Learning Never <span className="text-gradient">Stops.</span>
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {certifications.map((cert, i) => {
            const Icon = iconMap[cert.icon] ?? Layers;
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className={`group relative glass border-animated rounded-2xl p-5 md:p-6 overflow-hidden border ${cert.border} transition-all duration-500`}
              >
                {/* Gradient glow */}
                <div className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${cert.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative">
                  {/* Icon + year */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center border ${cert.border}`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    {cert.year && (
                      <span className="text-xs font-mono text-gray-500">{cert.year}</span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm md:text-base font-semibold text-white mb-1 leading-tight">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-indigo-300/70 mb-3">{cert.issuer}</p>

                  {/* Description */}
                  <p className="text-xs text-gray-400 leading-relaxed mb-4">
                    {cert.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/5 text-[10px] text-gray-400 font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Badge */}
                  <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className={`h-1 flex-1 rounded-full bg-gradient-to-r ${cert.badge} opacity-60`} />
                    <ExternalLink size={12} className="ml-3 text-gray-600 group-hover:text-gray-400 transition-colors" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
