export interface FigmaAnimalListing {
  id: string;
  name: string;
  category: 'cats' | 'dogs' | 'birds' | 'poultry' | 'livestock';
  price: number;
  formattedPrice: string;
  rating: number;
  views: string;
  image: string;
  isVip?: boolean; // Yellow lightning
  hasAksiya?: boolean; // Red AKSIYA badge
  isSaved?: boolean;
  age?: string;
  gender?: string;
  color?: string;
  weight?: string;
  health?: string;
  passport?: string;
  medicalCheck?: string;
  delivery?: string;
  bonus?: string;
  description?: string;
  sellerTag?: string;
}

export interface FigmaProductListing {
  id: string;
  title: string;
  weight: string;
  price: number;
  formattedPrice: string;
  oldPrice?: string;
  discount?: string;
  hasAksiya?: boolean;
  rating: number;
  stockCount: string;
  image: string;
  isSaved?: boolean;
  description?: string;
}

export const FIGMA_ANIMALS: FigmaAnimalListing[] = [
  {
    id: 'f-1',
    name: 'Jako',
    category: 'birds',
    price: 8900000,
    formattedPrice: '8.900.000 uzs',
    rating: 3.5,
    views: '1.122K',
    image: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?q=80&w=600',
    isVip: true,
    hasAksiya: true,
    isSaved: false,
    age: '1 yosh',
    gender: 'Erkak',
    color: 'Kulrang',
    weight: '450 gr',
    health: 'Sog\'lom',
    passport: 'Bor',
    medicalCheck: 'Emlangan',
    delivery: 'Mavjud',
    bonus: 'Katta qafas tekin',
    description: 'Gapiradigan aqlli Jako to\'tiqushi. Bir necha so\'zlarni aytadi, qo\'lga o\'rgatilgan.',
    sellerTag: 'thalipof',
  },
  {
    id: 'f-2',
    name: 'Britanka',
    category: 'cats',
    price: 980000,
    formattedPrice: '980.000 uzs',
    rating: 3.5,
    views: '1.122K',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600',
    isVip: true,
    hasAksiya: false,
    isSaved: true,
    age: '9 Oylik',
    gender: 'Qiz',
    color: 'Kul rang',
    weight: '5.5 kg',
    health: 'Sog\'lom',
    passport: 'Bor',
    medicalCheck: 'Emlangan',
    delivery: 'Yo\'q',
    bonus: 'Bor',
    description: 'Britan mushugim juda aqilliy yuvosh o\'yinqaroq odamga juda mehribon bolalarni bilan tez qil topishadi yoqimtoy judayam.',
    sellerTag: 'thalipof',
  },
  {
    id: 'f-3',
    name: 'Xatiko',
    category: 'dogs',
    price: 980000,
    formattedPrice: '980.000 uzs',
    rating: 3.5,
    views: '1.122K',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=600',
    isVip: true,
    hasAksiya: false,
    isSaved: false,
    age: '4 oylik',
    gender: 'Erkak',
    color: 'Oq-qora',
    weight: '12 kg',
    health: 'A\'lo',
    passport: 'Bor',
    medicalCheck: 'Emlangan',
    description: 'Moviy ko\'zli xaski kuchukchasi. O\'ynoqi va bolajon.',
    sellerTag: 'thalipof',
  },
  {
    id: 'f-4',
    name: 'Britanka',
    category: 'livestock',
    price: 980000,
    formattedPrice: '980.000 uzs',
    rating: 3.5,
    views: '1.122K',
    image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?q=80&w=600',
    isVip: false,
    isSaved: true,
    age: '2 yosh',
    gender: 'Urg\'ochi',
    color: 'To\'riq',
    weight: '400 kg',
    health: 'Sog\'lom',
    passport: 'Bor',
    medicalCheck: 'Tekshirilgan',
    description: 'Zotdor ot, yurishi juda yumshoq va chiroyli.',
  },
  {
    id: 'f-5',
    name: 'Karlik',
    category: 'cats',
    price: 980000,
    formattedPrice: '980.000 uzs',
    rating: 3.5,
    views: '1.122K',
    image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=600',
    isVip: false,
    isSaved: false,
    age: '2 oylik',
    gender: 'Erkak',
    color: 'Oq-kulrang',
    weight: '800 gr',
    health: 'Sog\'lom',
    passport: 'Yo\'q',
    medicalCheck: 'Emlangan',
    description: 'Kichkina Karlik quyonchasi. Uyda boqish uchun juda qulay.',
  },
  {
    id: 'f-6',
    name: 'Britanka',
    category: 'livestock',
    price: 980000,
    formattedPrice: '980.000 uzs',
    rating: 3.5,
    views: '1.122K',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?q=80&w=600',
    isVip: true,
    isSaved: true,
    age: '1 yosh',
    gender: 'Erkak',
    color: 'Qo\'ng\'ir',
    weight: '180 kg',
    health: 'Sog\'lom',
    passport: 'Bor',
    medicalCheck: 'Emlangan',
    description: 'Yosh g\'unajin, toza parvarish qilingan.',
  },
  {
    id: 'f-7',
    name: 'Karlik',
    category: 'livestock',
    price: 980000,
    formattedPrice: '980.000 uzs',
    rating: 3.5,
    views: '1.122K',
    image: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?q=80&w=600',
    isVip: false,
    isSaved: false,
    age: '3 oylik',
    gender: 'Qo\'zi',
    color: 'Oq',
    weight: '15 kg',
    health: 'Sog\'lom',
    description: 'Qo\'zichoq, sog\'lom va o\'ynoqi.',
  },
  {
    id: 'f-8',
    name: 'Britanka',
    category: 'poultry',
    price: 980000,
    formattedPrice: '980.000 uzs',
    rating: 3.5,
    views: '1.122K',
    image: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=600',
    isVip: true,
    isSaved: true,
    age: '6 oylik',
    gender: 'Erkak',
    color: 'Oq',
    weight: '4 kg',
    health: 'Sog\'lom',
    description: 'Katta oq g\'oz, parvarishlangan.',
  },
];

export const FIGMA_PRODUCTS: FigmaProductListing[] = [
  {
    id: 'fp-1',
    title: 'Whiskas',
    weight: '45 gr',
    price: 58000,
    formattedPrice: '58.000 uzs',
    oldPrice: '67.000',
    discount: '12%',
    hasAksiya: true,
    rating: 7.9,
    stockCount: '12 Mahsulot',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=600',
    isSaved: true,
    description: 'Tabiiy go\'sht tarkibi: Mushuklar uchun zarur bo\'lgan sifatli oqsil manbai. Mushugingizning mushak tizimini va umumiy jismoniy holatini mustahkamlaydi.',
  },
  {
    id: 'fp-2',
    title: 'Myau',
    weight: '50 gr',
    price: 10000,
    formattedPrice: '10.000 uzs',
    oldPrice: '15.000',
    discount: '18%',
    hasAksiya: true,
    rating: 3.5,
    stockCount: '1.1k Mahsulot',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=600',
    isSaved: true,
    description: 'Sousdagi go\'shtli bo\'laklar, barcha yoshdagi mushuklar uchun.',
  },
  {
    id: 'fp-3',
    title: 'Whiskas',
    weight: '45 gr',
    price: 89000,
    formattedPrice: '89.000 uzs',
    oldPrice: '95.000',
    hasAksiya: true,
    rating: 7.9,
    stockCount: '12 Mahsulot',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=600',
    isSaved: false,
    description: 'Katta ozuqa paketi, quruq vitaminli donachalar bilan.',
  },
  {
    id: 'fp-4',
    title: 'Kittix',
    weight: '50 gr',
    price: 12000,
    formattedPrice: '12.000 uzs',
    oldPrice: '15.000',
    rating: 3.5,
    stockCount: '1.1k Mahsulot',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=600',
    isSaved: false,
    description: 'Kittix vitaminli quruq pishiriqlar.',
  },
  {
    id: 'fp-5',
    title: 'Catmak',
    weight: '45 gr',
    price: 15000,
    formattedPrice: '15.000 uzs',
    hasAksiya: true,
    rating: 7.9,
    stockCount: '12 Mahsulot',
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=600',
    isSaved: true,
    description: '100% tabiiy ingredientlar asosidagi sifatli ozuqa.',
  },
  {
    id: 'fp-6',
    title: 'Kitekat',
    weight: '50 gr',
    price: 49000,
    formattedPrice: '49.000 uzs',
    rating: 3.5,
    stockCount: '1.1k Mahsulot',
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?q=80&w=600',
    isSaved: false,
    description: 'Kitekat ozuqasi, energiya va kuch baxsh etadi.',
  },
];
