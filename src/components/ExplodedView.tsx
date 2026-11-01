import { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useReducedMotion,
  cubicBezier,
  type MotionValue,
} from 'framer-motion';

/**
 * Scroll-driven exploded view of the Industrial Embedded IoT Controller.
 *
 * - Scroll DOWN  -> the controller re-assembles (layers slide in and the enclosure closes)
 * - Scroll UP    -> the controller explodes back into its layers
 *
 * The artwork is pre-sliced into transparent layers (public/exploded/*.webp).
 * Everything is driven by transforms/opacity only (GPU composited), with the raw scroll
 * progress smoothed by a spring so motion stays fluid even with wheel / trackpad jumps.
 *
 * To flip the direction (explode when scrolling DOWN) set REVERSE = true.
 */
const REVERSE = false;

const STAGE_W = 1536;
const STAGE_H = 1024;
const BASE_URL = '/exploded/';

const ease = cubicBezier(0.65, 0, 0.35, 1);

type Item = {
  key: string;
  // layer artwork (position inside the 1536x1024 stage)
  x: number; y: number; w: number; h: number;
  // label tag artwork
  label: { x: number; y: number; w: number; h: number };
  // assembled pose
  dy: number;     // vertical travel in stage px
  scale: number;  // inner boards shrink so they fit inside the enclosure
  hide: boolean;  // inner layers fade out once inside the enclosure
};

// ordered bottom -> top (also the assembly order)
const ITEMS: Item[] = [
  { key: 'base',    x: 308, y: 796, w: 822, h: 225, label: { x: 33, y: 916, w: 345, h: 69 },   dy: -330, scale: 1,    hide: false },
  { key: 'parts',   x: 380, y: 796, w: 665, h: 106, label: { x: 43, y: 793, w: 351, h: 98 },   dy: -272, scale: 0.85, hide: true },
  { key: 'core',    x: 300, y: 690, w: 789, h: 106, label: { x: 43, y: 690, w: 351, h: 100 },  dy: -168, scale: 0.82, hide: true },
  { key: 'modules', x: 300, y: 568, w: 822, h: 122, label: { x: 43, y: 566, w: 323, h: 101 },  dy: -57,  scale: 0.8,  hide: true },
  { key: 'pcb',     x: 300, y: 336, w: 799, h: 232, label: { x: 42, y: 383, w: 352, h: 66 },   dy: 116,  scale: 0.84, hide: true },
  { key: 'display', x: 300, y: 205, w: 748, h: 131, label: { x: 43, y: 283, w: 351, h: 62 },   dy: 290,  scale: 0.88, hide: true },
  { key: 'gasket',  x: 356, y: 166, w: 705, h: 87,  label: { x: 42, y: 203, w: 323, h: 60 },   dy: 357,  scale: 1,    hide: false },
  { key: 'cover',   x: 300, y: 32,  w: 783, h: 173, label: { x: 42, y: 126, w: 327, h: 57 },   dy: 424,  scale: 1,    hide: false },
];

const PANELS = [
  { key: 'panel-hierarchy', x: 1155, y: 30,  w: 374, h: 547 },
  { key: 'panel-tech',      x: 1156, y: 598, w: 373, h: 354 },
];

const HOLD_START = 0.05; // exploded hold before anything moves
const STEP = 0.08;       // stagger between layers
const DURATION = 0.3;    // travel length of each layer (in scroll progress)

const pctX = (v: number) => `${(v / STAGE_W) * 100}%`;
const pctY = (v: number) => `${(v / STAGE_H) * 100}%`;

function Part({ item, index, progress }: { item: Item; index: number; progress: MotionValue<number> }) {
  const start = HOLD_START + index * STEP;
  const t = useTransform(progress, [start, start + DURATION], [0, 1], { ease });

  const y = useTransform(t, [0, 1], ['0%', `${(item.dy / item.h) * 100}%`]);
  const scale = useTransform(t, [0, 1], [1, item.scale]);
  const z = useTransform(t, [0, 0.5, 1], [0, (index - 3.5) * 30, 0]);
  const opacity = useTransform(t, item.hide ? [0, 0.7, 1] : [0, 1], item.hide ? [1, 1, 0] : [1, 1]);

  const ly = useTransform(t, [0, 1], ['0%', `${(item.dy / item.label.h) * 100}%`]);
  const lOpacity = useTransform(t, [0, 0.28], [1, 0]);

  return (
    <>
      <motion.img
        src={`${BASE_URL}layer-${item.key}.webp`}
        alt=""
        draggable={false}
        decoding="async"
        className="absolute select-none pointer-events-none"
        style={{
          left: pctX(item.x),
          top: pctY(item.y),
          width: pctX(item.w),
          height: pctY(item.h),
          y,
          scale,
          z,
          opacity,
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
        }}
      />
      <motion.img
        src={`${BASE_URL}label-${item.key}.webp`}
        alt=""
        draggable={false}
        decoding="async"
        className="absolute select-none pointer-events-none"
        style={{
          left: pctX(item.label.x),
          top: pctY(item.label.y),
          width: pctX(item.label.w),
          height: pctY(item.label.h),
          y: ly,
          opacity: lOpacity,
          willChange: 'transform, opacity',
        }}
      />
    </>
  );
}

export default function ExplodedView() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // direction + smoothing
  const directed = useTransform(scrollYProgress, (v) => (REVERSE ? 1 - v : v));
  const spring = useSpring(directed, { stiffness: 140, damping: 28, mass: 0.35, restDelta: 0.0001 });
  const still = useMotionValue(0);
  const progress = reduceMotion ? still : spring;

  // subtle camera motion that settles flat at both ends so the poses match the artwork
  const rotateY = useTransform(progress, [0, 0.1, 0.5, 0.9, 1], [0, -2, -8, -2, 0]);
  const rotateX = useTransform(progress, [0, 0.5, 1], [0, 5, 0]);

  const panelOpacity = useTransform(progress, [0.04, 0.28], [1, 0]);
  const panelX = useTransform(progress, [0.04, 0.28], [0, 40]);
  const glow = useTransform(progress, [0.55, 0.95], [0.15, 0.9]);
  const hintDown = useTransform(progress, [0, 0.06], [1, 0]);
  const hintUp = useTransform(progress, [0.92, 0.99], [0, 1]);
  const bar = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="anatomy"
      className="relative"
      style={{ height: reduceMotion ? 'auto' : '460vh' }}
    >
      <div
        className={`${reduceMotion ? '' : 'sticky top-0 h-screen'} flex flex-col items-center justify-start pt-20 md:pt-20 overflow-hidden`}
      >
        {/* Header */}
        <div className="text-center px-4 mb-2 md:mb-3 shrink-0">
          <span className="text-accent font-mono text-xs md:text-sm tracking-widest uppercase">
            {'// SYSTEM → MODULE → PCB → CHIP → COMPONENT'}
          </span>
          <h2 className="text-2xl md:text-4xl font-bold mt-1.5">
            <span className="text-white">Industrial Embedded </span>
            <span className="gradient-text">IoT Controller</span>
          </h2>
          <p className="text-gray-400 text-xs md:text-sm mt-1 max-w-2xl mx-auto">
            Complete component breakdown — scroll to assemble it, scroll back to explode it
          </p>
          <div className="mt-3 mx-auto h-[2px] w-40 bg-edge/50 rounded-full overflow-hidden">
            <motion.div
              className="h-full w-full bg-accent origin-left"
              style={{ scaleX: bar }}
            />
          </div>
        </div>

        {/* Stage */}
        <div
          className="relative w-[min(94vw,calc((100vh_-_14rem)*0.81))] md:w-[min(94vw,calc((100vh_-_14rem)*1.5),1360px)] aspect-[830/1024] md:aspect-[3/2] overflow-hidden md:overflow-visible"
          role="img"
          aria-label="Exploded view of an industrial embedded IoT controller: top cover, sealing gasket, HMI display, main PCB, functional modules, core IC board, discrete components and bottom cover"
        >
          {/* glow behind the assembled unit */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: glow,
              background:
                'radial-gradient(ellipse 38% 26% at 50% 54%, rgba(0,180,216,0.28), rgba(0,180,216,0) 70%)',
            }}
          />

          {/* inner stage: on phones only the artwork column is shown (labels/panels hidden) */}
          <div className="absolute top-0 h-full w-[185%] -left-[36.14%] md:w-full md:left-0">
            <div style={{ perspective: '1800px' }} className="absolute inset-0">
              <motion.div
                className="absolute inset-0"
                style={{ transformStyle: 'preserve-3d', rotateX, rotateY }}
              >
                {ITEMS.map((item, i) => (
                  <Part key={item.key} item={item} index={i} progress={progress} />
                ))}
              </motion.div>
            </div>

            {/* component hierarchy + key technologies panels */}
            {PANELS.map((p) => (
              <motion.img
                key={p.key}
                src={`${BASE_URL}${p.key}.webp`}
                alt=""
                draggable={false}
                decoding="async"
                className="absolute select-none pointer-events-none hidden md:block"
                style={{
                  left: pctX(p.x),
                  top: pctY(p.y),
                  width: pctX(p.w),
                  height: pctY(p.h),
                  opacity: panelOpacity,
                  x: panelX,
                  willChange: 'transform, opacity',
                }}
              />
            ))}
          </div>

          {/* scroll hints */}
          <motion.div
            aria-hidden
            className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[11px] md:text-xs font-mono tracking-widest uppercase text-accent/90 whitespace-nowrap"
            style={{ opacity: hintDown }}
          >
            Scroll down to assemble ↓
          </motion.div>
          <motion.div
            aria-hidden
            className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[11px] md:text-xs font-mono tracking-widest uppercase text-accent/90 whitespace-nowrap"
            style={{ opacity: hintUp }}
          >
            Assembled · scroll up to explode ↑
          </motion.div>
        </div>
      </div>
    </section>
  );
}
