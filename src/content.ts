export const person = {
  name: 'Bilal Ahmad',
  handle: '@bilalahmad',
  role: 'Computer Science Student & Full Stack Developer',
  university: 'Qarshi University, Lahore',
  cgpa: '3.25',
  semester: '5th Semester',
  email: '8ilalahmad56@gmail.com',
  phone: '0317-6801802',
  location: 'Lahore, Punjab, Pakistan',
  linkedin: 'https://www.linkedin.com/in/bilal-ahmad-7b297a438',
  liveProject: 'https://cloth-selling-website-rouge.vercel.app/',
  github: 'https://github.com',
};

export const navLinks = [
  { label: 'Hero', href: '#hero' },
  { label: 'Desktop CV', href: '#desktop-presentation' },
  { label: 'Mobile CV', href: '#mobile-presentation' },
  { label: 'Contact', href: '#contact' },
  { label: 'Closing', href: '#closing' },
];

export const heroIntro = {
  tag: 'Interactive Storytelling CV',
  headlinePrefix: 'Hey, I’m',
  name: 'Bilal Ahmad',
  subtitle: 'Computer Science Student & Software Developer crafting high-performance systems and interactive digital experiences.',
  highlights: [
    '5th Semester BS Computer Science · Qarshi University',
    'Specializing in Java OOP, Algorithms, Web Engineering & System Architecture',
    'Interactive 3D scroll presentation with real physical device transformations'
  ]
};

export const projects = [
  {
    title: 'AI-Powered Study Flashcard Generator',
    semester: '5th Semester · In Progress',
    desc: 'Intelligent learning platform using AI algorithms to automatically transform academic lecture materials into spaced-repetition flashcards.',
    tags: ['AI / LLM', 'React', 'TypeScript', 'Tailwind']
  },
  {
    title: 'CPU Scheduling Simulator',
    semester: '4th Semester · Algorithms Course',
    desc: 'Interactive desktop simulator for OS CPU scheduling algorithms including FCFS, SJF, Round Robin, and Priority Scheduling with visual Gantt metrics.',
    tags: ['C++', 'Algorithms', 'Operating Systems', 'Data Structures']
  },
  {
    title: 'Cloth Selling E-Commerce Store',
    semester: 'Live on Vercel',
    desc: 'Modern, fully responsive fashion web store with product catalog, cart workflows, responsive UI, and optimized asset delivery.',
    tags: ['Next.js / React', 'Tailwind CSS', 'Vercel', 'E-Commerce'],
    link: 'https://cloth-selling-website-rouge.vercel.app/'
  },
  {
    title: 'Hospital Management System',
    semester: '2nd Semester · Java OOP',
    desc: 'Full-featured enterprise healthcare management system with role-based auth, appointment scheduling, doctor portal, and robust file handling.',
    tags: ['Java (OOP)', 'Java Swing', 'File I/O', 'System Architecture']
  },
  {
    title: 'Foodpanda Clone Platform',
    semester: '1st Semester · Web Development',
    desc: 'Pixel-perfect, responsive restaurant food ordering portal allowing customers to explore cuisine menus and track simulated orders.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI']
  }
];

export const skills = [
  { category: 'Programming Languages', items: ['Java (OOP)', 'C++', 'JavaScript (ES6+)', 'TypeScript', 'Python', 'SQL'] },
  { category: 'Core Computer Science', items: ['Data Structures', 'Design & Analysis of Algorithms', 'Operating Systems', 'CPU Scheduling', 'Multithreading', 'Database Design (MySQL)'] },
  { category: 'Web & Tools', items: ['React.js', 'Vite', 'Tailwind CSS', 'Java Swing GUI', 'Git & GitHub', 'VS Code', 'Vercel'] }
];

/**
 * Otis animation assets and configuration.
 * Every expression is registered to the 2:3 bust framing, padded to square.
 */
export const faces = {
  base: { src: '/faces/base.webp', mood: 'chill' },
  l_left: { src: '/faces/l_left.webp', mood: 'watching you' },
  l_right: { src: '/faces/l_right.webp', mood: 'watching you' },
  x_cross: { src: '/faces/x_cross.webp', mood: 'suspicious' },
  x_tongue: { src: '/faces/x_tongue.webp', mood: 'goofy' },
  x_shock: { src: '/faces/x_shock.webp', mood: 'startled' },
  x_laugh: { src: '/faces/x_laugh.webp', mood: 'cackling' },
  x_skeptic: { src: '/faces/x_skeptic.webp', mood: 'unconvinced' },
  x_whistle: { src: '/faces/x_whistle.webp', mood: 'innocent' },
  x_smug: { src: '/faces/x_smug.webp', mood: 'smug' },
  x_dizzy: { src: '/faces/x_dizzy.webp', mood: 'seeing stars' },
  g_grimace: { src: '/faces/g_grimace.webp', mood: 'being squeezed' },
  g_ouch: { src: '/faces/g_ouch.webp', mood: 'OW' },
  g_squish: { src: '/faces/g_squish.webp', mood: 'pinched' },
} as const;

export type FaceKey = keyof typeof faces;

/** Faces dealt at random when a stretch is let go. */
export const releaseFaces: FaceKey[] = ['x_tongue', 'x_laugh', 'x_skeptic', 'x_whistle', 'x_smug', 'x_cross'];

/**
 * Landmarks in image UV (0–1, v from the top) measured on the prepared faces.
 */
export const rig = {
  disc: { x: 0.5, y: 0.58, r: 0.41 },
  nose: { x: 0.505, y: 0.505, r: 0.04 },
  cheeks: [
    { x: 0.385, y: 0.53 },
    { x: 0.625, y: 0.53 },
  ],
  face: { x: 0.5, y: 0.51, rx: 0.175, ry: 0.23 },
  hairLine: 0.26,
  sides: 0.19,
};
