import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Twitter } from 'lucide-react';

const instructors = [
  {
    name: 'Marcus "Volt" Chen',
    role: 'Head of Breaking',
    bio: 'Red Bull BC One Finalist with 15 years of underground battle experience.',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop'
  },
  {
    name: 'Sarah "Sway" Miller',
    role: 'Choreography Director',
    bio: 'Former backup dancer for major pop icons. Specializes in commercial urban style.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop'
  },
  {
    name: 'Damon "Ghost" Brooks',
    role: 'Popping Specialist',
    bio: 'Master of animation and robotics. Known for his unique "liquid" movement.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop'
  },
  {
    name: 'Elena "Nova" Rossi',
    role: 'House & Afro Fusion',
    bio: 'Brings European club culture vibes to the studio. Focus on footwork and soul.',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop'
  }
];

const Instructors = () => {
  return (
    <section id="instructors" className="py-24 bg-paper">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl mb-4">THE SQUAD</h2>
          <p className="text-ink/40 uppercase tracking-[0.3em] text-sm font-bold">World Class Mentors</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {instructors.map((person, idx) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative aspect-[3/4] mb-6 overflow-hidden bg-neutral-100">
                <img 
                  src={person.img} 
                  alt={person.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="absolute bottom-4 right-4 flex flex-col gap-2 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-10 h-10 bg-ink text-paper flex items-center justify-center hover:bg-accent hover:text-ink cursor-pointer">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div className="w-10 h-10 bg-ink text-paper flex items-center justify-center hover:bg-accent hover:text-ink cursor-pointer">
                    <Twitter className="w-5 h-5" />
                  </div>
                </div>
              </div>
              
              <h3 className="text-2xl mb-1">{person.name}</h3>
              <div className="inline-block px-2 py-0.5 bg-accent text-ink font-mono text-[10px] uppercase tracking-widest font-bold mb-4">
                {person.role}
              </div>
              <p className="text-sm text-ink/60 font-light leading-relaxed">
                {person.bio}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Instructors;
