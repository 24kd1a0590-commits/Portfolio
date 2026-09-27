import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Linkedin, Github, ArrowRight } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { useInView } from '@/hooks/useScroll';
import MagneticButton from './MagneticButton';

export default function Contact() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const scrollRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end center'],
  });

  const gridY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <section id="contact" ref={scrollRef} className="relative py-20 md:py-32 section-pad overflow-hidden">
      {/* Cinematic background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Moving grid */}
        <motion.div style={{ y: gridY }} className="absolute inset-0 grid-pattern opacity-20" />

        {/* Rotating rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-indigo-500/5"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-cyan-500/5"
        />

        {/* Scaling glow */}
        <motion.div
          style={{ scale: glowScale }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] radial-glow opacity-40"
        />

        {/* Floating particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-indigo-400/40"
            style={{
              left: `${10 + (i * 8) % 80}%`,
              top: `${15 + (i * 13) % 70}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + (i % 3),
              repeat: Infinity,
              delay: i * 0.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Gradient transition from previous section */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#07080c] via-transparent to-transparent pointer-events-none" />

      <div ref={ref} className="relative max-w-4xl mx-auto text-center">
        <motion.div style={{ y: contentY }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-gray-300 tracking-wider uppercase">Available</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5"
          >
            Let's Build Something
            <br />
            <span className="text-gradient">Meaningful.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg max-w-xl mx-auto mb-10"
          >
            Have an idea, opportunity, or problem worth solving?
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            <MagneticButton variant="primary" href={`mailto:${profile.email}`} ariaLabel="Email">
              <Mail size={16} />
              Email Me
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
            <MagneticButton variant="ghost" href={profile.linkedin} target="_blank" rel="noreferrer" ariaLabel="LinkedIn">
              <Linkedin size={16} />
              LinkedIn
            </MagneticButton>
            <MagneticButton variant="ghost" href={profile.github} target="_blank" rel="noreferrer" ariaLabel="GitHub">
              <Github size={16} />
              GitHub
            </MagneticButton>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-500"
          >
            <a href={`mailto:${profile.email}`} className="hover:text-gray-300 transition-colors">
              {profile.email}
            </a>
            <span className="hidden sm:block w-px h-4 bg-white/10" />
            <a href={`tel:${profile.phone}`} className="hover:text-gray-300 transition-colors font-mono">
              {profile.phone}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
