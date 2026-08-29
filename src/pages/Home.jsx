import { ArrowRight } from "lucide-react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import ImageFrame from "../components/ImageFrame.jsx";

const copy = {
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
  const shouldReduceMotion = useReducedMotion();
  const orbitAngle = useMotionValue(0);
  const targetVelocityRef = useRef(0);
  const currentVelocityRef = useRef(0);
  const touchXRef = useRef(null);
  const touchTimeRef = useRef(null);
  const touchVelocityRef = useRef(0);

  useAnimationFrame((_, delta) => {
    if (shouldReduceMotion) return;

    const currentVelocity = currentVelocityRef.current;
    const targetVelocity = targetVelocityRef.current;
    const easedVelocity =
      currentVelocity + (targetVelocity - currentVelocity) * 0.085;
    currentVelocityRef.current =
      Math.abs(easedVelocity) < 0.0004 ? 0 : easedVelocity;

    if (Math.abs(currentVelocityRef.current) > 0) {
      const frameDelta = Math.min(delta, 32);
      orbitAngle.set(
        (orbitAngle.get() + frameDelta * currentVelocityRef.current) % 360,
      );
    }
  });

  const handleOrbitMove = (event) => {
    if (shouldReduceMotion) return;

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

  const handleOrbitTouchStart = (event) => {
    if (shouldReduceMotion) return;

    touchXRef.current = event.touches[0]?.clientX ?? null;
    touchTimeRef.current = performance.now();
    touchVelocityRef.current = 0;
    targetVelocityRef.current = 0;
    currentVelocityRef.current = 0;
  };

  const handleOrbitTouchMove = (event) => {
    if (shouldReduceMotion) return;

    const nextX = event.touches[0]?.clientX;
    if (nextX == null || touchXRef.current == null) return;

    const now = performance.now();
    const deltaX = nextX - touchXRef.current;
    const deltaTime = Math.max(8, now - (touchTimeRef.current ?? now));
    if (Math.abs(deltaX) < 2) return;

    const fingerVelocity = deltaX / deltaTime;
    const speedBoost = 0.52 + Math.min(Math.abs(fingerVelocity) * 0.55, 0.72);

    orbitAngle.set((orbitAngle.get() + deltaX * speedBoost) % 360);
    touchVelocityRef.current = Math.max(
      -0.16,
      Math.min(0.16, fingerVelocity * 0.095),
    );
    touchXRef.current = nextX;
    touchTimeRef.current = now;
  };

  const handleOrbitTouchEnd = () => {
    if (shouldReduceMotion) return;

    touchXRef.current = null;
    touchTimeRef.current = null;
    currentVelocityRef.current = touchVelocityRef.current;
    targetVelocityRef.current = 0;
    touchVelocityRef.current = 0;
  };

  return (
    <div className="page-fade min-h-screen pt-24">
      <section className="relative mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-4 px-5 pb-8 pt-4 md:grid-cols-[0.95fr_1.05fr] md:gap-12 md:px-8 md:pb-16 md:pt-8">
        <div className="min-w-0 md:translate-x-[25px] 2xl:-translate-x-[87px]">
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate="visible"
            variants={fadeUp}
          >
          <h1 className="min-w-0">
            <span className="hero-name block pb-1 text-[2.1rem] font-normal normal-case leading-[1.05] tracking-[0.02em] text-primary/80 md:text-[2.2rem] lg:text-[3.35rem] xl:text-[3.8rem]">
              Liu Dingyu
            </span>
            <span className="hero-portfolio mt-1 block whitespace-nowrap pb-2 text-[2.85rem] font-normal uppercase leading-[1.08] tracking-[0.01em] text-ink md:text-[2.55rem] lg:text-[4.45rem] xl:text-[5.65rem]">
              PORTFOLIO
            </span>
          </h1>
          <p className="mt-5 font-display text-xl text-clay md:mt-6">
            Interior & Landscape Design
          </p>
          <div className="mt-5 max-w-2xl space-y-3 leading-7 text-ink/70 md:mt-7 md:space-y-4 md:leading-8">
            <p>{copy.heroChinese}</p>
            <p className="hidden sm:block">
              Focused on commercial space, residential interiors, and urban public
              environments, exploring spatial organization, scene-making, and visual
              expression across different design scales.
            </p>
            <p className="sm:hidden">
              Focused on commercial, residential, and public-space design across
              different scales.
            </p>
          </div>
            <motion.div
              className="mt-7 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3 md:mt-9"
              variants={buttonGroup}
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
            >
              <HeroButton to="/interior">Interior Works</HeroButton>
              <HeroButton to="/landscape">Landscape Works</HeroButton>
            </motion.div>
          </motion.div>
        </div>

        <div
          className="relative min-h-[405px] overflow-visible pb-0 md:h-[620px] md:min-h-[540px]"
          onMouseMove={handleOrbitMove}
          onMouseLeave={() => {
            targetVelocityRef.current = 0;
            setHoveredCard(null);
          }}
        >
          <div className="absolute -left-8 -right-28 top-0 hidden h-[650px] -translate-x-[10px] overflow-hidden md:block">
            <div className="absolute inset-0 origin-center scale-90">
              <OrbitGuide />
              <div className="absolute inset-0">
                {orbitCards.map((card, index) => (
                  <OrbitCard
                    key={card.item.id}
                    {...card}
                    delay={0.14 + index * 0.08}
                    orbitAngle={orbitAngle}
                    reducedMotion={shouldReduceMotion}
                    isHovered={hoveredCard === card.item.id}
                    onHoverStart={() => setHoveredCard(card.item.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="absolute inset-x-0 top-0 h-[430px] touch-pan-y overflow-hidden md:hidden"
            onTouchStart={handleOrbitTouchStart}
            onTouchMove={handleOrbitTouchMove}
            onTouchEnd={handleOrbitTouchEnd}
            onTouchCancel={handleOrbitTouchEnd}
          >
            <MobileOrbitGuide />
            {orbitCards.map((card, index) => (
              <OrbitCard
                key={card.item.id}
                {...card}
                mobile
                delay={0.12 + index * 0.06}
                orbitAngle={orbitAngle}
                reducedMotion={shouldReduceMotion}
                isHovered={false}
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
        className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-primary px-3 py-3 text-[13px] text-white transition duration-300 hover:bg-clay sm:w-auto sm:px-5 sm:text-sm"
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
      viewBox="0 0 700 650"
      fill="none"
      aria-hidden="true"
    >
      <ellipse
        cx="498"
        cy="300"
        rx="315"
        ry="250"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 12"
      />
      <ellipse
        cx="498"
        cy="300"
        rx="264"
        ry="210"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeDasharray="2 10"
      />
    </svg>
  );
}

function MobileOrbitGuide() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full text-primary/[0.12]"
      viewBox="0 0 360 430"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="260"
        cy="155"
        r="170"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 11"
      />
    </svg>
  );
}

const orbitCards = [
  {
    item: collageItems[5],
    angle: 300,
    zIndex: 24,
  },
  {
    item: collageItems[2],
    angle: 240,
    zIndex: 30,
  },
  {
    item: collageItems[0],
    angle: 180,
    zIndex: 28,
  },
  {
    item: collageItems[4],
    angle: 120,
    zIndex: 26,
  },
  {
    item: collageItems[1],
    angle: 60,
    zIndex: 24,
  },
  {
    item: collageItems[3],
    angle: 0,
    zIndex: 22,
  },
];

function OrbitCard({
  item,
  className = "",
  angle,
  orbitAngle = 0,
  mobile = false,
  isHovered = false,
  onHoverStart,
  onHoverEnd,
  zIndex = 20,
  ratio = "aspect-video",
  fit = "cover",
  delay = 0,
  reducedMotion = false,
}) {
  const isRingCard = angle !== undefined;
  const getPosition = (value) =>
    mobile
      ? getMobileRingPosition(angle + value)
      : getRingPosition(angle + value);
  const orbitX = useTransform(orbitAngle, (value) => getPosition(value).x);
  const orbitY = useTransform(orbitAngle, (value) => getPosition(value).y);
  const orbitScale = useTransform(
    orbitAngle,
    (value) => getPosition(value).scale,
  );
  const orbitZIndex = useTransform(
    orbitAngle,
    (value) => getPosition(value).zIndex,
  );

  return (
    <motion.div
      className={`${className} absolute left-0 top-0`}
      style={
        isRingCard
          ? {
              x: orbitX,
              y: orbitY,
              zIndex: isHovered ? 60 : orbitZIndex,
            }
          : undefined
      }
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <motion.div
          className={mobile ? "w-[235px]" : "w-[320px] lg:w-[365px]"}
          style={{ scale: orbitScale }}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            opacity: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <motion.div
            className="relative group"
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
            whileHover={
              reducedMotion
                ? { zIndex: 60 }
                : {
                    scale: 1.04,
                    opacity: 1,
                    zIndex: 60,
                    boxShadow: "0 20px 42px rgba(94, 131, 160, 0.16)",
                  }
            }
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to={item.to} className="block">
              <ImageFrame
                src={item.src}
                alt={`${item.label} portfolio fragment`}
                label={item.label}
                priority={item.id === "k11"}
                className="rounded-lg border border-line bg-white p-2 shadow-soft transition duration-300 group-hover:border-primary/35"
                imageClassName="transition duration-500"
                ratio={ratio}
                fit={fit}
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function getRingPosition(angle) {
  const centerX = 498;
  const centerY = 300;
  const radiusX = 315;
  const radiusY = 250;
  const radians = (angle * Math.PI) / 180;
  const depth = (1 - Math.cos(radians)) / 2;
  const focus = Math.pow(depth, 3);

  return {
    x: centerX + Math.cos(radians) * radiusX,
    y: centerY + Math.sin(radians) * radiusY,
    opacity: 1,
    scale: 0.72 + focus * 0.4,
    zIndex: Math.round(10 + depth * 35),
  };
}

function getMobileRingPosition(angle) {
  const centerX = 260;
  const centerY = 155;
  const radius = 170;
  const radians = (angle * Math.PI) / 180;
  const depth = (1 - Math.cos(radians)) / 2;
  const focus = Math.pow(depth, 3);

  return {
    x: centerX + Math.cos(radians) * radius,
    y: centerY + Math.sin(radians) * radius,
    opacity: 1,
    scale: 0.7 + focus * 0.34,
    zIndex: Math.round(10 + depth * 35),
  };
}

export default Home;
