import { Repository } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://192.168.254.88:8080/api';

export const repositoryService = {
  async getTrendingRepos(sortBy: string = 'stars', order: string = 'desc'): Promise<Repository[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/github-repos?search=${sortBy}&order=${order}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching trending repos:', error);
      throw error;
    }
  },
};
