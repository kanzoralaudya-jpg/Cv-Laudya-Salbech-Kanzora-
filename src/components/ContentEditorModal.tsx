import React, { useState, useRef } from 'react';
import { PortfolioData, Project, ProjectCategory } from '../data/portfolioData';
import {
  X,
  Upload,
  Image as ImageIcon,
  User,
  FolderGit2,
  BarChart2,
  Share2,
  RotateCcw,
  Download,
  FileUp,
  Check,
  Plus,
  Trash2,
  Sparkles,
  GraduationCap,
  Target,
  Compass,
  Award,
  Lightbulb,
} from 'lucide-react';

interface ContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (newData: PortfolioData) => void;
  onReset: () => void;
  lang: 'id' | 'en';
}

export const ContentEditorModal: React.FC<ContentEditorModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onReset,
  lang,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'stats' | 'contact' | 'backup'>('profile');
  const [formData, setFormData] = useState<PortfolioData>(data);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(data.projects[0]?.id || '');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const projectFileInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveAndApply = (updatedData: PortfolioData) => {
    setFormData(updatedData);
    onSave(updatedData);
    showToast(lang === 'id' ? 'Perubahan berhasil disimpan & diterapkan!' : 'Changes successfully saved & applied!');
  };

  // Image Upload helper using FileReader
  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const updated = {
            ...formData,
            profile: { ...formData.profile, avatarImage: reader.result },
          };
          handleSaveAndApply(updated);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProjectImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          const updatedProjects = formData.projects.map((p) =>
            p.id === selectedProjectId ? { ...p, image: reader.result as string } : p
          );
          const updated = { ...formData, projects: updatedProjects };
          handleSaveAndApply(updated);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // JSON Export & Import
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `kanzora_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parsed = JSON.parse(reader.result as string);
          if (parsed.profile && parsed.projects) {
            handleSaveAndApply(parsed);
            showToast(lang === 'id' ? 'File konfigurasi berhasil diimpor!' : 'Configuration file imported successfully!');
          }
        } catch (err) {
          showToast(lang === 'id' ? 'Format file JSON tidak valid!' : 'Invalid JSON file format!');
        }
      };
      reader.readAsText(file);
    }
  };

  const currentProject = formData.projects.find((p) => p.id === selectedProjectId) || formData.projects[0];

  const handleAddProject = () => {
    const newId = `project-${Date.now()}`;
    const newProj: Project = {
      id: newId,
      title: 'Proyek Baru',
      tagline: {
        id: 'Deskripsi singkat inovasi produk digital baru.',
        en: 'Short description of the new digital product innovation.',
      },
      category: 'web-app',
      categoryLabel: { id: 'Web App', en: 'Web App' },
      year: new Date().getFullYear().toString(),
      client: 'Klien Kustom',
      image: '/src/assets/images/project_fintech_dashboard_1794191453723.jpg',
      metrics: {
        id: '+150% efisiensi sistem',
        en: '+150% system efficiency',
      },
      overview: {
        id: 'Gambaran lengkap proyek baru.',
        en: 'Complete overview of the new project.',
      },
      challenge: {
        id: 'Tantangan teknis yang dihadapi.',
        en: 'Technical complexity tackled.',
      },
      solution: {
        id: 'Arsitektur solusi yang diterapkan.',
        en: 'Engineering solution deployed.',
      },
      results: [
        { id: 'Rilis tepat waktu dengan performa 99/100.', en: 'Shipped on schedule with 99/100 score.' },
      ],
      stack: ['React', 'TypeScript', 'Tailwind CSS'],
      featured: false,
    };

    const updated = {
      ...formData,
      projects: [newProj, ...formData.projects],
    };
    setSelectedProjectId(newId);
    handleSaveAndApply(updated);
  };

  const handleDeleteProject = (pId: string) => {
    if (formData.projects.length <= 1) {
      showToast(lang === 'id' ? 'Minimal harus ada satu proyek!' : 'At least one project is required!');
      return;
    }
    const updatedProjects = formData.projects.filter((p) => p.id !== pId);
    const updated = { ...formData, projects: updatedProjects };
    setSelectedProjectId(updatedProjects[0].id);
    handleSaveAndApply(updated);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="editor-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-950/75 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white dark:bg-[#0c0f17] border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-600 text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 id="editor-title" className="text-base font-bold font-display text-stone-900 dark:text-white">
                {lang === 'id' ? 'Editor Konten, Gambar & Tulisan' : 'Content, Media & Text Studio'}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {lang === 'id'
                  ? 'Ubah foto, nama, deskripsi proyek, metrik, dan kontak langsung'
                  : 'Customize portraits, mockups, project narratives, and contact details'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {toastMessage && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                <Check className="w-3.5 h-3.5" />
                {toastMessage}
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
              aria-label="Tutup editor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 px-6 pt-3 border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 overflow-x-auto shrink-0">
          {[
            { id: 'profile', label: lang === 'id' ? 'Foto & Profil' : 'Profile & Bio', icon: User },
            { id: 'projects', label: lang === 'id' ? 'Karya & Gambar' : 'Projects & Media', icon: FolderGit2 },
            { id: 'stats', label: lang === 'id' ? 'Angka Metrik' : 'Metrics & Stats', icon: BarChart2 },
            { id: 'contact', label: lang === 'id' ? 'Kontak & Tautan' : 'Contacts & Links', icon: Share2 },
            { id: 'backup', label: lang === 'id' ? 'Cadangan / Reset' : 'Backup & Reset', icon: RotateCcw },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap border-b-2 ${
                  isActive
                    ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-[#0c0f17]'
                    : 'border-transparent text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Editor Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
          {/* TAB 1: PROFILE & BIO */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              {/* Profile Image & Upload Section */}
              <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-[#121622]/70 space-y-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {lang === 'id' ? 'Foto Profil Utama' : 'Main Profile Portrait'}
                </label>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-indigo-500/40 bg-stone-200 dark:bg-stone-800 shrink-0">
                    <img
                      src={formData.profile.avatarImage}
                      alt={formData.profile.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="space-y-2 flex-1">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleProfileImageUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-xs transition-colors"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{lang === 'id' ? 'Unggah Foto dari Perangkat' : 'Upload From Device'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          const updated = {
                            ...formData,
                            profile: {
                              ...formData.profile,
                              avatarImage: '/src/assets/images/portfolio_hero_portrait_1794191452798.jpg',
                            },
                          };
                          handleSaveAndApply(updated);
                        }}
                        className="px-3 py-2 text-xs font-medium text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                      >
                        {lang === 'id' ? 'Gunakan Foto Studio Default' : 'Reset to Default Studio Portrait'}
                      </button>
                    </div>

                    <div className="pt-2">
                      <label className="block text-[11px] text-stone-500 dark:text-stone-400 mb-1">
                        {lang === 'id' ? 'Atau masukkan tautan / URL foto langsung:' : 'Or enter direct image URL:'}
                      </label>
                      <input
                        type="text"
                        value={formData.profile.avatarImage}
                        onChange={(e) => {
                          const updated = {
                            ...formData,
                            profile: { ...formData.profile, avatarImage: e.target.value },
                          };
                          handleSaveAndApply(updated);
                        }}
                        placeholder="https://example.com/my-photo.jpg"
                        className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0a0d14] text-xs font-mono text-stone-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Riwayat Pendidikan & Tujuan Memilih Program Studi Sistem Informasi */}
              <div className="space-y-4 p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-[#121622]/70">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1.5 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" />
                    <span>{lang === 'id' ? 'Riwayat Pendidikan' : 'Educational Background'}</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.profile.educationHistory?.id || ''}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        profile: {
                          ...formData.profile,
                          educationHistory: { id: e.target.value, en: e.target.value },
                        },
                      };
                      handleSaveAndApply(updated);
                    }}
                    placeholder={
                      lang === 'id'
                        ? 'Contoh: S1 Sistem Informasi (2024 — Sekarang) · SMA Jurusan IPA (Lulus 2024)'
                        : 'e.g. Bachelor of Information Systems (2024 — Present) · High School Science'
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0a0d14] text-sm text-stone-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1.5 flex items-center gap-1.5">
                    <Target className="w-4 h-4" />
                    <span>
                      {lang === 'id'
                        ? 'Tujuan Memilih Program Studi Sistem Informasi'
                        : 'Objective for Choosing Information Systems'}
                    </span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.profile.studyPurpose?.id || ''}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        profile: {
                          ...formData.profile,
                          studyPurpose: { id: e.target.value, en: e.target.value },
                          role: {
                            id: 'Mahasiswa Sistem Informasi',
                            en: 'Information Systems Student',
                          },
                        },
                      };
                      handleSaveAndApply(updated);
                    }}
                    placeholder={
                      lang === 'id'
                        ? 'Jelaskan alasan dan tujuan Anda memilih Program Studi Sistem Informasi...'
                        : 'Describe your vision and purpose for pursuing Information Systems...'
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0a0d14] text-sm text-stone-900 dark:text-white leading-relaxed"
                  />
                </div>

                <div className="pt-2 border-t border-stone-200 dark:border-stone-800/80">
                  <label className="block text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1.5 flex items-center gap-1.5">
                    <Compass className="w-4 h-4" />
                    <span>{lang === 'id' ? 'Cita-cita' : 'Career Aspirations'}</span>
                  </label>
                  <textarea
                    rows={2}
                    value={formData.profile.aspirations?.id || ''}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        profile: {
                          ...formData.profile,
                          aspirations: { id: e.target.value, en: e.target.value },
                        },
                      };
                      handleSaveAndApply(updated);
                    }}
                    placeholder={
                      lang === 'id'
                        ? 'Contoh: Menjadi Enterprise Systems Architect & Konsultan Transformasi Digital'
                        : 'e.g. To become an Enterprise Systems Architect & Digital Consultant'
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0a0d14] text-sm text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Hero Headline */}
              <div className="space-y-3 p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-[#10141f]/50">
                <label className="block text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {lang === 'id' ? 'Judul Utama Hero (Headline)' : 'Main Hero Headline'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="block text-[11px] text-stone-500 mb-1">Teks Awal (Prefix):</span>
                    <input
                      type="text"
                      value={formData.profile.headline.prefix.id}
                      onChange={(e) => {
                        const updated = {
                          ...formData,
                          profile: {
                            ...formData.profile,
                            headline: {
                              ...formData.profile.headline,
                              prefix: { id: e.target.value, en: e.target.value },
                            },
                          },
                        };
                        handleSaveAndApply(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121622] text-xs text-stone-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] text-stone-500 mb-1">Teks Aksen Berwarna (Accent):</span>
                    <input
                      type="text"
                      value={formData.profile.headline.accent.id}
                      onChange={(e) => {
                        const updated = {
                          ...formData,
                          profile: {
                            ...formData.profile,
                            headline: {
                              ...formData.profile.headline,
                              accent: { id: e.target.value, en: e.target.value },
                            },
                          },
                        };
                        handleSaveAndApply(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121622] text-xs text-indigo-600 dark:text-indigo-400 font-semibold"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] text-stone-500 mb-1">Teks Akhir (Suffix):</span>
                    <input
                      type="text"
                      value={formData.profile.headline.suffix.id}
                      onChange={(e) => {
                        const updated = {
                          ...formData,
                          profile: {
                            ...formData.profile,
                            headline: {
                              ...formData.profile.headline,
                              suffix: { id: e.target.value, en: e.target.value },
                            },
                          },
                        };
                        handleSaveAndApply(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121622] text-xs text-stone-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Bio Narratives */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  {lang === 'id' ? 'Deskripsi Bio / Ringkasan Naratif (Bahasa Indonesia)' : 'Bio Summary (Indonesian)'}
                </label>
                <textarea
                  rows={3}
                  value={formData.profile.bio.id}
                  onChange={(e) => {
                    const updated = {
                      ...formData,
                      profile: {
                        ...formData.profile,
                        bio: { ...formData.profile.bio, id: e.target.value },
                      },
                    };
                    handleSaveAndApply(updated);
                  }}
                  className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121622] text-sm text-stone-900 dark:text-white"
                />
              </div>

              {/* Pengalaman Pas SMA & Motivasi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1.5 flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>{lang === 'id' ? 'Pengalaman Pas SMA' : 'High School Experience'}</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.profile.highSchoolExperience?.id || ''}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        profile: {
                          ...formData.profile,
                          highSchoolExperience: { id: e.target.value, en: e.target.value },
                          location: e.target.value,
                        },
                      };
                      handleSaveAndApply(updated);
                    }}
                    placeholder={
                      lang === 'id'
                        ? 'Contoh: Ketua Divisi IT OSIS, Juara Lomba Web Design, Pengurus Ekskul Komputer & Robotika...'
                        : 'e.g. Head of IT Club in High School, Web Design contest winner, Robotics member...'
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0a0d14] text-xs text-stone-900 dark:text-white leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1.5 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" />
                    <span>{lang === 'id' ? 'Motivasi' : 'Personal Motivation'}</span>
                  </label>
                  <textarea
                    rows={3}
                    value={formData.profile.motivation?.id || ''}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        profile: {
                          ...formData.profile,
                          motivation: { id: e.target.value, en: e.target.value },
                          availabilityText: { id: e.target.value, en: e.target.value },
                        },
                      };
                      handleSaveAndApply(updated);
                    }}
                    placeholder={
                      lang === 'id'
                        ? 'Contoh: Terdorong oleh rasa ingin tahu tinggi untuk terus belajar dan menciptakan solusi nyata bagi masyarakat...'
                        : 'e.g. Driven to continuously innovate and create impactful digital solutions...'
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0a0d14] text-xs text-stone-900 dark:text-white leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS & MEDIA */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Project Selector Bar */}
              <div className="flex items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-4">
                <div className="flex items-center gap-2 overflow-x-auto max-w-full">
                  {formData.projects.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProjectId(p.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                        selectedProjectId === p.id
                          ? 'bg-indigo-600 text-white font-semibold'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                      }`}
                    >
                      {p.title}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleAddProject}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900 transition-colors whitespace-nowrap shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'id' ? 'Tambah Proyek' : 'Add Project'}</span>
                </button>
              </div>

              {currentProject && (
                <div className="space-y-5">
                  {/* Image Edit & Upload for Selected Project */}
                  <div className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-[#121622]/70 space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {lang === 'id' ? 'Gambar Mockup Proyek' : 'Project Showcase Image'}
                    </label>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-40 aspect-video rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-900 shrink-0">
                        <img
                          src={currentProject.image}
                          alt={currentProject.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-2 flex-1">
                        <input
                          type="file"
                          ref={projectFileInputRef}
                          onChange={handleProjectImageUpload}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => projectFileInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-xs transition-colors"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{lang === 'id' ? 'Unggah Gambar Mockup Baru' : 'Upload New Mockup Image'}</span>
                        </button>

                        <div className="pt-1">
                          <label className="block text-[11px] text-stone-500 dark:text-stone-400 mb-1">
                            {lang === 'id' ? 'Atau tautan URL gambar:' : 'Or image URL link:'}
                          </label>
                          <input
                            type="text"
                            value={currentProject.image}
                            onChange={(e) => {
                              const updatedProjects = formData.projects.map((p) =>
                                p.id === currentProject.id ? { ...p, image: e.target.value } : p
                              );
                              handleSaveAndApply({ ...formData, projects: updatedProjects });
                            }}
                            className="w-full px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0a0d14] text-xs font-mono text-stone-900 dark:text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Title & Category & Client */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                        {lang === 'id' ? 'Judul Proyek' : 'Project Title'}
                      </label>
                      <input
                        type="text"
                        value={currentProject.title}
                        onChange={(e) => {
                          const updatedProjects = formData.projects.map((p) =>
                            p.id === currentProject.id ? { ...p, title: e.target.value } : p
                          );
                          handleSaveAndApply({ ...formData, projects: updatedProjects });
                        }}
                        className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121622] text-sm text-stone-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                        {lang === 'id' ? 'Kategori' : 'Category'}
                      </label>
                      <select
                        value={currentProject.category}
                        onChange={(e) => {
                          const val = e.target.value as ProjectCategory;
                          const labels: Record<ProjectCategory, string> = {
                            'web-app': 'Web Application',
                            'ui-ux': 'UI/UX & Desain',
                            'ai-tech': 'AI & Creative Tech',
                            'mobile': 'Mobile & IoT',
                          };
                          const updatedProjects = formData.projects.map((p) =>
                            p.id === currentProject.id
                              ? {
                                  ...p,
                                  category: val,
                                  categoryLabel: { id: labels[val], en: labels[val] },
                                }
                              : p
                          );
                          handleSaveAndApply({ ...formData, projects: updatedProjects });
                        }}
                        className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121622] text-sm text-stone-900 dark:text-white"
                      >
                        <option value="web-app">Web Application</option>
                        <option value="ui-ux">UI/UX & Desain</option>
                        <option value="ai-tech">AI & Creative Tech</option>
                        <option value="mobile">Mobile & IoT</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                        {lang === 'id' ? 'Klien / Perusahaan' : 'Client / Org'}
                      </label>
                      <input
                        type="text"
                        value={currentProject.client}
                        onChange={(e) => {
                          const updatedProjects = formData.projects.map((p) =>
                            p.id === currentProject.id ? { ...p, client: e.target.value } : p
                          );
                          handleSaveAndApply({ ...formData, projects: updatedProjects });
                        }}
                        className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121622] text-sm text-stone-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Tagline & Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                        {lang === 'id' ? 'Tagline / Deskripsi Singkat' : 'Tagline'}
                      </label>
                      <input
                        type="text"
                        value={currentProject.tagline.id}
                        onChange={(e) => {
                          const updatedProjects = formData.projects.map((p) =>
                            p.id === currentProject.id
                              ? {
                                  ...p,
                                  tagline: { id: e.target.value, en: e.target.value },
                                }
                              : p
                          );
                          handleSaveAndApply({ ...formData, projects: updatedProjects });
                        }}
                        className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121622] text-sm text-stone-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                        {lang === 'id' ? 'Metrik Dampak Terukur' : 'Key Measured Impact'}
                      </label>
                      <input
                        type="text"
                        value={currentProject.metrics.id}
                        onChange={(e) => {
                          const updatedProjects = formData.projects.map((p) =>
                            p.id === currentProject.id
                              ? {
                                  ...p,
                                  metrics: { id: e.target.value, en: e.target.value },
                                }
                              : p
                          );
                          handleSaveAndApply({ ...formData, projects: updatedProjects });
                        }}
                        placeholder="+320% kecepatan kueri"
                        className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121622] text-sm text-indigo-600 dark:text-indigo-400 font-semibold"
                      />
                    </div>
                  </div>

                  {/* Tech Stack Tags */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                      {lang === 'id' ? 'Daftar Teknologi (Pisahkan dengan koma)' : 'Tech Stack (Comma-separated)'}
                    </label>
                    <input
                      type="text"
                      value={currentProject.stack.join(', ')}
                      onChange={(e) => {
                        const tags = e.target.value.split(',').map((t) => t.trim()).filter(Boolean);
                        const updatedProjects = formData.projects.map((p) =>
                          p.id === currentProject.id ? { ...p, stack: tags } : p
                        );
                        handleSaveAndApply({ ...formData, projects: updatedProjects });
                      }}
                      className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121622] text-xs font-mono text-stone-900 dark:text-white"
                    />
                  </div>

                  {/* Delete project button */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(currentProject.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{lang === 'id' ? 'Hapus Proyek Ini' : 'Delete Project'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: STATS & METRICS */}
          {activeTab === 'stats' && (
            <div className="space-y-4">
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {lang === 'id'
                  ? 'Sesuaikan angka-angka metrik pembuktian yang tampil di bawah Hero Section:'
                  : 'Customize the 4 proof metrics shown beneath the Hero section:'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formData.stats.map((stat, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-[#10141f]/50 space-y-2"
                  >
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-500">
                      Metrik #{sIdx + 1}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => {
                          const updatedStats = [...formData.stats];
                          updatedStats[sIdx] = { ...updatedStats[sIdx], value: e.target.value };
                          handleSaveAndApply({ ...formData, stats: updatedStats });
                        }}
                        className="w-24 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121622] text-sm font-bold font-mono text-stone-900 dark:text-white"
                        placeholder="48+"
                      />
                      <input
                        type="text"
                        value={stat.label.id}
                        onChange={(e) => {
                          const updatedStats = [...formData.stats];
                          updatedStats[sIdx] = {
                            ...updatedStats[sIdx],
                            label: { id: e.target.value, en: e.target.value },
                          };
                          handleSaveAndApply({ ...formData, stats: updatedStats });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121622] text-xs text-stone-900 dark:text-white"
                        placeholder="Proyek Terselesaikan"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CONTACT & LINKS */}
          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Email Kontak Resmi
                  </label>
                  <input
                    type="email"
                    value={formData.profile.email}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        profile: { ...formData.profile, email: e.target.value },
                      };
                      handleSaveAndApply(updated);
                    }}
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121622] text-sm text-stone-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Nomor / Link WhatsApp
                  </label>
                  <input
                    type="text"
                    value={formData.profile.whatsapp}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        profile: { ...formData.profile, whatsapp: e.target.value },
                      };
                      handleSaveAndApply(updated);
                    }}
                    placeholder="https://wa.me/6281234567890"
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121622] text-sm text-stone-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Tautan GitHub
                  </label>
                  <input
                    type="text"
                    value={formData.profile.github}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        profile: { ...formData.profile, github: e.target.value },
                      };
                      handleSaveAndApply(updated);
                    }}
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121622] text-sm text-stone-900 dark:text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Tautan LinkedIn
                  </label>
                  <input
                    type="text"
                    value={formData.profile.linkedin}
                    onChange={(e) => {
                      const updated = {
                        ...formData,
                        profile: { ...formData.profile, linkedin: e.target.value },
                      };
                      handleSaveAndApply(updated);
                    }}
                    className="w-full px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121622] text-sm text-stone-900 dark:text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BACKUP & RESET */}
          {activeTab === 'backup' && (
            <div className="space-y-6">
              <div className="p-5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-[#121622]/70 space-y-3">
                <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                  {lang === 'id' ? 'Ekspor & Impor Data Cadangan' : 'Export & Import Portfolio Data'}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  {lang === 'id'
                    ? 'Simpan seluruh modifikasi portofolio Anda ke file JSON atau pulihkan data sebelumnya dengan mudah.'
                    : 'Download your customized portfolio settings as a JSON file or restore a previous configuration.'}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={handleExportJSON}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{lang === 'id' ? 'Unduh File Cadangan (JSON)' : 'Download JSON Backup'}</span>
                  </button>

                  <input
                    type="file"
                    ref={jsonInputRef}
                    onChange={handleImportJSON}
                    accept=".json"
                    className="hidden"
                  />
                  <button
                    onClick={() => jsonInputRef.current?.click()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
                  >
                    <FileUp className="w-3.5 h-3.5" />
                    <span>{lang === 'id' ? 'Unggah / Pulihkan File JSON' : 'Import JSON File'}</span>
                  </button>
                </div>
              </div>

              {/* Reset to Factory Default */}
              <div className="p-5 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/20 space-y-3">
                <h4 className="text-sm font-bold text-rose-900 dark:text-rose-300">
                  {lang === 'id' ? 'Kembalikan ke Pengaturan Bawaan Awal' : 'Reset to Default Template'}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  {lang === 'id'
                    ? 'Menghapus seluruh perubahan kustom dari penyimpanan peramban (localStorage) dan mengembalikan portofolio ke data asli Kanzora Laudya.'
                    : 'Clear all custom browser edits and revert to the original pristine portfolio data.'}
                </p>

                <button
                  onClick={() => {
                    if (window.confirm(lang === 'id' ? 'Yakin ingin mereset seluruh data portofolio ke bawaan?' : 'Reset all portfolio data to default?')) {
                      onReset();
                      onClose();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'id' ? 'Reset ke Data Awal' : 'Reset All to Default'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 shrink-0">
          <span className="text-xs text-stone-500">
            {lang === 'id' ? 'Tersimpan otomatis di peramban Anda' : 'Saved automatically in local browser'}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
            >
              {lang === 'id' ? 'Selesai & Lihat Portofolio' : 'Done & View Portfolio'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
