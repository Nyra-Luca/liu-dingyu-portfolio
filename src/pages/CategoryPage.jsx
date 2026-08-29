import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard.jsx";
import { categories, getProjectsByCategory } from "../data/projects.js";

const categoryTitles = {
  interior: {
    chinese: "\u5ba4\u5185\u8bbe\u8ba1",
    english: "Interior Design",
    englishSummary:
      "Commercial, residential, and retail interiors shaped through circulation, material atmosphere, and clear spatial expression.",
  },
  landscape: {
    chinese: "\u666f\u89c2\u8bbe\u8ba1",
    english: "Landscape Design",
    englishSummary:
      "Urban renewal, waterfront, and public landscapes developed through site reading, movement, and everyday use.",
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
    <div className="page-fade relative isolate overflow-hidden pt-20 md:pt-24">
      <CategoryDrawing category={category} />

      <section className="relative z-10 mx-auto max-w-7xl px-5 pb-7 pt-5 md:px-8">
        <Link
          className="inline-flex items-center gap-2 rounded-full border border-primary/45 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition duration-300 hover:border-clay/55 hover:bg-clay/10 hover:text-clay"
          to="/"
        >
          <ArrowLeft size={17} /> 返回首页
        </Link>

        <motion.div
          className="relative mt-6 overflow-hidden border-y border-line/80 py-8 md:py-9"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <CategoryHeaderLinework category={category} />
          <div className="relative max-w-5xl">
            <h1 className="text-ink">
              <span className="font-cn-display block text-5xl leading-none md:text-6xl lg:text-7xl">
                {title.chinese}
              </span>
              <span className="mt-4 block font-display text-3xl uppercase tracking-[0.08em] text-primary/82 md:text-4xl">
                {title.english}
              </span>
            </h1>

            <div className="mt-7 grid max-w-4xl gap-4 md:grid-cols-[1.08fr_0.92fr] md:gap-9">
              <p className="max-w-xl leading-7 text-ink/70">
                {categoryInfo.description}
              </p>
              <p className="border-l border-primary/25 pl-5 text-sm leading-7 text-ink/56 md:pl-7">
                {title.englishSummary}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-7xl overflow-hidden px-5 pb-24 md:px-8">
        <motion.div
          className="mb-6 flex items-baseline justify-between gap-5 border-b border-line/70 pb-4"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-primary">
            Portfolio Works
          </p>
          <p className="text-right text-xs uppercase tracking-[0.16em] text-ink/42">
            {String(categoryProjects.length).padStart(2, "0")} projects
          </p>
        </motion.div>
        <motion.div
          className="grid w-full min-w-0 grid-cols-[minmax(0,1fr)] items-start gap-6 md:grid-cols-2 md:gap-8"
          variants={staggerGroup}
          initial="hidden"
          animate="visible"
          key={category}
        >
          {categoryProjects.map((project, index) => {
            const featured = index === 0;
            const imageRatio = featured
              ? undefined
              : category === "landscape"
                ? index === 1
                  ? "aspect-[16/10]"
                  : "aspect-[4/3]"
                : index === 1
                  ? "aspect-[4/3]"
                  : "aspect-[16/10]";
            const offsetClass =
              index === 2
                ? category === "landscape"
                  ? "md:mt-12"
                  : "md:mt-6"
                : "";

            return (
              <motion.div
                key={project.id}
                className={`w-full min-w-0 max-w-full ${featured ? "md:col-span-2" : ""} ${offsetClass}`}
                variants={fadeUp}
              >
                <ProjectCard
                  project={project}
                  compact
                  featured={featured}
                  imageRatio={imageRatio}
                />
              </motion.div>
            );
          })}
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
  return null;
}

export default CategoryPage;
