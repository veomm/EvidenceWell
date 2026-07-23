import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterSignupForm from './NewsletterSignupForm.jsx';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-border pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="font-serif text-2xl font-bold tracking-tight">
                EvidenceWell
              </span>
              <p className="text-sm font-medium opacity-80 mt-1">
                An initiative by RealDose Labs
              </p>
            </div>
            <p className="text-sm opacity-90 max-w-sm leading-relaxed">
              Empowering better health decisions through rigorous, evidence-based science. We distill complex research into actionable, transparent insights.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider opacity-60">Organization</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm hover:opacity-70 transition-opacity">About RealDose Labs</Link></li>
              <li><Link to="/author-profiles" className="text-sm hover:opacity-70 transition-opacity">Our Experts</Link></li>
              <li><Link to="/contact" className="text-sm hover:opacity-70 transition-opacity">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-wider opacity-60">Editorial</h4>
            <ul className="space-y-4">
              <li><Link to="/editorial-guidelines" className="text-sm hover:opacity-70 transition-opacity">Editorial Guidelines</Link></li>
              <li><Link to="/how-we-review-evidence" className="text-sm hover:opacity-70 transition-opacity">How We Review Evidence</Link></li>
              <li><Link to="/disclosure-policy" className="text-sm hover:opacity-70 transition-opacity">Disclosure Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-70">
            &copy; {currentYear} RealDose Labs. All rights reserved. Content is for informational purposes only and not medical advice.
          </p>
          <div className="flex items-center gap-6 text-xs opacity-70">
            <Link to="/privacy" className="hover:opacity-100 transition-opacity">Privacy Policy</Link>
            <Link to="/terms" className="hover:opacity-100 transition-opacity">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}