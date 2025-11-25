import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from '@/pages/LandingPage';
import { TrendingReposPage } from '@/pages/TrendingReposPage';
import { TrendingArticlesPage } from '@/pages/TrendingArticlesPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/repos" element={<TrendingReposPage />} />
        <Route path="/articles" element={<TrendingArticlesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
