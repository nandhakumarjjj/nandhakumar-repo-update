import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Mail, Phone, Download } from 'lucide-react';

function CircuitBoard() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="50" cy="50" r="2" fill="#6366f1" />
          <line x1="50" y1="50" x2="100" y2="50" stroke="#6366f1" strokeWidth="0.5" />
          <line x1="50" y1="50" x2="50" y2="0" stroke="#6366f1" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="1.5" fill="#48cae4" />
          <line x1="0" y1="0" x2="50" y2="0" stroke="#48cae4" strokeWidth="0.5" />
          <circle cx="100" cy="100" r="1.5" fill="#6366f1" />
          <rect x="45" y="45" width="10" height="10" fill="none" stroke="#48cae4" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#circuit)" />
    </svg>
  );
}

function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 4 + Math.random() * 6,
    size: 2 + Math.random() * 4,
  }));

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: `rgba(99, 102, 241, ${0.2 + Math.random() * 0.3})`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-deeper via-dark to-navy" />
      <CircuitBoard />
      <FloatingParticles />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(15,15,26,0.8)_80%)]" />

      {/* Accent bar at top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight"
        >
          <span className="text-white">NANDHA</span>
          <span className="gradient-text">KUMAR</span>
          <span className="text-accent ml-3">J</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mb-6"
        >
          <h2 className="text-xl md:text-2xl font-mono text-glow font-medium">
            {'< '}Embedded Software Engineer{' />'}
          </h2>
          <p className="text-gray-400 mt-2 text-lg">
            B.E. Electrical & Electronics Engineering (Sandwich) | PSG College of Technology
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-gray-300 max-w-3xl mx-auto mb-8 text-base md:text-lg leading-relaxed"
        >
          Proficient in <span className="text-accent font-semibold">C/C++, Embedded C</span>, and microcontroller programming 
          (<span className="text-mint font-semibold">8051, ESP32, Arduino, ARM Cortex-M</span>). 
          Built 5+ embedded projects involving sensor interfacing, wireless communication, and 
          <span className="text-fire font-semibold"> AI edge computing</span>. Passionate about real-time firmware development & IoT solutions.
        </motion.p>

        {/* Location & Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm text-gray-400"
        >
          <span className="flex items-center gap-1">
            <MapPin size={14} className="text-accent" /> Coimbatore, Tamil Nadu
          </span>
          <span className="flex items-center gap-1">
            <Mail size={14} className="text-accent" /> 22e624@psgtech.ac.in
          </span>
          <span className="flex items-center gap-1">
            <Phone size={14} className="text-accent" /> +91-9360330266
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          <a
            href="#projects"
            className="group px-8 py-3.5 bg-gradient-to-r from-primary to-violet text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2"
          >
            View Projects
            <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 border-2 border-accent text-accent rounded-xl font-semibold hover:bg-accent/10 transition-all flex items-center gap-2"
          >
            <Download size={18} />
            Get in Touch
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1 }}
          className="flex items-center justify-center gap-4"
        >
          <a
            href="https://www.linkedin.com/in/nandhakumar-j-8398b1364/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-card/50 border border-edge hover:border-accent hover:bg-accent/10 transition-all group"
            title="LinkedIn"
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-accent fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a
            href="https://github.com/22e624-nandha"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-card/50 border border-edge hover:border-accent hover:bg-accent/10 transition-all group"
            title="GitHub (College)"
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-accent fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
          <a
            href="https://github.com/Nandhakumar-code"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl bg-card/50 border border-edge hover:border-mint hover:bg-mint/10 transition-all group"
            title="GitHub (Personal)"
          >
            <svg className="w-5 h-5 text-gray-400 group-hover:text-mint fill-current" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
          <ChevronDown size={20} className="text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
