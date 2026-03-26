import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import BookingModal from './BookingModal';

const Hero = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-ink text-paper">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block px-3 py-1 bg-accent text-ink text-xs font-bold uppercase tracking-[0.2em] mb-6">
            EST. 2024 • DOWNTOWN STUDIO
          </div>
          <h1 className="text-7xl md:text-9xl leading-[0.85] mb-8">
            MOVE <br />
            <span className="text-stroke">WITH</span> <br />
            PURPOSE
          </h1>
          <p className="text-lg md:text-xl text-paper/70 max-w-md mb-10 font-light leading-relaxed">
            Urban Vibe is more than a dance academy. It's a movement. Join the elite community of street dancers in the heart of the city.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-accent text-ink px-8 py-4 font-display text-xl uppercase tracking-wider hover:scale-105 transition-transform flex items-center gap-3"
            >
              Book a Class <ArrowRight className="w-5 h-5" />
            </button>
            <a 
              href="#schedule"
              className="border border-paper/30 px-8 py-4 font-display text-xl uppercase tracking-wider hover:bg-paper hover:text-ink transition-all flex items-center justify-center"
            >
              View Schedule
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="aspect-[4/5] bg-neutral-900 overflow-hidden relative group">
            <img 
              src="https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop" 
              alt="Dancer in motion" 
              className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-110 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border-[20px] border-ink/50 pointer-events-none" />
          </div>
          
          {/* Floating Stats */}
          <div className="absolute -bottom-10 -left-10 bg-paper text-ink p-8 shadow-2xl">
            <div className="font-display text-5xl leading-none mb-1">25+</div>
            <div className="text-[10px] uppercase tracking-widest font-bold opacity-50">Expert Instructors</div>
          </div>
          
          <div className="absolute -top-10 -right-10 bg-accent text-ink p-8 shadow-2xl rotate-3">
            <div className="font-display text-5xl leading-none mb-1">12K</div>
            <div className="text-[10px] uppercase tracking-widest font-bold opacity-50">Active Students</div>
          </div>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 w-full bg-accent py-4 overflow-hidden border-t border-ink/10">
        <div className="marquee-track whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-ink font-display text-2xl uppercase tracking-tighter mx-8">
              HIP HOP • BREAKING • POPPING • LOCKING • HOUSE • AFROBEATS • CHOREOGRAPHY • 
            </span>
          ))}
        </div>
      </div>

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
      />
    </section>
  );
};

export default Hero;
