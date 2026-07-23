import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>About Us | EvidenceWell by RealDose Labs</title>
      </Helmet>

      <Header />

      <main className="flex-grow pt-24 pb-32">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-8 text-center">About EvidenceWell</h1>
          
          <div className="prose-editorial">
            <p className="text-xl text-muted-foreground text-center mb-12">
              An initiative by RealDose Labs to democratize access to rigorous health science.
            </p>

            <h2>Our Mission</h2>
            <p>
              In a world flooded with health misinformation, trending diets, and sensationalized study results, EvidenceWell stands as a bastion of scientific clarity. Our mission is to translate complex clinical research into actionable, evidence-based insights that empower individuals to make informed decisions about their health.
            </p>

            <h2>The Problem We're Solving</h2>
            <p>
              Peer-reviewed literature is often inaccessible to the general public—locked behind paywalls or written in dense academic jargon. Conversely, mainstream media often oversimplifies or misinterprets these studies to generate clicks. We bridge this gap by providing transparent, methodical reviews of the latest scientific literature.
            </p>

            <h2>Our Approach</h2>
            <ul>
              <li><strong>Rigorous Evaluation:</strong> Every piece of content is reviewed by scientific experts.</li>
              <li><strong>Contextual Clarity:</strong> We don't just report a study's conclusion; we explain its methodology, limitations, and how it fits into the broader body of evidence.</li>
              <li><strong>Transparent Citations:</strong> Claims are backed by direct links to primary sources.</li>
            </ul>

            <div className="mt-16 bg-muted/50 p-8 rounded-2xl border border-border">
              <h3 className="mt-0">Contact Our Team</h3>
              <p className="mb-0 text-muted-foreground">
                Have questions about our methodology or want to suggest a topic? Reach out to our editorial team at <a href="mailto:editorial@realdoselabs.com" className="text-primary hover:underline">editorial@realdoselabs.com</a>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}