import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Stethoscope, Moon, Activity, Brain, Shield, HeartPulse } from 'lucide-react';

const iconMap = {
  'better-sleep': Moon,
  'stress-burnout': Brain,
  'energy-fatigue': Activity,
  'immunity': Shield,
  'heart-health': HeartPulse,
  default: Stethoscope
};

export default function ConcernCard({ concern, articleCount = 0 }) {
  const Icon = iconMap[concern.slug] || iconMap.default;

  return (
    <Link 
      to={`/browse-by-concern/${concern.slug}`}
      className="group flex flex-col bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 h-full"
    >
      <div className="w-12 h-12 rounded-xl bg-secondary/50 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
        <Icon className="w-6 h-6" />
      </div>
      
      <h3 className="font-serif text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {concern.name}
      </h3>
      
      <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-grow">
        {concern.description || `Evidence-based insights and clinical research related to ${concern.name.toLowerCase()}.`}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border text-sm">
        <span className="text-muted-foreground font-medium">
          {articleCount} {articleCount === 1 ? 'Article' : 'Articles'}
        </span>
        <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
          Browse <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}