import { create } from 'zustand';
import { FilterState, Listing, PetCategory } from '@/types';
import { MOCK_LISTINGS } from '@/data/mockListings';

interface ListingStore {
  listings: Listing[];
  favorites: string[]; // listing IDs
  filters: FilterState;
  
  // Actions
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  setFilters: (newFilters: Partial<FilterState>) => void;
  resetFilters: () => void;
  addListing: (listing: Listing) => void;
  getFilteredListings: () => Listing[];
  getListingById: (id: string) => Listing | undefined;
}

const initialFilters: FilterState = {
  category: 'all',
  searchQuery: '',
  region: 'Barcha hududlar',
  sortBy: 'newest',
};

export const useListingStore = create<ListingStore>((set, get) => ({
  listings: MOCK_LISTINGS,
  favorites: ['zoo-1', 'zoo-3'],
  filters: initialFilters,

  toggleFavorite: (id: string) => {
    set((state) => {
      const exists = state.favorites.includes(id);
      return {
        favorites: exists
          ? state.favorites.filter((favId) => favId !== id)
          : [...state.favorites, id],
      };
    });
  },

  isFavorite: (id: string) => {
    return get().favorites.includes(id);
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }));
  },

  resetFilters: () => {
    set({ filters: initialFilters });
  },

  addListing: (newListing) => {
    set((state) => ({
      listings: [newListing, ...state.listings],
    }));
  },

  getListingById: (id: string) => {
    return get().listings.find((item) => item.id === id);
  },

  getFilteredListings: () => {
    const { listings, filters } = get();
    return listings.filter((item) => {
      // Category filter
      if (filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }
      // Region filter
      if (filters.region && filters.region !== 'Barcha hududlar' && item.location.region !== filters.region) {
        return false;
      }
      // Search query
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchBreed = item.breed?.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc && !matchBreed) return false;
      }
      // Free filter
      if (filters.isFree && !item.isFree) {
        return false;
      }
      // Vaccinated filter
      if (filters.isVaccinated && !item.isVaccinated) {
        return false;
      }
      // Passport filter
      if (filters.hasPassport && !item.hasPassport) {
        return false;
      }
      // Price range
      if (filters.minPrice !== undefined && item.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && item.price > filters.maxPrice) {
        return false;
      }
      return true;
    });
  },
}));
