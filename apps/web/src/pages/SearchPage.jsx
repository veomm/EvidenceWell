import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import { Search as SearchIcon, Loader2 } from 'lucide-react';

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(!!queryParam);

  const performSearch = async (searchTerm) => {
    if (!searchTerm) {
      setResults([]);
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await pb.collection('articles').getList(1, 24, {
        filter: `(title ~ "${searchTerm}" || content ~ "${searchTerm}") && status="published"`,
        expand: 'category,author',
        $autoCancel: false
      });
      setResults(res.items);
      setHasSearched(true);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (queryParam) {
      performSearch(queryParam);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  }, [queryParam]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim() });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{queryParam ? `Search: ${queryParam}` : 'Search'} | EvidenceWell</title>
      </Helmet>

      <Header />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mx-auto text-center mb-12">
             <h1 className="text-4xl font-serif font-bold text-foreground mb-8">Search the Database</h1>
             
             <form onSubmit={handleSearchSubmit} className="relative flex shadow-sm rounded-xl overflow-hidden border border-border focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <div className="flex-grow relative">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search articles, topics, keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-card text-lg outline-none"
                  />
                </div>
                <button type="submit" disabled={isLoading || !searchQuery.trim()} className="px-8 bg-foreground text-background font-bold hover:bg-foreground/90 disabled:opacity-50 transition-colors">
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
                </button>
             </form>
          </div>

          <div>
            {isLoading ? (
               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                 {Array(6).fill(0).map((_, i) => <div key={i} className="w-full h-96 bg-muted animate-pulse rounded-2xl" />)}
               </div>
            ) : hasSearched ? (
              <div className="mt-12 border-t border-border pt-8">
                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-8">
                  Showing results for "{queryParam}" <span className="text-foreground ml-2">({results.length})</span>
                </p>
                {results.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {results.map(article => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-muted/30 border border-border rounded-2xl p-16 text-center max-w-2xl mx-auto mt-8">
                    <SearchIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="text-2xl font-bold mb-2 text-foreground">No matches found</h3>
                    <p className="text-muted-foreground text-lg mb-6">We couldn't find any articles matching your exact search terms.</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setSearchParams({}); }}
                      className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-card px-8 text-sm font-semibold text-foreground hover:bg-muted"
                    >
                      Clear Search
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
          
        </div>
      </main>

      <Footer />
    </div>
  );
}