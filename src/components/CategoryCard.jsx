import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ImageFrame from "./ImageFrame.jsx";

const titleParts = {
  interior: ["Interior Design", "\u5ba4\u5185\u8bbe\u8ba1"],
  landscape: ["Landscape Design", "\u666f\u89c2\u8bbe\u8ba1"],
};

function CategoryCard({ category }) {
  const categoryKey = category.path.replace("/", "");
  const [englishTitle, chineseTitle] = titleParts[categoryKey];

  return (
    <Link
      to={category.path}
      className="group grid overflow-hidden rounded-lg border border-line/70 bg-white/75 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift md:grid-cols-[1.05fr_0.95fr]"
    >
      <ImageFrame
        src={category.image}
        alt={`${category.shortTitle} preview`}
        label={category.shortTitle}
        className="rounded-none"
        ratio="aspect-[16/11] md:aspect-auto"
      />
      <div className="flex flex-col justify-between p-7">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.24em] text-primary">
            Project Category
          </p>
          <h3 className="text-ink">
            <span className="block font-display text-4xl leading-none">
              {englishTitle}
            </span>
            <span className="mt-3 block text-lg font-medium tracking-wide text-ink/70">
              {chineseTitle}
            </span>
          </h3>
          <p className="mt-4 text-sm leading-7 text-ink/62">{category.subtitle}</p>
        </div>
        <span className="mt-8 inline-flex items-center gap-2 text-sm text-primary">
          Enter Collection <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}

export default CategoryCard;
