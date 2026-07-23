import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';

export default function AllArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    async function fetchArticles() {
      setIsLoading(true);
      try {
        let filterStr = 'status="published"';
        if (activeFilter === 'research-simplified') {
          filterStr += ' && contentType="Research Simplified"';
        } else if (activeFilter === 'myth-vs-fact') {
          filterStr += ' && contentType="Myth vs Fact"';
        }

        const res = await pb.collection('articles').getList(1, 24, {
          filter: filterStr,
          sort: '-created',
          expand: 'category,author',
          $autoCancel: false
        });
        setArticles(res.items);
      } catch (error) {
        console.error("Failed to load articles", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticles();
  }, [activeFilter]);

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (article.excerpt && article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>All Articles | EvidenceWell</title>
        <meta name="description" content="Browse our complete library of evidence-based health research and clinical insights." />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Article Library</h1>
              <p className="text-lg text-muted-foreground">Explore our comprehensive archive of rigorous, peer-reviewed health insights.</p>
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Filter by keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg shadow-sm focus:border-primary outline-none transition-colors"
              />
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-12 border-b border-border pb-6">
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground mr-4 uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4" /> Filter
            </div>
            {['all', 'research-simplified', 'myth-vs-fact'].map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {filter.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>

          {/* Results */}
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => <Skeleton key={i} className="w-full h-96 rounded-2xl" />)}
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-card border border-border rounded-2xl">
              <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
                className="mt-6 text-primary font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}