import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Heart, ArrowLeft, ExternalLink } from 'lucide-react';
import { Article } from '@/types';
import { articleService } from '@/services/articleService';
import { useFilterStore } from '@/store/filterStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LoadingSpinner, LoadingCard } from '@/components/ui/Loading';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

export const TrendingArticlesPage: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTag, setSearchTag] = useState('');
  
  const { search, setSearch } = useFilterStore();

  useEffect(() => {
    fetchArticles();
  }, [searchTag]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await articleService.getTrendingArticles(searchTag || undefined);
      setArticles(data);
    } catch (err) {
      console.error('Fetch error:', err);
      const errorMessage = err instanceof Error 
        ? `${err.message}. Make sure backend is running on http://192.168.254.88:8080`
        : 'Failed to fetch articles. Make sure backend is running on http://192.168.254.88:8080';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = useMemo(() => {
    if (!search) return articles;

    const searchLower = search.toLowerCase();
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(searchLower) ||
        article.canonicalUrl.toLowerCase().includes(searchLower)
    );
  }, [articles, search]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleSearchTagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchTag(search);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </div>
          <LoadingSpinner className="mt-20" size="lg" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[...Array(6)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </div>
          <ErrorMessage message={error} onRetry={fetchArticles} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
          <h1 className="text-4xl font-bold mb-2">Trending JavaScript Articles</h1>
          <p className="text-muted-foreground">
            Read the latest developer articles from Dev.to
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <form onSubmit={handleSearchTagSubmit} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by tag (e.g., javascript, webdev) and press Enter..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button type="submit" variant="default">
              Search by Tag
            </Button>
          </form>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow duration-300 flex flex-col">
              <CardHeader className="flex-grow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2 mb-2">{article.title}</CardTitle>
                  </div>
                  <a
                    href={article.canonicalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 ml-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 fill-red-400 text-red-400" />
                    <span className="font-semibold">{article.positiveReactionsCount}</span>
                  </div>
                  <div className="text-xs ml-auto">
                    {formatDate(article.publishedAt)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};
