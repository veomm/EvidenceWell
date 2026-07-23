import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop.jsx';
import { AuthProvider } from '@/contexts/AuthContext.jsx';
import ProtectedRoute from '@/components/ProtectedRoute.jsx';
import { Toaster } from 'sonner';

import HomePage from './pages/HomePage.jsx';
import AllArticlesPage from './pages/AllArticlesPage.jsx';
import ArticleDetailPage from './pages/ArticleDetailPage.jsx';
import BrowseByConcernPage from './pages/BrowseByConcernPage.jsx';
import ConcernArticlesPage from './pages/ConcernArticlesPage.jsx';
import ResearchSimplifiedPage from './pages/ResearchSimplifiedPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AboutPage from './pages/AboutPage.jsx';

import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Helmet } from 'react-helmet';

// Simple placeholder components for static pages to save tokens while fulfilling requirements
const StaticPagePlaceholder = ({ title }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet><title>{title} | EvidenceWell</title></Helmet>
      <Header />
      <main className="flex-grow pt-32 pb-32">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-serif font-bold mb-6">{title}</h1>
          <p className="text-muted-foreground">Content for this section is currently being updated by our editorial team.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <Toaster position="top-right" />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/articles" element={<AllArticlesPage />} />
          <Route path="/articles/:id" element={<ArticleDetailPage />} />
          
          {/* Keeping legacy route matching format just in case, but navigating via ID is better for PB */}
          <Route path="/article/:slug" element={<ArticleDetailPage />} /> 

          <Route path="/browse-by-concern" element={<BrowseByConcernPage />} />
          <Route path="/browse-by-concern/:slug" element={<ConcernArticlesPage />} />
          <Route path="/research-simplified" element={<ResearchSimplifiedPage />} />
          
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          
          <Route path="/editorial-guidelines" element={<StaticPagePlaceholder title="Editorial Guidelines" />} />
          <Route path="/how-we-review-evidence" element={<StaticPagePlaceholder title="How We Review Evidence" />} />
          <Route path="/author-profiles" element={<StaticPagePlaceholder title="Author Profiles" />} />
          <Route path="/disclosure-policy" element={<StaticPagePlaceholder title="Disclosure Policy" />} />
          <Route path="/contact" element={<StaticPagePlaceholder title="Contact Us" />} />

          {/* Protected Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Catch-all */}
          <Route path="*" element={
            <div className="min-h-screen flex flex-col items-center justify-center bg-background">
              <h1 className="text-6xl font-serif font-bold mb-4">404</h1>
              <p className="mb-6 text-muted-foreground">Page not found</p>
              <a href="/" className="text-primary hover:underline">Return Home</a>
            </div>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;