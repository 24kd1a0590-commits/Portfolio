export const profile = {
  name: 'Ethakoti Prathyusha',
  title: 'Software Developer | Computer Science Engineering Student',
  primaryIdentity: 'Software Developer',
  email: 'ethakotiprathyusha@gmail.com',
  phone: '9949983545',
  github: 'https://github.com/24kd1a0590-commits',
  linkedin: 'https://www.linkedin.com/in/ethakoti-prathyusha-891072392/',
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export const stats = [
  { value: 9.53, suffix: '', label: 'CGPA' },
  { value: 106, suffix: '+', label: 'LeetCode Problems' },
  { value: 5, suffix: '+', label: 'Hackathons' },
  { value: 3, suffix: '', label: 'Featured Projects' },
];

export const counterMoment = [
  { value: 106, suffix: '+', label: 'Problems Solved' },
  { value: 5, suffix: '+', label: 'Hackathons' },
  { value: 'TOP 50', label: 'SIH', isText: true },
  { value: 9.53, suffix: '', label: 'CGPA' },
];

export const aboutChips = ['Java', 'Python', 'C', 'JavaScript', 'React.js', 'Django'];

export const skillGroups = [
  {
    title: 'Programming',
    icon: 'Code2',
    skills: ['Java', 'Python', 'C', 'JavaScript'],
  },
  {
    title: 'Web Development',
    icon: 'Globe',
    skills: ['HTML', 'CSS', 'React.js', 'Django'],
  },
  {
    title: 'Data Structures & Algorithms',
    icon: 'Binary',
    skills: ['Arrays', 'Strings', 'Hashing', 'Two Pointers', 'Sliding Window', 'Prefix Sum', 'Binary Search', 'Linked Lists'],
  },
  {
    title: 'Libraries & Technologies',
    icon: 'Boxes',
    skills: ['NumPy', 'OpenCV', 'Ultralytics YOLOv8', 'Leaflet.js', 'Chart.js'],
  },
  {
    title: 'Tools',
    icon: 'Wrench',
    skills: ['Git', 'GitHub', 'Visual Studio Code'],
  },
  {
    title: 'APIs & Technologies',
    icon: 'Network',
    skills: ['Geolocation API', 'OpenStreetMap', 'Local Storage'],
  },
];

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  technologies: string[];
  achievement?: string;
  github?: string;
  visual: 'travelmate' | 'routenova' | 'mediq';
  accent: string;
};

export const projects: Project[] = [
  {
    id: 'travelmate',
    title: 'TravelMate',
    subtitle: 'Your Smart Travel Companion',
    description:
      'TravelMate is a smart travel companion designed to help users plan journeys, track trips, manage travel expenses, and generate automated travel summaries.',
    features: [
      'Journey tracking',
      'Travel planning',
      'GPS-based location tracking',
      'Route visualization',
      'Expense management',
      'Budget analytics',
      'Automated travel summaries',
      'Live location sharing',
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Leaflet.js', 'Chart.js', 'Geolocation API'],
    achievement: 'Selected among the Top 50 teams in the college-level round of Smart India Hackathon.',
    github: 'https://github.com/24kd1a0590-commits',
    visual: 'travelmate',
    accent: '#6366f1',
  },
  {
    id: 'routenova',
    title: 'RouteNova',
    subtitle: 'Smart Rural Logistics Platform',
    description:
      'RouteNova is a web-based platform focused on rural last-mile delivery planning and unused vehicle-capacity matching.',
    features: [
      'Rural delivery planning',
      'Route visualization',
      'Location tracking',
      'Vehicle-capacity matching',
      'Bundle-based load matching',
      'QR-based delivery verification',
      'Driver-shipper workflows',
    ],
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'Leaflet.js', 'OpenStreetMap', 'QRCode.js'],
    achievement: 'Presented at the 48-hour HackTriad 2.0 at LNIT Summit.',
    github: 'https://github.com/24kd1a0590-commits',
    visual: 'routenova',
    accent: '#06b6d4',
  },
  {
    id: 'mediq',
    title: 'MediQ',
    subtitle: 'Smart Pre-Arrival Queue Management System',
    description:
      'MediQ is a computer-vision application designed for queue-size estimation and pre-arrival crowd monitoring.',
    features: [
      'Real-time person detection',
      'Crowd estimation',
      'Queue monitoring',
      'Video-frame processing',
      'Congestion monitoring',
    ],
    technologies: ['Python', 'OpenCV', 'Ultralytics YOLOv8', 'Computer Vision'],
    github: 'https://github.com/24kd1a0590-commits',
    visual: 'mediq',
    accent: '#818cf8',
  },
];

export const dsaConcepts = ['Arrays', 'Strings', 'Hashing', 'Two Pointers', 'Sliding Window', 'Prefix Sum', 'Binary Search', 'Linked Lists'];

export const achievements = [
  {
    rank: 'TOP 50',
    event: 'College-level Smart India Hackathon',
    project: 'TravelMate',
    description: 'Selected among the Top 50 teams in the college-level round of Smart India Hackathon with TravelMate.',
    isHighlight: true,
  },
  {
    rank: 'LEVEL 2',
    event: 'SparkNation Hackathon',
    project: 'Andhra University CodeIAM',
    description: 'Reached Level 2 in the SparkNation Hackathon at Andhra University CodeIAM.',
    isHighlight: false,
  },
  {
    rank: '48 HOURS',
    event: 'HackTriad 2.0',
    project: 'LNIT Summit',
    description: 'Presented RouteNova at the 48-hour HackTriad 2.0 hackathon at LNIT Summit.',
    isHighlight: false,
  },
];

export const certifications = [
  {
    title: 'Full Stack Development MasterClass',
    issuer: 'NoviTech R&D Pvt. Ltd.',
    year: '2026',
  icon: 'Layers',
  gradient: 'from-indigo-500/20 to-blue-500/10',
  border: 'border-indigo-400/30',
  glow: 'shadow-indigo-500/10',
  badge: 'from-indigo-400 to-blue-400',
  description: 'Comprehensive full stack development training covering modern web application architecture and engineering practices.',
  skills: ['Full Stack', 'Web Development', 'Architecture'],
  credentialId: 'FSD-MC-2026',
  certificateUrl: '#',
  featured: true,
  category: 'Development'
  },
  {
    title: 'AI-ML Virtual Internship',
    issuer: 'Eduskills',
    year: '2025',
    icon: 'BrainCircuit',
    gradient: 'from-violet-500/20 to-indigo-500/10',
    border: 'border-violet-400/30',
    glow: 'shadow-violet-500/10',
    badge: 'from-violet-400 to-indigo-400',
    description: 'AICTE-supported virtual internship in Artificial Intelligence and Machine Learning fundamentals and applications.',
    skills: ['AI', 'Machine Learning', 'Virtual Internship'],
    credentialId: 'AIML-VI-2025',
    certificateUrl: '#',
    featured: true,
    category: 'AI/ML'
  },
  {
    title: 'AWS Generative AI Cohort',
    issuer: 'AWS / Eduskills',
    year: '2025',
    icon: 'Cloud',
    gradient: 'from-cyan-500/20 to-blue-500/10',
    border: 'border-cyan-400/30',
    glow: 'shadow-cyan-500/10',
    badge: 'from-cyan-400 to-blue-400',
    description: 'Cohort-based learning program on AWS Generative AI services and practical generative AI application building.',
    skills: ['AWS', 'Generative AI', 'Cloud'],
    credentialId: 'AWS-GAI-2025',
    certificateUrl: '#',
    featured: false,
    category: 'Cloud AI'
  },
  {
    title: 'Android Developer Cohort',
    issuer: 'Google / Eduskills',
    year: '2025',
    icon: 'Smartphone',
    gradient: 'from-emerald-500/20 to-cyan-500/10',
    border: 'border-emerald-400/30',
    glow: 'shadow-emerald-500/10',
    badge: 'from-emerald-400 to-cyan-400',
    description: 'Google-sponsored cohort focused on Android application development fundamentals and modern mobile engineering.',
    skills: ['Android', 'Mobile', 'Java'],
    credentialId: 'AD-COHORT-2025',
    certificateUrl: '#',
    featured: false,
    category: 'Mobile'
  },
  {
    title: 'Cybersecurity Cohort',
    issuer: 'Palo Alto Networks / Eduskills',
    year: '2025',
    icon: 'ShieldCheck',
    gradient: 'from-amber-500/20 to-orange-500/10',
    border: 'border-amber-400/30',
    glow: 'shadow-amber-500/10',
    badge: 'from-amber-400 to-orange-400',
    description: 'Cybersecurity fundamentals cohort by Palo Alto Networks covering threat analysis and security best practices.',
    skills: ['Security', 'Threat Analysis', 'Networking'],
    credentialId: 'CYBER-COHORT-2025',
    certificateUrl: '#',
    featured: false,
    category: 'Security'
  },
  {
    title: 'NPTEL IoT',
    issuer: 'NPTEL',
    year: '2024',
    icon: 'Cpu',
    gradient: 'from-sky-500/20 to-indigo-500/10',
    border: 'border-sky-400/30',
    glow: 'shadow-sky-500/10',
    badge: 'from-sky-400 to-indigo-400',
    description: 'Internet of Things certification with Silver Elite grade, achieving 75% in the NPTEL IoT course.',
    skills: ['IoT', 'Embedded', 'Networking'],
    credentialId: 'NPTEL-IOT-2024',
    certificateUrl: '#',
    featured: true,
    category: 'IoT'
  },
  {
    title: 'NPTEL Data Analytics with Python',
    issuer: 'NPTEL',
    year: '2024',
    icon: 'BarChart3',
    gradient: 'from-teal-500/20 to-cyan-500/10',
    border: 'border-teal-400/30',
    glow: 'shadow-teal-500/10',
    badge: 'from-teal-400 to-cyan-400',
    description: 'Data Analytics with Python certification from NPTEL with Silver Elite grade for analytical proficiency.',
    skills: ['Data Analytics', 'Python', 'Statistics'],
    credentialId: 'NPTEL-DA-2024',
    certificateUrl: '#',
    featured: false,
    category: 'Data'
  },
];

export const education = [
  {
    period: '2024 – Present',
    institution: 'Lendi Institute of Engineering and Technology',
    degree: 'B.Tech Computer Science and Engineering',
    detail: 'CGPA: 9.53/10',
    location: 'Vizianagaram, Andhra Pradesh',
  },
  {
    period: '2023 – 2024',
    institution: 'Jawahar Navodaya Vidyalaya, Chittoor',
    degree: 'Higher Secondary Education',
    detail: '93%',
    location: 'Andhra Pradesh',
  },
  {
    period: '2021 – 2022',
    institution: 'Jawahar Navodaya Vidyalaya, Chittoor',
    degree: 'Secondary School Education',
    detail: '94.8%',
    location: 'Andhra Pradesh',
  },
];
