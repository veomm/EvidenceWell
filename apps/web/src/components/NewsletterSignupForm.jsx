import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import pb from '@/lib/pocketbaseClient';
import { Mail, Loader2 } from 'lucide-react';

export default function NewsletterSignupForm({ variant = "default" }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await pb.collection('email_signups').create({ email, isActive: true }, { $autoCancel: false });
      toast.success('Successfully subscribed!', {
        description: 'Check your email to confirm subscription.',
      });
      setEmail('');
    } catch (error) {
      if (error.data?.data?.email?.code === 'validation_not_unique') {
        toast.info('You are already subscribed!');
      } else {
        toast.error('Failed to subscribe. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-sm">
        <Input 
          type="email" 
          placeholder="Enter your email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-background text-foreground"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Subscribe'}
        </Button>
      </form>
    );
  }

  return (
    <div className="bg-primary/5 rounded-2xl p-8 text-center max-w-2xl mx-auto border border-primary/10">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
        <Mail className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-2xl font-serif font-bold mb-2 text-foreground">Evidence for better decisions</h3>
      <p className="text-muted-foreground mb-6">Get evidence-based health insights delivered directly to your inbox weekly.</p>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <Input 
          type="email" 
          placeholder="Enter your email address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-background text-foreground"
        />
        <Button type="submit" disabled={isLoading} size="lg">
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
      <p className="text-xs text-muted-foreground mt-4">We respect your privacy. Unsubscribe at any time.</p>
    </div>
  );
}