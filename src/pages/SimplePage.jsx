import SectionTitle from "../components/SectionTitle.jsx";

const content = {
  about: {
    eyebrow: "About",
    title: "Liu Dingyu / \u5218\u4e01\u745c",
    description: "Interior Design & Landscape Design",
    body: [
      "This portfolio collects design studies and project proposals across commercial interiors, residential spaces, waterfront renewal, public landscape, and community-scale spatial scenes.",
      "The work emphasizes site reading, spatial narrative, material atmosphere, and visual communication, with a quiet portfolio language suitable for future project image replacement.",
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Contact",
    description: "Email: liudingyu21@gmail.com",
    body: [
      "For portfolio review, collaboration, or design discussion, please contact Liu Dingyu by email.",
      "Email: liudingyu21@gmail.com",
    ],
  },
};

function SimplePage({ type }) {
  const page = content[type] || content.about;

  return (
    <div className="page-fade min-h-[70vh] pt-28">
      <section className="mx-auto max-w-5xl px-5 py-20 md:px-8">
        <div className="border-y border-line/80 py-14">
          <SectionTitle
            eyebrow={page.eyebrow}
            title={page.title}
            description={page.description}
          />
          <div className="max-w-3xl space-y-5 leading-8 text-ink/68">
            {page.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SimplePage;
