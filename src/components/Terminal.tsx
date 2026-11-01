import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const terminalLines = [
  { type: 'comment', text: '// Initializing Nandhakumar\'s Embedded Profile...' },
  { type: 'command', text: '> system.init("ESP32", "RTOS_MODE")' },
  { type: 'output', text: '✓ System initialized successfully' },
  { type: 'command', text: '> load_skills(["C", "C++", "Embedded_C"])' },
  { type: 'output', text: '✓ 3 languages loaded | Proficiency: 48%' },
  { type: 'command', text: '> connect("LoRa", "WiFi", "Bluetooth")' },
  { type: 'output', text: '✓ Wireless protocols active' },
  { type: 'command', text: '> deploy_projects(5)' },
  { type: 'output', text: '✓ 5 embedded projects deployed successfully' },
  { type: 'command', text: '> set_interests(["EEE", "Embedded", "IoT", "Edge AI"])' },
  { type: 'output', text: '✓ Interest areas configured' },
  { type: 'command', text: '> status.check()' },
  { type: 'success', text: '🚀 Profile ready. All systems operational.' },
];

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= terminalLines.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(timer);
  }, []);

  const getLineColor = (type: string) => {
    switch (type) {
      case 'comment': return 'text-gray-500';
      case 'command': return 'text-accent';
      case 'output': return 'text-mint';
      case 'success': return 'text-yellow-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto mt-12"
    >
      <div className="rounded-2xl overflow-hidden border border-edge/50 shadow-2xl">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-surface/80 border-b border-edge/30">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-gray-500 text-xs font-mono ml-2">nk@embedded-dev ~ serial-monitor</span>
        </div>

        {/* Terminal Body */}
        <div className="bg-deeper/95 p-5 font-mono text-sm min-h-[300px]">
          {terminalLines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`${getLineColor(line.type)} mb-1.5 leading-relaxed`}
            >
              {line.text}
            </motion.div>
          ))}
          {visibleLines < terminalLines.length && (
            <span className="inline-block w-2 h-4 bg-accent animate-pulse" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
