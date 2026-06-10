// ─────────────────────────────────────────────────────────────
//  src/data/index.js
//  All portfolio content lives here. Edit this file to update
//  your name, projects, skills, and links across the whole site.
// ─────────────────────────────────────────────────────────────

export const personalInfo = {
  name:              'Aariyas Bevin',
  nameJP:            'アーリヤス・ベヴィン',
  degree:            'B.Tech AI & Data Science',
  year:              'Final Year',
  focus:             'Animated Web Development',
  passion:           'Japanese Culture · Anime',
  philosophy:        'ものづくり',
  philosophyMeaning: 'The art of making things with care',
  status:            'Open to Opportunities',
  email:             'aariyas@example.com',
  github:            'https://github.com/aariyas-bevin',
  linkedin:          'https://linkedin.com/in/aariyas-bevin',
  location:          'India',
}

export const typingRoles = [
  'Animated Web Developer',
  'AI & DS Engineer',
  'Creative Frontend Dev',
  'Japanese Culture Enthusiast',
  'Anime Lover & Coder',
]

export const skills = [
  {
    icon: '前',
    name: 'Frontend Development',
    desc: 'Crafting pixel-perfect, animated interfaces with deep attention to motion and aesthetics.',
    tags: [
      { label: 'HTML5',      type: 'gold'    },
      { label: 'CSS3',       type: 'gold'    },
      { label: 'JavaScript', type: 'gold'    },
      { label: 'Animations', type: 'crimson' },
    ],
  },
  {
    icon: '反',
    name: 'React Ecosystem',
    desc: 'Building dynamic SPAs and component-driven UIs with hooks, state management, and more.',
    tags: [
      { label: 'React.js',      type: 'gold'    },
      { label: 'React Native',  type: 'mist'    },
      { label: 'Chart.js',      type: 'gold'    },
      { label: 'Leaflet.js',    type: 'crimson' },
    ],
  },
  {
    icon: '知',
    name: 'AI & Machine Learning',
    desc: 'Developing intelligent systems — from computer vision to NLP pipelines and predictive models.',
    tags: [
      { label: 'YOLOv9',   type: 'jade' },
      { label: 'ResNet-50', type: 'jade' },
      { label: 'MiDaS',    type: 'jade' },
      { label: 'ONNX',     type: 'mist' },
    ],
  },
  {
    icon: '後',
    name: 'Backend & APIs',
    desc: 'Building robust REST APIs and data pipelines with Python-first backend frameworks.',
    tags: [
      { label: 'FastAPI',    type: 'gold'    },
      { label: 'PostgreSQL', type: 'gold'    },
      { label: 'PostGIS',    type: 'crimson' },
      { label: 'Python',     type: 'mist'    },
    ],
  },
  {
    icon: '動',
    name: 'Animation & Motion',
    desc: 'Breathing life into UIs — CSS animations, keyframes, transitions, and Framer Motion.',
    tags: [
      { label: 'Framer Motion', type: 'crimson' },
      { label: 'GSAP',          type: 'gold'    },
      { label: '3D Transforms', type: 'gold'    },
      { label: 'Scroll FX',     type: 'mist'    },
    ],
  },
  {
    icon: '美',
    name: 'Design & Aesthetics',
    desc: 'Translating Japanese wabi-sabi and anime visual language into modern digital experiences.',
    tags: [
      { label: 'UI/UX',       type: 'jade'    },
      { label: 'Typography',  type: 'gold'    },
      { label: 'Color Theory',type: 'gold'    },
      { label: 'Theming',     type: 'crimson' },
    ],
  },
]

export const skillBars = [
  { name: 'HTML / CSS',    pct: 92 },
  { name: 'JavaScript',    pct: 85 },
  { name: 'React.js',      pct: 80 },
  { name: 'Python / ML',   pct: 70 },
  { name: 'FastAPI',       pct: 65 },
  { name: 'Web Animation', pct: 88 },
]

export const projects = [
  {
    id: 1,
    icon: '道',
    category: 'Final Year Project',
    title: 'Tharani Sengol',
    desc: 'THARANI SENGOL is a comprehensive, government-integrated digital platform engineered to combat illegal mining and unauthorized earth transportation. By leveraging GPS tracking, geo-fencing technology, and automated compliance verification, the system ensures that every phase of excavation and transit aligns strictly with government-issued permits.',
    stack: ['YOLOv9', 'ResNet-50', 'MiDaS', 'FastAPI', 'React.js', 'Leaflet.js', 'PostGIS', 'Jetson Nano'],
    github: 'https://github.com/Mr-Prince2/tharani_sengol.git',
    demo: '#',
    featured: true,
    gradient: 'linear-gradient(135deg, #1a0505 0%, #4a0e0e 50%, #1a0505 100%)',
  },
  {
    id: 2,
    icon: '知',
    category: 'AI Finance Tracker (Web App)',
    title: 'Kuber',
    desc: 'An intelligent finance tracking application that uses AI to provide insights and recommendations.',
    stack: ['Next.js', 'Clerk', 'Prisma', 'Supabase', 'Arcject', 'Inngest', 'Resend', 'Gemini API'],
    github: 'https://github.com/Mr-Prince2/ai_finance_platform.git',
    demo: 'https://kuber-rouge.vercel.app/',
    featured: false,
    gradient: 'linear-gradient(135deg, #050f1a 0%, #0e3a4a 50%, #050f1a 100%)',
  },
  {
    id: 3,
    icon: '語',
    category: 'Education · Anime',
    title: 'Anime Language Platform',
    desc: 'Japanese & Korean learning platform with 3D animations, gamification, and anime character selection.',
    stack: ['React.js', 'Three.js', 'CSS3D', 'Gamification'],
    github: '#',
    demo: '#',
    featured: false,
    gradient: 'linear-gradient(135deg, #0a1a05 0%, #1a4a0e 50%, #0a1a05 100%)',
  },
  {
    id: 4,
    icon: '円',
    category: 'Finance · Web App',
    title: 'Personal Finance App',
    desc: 'Dark-mode finance tracker with Chart.js visualizations, localStorage persistence, and category-based budgeting.',
    stack: ['JavaScript', 'Chart.js', 'localStorage', 'CSS'],
    github: '#',
    demo: '#',
    featured: false,
    gradient: 'linear-gradient(135deg, #1a1505 0%, #4a3a0e 50%, #1a1505 100%)',
  },
  {
    id: 5,
    icon: '鳥',
    category: 'AI · Voice Assistant',
    title: 'Chopper — AI Assistant',
    desc: 'J.A.R.V.I.S.-inspired anime AI assistant named after One Piece\'s beloved reindeer doctor. Conversational, playful, intelligent.',
    stack: ['JavaScript', 'Web Speech API', 'AI APIs', 'CSS Animations'],
    github: '#',
    demo: '#',
    featured: false,
    gradient: 'linear-gradient(135deg, #15051a 0%, #3a0e4a 50%, #15051a 100%)',
  },
  {
    id: 6,
    icon: '教',
    category: 'Education · Web Dev',
    title: 'Anime CSS Teaching Site',
    desc: 'Interactive HTML/CSS teaching platform with anime aesthetic — covering flexbox, grid, pseudoselectors, transitions, and responsive design.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Anime Theme'],
    github: '#',
    demo: '#',
    featured: false,
    gradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a4a 50%, #0a0a1a 100%)',
  },
]

export const marqueeItems = [
  { text: 'Web Animation',    accent: false },
  { text: 'アニメーション',    accent: true  },
  { text: 'AI & Data Science', accent: false },
  { text: '日本文化',           accent: true  },
  { text: 'React.js',         accent: false },
  { text: '創造性',             accent: true  },
  { text: 'Frontend Dev',     accent: false },
  { text: '美しい',             accent: true  },
  { text: 'Machine Learning', accent: false },
  { text: '技術',               accent: true  },
]