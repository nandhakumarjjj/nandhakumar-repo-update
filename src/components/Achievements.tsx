import { motion } from 'framer-motion';
import { Trophy, TrendingUp, BookOpen, Users, Star } from 'lucide-react';

const achievements = [
  {
    icon: TrendingUp,
    title: 'Consistent Academic Growth',
    desc: 'CGPA improvement from 7.44 (Sem I) to 8.24 (Sem VIII), demonstrating strong learning curve',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
  },
  {
    icon: Trophy,
    title: 'NPTEL IoT — Elite + Silver',
    desc: 'Ranked in Top 5% among 50,000+ participants nationwide',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
  {
    icon: BookOpen,
    title: 'IEEE Conference Paper',
    desc: 'Published research on smart energy systems, demonstrating technical writing capabilities',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Star,
    title: 'Technical Exhibitions',
    desc: 'Active participant in college technical symposiums and project exhibitions',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
  },
];

const extracurricular = [
  {
    icon: Users,
    title: 'PSG Tech Robotics Club',
    desc: 'Member — Participated in inter-college robotics competitions and workshops',
  },
  {
    icon: Users,
    title: 'Technical Outreach Volunteer',
    desc: 'Conducted embedded systems workshops for school students',
  },
  {
    icon: Star,
    title: 'Sports & Cultural Activities',
    desc: 'Active in sports and cultural activities — Balanced academic excellence with holistic development',
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative bg-deeper/50">
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
            {'// RECOGNITION & ACTIVITIES'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            <span className="text-white">Achievements & </span>
            <span className="gradient-text">Leadership</span>
          </h2>
          <div className="section-divider w-24 mx-auto mt-4" />
        </motion.div>

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {achievements.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-hover glass-effect rounded-2xl p-6 flex items-start gap-4"
              >
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center shrink-0`}>
                  <Icon size={24} className={item.color} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Extracurricular */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Extracurricular & Leadership
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {extracurricular.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="card-hover glass-effect rounded-2xl p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={22} className="text-accent" />
                  </div>
                  <h4 className="text-white font-semibold text-sm mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
