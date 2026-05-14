import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router-dom";
import ImageFrame from "../components/ImageFrame.jsx";
import { categories, getProjectById } from "../data/projects.js";

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
    transition: { staggerChildren: 0.09 },
  },
};

function ProjectDetail() {
  const { projectId } = useParams();
  const project = getProjectById(projectId);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const categoryInfo = categories[project.category];
  const detailImages = project.images;
  const titleParts = getDisplayTitle(project);
  const projectIndex = getProjectIndex(project);

  return (
    <article className="page-fade pt-28">
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-8 md:px-8">
        <Link
          to={categoryInfo.path}
          className="inline-flex items-center gap-2 rounded-full border border-primary/45 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition duration-300 hover:border-clay/55 hover:bg-clay/10 hover:text-clay"
        >
          <ArrowLeft size={17} /> Back to {categoryInfo.shortTitle}
        </Link>

        <motion.div
          className="relative mt-9 overflow-hidden border-y border-line/80 py-12"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <HeaderLinework />
          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <span className="relative h-3 w-3 rounded-full border border-primary/70">
                  <span className="absolute left-1/2 top-1/2 h-px w-8 -translate-x-1/2 -translate-y-1/2 bg-primary/25" />
                  <span className="absolute left-1/2 top-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-primary/25" />
                </span>
                <p className="text-xs uppercase tracking-[0.24em] text-primary">
                  Project {projectIndex}
                </p>
                <span className="h-px flex-1 bg-line/80" />
              </div>
              <h1 className="font-cn-serif text-4xl font-normal leading-tight text-ink md:text-6xl">
                {titleParts.main}
              </h1>
              {titleParts.subtitle ? (
                <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/62">
                  {titleParts.subtitle}
                </p>
              ) : null}
              <p className="mt-3 max-w-4xl text-base leading-7 text-clay md:text-lg">
                {project.englishTitle}
              </p>
            </div>
            <div className="relative rounded-lg border border-line/75 bg-white/56 p-7 leading-8 text-ink/68">
              <div className="mb-5 flex items-center justify-between gap-4 border-b border-line/70 pb-3">
                <span className="text-[10px] uppercase tracking-[0.22em] text-primary">
                  Summary
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/45" />
              </div>
              <p>{project.summary}</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 md:px-8">
        <motion.div
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
          variants={staggerGroup}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <InfoTile index="01" label="Type" value={project.type} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <InfoTile index="02" label="Year" value={project.year} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <InfoTile index="03" label="Location" value={project.location} />
          </motion.div>
          <motion.div variants={fadeUp}>
            <InfoTile index="04" label="Scope" value={project.scope} />
          </motion.div>
        </motion.div>
        <motion.div
          className="mt-4 rounded-lg border border-line/70 bg-white/46 p-5"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-primary">
            Keywords
          </p>
          <div className="flex flex-wrap gap-2">
            {project.keywords.map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-line bg-transparent px-3 py-1 text-xs text-ink/62"
              >
                {keyword}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1480px] px-4 pb-24 pt-4 md:px-6">
        <div className="mx-auto flex flex-col items-center gap-10 md:gap-12">
          {detailImages.map((image, index) => (
            <motion.div
              key={`${project.id}-${image}`}
              className="flex w-full justify-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.18 }}
              variants={fadeUp}
            >
              <ImageFrame
                src={image}
                alt={`${project.title} portfolio page ${index + 1}`}
                label={image}
                className="w-full max-w-[1400px] rounded-md border border-line/70 bg-white/78 p-2 shadow-[0_8px_22px_rgba(47,52,55,0.04)] md:w-[96%]"
                ratio="aspect-[420/297]"
                fit="contain"
              />
            </motion.div>
          ))}
        </div>
      </section>
    </article>
  );
}

function InfoTile({ index, label, value }) {
  return (
    <div className="group rounded-lg border border-line/75 bg-white/58 p-5 transition duration-300 hover:border-primary/35">
      <div className="mb-4 flex items-center justify-between border-b border-line/65 pb-3">
        <p className="text-[10px] uppercase tracking-[0.18em] text-primary">
          {index} {label}
        </p>
        <span className="h-1 w-1 rounded-full bg-primary/40" />
      </div>
      <p className="text-sm leading-6 text-ink/72">{value}</p>
    </div>
  );
}

function HeaderLinework() {
  return (
    <svg
      className="pointer-events-none absolute right-0 top-0 h-full w-1/2 text-primary/[0.08]"
      viewBox="0 0 520 260"
      fill="none"
      aria-hidden="true"
    >
      <path d="M80 70H380M80 70V190M160 70V190M246 70V150" stroke="currentColor" />
      <path d="M80 132H380M246 150C296 150 334 180 342 224" stroke="currentColor" />
      <path d="M392 70H488M440 24V116M432 70H448M440 62V78" stroke="currentColor" />
    </svg>
  );
}

function getProjectIndex(project) {
  const indexMap = {
    "k11-flower-shop": "01",
    "xunyang-residence": "02",
    "small-retail-store": "03",
    "senjiangyuan-shipyard": "04",
    "jiangdong-pocket-park": "05",
    "nanping-historical-street": "06",
  };

  return indexMap[project.id] || "00";
}

function getDisplayTitle(project) {
  const titleMap = {
    "k11-flower-shop": {
      main: "\u6253\u5305\u6625\u5929",
      subtitle: "\u4e0a\u6d77 K11 \u8d2d\u7269\u4e2d\u5fc3\u82b1\u5e97\u8bbe\u8ba1",
    },
    "xunyang-residence": {
      main: "\u90c7\u9633\u6e56\u7554\u4f4f\u5b85",
      subtitle: "\u4f4f\u5b85\u5ba4\u5185\u8bbe\u8ba1",
    },
    "small-retail-store": {
      main: "\u5c0f\u578b\u96f6\u552e\u5e97",
      subtitle: "\u7a7a\u95f4\u8bbe\u8ba1",
    },
    "senjiangyuan-shipyard": {
      main: "\u65e7\u8239\u5382\u96c6\u5e02",
      subtitle: "\u6d77\u53e3\u68ee\u6c5f\u6c85\u65e7\u8239\u5382\u96c6\u5e02\u5316\u8bbe\u8ba1",
    },
    "jiangdong-pocket-park": {
      main: "\u53e3\u888b\u516c\u56ed",
      subtitle: "\u6d77\u53e3\u6c5f\u4e1c\u65b0\u533a\u53e3\u888b\u516c\u56ed\u8bbe\u8ba1",
    },
    "nanping-historical-street": {
      main: "\u5386\u53f2\u8857\u9053\u6539\u9020",
      subtitle: "\u5357\u5e73\u5e02\u5ef6\u5e73\u533a\u5de8\u53e3\u4e61",
    },
  };

  return titleMap[project.id] || { main: project.title, subtitle: "" };
}

export default ProjectDetail;
