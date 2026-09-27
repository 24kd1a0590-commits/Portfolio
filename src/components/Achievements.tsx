import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Trophy, Award, Clock } from 'lucide-react';
import { achievements, counterMoment } from '@/data/portfolio';
import { useInView } from '@/hooks/useScroll';
import Counter from './Counter';

const icons = [Trophy, Award, Clock];

export default function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);

  const { ref: viewRef, inView } = useInView<HTMLDivElement>();

  return (
    <section id="achievements" ref={ref} className="relative py-20 md:py-28 section-pad overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-amber-900/5 rounded-full blur-3xl pointer-events-none" />

      <div ref={viewRef} className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-5"
          >
            <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">Milestones</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold"
          >
            <span className="text-gradient">Recognition</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/5" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top bg-gradient-to-b from-indigo-500 via-cyan-400 to-indigo-500"
          />

          {achievements.map((ach, i) => {
            const Icon = icons[i];
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className={`relative flex items-center mb-12 last:mb-0 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      ach.isHighlight
                        ? 'bg-amber-500/20 border-amber-400/40 shadow-lg shadow-amber-500/20'
                        : 'glass-strong border-indigo-400/30'
                    }`}
                  >
                    <Icon size={20} className={ach.isHighlight ? 'text-amber-400' : 'text-indigo-300'} />
                  </motion.div>
                </div>

                {/* Card */}
                <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className={`glass rounded-2xl p-5 md:p-6 ${
                      ach.isHighlight ? 'border-amber-400/20 shadow-lg shadow-amber-500/5' : ''
                    }`}
                  >
                    <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
                      <span
                        className={`text-2xl md:text-3xl font-bold ${
                          ach.isHighlight ? 'text-amber-400' : 'text-gradient-indigo'
                        }`}
                      >
                        {ach.rank}
                      </span>
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-white mb-1">{ach.event}</h3>
                    <p className="text-xs text-indigo-300/70 mb-2">{ach.project}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">{ach.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Counter moment */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 md:mt-28 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/30 to-cyan-950/20 rounded-3xl blur-2xl" />
          <div className="relative glass-strong rounded-3xl p-8 md:p-12 overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-20" />
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
              {counterMoment.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-3xl md:text-5xl lg:text-6xl font-bold text-gradient mb-2">
                    {stat.isText ? (
                      stat.value
                    ) : (
                      <Counter value={stat.value as number} suffix={stat.suffix} start={inView} />
                    )}
                  </div>
                  <div className="text-[10px] md:text-xs tracking-wider text-gray-500 uppercase font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
