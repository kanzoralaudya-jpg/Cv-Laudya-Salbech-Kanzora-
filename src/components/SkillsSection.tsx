import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Terminal, Cpu, Layout, Sparkles, Check, ChevronRight } from 'lucide-react';

interface SkillsSectionProps {
  lang: 'id' | 'en';
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ lang }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const icons = [Layout, Terminal, Cpu, Sparkles];

  const currentCategory = PORTFOLIO_DATA.skillCategories[activeCategoryIndex];

  return (
    <section id="skills" className="py-20 md:py-28 border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-100/50 dark:bg-[#090b11]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-2">
            02. {lang === 'id' ? 'Keahlian & Kedalaman Rekayasa' : 'Capabilities & Technical Matrix'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-stone-900 dark:text-white tracking-tight [text-wrap:balance]">
            {lang === 'id' ? 'Arsitektur Stack & Standar Kualitas' : 'Full-Stack Disciplines & Craft Standards'}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2">
            {lang === 'id'
              ? 'Penguasaan mendalam atas ekosistem modern dari rekayasa antarmuka performa tinggi, sistem backend terdistribusi, hingga model kecerdasan buatan.'
              : 'Deep domain mastery spanning client-side rendering engines, server-side distributed data pipelines, and intelligent AI models.'}
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Category Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            {PORTFOLIO_DATA.skillCategories.map((category, idx) => {
              const Icon = icons[idx % icons.length];
              const isSelected = activeCategoryIndex === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                    isSelected
                      ? 'bg-white dark:bg-[#0f131d] border-indigo-500/80 shadow-md ring-1 ring-indigo-500/20'
                      : 'bg-white/60 dark:bg-[#0c0e16]/60 border-stone-200 dark:border-stone-800/80 hover:bg-white dark:hover:bg-[#0f131d] hover:border-stone-300 dark:hover:border-stone-700'
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-xl shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-indigo-600 text-white'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-base font-bold font-display ${
                          isSelected
                            ? 'text-indigo-600 dark:text-indigo-400'
                            : 'text-stone-900 dark:text-stone-100'
                        }`}
                      >
                        {category.title[lang]}
                      </h3>
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected
                            ? 'translate-x-1 text-indigo-600 dark:text-indigo-400'
                            : 'text-stone-400'
                        }`}
                      />
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                      {category.description[lang]}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Skills Breakdown */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0f131d] border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-4 mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold font-display text-stone-900 dark:text-white">
                  {currentCategory.title[lang]}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {currentCategory.description[lang]}
                </p>
              </div>
              <span className="text-xs font-mono text-stone-400 dark:text-stone-500 tabular-nums">
                {currentCategory.skills.length} spesialisasi
              </span>
            </div>

            {/* Skill list with experience meter and highlight */}
            <div className="space-y-6">
              {currentCategory.skills.map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-stone-900 dark:text-white font-mono">
                      {skill.name}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400 font-mono">
                      <span>{skill.experienceYears}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums font-semibold text-indigo-600 dark:text-indigo-400">
                        {skill.level}%
                      </span>
                    </div>
                  </div>

                  {/* Level progress bar */}
                  <div className="w-full bg-stone-100 dark:bg-stone-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  {/* Unboxed highlight text */}
                  <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-2">
                    <span className="text-indigo-500">Keahlian spesifik:</span>
                    <span className="text-stone-700 dark:text-stone-300 font-medium">
                      {skill.highlight}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quality Standard Guarantee Note */}
            <div className="mt-8 pt-6 border-t border-stone-100 dark:border-stone-800/80 flex items-start gap-3 text-xs text-stone-500 dark:text-stone-400">
              <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>
                {lang === 'id'
                  ? 'Setiap kode ditulis dengan strict TypeScript, tes integrasi otomatis, arsitektur modular yang dapat dirawat, dan kepatuhan penuh standar aksesibilitas WCAG.'
                  : 'Every codebase adheres to strict TypeScript invariants, automated integration tests, maintainable modular boundaries, and WCAG accessibility compliance.'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
