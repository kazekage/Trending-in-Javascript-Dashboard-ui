import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, BookOpen, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <TrendingUp className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight pb-2">
            Trending in JavaScript
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the latest trends in JavaScript development. Explore trending repositories
            and articles from the developer community.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in">
            <CardHeader className="h-48">
              <div className="flex items-center justify-center mb-4">
                <Github className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-center">Trending JS Repos</CardTitle>
              <CardDescription className="text-center">
                Explore the most popular JavaScript repositories on GitHub
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                size="lg"
                onClick={() => navigate('/repos')}
              >
                View Trending Repositories
              </Button>
              <div className="mt-4 text-sm text-muted-foreground text-center">
                <p>Browse, filter, and discover trending JavaScript projects</p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 animate-fade-in">
            <CardHeader className="h-48">
              <div className="flex items-center justify-center mb-4">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
              <CardTitle className="text-center">Trending JS Articles</CardTitle>
              <CardDescription className="text-center">
                Read the latest developer articles from Dev.to
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                className="w-full"
                size="lg"
                onClick={() => navigate('/articles')}
              >
                View Trending Articles
              </Button>
              <div className="mt-4 text-sm text-muted-foreground text-center">
                <p>Stay updated with the latest JavaScript insights and tutorials</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>Real-time data from GitHub and Dev.to APIs</p>
        </div>
      </div>
    </div>
  );
};
