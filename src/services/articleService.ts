import { Article } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://192.168.254.88:8080/api';

export const articleService = {
  async getTrendingArticles(search?: string, order: string = 'hotness'): Promise<Article[]> {
    try {
      let url = `${API_BASE_URL}/devto-articles`;
      const params = new URLSearchParams();
      
      if (search) {
        params.append('search', search);
      }
      if (order) {
        params.append('order', order);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch articles: ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching trending articles:', error);
      throw error;
    }
  },
};
