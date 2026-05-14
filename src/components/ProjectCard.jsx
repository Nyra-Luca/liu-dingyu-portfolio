import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ImageFrame from "./ImageFrame.jsx";

function ProjectCard({ project, compact = false }) {
  return (
    <article className="group h-full rounded-lg border border-line/70 bg-white/78 p-3 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Link to={`/projects/${project.id}`} className="flex h-full flex-col">
        <ImageFrame
          src={project.coverImage}
          alt={`${project.title} cover`}
          label={project.englishTitle}
          className="rounded-md"
          ratio={compact ? "aspect-[4/3]" : "aspect-[5/4]"}
        />
        <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
          <div className="mb-4 flex items-center justify-between gap-4 border-b border-line/70 pb-3">
            <p className="line-clamp-1 text-[10px] uppercase leading-5 tracking-[0.16em] text-primary">
              {project.type}
            </p>
            <span className="shrink-0 text-xs text-ink/42">{project.year}</span>
          </div>
          <h3 className="text-xl font-medium leading-8 text-ink">{project.title}</h3>
          <p className="mt-2 line-clamp-2 min-h-11 text-[13px] leading-[1.7] text-ink/56">
            {project.englishTitle}
          </p>
          <div className="mt-5 flex min-h-[4.25rem] flex-wrap content-start gap-2">
            {project.keywords.slice(0, 4).map((keyword) => (
              <span
                key={keyword}
                className="rounded-full border border-line bg-transparent px-3 py-1 text-[11px] text-ink/58"
              >
                {keyword}
              </span>
            ))}
          </div>
          <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm text-white transition group-hover:bg-clay">
            View Project <ArrowUpRight size={15} />
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ProjectCard;
