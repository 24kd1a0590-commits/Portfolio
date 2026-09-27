import { motion } from 'framer-motion';
import Counter from './Counter';
import { stats } from '@/data/portfolio';
import { useInView } from '@/hooks/useScroll';

export default function Stats() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <section className="relative py-16 md:py-20 section-pad">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group relative glass border-animated rounded-2xl p-5 md:p-6 text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className="text-3xl md:text-5xl font-bold text-gradient mb-1">
                  <Counter value={stat.value} suffix={stat.suffix} start={inView} />
                </div>
                <div className="text-[10px] md:text-xs tracking-wider text-gray-500 uppercase font-medium">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
