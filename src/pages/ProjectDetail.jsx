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

function ProjectDetail() {
  const { projectId } = useParams();
  const project = getProjectById(projectId);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const categoryInfo = categories[project.category];
  const detailImages = project.images;
  const titleParts = getDisplayTitle(project);
  const returnLabel = project.category === "interior" ? "返回室内设计" : "返回景观设计";

  return (
    <article className="page-fade pt-24 md:pt-28">
      <section className="mx-auto max-w-7xl px-5 pb-2 pt-6 md:px-8 md:pb-6 md:pt-8">
        <Link
          to={categoryInfo.path}
          className="inline-flex items-center gap-2 rounded-full border border-primary/45 bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary transition duration-300 hover:border-clay/55 hover:bg-clay/10 hover:text-clay"
        >
          <ArrowLeft size={17} /> {returnLabel}
        </Link>

        <motion.div
          className="relative mt-5 overflow-hidden border-y border-line/80 py-4 md:mt-6 md:py-7"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <HeaderLinework />
          <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(20rem,0.9fr)] lg:gap-14">
            <div className="lg:pt-1">
              <h1 className="font-cn-display text-4xl leading-tight text-ink md:text-5xl lg:text-6xl">
                {titleParts.main}
              </h1>
              {titleParts.subtitle ? (
                <p className="mt-3 max-w-2xl font-cn-heading text-xl font-normal leading-snug text-ink/82 md:mt-4 md:text-2xl lg:text-[1.75rem]">
                  {titleParts.subtitle}
                </p>
              ) : null}
              <p className="mt-3 max-w-3xl font-display text-lg leading-7 text-clay md:text-xl">
                {project.englishTitle}
              </p>
              <p className="mt-5 max-w-2xl border-l border-primary/30 py-0.5 pl-5 text-sm leading-7 text-ink/72 md:mt-6 md:pl-6 md:text-base md:leading-8">
                {project.summary}
              </p>
            </div>

            <div className="relative lg:pt-2">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line/80 pt-5 md:gap-y-5">
                <ProjectFact label="Type" value={project.type} />
                <ProjectFact label="Year" value={project.year} />
                <ProjectFact label="Location" value={project.location} />
                <ProjectFact label="Scope" value={project.scope} />
              </dl>

              <div className="mt-4 border-t border-line/75 pt-4 md:mt-5">
                <p className="text-[10px] uppercase tracking-[0.2em] text-primary">
                  Keywords
                </p>
                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5 text-xs leading-5 text-ink/62">
                  {project.keywords.map((keyword, index) => (
                    <span key={keyword} className="inline-flex items-center gap-3">
                      {index > 0 ? <span className="text-primary/35">/</span> : null}
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 pt-1 md:px-8 md:pt-2">
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
                className="w-full rounded-md border border-line/70 bg-white/78 p-2 shadow-[0_8px_22px_rgba(47,52,55,0.04)]"
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

function ProjectFact({ label, value }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.18em] text-primary">
        {label}
      </dt>
      <dd className="mt-2 text-xs leading-5 text-ink/70 md:text-sm md:leading-6">
        {value}
      </dd>
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
