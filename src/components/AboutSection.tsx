import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Shield, Zap, HeartHandshake, Sparkles, Quote } from 'lucide-react';

interface AboutSectionProps {
  lang: 'id' | 'en';
}

export const AboutSection: React.FC<AboutSectionProps> = ({ lang }) => {
  const principles = [
    {
      icon: Zap,
      title: { id: 'Performa & Kecepatan adalah Fitur Inti', en: 'Performance as a Core Feature' },
      description: {
        id: 'Aplikasi tidak hanya harus indah, tapi harus responsif instan dalam hitungan milidetik. Nol animasi lag, pemuatan aset progresif, dan bundle yang ramping.',
        en: 'Interfaces must feel instantaneous. Sub-200ms interactions, progressive asset delivery, and lean zero-bloat bundles.',
      },
    },
    {
      icon: Shield,
      title: { id: 'Kedisiplinan Aksesibilitas (WCAG)', en: 'Accessibility & Inclusion (WCAG)' },
      description: {
        id: 'Desain inklusif yang dapat dinavigasi dengan mudah oleh semua orang—melalui keyboard, screen reader, dan kontras warna yang teruji laboratorium.',
        en: 'Inclusive by design: full keyboard parity, tested screen reader hierarchies, and lab-verified AA/AAA color contrast ratios.',
      },
    },
    {
      icon: HeartHandshake,
      title: { id: 'Kode Bersih & Skalabilitas Masa Depan', en: 'Clean Architecture & Scalability' },
      description: {
        id: 'Menulis kode TypeScript yang terstruktur rapi, terdokumentasi, dan mudah dipahami oleh anggota tim lain saat produk berkembang.',
        en: 'Architecting clean TypeScript codebases designed for effortless team onboarding, modular expansion, and long-term maintainability.',
      },
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 border-b border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-2">
            05. {lang === 'id' ? 'Filosofi & Testimoni' : 'Philosophy & Endorsements'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-stone-900 dark:text-white tracking-tight [text-wrap:balance]">
            {lang === 'id' ? 'Prinsip Kerja & Kepercayaan Mitra' : 'Guiding Principles & Partner Trust'}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2">
            {lang === 'id'
              ? 'Bagaimana saya memandang setiap tantangan rekayasa digital: mengedepankan kualitas jangka panjang daripada jalan pintas yang rapuh.'
              : 'How I approach digital product engineering: prioritizing enduring craft and business impact over fragile shortcuts.'}
          </p>
        </div>

        {/* 3 Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {principles.map((pr, idx) => {
            const Icon = pr.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0c0f17] border border-stone-200 dark:border-stone-800 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-display text-stone-900 dark:text-white mb-2.5">
                    {pr.title[lang]}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                    {pr.description[lang]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Sub-section */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
              {lang === 'id' ? 'Ulasan Kolaborator' : 'Client Testimonials'}
            </p>
            <h3 className="text-2xl font-bold font-display text-stone-900 dark:text-white">
              {lang === 'id' ? 'Apa Kata Klien & Rekan Rekayasa' : 'What Leaders Say About Working Together'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {PORTFOLIO_DATA.testimonials.map((test, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0c0f17] border border-stone-200 dark:border-stone-800 flex flex-col justify-between relative shadow-xs"
              >
                <div>
                  <Quote className="w-6 h-6 text-indigo-500/30 mb-4" />
                  <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed italic mb-6">
                    "{test.quote[lang]}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-200 font-bold font-display flex items-center justify-center text-xs shrink-0">
                    {test.avatarInitials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-stone-900 dark:text-white truncate">
                      {test.author}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                      {test.role} · {test.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
