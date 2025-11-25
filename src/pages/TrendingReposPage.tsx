import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowUpDown, Star, ArrowLeft, ExternalLink } from 'lucide-react';
import { Repository } from '@/types';
import { repositoryService } from '@/services/repositoryService';
import { useFilterStore } from '@/store/filterStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { LoadingSpinner, LoadingCard } from '@/components/ui/Loading';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

export const TrendingReposPage: React.FC = () => {
  const navigate = useNavigate();
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { search, sortBy, sortDirection, setSearch, setSortBy, setSortDirection } = useFilterStore();

  useEffect(() => {
    fetchRepos();
  }, [sortBy, sortDirection]);

  const fetchRepos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await repositoryService.getTrendingRepos(sortBy, sortDirection);
      setRepos(data);
    } catch (err) {
      console.error('Fetch error:', err);
      const errorMessage = err instanceof Error 
        ? `${err.message}. Make sure backend is running on http://192.168.254.88:8080`
        : 'Failed to fetch repositories. Make sure backend is running on http://192.168.254.88:8080';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const filteredRepos = useMemo(() => {
    if (!search) return repos;

    const searchLower = search.toLowerCase();
    return repos.filter(
      (repo) =>
        repo.fullName.toLowerCase().includes(searchLower) ||
        repo.htmlUrl.toLowerCase().includes(searchLower)
    );
  }, [repos, search]);

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
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
          <ErrorMessage message={error} onRetry={fetchRepos} />
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
          <h1 className="text-4xl font-bold mb-2">Trending JavaScript Repositories</h1>
          <p className="text-muted-foreground">
            Discover the most popular JavaScript projects on GitHub
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search repositories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={toggleSortDirection}>
                <ArrowUpDown className="h-4 w-4 mr-2" />
                {sortDirection === 'desc' ? 'Desc' : 'Asc'}
              </Button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-4 text-sm text-muted-foreground">
          Showing {filteredRepos.length} {filteredRepos.length === 1 ? 'repository' : 'repositories'}
        </div>

        {/* Repository Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo) => (
            <Card key={repo.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{repo.fullName}</CardTitle>
                  </div>
                  <a
                    href={repo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{repo.stargazersCount.toLocaleString()}</span>
                  <span>stars</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRepos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No repositories found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};
