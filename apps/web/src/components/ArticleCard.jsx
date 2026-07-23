import React from 'react';
import { Link } from 'react-router-dom';
import pb from '@/lib/pocketbaseClient.js';

export default function ArticleCard({ article, variant = "default" }) {
  const { id, title, excerpt, expand, readingTime, created, featuredImage, contentType } = article;
  const category = expand?.category;
  const author = expand?.author;
  
  const imageUrl = featuredImage 
    ? pb.files.getURL(article, featuredImage)
    : 'https://images.unsplash.com/photo-1610740654950-070baeb919ee?auto=format&fit=crop&q=80&w=800';

  const formattedDate = new Date(created).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  if (variant === 'compact') {
    return (
      <Link to={`/articles/${id}`} className="group flex gap-5 items-start">
        <div className="w-28 h-28 shrink-0 overflow-hidden rounded-xl bg-muted border border-border">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        </div>
        <div className="flex flex-col justify-center h-full py-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
              {category?.name || 'Topic'}
            </span>
            {contentType === 'Research Simplified' && (
              <span className="text-[10px] font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">Simplified</span>
            )}
          </div>
          <h4 className="font-serif font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2 mb-2 text-foreground">
            {title}
          </h4>
          <div className="text-xs text-muted-foreground flex items-center gap-3">
            <span>{formattedDate}</span>
            {readingTime && (
              <>
                <span className="w-1 h-1 rounded-full bg-border"></span>
                <span>{readingTime} min read</span>
              </>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/articles/${id}`} className="group flex flex-col h-full bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
      <div className="aspect-[3/2] overflow-hidden bg-muted relative border-b border-border">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
        {category?.name && (
          <div className="absolute top-4 left-4 bg-background/95 backdrop-blur-md text-foreground text-xs font-bold px-3 py-1.5 rounded-md uppercase tracking-wider shadow-sm">
            {category.name}
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground font-medium">
          <span>{author?.name || 'Editorial Team'}</span>
          <span className="w-1 h-1 rounded-full bg-border"></span>
          <span>{formattedDate}</span>
        </div>
        
        <h3 className="font-serif text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-base line-clamp-2 mb-6 flex-grow leading-relaxed">
          {excerpt || 'Discover the latest evidence-based insights in this comprehensive review.'}
        </p>
        
        <div className="flex items-center justify-between text-sm font-medium pt-4 border-t border-border mt-auto">
          <span className="text-primary group-hover:underline underline-offset-4 decoration-primary/30">Read Article</span>
          {readingTime && (
            <span className="text-muted-foreground">{readingTime} min read</span>
          )}
        </div>
      </div>
    </Link>
  );
}