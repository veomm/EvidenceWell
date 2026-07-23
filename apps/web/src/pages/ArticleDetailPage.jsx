import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, User, Calendar, Share2, Info, CheckCircle, AlertTriangle, ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ArticleDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      setIsLoading(true);
      try {
        const res = await pb.collection('articles').getOne(id, {
          expand: 'category,author,reviewedBy,relatedArticles',
          $autoCancel: false
        });
        setArticle(res);
      } catch (error) {
        console.error("Failed to load article", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticle();
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow max-w-4xl mx-auto w-full px-4 pt-32 pb-20">
          <Skeleton className="h-6 w-32 mb-8" />
          <Skeleton className="h-16 w-full mb-6" />
          <Skeleton className="h-8 w-3/4 mb-12" />
          <Skeleton className="w-full aspect-[21/9] rounded-2xl mb-12" />
          <div className="space-y-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
          <h1 className="text-3xl font-serif font-bold mb-4">Article not found</h1>
          <p className="text-muted-foreground mb-8">The content you are looking for may have been moved or removed.</p>
          <Link to="/articles" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            Browse All Articles
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const imageUrl = article.featuredImage 
    ? pb.files.getURL(article, article.featuredImage)
    : 'https://images.unsplash.com/photo-1610740654950-070baeb919ee?auto=format&fit=crop&q=80&w=1200';

  const publishDate = new Date(article.created).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  });
  
  const updatedDate = article.lastReviewedDate 
    ? new Date(article.lastReviewedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : null;

  const EvidenceBadge = ({ strength }) => {
    if (!strength) return null;
    const config = {
      Strong: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
      Moderate: { color: 'bg-amber-100 text-amber-800 border-amber-200', icon: AlertTriangle },
      Limited: { color: 'bg-slate-100 text-slate-800 border-slate-200', icon: Info },
    }[strength] || { color: 'bg-muted text-muted-foreground', icon: Info };
    
    const Icon = config.icon;
    
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${config.color}`}>
        <Icon className="w-3.5 h-3.5" />
        Evidence Strength: {strength}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <Helmet>
        <title>{`${article.title} | EvidenceWell`}</title>
        <meta name="description" content={article.excerpt || article.title} />
      </Helmet>

      <Header />

      <main className="flex-grow pt-24 pb-32">
        {/* Article Header Container */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <Link to="/articles" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Articles
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Link 
              to={`/browse-by-concern`}
              className="text-xs font-bold tracking-widest text-primary uppercase hover:underline"
            >
              {article.expand?.category?.name || 'Editorial'}
            </Link>
            {article.contentType && (
              <>
                <span className="w-1 h-1 rounded-full bg-border"></span>
                <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">{article.contentType}</span>
              </>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-[1.1] mb-6 text-foreground">
            {article.title}
          </h1>
          
          {article.excerpt && (
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8 font-medium">
              {article.excerpt}
            </p>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-muted border border-border shrink-0">
                {article.expand?.author?.avatar ? (
                  <img src={pb.files.getURL(article.expand.author, article.expand.author.avatar)} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary text-secondary-foreground font-bold">
                    {article.expand?.author?.name?.charAt(0) || 'E'}
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-foreground text-sm">{article.expand?.author?.name || 'Editorial Team'}</span>
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
                  <span>{publishDate}</span>
                  {article.readingTime && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-border"></span>
                      <span>{article.readingTime} min read</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
               <EvidenceBadge strength={article.evidenceStrength} />
               <Button variant="outline" size="icon" className="rounded-full shadow-sm" aria-label="Share">
                 <Share2 className="w-4 h-4 text-muted-foreground" />
               </Button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="aspect-[21/9] md:aspect-[2.5/1] rounded-2xl overflow-hidden bg-muted border border-border shadow-sm">
            <img src={imageUrl} alt={article.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Two-Column Layout for Desktop */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-12 relative">
          
          {/* Sticky Sidebar (Table of Contents / Meta) */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 space-y-8">
              <div>
                <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground mb-4">In this article</h4>
                <ul className="space-y-3 text-sm font-medium text-foreground/80">
                  <li><a href="#introduction" className="hover:text-primary transition-colors">Introduction</a></li>
                  <li><a href="#key-takeaways" className="hover:text-primary transition-colors">Key Takeaways</a></li>
                  <li><a href="#the-science" className="hover:text-primary transition-colors">The Science</a></li>
                  <li><a href="#practical-application" className="hover:text-primary transition-colors">Practical Application</a></li>
                  <li><a href="#references" className="hover:text-primary transition-colors">References & Sources</a></li>
                </ul>
              </div>
              
              <div className="p-5 rounded-xl bg-secondary/50 border border-border">
                <h5 className="font-bold text-sm mb-2 text-foreground">Stay Updated</h5>
                <p className="text-xs text-muted-foreground mb-4">Get the latest evidence summaries in your inbox.</p>
                <Link to="/#newsletter" className="block text-center w-full py-2 bg-foreground text-background text-sm font-bold rounded-md hover:bg-foreground/90 transition-colors">
                  Subscribe
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <article className="lg:col-span-6">
            
            {/* Key Takeaways Box */}
            {article.keyTakeaways && Array.isArray(article.keyTakeaways) && article.keyTakeaways.length > 0 && (
              <div id="key-takeaways" className="bg-primary/5 border border-primary/20 rounded-2xl p-8 mb-12 shadow-sm scroll-mt-24">
                <h3 className="flex items-center gap-2 font-serif text-2xl font-bold text-primary mb-6">
                  <CheckCircle className="w-6 h-6" /> Key Takeaways
                </h3>
                <ul className="space-y-4">
                  {article.keyTakeaways.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 shrink-0"></div>
                      <span className="text-foreground/90 font-medium leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prose Content */}
            <div 
              id="the-science"
              className="prose-editorial scroll-mt-24"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <hr className="my-16 border-border" />

            {/* Review & Update Meta */}
            <div className="bg-secondary/30 rounded-2xl p-6 border border-border mb-12">
              <h4 className="font-bold text-foreground mb-4">Editorial Transparency</h4>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                {article.expand?.reviewedBy && (
                  <div>
                    <span className="text-muted-foreground block mb-1">Clinically Reviewed By:</span>
                    <span className="font-semibold text-foreground flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" /> {article.expand.reviewedBy.name}
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-muted-foreground block mb-1">Last Updated:</span>
                  <span className="font-semibold text-foreground">{updatedDate || publishDate}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4 italic">
                Our content is strictly for informational purposes and should not substitute professional medical advice.
              </p>
            </div>

            {/* References / Sources */}
            {article.sources && Array.isArray(article.sources) && article.sources.length > 0 && (
              <div id="references" className="mb-16 scroll-mt-24">
                <h3 className="font-serif text-2xl font-bold mb-6 text-foreground">References & Sources</h3>
                <ol className="list-decimal pl-5 space-y-4 text-sm text-muted-foreground">
                  {article.sources.map((source, idx) => (
                    <li key={idx} className="pl-2 leading-relaxed">
                      {source.authors && <span>{source.authors}. </span>}
                      {source.title && <strong className="text-foreground/80">{source.title}. </strong>}
                      {source.url ? (
                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline break-all">
                          {source.url}
                        </a>
                      ) : (
                        source.journal && <i>{source.journal}</i>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Author Bio */}
            <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-start gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-muted shrink-0 border border-border">
                {article.expand?.author?.avatar ? (
                  <img src={pb.files.getURL(article.expand.author, article.expand.author.avatar)} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary text-secondary-foreground font-bold text-2xl">
                    {article.expand?.author?.name?.charAt(0) || 'E'}
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-bold text-xl text-foreground mb-1">{article.expand?.author?.name || 'Editorial Team'}</h4>
                {article.expand?.author?.credentials && (
                  <p className="text-sm font-semibold text-primary mb-3">{article.expand.author.credentials}</p>
                )}
                <p className="text-muted-foreground leading-relaxed">
                  {article.expand?.author?.bio || 'Dedicated to investigating complex health topics and delivering evidence-based insights through rigorous analysis of peer-reviewed literature.'}
                </p>
              </div>
            </div>
            
          </article>
        </div>

        {/* Related Reading */}
        {article.expand?.relatedArticles && article.expand.relatedArticles.length > 0 && (
          <div className="mt-24 pt-24 border-t border-border bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-serif font-bold text-foreground mb-12 text-center">Related Reading</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {article.expand.relatedArticles.slice(0, 3).map(related => (
                  <ArticleCard key={related.id} article={related} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}