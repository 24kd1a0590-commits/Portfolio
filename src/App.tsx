import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import ProblemSolving from '@/components/ProblemSolving';
import Achievements from '@/components/Achievements';
import Certifications from '@/components/Certifications';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SectionDivider from '@/components/SectionDivider';
import { motion, useScroll, useSpring } from 'framer-motion';

function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    const handler = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[100] w-[400px] h-[400px] rounded-full"
      style={{
        left: pos.x - 200,
        top: pos.y - 200,
        background: 'radial-gradient(circle, rgba(99,102,241,0.06), transparent 70%)',
        transition: 'opacity 0.3s',
      }}
    />
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-500"
    />
  );
}

function App() {
  return (
    <div className="relative min-h-screen bg-[#07080c] text-white overflow-x-hidden">
      <CursorGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <SectionDivider variant="gradient" />
        <Stats />
        <About />
        <SectionDivider variant="dots" />
        <Skills />
        <SectionDivider variant="gradient" />
        <Projects />
        <SectionDivider variant="dots" />
        <ProblemSolving />
        <SectionDivider variant="line" />
        <Achievements />
        <SectionDivider variant="dots" />
        <Certifications />
        <SectionDivider variant="line" />
        <Education />
        <SectionDivider variant="gradient" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
