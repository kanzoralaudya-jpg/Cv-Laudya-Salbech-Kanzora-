import React, { useState, useEffect } from 'react';
import { Profile } from '../data/portfolioData';
import { Mail, Copy, Check, Send, Github, Linkedin, MessageSquare, Phone, ArrowUpRight } from 'lucide-react';

interface ContactSectionProps {
  lang: 'id' | 'en';
  profile: Profile;
  initialMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ lang, profile, initialMessage = '' }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<'project' | 'audit' | 'consultation' | 'other'>('project');
  const [budget, setBudget] = useState('15-35');
  const [message, setMessage] = useState(initialMessage);
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialMessage]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Simulate submission and construct mailto link
    setSubmitted(true);

    const subject = encodeURIComponent(`[Inquiry via Portfolio] ${topic.toUpperCase()} - ${name}`);
    const body = encodeURIComponent(
      `Nama: ${name}\nEmail: ${email}\nTopik: ${topic}\nEstimasi Budget: ${budget}\n\nPesan:\n${message}`
    );
    const mailtoUrl = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    // Provide user friendly fallback window.location
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Inquiries & Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase mb-2">
                06. {lang === 'id' ? 'Mulai Percakapan' : 'Initiate Collaboration'}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-stone-900 dark:text-white tracking-tight [text-wrap:balance]">
                {lang === 'id' ? 'Mari Wujudkan Produk Luar Biasa Bersama.' : "Let's Build Something Exceptional Together."}
              </h2>
              <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 mt-3 leading-relaxed">
                {lang === 'id'
                  ? 'Punya ide produk baru, kebutuhan transformasi antarmuka, atau ingin berkonsultasi mengenai arsitektur web modern? Saya siap mendiskusikannya.'
                  : 'Have an upcoming product launch, need an interface architecture audit, or want to discuss scalable web engineering? Reach out directly.'}
              </p>
            </div>

            {/* Direct Email Card with One-Click Copy */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0c0f17] border border-stone-200 dark:border-stone-800">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                {lang === 'id' ? 'Email Resmi' : 'Direct Email Address'}
              </p>
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="text-base sm:text-lg font-bold font-mono text-stone-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors truncate"
                >
                  {profile.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0"
                  title="Salin email"
                  aria-label="Salin email ke clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              {copiedEmail && (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">
                  ✓ {lang === 'id' ? 'Email berhasil disalin ke clipboard!' : 'Email copied to clipboard!'}
                </p>
              )}
            </div>

            {/* Social & Direct Contact Links */}
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                {lang === 'id' ? 'Saluran Tambahan' : 'Professional Channels'}
              </p>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0c0f17] text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                  <span>WhatsApp Direct</span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0c0f17] text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#0c0f17] text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-blue-500" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation & Brief Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0d1018] border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-bold font-display text-stone-900 dark:text-white mb-2">
              {lang === 'id' ? 'Formulir Briefing Proyek' : 'Project Consultation Form'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mb-6">
              {lang === 'id'
                ? 'Isi formulir di bawah ini untuk respons terperinci dalam waktu maksimal 24 jam kerja.'
                : 'Complete the brief below for an in-depth response within 24 business hours.'}
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-stone-900 dark:text-white">
                  {lang === 'id' ? 'Pesan Siap Dikirim!' : 'Message Formatted!'}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 max-w-md mx-auto">
                  {lang === 'id'
                    ? 'Aplikasi email Anda telah dibuka dengan draf yang terisi lengkap. Anda juga dapat mengirim email langsung ke kanzoralaudya@gmail.com.'
                    : 'Your email client has been opened with the complete draft. You can also email directly to kanzoralaudya@gmail.com.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline pt-2 inline-block"
                >
                  {lang === 'id' ? 'Tulis pesan baru' : 'Draft another message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                      {lang === 'id' ? 'Nama Lengkap / Organisasi' : 'Full Name / Organization'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Adrian Kusuma"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121622] text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                      {lang === 'id' ? 'Alamat Email' : 'Email Address'} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="adrian@company.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121622] text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Topic Selector */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                    {lang === 'id' ? 'Kategori Kebutuhan' : 'Topic of Interest'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'project', label: lang === 'id' ? 'Proyek Baru' : 'New Project' },
                      { id: 'audit', label: lang === 'id' ? 'Audit Sistem' : 'Code Audit' },
                      { id: 'consultation', label: lang === 'id' ? 'Konsultasi' : 'Advisory' },
                      { id: 'other', label: lang === 'id' ? 'Lainnya' : 'Other' },
                    ].map((item) => (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setTopic(item.id as any)}
                        className={`px-3 py-2 text-xs font-medium rounded-lg border text-center transition-all ${
                          topic === item.id
                            ? 'bg-indigo-600 text-white border-indigo-600 font-semibold'
                            : 'bg-stone-50 dark:bg-[#121622] border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message input */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                    {lang === 'id' ? 'Detail Kebutuhan & Deskripsi Singkat' : 'Project Brief & Inquiries'} *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      lang === 'id'
                        ? 'Ceritakan tentang produk Anda, tujuan, dan timeline yang diharapkan...'
                        : 'Tell me about your product goals, target dates, and scope...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121622] text-sm text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-sm transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{lang === 'id' ? 'Kirim Pesan & Buka Email' : 'Transmit Brief & Open Mail'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
