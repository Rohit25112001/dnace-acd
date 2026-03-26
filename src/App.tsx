import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Classes from './components/Classes';
import Schedule from './components/Schedule';
import Instructors from './components/Instructors';
import Testimonials from './components/Testimonials';
import AILab from './components/AILab';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-paper selection:bg-accent selection:text-ink">
      <Navbar />
      <main>
        <Hero />
        <Classes />
        <Schedule />
        <Instructors />
        <Testimonials />
        <AILab />
        
        {/* Call to Action Section */}
        <section className="py-24 bg-accent text-ink overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="text-[20vw] font-display uppercase leading-none whitespace-nowrap -rotate-12 translate-y-20">
              JOIN THE TRIBE JOIN THE TRIBE JOIN THE TRIBE
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-6xl md:text-9xl mb-8 leading-none">READY TO <br />START?</h2>
            <p className="text-xl md:text-2xl mb-12 font-medium max-w-2xl mx-auto uppercase tracking-tight">
              First class is on us. No experience needed. Just bring your energy.
            </p>
            <button className="bg-ink text-paper px-12 py-6 font-display text-2xl uppercase tracking-widest hover:scale-110 transition-transform shadow-2xl">
              Claim Your Free Class
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
