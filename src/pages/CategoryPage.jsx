import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard.jsx";
import { categories, getProjectsByCategory } from "../data/projects.js";

const categoryTitles = {
  interior: {
    chinese: "\u5ba4\u5185\u8bbe\u8ba1",
    english: "Interior Design",
    note: "Floor plan / circulation / material atmosphere",
  },
  landscape: {
    chinese: "\u666f\u89c2\u8bbe\u8ba1",
    english: "Landscape Design",
    note: "Site reading / shoreline / public landscape",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerGroup = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

function CategoryPage({ category }) {
  const categoryInfo = categories[category];
  const categoryProjects = getProjectsByCategory(category);
  const title = categoryTitles[category];

  return (
    <div className="page-fade relative isolate overflow-hidden pt-28">
      <CategoryDrawing category={category} />

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-12 pt-10 md:px-8">
        <Link
          className="inline-flex items-center gap-2 rounded-full border border-primary/45 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition duration-300 hover:border-clay/55 hover:bg-clay/10 hover:text-clay"
          to="/"
        >
          <ArrowLeft size={17} /> Back to Home
        </Link>

        <motion.div
          className="relative mt-9 overflow-hidden border-y border-line/80 py-12"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <CategoryHeaderLinework category={category} />
          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="relative h-3 w-3 rounded-full border border-primary/70">
                  <span className="absolute left-1/2 top-1/2 h-px w-8 -translate-x-1/2 -translate-y-1/2 bg-primary/25" />
                  <span className="absolute left-1/2 top-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-primary/25" />
                </span>
                <p className="text-xs uppercase tracking-[0.24em] text-primary">
                  Curated Collection
                </p>
                <span className="h-px flex-1 bg-line/80" />
              </div>
              <h1 className="text-ink">
                <span className="font-cn-serif block text-5xl font-normal leading-none md:text-7xl">
                  {title.chinese}
                </span>
                <span className="mt-5 block font-display text-3xl uppercase tracking-[0.08em] text-primary/82 md:text-4xl">
                  {title.english}
                </span>
              </h1>
              <p className="mt-5 text-sm uppercase tracking-[0.18em] text-ink/42">
                {categoryInfo.subtitle}
              </p>
            </div>

            <div className="rounded-lg border border-line/75 bg-white/56 p-7 leading-8 text-ink/68 backdrop-blur-[2px]">
              <div className="mb-5 flex items-center justify-between gap-4 border-b border-line/70 pb-3">
                <span className="text-[10px] uppercase tracking-[0.22em] text-primary">
                  Collection Note
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/45" />
              </div>
              <p>{categoryInfo.description}</p>
              <p className="mt-4">{categoryInfo.englishDescription}</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <motion.div
          className="mb-8 flex items-end justify-between gap-6 border-b border-line/70 pb-5"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full border border-primary/65" />
              <p className="text-xs uppercase tracking-[0.24em] text-primary">
                Portfolio Works
              </p>
            </div>
            <p className="mt-3 text-xs uppercase tracking-[0.18em] text-ink/45">
              {String(categoryProjects.length).padStart(2, "0")} projects in this collection
            </p>
          </div>
          <p className="hidden max-w-sm text-right text-xs uppercase leading-6 tracking-[0.18em] text-ink/30 md:block">
            {title.note}
          </p>
        </motion.div>
        <motion.div
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
          variants={staggerGroup}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.18 }}
        >
          {categoryProjects.map((project) => (
            <motion.div key={project.id} variants={fadeUp}>
              <ProjectCard project={project} compact />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

function CategoryHeaderLinework({ category }) {
  const isLandscape = category === "landscape";

  return (
    <svg
      className={`pointer-events-none absolute right-0 top-0 h-full w-1/2 ${
        isLandscape ? "text-clay/[0.075]" : "text-primary/[0.08]"
      }`}
      viewBox="0 0 520 260"
      fill="none"
      aria-hidden="true"
    >
      {isLandscape ? (
        <>
          <path d="M42 178C122 120 188 190 270 142C340 100 404 116 484 62" stroke="currentColor" />
          <path d="M34 214C124 154 198 222 286 174C360 132 420 148 500 94" stroke="currentColor" />
          <path d="M358 166H462M410 118V218M404 166H416M410 160V172" stroke="currentColor" />
        </>
      ) : (
        <>
          <path d="M80 70H380M80 70V190M160 70V190M246 70V150" stroke="currentColor" />
          <path d="M80 132H380M246 150C296 150 334 180 342 224" stroke="currentColor" />
          <path d="M392 70H488M440 24V116M432 70H448M440 62V78" stroke="currentColor" />
        </>
      )}
    </svg>
  );
}

function CategoryDrawing({ category }) {
  if (category === "landscape") {
    return (
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <svg
          className="absolute -right-24 top-20 h-[38rem] w-[50rem] text-primary/[0.14]"
          viewBox="0 0 760 520"
          fill="none"
          aria-hidden="true"
        >
          <path d="M84 344C188 270 268 354 380 284C488 216 584 240 704 150" stroke="currentColor" />
          <path d="M58 398C184 318 280 402 398 328C510 258 604 284 730 190" stroke="currentColor" />
          <path d="M132 284C228 222 302 284 392 230C482 174 560 188 658 120" stroke="currentColor" />
          <path d="M206 220C278 176 336 214 404 174C474 132 536 138 612 84" stroke="currentColor" />
          <path d="M112 440C222 410 298 428 392 382C474 342 548 332 648 292" stroke="currentColor" strokeDasharray="10 14" />
          <path d="M520 244C568 222 604 226 646 202" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="236" cy="316" r="4" fill="currentColor" />
          <circle cx="424" cy="268" r="4" fill="currentColor" />
          <circle cx="604" cy="216" r="4" fill="currentColor" />
          <path d="M612 350H700M656 306V394" stroke="currentColor" strokeWidth="0.8" />
        </svg>

        <svg
          className="absolute -left-28 bottom-8 h-[25rem] w-[36rem] text-clay/[0.095]"
          viewBox="0 0 540 360"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M42 228C110 250 196 258 292 240C370 226 432 200 488 160C460 238 386 286 270 294C160 302 78 276 42 228Z"
            stroke="currentColor"
          />
          <path d="M108 216L178 126L320 216" stroke="currentColor" />
          <path d="M82 270C174 296 306 292 430 246" stroke="currentColor" />
        </svg>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <svg
        className="absolute -left-16 top-24 h-[36rem] w-[42rem] text-primary/[0.13]"
        viewBox="0 0 620 520"
        fill="none"
        aria-hidden="true"
      >
        <path d="M74 92H278M74 92V316M278 92V176M74 316H190" stroke="currentColor" />
        <path d="M190 316V418H420V186H278" stroke="currentColor" />
        <path d="M122 92V316M74 162H278M190 238H420M286 186V418" stroke="currentColor" />
        <path d="M278 176C326 176 366 208 374 254" stroke="currentColor" />
        <path d="M190 316C190 362 224 398 268 406" stroke="currentColor" />
        <path d="M320 276H390V342H320V276Z" stroke="currentColor" />
        <path d="M104 194H154V246H104V194Z" stroke="currentColor" />
        <path d="M452 118H540M496 74V162M492 118H500M496 114V122" stroke="currentColor" strokeWidth="0.8" />
      </svg>

      <svg
        className="absolute -right-20 bottom-16 h-[24rem] w-[34rem] text-clay/[0.085]"
        viewBox="0 0 520 340"
        fill="none"
        aria-hidden="true"
      >
        <path d="M68 82H420M68 142H420M68 202H420" stroke="currentColor" />
        <path d="M104 62V224M208 62V224M332 62V224" stroke="currentColor" />
        <path d="M90 260H220M90 286H336M90 312H278" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

export default CategoryPage;
