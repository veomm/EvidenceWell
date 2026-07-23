import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft } from 'lucide-react';

export default function ConcernArticlesPage() {
  const { slug } = useParams();
  const [concern, setConcern] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const concernRecord = await pb.collection('concerns').getFirstListItem(`slug="${slug}"`, { $autoCancel: false });
        setConcern(concernRecord);

        const articlesRes = await pb.collection('articles').getList(1, 24, {
          filter: `concerns ~ "${concernRecord.id}" && status="published"`,
          sort: '-created',
          expand: 'category,author',
          $autoCancel: false
        });
        setArticles(articlesRes.items);
      } catch (error) {
        console.error("Failed to load concern data", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
    window.scrollTo(0,0);
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{concern ? `${concern.name} Articles` : 'Concern'} | EvidenceWell</title>
      </Helmet>

      <Header />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/browse-by-concern" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Categories
          </Link>

          {isLoading ? (
            <div className="mb-16">
              <Skeleton className="h-12 w-64 mb-4" />
              <Skeleton className="h-6 w-full max-w-2xl" />
            </div>
          ) : concern ? (
            <div className="mb-16 pb-8 border-b border-border">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">{concern.name}</h1>
              <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
                {concern.description || `Explore the latest evidence-based research and clinical insights regarding ${concern.name.toLowerCase()}.`}
              </p>
            </div>
          ) : (
            <div className="mb-16">
               <h1 className="text-4xl font-serif font-bold">Category Not Found</h1>
            </div>
          )}

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
               <h3 className="text-xl font-bold text-foreground mb-2">No articles found</h3>
               <p className="text-muted-foreground">We are currently developing content for this specific concern.</p>
             </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}