import { motion } from 'framer-motion';

type Props = {
  variant?: 'line' | 'gradient' | 'dots';
  className?: string;
};

export default function SectionDivider({ variant = 'line', className = '' }: Props) {
  if (variant === 'gradient') {
    return (
      <div className={`relative h-px w-full overflow-hidden ${className}`}>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="h-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent origin-left"
        />
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center gap-2 py-2 ${className}`}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
            className="w-1 h-1 rounded-full bg-indigo-400/40"
          />
        ))}
      </div>
    );
  }

  return (
    <div className={`relative h-px w-full bg-white/5 ${className}`}>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute inset-0 bg-gradient-to-r from-indigo-500/40 via-cyan-400/40 to-indigo-500/40 origin-left"
      />
    </div>
  );
}
