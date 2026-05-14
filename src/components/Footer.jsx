function Footer() {
  return (
    <footer id="contact" className="relative z-10 border-t border-line/70 bg-card/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-ink/65 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <p className="font-display text-2xl text-ink">Designed by Liu Dingyu</p>
          <p className="mt-2">Interior & Landscape Design Portfolio / 2026</p>
        </div>
        <a className="transition hover:text-primary" href="mailto:liudingyu21@gmail.com">
          Email: liudingyu21@gmail.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
