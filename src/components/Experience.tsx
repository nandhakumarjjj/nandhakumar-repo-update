import { motion } from 'framer-motion';
import { Briefcase, MapPin, CheckCircle2 } from 'lucide-react';

const experience = [
  {
    role: 'Embedded Firmware Developer Intern',
    company: 'SparkDNA (Drives and Automation)',
    location: 'Coimbatore, Tamil Nadu',
    bullets: [
      'Architected and deployed real-time firmware in C and Embedded C on the PlatformIO ecosystem for proprietary industrial automation hardware and embedded targets.',
      'Engineered mobile controller interfaces through Android Studio and MIT App Inventor to enable seamless wireless configuration and telemetry monitoring for remote devices.',
      'Developed responsive web-based UI dashboards using HTML/CSS to provide live visualization of critical machine parameters and operational analytics.',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-mono text-sm tracking-widest uppercase">
            {'// WHERE I\'VE WORKED'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            <span className="text-white">Work </span>
            <span className="gradient-text">Experience</span>
          </h2>
          <div className="section-divider w-24 mx-auto mt-4" />
        </motion.div>

        {/* Experience Cards */}
        <div className="space-y-6">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.role + exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-hover glass-effect rounded-2xl p-6 md:p-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Briefcase size={22} />
                  </div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                      {exp.role}
                    </h3>
                    <p className="text-accent text-sm font-medium mt-1">{exp.company}</p>
                    <p className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                      <MapPin size={12} /> {exp.location}
                    </p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30 self-start">
                  Internship
                </span>
              </div>
              <ul className="space-y-3">
                {exp.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                    <CheckCircle2 size={16} className="text-accent mt-0.5 shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
