import { motion } from 'framer-motion';
import { Cpu, Zap, Radio, Brain, Target, Award } from 'lucide-react';


const highlights = [
  {
    icon: Cpu,
    title: 'Embedded Systems',
    desc: 'Microcontroller programming with 8051, ESP32, Arduino, ARM Cortex-M',
    color: 'from-blue-500 to-cyan-400',
  },
  {
    icon: Zap,
    title: 'Real-Time Firmware',
    desc: 'Bare-metal programming, interrupt-driven systems, PWM control',
    color: 'from-yellow-500 to-orange-400',
  },
  {
    icon: Radio,
    title: 'Wireless & IoT',
    desc: 'LoRa, Wi-Fi, Bluetooth, I2C, SPI, UART, CAN protocols',
    color: 'from-green-500 to-emerald-400',
  },
  {
    icon: Brain,
    title: 'Edge AI',
    desc: 'Edge Impulse integration, AI-powered embedded solutions',
    color: 'from-purple-500 to-pink-400',
  },
  {
    icon: Target,
    title: 'Sensor Interfacing',
    desc: 'ACS712, IR sensors, RFID, RTC, motor drivers & peripherals',
    color: 'from-red-500 to-rose-400',
  },
  {
    icon: Award,
    title: 'Hardware-Software Co-design',
    desc: 'PCB design, simulation, prototyping with strong integration skills',
    color: 'from-cyan-500 to-blue-400',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 relative">
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
            {'// WHO I AM'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            <span className="text-white">About </span>
            <span className="gradient-text">Me</span>
          </h2>
          <div className="section-divider w-24 mx-auto mt-4" />
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="glass-effect rounded-2xl p-8 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary via-accent to-mint" />
            <p className="text-gray-300 text-lg leading-relaxed pl-6">
              I'm <span className="text-white font-semibold">Nandhakumar J</span>, an Electrical and Electronics Engineering 
              student at <span className="text-accent font-semibold">PSG College of Technology, Coimbatore</span>, with 
              hands-on experience in embedded systems, IoT, and real-time firmware development. I'm proficient in 
              <span className="text-mint font-semibold"> C/C++, Embedded C</span>, and microcontroller programming. 
              I've built <span className="text-fire font-semibold">5+ embedded projects</span> involving sensor 
              interfacing, wireless communication (LoRa, Bluetooth, Wi-Fi), and AI edge computing. I'm passionate about 
              building robust <span className="accent-gradient font-bold">embedded software solutions</span>, leveraging 
              strong hardware-software integration skills and a drive for real-time systems.
            </p>
          </div>
        </motion.div>


        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-hover glass-effect rounded-2xl p-6 group cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
