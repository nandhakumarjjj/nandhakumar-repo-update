import { Cpu, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-10 border-t border-edge/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-violet rounded-lg flex items-center justify-center">
              <Cpu size={16} className="text-white" />
            </div>
            <span className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Nandhakumar J. All rights reserved.
            </span>
          </div>

          {/* Center */}
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <span>Built with</span>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>and</span>
            <span className="text-accent font-semibold">Embedded Passion</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <a
              href="https://www.linkedin.com/in/nandhakumar-j-8398b1364/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-accent transition-colors text-sm"
            >
              LinkedIn
            </a>
            <span className="text-gray-700">|</span>
            <a
              href="https://github.com/22e624-nandha"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-accent transition-colors text-sm"
            >
              GitHub (College)
            </a>
            <span className="text-gray-700">|</span>
            <a
              href="https://github.com/Nandhakumar-code"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-mint transition-colors text-sm"
            >
              GitHub (Personal)
            </a>
            <span className="text-gray-700">|</span>
            <a
              href="mailto:22e624@psgtech.ac.in"
              className="text-gray-500 hover:text-accent transition-colors text-sm"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
