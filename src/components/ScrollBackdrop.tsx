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
 * Full-page, fixed 3D background for the whole portfolio.
 *
 *  - Top of the page (your name)  -> the IoT controller is fully ASSEMBLED
 *  - Scroll DOWN to the footer     -> it EXPLODES layer by layer into its components
 *  - Scroll back UP                -> it RE-ASSEMBLES
 *
 * The animation is driven by the progress of the entire page scroll (not one section),
 * using transform / opacity only so it stays GPU-composited. The raw scroll value is
 * smoothed with a spring so wheel and trackpad jumps still look fluid.
 *
 * Artwork: transparent layer slices in /public/exploded/*.webp
 * Flip behaviour (assemble on scroll down) by setting EXPLODE_ON_SCROLL_DOWN = false.
 */
const EXPLODE_ON_SCROLL_DOWN = true;

const STAGE_W = 1536;
const STAGE_H = 1024;
const BASE_URL = '/exploded/';

const ease = cubicBezier(0.65, 0, 0.35, 1);

type Item = {
  key: string;
  x: number; y: number; w: number; h: number;
  label: { x: number; y: number; w: number; h: number };
  dy: number;     // assembled-pose vertical travel (stage px)
  scale: number;  // inner boards shrink to fit inside the enclosure
  hide: boolean;  // inner layers fade out once inside the enclosure
};

// ordered bottom -> top
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

const HOLD_START = 0.05; // hold before the first layer moves
const STEP = 0.08;       // stagger between layers
const DURATION = 0.3;    // travel length of each layer

const pctX = (v: number) => `${(v / STAGE_W) * 100}%`;
const pctY = (v: number) => `${(v / STAGE_H) * 100}%`;

/**
 * `progress` here is the ASSEMBLY progress: 0 = fully exploded, 1 = fully assembled.
 */
function Part({ item, index, progress }: { item: Item; index: number; progress: MotionValue<number> }) {
  const start = HOLD_START + index * STEP;
  const t = useTransform(progress, [start, start + DURATION], [0, 1], { ease });

  const y = useTransform(t, [0, 1], ['0%', `${(item.dy / item.h) * 100}%`]);
  const scale = useTransform(t, [0, 1], [1, item.scale]);
  // slight depth separation when exploded so the rotating camera shows real parallax
  const z = useTransform(t, [0, 1], [(index - 3.5) * 22, 0]);
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

export default function ScrollBackdrop() {
  const reduceMotion = useReducedMotion();

  // progress of the WHOLE page: 0 at the top, 1 at the very bottom
  const { scrollYProgress } = useScroll();

  const assembly = useTransform(scrollYProgress, (v) => (EXPLODE_ON_SCROLL_DOWN ? 1 - v : v));
  const spring = useSpring(assembly, { stiffness: 140, damping: 28, mass: 0.35, restDelta: 0.0001 });
  const still = useMotionValue(1);
  const progress = reduceMotion ? still : spring;

  // gentle camera sweep across the whole scroll
  const rotateY = useTransform(progress, [0, 1], [8, -8]);
  const rotateX = useTransform(progress, [0, 1], [4, 0]);

  const panelOpacity = useTransform(progress, [0.04, 0.28], [1, 0]);
  const panelX = useTransform(progress, [0.04, 0.28], [0, 40]);
  const glow = useTransform(progress, [0.55, 0.95], [0.1, 0.8]);

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* glow behind the assembled unit */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: glow,
          background:
            'radial-gradient(ellipse 40% 30% at 50% 52%, rgba(0,180,216,0.22), rgba(0,180,216,0) 70%)',
        }}
      />

      {/* stage: phones show only the artwork column (labels / panels hidden) */}
      <div className="relative aspect-[830/1024] w-[120vw] md:aspect-[3/2] md:w-[min(104vw,calc(100vh_*_1.55))] opacity-[0.88]">
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
      </div>

      {/* legibility scrim so page text stays readable over the artwork */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(15,15,26,0.45) 0%, rgba(15,15,26,0.40) 50%, rgba(15,15,26,0.50) 100%)',
        }}
      />
    </div>
  );
}
