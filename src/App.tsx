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

function App() {
  return (
    <div className="relative min-h-screen bg-[#07080c] text-white overflow-x-hidden">
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
