import { motion } from 'framer-motion';
import { Award, FileText, ExternalLink } from 'lucide-react';

const certifications = [
  {
    title: 'IEEE Conference Paper (2025)',
    detail: '"Smart Energy Indication System: Real-Time Monitoring and Control"',
    extra: 'Published at IEEE International Conference on IoT and Embedded Systems',
    type: 'publication',
    icon: FileText,
  },
  {
    title: 'NPTEL — Introduction to Internet of Things',
    detail: 'Elite + Silver, Top 5% among 50,000+ participants',
    extra: 'Score: 86%',
    type: 'certification',
    icon: Award,
  },
  {
    title: 'NPTEL — EV Vehicle Dynamics and Electric Motor Drives',
    detail: 'National Programme on Technology Enhanced Learning',
    type: 'certification',
    icon: Award,
  },
  {
    title: 'Python — HackerRank Certification',
    detail: 'IIT Bombay (Spoken Tutorial)',
    type: 'certification',
    icon: Award,
  },
  {
    title: 'AI For All — Intel Certification Program',
    detail: 'Intel AI Fundamentals & Applications',
    type: 'certification',
    icon: Award,
  },
  {
    title: 'C Programming — Great Learning Certification',
    detail: 'Programming Fundamentals & Data Structures',
    type: 'certification',
    icon: Award,
  },
  {
    title: 'MATLAB Coding — MathWorks Certification',
    detail: 'MATLAB Programming & Simulation',
    type: 'certification',
    icon: Award,
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-mono text-sm tracking-widest uppercase">
            {'// CREDENTIALS'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            <span className="text-white">Certifications & </span>
            <span className="gradient-text">Publications</span>
          </h2>
          <div className="section-divider w-24 mx-auto mt-4" />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {certifications.map((cert, i) => {
            const Icon = cert.icon;
            const isPublication = cert.type === 'publication';

            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`card-hover glass-effect rounded-2xl p-6 relative overflow-hidden ${
                  isPublication ? 'md:col-span-2 ring-1 ring-primary/30' : ''
                }`}
              >
                {isPublication && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-violet to-accent" />
                )}
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isPublication
                      ? 'bg-primary/20 text-primary'
                      : 'bg-accent/20 text-accent'
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold text-sm md:text-base">
                        {cert.title}
                      </h3>
                      {isPublication && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-primary/20 text-primary border border-primary/30 font-bold uppercase tracking-wider">
                          IEEE
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{cert.detail}</p>
                    {cert.extra && (
                      <p className="text-mint text-xs mt-1 font-medium">{cert.extra}</p>
                    )}
                  </div>
                  <ExternalLink size={14} className="text-gray-600 shrink-0 mt-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
