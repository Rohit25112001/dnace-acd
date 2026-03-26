import React from 'react';
import { motion } from 'motion/react';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'ALEX RIVERA',
    role: 'BREAKING STUDENT',
    text: "THE ENERGY AT URBAN VIBE IS UNMATCHED. I WENT FROM ZERO TO BREAKING IN JUST THREE MONTHS. THE INSTRUCTORS DON'T JUST TEACH MOVES; THEY TEACH THE CULTURE.",
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop'
  },
  {
    name: 'SARAH LANSING',
    role: 'CHOREOGRAPHY ENTHUSIAST',
    text: "BEST URBAN CHOREOGRAPHY IN THE CITY. THE FOCUS ON MUSICALITY AND TEXTURE HAS COMPLETELY TRANSFORMED HOW I MOVE. IT'S MY SECOND HOME.",
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop'
  },
  {
    name: 'MARCUS TRENT',
    role: 'ELITE PERFORMANCE TEAM',
    text: "I FOUND MY COMMUNITY HERE. THE ELITE PERFORMANCE TRAINING IS INTENSE BUT REWARDING. IF YOU WANT TO TAKE DANCE SERIOUSLY, THIS IS THE PLACE.",
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop'
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-ink text-paper overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
          <h2 className="text-5xl md:text-8xl leading-none tracking-tighter">
            VOICES <br />
            <span className="text-stroke">OF THE</span> <br />
            STREET
          </h2>
          <div className="text-right">
            <div className="text-accent font-display text-4xl leading-none mb-2">4.9/5</div>
            <div className="flex gap-1 justify-end mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest opacity-50">Based on 500+ Reviews</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <Quote className="absolute -top-6 -left-6 w-12 h-12 text-accent/20 group-hover:text-accent/40 transition-colors" />
              
              <div className="mb-8 aspect-square overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                <img 
                  src={t.img} 
                  alt={t.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="space-y-4">
                <p className="text-lg font-light leading-relaxed italic opacity-80">
                  "{t.text}"
                </p>
                
                <div className="pt-6 border-t border-paper/10">
                  <div className="font-display text-2xl tracking-tight">{t.name}</div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Decorative Element */}
        <div className="mt-24 pt-12 border-t border-paper/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex -space-x-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-12 h-12 rounded-full border-2 border-ink overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/user${i}/100/100`} 
                  alt="User" 
                  className="w-full h-full object-cover grayscale"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-2 border-ink bg-accent text-ink flex items-center justify-center text-[10px] font-bold">
              +494
            </div>
          </div>
          <p className="text-sm font-mono uppercase tracking-widest opacity-40">
            Join the movement. Your journey starts here.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
