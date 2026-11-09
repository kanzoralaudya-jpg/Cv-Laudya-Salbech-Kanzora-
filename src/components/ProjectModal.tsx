import React, { useEffect } from 'react';
import { Project } from '../data/portfolioData';
import { X, ExternalLink, Github, CheckCircle2, Calendar, User, BarChart3, Layers } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  lang: 'id' | 'en';
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, lang }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-stone-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-stone-50 dark:bg-[#0c0f17] border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-900/60 backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span>{project.categoryLabel[lang]}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span>{project.client}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
            aria-label="Tutup jendela detail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Header Title & Metrics */}
          <div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl font-bold font-display text-stone-900 dark:text-white mb-2">
              {project.title}
            </h2>
            <p className="text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              {project.tagline[lang]}
            </p>

            {/* Impact Metric Bar */}
            <div className="mt-4 p-4 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div>
                <p className="text-xs uppercase font-semibold tracking-wider text-indigo-700 dark:text-indigo-300">
                  {lang === 'id' ? 'Hasil & Dampak Terukur' : 'Key Measured Impact'}
                </p>
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100 mt-0.5">
                  {project.metrics[lang]}
                </p>
              </div>
            </div>
          </div>

          {/* High-Resolution Project Showcase Image */}
          <div className="rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-900 aspect-video relative group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Detailed Narrative Columns: Problem & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-white dark:bg-[#11141e] border border-stone-200/80 dark:border-stone-800/80">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>{lang === 'id' ? 'Tantangan & Kompleksitas' : 'The Challenge'}</span>
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {project.challenge[lang]}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-[#11141e] border border-stone-200/80 dark:border-stone-800/80">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-white uppercase tracking-wider mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{lang === 'id' ? 'Solusi & Arsitektur' : 'The Solution'}</span>
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                {project.solution[lang]}
              </p>
            </div>
          </div>

          {/* Results Checklist */}
          <div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-white uppercase tracking-wider mb-3">
              {lang === 'id' ? 'Pencapaian Kunci Proyek' : 'Key Deliverables & Milestones'}
            </h3>
            <ul className="space-y-2.5">
              {project.results.map((res, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-stone-600 dark:text-stone-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{res[lang]}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack List (Unboxed metadata, no pill badges) */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
              {lang === 'id' ? 'Teknologi & Perangkat' : 'Technology & Stack'}
            </p>
            <div className="flex flex-wrap items-center gap-2 text-xs text-stone-700 dark:text-stone-300">
              {project.stack.map((item, i) => (
                <React.Fragment key={item}>
                  <span className="font-mono">{item}</span>
                  {i < project.stack.length - 1 && (
                    <span aria-hidden="true" className="text-stone-400 dark:text-stone-600">·</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-white/60 dark:bg-stone-900/60 backdrop-blur-sm shrink-0">
          <div className="text-xs text-stone-500 dark:text-stone-400">
            Client: <span className="font-medium text-stone-700 dark:text-stone-200">{project.client}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white border border-stone-200 dark:border-stone-800 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Repository</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors"
            >
              {lang === 'id' ? 'Tutup Pratinjau' : 'Close Preview'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
