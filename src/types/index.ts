export type PetCategory = 
  | 'all'
  | 'cats' 
  | 'dogs' 
  | 'birds' 
  | 'fish' 
  | 'rodents' 
  | 'food' 
  | 'accessories' 
  | 'veterinary';

export type AnimalGender = 'male' | 'female' | 'unknown';

export interface LocationInfo {
  region: string;
  district?: string;
}

export interface SellerInfo {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  rating: number;
  reviewsCount: number;
  joinedDate: string;
  isVerified: boolean;
  type: 'individual' | 'breeder' | 'petshop' | 'shelter';
}

export interface Listing {
  id: string;
  title: string;
  category: PetCategory;
  categoryName: string;
  breed?: string;
  age?: string; // e.g. "3 oylik", "1.5 yosh"
  gender?: AnimalGender;
  price: number;
  currency: 'UZS' | 'USD';
  isFree?: boolean; // Tekinga berish / Asrab olish
  isNegotiable?: boolean; // Kelishiladi
  isUrgent?: boolean; // Shoshilinch
  isVaccinated?: boolean; // Vaksina qilingan
  hasPassport?: boolean; // Vet-pasporti mavjud
  isSterilized?: boolean; // Bichilgan
  location: LocationInfo;
  images: string[];
  description: string;
  seller: SellerInfo;
  createdAt: string;
  viewsCount: number;
  favoritesCount: number;
  status: 'active' | 'sold' | 'archived' | 'pending';
}

export interface CategoryItem {
  id: PetCategory;
  name: string;
  icon: string;
  count: number;
  color: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface ChatThread {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  listingPrice: number;
  listingCurrency: 'UZS' | 'USD';
  otherUser: {
    id: string;
    name: string;
    avatar?: string;
    isOnline?: boolean;
  };
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface FilterState {
  category: PetCategory;
  searchQuery: string;
  minPrice?: number;
  maxPrice?: number;
  region?: string;
  breed?: string;
  gender?: AnimalGender;
  isVaccinated?: boolean;
  hasPassport?: boolean;
  isFree?: boolean;
  isUrgent?: boolean;
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'popular';
}
