import { motion } from 'framer-motion';
import { useState } from 'react';

type SkillCategory = {
  category: string;
  icon: string;
  color: string;
  skills: { name: string; level: number }[];
};

const skillsData: SkillCategory[] = [
  {
    category: 'Languages',
    icon: '💻',
    color: 'from-blue-500 to-cyan-400',
    skills: [
      { name: 'C', level: 48 },
      { name: 'C++', level: 45 },
      { name: 'Embedded C', level: 48 },
      { name: 'Python', level: 42 },
      { name: 'HTML/CSS', level: 40 },
      { name: 'JavaScript', level: 38 },
    ],
  },
  {
    category: 'Microcontrollers',
    icon: '🔧',
    color: 'from-green-500 to-emerald-400',
    skills: [
      { name: '8051 (AT89S52)', level: 90 },
      { name: 'ESP32', level: 88 },
      { name: 'ESP32-CAM', level: 85 },
      { name: 'Arduino (ATmega328)', level: 88 },
      { name: 'ARM Cortex-M (Basics)', level: 60 },
    ],
  },
  {
    category: 'Communication Protocols',
    icon: '📡',
    color: 'from-purple-500 to-pink-400',
    skills: [
      { name: 'I2C', level: 85 },
      { name: 'SPI', level: 82 },
      { name: 'UART', level: 90 },
      { name: 'Bluetooth (HC-05)', level: 85 },
      { name: 'Wi-Fi', level: 85 },
      { name: 'LoRa', level: 80 },
      { name: 'CAN (Basics)', level: 55 },
      { name: 'RS-232', level: 70 },
    ],
  },
  {
    category: 'Sensors & Peripherals',
    icon: '🎛️',
    color: 'from-orange-500 to-yellow-400',
    skills: [
      { name: 'ACS712', level: 90 },
      { name: 'IR Sensors', level: 88 },
      { name: 'RFID (RC522)', level: 85 },
      { name: 'RTC (DS1302)', level: 82 },
      { name: 'Motor Drivers (L293D)', level: 85 },
      { name: 'Relays', level: 88 },
    ],
  },
  {
    category: 'Development Tools',
    icon: '🛠️',
    color: 'from-red-500 to-rose-400',
    skills: [
      { name: 'Keil µVision', level: 85 },
      { name: 'Arduino IDE', level: 90 },
      { name: 'Xilinx Vivado', level: 60 },
      { name: 'Proteus', level: 80 },
      { name: 'Multisim', level: 75 },
      { name: 'EasyEDA', level: 78 },
      { name: 'TinkerCAD', level: 80 },
    ],
  },
  {
    category: 'Simulation & Design',
    icon: '📐',
    color: 'from-cyan-500 to-blue-400',
    skills: [
      { name: 'MATLAB R2023b', level: 75 },
      { name: 'PSPICE 9.2', level: 70 },
      { name: 'SolidWorks (3D)', level: 65 },
      { name: 'Git & GitHub', level: 80 },
    ],
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="skills" className="py-24 relative bg-deeper/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-mono text-sm tracking-widest uppercase">
            {'// TECHNICAL ARSENAL'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            <span className="text-white">Technical </span>
            <span className="gradient-text">Skills</span>
          </h2>
          <div className="section-divider w-24 mx-auto mt-4" />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {skillsData.map((cat, i) => (
            <button
              key={cat.category}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === i
                  ? 'bg-accent/20 text-accent border border-accent/40'
                  : 'bg-card/50 text-gray-400 border border-edge hover:text-white hover:bg-card'
              }`}
            >
              <span>{cat.icon}</span>
              <span className="hidden sm:inline">{cat.category}</span>
            </button>
          ))}
        </motion.div>

        {/* Active Category Skills */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-effect rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">{skillsData[activeTab].icon}</span>
              <h3 className="text-2xl font-bold text-white">{skillsData[activeTab].category}</h3>
            </div>
            <div className="space-y-5">
              {skillsData[activeTab].skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-200 font-medium text-sm">{skill.name}</span>
                    <span className="text-accent text-xs font-mono">{skill.level}%</span>
                  </div>
                  <div className="h-2.5 bg-deeper rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={`h-full rounded-full bg-gradient-to-r ${skillsData[activeTab].color}`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Soft Skills</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Hardware-Software Co-design',
              'Debugging',
              'Cross-functional Collaboration',
              'Problem Solving',
              'Technical Writing',
              'Research',
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full bg-card/50 border border-edge text-gray-300 text-sm hover:border-accent hover:text-accent transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
