import { create } from 'zustand';
import { FilterState, SortDirection, SortOption } from '@/types';

interface FilterStore extends FilterState {
  setSearch: (search: string) => void;
  setSortBy: (sortBy: SortOption) => void;
  setSortDirection: (direction: SortDirection) => void;
  setSelectedTags: (tags: string[]) => void;
  resetFilters: () => void;
}

const initialState: FilterState = {
  search: '',
  sortBy: 'stars',
  sortDirection: 'desc',
  selectedTags: [],
};

export const useFilterStore = create<FilterStore>((set) => ({
  ...initialState,
  setSearch: (search) => set({ search }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortDirection: (direction) => set({ sortDirection: direction }),
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  resetFilters: () => set(initialState),
}));
