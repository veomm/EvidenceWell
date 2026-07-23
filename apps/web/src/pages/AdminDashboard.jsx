import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient';
import Header from '@/components/Header.jsx';
import { Skeleton } from '@/components/ui/skeleton';
import { FileText, Users, Mail, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    articles: 0,
    subscribers: 0,
    categories: 0
  });
  const [recentArticles, setRecentArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAdminData() {
      try {
        const [articlesRes, subsRes, catsRes, recentRes] = await Promise.all([
          pb.collection('articles').getList(1, 1, { $autoCancel: false }),
          pb.collection('email_signups').getList(1, 1, { $autoCancel: false }),
          pb.collection('categories').getList(1, 1, { $autoCancel: false }),
          pb.collection('articles').getList(1, 5, { sort: '-created', expand: 'author', $autoCancel: false })
        ]);

        setStats({
          articles: articlesRes.totalItems,
          subscribers: subsRes.totalItems,
          categories: catsRes.totalItems
        });
        setRecentArticles(recentRes.items);
      } catch (error) {
        console.error("Dashboard error", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAdminData();
  }, []);

  const statCards = [
    { label: 'Total Articles', value: stats.articles, icon: FileText, color: 'text-blue-500' },
    { label: 'Newsletter Subs', value: stats.subscribers, icon: Mail, color: 'text-primary' },
    { label: 'Categories', value: stats.categories, icon: TrendingUp, color: 'text-amber-500' }
  ];

  return (
    <div className="min-h-screen bg-muted/20">
      <Helmet>
        <title>Admin Dashboard | EvidenceWell</title>
      </Helmet>

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-2">Manage content and view system metrics.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {isLoading ? (
            Array(3).fill(0).map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)
          ) : (
            statCards.map((stat, i) => (
              <div key={i} className="bg-card border border-border p-6 rounded-xl shadow-sm flex items-center gap-4">
                <div className={`p-4 rounded-full bg-muted ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border flex justify-between items-center">
            <h2 className="text-xl font-bold">Recent Articles</h2>
            <button className="text-sm font-medium text-primary hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted text-muted-foreground">
                <tr>
                  <th className="px-6 py-4 font-medium">Title</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Author</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading ? (
                  Array(5).fill(0).map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-48" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-16" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                      <td className="px-6 py-4"><Skeleton className="h-4 w-24" /></td>
                    </tr>
                  ))
                ) : recentArticles.length > 0 ? (
                  recentArticles.map(article => (
                    <tr key={article.id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{article.title}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          article.status === 'published' ? 'bg-primary/10 text-primary' : 'bg-amber-500/10 text-amber-600'
                        }`}>
                          {article.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{article.expand?.author?.name || 'System'}</td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(article.created).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-8 text-center text-muted-foreground">No articles found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}