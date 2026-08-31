import { motion, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const TRAIL_LIFETIME = 420;
const MAX_POINTS = 88;
const NODE_DISTANCE = 340;

const interactiveSelector =
  'a, button, [role="button"], input, textarea, select, summary';
const projectSelector = 'a[href^="/projects/"], [data-cursor="view"]';

function midpoint(first, second) {
  return {
    x: (first.x + second.x) / 2,
    y: (first.y + second.y) / 2,
  };
}

function BlueprintCursor() {
  const canvasRef = useRef(null);
  const pointsRef = useRef([]);
  const frameRef = useRef(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const modeRef = useRef("default");
  const visibleRef = useRef(false);
  const nodeDistanceRef = useRef(0);
  const nodeCountRef = useRef(0);
  const x = useMotionValue(-80);
  const y = useMotionValue(-80);
  const shouldReduceMotion = useReducedMotion();
  const location = useLocation();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState("default");

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const forcedColors = window.matchMedia("(forced-colors: active)");

    const updateEligibility = () => {
      setEnabled(
        finePointer.matches && !forcedColors.matches && !shouldReduceMotion,
      );
    };

    updateEligibility();
    finePointer.addEventListener("change", updateEligibility);
    forcedColors.addEventListener("change", updateEligibility);

    return () => {
      finePointer.removeEventListener("change", updateEligibility);
      forcedColors.removeEventListener("change", updateEligibility);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    visibleRef.current = false;
    modeRef.current = "default";
    pointsRef.current = [];
    setVisible(false);
    setMode("default");
  }, [location.pathname]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!enabled || !canvas) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    document.documentElement.classList.add("blueprint-cursor-enabled");

    const syncCanvasSize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      sizeRef.current = { width, height };
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const drawNode = (point, life) => {
      if (!point.node) return;

      const isRed = point.nodeTone === "red";
      context.save();
      context.strokeStyle = isRed
        ? `rgba(177, 89, 79, ${life * 0.72})`
        : `rgba(94, 131, 160, ${life * 0.58})`;
      context.lineWidth = 0.8;

      if (point.node === "circle") {
        context.beginPath();
        context.arc(point.x, point.y, 3.1, 0, Math.PI * 2);
        context.stroke();
      } else {
        context.beginPath();
        context.moveTo(point.x - 3.2, point.y);
        context.lineTo(point.x + 3.2, point.y);
        context.moveTo(point.x, point.y - 3.2);
        context.lineTo(point.x, point.y + 3.2);
        context.stroke();
      }

      context.restore();
    };

    const drawTrail = (time) => {
      const { width, height } = sizeRef.current;
      context.clearRect(0, 0, width, height);

      const activePoints = pointsRef.current.filter(
        (point) => time - point.time < TRAIL_LIFETIME,
      );
      pointsRef.current = activePoints;

      for (let index = 1; index < activePoints.length; index += 1) {
        const beforePrevious = activePoints[index - 2];
        const previous = activePoints[index - 1];
        const current = activePoints[index];
        if (current.breakBefore) continue;

        const start = beforePrevious
          ? midpoint(beforePrevious, previous)
          : previous;
        const end = midpoint(previous, current);
        const life = Math.max(
          0,
          1 - (time - current.time) / TRAIL_LIFETIME,
        );
        const easedLife = life * life;

        context.beginPath();
        context.moveTo(start.x, start.y);
        context.quadraticCurveTo(previous.x, previous.y, end.x, end.y);
        context.lineCap = "round";
        context.lineJoin = "round";
        context.lineWidth = 2.1;
        context.strokeStyle = `rgba(94, 131, 160, ${easedLife * 0.09})`;
        context.stroke();

        context.beginPath();
        context.moveTo(start.x, start.y);
        context.quadraticCurveTo(previous.x, previous.y, end.x, end.y);
        context.lineWidth = 0.85;
        context.strokeStyle = `rgba(94, 131, 160, ${easedLife * 0.74})`;
        context.stroke();
      }

      activePoints.forEach((point) => {
        const life = Math.max(
          0,
          1 - (time - point.time) / TRAIL_LIFETIME,
        );
        drawNode(point, life * life);
      });

      if (activePoints.length > 0) {
        frameRef.current = requestAnimationFrame(drawTrail);
      } else {
        frameRef.current = null;
      }
    };

    const showCursor = () => {
      if (visibleRef.current) return;
      visibleRef.current = true;
      setVisible(true);
    };

    const hideCursor = () => {
      if (!visibleRef.current) return;
      visibleRef.current = false;
      setVisible(false);
      modeRef.current = "default";
      setMode("default");
    };

    const updateMode = (target) => {
      const element = target instanceof Element ? target : null;
      let nextMode = "default";

      if (element?.closest(projectSelector)) nextMode = "view";
      else if (element?.closest(interactiveSelector)) nextMode = "interactive";

      if (nextMode === modeRef.current) return;
      modeRef.current = nextMode;
      setMode(nextMode);
    };

    const handlePointerMove = (event) => {
      if (event.pointerType && event.pointerType !== "mouse") return;

      x.set(event.clientX);
      y.set(event.clientY);
      showCursor();
      updateMode(event.target);

      const point = {
        x: event.clientX,
        y: event.clientY,
        time: performance.now(),
        breakBefore: false,
        node: null,
        nodeTone: "blue",
      };
      const previous = pointsRef.current.at(-1);

      if (previous) {
        const distance = Math.hypot(point.x - previous.x, point.y - previous.y);
        if (distance < 3.5) return;

        point.breakBefore = point.time - previous.time > 100 || distance > 140;
        if (point.breakBefore) nodeDistanceRef.current = 0;
        else nodeDistanceRef.current += distance;
      }

      if (nodeDistanceRef.current >= NODE_DISTANCE) {
        nodeCountRef.current += 1;
        point.node = nodeCountRef.current % 2 === 0 ? "cross" : "circle";
        point.nodeTone = nodeCountRef.current % 3 === 0 ? "red" : "blue";
        nodeDistanceRef.current = 0;
      }

      pointsRef.current.push(point);
      if (pointsRef.current.length > MAX_POINTS) pointsRef.current.shift();

      if (frameRef.current === null) {
        frameRef.current = requestAnimationFrame(drawTrail);
      }
    };

    const handlePointerOut = (event) => {
      if (event.relatedTarget === null) hideCursor();
    };

    const clearWhenHidden = () => {
      if (document.visibilityState === "visible") return;
      hideCursor();
      pointsRef.current = [];
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      context.clearRect(0, 0, sizeRef.current.width, sizeRef.current.height);
    };

    syncCanvasSize();
    window.addEventListener("resize", syncCanvasSize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("blur", hideCursor);
    document.addEventListener("visibilitychange", clearWhenHidden);

    return () => {
      document.documentElement.classList.remove("blueprint-cursor-enabled");
      window.removeEventListener("resize", syncCanvasSize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("blur", hideCursor);
      document.removeEventListener("visibilitychange", clearWhenHidden);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      pointsRef.current = [];
      context.clearRect(0, 0, sizeRef.current.width, sizeRef.current.height);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const isDefault = mode === "default";
  const isInteractive = mode === "interactive";
  const isView = mode === "view";

  return (
    <>
      <canvas
        ref={canvasRef}
        data-blueprint-trail=""
        className="pointer-events-none fixed inset-0 z-[80] h-screen w-screen"
        aria-hidden="true"
      />

      <motion.div
        data-blueprint-cursor={mode}
        className="pointer-events-none fixed left-0 top-0 z-[90]"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        aria-hidden="true"
      >
        <div className="absolute left-0 top-0 flex h-[68px] w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <motion.span
            className="absolute h-[26px] w-[26px]"
            animate={{ opacity: isDefault ? 1 : 0, scale: isDefault ? 1 : 0.7 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <span className="absolute left-0 top-1/2 h-[1.5px] w-[9px] -translate-y-1/2 bg-primary/90" />
            <span className="absolute right-0 top-1/2 h-[1.5px] w-[9px] -translate-y-1/2 bg-primary/90" />
            <span className="absolute left-1/2 top-0 h-[9px] w-[1.5px] -translate-x-1/2 bg-primary/90" />
            <span className="absolute bottom-0 left-1/2 h-[9px] w-[1.5px] -translate-x-1/2 bg-primary/90" />
            <span className="absolute left-1/2 top-1/2 h-[5.5px] w-[5.5px] -translate-x-1/2 -translate-y-1/2 border-[1.5px] border-primary" />
          </motion.span>

          <motion.span
            className="absolute h-9 w-9 rounded-full border-[1.5px] border-primary/80 bg-[rgba(105,145,175,0.10)] shadow-[0_0_0_1px_rgba(247,246,242,0.72)]"
            animate={{
              opacity: isInteractive ? 1 : 0,
              scale: isInteractive ? 1 : 0.72,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-1 ring-paper/80" />
          </motion.span>

          <motion.span
            className="absolute flex h-16 w-16 items-center justify-center rounded-full border border-primary/80 bg-paper/75 text-[10px] font-medium tracking-[0.13em] text-primary shadow-[0_5px_18px_rgba(47,52,55,0.08)] backdrop-blur-[2px]"
            animate={{ opacity: isView ? 1 : 0, scale: isView ? 1 : 0.76 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <span className="font-display">VIEW&nbsp;→</span>
          </motion.span>
        </div>
      </motion.div>
    </>
  );
}

export default BlueprintCursor;
