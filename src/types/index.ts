// GitHub Repository Types
export interface Repository {
  id: number;
  fullName: string;
  htmlUrl: string;
  stargazersCount: number;
}

// Dev.to Article Types
export interface Article {
  id: number;
  title: string;
  canonicalUrl: string;
  positiveReactionsCount: number;
  publishedAt: string;
}

// Filter and Sort Types
export type SortOption = 'stars' | 'reactions' | 'date';
export type SortDirection = 'asc' | 'desc';

export interface FilterState {
  search: string;
  sortBy: SortOption;
  sortDirection: SortDirection;
  selectedTags?: string[];
}
