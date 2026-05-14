function SectionTitle({ eyebrow, title, description }) {
  return (
    <div className="mb-9 max-w-3xl">
      {eyebrow ? (
        <p className="mb-3 text-xs uppercase tracking-[0.24em] text-primary">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-4xl text-ink md:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-4 leading-8 text-ink/68">{description}</p>
      ) : null}
    </div>
  );
}

export default SectionTitle;
