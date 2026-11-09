import React, { useState } from 'react';
import { Project } from '../data/portfolioData';
import { ArrowUpRight, Sparkles, Filter, ExternalLink, Sliders } from 'lucide-react';
import { ProjectModal } from './ProjectModal';

interface ProjectsSectionProps {
  lang: 'id' | 'en';
  projects: Project[];
  onOpenEditor: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ lang, projects, onOpenEditor }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: lang === 'id' ? 'Semua Karya' : 'All Works' },
    { id: 'web-app', label: lang === 'id' ? 'Web Application' : 'Web Applications' },
    { id: 'ui-ux', label: lang === 'id' ? 'UI/UX & Desain' : 'UI/UX & Systems' },
    { id: 'ai-tech', label: lang === 'id' ? 'AI & Creative Tech' : 'AI & Creative Tech' },
    { id: 'mobile', label: lang === 'id' ? 'Mobile & IoT' : 'Mobile & IoT' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 md:py-28 border-b border-stone-200/80 dark:border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
                01. {lang === 'id' ? 'Portofolio & Studi Kasus' : 'Portfolio & Case Studies'}
              </span>
              <button
                onClick={onOpenEditor}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-stone-500 hover:text-indigo-600 dark:text-stone-400 dark:hover:text-indigo-400 px-2 py-0.5 rounded border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Edit karya atau gambar proyek"
              >
                <Sliders className="w-3 h-3" />
                <span>{lang === 'id' ? 'Edit Gambar & Proyek' : 'Edit Projects'}</span>
              </button>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-stone-900 dark:text-white tracking-tight [text-wrap:balance] mt-2">
              {lang === 'id' ? 'Karya Pilihan & Bukti Rekayasa' : 'Selected Works & Engineering Proof'}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2 max-w-xl">
              {lang === 'id'
                ? 'Koleksi terpilih dari produk digital berskala produksi, platform SaaS, dan eksplorasi antarmuka berkinerja tinggi.'
                : 'A curated selection of production digital products, SaaS platforms, and high-performance interface explorations.'}
            </p>
          </div>

          {/* Interactive Filter Tabs / Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-stone-200/80 dark:bg-stone-900 rounded-lg overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-white shadow-xs font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Bento Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            // First item in 'all' view gets an expansive 2-column feature card
            const isFeaturedHero = index === 0 && selectedCategory === 'all';

            return (
              <div
                key={project.id}
                onClick={() => setActiveProject(project)}
                className={`group cursor-pointer rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0c0f17] hover:border-indigo-400 dark:hover:border-indigo-500/50 transition-all duration-300 flex flex-col justify-between ${
                  isFeaturedHero ? 'md:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Media Container */}
                <div
                  className={`relative overflow-hidden bg-stone-100 dark:bg-stone-900 ${
                    isFeaturedHero ? 'aspect-[16/9] sm:aspect-[21/9]' : 'aspect-[16/10]'
                  }`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top-Right Quick Action Badge */}
                  <div className="absolute top-4 right-4 p-2 bg-stone-900/80 backdrop-blur-md rounded-lg text-white opacity-90 group-hover:opacity-100 group-hover:bg-indigo-600 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>

                  {/* Clean unboxed metadata overlay at bottom of image */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 text-xs font-medium text-stone-200">
                      <span>{project.categoryLabel[lang]}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.year}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.client}</span>
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-display text-stone-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-4 line-clamp-2">
                      {project.tagline[lang]}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80">
                    {/* Unboxed tech stack text */}
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-3 font-mono">
                      {project.stack.slice(0, 4).map((tech, i) => (
                        <React.Fragment key={tech}>
                          <span>{tech}</span>
                          {i < Math.min(project.stack.length, 4) - 1 && (
                            <span aria-hidden="true" className="text-stone-300 dark:text-stone-600">/</span>
                          )}
                        </React.Fragment>
                      ))}
                      {project.stack.length > 4 && (
                        <span>+{project.stack.length - 4}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {project.metrics[lang]}
                      </span>
                      <span className="text-stone-400 dark:text-stone-500 font-medium group-hover:text-stone-900 dark:group-hover:text-white transition-colors">
                        {lang === 'id' ? 'Buka Kasus →' : 'View Study →'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        lang={lang}
      />
    </section>
  );
};
