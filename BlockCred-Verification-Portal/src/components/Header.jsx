import { useState } from "react";
import { ArrowUpRight, Layers3, Menu, X } from "lucide-react";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#verify", label: "Verify certificate" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#about", label: "About" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a
          className="brand"
          href="#home"
          aria-label="BlockCred AI home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="brand-mark">
            <Layers3 size={21} strokeWidth={2.1} />
          </span>
          <span className="brand-copy">
            <strong>BlockCred<span> AI</span></strong>
            <small>TRUST, VERIFIED.</small>
          </span>
        </a>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>

        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href="#verify" onClick={() => setMenuOpen(false)}>
            Get started <ArrowUpRight size={15} />
          </a>
        </nav>
      </div>
    </header>
  );
}
