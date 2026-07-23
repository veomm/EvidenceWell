import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoryPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchCategoryData() {
      setIsLoading(true);
      try {
        const cat = await pb.collection('categories').getFirstListItem(`slug="${slug}"`, { $autoCancel: false });
        setCategory(cat);

        const arts = await pb.collection('articles').getList(1, 20, {
          filter: `category="${cat.id}" && status="published"`,
          sort: '-created',
          expand: 'category,author',
          $autoCancel: false
        });
        setArticles(arts.items);
      } catch (error) {
        console.error("Error fetching category", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCategoryData();
  }, [slug]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="bg-secondary text-secondary-foreground py-24 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
            {isLoading ? (
              <>
                <Skeleton className="h-12 w-1/2 mx-auto mb-6 bg-secondary-foreground/10" />
                <Skeleton className="h-6 w-3/4 mx-auto bg-secondary-foreground/10" />
              </>
            ) : category ? (
              <>
                <div className="text-6xl mb-6">{category.icon}</div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">{category.name}</h1>
                <p className="text-lg opacity-80 leading-relaxed">
                  {category.description || `Explore the latest evidence-based research and clinical insights on ${category.name.toLowerCase()}.`}
                </p>
              </>
            ) : (
              <h1 className="text-4xl font-serif font-bold">Category not found</h1>
            )}
          </div>
        </section>

        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                Array(6).fill(0).map((_, i) => <Skeleton key={i} className="w-full h-96 rounded-2xl" />)
              ) : articles.length > 0 ? (
                articles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-muted-foreground bg-muted/30 rounded-2xl">
                  <p className="text-lg">No articles found in this category yet.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}