import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navItems = [
  { index: "01", label: "Home", to: "/" },
  { index: "02", label: "Interior", to: "/interior" },
  { index: "03", label: "Landscape", to: "/landscape" },
  { index: "04", label: "About", to: "/about" },
  { index: "05", label: "Contact", to: "/contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[rgba(216,216,210,0.5)] bg-[rgba(241,238,230,0.72)] shadow-[0_1px_0_rgba(255,255,255,0.28)_inset] backdrop-blur-[6px]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link to="/" className="group flex items-center gap-3 text-ink">
          <span className="relative h-2 w-2 rounded-full border border-primary/55">
            <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-primary/25" />
            <span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-primary/25" />
          </span>
          <span className="font-display text-xl uppercase leading-none">Liu Dingyu</span>
          <span className="hidden h-px w-8 bg-line transition group-hover:bg-primary/50 sm:block" />
          <span className="hidden text-[10px] uppercase tracking-[0.24em] text-ink/42 sm:block">
            Portfolio 2026
          </span>
        </Link>

        <div className="hidden items-center gap-6 text-[12px] uppercase tracking-[0.12em] text-ink/66 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              className={({ isActive }) => `nav-link group ${isActive ? "is-active" : ""}`}
            >
              <span className="nav-index">{item.index}</span>
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          className="rounded-full border border-line bg-white/35 p-2 text-ink md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-line/70 bg-paper/96 px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm uppercase tracking-[0.12em] text-ink/75">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3"
              >
                <span className="text-[10px] text-primary/65">{item.index}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default Navbar;
