import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Briefcase, Calendar, MapPin, CheckCircle2, Award } from 'lucide-react';

interface ExperienceSectionProps {
  lang: 'id' | 'en';
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ lang }) => {
  return (
    <section id="experience" className="py-20 md:py-28 border-b border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-2">
            03. {lang === 'id' ? 'Pengalaman & Rekam Jejak' : 'Career Track & Leadership'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-stone-900 dark:text-white tracking-tight [text-wrap:balance]">
            {lang === 'id' ? 'Enam Tahun Membangun Skala & Dampak' : 'Six Years of Engineering Leadership'}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2">
            {lang === 'id'
              ? 'Pengalaman memimpin rekayasa antarmuka di startup bervolume tinggi, agensi kreatif peraih penghargaan, dan proyek korporat strategis.'
              : 'Proven trajectory directing interface architecture across high-throughput tech startups, award-winning creative agencies, and strategic enterprise initiatives.'}
          </p>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-3 md:before:left-4 before:w-0.5 before:bg-stone-200 dark:before:bg-stone-800">
          {PORTFOLIO_DATA.experiences.map((exp, idx) => (
            <div
              key={idx}
              className="relative pl-10 md:pl-12 group"
            >
              {/* Timeline Indicator Dot (functional anchor, not decorative pulse) */}
              <div className="absolute left-1.5 md:left-2.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-indigo-600 bg-white dark:bg-[#07090e] group-hover:scale-125 transition-transform" />

              <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0c0f17] border border-stone-200 dark:border-stone-800 group-hover:border-stone-300 dark:group-hover:border-stone-700 transition-all shadow-xs">
                {/* Header Row: Role & Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800/80 pb-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold font-display text-stone-900 dark:text-white">
                      {exp.role[lang]}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mt-1">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {exp.company}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{exp.location}</span>
                      <span aria-hidden="true">·</span>
                      <span>{exp.type}</span>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-medium text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-900 px-3 py-1 rounded-md self-start sm:self-auto shrink-0 tabular-nums">
                    {exp.period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
                  {exp.description[lang]}
                </p>

                {/* Achievements List */}
                <div className="space-y-2 mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                    {lang === 'id' ? 'Dampak & Kontribusi Utama:' : 'Key Outcomes & Contributions:'}
                  </p>
                  {exp.achievements[lang].map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-600 dark:text-stone-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400">
                  <span className="text-stone-400 font-sans">Stack:</span>
                  {exp.technologies.map((t, tIdx) => (
                    <React.Fragment key={t}>
                      <span className="text-stone-700 dark:text-stone-300">{t}</span>
                      {tIdx < exp.technologies.length - 1 && (
                        <span aria-hidden="true" className="text-stone-300 dark:text-stone-700">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
