import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface ProjectEstimatorProps {
  lang: 'id' | 'en';
  onUseEstimate: (brief: string) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({ lang, onUseEstimate }) => {
  const [projectType, setProjectType] = useState<'webapp' | 'landing' | 'mobile' | 'design-system'>('webapp');
  const [features, setFeatures] = useState<string[]>(['auth', 'analytics']);
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'express'>('standard');

  const projectTypes = [
    {
      id: 'webapp',
      name: { id: 'Web Application / SaaS', en: 'Web Application / SaaS' },
      baseDays: 20,
      basePriceIdr: 25000000,
      basePriceUsd: 1800,
      desc: { id: 'Aplikasi full-stack dengan database & logika bisnis', en: 'Full-stack application with DB & core business logic' },
    },
    {
      id: 'landing',
      name: { id: 'Landing Page & Brand Editorial', en: 'Landing Page & Brand Editorial' },
      baseDays: 10,
      basePriceIdr: 12000000,
      basePriceUsd: 850,
      desc: { id: 'Desain konversi tinggi, interaktif & animasi halus', en: 'High-conversion design, fluid physics & typography' },
    },
    {
      id: 'mobile',
      name: { id: 'Mobile Web App / PWA', en: 'Mobile Web App / PWA' },
      baseDays: 18,
      basePriceIdr: 22000000,
      basePriceUsd: 1500,
      desc: { id: 'Pengalaman mobile offline-first dengan app-like feel', en: 'Offline-first mobile PWA with app-store quality touch' },
    },
    {
      id: 'design-system',
      name: { id: 'Design System & Token Library', en: 'Design System & Token Library' },
      baseDays: 14,
      basePriceIdr: 16000000,
      basePriceUsd: 1100,
      desc: { id: 'Komponen modular, WCAG AAA, dan dokumentasi', en: 'Modular accessible components & semantic tokens' },
    },
  ];

  const availableFeatures = [
    { id: 'auth', name: { id: 'Autentikasi & Multi-Role (RBAC)', en: 'Authentication & RBAC' }, days: 4, idr: 4500000, usd: 300 },
    { id: 'payment', name: { id: 'Payment Gateway (Midtrans/Stripe)', en: 'Payment Gateway (Stripe/Midtrans)' }, days: 4, idr: 5000000, usd: 350 },
    { id: 'analytics', name: { id: 'Dashboard & Visualisasi Data Real-Time', en: 'Real-Time Analytics & Charts' }, days: 5, idr: 6000000, usd: 420 },
    { id: 'ai', name: { id: 'Integrasi AI Generatif (Gemini API)', en: 'Generative AI Integration (Gemini)' }, days: 5, idr: 7000000, usd: 500 },
    { id: 'cms', name: { id: 'Headless CMS / Panel Konten Kustom', en: 'Headless CMS & Content Engine' }, days: 4, idr: 5000000, usd: 350 },
    { id: 'i18n', name: { id: 'Dukungan Multi-Bahasa Dinamis (i18n)', en: 'Dynamic Multi-Language (i18n)' }, days: 2, idr: 2500000, usd: 180 },
  ];

  const toggleFeature = (fId: string) => {
    setFeatures((prev) =>
      prev.includes(fId) ? prev.filter((item) => item !== fId) : [...prev, fId]
    );
  };

  const currentType = projectTypes.find((p) => p.id === projectType)!;

  let totalDays = currentType.baseDays;
  let totalPriceIdr = currentType.basePriceIdr;
  let totalPriceUsd = currentType.basePriceUsd;

  features.forEach((fId) => {
    const f = availableFeatures.find((item) => item.id === fId);
    if (f) {
      totalDays += f.days;
      totalPriceIdr += f.idr;
      totalPriceUsd += f.usd;
    }
  });

  if (timelineSpeed === 'express') {
    totalDays = Math.max(7, Math.round(totalDays * 0.65));
    totalPriceIdr = Math.round(totalPriceIdr * 1.25);
    totalPriceUsd = Math.round(totalPriceUsd * 1.25);
  }

  const weeksEstimate = Math.ceil(totalDays / 5);

  const handleSendToContact = () => {
    const selectedFeatureNames = features
      .map((fId) => availableFeatures.find((f) => f.id === fId)?.name[lang])
      .filter(Boolean)
      .join(', ');

    const briefText = `${lang === 'id' ? 'Estimasi Proyek' : 'Project Scope'}: ${currentType.name[lang]}\n${
      lang === 'id' ? 'Fitur Terpilih' : 'Selected Features'
    }: ${selectedFeatureNames || 'Dasar'}\n${
      lang === 'id' ? 'Kecepatan' : 'Timeline Mode'
    }: ${timelineSpeed === 'express' ? 'Express Priority' : 'Standard'}\n${
      lang === 'id' ? 'Estimasi Waktu' : 'Estimated Duration'
    }: ~${weeksEstimate} ${lang === 'id' ? 'minggu' : 'weeks'} (${totalDays} ${lang === 'id' ? 'hari kerja' : 'workdays'})\n${
      lang === 'id' ? 'Estimasi Investasi' : 'Estimated Investment'
    }: Rp ${totalPriceIdr.toLocaleString('id-ID')} / ~$${totalPriceUsd.toLocaleString('en-US')}`;

    onUseEstimate(briefText);
  };

  return (
    <section id="estimator" className="py-20 md:py-28 border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-100/40 dark:bg-[#080a10]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-2">
            04. {lang === 'id' ? 'Kalkulator Estimasi Proyek' : 'Interactive Scope & Cost Estimator'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-stone-900 dark:text-white tracking-tight [text-wrap:balance]">
            {lang === 'id' ? 'Transparansi Lingkup Kerja & Waktu Rilis' : 'Transparent Timelines & Scope Estimation'}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-2">
            {lang === 'id'
              ? 'Rencanakan proyek digital Anda secara transparan. Pilih jenis produk, kapabilitas teknis yang dibutuhkan, dan dapatkan gambaran waktu pengerjaan yang akurat.'
              : 'Calculate your digital product scope with transparent criteria. Choose product archetype, technical capabilities, and receive immediate timeline estimates.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Configuration */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Project Archetype */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
                1. {lang === 'id' ? 'Pilih Jenis Produk' : 'Select Product Archetype'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {projectTypes.map((type) => {
                  const isSelected = projectType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setProjectType(type.id as any)}
                      className={`text-left p-4 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-white dark:bg-[#111420] border-indigo-500 shadow-sm ring-1 ring-indigo-500/20'
                          : 'bg-white/70 dark:bg-[#0c0f17]/70 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-bold font-display ${isSelected ? 'text-indigo-600 dark:text-indigo-400' : 'text-stone-900 dark:text-white'}`}>
                          {type.name[lang]}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />}
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {type.desc[lang]}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Capabilities & Features */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
                2. {lang === 'id' ? 'Pilih Fitur & Kapabilitas' : 'Select Key Features & Add-ons'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {availableFeatures.map((feat) => {
                  const isChecked = features.includes(feat.id);
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`text-left p-3 rounded-lg border transition-all flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-indigo-50/80 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-800 text-stone-900 dark:text-white'
                          : 'bg-white/60 dark:bg-[#0c0f17]/60 border-stone-200 dark:border-stone-800/80 text-stone-600 dark:text-stone-300 hover:border-stone-300'
                      }`}
                    >
                      <span className="text-xs font-medium">{feat.name[lang]}</span>
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isChecked
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'border-stone-300 dark:border-stone-700'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Delivery Speed */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3">
                3. {lang === 'id' ? 'Prioritas Jadwal Rilis' : 'Delivery Timeline Preference'}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setTimelineSpeed('standard')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    timelineSpeed === 'standard'
                      ? 'bg-white dark:bg-[#111420] border-indigo-500 ring-1 ring-indigo-500/20'
                      : 'bg-white/70 dark:bg-[#0c0f17]/70 border-stone-200 dark:border-stone-800'
                  }`}
                >
                  <p className="text-xs font-bold text-stone-900 dark:text-white">
                    {lang === 'id' ? 'Standar Terjadwal' : 'Standard Sprint'}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {lang === 'id' ? 'Ritme optimal dengan QA berkala' : 'Optimal cadence with phased QA'}
                  </p>
                </button>

                <button
                  onClick={() => setTimelineSpeed('express')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    timelineSpeed === 'express'
                      ? 'bg-white dark:bg-[#111420] border-indigo-500 ring-1 ring-indigo-500/20'
                      : 'bg-white/70 dark:bg-[#0c0f17]/70 border-stone-200 dark:border-stone-800'
                  }`}
                >
                  <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    <span>{lang === 'id' ? 'Express Fast-Track' : 'Express Fast-Track'}</span>
                    <Sparkles className="w-3 h-3" />
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                    {lang === 'id' ? 'Akselerasi pengerjaan intensif (-35% waktu)' : 'Accelerated dedicated sprint (-35% time)'}
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Scope & Cost Card */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0d1018] border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm lg:sticky lg:top-28">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4">
              <Calculator className="w-4 h-4" />
              <span>{lang === 'id' ? 'Ringkasan Estimasi' : 'Estimation Summary'}</span>
            </div>

            <div className="space-y-4 pb-6 border-b border-stone-100 dark:border-stone-800/80">
              <div>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {lang === 'id' ? 'Estimasi Durasi Pengerjaan' : 'Estimated Timeline Duration'}
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold font-display text-stone-900 dark:text-white tabular-nums">
                    ~{weeksEstimate} {lang === 'id' ? 'Minggu' : 'Weeks'}
                  </span>
                  <span className="text-xs font-mono text-stone-500">
                    ({totalDays} {lang === 'id' ? 'hari kerja' : 'working days'})
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {lang === 'id' ? 'Kisaran Investasi Transparan' : 'Estimated Investment Range'}
                </p>
                <div className="mt-1">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-stone-900 dark:text-white tabular-nums">
                    Rp {totalPriceIdr.toLocaleString('id-ID')}
                  </div>
                  <div className="text-xs font-mono text-stone-500 dark:text-stone-400 mt-0.5">
                    ≈ ${totalPriceUsd.toLocaleString('en-US')} USD (berdasarkan kompleksitas)
                  </div>
                </div>
              </div>
            </div>

            {/* Scope inclusions list */}
            <div className="py-4 space-y-2 text-xs text-stone-600 dark:text-stone-400">
              <p className="font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider text-[11px]">
                {lang === 'id' ? 'Sudah Termasuk dalam Estimasi:' : 'Included In Standard Scope:'}
              </p>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{lang === 'id' ? 'Desain UI/UX Figma & Komponen Interaktif' : 'Figma UI/UX & Responsive Interactions'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{lang === 'id' ? 'Audit Kecepatan 90+ Google Lighthouse' : '90+ Lighthouse Performance Guarantee'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{lang === 'id' ? 'Garansi Bugfix & Pemeliharaan 30 Hari' : '30-Day Post-Launch Warranty & Support'}</span>
              </div>
            </div>

            {/* Action button to prefill Contact form */}
            <div className="pt-4">
              <button
                onClick={handleSendToContact}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-sm transition-all"
              >
                <span>{lang === 'id' ? 'Gunakan Estimasi Ini untuk Kirim Pesan' : 'Apply Scope to Contact Form'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
