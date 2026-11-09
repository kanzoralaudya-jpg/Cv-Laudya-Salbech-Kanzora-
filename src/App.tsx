import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA, PortfolioData } from './data/portfolioData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectEstimator } from './components/ProjectEstimator';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { ContentEditorModal } from './components/ContentEditorModal';
import { Sliders, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'kanzora_portfolio_data_v1';

export default function App() {
  const [lang, setLang] = useState<'id' | 'en'>('id');
  const [isDark, setIsDark] = useState<boolean>(true);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [contactInitialMessage, setContactInitialMessage] = useState<string>('');

  // Persistent portfolio state with safe fallback hydration
  const [portfolio, setPortfolio] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.profile && parsed.projects) {
          return {
            ...PORTFOLIO_DATA,
            ...parsed,
            profile: {
              ...PORTFOLIO_DATA.profile,
              ...parsed.profile,
              educationHistory:
                parsed.profile.educationHistory || PORTFOLIO_DATA.profile.educationHistory,
              studyPurpose:
                parsed.profile.studyPurpose || PORTFOLIO_DATA.profile.studyPurpose,
              aspirations:
                parsed.profile.aspirations || PORTFOLIO_DATA.profile.aspirations,
              highSchoolExperience:
                parsed.profile.highSchoolExperience || PORTFOLIO_DATA.profile.highSchoolExperience,
              motivation:
                parsed.profile.motivation || PORTFOLIO_DATA.profile.motivation,
            },
          };
        }
      }
    } catch (e) {
      console.warn('Could not read saved portfolio from storage:', e);
    }
    return PORTFOLIO_DATA;
  });

  // Synchronize dark mode class with HTML document element
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const handleSaveData = (newData: PortfolioData) => {
    setPortfolio(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.warn('Could not persist portfolio to storage:', e);
    }
  };

  const handleResetData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Could not reset storage:', e);
    }
    setPortfolio(PORTFOLIO_DATA);
  };

  const handleOpenContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleUseEstimate = (brief: string) => {
    setContactInitialMessage(brief);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#07090e] text-stone-900 dark:text-stone-100 transition-colors duration-300 relative">
      {/* Navigation Header */}
      <Header
        lang={lang}
        setLang={setLang}
        isDark={isDark}
        setIsDark={setIsDark}
        onOpenContact={handleOpenContact}
        onOpenEditor={() => setIsEditorOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          lang={lang}
          profile={portfolio.profile}
          stats={portfolio.stats}
          onOpenContact={handleOpenContact}
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenEditor={() => setIsEditorOpen(true)}
        />

        {/* Selected Projects / Case Studies */}
        <ProjectsSection
          lang={lang}
          projects={portfolio.projects}
          onOpenEditor={() => setIsEditorOpen(true)}
        />

        {/* Capabilities & Skills Matrix */}
        <SkillsSection lang={lang} />

        {/* Career Experience & Leadership */}
        <ExperienceSection lang={lang} />

        {/* Interactive Scope & Cost Estimator */}
        <ProjectEstimator
          lang={lang}
          onUseEstimate={handleUseEstimate}
        />

        {/* Philosophy & Testimonials */}
        <AboutSection lang={lang} />

        {/* Contact & Consultation Form */}
        <ContactSection
          lang={lang}
          profile={portfolio.profile}
          initialMessage={contactInitialMessage}
        />
      </main>

      {/* Footer */}
      <Footer
        lang={lang}
        profile={portfolio.profile}
      />

      {/* Floating Quick Customize / Edit Button */}
      <button
        onClick={() => setIsEditorOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-full shadow-lg hover:shadow-indigo-500/25 transition-all duration-200 hover:scale-105 group"
        title={lang === 'id' ? 'Edit gambar, foto, teks dan karya portofolio' : 'Customize photos, texts and projects'}
      >
        <Sliders className="w-4 h-4 text-white group-hover:rotate-45 transition-transform" />
        <span>{lang === 'id' ? 'Edit Gambar & Tulisan' : 'Customize Content'}</span>
      </button>

      {/* Resume / CV Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        lang={lang}
        data={portfolio}
      />

      {/* Live Content & Media Studio Modal */}
      <ContentEditorModal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        data={portfolio}
        onSave={handleSaveData}
        onReset={handleResetData}
        lang={lang}
      />
    </div>
  );
}
