import React, { useEffect } from 'react';
import { PortfolioData } from '../data/portfolioData';
import { X, Download, Printer, CheckCircle2, Award, BookOpen, ExternalLink } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'id' | 'en';
  data: PortfolioData;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, lang, data }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white dark:bg-[#0c0f17] border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400">
            <span>CURRICULUM VITAE</span>
            <span aria-hidden="true">·</span>
            <span>{data.profile.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'id' ? 'Cetak / PDF' : 'Print / Save PDF'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Tutup resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 text-stone-800 dark:text-stone-200 print:text-black">
          {/* Header Lockup */}
          <div className="border-b border-stone-200 dark:border-stone-800 pb-6">
            <h2 id="resume-title" className="text-3xl font-extrabold font-display text-stone-900 dark:text-white">
              {data.profile.name}
            </h2>
            <p className="text-base font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
              {data.profile.role[lang]}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 dark:text-stone-400 mt-3 font-mono">
              <span>{data.profile.email}</span>
              <span aria-hidden="true">·</span>
              <span>{data.profile.location}</span>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-300 mt-4 leading-relaxed">
              {data.profile.bio[lang]}
            </p>

            {/* Riwayat Pendidikan & Tujuan Memilih Program Studi Sistem Informasi */}
            <div className="mt-4 p-4 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                  {lang === 'id' ? 'Riwayat Pendidikan:' : 'Education Background:'}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-white mt-0.5 font-mono">
                  {data.profile.educationHistory?.[lang] || data.profile.educationHistory?.id || 'S1 Sistem Informasi'}
                </p>
              </div>
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-mono">
                  {lang === 'id' ? 'Tujuan Memilih Program Studi Sistem Informasi:' : 'Information Systems Study Objective:'}
                </span>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5 leading-relaxed">
                  {data.profile.studyPurpose?.[lang] || data.profile.studyPurpose?.id || data.profile.bio[lang]}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-stone-200 dark:border-stone-800/80">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500 font-mono">
                    {lang === 'id' ? 'Cita-cita:' : 'Aspirations:'}
                  </span>
                  <p className="text-xs text-stone-700 dark:text-stone-300 mt-0.5">
                    {data.profile.aspirations?.[lang] || data.profile.aspirations?.id}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 font-mono">
                    {lang === 'id' ? 'Pengalaman SMA:' : 'High School Track:'}
                  </span>
                  <p className="text-xs text-stone-700 dark:text-stone-300 mt-0.5">
                    {data.profile.highSchoolExperience?.[lang] || data.profile.highSchoolExperience?.id}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 font-mono">
                    {lang === 'id' ? 'Motivasi:' : 'Motivation:'}
                  </span>
                  <p className="text-xs text-stone-700 dark:text-stone-300 mt-0.5">
                    {data.profile.motivation?.[lang] || data.profile.motivation?.id}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4 font-mono">
              {lang === 'id' ? 'PENGALAMAN KERJA' : 'PROFESSIONAL EXPERIENCE'}
            </h3>
            <div className="space-y-6">
              {data.experiences.map((exp, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="text-base font-bold text-stone-900 dark:text-white">
                      {exp.role[lang]} — <span className="font-semibold text-stone-600 dark:text-stone-300">{exp.company}</span>
                    </h4>
                    <span className="text-xs font-mono text-stone-500 tabular-nums">{exp.period}</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-300">{exp.description[lang]}</p>
                  <ul className="space-y-1 pt-1">
                    {exp.achievements[lang].map((ach, aI) => (
                      <li key={aI} className="text-xs text-stone-600 dark:text-stone-400 flex items-start gap-2">
                        <span className="text-indigo-500 mt-0.5">•</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Awards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-stone-200 dark:border-stone-800">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 font-mono">
                {lang === 'id' ? 'PENDIDIKAN' : 'EDUCATION'}
              </h3>
              <div>
                <p className="text-sm font-bold text-stone-900 dark:text-white">
                  Sarjana Ilmu Komputer (S.Kom)
                </p>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  Institut Teknologi Bandung (ITB) · 2016 — 2020
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Fokus: Software Architecture, Human-Computer Interaction
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 font-mono">
                {lang === 'id' ? 'PENGHARGAAN & PRESTASI' : 'HONORS & AWARDS'}
              </h3>
              <ul className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">★</span>
                  <span>Awwwards Site of the Day &amp; Developer Award (2025)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">★</span>
                  <span>Juara 1 National FinTech Innovation Hackathon (2024)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">★</span>
                  <span>Best UI Architecture - South East Asia Web Summit (2023)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Technical Competencies Summary */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 font-mono">
              {lang === 'id' ? 'KOMPETENSI INTI' : 'CORE TECHNICAL INVENTORY'}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-mono">
              React 19, Next.js, TypeScript, Tailwind CSS v4, Node.js, Express, PostgreSQL, Cloud Run, Gemini Multimodal API, Three.js, Canvas 2D, WCAG 2.2 AAA, Figma Design Tokens, Docker.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
          >
            {lang === 'id' ? 'Tutup Pratinjau' : 'Close Preview'}
          </button>
        </div>
      </div>
    </div>
  );
};
