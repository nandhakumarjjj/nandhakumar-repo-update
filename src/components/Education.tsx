import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, School } from 'lucide-react';

const education = [
  {
    degree: 'B.E. Electrical & Electronics Engineering (Sandwich)',
    institution: 'PSG College of Technology, Coimbatore',
    board: 'Anna University',
    year: '2022 – 2027',
    grade: 'CGPA: 8.24/10',
    icon: GraduationCap,
    color: 'from-primary to-accent',
    highlight: true,
    details: 'Consistent academic improvement from 7.44 (Sem I) to 8.24 (Sem VIII)',
  },
  {
    degree: 'HSC (XII)',
    institution: 'Govt. Higher Secondary School, Matrapalli',
    board: 'TamilNadu State Board',
    year: '2022',
    grade: '90.0%',
    icon: BookOpen,
    color: 'from-green-400 to-emerald-500',
    highlight: false,
  },
  {
    degree: 'SSLC (X)',
    institution: 'Govt. Secondary School, Matrapalli',
    board: 'TamilNadu State Board',
    year: '2020',
    grade: '80%',
    icon: School,
    color: 'from-purple-400 to-pink-500',
    highlight: false,
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24 relative bg-deeper/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-mono text-sm tracking-widest uppercase">
            {'// ACADEMIC BACKGROUND'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            <span className="text-white">Education</span>
          </h2>
          <div className="section-divider w-24 mx-auto mt-4" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-mint to-purple-500" />

          {education.map((edu, i) => {
            const Icon = edu.icon;
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`relative flex items-center mb-12 last:mb-0 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${edu.color} flex items-center justify-center shadow-lg`}>
                    <Icon size={20} className="text-white" />
                  </div>
                </div>

                {/* Card */}
                <div className={`ml-20 md:ml-0 md:w-5/12 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className={`card-hover glass-effect rounded-2xl p-6 ${
                    edu.highlight ? 'ring-1 ring-primary/30' : ''
                  }`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${edu.color} text-white`}>
                        {edu.year}
                      </span>
                      {edu.highlight && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-primary/20 text-primary border border-primary/30 font-semibold">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">{edu.degree}</h3>
                    <p className="text-accent text-sm font-medium mb-1">{edu.institution}</p>
                    <p className="text-gray-500 text-xs mb-3">{edu.board}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-mint">{edu.grade}</span>
                    </div>
                    {edu.details && (
                      <p className="text-gray-400 text-xs mt-2 italic">{edu.details}</p>
                    )}
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
