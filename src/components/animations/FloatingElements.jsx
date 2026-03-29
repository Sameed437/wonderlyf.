import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

function rand(min, max) {
  return Math.random() * (max - min) + min;
}
function randInt(min, max) {
  return Math.floor(rand(min, max));
}

// ── SVG Shapes ──────────────────────────────────────────────

function HoneycombHex({ size, fill }) {
  const r = size / 2;
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    return `${r + r * 0.9 * Math.cos(a)},${r + r * 0.9 * Math.sin(a)}`;
  }).join(" ");
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon points={pts} fill={fill} stroke="rgba(184,134,11,0.3)" strokeWidth="1.5" />
      {/* Inner hex */}
      <polygon
        points={Array.from({ length: 6 }, (_, i) => {
          const a = (Math.PI / 3) * i - Math.PI / 6;
          return `${r + r * 0.5 * Math.cos(a)},${r + r * 0.5 * Math.sin(a)}`;
        }).join(" ")}
        fill="none"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.8"
      />
    </svg>
  );
}

function HoneyDrop({ size, fill }) {
  const h = size * 1.5;
  return (
    <svg width={size} height={h} viewBox="0 0 30 45">
      <defs>
        <radialGradient id={`drop-${fill.replace(/[^a-z0-9]/gi, "")}`} cx="40%" cy="35%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor={fill} />
        </radialGradient>
      </defs>
      <path
        d="M15 0 C15 0 0 20 0 28 C0 37 6.7 45 15 45 C23.3 45 30 37 30 28 C30 20 15 0 15 0Z"
        fill={`url(#drop-${fill.replace(/[^a-z0-9]/gi, "")})`}
      />
      {/* Shine */}
      <ellipse cx="11" cy="22" rx="4" ry="6" fill="rgba(255,255,255,0.25)" />
    </svg>
  );
}

function GoldenLeaf({ size, fill }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <path
        d="M20 2 C30 8 38 18 36 30 C34 36 28 38 20 38 C12 38 6 36 4 30 C2 18 10 8 20 2Z"
        fill={fill}
      />
      <path d="M20 6 L20 34" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" fill="none" />
      <path d="M20 14 L12 22" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" fill="none" />
      <path d="M20 18 L28 24" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" fill="none" />
    </svg>
  );
}

function FlowerPetal({ size, fill }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30">
      <ellipse cx="15" cy="15" rx="6" ry="13" fill={fill} />
      <ellipse cx="15" cy="15" rx="13" ry="6" fill={fill} opacity="0.7" />
      <circle cx="15" cy="15" r="4" fill="rgba(212,148,10,0.9)" />
    </svg>
  );
}

function BeeSilhouette({ size, fill }) {
  return (
    <svg width={size} height={size * 0.65} viewBox="0 0 50 32" fill={fill}>
      <ellipse cx="17" cy="18" rx="11" ry="9" />
      <ellipse cx="35" cy="18" rx="9" ry="7" />
      {/* Stripes */}
      <rect x="13" y="14" width="8" height="2" rx="1" fill="rgba(44,24,16,0.3)" />
      <rect x="13" y="19" width="8" height="2" rx="1" fill="rgba(44,24,16,0.3)" />
      {/* Wings */}
      <ellipse cx="12" cy="8" rx="8" ry="5" fill="rgba(255,255,255,0.5)" stroke={fill} strokeWidth="0.5" />
      <ellipse cx="22" cy="7" rx="7" ry="4" fill="rgba(255,255,255,0.4)" stroke={fill} strokeWidth="0.5" />
    </svg>
  );
}

// ── Paths (diagonal traversals like golipopsoda) ──────────

const trajectories = [
  // top-left to bottom-right
  { fromX: -10, fromY: -10, toX: 110, toY: 110 },
  // top-right to bottom-left
  { fromX: 110, fromY: -10, toX: -10, toY: 110 },
  // bottom-left to top-right
  { fromX: -10, fromY: 110, toX: 110, toY: -10 },
  // bottom-right to top-left
  { fromX: 110, fromY: 110, toX: -10, toY: -10 },
  // left to right
  { fromX: -10, fromY: 40, toX: 110, toY: 60 },
  // right to left
  { fromX: 110, fromY: 30, toX: -10, toY: 70 },
  // top to bottom
  { fromX: 40, fromY: -10, toX: 60, toY: 110 },
  // bottom to top
  { fromX: 60, fromY: 110, toX: 40, toY: -10 },
];

const COLORS = [
  "#F0C14B",  // bright honey gold
  "#D4940A",  // rich honey
  "#E8A317",  // amber
  "#C68E17",  // dark gold
  "#7BA05B",  // herb green
  "#F5D68A",  // light honey
];

const SHAPES = ["hex", "drop", "leaf", "petal", "bee"];

const shapeComponents = {
  hex: HoneycombHex,
  drop: HoneyDrop,
  leaf: GoldenLeaf,
  petal: FlowerPetal,
  bee: BeeSilhouette,
};

export default function FloatingElements({ count = 12 }) {
  const prefersReduced = useReducedMotion();

  const elements = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const traj = trajectories[i % trajectories.length];
      const shape = SHAPES[i % SHAPES.length];
      const color = COLORS[randInt(0, COLORS.length)];
      const size = rand(30, 65);
      const duration = rand(12, 22);
      const delay = i * 0.8;

      // Add some randomness to the path
      const midX = (traj.fromX + traj.toX) / 2 + rand(-20, 20);
      const midY = (traj.fromY + traj.toY) / 2 + rand(-15, 15);

      return {
        id: i,
        shape,
        color,
        size,
        duration,
        delay,
        fromX: traj.fromX + rand(-5, 5),
        fromY: traj.fromY + rand(-5, 5),
        midX,
        midY,
        toX: traj.toX + rand(-5, 5),
        toY: traj.toY + rand(-5, 5),
        rotateEnd: rand(90, 360) * (Math.random() > 0.5 ? 1 : -1),
        scaleRange: [rand(0.7, 0.9), rand(1, 1.3), rand(0.8, 1)],
        opacityRange: [0, rand(0.5, 0.85), rand(0.5, 0.85), 0],
      };
    });
  }, [count]);

  if (prefersReduced) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 5 }}
    >
      {elements.map((el) => {
        const Shape = shapeComponents[el.shape];
        return (
          <motion.div
            key={el.id}
            className="absolute"
            style={{ willChange: "transform, opacity" }}
            animate={{
              left: [`${el.fromX}%`, `${el.midX}%`, `${el.toX}%`],
              top: [`${el.fromY}%`, `${el.midY}%`, `${el.toY}%`],
              rotate: [0, el.rotateEnd * 0.5, el.rotateEnd],
              scale: el.scaleRange,
              opacity: el.opacityRange,
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              ease: "linear",
              delay: el.delay,
            }}
          >
            <Shape size={el.size} fill={el.color} />
          </motion.div>
        );
      })}
    </div>
  );
}
