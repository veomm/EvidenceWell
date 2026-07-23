import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ConcernCard from '@/components/ConcernCard.jsx';
import { Skeleton } from '@/components/ui/skeleton';

export default function BrowseByConcernPage() {
  const [concerns, setConcerns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [articleCounts, setArticleCounts] = useState({});

  useEffect(() => {
    async function fetchConcerns() {
      setIsLoading(true);
      try {
        const concernsRes = await pb.collection('concerns').getList(1, 50, {
          sort: 'displayOrder',
          $autoCancel: false
        });
        setConcerns(concernsRes.items);
        
        // Fetch approximate counts (in a real app, you might use an endpoint or optimized query)
        const counts = {};
        for (const concern of concernsRes.items) {
           const countRes = await pb.collection('articles').getList(1, 1, {
             filter: `concerns ~ "${concern.id}" && status="published"`,
             $autoCancel: false
           });
           counts[concern.id] = countRes.totalItems;
        }
        setArticleCounts(counts);
        
      } catch (error) {
        console.error("Failed to load concerns", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchConcerns();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>Browse by Concern | EvidenceWell</title>
        <meta name="description" content="Find evidence-based protocols organized by specific health goals." />
      </Helmet>

      <Header />

      <main className="flex-grow pt-32 pb-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
             <span className="text-sm font-bold tracking-widest text-primary uppercase mb-4 block">Organization</span>
             <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">Browse by Concern</h1>
             <p className="text-lg text-muted-foreground leading-relaxed">
               Navigate our clinical research database based on physiological systems and specific health outcomes. Select a topic below to view related evidence.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              Array(12).fill(0).map((_, i) => <Skeleton key={i} className="w-full h-56 rounded-2xl" />)
            ) : (
              concerns.map(concern => (
                <ConcernCard 
                  key={concern.id} 
                  concern={concern} 
                  articleCount={articleCounts[concern.id] || 0} 
                />
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}