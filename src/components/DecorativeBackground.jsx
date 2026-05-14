import { useLocation } from "react-router-dom";

function DecorativeBackground() {
  const location = useLocation();
  const isProjectDetail = location.pathname.startsWith("/projects/");
  const drawingOpacity = isProjectDetail ? "opacity-[0.35]" : "";
  const textureOpacity = isProjectDetail ? "opacity-[0.55]" : "opacity-95";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-paper">
      <div className="absolute inset-0 paper-texture" />
      <div className="absolute inset-0 paper-stains" />
      <div className="absolute inset-0 paper-vignette" />

      <div className="absolute -bottom-44 -left-52 h-[34rem] w-[44rem] rounded-full bg-primary/[0.035] blur-[130px]" />
      <div className="absolute -right-56 top-[42%] h-[30rem] w-[38rem] rounded-full bg-clay/[0.028] blur-[135px]" />

      <div className={`absolute inset-0 axis-grid ${textureOpacity}`} />
      <div className={`absolute inset-0 dotted-field ${isProjectDetail ? "opacity-[0.45]" : "opacity-90"}`} />

      <svg
        className={`absolute -left-28 top-20 h-[31rem] w-[34rem] text-primary/[0.065] ${drawingOpacity}`}
        viewBox="0 0 460 420"
        fill="none"
        aria-hidden="true"
      >
        <path d="M58 94H286M58 94V246M142 94V246M226 94V194" stroke="currentColor" strokeWidth="0.9" />
        <path d="M58 156H286M98 210H190M276 118H380M330 70V166" stroke="currentColor" strokeWidth="0.9" />
        <path d="M226 194C272 194 310 224 318 268" stroke="currentColor" strokeWidth="0.9" />
        <path d="M28 318H156M92 254V382" stroke="currentColor" strokeWidth="0.75" />
        <path d="M84 318H100M92 310V326" stroke="currentColor" strokeWidth="0.75" />
      </svg>

      <svg
        className={`absolute -bottom-8 left-[2%] h-[24rem] w-[46rem] text-clay/[0.13] ${drawingOpacity}`}
        viewBox="0 0 720 360"
        fill="none"
        aria-hidden="true"
      >
        <path d="M8 270C108 220 164 273 254 227C350 178 418 202 510 152C580 114 638 104 706 72" stroke="currentColor" />
        <path d="M0 315C112 262 178 316 270 268C363 221 438 241 532 190C606 150 650 143 720 112" stroke="currentColor" />
        <path d="M46 226C142 180 191 226 268 184C348 140 418 160 500 116C570 78 612 70 676 42" stroke="currentColor" />
        <path d="M96 184C168 146 220 178 282 144C348 108 402 122 468 86C518 58 564 46 620 22" stroke="currentColor" />
        <path d="M36 326H162M100 264V350M588 126H666M628 88V164" stroke="currentColor" strokeWidth="0.8" />
      </svg>

      <svg
        className={`absolute bottom-[-5rem] right-[-8rem] h-[34rem] w-[46rem] text-primary/[0.15] ${drawingOpacity}`}
        viewBox="0 0 680 380"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M42 236C134 270 252 279 382 254C488 234 574 197 642 141C606 258 502 331 344 340C194 349 90 312 42 236Z"
          stroke="currentColor"
          strokeWidth="1.15"
        />
        <path d="M126 220L212 96L392 220" stroke="currentColor" strokeWidth="0.95" />
        <path d="M214 98L248 190L302 133L340 220" stroke="currentColor" strokeWidth="0.95" />
        <path d="M94 274C224 315 392 307 560 246" stroke="currentColor" strokeWidth="0.9" />
        <path d="M138 249C252 272 376 267 500 227" stroke="currentColor" strokeWidth="0.75" />
        <path d="M454 176H612M534 96V254" stroke="currentColor" strokeWidth="0.7" />
      </svg>

      <svg
        className={`absolute right-[10%] top-[14%] h-60 w-80 text-line/70 ${drawingOpacity}`}
        viewBox="0 0 320 240"
        fill="none"
        aria-hidden="true"
      >
        <path d="M34 58H210M34 58V154M96 58V184M166 92V184M226 92H280" stroke="currentColor" strokeOpacity="0.62" />
        <path d="M34 108H126M166 132H280M96 184H224" stroke="currentColor" strokeOpacity="0.56" />
        <path d="M252 38H292M272 18V58M18 198H58M38 178V218" stroke="currentColor" strokeOpacity="0.62" />
      </svg>

      <div className={`absolute left-8 top-[42%] hidden h-20 w-20 text-ink/[0.06] md:block ${drawingOpacity}`}>
        <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
        <span className="absolute left-1/2 top-0 h-full w-px bg-current" />
        <span className="absolute left-[calc(50%-3px)] top-[calc(50%-3px)] h-1.5 w-1.5 rounded-full border border-current" />
      </div>

      <div className="fixed bottom-6 right-8 z-40 hidden rounded-tl-lg border-t border-line/50 bg-paper/58 px-3 pb-1 pt-3 text-right text-[10px] uppercase tracking-[0.28em] text-ink/26 backdrop-blur-[3px] md:block">
        Site Fragments / Waterfront Memory / Drawing Notes
      </div>
    </div>
  );
}

export default DecorativeBackground;
