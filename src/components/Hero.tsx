import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Github, Linkedin } from 'lucide-react';
import { profile } from '@/data/portfolio';
import { useCursorGlow } from '@/hooks/useInteractions';
import HeroVisual from './HeroVisual';
import MagneticButton from './MagneticButton';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const cursor = useCursorGlow();

  // Parallax / scroll transforms
  const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const scaleVisual = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  // Cursor-reactive lighting position
  const glowX = useSpring(cursor.x * 100, { stiffness: 60, damping: 20 });
  const glowY = useSpring(cursor.y * 100, { stiffness: 60, damping: 20 });

  // 3D tilt for visual based on cursor
  const visualRotateX = useSpring((cursor.y - 0.5) * -10, { stiffness: 50, damping: 20 });
  const visualRotateY = useSpring((cursor.x - 0.5) * 10, { stiffness: 50, damping: 20 });

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Cursor-reactive background lighting */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            [glowX, glowY],
            (latest) =>
              `radial-gradient(600px circle at ${latest[0]}% ${latest[1]}%, rgba(99,102,241,0.08), transparent 70%)`
          ),
        }}
      />

      {/* Background layers */}
      <motion.div style={{ y: bgY, opacity: bgOpacity }} className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] radial-glow opacity-60" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-gradient-to-tr from-indigo-900/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-cyan-900/10 to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#07080c] to-transparent z-10" />

      <div className="relative z-10 section-pad w-full">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left content */}
          <motion.div style={{ y: yText, opacity: opacityText }} variants={container} initial="hidden" animate="show">
            <motion.div variants={item} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-medium text-gray-300 tracking-wider uppercase">Software Developer</span>
            </motion.div>

            <motion.h1 variants={item} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] tracking-tight">
              Building practical
              <br />
              software, one{' '}
              <span className="text-gradient">problem</span>
              <br />
              at a time.
            </motion.h1>

            <motion.p variants={item} className="mt-6 text-base lg:text-lg text-gray-400 max-w-xl leading-relaxed">
              Computer Science Engineering student focused on software development, web technologies, Data Structures and Algorithms, and practical AI-driven applications.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <MagneticButton
                variant="primary"
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </MagneticButton>
              <MagneticButton variant="ghost" href={profile.github} target="_blank" rel="noreferrer" ariaLabel="GitHub">
                <Github size={16} />
                GitHub
              </MagneticButton>
              <MagneticButton variant="ghost" href={profile.linkedin} target="_blank" rel="noreferrer" ariaLabel="LinkedIn">
                <Linkedin size={16} />
                LinkedIn
              </MagneticButton>
            </motion.div>

            <motion.div variants={item} className="mt-8 flex items-center gap-2 text-sm text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Open to Software Development Opportunities
            </motion.div>
          </motion.div>

          {/* Right visual with 3D tilt + scroll parallax */}
          <motion.div
            style={{ y: yVisual, scale: scaleVisual, rotateX, rotateY }}
            className="relative [perspective:1000px]"
          >
            <motion.div
              style={{ rotateX: visualRotateX, rotateY: visualRotateY, transformStyle: 'preserve-3d' }}
              className="relative will-change-transform"
            >
              <HeroVisual />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] text-gray-500 uppercase font-medium">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-indigo-400/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
