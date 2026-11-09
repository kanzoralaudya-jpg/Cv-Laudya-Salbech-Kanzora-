import React from 'react';
import { Profile } from '../data/portfolioData';
import { ArrowUp, Github, Linkedin, MessageSquare } from 'lucide-react';

interface FooterProps {
  lang: 'id' | 'en';
  profile: Profile;
}

export const Footer: React.FC<FooterProps> = ({ lang, profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-[#07090e] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Copyright */}
          <div className="text-center md:text-left">
            <p className="text-base font-bold font-display text-stone-900 dark:text-white">
              {profile.name}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              © {new Date().getFullYear()} {profile.name}. {lang === 'id' ? 'Hak cipta dilindungi.' : 'All rights reserved.'}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 text-xs text-stone-600 dark:text-stone-400 font-medium">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <a
              href={profile.dribbble}
              target="_blank"
              rel="noreferrer"
              className="hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              Dribbble
            </a>
            <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              WhatsApp
            </a>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900"
            aria-label="Kembali ke atas halaman"
          >
            <span>{lang === 'id' ? 'Kembali ke Atas' : 'Back to Top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
