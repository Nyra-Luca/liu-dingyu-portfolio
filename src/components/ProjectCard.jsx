import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ImageFrame from "./ImageFrame.jsx";

function ProjectCard({
  project,
  compact = false,
  featured = false,
  imageRatio,
}) {
  const projectIdentity =
    project.category === "interior" ? "室内设计项目" : "景观设计项目";

  return (
    <article
      data-project-card
      data-featured={featured ? "true" : "false"}
      className={`group w-full min-w-0 max-w-full overflow-hidden rounded-lg border border-line/70 bg-white/72 p-3 shadow-soft transition duration-300 hover:border-primary/35 hover:shadow-lift ${
        featured ? "h-full" : "h-auto"
      }`}
    >
      <Link
        to={`/projects/${project.id}`}
        className={`flex h-full w-full min-w-0 max-w-full flex-col overflow-hidden ${
          featured
            ? "md:grid md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:grid-cols-[minmax(0,1.65fr)_minmax(19rem,0.85fr)]"
            : ""
        }`}
      >
        <ImageFrame
          src={project.coverImage}
          alt={`${project.title} cover`}
          label={project.englishTitle}
          className="h-full w-full max-w-full rounded-md"
          ratio={
            featured
              ? "aspect-[16/10] md:aspect-auto md:min-h-[24rem] lg:min-h-[28rem]"
              : imageRatio || (compact ? "aspect-video" : "aspect-[5/4]")
          }
          fit="cover"
        />
        <div
          className={`flex min-w-0 flex-1 flex-col border-t border-line/70 bg-[#F7F6F2]/95 ${
            featured
              ? "px-4 pb-4 pt-6 md:border-l md:border-t-0 md:p-7 lg:p-8"
              : "px-3 pb-3 pt-5"
          }`}
        >
          <div className="mb-4 flex items-center justify-between gap-4 border-b border-line/70 pb-3 text-[10px] uppercase tracking-[0.16em]">
            <p className="min-w-0 text-primary">
              {projectIdentity}
            </p>
            <span className="shrink-0 text-ink/55">{project.year}</span>
          </div>
          <h3
            className={`break-words font-cn-heading font-bold text-ink ${
              featured ? "text-2xl leading-9 md:text-3xl md:leading-10" : "text-xl leading-8"
            }`}
          >
            {project.title}
          </h3>
          <p className="mt-2 line-clamp-2 min-h-11 break-words font-display text-[15px] leading-[1.55] text-ink/65">
            {project.englishTitle}
          </p>

          <p
            className={`mt-4 border-l border-clay/40 pl-4 text-ink/75 ${
              featured
                ? "line-clamp-3 text-sm leading-7"
                : "line-clamp-2 text-xs leading-6"
            }`}
          >
            {project.summary}
          </p>

          <dl className="mt-5 grid grid-cols-2 border-y border-line/70">
            <ArchiveFact label="Year" value={project.year} />
            <ArchiveFact label="Location" value={project.location} right />
            <ArchiveFact label="Type" value={project.type} bottom />
            <ArchiveFact label="Scope" value={project.scope} right bottom />
          </dl>

          <span className="mt-auto inline-flex w-fit items-center gap-2 border-b border-primary/30 pb-1 pt-6 text-sm text-primary transition duration-300 group-hover:border-clay/45 group-hover:text-clay">
            查看完整案例 <ArrowUpRight size={15} />
          </span>
        </div>
      </Link>
    </article>
  );
}

function ArchiveFact({ label, value, right = false, bottom = false }) {
  return (
    <div
      className={`min-w-0 py-3 ${right ? "border-l border-line/70 pl-4" : "pr-4"} ${
        bottom ? "" : "border-b border-line/70"
      }`}
    >
      <dt className="text-[9px] uppercase tracking-[0.16em] text-primary/85">
        {label}
      </dt>
      <dd className="mt-1.5 break-words text-[11px] leading-5 text-ink/72">
        {value}
      </dd>
    </div>
  );
}

export default ProjectCard;
