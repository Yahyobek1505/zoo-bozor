export const ZooColors = {
  // Figma exact colors
  navyDark: '#0E1424',       // Deep navy blue used in headers, bottom bar, primary buttons
  navyCard: '#1B2544',       // Header card background
  navyLight: '#263352',      // Secondary navy elements, user chat bubbles
  neonLime: '#D2FF00',       // Vibrant neon lime accent (active pills, badges, CTA)
  neonLimeDark: '#A8CC00',
  aksiyaRed: '#FF1E1E',       // Red AKSIYA sale badge
  starYellow: '#FBBF24',     // Rating stars
  
  // Aliases for components
  primary: '#16A34A',
  primaryDark: '#0E1424',
  primaryLight: '#DCFCE7',
  dark: '#0E1424',
  darkSecondary: '#334155',
  gray: '#64748B',
  grayLight: '#F1F5F9',
  danger: '#EF4444',

  // Grayscale and UI
  background: '#F8FAFC',
  cardBackground: '#FFFFFF',
  border: '#EAECEF',
  textDark: '#0E1424',
  textMuted: '#64748B',
  textSub: '#94A3B8',
  white: '#FFFFFF',

  // Status badges
  savedRibbon: '#0E1424',
  activeRibbon: '#D2FF00',
  badgeGreen: '#10B981',
};

export const UZBEKISTAN_REGIONS = [
  'Toshkent',
  'Samarqand',
  'Buxoro',
  'Qo\'qon',
  'Fargʻona',
  'Andijon',
  'Namangan',
  'Qashqadaryo',
  'Xorazm',
];

export const CATEGORIES_DATA = [
  { id: 'all', name: 'Barchasi', icon: 'paw', count: 1840, color: '#16A34A' },
  { id: 'cats', name: 'Mushug', icon: 'cat', count: 520, color: '#F97316' },
  { id: 'dogs', name: 'Kuchug', icon: 'dog', count: 480, color: '#3B82F6' },
  { id: 'birds', name: 'Qush', icon: 'bird', count: 210, color: '#8B5CF6' },
  { id: 'poultry', name: 'Parranda', icon: 'feather', count: 95, color: '#EC4899' },
  { id: 'livestock', name: 'Chorva', icon: 'cow', count: 340, color: '#10B981' },
] as const;

export const CATEGORIES_AVATARS = [
  {
    id: 'cats',
    name: 'Mushug',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200',
  },
  {
    id: 'dogs',
    name: 'Kuchug',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=200',
  },
  {
    id: 'birds',
    name: 'Qush',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?q=80&w=200',
  },
  {
    id: 'poultry',
    name: 'Parranda',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=200',
  },
  {
    id: 'livestock',
    name: 'Chorva',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=200',
  },
] as const;
