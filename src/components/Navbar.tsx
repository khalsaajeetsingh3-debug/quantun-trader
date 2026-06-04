import { useState, useEffect } from 'react';
import { Menu, X, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Plans', href: '#plans' },
    { label: 'Earn', href: '#earn' },
    { label: 'Security', href: '#security' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-surface-950/90 backdrop-blur-xl border-b border-primary-900/30 shadow-lg shadow-primary-950/20' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <span className="font-display font-bold text-white text-sm">Q</span>
          </div>
          <span className="font-display font-semibold text-lg text-white">QuantumTrade</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-surface-200 hover:text-primary-400 transition-colors">{l.label}</a>
          ))}
          <Link to="/login" className="text-sm text-surface-200 hover:text-primary-400 transition-colors flex items-center gap-1.5"><LogIn size={14} />Login</Link>
          <Link to="/signup" className="bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors flex items-center gap-1.5"><UserPlus size={14} />Sign Up</Link>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-surface-200 p-2" aria-label="Toggle menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-surface-950/95 backdrop-blur-xl border-t border-primary-900/20 px-4 pb-4 pt-2">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="block py-2 text-surface-200 hover:text-primary-400 transition-colors text-sm">{l.label}</a>
          ))}
          <Link to="/login" onClick={() => setMenuOpen(false)} className="block py-2 text-surface-200 hover:text-primary-400 transition-colors text-sm flex items-center gap-1.5"><LogIn size={14} />Login</Link>
          <Link to="/signup" onClick={() => setMenuOpen(false)} className="mt-2 block text-center bg-primary-600 hover:bg-primary-500 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}
