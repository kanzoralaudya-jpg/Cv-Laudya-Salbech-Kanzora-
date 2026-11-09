export type ProjectCategory = 'web-app' | 'ui-ux' | 'ai-tech' | 'mobile';

export interface Project {
  id: string;
  title: string;
  tagline: {
    id: string;
    en: string;
  };
  category: ProjectCategory;
  categoryLabel: {
    id: string;
    en: string;
  };
  year: string;
  client: string;
  image: string;
  metrics: {
    id: string;
    en: string;
  };
  overview: {
    id: string;
    en: string;
  };
  challenge: {
    id: string;
    en: string;
  };
  solution: {
    id: string;
    en: string;
  };
  results: {
    id: string;
    en: string;
  }[];
  stack: string[];
  featured: boolean;
  demoUrl?: string;
  githubUrl?: string;
}

export interface SkillCategory {
  title: {
    id: string;
    en: string;
  };
  description: {
    id: string;
    en: string;
  };
  skills: {
    name: string;
    level: number; // 1-100
    experienceYears: string;
    highlight: string;
  }[];
}

export interface ExperienceItem {
  period: string;
  role: {
    id: string;
    en: string;
  };
  company: string;
  location: string;
  type: string;
  description: {
    id: string;
    en: string;
  };
  achievements: {
    id: string[];
    en: string[];
  };
  technologies: string[];
}

export interface Testimonial {
  quote: {
    id: string;
    en: string;
  };
  author: string;
  role: string;
  company: string;
  avatarInitials: string;
}

export interface Profile {
  name: string;
  avatarImage: string;
  role: {
    id: string;
    en: string;
  };
  educationHistory: {
    id: string;
    en: string;
  };
  studyPurpose: {
    id: string;
    en: string;
  };
  aspirations: {
    id: string;
    en: string;
  };
  highSchoolExperience: {
    id: string;
    en: string;
  };
  motivation: {
    id: string;
    en: string;
  };
  headline: {
    prefix: { id: string; en: string };
    accent: { id: string; en: string };
    suffix: { id: string; en: string };
  };
  bio: {
    id: string;
    en: string;
  };
  location: string;
  email: string;
  github: string;
  linkedin: string;
  dribbble: string;
  whatsapp: string;
  availableForWork: boolean;
  availabilityText: {
    id: string;
    en: string;
  };
}

export interface StatItem {
  value: string;
  label: { id: string; en: string };
  sub: { id: string; en: string };
}

export interface PortfolioData {
  profile: Profile;
  stats: StatItem[];
  projects: Project[];
  skillCategories: SkillCategory[];
  experiences: ExperienceItem[];
  testimonials: Testimonial[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: 'Kanzora Laudya',
    avatarImage: '/src/assets/images/portfolio_hero_portrait_1794191452798.jpg',
    role: {
      id: 'Mahasiswa Sistem Informasi & Digital Product Enthusiast',
      en: 'Information Systems Student & Digital Product Enthusiast',
    },
    educationHistory: {
      id: 'S1 Sistem Informasi (2024 — Sekarang) · SMA Jurusan IPA (Lulus 2024)',
      en: 'Bachelor of Information Systems (2024 — Present) · High School Science (Graduated 2024)',
    },
    studyPurpose: {
      id: 'Memilih Program Studi Sistem Informasi untuk memadukan arsitektur teknologi perangkat lunak dengan analisis strategi proses bisnis. Saya ingin menjadi jembatan antara kebutuhan manusia dan otomasi digital, merancang sistem informasi terintegrasi, serta mengoptimalkan pengambilan keputusan berbasis data cerdas.',
      en: 'Chose Information Systems to bridge modern software architectures with business process strategy, aiming to design integrated enterprise systems and data-driven digital solutions.',
    },
    aspirations: {
      id: 'Menjadi Enterprise Systems Architect & Konsultan Transformasi Digital yang memimpin perancangan ekosistem teknologi berskala nasional.',
      en: 'To become an Enterprise Systems Architect & Digital Transformation Consultant directing high-impact enterprise technology ecosystems.',
    },
    highSchoolExperience: {
      id: 'Ketua Divisi IT & Desain OSIS SMA, Juara 2 Lomba Web Design Tingkat Provinsi, Pengurus Ekskul Komputer & Robotika.',
      en: 'Head of IT & Design in High School Student Council, 2nd Place Provincial Web Design Competition, Leader of Computer & Robotics Club.',
    },
    motivation: {
      id: 'Terdorong oleh rasa ingin tahu tinggi untuk terus belajar, menciptakan solusi nyata yang mempermudah kehidupan orang banyak, dan berkontribusi aktif bagi kemajuan teknologi informasi.',
      en: 'Driven by curiosity to continuously learn, create real-world digital solutions that elevate communities, and contribute meaningfully to the IT ecosystem.',
    },
    headline: {
      prefix: {
        id: 'Mengintegrasikan Teknologi & Bisnis melalui',
        en: 'Bridging Technology & Business through',
      },
      accent: {
        id: 'Sistem Informasi Cerdas',
        en: 'Intelligent Systems',
      },
      suffix: {
        id: '& Rekayasa Solutif.',
        en: '& Impactful Solutions.',
      },
    },
    bio: {
      id: 'Halo, saya Kanzora Laudya, mahasiswa Program Studi Sistem Informasi. Saya berfokus pada analisis sistem, perancangan antarmuka digital berbasis kebutuhan pengguna, dan implementasi teknologi informasi modern untuk transformasi bisnis digital.',
      en: "Hello, I'm Kanzora Laudya, an Information Systems student focused on systems analysis, user-centric interface design, and modern information technology implementation for digital business transformation.",
    },
    location: 'Jakarta, Indonesia · Worldwide Remote',
    email: 'kanzoralaudya@gmail.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    dribbble: 'https://dribbble.com',
    whatsapp: 'https://wa.me/6281234567890',
    availableForWork: true,
    availabilityText: {
      id: 'Tersedia untuk proyek baru & konsultasi terpilih',
      en: 'Available for select new projects & advisory roles',
    },
  },

  stats: [
    {
      value: '48+',
      label: { id: 'Proyek Terselesaikan', en: 'Projects Delivered' },
      sub: { id: 'Web app, SaaS & mobile', en: 'Web apps, SaaS & mobile' },
    },
    {
      value: '6+',
      label: { id: 'Tahun Pengalaman', en: 'Years of Experience' },
      sub: { id: 'Rekayasa & desain produk', en: 'Engineering & product design' },
    },
    {
      value: '99.4%',
      label: { id: 'Kepuasan Klien', en: 'Client Satisfaction' },
      sub: { id: 'Ulasan bintang lima', en: 'Five-star client feedback' },
    },
    {
      value: '8',
      label: { id: 'Penghargaan Desain & Web', en: 'Design & Web Awards' },
      sub: { id: 'Awwwards & Developer Choice', en: 'Awwwards & Dev Recognitions' },
    },
  ],

  projects: [
    {
      id: 'aurora-fintech',
      title: 'Aurora Fintech Angle Analytics',
      tagline: {
        id: 'Platform analitik perbankan digital generasi baru dengan visualisasi multi-aset real-time.',
        en: 'Next-generation digital banking analytics platform with real-time multi-asset visualization.',
      },
      category: 'web-app',
      categoryLabel: { id: 'Web App & Fintech', en: 'Web App & Fintech' },
      year: '2026',
      client: 'Aurora Global Capital',
      image: '/src/assets/images/project_fintech_dashboard_1794191453723.jpg',
      metrics: {
        id: '+320% kecepatan kueri analitik & pemantauan portofolio $248M+',
        en: '+320% analytics query throughput & $248M+ portfolio tracking',
      },
      overview: {
        id: 'Aurora Fintech adalah sistem manajemen perbendaharaan dan analitik keuangan institusional. Didesain dari nol untuk menyajikan puluhan ribu titik data transaksi tanpa lag dengan arsitektur komputasi sisi-klien yang efisien.',
        en: 'Aurora Fintech is an institutional treasury and analytics system built from scratch to render tens of thousands of real-time transaction points with zero frame drops.',
      },
      challenge: {
        id: 'Sistem lama mengalami latensi berat saat memuat histori portofolio bernilai jutaan transaksi dan visualisasi metrik sering membingungkan pengguna non-teknis.',
        en: 'Legacy systems suffered severe latency when aggregating millions of transaction histories, with opaque visualization confounding stakeholders.',
      },
      solution: {
        id: 'Mengimplementasikan arsitektur React 19 dengan streaming data tabular, web workers untuk kalkulasi agregat matematika di background, serta tema obsidian gelap yang fokus dan ramah mata.',
        en: 'Implemented a React 19 architecture featuring streaming tabular data, web workers for background statistical computation, and a low-strain obsidian dark theme.',
      },
      results: [
        {
          id: 'Memangkas waktu render dashboard dari 4.2 detik menjadi 380 milidetik.',
          en: 'Reduced initial dashboard render time from 4.2s to 380ms.',
        },
        {
          id: 'Mengelola pemantauan volume transaksi lebih dari $248,000,000 per bulan.',
          en: 'Successfully orchestrates tracking of $248,000,000+ monthly transaction flow.',
        },
        {
          id: 'Mendapatkan pengakuan Desain Antarmuka FinTech Terbaik 2026.',
          en: 'Honored with Best FinTech UI Architecture 2026.',
        },
      ],
      stack: ['React 19', 'TypeScript', 'Tailwind CSS', 'Web Workers', 'ECharts', 'Node.js'],
      featured: true,
      demoUrl: 'https://github.com',
      githubUrl: 'https://github.com',
    },
    {
      id: 'aeterna-nordic',
      title: 'Aeterna Nordic Edit',
      tagline: {
        id: 'E-commerce editorial busana dan desain furnitur minimalis Skandinavia dengan checkout terpadu.',
        en: 'Minimalist Scandinavian fashion and architectural furniture editorial e-commerce experience.',
      },
      category: 'ui-ux',
      categoryLabel: { id: 'UI/UX & E-Commerce', en: 'UI/UX & E-Commerce' },
      year: '2025',
      client: 'Aeterna Studio Copenhagen',
      image: '/src/assets/images/project_ecommerce_minimal_1794191454476.jpg',
      metrics: {
        id: '+42% peningkatan rasio konversi checkout dalam 90 hari pertama',
        en: '+42% checkout conversion lift within the first 90 days',
      },
      overview: {
        id: 'Pengalaman belanja digital berorientasi editorial majalah seni, menyeimbangkan tipografi megah, ruang negatif yang terukur, serta alur navigasi keranjang belanja instan.',
        en: 'An art monograph shopping experience balancing architectural typography, calibrated negative space, and instant one-tap drawer checkout.',
      },
      challenge: {
        id: 'Klien menginginkan nuansa galeri seni eksklusif tanpa mengorbankan kecepatan pemuatan gambar berkualitas tinggi dan kemudahan transaksi seluler.',
        en: 'The client needed the prestige of an art gallery without sacrificing high-res asset loading speed and mobile transaction ergonomics.',
      },
      solution: {
        id: 'Desain layout fluid modular, sistem kompresi gambar progresif berbasis WebP/AVIF, dan integrasi pembayaran global Stripe tanpa pengalihan halaman berlebihan.',
        en: 'Modular fluid grid architecture, progressive AVIF/WebP image streaming, and in-context Stripe checkout reducing drop-offs.',
      },
      results: [
        {
          id: 'Skor performa Google Lighthouse 99 di seluruh perangkat.',
          en: 'Google Lighthouse Performance score of 99 across all devices.',
        },
        {
          id: 'Rata-rata waktu sesi pengguna meningkat 180% berkat narasi editorial interaktif.',
          en: 'Average session duration grew by 180% driven by interactive editorial layouts.',
        },
      ],
      stack: ['Next.js', 'React', 'Tailwind CSS', 'Stripe API', 'Framer Motion'],
      featured: true,
      demoUrl: 'https://github.com',
      githubUrl: 'https://github.com',
    },
    {
      id: 'synax-ai-canvas',
      title: 'Synax Generative Studio',
      tagline: {
        id: 'Kanvas orkestrasi node AI untuk desainer generatif dan kreator aset multimedia cerdas.',
        en: 'Node-based AI orchestration canvas for generative artists and multimedia engineers.',
      },
      category: 'ai-tech',
      categoryLabel: { id: 'AI & Creative Tech', en: 'AI & Creative Tech' },
      year: '2026',
      client: 'Synax Labs Inc',
      image: '/src/assets/images/project_ai_creative_tool_1794191454159.jpg',
      metrics: {
        id: '150,000+ kreator aktif bulanan & 2.4 juta alur kerja tersimpan',
        en: '150,000+ monthly active creators & 2.4M saved pipelines',
      },
      overview: {
        id: 'Antarmuka kanvas interaktif berbasis simpul pipa (nodes) yang menghubungkan model multimodal, upscaling gambar, analisis teks cerdas, dan rendering real-time.',
        en: 'A node-graph visual canvas connecting multimodal AI models, upscaling pipelines, and real-time generation into a cohesive creator workspace.',
      },
      challenge: {
        id: 'Membuat antarmuka visual node yang rumit tetap intuitif, ringan pada 60fps saat di-zoom dan digeser pada kanvas besar tanpa membebani GPU pengguna.',
        en: 'Keeping complex node graph diagrams snappy at 60fps pan/zoom on infinite canvas viewports without overwhelming browser GPU memory.',
      },
      solution: {
        id: 'Mengembangkan engine rendering canvas virtualized dengan state management terdistribusi, dukungan drag-and-drop akurat, dan integrasi streaming LLM/Gemini API.',
        en: 'Engineered a virtualized canvas renderer with decoupled reactive state, fluid connection bezier curves, and streaming Gemini API capabilities.',
      },
      results: [
        {
          id: 'Latensi respon eksekusi simpul di bawah 120ms.',
          en: 'Sub-120ms execution response across multi-stage node pipelines.',
        },
        {
          id: 'Diadopsi oleh studio kreatif di Tokyo, San Francisco, dan Berlin.',
          en: 'Adopted by creative digital studios across Tokyo, SF, and Berlin.',
        },
      ],
      stack: ['React', 'TypeScript', 'HTML5 Canvas API', 'Gemini API', 'Tailwind CSS'],
      featured: true,
      demoUrl: 'https://github.com',
      githubUrl: 'https://github.com',
    },
    {
      id: 'nusa-mobility',
      title: 'Nusa Fleet & Transit Ecosystem',
      tagline: {
        id: 'Aplikasi manajemen armada kendaraan listrik terpadu dengan pelacakan baterai real-time.',
        en: 'Unified EV fleet management & smart battery-swap transit ecosystem app.',
      },
      category: 'mobile',
      categoryLabel: { id: 'Mobile & IoT', en: 'Mobile & IoT' },
      year: '2025',
      client: 'Nusa Clean Mobility',
      image: '/src/assets/images/project_fintech_dashboard_1794191453723.jpg',
      metrics: {
        id: 'Mengoptimalkan 1,800+ rute kendaraan listrik harian di 4 kota besar',
        en: 'Optimized 1,800+ daily electric vehicle routes across 4 metropolitan hubs',
      },
      overview: {
        id: 'Solusi perangkat lunak terintegrasi untuk pengemudi dan operator armada EV: menemukan stasiun tukar baterai tercepat, menghitung estimasi daya tempuh dinamis, dan telemetri armada.',
        en: 'Integrated dispatch and driver software for electric fleets: real-time battery station telemetry, dynamic range calculation, and predictive maintenance.',
      },
      challenge: {
        id: 'Kondisi koneksi internet yang fluktuatif di jalan membutuhkan sistem offline-first yang andal dan sinkronisasi otomatis.',
        en: 'Fluctuating mobile connectivity required rock-solid offline-first queuing and conflict-free delta sync.',
      },
      solution: {
        id: 'Arsitektur Progressive Web App dengan IndexedDB caching, background sync service workers, dan antarmuka dengan kontras tinggi untuk visibilitas di bawah terik matahari.',
        en: 'PWA architecture with IndexedDB offline queuing, background sync workers, and high-visibility daylight contrast mode.',
      },
      results: [
        {
          id: 'Efisiensi konsumsi baterai armada meningkat 18%.',
          en: 'Fleet energy efficiency increased by 18% through dynamic routing.',
        },
        {
          id: 'Nol data hilang saat transmisi pada zona blindspot jaringan seluler.',
          en: 'Zero data packet loss during mobile blindspot traversals.',
        },
      ],
      stack: ['React', 'TypeScript', 'PWA / Service Workers', 'Leaflet / Maps', 'Tailwind CSS'],
      featured: false,
    },
    {
      id: 'lumina-tokens',
      title: 'Lumina Design Tokens & System',
      tagline: {
        id: 'Sistem desain open-source multi-platform dengan 140+ komponen siap pakai WCAG AAA.',
        en: 'Multi-platform design token engine and 140+ accessible UI primitive components.',
      },
      category: 'ui-ux',
      categoryLabel: { id: 'UI/UX & Design Systems', en: 'UI/UX & Design Systems' },
      year: '2025',
      client: 'Open Source Community',
      image: '/src/assets/images/project_ecommerce_minimal_1794191454476.jpg',
      metrics: {
        id: '45,000+ unduhan npm & kompatibilitas 100% WCAG 2.2 AAA',
        en: '45,000+ npm downloads & 100% WCAG 2.2 AAA compliance',
      },
      overview: {
        id: 'Pondasi desain terpadu untuk tim engineering dan desainer: generator token CSS variables, komponen React tanpa kompromi aksesibilitas, dan dokumentasi otomatis.',
        en: 'A unified bridge between engineers and product designers: semantic token compiler, accessible primitives, and zero-dependency micro-interactions.',
      },
      challenge: {
        id: 'Inkonsistensi visual antar tim platform dan kurangnya kepatuhan standar aksesibilitas keyboard dan pembaca layar.',
        en: 'Severe visual divergence across cross-functional platforms and failing screen reader compliance audits.',
      },
      solution: {
        id: 'Menyusun spesifikasi token semantik berbasis Tailwind v4, mengotomatisasi pengetesan kontras warna, dan menulis hook fokus navigasi keyboard yang presisi.',
        en: 'Constructed semantic token architecture on Tailwind CSS, automated color contrast verifications, and authored zero-pill keyboard navigation hooks.',
      },
      results: [
        {
          id: 'Mempercepat siklus peluncuran fitur baru dari 3 minggu menjadi 4 hari kerja.',
          en: 'Sped up cross-product feature deployment cycles from 3 weeks to 4 business days.',
        },
      ],
      stack: ['TypeScript', 'React', 'Tailwind CSS', 'Radix UI Primitives', 'Storybook'],
      featured: false,
    },
    {
      id: 'voxel-interactive',
      title: 'VoxelCraft Interactive Studio',
      tagline: {
        id: 'Eksperimen 3D interaktif real-time berbasis browser dengan shader pencahayaan fisik.',
        en: 'Browser-native interactive 3D spatial simulation with physically based rendering.',
      },
      category: 'ai-tech',
      categoryLabel: { id: 'Creative Tech & 3D', en: 'Creative Tech & 3D' },
      year: '2026',
      client: 'Creative Technology Lab',
      image: '/src/assets/images/project_ai_creative_tool_1794191454159.jpg',
      metrics: {
        id: 'Stabil 60 FPS pada perangkat mobile dan desktop dengan WebGL modern',
        en: 'Rock-solid 60 FPS across mobile and desktop via modern WebGL pipelines',
      },
      overview: {
        id: 'Pameran eksplorasi teknologi kreatif yang menguji batas rendering grafis WebGL dan responsivitas interaksi kursor di peramban web modern.',
        en: 'A creative tech demonstration pushing the envelope of WebGL shaders, procedural audio-reactive geometry, and fluid viewport ergonomics.',
      },
      challenge: {
        id: 'Mengoptimalkan shader pencahayaan kompleks agar berjalan mulus tanpa lag pada laptop berdaya rendah.',
        en: 'Optimizing custom fragment shaders to maintain high framerate on low-power devices without sacrificing aesthetic fidelity.',
      },
      solution: {
        id: 'Teknik deferred rendering kustom, level-of-detail otomatis, dan pemuatan tekstur asinkronus.',
        en: 'Custom deferred rendering pass, dynamic LOD scaling, and non-blocking texture streaming.',
      },
      results: [
        {
          id: 'Ditampilkan dalam berbagai galeri kurasi website kreatif global.',
          en: 'Featured across international creative web curation galleries.',
        },
      ],
      stack: ['Three.js', 'GLSL Shaders', 'Web Audio API', 'TypeScript', 'Vite'],
      featured: false,
    },
  ],

  skillCategories: [
    {
      title: { id: 'Frontend Engineering', en: 'Frontend Engineering' },
      description: {
        id: 'Membangun antarmuka pengguna yang cepat, modular, dan taat aksesibilitas.',
        en: 'Building fast, modular, and strictly accessible user interfaces.',
      },
      skills: [
        { name: 'React 19 / Next.js', level: 96, experienceYears: '6 tahun', highlight: 'Hooks, RSC, Compiler, Streaming' },
        { name: 'TypeScript', level: 94, experienceYears: '5 tahun', highlight: 'Strict Mode, Generics, Type Safety' },
        { name: 'Tailwind CSS v4', level: 98, experienceYears: '5 tahun', highlight: 'Design Tokens, Custom Variants, Fluid Type' },
        { name: 'Performance & Web Vitals', level: 92, experienceYears: '4 tahun', highlight: 'LCP/INP/CLS Optimization, Bundling' },
        { name: 'Three.js / WebGL / Canvas', level: 82, experienceYears: '3 tahun', highlight: 'Interactive Shaders, 3D Canvas' },
      ],
    },
    {
      title: { id: 'Backend & Cloud System', en: 'Backend & Cloud System' },
      description: {
        id: 'Arsitektur API andal, database relational, dan integrasi server-side.',
        en: 'Resilient API architectures, relational databases, and server-side integration.',
      },
      skills: [
        { name: 'Node.js & Express / Tsx', level: 90, experienceYears: '5 tahun', highlight: 'REST, Streaming Endpoints, Middleware' },
        { name: 'PostgreSQL & SQL', level: 88, experienceYears: '4 tahun', highlight: 'Indexing, Schema Migration, ORM' },
        { name: 'Cloud Architecture & Docker', level: 84, experienceYears: '3 tahun', highlight: 'GCP Cloud Run, CI/CD, Containerization' },
        { name: 'Authentication & Security', level: 89, experienceYears: '4 tahun', highlight: 'OAuth 2.0, JWT, RBAC, CSRF/CORS' },
      ],
    },
    {
      title: { id: 'UI/UX & Product Design', en: 'UI/UX & Product Design' },
      description: {
        id: 'Merancang sistem interaksi manusia yang intuitif dan berdaya tarik visual tinggi.',
        en: 'Designing intuitive, high-craft human interfaces with emotional resonance.',
      },
      skills: [
        { name: 'Figma & Design Systems', level: 95, experienceYears: '6 tahun', highlight: 'Variables, Auto-layout, Interactive Prototypes' },
        { name: 'WCAG 2.2 Accessibility', level: 92, experienceYears: '4 tahun', highlight: 'Keyboard Navigation, Screen Readers, AA/AAA' },
        { name: 'Information Architecture', level: 90, experienceYears: '5 tahun', highlight: 'Wireframing, User Flow, Usability Audits' },
        { name: 'Micro-interactions & Motion', level: 89, experienceYears: '4 tahun', highlight: 'Choreography, Physics Curves, Sub-200ms' },
      ],
    },
    {
      title: { id: 'AI & Creative Intelligence', en: 'AI & Creative Intelligence' },
      description: {
        id: 'Mengintegrasikan model kecerdasan buatan ke dalam alur kerja produk nyata.',
        en: 'Integrating artificial intelligence models into high-value product workflows.',
      },
      skills: [
        { name: 'Gemini Multimodal API', level: 92, experienceYears: '2 tahun', highlight: 'Structured Output, Streaming, Agents' },
        { name: 'Prompt Engineering & System Prompts', level: 95, experienceYears: '2 tahun', highlight: 'Few-shot, Guardrails, Deterministic Workflows' },
        { name: 'Vector Search & Embeddings', level: 84, experienceYears: '2 tahun', highlight: 'RAG Architectures, Semantic Retrieval' },
      ],
    },
  ],

  experiences: [
    {
      period: '2024 — Sekarang',
      role: {
        id: 'Principal Creative Technologist & Lead Architect',
        en: 'Principal Creative Technologist & Lead Architect',
      },
      company: 'Velox Digital Labs',
      location: 'Jakarta & Remote',
      type: 'Full-time / Strategic',
      description: {
        id: 'Memimpin arsitektur antarmuka digital dan tim lintas-disiplin dalam membangun produk web berkinerja tinggi untuk klien enterprise dan startup bertumbuh cepat.',
        en: 'Leading digital interface architecture and cross-functional teams in developing high-performance web products for enterprise and scale-up clients.',
      },
      achievements: {
        id: [
          'Memimpin modernisasi arsitektur 12 platform web dengan peningkatan rata-rata kecepatan muat hingga 64%.',
          'Menginisiasi standardisasi design token terpadu yang digunakan oleh 30+ engineer dan product desainer.',
          'Mengintegrasikan model AI generatif ke 4 produk inti dengan latensi responsif di bawah 200ms.',
        ],
        en: [
          'Led architecture modernization of 12 web platforms, resulting in an average 64% speed uplift.',
          'Initiated unified design token standards adopted across 30+ engineers and designers.',
          'Integrated generative AI capabilities across 4 key apps with responsive sub-200ms perceived latency.',
        ],
      },
      technologies: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GCP', 'Gemini API'],
    },
    {
      period: '2022 — 2024',
      role: {
        id: 'Senior Full-Stack Engineer & UI Specialist',
        en: 'Senior Full-Stack Engineer & UI Specialist',
      },
      company: 'Nusantara Tech Solution',
      location: 'Jakarta, Indonesia',
      type: 'Full-time',
      description: {
        id: 'Bertanggung jawab penuh atas rekayasa aplikasi web fintech dan otomasi alur transaksi skala besar.',
        en: 'Spearheaded engineering of large-scale fintech web apps and automated transaction pipelines.',
      },
      achievements: {
        id: [
          'Membangun dashboard analitik real-time yang memproses jutaan event transaksi per hari dengan zero down-time.',
          'Meraih skor audit aksesibilitas sempurna (100% WCAG AA) pada portal layanan publik.',
          'Membimbing 8 junior dan mid-level developers dalam implementasi clean architecture.',
        ],
        en: [
          'Engineered real-time analytics dashboard handling millions of daily events with zero downtime.',
          'Achieved 100% WCAG AA accessibility audit score on public customer portal.',
          'Mentored 8 junior and mid-level developers in clean architecture practices.',
        ],
      },
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'Tailwind CSS'],
    },
    {
      period: '2020 — 2022',
      role: {
        id: 'Frontend Developer & Product Designer',
        en: 'Frontend Developer & Product Designer',
      },
      company: 'Karsa Creative Studio',
      location: 'Bandung / Remote',
      type: 'Full-time',
      description: {
        id: 'Merancang dan memprogram antarmuka pengguna interaktif untuk brand internasional dan agensi kreatif.',
        en: 'Designed and coded interactive user interfaces for global brands and creative agencies.',
      },
      achievements: {
        id: [
          'Mengembangkan 20+ website interaktif dengan animasi halus 60fps.',
          'Memenangkan 2 penghargaan Awwwards Mobile Excellence dan Developer Choice.',
        ],
        en: [
          'Developed 20+ interactive websites with fluid 60fps physics-based animations.',
          'Won 2 Awwwards Mobile Excellence and Developer Choice distinctions.',
        ],
      },
      technologies: ['JavaScript ES6+', 'React', 'CSS3 / SASS', 'Figma', 'GSAP'],
    },
  ],

  testimonials: [
    {
      quote: {
        id: 'Kanzora memiliki kombinasi langka antara selera estetika tajam dan kemampuan rekayasa backend/frontend yang sangat solid. Proyek fintech kami selesai 2 minggu lebih cepat dari target dengan performa melebihi ekspektasi.',
        en: 'Kanzora brings a rare combination of razor-sharp aesthetic intuition and rock-solid full-stack engineering. Our fintech project shipped 2 weeks ahead of schedule with performance exceeding all benchmarks.',
      },
      author: 'Adrian Kusuma',
      role: 'VP of Product Engineering',
      company: 'Aurora Capital',
      avatarInitials: 'AK',
    },
    {
      quote: {
        id: 'Desain antarmuka yang dibuat Kanzora langsung menaikkan standar produk kami. Konversi e-commerce kami melompat 42% karena alur checkout yang mulus dan tanpa hambatan.',
        en: 'The user experience Kanzora engineered elevated our entire brand identity. Our e-commerce conversion jumped by 42% directly attributable to the fluid checkout ergonomics.',
      },
      author: 'Helena Lindqvist',
      role: 'Creative Director',
      company: 'Aeterna Studio Copenhagen',
      avatarInitials: 'HL',
    },
    {
      quote: {
        id: 'Sangat teliti terhadap detail, kode bersih, dan komunikasi yang sangat profesional. Mempekerjakan Kanzora adalah salah satu investasi terbaik untuk platform AI kami.',
        en: 'Remarkable attention to detail, pristine code quality, and exceptional communication. Working with Kanzora was one of our highest ROI decisions.',
      },
      author: 'Marcus Vance',
      role: 'Co-Founder & CTO',
      company: 'Synax Labs',
      avatarInitials: 'MV',
    },
  ],
};
