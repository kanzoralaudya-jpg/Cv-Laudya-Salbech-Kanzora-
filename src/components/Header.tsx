import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X, ArrowUpRight, Sliders } from 'lucide-react';

interface HeaderProps {
  lang: 'id' | 'en';
  setLang: (lang: 'id' | 'en') => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  onOpenContact: () => void;
  onOpenEditor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  setLang,
  isDark,
  setIsDark,
  onOpenContact,
  onOpenEditor,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#projects', label: lang === 'id' ? 'Karya Terpilih' : 'Works' },
    { href: '#skills', label: lang === 'id' ? 'Keahlian' : 'Skills' },
    { href: '#experience', label: lang === 'id' ? 'Pengalaman' : 'Experience' },
    { href: '#estimator', label: lang === 'id' ? 'Estimator' : 'Estimator' },
    { href: '#about', label: lang === 'id' ? 'Tentang' : 'About' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-50/90 dark:bg-[#07090e]/90 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 py-3.5 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar Contract: Zone 1, Zone 2, Zone 3 separated by gap-8 */}
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100 font-display whitespace-nowrap shrink-0 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Kanzora Laudya
          </a>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600 dark:text-stone-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-stone-900 dark:hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-500 hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action + controls */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Edit Portfolio Button */}
            <button
              onClick={onOpenEditor}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors whitespace-nowrap shrink-0"
              title={lang === 'id' ? 'Edit gambar, teks, dan portofolio' : 'Edit photos, text, and portfolio'}
            >
              <Sliders className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden lg:inline">{lang === 'id' ? 'Edit Konten' : 'Edit Content'}</span>
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'id' ? 'en' : 'id')}
              className="text-xs font-semibold px-2 py-1.5 rounded-md border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors whitespace-nowrap shrink-0"
              title={lang === 'id' ? 'Ganti ke Bahasa Inggris' : 'Switch to Indonesian'}
              aria-label="Toggle language"
            >
              {lang === 'id' ? 'EN' : 'ID'}
            </button>

            {/* Dark/Light Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-1.5 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-md border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors"
              title={isDark ? 'Ganti ke Mode Terang' : 'Ganti ke Mode Gelap'}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenContact}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
            >
              <span>{lang === 'id' ? 'Mulai Proyek' : "Let's Talk"}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-md border border-stone-200 dark:border-stone-800"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 border-t border-stone-200 dark:border-stone-800 mt-3 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEditor();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-lg"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{lang === 'id' ? 'Edit Konten & Gambar' : 'Edit Content & Media'}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm"
              >
                <span>{lang === 'id' ? 'Mulai Proyek' : "Let's Talk"}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

