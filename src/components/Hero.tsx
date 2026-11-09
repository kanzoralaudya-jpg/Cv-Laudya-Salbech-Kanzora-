import React, { useState } from 'react';
import { Profile, StatItem } from '../data/portfolioData';
import {
  ArrowDown,
  FileText,
  Send,
  Sparkles,
  Code2,
  Layers,
  CheckCircle2,
  Sliders,
  Camera,
  GraduationCap,
  Target,
  Compass,
  Award,
  Lightbulb,
} from 'lucide-react';

interface HeroProps {
  lang: 'id' | 'en';
  profile: Profile;
  stats: StatItem[];
  onOpenContact: () => void;
  onOpenResume: () => void;
  onOpenEditor: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  profile,
  stats,
  onOpenContact,
  onOpenResume,
  onOpenEditor,
}) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'code'>('visual');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const aspirationsText = profile.aspirations?.[lang] || profile.aspirations?.id || 'Menjadi Enterprise Systems Architect & Konsultan Transformasi Digital';
  const highSchoolExpText = profile.highSchoolExperience?.[lang] || profile.highSchoolExperience?.id || profile.location;
  const motivationText = profile.motivation?.[lang] || profile.motivation?.id || profile.availabilityText[lang];

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-stone-200/80 dark:border-stone-800/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split-screen layout (Section 2.B) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Clean unboxed kicker with typographic separators */}
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-3">
              <span>Program Studi Sistem Informasi</span>
              <span aria-hidden="true" className="text-stone-400 dark:text-stone-600">/</span>
              <span>Systems Analysis</span>
              <span aria-hidden="true" className="text-stone-400 dark:text-stone-600">/</span>
              <span>Digital Transformation</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-stone-900 dark:text-white leading-[1.08] mb-5 [text-wrap:balance]">
              {profile.headline.prefix[lang]}{' '}
              <span className="text-indigo-600 dark:text-indigo-400">
                {profile.headline.accent[lang]}
              </span>{' '}
              {profile.headline.suffix[lang]}
            </h1>

            {/* Lead Narrative Body */}
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl mb-6">
              {profile.bio[lang]}
            </p>

            {/* Riwayat Pendidikan & Tujuan Memilih Program Studi Sistem Informasi Card */}
            <div className="mb-6 p-5 rounded-2xl bg-white dark:bg-[#0c0f17] border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
              {/* Riwayat Pendidikan */}
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    <GraduationCap className="w-4 h-4 shrink-0" />
                    <span>{lang === 'id' ? 'Riwayat Pendidikan' : 'Educational Background'}</span>
                  </div>
                  <button
                    onClick={onOpenEditor}
                    className="text-[11px] text-stone-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {lang === 'id' ? 'Edit' : 'Edit'}
                  </button>
                </div>
                <p className="text-sm font-semibold text-stone-900 dark:text-white mt-1.5 font-mono">
                  {profile.educationHistory?.[lang] || profile.educationHistory?.id || 'S1 Sistem Informasi'}
                </p>
              </div>

              {/* Tujuan Memilih Program Studi Sistem Informasi */}
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    <Target className="w-4 h-4 shrink-0" />
                    <span>
                      {lang === 'id'
                        ? 'Tujuan Memilih Program Studi Sistem Informasi'
                        : 'Objective for Choosing Information Systems'}
                    </span>
                  </div>
                  <button
                    onClick={onOpenEditor}
                    className="text-[11px] text-stone-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    {lang === 'id' ? 'Edit' : 'Edit'}
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1.5 leading-relaxed">
                  {profile.studyPurpose?.[lang] || profile.studyPurpose?.id || profile.bio[lang]}
                </p>
              </div>
            </div>

            {/* 3 Strips: Cita-cita, Pengalaman Pas SMA, & Motivasi */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
              {/* Cita-cita */}
              <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/25 border border-indigo-100 dark:border-indigo-900/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-400">
                    <Compass className="w-3.5 h-3.5 shrink-0" />
                    <span>{lang === 'id' ? 'Cita-cita' : 'Career Goal'}</span>
                  </div>
                  <p className="text-xs text-stone-800 dark:text-stone-200 mt-1 leading-relaxed">
                    {aspirationsText}
                  </p>
                </div>
              </div>

              {/* Pengalaman Pas SMA */}
              <div className="p-3.5 rounded-xl bg-stone-100/80 dark:bg-[#10141f] border border-stone-200 dark:border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 dark:text-stone-300">
                    <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{lang === 'id' ? 'Pengalaman Pas SMA' : 'High School Track'}</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                    {highSchoolExpText}
                  </p>
                </div>
              </div>

              {/* Motivasi */}
              <div className="p-3.5 rounded-xl bg-stone-100/80 dark:bg-[#10141f] border border-stone-200 dark:border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 dark:text-stone-300">
                    <Lightbulb className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{lang === 'id' ? 'Motivasi' : 'Motivation'}</span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                    {motivationText}
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons cluster */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
              >
                <span>{lang === 'id' ? 'Jelajahi Karya & Proyek' : 'Explore Featured Works'}</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Send className="w-4 h-4 text-indigo-500" />
                <span>{lang === 'id' ? 'Hubungi / Diskusi' : 'Start a Project'}</span>
              </button>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <FileText className="w-4 h-4" />
                <span>{lang === 'id' ? 'Lihat Resume / CV' : 'View Resume'}</span>
              </button>

              <button
                onClick={onOpenEditor}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors whitespace-nowrap shrink-0"
                title="Edit tulisan, gambar, profil"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{lang === 'id' ? 'Edit Tulisan & Gambar' : 'Edit Content'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Container & Interactive Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer framed container */}
              <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-[#0d1017] shadow-xl p-2.5">
                {/* Interactive Mode Switcher at top of card */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-stone-200/80 dark:border-stone-800/80 mb-2">
                  <div className="flex items-center gap-1.5 p-0.5 bg-stone-200/80 dark:bg-stone-800/80 rounded-lg">
                    <button
                      onClick={() => setActiveTab('visual')}
                      className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                        activeTab === 'visual'
                          ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                          : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{lang === 'id' ? 'Profil Studio' : 'Studio Portrait'}</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('code')}
                      className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                        activeTab === 'code'
                          ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs'
                          : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                      }`}
                    >
                      <Code2 className="w-3.5 h-3.5" />
                      <span>{lang === 'id' ? 'Struktur Data SI' : 'System Manifest'}</span>
                    </button>
                  </div>

                  <button
                    onClick={onOpenEditor}
                    className="flex items-center gap-1 text-[11px] font-medium text-stone-500 hover:text-indigo-600 dark:text-stone-400 dark:hover:text-indigo-400 px-2 py-0.5 rounded hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
                  >
                    <Sliders className="w-3 h-3" />
                    <span>{lang === 'id' ? 'Ubah' : 'Edit'}</span>
                  </button>
                </div>

                {/* Content View */}
                {activeTab === 'visual' ? (
                  <div className="relative rounded-xl overflow-hidden aspect-square bg-stone-200 dark:bg-stone-800 group">
                    <img
                      src={profile.avatarImage}
                      alt={`${profile.name} - ${profile.role[lang]}`}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />

                    {/* Quick photo change hover button */}
                    <button
                      onClick={onOpenEditor}
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900/80 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-indigo-600"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{lang === 'id' ? 'Ganti Foto' : 'Change Photo'}</span>
                    </button>

                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-end p-5 text-white">
                      <p className="text-xs uppercase font-semibold tracking-wider text-indigo-300">
                        Program Studi Sistem Informasi
                      </p>
                      <p className="text-base font-bold font-display">{profile.name}</p>
                      <p className="text-xs text-stone-300">
                        {profile.educationHistory?.[lang] || profile.role[lang]}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-xl bg-[#090b10] text-stone-300 p-4 font-mono text-xs overflow-x-auto min-h-[360px] flex flex-col justify-between">
                    <div>
                      <div className="text-stone-500 mb-2">/* Profil Mahasiswa Sistem Informasi */</div>
                      <div>
                        <span className="text-purple-400">export const</span>{' '}
                        <span className="text-blue-400">mahasiswaSI</span> = &#123;
                      </div>
                      <div className="pl-4">
                        <span className="text-indigo-300">nama:</span>{' '}
                        <span className="text-emerald-300">"{profile.name}"</span>,
                      </div>
                      <div className="pl-4">
                        <span className="text-indigo-300">programStudi:</span>{' '}
                        <span className="text-emerald-300">"Sistem Informasi (S1)"</span>,
                      </div>
                      <div className="pl-4">
                        <span className="text-indigo-300">riwayatPendidikan:</span>{' '}
                        <span className="text-amber-300">"{profile.educationHistory?.[lang] || 'S1 Sistem Informasi'}"</span>,
                      </div>
                      <div className="pl-4">
                        <span className="text-indigo-300">citaCita:</span>{' '}
                        <span className="text-emerald-300">"{aspirationsText}"</span>,
                      </div>
                      <div className="pl-4">
                        <span className="text-indigo-300">pengalamanSMA:</span>{' '}
                        <span className="text-emerald-300">"{highSchoolExpText}"</span>,
                      </div>
                      <div className="pl-4">
                        <span className="text-indigo-300">motivasi:</span>{' '}
                        <span className="text-cyan-300">"{motivationText}"</span>,
                      </div>
                      <div className="pl-2">&#125;;</div>
                    </div>

                    <div className="pt-4 border-t border-stone-800 text-stone-400 flex items-center justify-between">
                      <span className="text-[11px]">Status: Mahasiswa Aktif</span>
                      <button
                        onClick={handleCopyEmail}
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                      >
                        {copiedEmail ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>Tersalin!</span>
                          </>
                        ) : (
                          <span>Salin Email Profil</span>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column metric strip below the split (Section 2.B) */}
        <div className="mt-16 pt-8 border-t border-stone-200/80 dark:border-stone-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col group">
              <span className="text-3xl sm:text-4xl font-extrabold font-display text-stone-900 dark:text-white tabular-nums tracking-tight">
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-stone-800 dark:text-stone-200 mt-1">
                {stat.label[lang]}
              </span>
              <span className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                {stat.sub[lang]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
