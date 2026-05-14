import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ImageFrame from "../components/ImageFrame.jsx";

const copy = {
  designer: "Liu Dingyu / \u5218\u4e01\u745c",
  heroChinese:
    "\u5173\u6ce8\u5546\u4e1a\u7a7a\u95f4\u3001\u5c45\u4f4f\u7a7a\u95f4\u4e0e\u57ce\u5e02\u516c\u5171\u73af\u5883\u8bbe\u8ba1\uff0c\u5c1d\u8bd5\u901a\u8fc7\u7a7a\u95f4\u7ec4\u7ec7\u3001\u573a\u666f\u8425\u9020\u4e0e\u89c6\u89c9\u8868\u8fbe\u56de\u5e94\u4e0d\u540c\u5c3a\u5ea6\u4e0b\u7684\u4f7f\u7528\u9700\u6c42\u3002",
};

const collageItems = [
  {
    id: "k11",
    src: "/images/k11/cover.jpg",
    label: "K11 FLORAL SHOP",
    to: "/projects/k11-flower-shop",
  },
  {
    id: "retail",
    src: "/images/retail/cover.jpg",
    label: "RETAIL STORE",
    to: "/projects/small-retail-store",
  },
  {
    id: "senjiangyuan",
    src: "/images/senjiangyuan/cover.jpg",
    label: "OLD SHIPYARD",
    to: "/projects/senjiangyuan-shipyard",
  },
  {
    id: "pocket",
    src: "/images/pocket-park/cover.jpg",
    label: "POCKET PARK",
    to: "/projects/jiangdong-pocket-park",
  },
  {
    id: "residence",
    src: "/images/residence/cover.jpg",
    label: "RESIDENCE",
    to: "/projects/xunyang-residence",
  },
  {
    id: "historical",
    src: "/images/historical-street/cover.jpg",
    label: "HISTORICAL STREET",
    to: "/projects/nanping-historical-street",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const buttonGroup = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.35, staggerChildren: 0.1 },
  },
};

function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const targetVelocityRef = useRef(0);
  const currentVelocityRef = useRef(0);

  useEffect(() => {
    let frameId;
    let previousTime;

    const tick = (time) => {
      if (previousTime === undefined) previousTime = time;
      const delta = time - previousTime;
      previousTime = time;

      const currentVelocity = currentVelocityRef.current;
      const targetVelocity = targetVelocityRef.current;
      const easedVelocity =
        currentVelocity + (targetVelocity - currentVelocity) * 0.085;
      currentVelocityRef.current =
        Math.abs(easedVelocity) < 0.0004 ? 0 : easedVelocity;

      if (Math.abs(currentVelocityRef.current) > 0) {
        setOrbitAngle(
          (angle) => (angle + delta * currentVelocityRef.current) % 360,
        );
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  const handleOrbitMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const yRatio = (event.clientY - bounds.top) / bounds.height - 0.5;
    const distanceFromCenter = Math.abs(yRatio);

    if (distanceFromCenter < 0.035) {
      targetVelocityRef.current = 0;
      return;
    }

    const direction = yRatio < 0 ? -1 : 1;
    const speed = Math.min(0.078, distanceFromCenter * 0.14);
    targetVelocityRef.current = direction * speed;
  };

  return (
    <div className="page-fade min-h-screen pt-24">
      <section className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-12 px-5 pb-16 pt-8 md:grid-cols-[0.95fr_1.05fr] md:px-8">
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <p className="mb-5 text-xs uppercase tracking-[0.28em] text-primary">
            {copy.designer}
          </p>
          <h1 className="font-display uppercase leading-[0.93]">
            <span className="block text-[2.85rem] text-primary/86 md:text-[4.65rem] xl:text-[4.95rem]">
              LIU DINGYU
            </span>
            <span className="mt-2 block text-[3.35rem] text-ink md:text-[5.55rem] xl:text-[5.85rem]">
              PORTFOLIO
            </span>
          </h1>
          <p className="mt-6 text-xl text-clay">Interior & Landscape Design</p>
          <div className="mt-7 max-w-2xl space-y-4 leading-8 text-ink/70">
            <p>{copy.heroChinese}</p>
            <p>
              Focused on commercial space, residential interiors, and urban public
              environments, exploring spatial organization, scene-making, and visual
              expression across different design scales.
            </p>
          </div>
          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            variants={buttonGroup}
            initial="hidden"
            animate="visible"
          >
            <HeroButton to="/interior">Interior Works</HeroButton>
            <HeroButton to="/landscape">Landscape Works</HeroButton>
          </motion.div>
        </motion.div>

        <div
          className="relative min-h-[540px] overflow-visible pb-0 md:h-[620px]"
          onMouseMove={handleOrbitMove}
          onMouseLeave={() => {
            targetVelocityRef.current = 0;
            setHoveredCard(null);
          }}
        >
          <div className="absolute inset-x-0 top-0 hidden h-[690px] overflow-hidden md:block">
            <OrbitGuide />
            <div className="absolute inset-0">
              {orbitCards.map((card, index) => (
                <OrbitCard
                  key={card.item.id}
                  {...card}
                  delay={0.14 + index * 0.08}
                  orbitAngle={orbitAngle}
                  isHovered={hoveredCard === card.item.id}
                  onHoverStart={() => setHoveredCard(card.item.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 pt-8 md:hidden">
            {collageItems.map((item, index) => (
              <OrbitCard
                key={item.id}
                item={item}
                className="relative min-w-[72%]"
                rotation={index % 2 === 0 ? 2 : -2}
                ratio="aspect-video"
                delay={0.12 + index * 0.08}
                shift={{ x: 0, y: 0 }}
                drift={0}
              />
            ))}
          </div>
        </div>

        <div className="absolute bottom-5 left-5 z-40 rounded-tr-lg border-t border-line/60 bg-paper/68 px-3 pb-1 pt-3 text-[10px] uppercase tracking-[0.22em] text-ink/45 backdrop-blur-[4px] md:left-8">
          Portfolio / 2026 / Interior / Landscape / Drawing Notes
        </div>
      </section>
    </div>
  );
}

function HeroButton({ to, children }) {
  return (
    <motion.div variants={fadeUp}>
      <Link
        to={to}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm text-white transition duration-300 hover:bg-clay"
      >
        {children} <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
}

function OrbitGuide() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 hidden h-full w-full text-primary/[0.13] md:block"
      viewBox="0 0 620 540"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M536 -116C278 -58 116 112 106 270C96 428 232 596 500 664"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 12"
      />
      <path
        d="M604 -16C410 26 288 136 278 270C268 404 372 520 574 574"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="2 10"
      />
      <circle cx="760" cy="270" r="3" fill="currentColor" />
    </svg>
  );
}

const orbitCards = [
  {
    item: collageItems[5],
    angle: 0,
    zIndex: 24,
  },
  {
    item: collageItems[2],
    angle: 1,
    zIndex: 30,
  },
  {
    item: collageItems[0],
    angle: 2,
    zIndex: 28,
  },
  {
    item: collageItems[4],
    angle: 3,
    zIndex: 26,
  },
  {
    item: collageItems[1],
    angle: 4,
    zIndex: 24,
  },
  {
    item: collageItems[3],
    angle: 5,
    zIndex: 22,
  },
];

function OrbitCard({
  item,
  className = "",
  angle,
  orbitAngle = 0,
  isHovered = false,
  onHoverStart,
  onHoverEnd,
  zIndex = 20,
  ratio = "aspect-video",
  fit = "cover",
  delay = 0,
}) {
  const isRingCard = angle !== undefined;
  const position = isRingCard ? getRingPosition(angle, orbitAngle) : null;

  return (
    <motion.div
      className={`${className} ${isRingCard ? "absolute w-[320px] lg:w-[365px]" : "hover:z-50"}`}
      style={
        isRingCard
          ? {
              left: position.x,
              top: position.y,
              zIndex: isHovered ? 60 : position.zIndex,
              transform: "translate(-50%, -50%)",
            }
          : undefined
      }
      initial={isRingCard ? { opacity: 0 } : { opacity: 0, y: 22 }}
      animate={
        isRingCard
          ? { opacity: position.opacity, scale: position.scale }
          : { opacity: 1, y: 0 }
      }
      whileHover={{ zIndex: 60 }}
      transition={{
        opacity: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        x: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <motion.div
        className="relative group"
        initial={{ scale: 0.96 }}
        animate={{ scale: 1 }}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        whileHover={{
          scale: 1.04,
          opacity: 1,
          zIndex: 60,
          boxShadow: "0 20px 42px rgba(94, 131, 160, 0.16)",
        }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link to={item.to} className="block">
            <ImageFrame
              src={item.src}
              alt={`${item.label} portfolio fragment`}
              label={item.label}
              className="rounded-lg border border-line bg-white p-2 shadow-soft transition duration-300 group-hover:border-primary/35"
              imageClassName="transition duration-500"
              ratio={ratio}
              fit={fit}
            />
            <span className="absolute bottom-4 left-4 max-w-[78%] rounded-full border border-line/70 bg-paper/85 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-primary/85 shadow-[0_6px_18px_rgba(47,52,55,0.08)]">
              {item.label}
            </span>
          </Link>
      </motion.div>
    </motion.div>
  );
}

const orbitSlots = [
  { x: 590, y: 256, scale: 0.66, zIndex: 10 },
  { x: 392, y: 54, scale: 0.8, zIndex: 22 },
  { x: 96, y: 256, scale: 0.96, zIndex: 45 },
  { x: 392, y: 462, scale: 0.8, zIndex: 26 },
  { x: 560, y: 462, scale: 0.68, zIndex: 14 },
  { x: 620, y: 74, scale: 0.66, zIndex: 10 },
];

function getRingPosition(slotIndex, orbitAngle) {
  const slotProgress = orbitAngle / 60;
  const normalizedSlot =
    ((slotIndex + slotProgress) % orbitSlots.length + orbitSlots.length) %
    orbitSlots.length;
  const currentIndex = Math.floor(normalizedSlot);
  const nextIndex = (currentIndex + 1) % orbitSlots.length;
  const mix = normalizedSlot - currentIndex;
  const current = orbitSlots[currentIndex];
  const next = orbitSlots[nextIndex];
  const smoothMix = mix * mix * (3 - 2 * mix);
  const interpolate = (from, to) => from + (to - from) * smoothMix;

  return {
    x: interpolate(current.x, next.x),
    y: interpolate(current.y, next.y),
    opacity: 1,
    scale: interpolate(current.scale, next.scale),
    zIndex: Math.round(interpolate(current.zIndex, next.zIndex)),
  };
}

export default Home;
