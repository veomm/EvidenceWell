import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, CheckCircle, Clock, Shield } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArticleCard from '@/components/ArticleCard.jsx';
import ConcernCard from '@/components/ConcernCard.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [concerns, setConcerns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const [articlesRes, concernsRes] = await Promise.all([pb.collection('articles').getList(1, 10, {
          filter: 'status = "published"',
          sort: '-created',
          expand: 'category,author',
          $autoCancel: false
        }), pb.collection('concerns').getList(1, 12, {
          sort: 'displayOrder',
          $autoCancel: false
        })]);
        setArticles(articlesRes.items);
        setConcerns(concernsRes.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  const handleSubscribe = async e => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribing(true);
    try {
      await pb.collection('email_signups').create({
        email,
        isActive: true
      }, {
        $autoCancel: false
      });
      toast.success('Successfully subscribed to our newsletter.');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe or already subscribed.');
    } finally {
      setIsSubscribing(false);
    }
  };
  const featuredMain = articles[0];
  const featuredSidebar = articles.slice(1, 4);
  const trendingArticles = articles.slice(4, 10);
  return <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>EvidenceWell | Evidence for Better Decisions</title>
        <meta name="description" content="We translate complex health science into practical insights you can trust." />
      </Helmet>
      
      <Header />

      <main className="flex-grow">
        {/* HERO SECTION */}
        <section className="relative min-h-[90vh] flex items-center pt-20">
          <div className="absolute inset-0 z-0">
            <img src="https://horizons-cdn.hostinger.com/0dac7fce-1b47-46d0-94ef-9f773f6fcaa1/pexels-daan-stevens-66128-939328-ddzZH.jpg" alt="Editorial abstract" className="w-full h-full object-cover object-center" />
            <div className="absolute inset-0 bg-background/80 lg:bg-background/60 bg-gradient-to-r from-background via-background/90 to-transparent"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.8,
            ease: "easeOut"
          }} className="max-w-3xl">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-extrabold text-foreground leading-[1.05] tracking-tight mb-8">
                Evidence for <br /><span className="text-primary">better decisions.</span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed mb-10 max-w-2xl font-medium">
                We translate complex clinical health science into practical, rigorous insights you can trust. No hype. No trends. Just facts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/articles" className="inline-flex h-14 items-center justify-center rounded-md bg-primary px-8 text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/20">
                  Explore Articles
                </Link>
                <Link to="/browse-by-concern" className="inline-flex h-14 items-center justify-center rounded-md border border-foreground/20 bg-background/50 backdrop-blur-sm px-8 text-base font-semibold text-foreground hover:bg-foreground hover:text-background transition-all active:scale-[0.98]">
                  Browse by Concern
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FEATURED STORIES */}
        <section className="py-24 bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12 border-b border-border pb-6">
              <h2 className="text-3xl font-serif font-bold text-foreground">Featured Research</h2>
              <Link to="/articles" className="text-primary font-medium hover:underline flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {isLoading ? <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8"><Skeleton className="w-full aspect-[16/9] rounded-2xl" /></div>
                <div className="lg:col-span-4 space-y-6">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="w-full h-32 rounded-xl" />)}
                </div>
              </div> : <div className="grid lg:grid-cols-12 gap-10">
                {featuredMain && <div className="lg:col-span-8">
                    <ArticleCard article={featuredMain} />
                  </div>}
                <div className="lg:col-span-4 flex flex-col gap-8">
                  <h3 className="font-serif text-xl font-bold text-foreground mb-2 hidden lg:block">Latest Insights</h3>
                  {featuredSidebar.map(article => <ArticleCard key={article.id} article={article} variant="compact" />)}
                </div>
              </div>}
          </div>
        </section>

        {/* BROWSE BY CONCERN */}
        <section className="py-24 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">Browse by Concern</h2>
              <p className="text-lg text-muted-foreground">Find evidence-based protocols and clinical reviews organized by specific health goals and physiological systems.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoading ? Array(12).fill(0).map((_, i) => <Skeleton key={i} className="w-full h-48 rounded-2xl" />) : concerns.map(concern => <ConcernCard key={concern.id} concern={concern} />)}
            </div>
            
            <div className="mt-16 text-center">
              <Link to="/browse-by-concern" className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-card px-8 text-sm font-semibold text-foreground hover:bg-muted transition-all shadow-sm">
                View All Categories
              </Link>
            </div>
          </div>
        </section>

        {/* TRENDING THIS WEEK */}
        <section className="py-24 bg-background border-y border-border overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <h2 className="text-3xl font-serif font-bold text-foreground">Trending This Week</h2>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
              {isLoading ? Array(4).fill(0).map((_, i) => <div key={i} className="w-[300px] md:w-[400px] shrink-0 snap-start">
                    <Skeleton className="w-full aspect-[3/2] rounded-2xl" />
                  </div>) : trendingArticles.map(article => <div key={article.id} className="w-[300px] md:w-[400px] shrink-0 snap-start">
                    <ArticleCard article={article} />
                  </div>)}
            </div>
          </div>
        </section>

        {/* EVIDENCE EXPLAINED */}
        <section className="py-24 bg-foreground text-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8">How we distill the science.</h2>
                <p className="text-xl text-background/80 leading-relaxed mb-10">
                  Not all studies are created equal. Our editorial team utilizes specific formats to ensure you get the right context, whether you have 5 minutes or an hour.
                </p>
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="mt-1 bg-primary/20 p-2 rounded-lg text-primary"><BookOpen className="w-6 h-6" /></div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Research Simplified</h4>
                      <p className="text-background/70">Deep dives into pivotal clinical trials, translating dense methodology into understandable conclusions.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 bg-primary/20 p-2 rounded-lg text-primary"><CheckCircle className="w-6 h-6" /></div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Myth vs Fact</h4>
                      <p className="text-background/70">We take popular health trends and evaluate them strictly against available peer-reviewed evidence.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 bg-primary/20 p-2 rounded-lg text-primary"><Clock className="w-6 h-6" /></div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">5-Minute Evidence Reviews</h4>
                      <p className="text-background/70">Quick, structured summaries of current consensus on specific supplements or interventions.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-background text-foreground p-8 md:p-12 rounded-2xl shadow-2xl relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full -z-10"></div>
                <h3 className="font-serif text-2xl font-bold mb-6 border-b border-border pb-4">Our Commitment to Rigor</h3>
                <ul className="space-y-6 font-medium">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                    <p>Claims are always backed by direct citations to primary literature.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                    <p>We clearly state the <strong>Evidence Strength</strong> (Strong, Moderate, Limited) for all conclusions.</p>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                    <p>Content is regularly reviewed and updated as new research emerges.</p>
                  </li>
                </ul>
                <div className="mt-10 pt-6 border-t border-border">
                  <Link to="/about" className="text-primary font-bold hover:underline">Read our full editorial guidelines &rarr;</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section id="newsletter" className="py-32 bg-primary/5 border-b border-border text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Get evidence-based health insights every week.
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              No hype. No spam. Just rigorous science and practical protocols you can actually use, delivered straight to your inbox.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto mb-6">
              <Input type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} required className="flex-1 h-14 text-lg bg-card border-border focus:border-primary shadow-sm" />
              <Button type="submit" disabled={isSubscribing} className="h-14 px-8 text-base font-bold shadow-sm">
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            <p className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-primary" /> Join thousands of readers making better health decisions.
            </p>
          </div>
        </section>

        {/* REALDOSE LABS */}
        <section className="py-20 bg-background">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="text-sm font-bold tracking-widest text-primary uppercase mb-4 block">The Organization</span>
            <h2 className="text-3xl font-serif font-bold mb-6">Built by the team at RealDose Labs.</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              EvidenceWell is an initiative created to democratize access to high-quality clinical research. Our team of formulators, researchers, and editorial staff work together to ensure you have the facts necessary to optimize your health span.
            </p>
            <Link to="/about" className="text-primary font-bold hover:underline underline-offset-4">
              Learn more about our mission &rarr;
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
}