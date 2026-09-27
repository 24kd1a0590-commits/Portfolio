import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, School, MapPin } from 'lucide-react';
import { education } from '@/data/portfolio';
import { useInView } from '@/hooks/useScroll';

export default function Education() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);

  const { ref: viewRef, inView } = useInView<HTMLDivElement>();

  return (
    <section id="education" ref={viewRef} className="relative py-20 md:py-28 section-pad overflow-hidden">
      <div ref={ref} className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5"
          >
            <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">Background</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
          >
            <span className="text-gradient">Education</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/5" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-indigo-500 to-cyan-400"
          />

          {education.map((edu, i) => {
            const isLeft = i % 2 === 0;
            const isCurrent = edu.period.includes('Present');
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`relative flex items-center mb-8 last:mb-0 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                      isCurrent ? 'bg-indigo-500/20 border-indigo-400/40' : 'glass-strong border-white/10'
                    }`}
                  >
                    {isCurrent ? (
                      <GraduationCap size={14} className="text-indigo-300" />
                    ) : (
                      <School size={14} className="text-gray-400" />
                    )}
                  </motion.div>
                </div>

                {/* Card */}
                <div className={`w-full md:w-1/2 pl-14 md:pl-0 ${isLeft ? 'md:pr-10 md:text-right' : 'md:pl-10'}`}>
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="glass rounded-xl p-4 md:p-5"
                  >
                    <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
                      <span className="text-xs font-mono text-indigo-300 px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-400/20">
                        {edu.period}
                      </span>
                      {isCurrent && (
                        <span className="flex items-center gap-1 text-[10px] text-emerald-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-white mb-1">{edu.institution}</h3>
                    <p className="text-xs text-gray-400 mb-2">{edu.degree}</p>
                    <div className={`flex items-center gap-3 text-xs ${isLeft ? 'md:justify-end' : ''}`}>
                      <span className="text-indigo-300 font-mono font-medium">{edu.detail}</span>
                      <span className="flex items-center gap-1 text-gray-500">
                        <MapPin size={10} />
                        {edu.location}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
