import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight, Layers, Wifi, Shield, Zap, Bot, Gauge, Joystick, Dog, CircuitBoard, LayoutDashboard, Gamepad2, Network, Video, Play, ExternalLink } from 'lucide-react';

const DEMO_VIDEOS_DRIVE_URL = 'https://drive.google.com/drive/folders/1BsRP77yPN4N6In86YjfpXEn6NQffgBVV?usp=sharing';

type Project = {
  title: string;
  subtitle: string;
  icon: typeof Layers;
  color: string;
  bgColor: string;
  description: string[];
  skills: string[];
  ongoing?: boolean;
  videoUrl?: string;
  videoLabel?: string;
};

const projects: Project[] = [
  {
    title: 'AgenticPLC — AI-Assisted PLC Automation Platform',
    subtitle: 'Antigravity IDE + FreeRTOS + React + JSON',
    icon: CircuitBoard,
    color: 'text-cyan-400',
    bgColor: 'from-cyan-500/20 to-teal-500/20',
    description: [
      'Designed and built a complete PLC automation software platform from scratch on a custom ESP32 target, developed end-to-end using the Antigravity agentic IDE for AI-assisted code generation, review, and iteration.',
      'Engineered a FreeRTOS-based real-time scan-cycle engine and a JSON rule interpreter to execute ladder-logic-equivalent programs.',
      'Implemented Wi-Fi based wireless program deployment to the controller alongside a browser-based React digital twin for live visualization of controller state.',
    ],
    skills: ['FreeRTOS', 'ESP32', 'React', 'JSON', 'Agentic AI Development', 'PLC / Ladder Logic'],
    ongoing: true,
  },
  {
    title: 'CAN-Based Windscreen Wiper Control',
    subtitle: 'ESP32 + MCP2515 CAN Controller',
    icon: Network,
    color: 'text-sky-400',
    bgColor: 'from-sky-500/20 to-indigo-500/20',
    description: [
      'Implemented a CAN bus based windscreen wiper control system using an ESP32 paired with an MCP2515 CAN controller/transceiver module.',
      'Designed message framing and node communication over the CAN bus to trigger wiper speed and intermittent modes, mirroring automotive body-control networking.',
      'Explored practical CAN protocol implementation as a foundation for automotive-grade embedded networking.',
    ],
    skills: ['CAN Bus', 'MCP2515', 'ESP32', 'SPI', 'Automotive Embedded Systems'],
  },
  {
    title: 'Closed-Loop Vector Control of NEMA23 Stepper Motor',
    subtitle: 'NEMA23 + DM542E Microstepping Driver',
    icon: Gauge,
    color: 'text-orange-400',
    bgColor: 'from-orange-500/20 to-red-500/20',
    description: [
      'Implemented closed-loop vector control of a stepper motor via a DM542E microstepping driver, configuring current regulation, microstep resolution, and direction/pulse timing.',
      'Validated dynamic response under varying load, building on earlier open-loop speed control work on the same platform.',
      'Directly applicable to real-time motor-control firmware on industrial MCU platforms.',
    ],
    skills: ['DM542E Driver', 'Microstepping', 'Motor Control', 'Real-Time Firmware', 'Industrial MCU'],
  },
  {
    title: 'Multi-Device IoT Dashboard Suite',
    subtitle: 'Weather Station, Multimeter & Smart Energy Meter — React + ESP32',
    icon: LayoutDashboard,
    color: 'text-teal-400',
    bgColor: 'from-teal-500/20 to-emerald-500/20',
    description: [
      'Built a suite of real-time web dashboards for a weather station, digital multimeter, and smart energy meter, each backed by an ESP32 device streaming live sensor data.',
      'Used agentic AI-assisted development to accelerate front-end and data-flow design across all three dashboards.',
      'Delivered consistent, real-time data visualization across multiple embedded device types.',
    ],
    skills: ['React', 'JavaScript', 'ESP32', 'Real-Time Dashboards', 'Agentic AI Development'],
  },
  {
    title: 'Wireless Gesture-Controlled Robotic Car',
    subtitle: 'ESP32 Master + Arduino Slave + MPU-6050',
    icon: Joystick,
    color: 'text-pink-400',
    bgColor: 'from-pink-500/20 to-rose-500/20',
    description: [
      'Architected a master-slave wireless control system where an ESP32 captures real-time gesture data from an MPU-6050 accelerometer/gyroscope.',
      'Transmitted directional commands over Bluetooth from the ESP32 master to an Arduino slave for real-time motor actuation.',
      'Demonstrated cross-MCU communication and gesture-based human-machine interaction.',
    ],
    skills: ['ESP32', 'Arduino', 'MPU-6050', 'Bluetooth', 'Master-Slave Architecture', 'Motor Actuation'],
    videoUrl: DEMO_VIDEOS_DRIVE_URL,
    videoLabel: 'Watch Gesture Car Demo in Drive',
  },
  {
    title: 'Wi-Fi Controlled Robotic Dog',
    subtitle: 'ESP32 + Multi-Servo Quadruped',
    icon: Dog,
    color: 'text-indigo-400',
    bgColor: 'from-indigo-500/20 to-blue-500/20',
    description: [
      'Built a quadruped robotic dog driven by an ESP32 and multiple servo motors, controlled in real time from a mobile device over Wi-Fi (IEEE 802.11b).',
      'Coordinated multi-servo gait sequencing for stable walking and turning motions.',
      'Explored real-time wireless actuation control for legged robotics.',
    ],
    skills: ['ESP32', 'Servo Motors', 'Wi-Fi', 'Gait Control', 'Robotics'],
    videoUrl: DEMO_VIDEOS_DRIVE_URL,
    videoLabel: 'Watch Robotic Dog Demo in Drive',
  },
  {
    title: 'Browser-Based Open-World Game (GTA-Style)',
    subtitle: 'JavaScript + HTML5 Canvas',
    icon: Gamepad2,
    color: 'text-fuchsia-400',
    bgColor: 'from-fuchsia-500/20 to-purple-500/20',
    description: [
      'Developed a browser-based, GTA-style 2D open-world game in JavaScript using the HTML5 Canvas API.',
      'Implemented player movement, collision handling, and vehicle interaction using an agentic AI coding workflow.',
      'Explored applying embedded real-time thinking — state machines and timing loops — to interactive front-end development.',
    ],
    skills: ['JavaScript', 'HTML5 Canvas', 'Game Development', 'Agentic AI Development'],
  },
  {
    title: 'KLUG Smart Energy Indication System',
    subtitle: 'ACS712 + RTC + SIM800L + HC-05',
    icon: Zap,
    color: 'text-yellow-400',
    bgColor: 'from-yellow-500/20 to-orange-500/20',
    description: [
      'Developed complete energy monitoring and load-control system using ACS712 current sensor, RTC (DS1302), SIM800L GSM module, and HC-05 Bluetooth.',
      'Implemented real-time measurement of voltage, current, power, and cost with automated shutdown based on user-defined limits.',
      'Added timer scheduling, EEPROM-based data storage, and mobile control via Bluetooth/SMS.',
      'Built reliable embedded architecture for continuous monitoring and remote load management.',
    ],
    skills: ['Embedded C', 'Sensor Interfacing', 'EEPROM', 'UART', 'Bluetooth', 'GSM'],
  },
  {
    title: 'IoT-Based Human-Wildlife Conflict Early Warning System',
    subtitle: 'ESP32 + LoRa + Edge Impulse AI',
    icon: Wifi,
    color: 'text-green-400',
    bgColor: 'from-green-500/20 to-emerald-500/20',
    description: [
      'Designed long-range IoT alert system using ESP32, ESP32-CAM, and LoRa communication for early wildlife detection.',
      'Integrated lightweight AI on ESP32-CAM using Edge Impulse to identify elephants and trigger real-time alerts.',
      'Implemented image capture, event transmission, and remote receiver notification over LoRa.',
      'Demonstrated low-power, field-deployable system for rural safety.',
    ],
    skills: ['ESP32', 'ESP32-CAM', 'LoRa', 'Edge Impulse AI', 'Wi-Fi', 'Embedded C', 'Low-Power Design'],
  },
  {
    title: 'IoT-Based Smart Door Access System',
    subtitle: 'ESP32-CAM + RFID + Cloud Logging',
    icon: Shield,
    color: 'text-blue-400',
    bgColor: 'from-blue-500/20 to-cyan-500/20',
    description: [
      'Built secure door access system with RFID UID authentication and ESP32-CAM image capture as two-step verification.',
      'Implemented Wi-Fi-based image upload to cloud, real-time access logging with timestamp storage for monitoring.',
      'Developed firmware for fast decision control and reliable relay-based door unlocking.',
      'Achieved scalable IoT security solution suitable for labs and access-restricted areas.',
    ],
    skills: ['ESP32-CAM', 'RFID', 'Wi-Fi', 'Cloud Integration', 'Relay Control', 'Security Firmware'],
    videoUrl: DEMO_VIDEOS_DRIVE_URL,
    videoLabel: 'Watch Smart Door Demo in Drive',
  },
  {
    title: 'Bluetooth-Based Current Monitoring & Load Control',
    subtitle: 'Arduino + HC-05 + ACS712',
    icon: Layers,
    color: 'text-purple-400',
    bgColor: 'from-purple-500/20 to-pink-500/20',
    description: [
      'Developed real-time current measurement and load-control system using ACS712 hall-effect sensor and HC-05 Bluetooth module.',
      'Implemented mobile-based ON/OFF commands with continuous current feedback for user monitoring.',
      'Added threshold-based overcurrent protection and stable sensor filtering algorithms.',
      'Demonstrated practical understanding of sensing, actuation, and wireless control.',
    ],
    skills: ['Arduino', 'C++', 'ACS712', 'Bluetooth', 'Sensor Filtering', 'Actuation Control'],
  },
  {
    title: 'Line Follower Robot using 89S52 Microcontroller',
    subtitle: 'Bare-Metal Control',
    icon: Bot,
    color: 'text-red-400',
    bgColor: 'from-red-500/20 to-rose-500/20',
    description: [
      'Built autonomous line-tracking robot using AT89S52 microcontroller, IR sensors, and L293D motor driver.',
      'Programmed low-level control logic using timers, interrupt-driven condition checks, and real-time sensor feedback.',
      'Tuned motor PWM control for accurate path following on curved and straight tracks.',
      'Showcased strong fundamentals in bare-metal microcontroller programming without Arduino abstraction.',
    ],
    skills: ['8051 Assembly/C', 'Timer Interrupts', 'PWM', 'IR Sensors', 'Motor Control', 'Bare-Metal Programming'],
    videoUrl: DEMO_VIDEOS_DRIVE_URL,
    videoLabel: 'Watch Line Follower Robot Demo in Drive',
  },
  {
    title: 'Touch Sensor Circuit Using Transistor',
    subtitle: 'BJT Transistor Switching + Touch Detection Demo',
    icon: Zap,
    color: 'text-amber-400',
    bgColor: 'from-amber-500/20 to-yellow-500/20',
    description: [
      'Designed and assembled a solid-state touch-sensitive switch circuit utilizing transistor amplification and base-emitter threshold switching characteristics.',
      'Demonstrated high-sensitivity skin-resistance conductivity detection to trigger load actuation without mechanical moving parts.',
      'Recorded and shared hardware test demonstration video showcasing responsive touch triggering and load operation.',
    ],
    skills: ['Transistor Switching', 'Analog Circuit Design', 'BJT Biasing', 'Sensor Prototyping', 'Hardware Testing'],
    videoUrl: DEMO_VIDEOS_DRIVE_URL,
    videoLabel: 'Watch Demo in Project Videos Drive',
  },
];

export default function Projects() {
  const [expandedProject, setExpandedProject] = useState<number | null>(0);
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  const getDriveEmbedUrl = (url: string) => {
    // If it's a folder, embed folder list view; if it's a file, use preview mode
    if (url.includes('/drive/folders/')) {
      const match = url.match(/\/folders\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/embeddedfolderview?id=${match[1]}#grid`;
      }
      return url;
    }
    // Converts /view or /view?usp=... to /preview for embedded iframe viewing
    return url.replace(/\/view(\?.*)?$/, '/preview');
  };

  return (
    <section id="projects" className="py-24 relative">
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
            {'// WHAT I BUILT'}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            <span className="text-white">Embedded </span>
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            10+ hands-on projects demonstrating real-world embedded systems, IoT solutions, AI edge computing, and agentic AI-assisted development
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={DEMO_VIDEOS_DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500/20 to-amber-500/20 border border-red-500/30 text-white font-medium text-sm hover:border-red-400 hover:shadow-lg hover:shadow-red-500/10 transition-all"
            >
              <Video size={16} className="text-red-400" />
              <span>Browse All Project Demo Videos</span>
              <ExternalLink size={14} className="text-gray-400" />
            </a>
            <button
              type="button"
              onClick={() => setActiveVideoModal(DEMO_VIDEOS_DRIVE_URL)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card border border-edge text-gray-300 font-medium text-sm hover:text-white hover:border-accent transition-all"
            >
              <Play size={14} className="text-accent" fill="currentColor" />
              <span>Preview Video Drive In-Page</span>
            </button>
          </div>

          <div className="section-divider w-24 mx-auto mt-6" />
        </motion.div>

        {/* Project Cards */}
        <div className="space-y-6">
          {projects.map((project, i) => {
            const Icon = project.icon;
            const isExpanded = expandedProject === i;
            const projectNumber = String(i + 1).padStart(2, '0');

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="card-hover"
              >
                <div
                  className={`glass-effect rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    isExpanded ? 'ring-1 ring-accent/50' : ''
                  }`}
                  onClick={() => setExpandedProject(isExpanded ? null : i)}
                >
                  {/* Header */}
                  <div className={`p-6 md:p-8 bg-gradient-to-r ${project.bgColor}`}>
                    <div className="flex items-start gap-4">
                      {/* Numbering + Icon */}
                      <div className="flex flex-col items-center gap-1.5 shrink-0">
                        <span className="text-[11px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-md bg-deeper/90 text-accent border border-accent/20">
                          #{projectNumber}
                        </span>
                        <div className={`w-11 h-11 rounded-xl bg-deeper/80 flex items-center justify-center ${project.color}`}>
                          <Icon size={22} />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-mono text-gray-400 font-semibold md:hidden">
                                Project {projectNumber} —
                              </span>
                              <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                                {project.title}
                              </h3>
                              {project.ongoing && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-accent/20 text-accent border border-accent/30 uppercase tracking-wide shrink-0">
                                  Ongoing
                                </span>
                              )}
                              {project.videoUrl && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/20 text-red-400 border border-red-500/30 uppercase tracking-wide shrink-0">
                                  <Video size={11} /> Video Demo
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-400 mt-1 font-mono">{project.subtitle}</p>
                          </div>
                          <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            className="shrink-0"
                          >
                            <ChevronRight size={20} className="text-accent" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: isExpanded ? 'auto' : 0,
                      opacity: isExpanded ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 md:p-8 border-t border-edge/30">
                      {project.videoUrl && (
                        <div className="mb-6 p-4 rounded-xl bg-deeper/60 border border-accent/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0">
                              <Video size={20} />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">Project Demo Video</p>
                              <p className="text-xs text-gray-400">Watch the live hardware demonstration on Google Drive</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveVideoModal(project.videoUrl!);
                              }}
                              className="px-3.5 py-1.5 rounded-lg bg-accent text-deeper font-semibold text-xs flex items-center gap-1.5 hover:bg-accent/90 transition-all shadow-sm"
                            >
                              <Play size={13} fill="currentColor" /> Watch In-Page
                            </button>
                            <a
                              href={project.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="px-3.5 py-1.5 rounded-lg bg-card border border-edge text-gray-300 hover:text-white hover:border-accent font-medium text-xs flex items-center gap-1.5 transition-all"
                            >
                              <ExternalLink size={13} /> Open Drive
                            </a>
                          </div>
                        </div>
                      )}

                      <ul className="space-y-3 mb-6">
                        {project.description.map((desc, j) => (
                          <motion.li
                            key={j}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: isExpanded ? 1 : 0, x: isExpanded ? 0 : -10 }}
                            transition={{ delay: j * 0.1 }}
                            className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                            {desc}
                          </motion.li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2">
                        {project.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent text-xs font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Video Modal Player */}
      {activeVideoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setActiveVideoModal(null)}
        >
          <div
            className="glass-effect relative w-full max-w-3xl rounded-2xl overflow-hidden border border-edge shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-edge bg-deeper/80">
              <div className="flex items-center gap-2">
                <Video size={18} className="text-accent" />
                <span className="text-sm font-semibold text-white">Project Demonstration Video</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={activeVideoModal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-accent hover:underline flex items-center gap-1"
                >
                  Drive Link <ExternalLink size={12} />
                </a>
                <button
                  type="button"
                  onClick={() => setActiveVideoModal(null)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-card/60 border border-edge text-gray-300 hover:text-white hover:bg-card"
                >
                  Close ✕
                </button>
              </div>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={getDriveEmbedUrl(activeVideoModal)}
                title="Project Video Demonstration"
                className="w-full h-full border-0"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
