import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { BookOpen } from 'lucide-react';

export default function ResearchSimplifiedPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      setIsLoading(true);
      try {
        const res = await pb.collection('articles').getList(1, 24, {
          filter: 'status="published" && contentType="Research Simplified"',
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
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Research Simplified | EvidenceWell</title>
        <meta name="description" content="Deep dives into pivotal clinical trials, translating dense methodology into understandable conclusions." />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16 bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Research Simplified</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We translate dense clinical methodology into clear, actionable intelligence. Explore our library of in-depth reviews focused on pivotal, peer-reviewed studies.
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, i) => <Skeleton key={i} className="w-full h-96 rounded-2xl" />)}
            </div>
          ) : articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map(article => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-card border border-border rounded-2xl">
              <h3 className="text-xl font-bold text-foreground mb-2">Check back soon</h3>
              <p className="text-muted-foreground">Our editorial team is currently preparing new Research Simplified content.</p>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}