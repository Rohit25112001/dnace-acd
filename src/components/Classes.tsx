import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Music, Users, Star, Flame, Target, Search, X, Clock } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import BookingModal from './BookingModal';

const classes = [
  {
    title: 'Hip Hop Foundation',
    level: 'Beginner',
    duration: '90 Minutes',
    description: 'Master the basics of bounce, rock, and groove. Perfect for those starting their journey.',
    icon: <Music className="w-6 h-6" />,
    img: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=2070&auto=format&fit=crop',
    pricing: { single: 25, fivePack: 110, tenPack: 200 }
  },
  {
    title: 'Advanced Breaking',
    level: 'Advanced',
    duration: '120 Minutes',
    description: 'Power moves, freezes, and complex footwork. Push your physical limits.',
    icon: <Zap className="w-6 h-6" />,
    img: 'https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=1887&auto=format&fit=crop',
    pricing: { single: 30, fivePack: 135, tenPack: 250 }
  },
  {
    title: 'Urban Choreo',
    level: 'Intermediate',
    duration: '90 Minutes',
    description: 'Learn intricate routines set to the latest hits. Focus on texture and musicality.',
    icon: <Star className="w-6 h-6" />,
    img: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop',
    pricing: { single: 25, fivePack: 110, tenPack: 200 }
  },
  {
    title: 'Popping & Locking',
    level: 'All Levels',
    duration: '90 Minutes',
    description: 'Control your body with precision. Learn the funk styles that started it all.',
    icon: <Users className="w-6 h-6" />,
    img: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=2070&auto=format&fit=crop',
    pricing: { single: 25, fivePack: 110, tenPack: 200 }
  },
  {
    title: 'House Grooves',
    level: 'Beginner',
    duration: '60 Minutes',
    description: 'Focus on footwork and the "jack" of house music. High energy and soulful.',
    icon: <Flame className="w-6 h-6" />,
    img: 'https://images.unsplash.com/photo-1545224931-ed56253b4af8?q=80&w=1887&auto=format&fit=crop',
    pricing: { single: 20, fivePack: 90, tenPack: 160 }
  },
  {
    title: 'Elite Performance',
    level: 'Advanced',
    duration: '120 Minutes',
    description: 'Intensive training for competitive dancers. Focus on stage presence and execution.',
    icon: <Target className="w-6 h-6" />,
    img: 'https://images.unsplash.com/photo-1516475429286-465d815a0df7?q=80&w=1887&auto=format&fit=crop',
    pricing: { single: 35, fivePack: 160, tenPack: 300 }
  }
];

const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];

const Classes = () => {
  const [activeFilter, setActiveFilter] = useState('All Levels');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClassForModal, setSelectedClassForModal] = useState('');

  const handleBookClass = (title: string) => {
    setSelectedClassForModal(title);
    setIsModalOpen(true);
  };

  const filteredClasses = classes.filter(item => {
    const matchesFilter = activeFilter === 'All Levels' || item.level === activeFilter || item.level === 'All Levels';
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.level.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="classes" className="py-24 bg-paper">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl mb-6">OUR CLASSES</h2>
            <p className="text-lg text-ink/60 font-light">
              From foundational grooves to high-octane power moves, our curriculum is designed to evolve your style and technique.
            </p>
            {(searchTerm || activeFilter !== 'All Levels') && (
              <div className="mt-6 font-mono text-[10px] uppercase tracking-widest text-accent flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                SHOWING {filteredClasses.length} RESULTS 
                {searchTerm && <> FOR "{searchTerm}"</>} 
                {activeFilter !== 'All Levels' && <> IN {activeFilter}</>}
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-6 w-full md:w-auto">
            {/* Search Bar */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30 group-focus-within:text-accent transition-colors" />
              <input
                type="text"
                placeholder="SEARCH CLASSES..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-80 bg-ink/5 border border-ink/10 p-4 pl-12 font-mono text-[10px] font-bold uppercase tracking-widest focus:border-accent outline-none transition-all"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-accent transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter UI */}
            <div className="flex flex-wrap gap-2">
              {levels.map((level) => (
                <button
                  key={level}
                  onClick={() => setActiveFilter(level)}
                  className={cn(
                    "px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all border",
                    activeFilter === level 
                      ? "bg-ink text-paper border-ink" 
                      : "bg-transparent text-ink border-ink/10 hover:border-ink"
                  )}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredClasses.length > 0 ? (
              filteredClasses.map((item) => (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative bg-neutral-50 border border-ink/5 overflow-hidden flex flex-col"
                >
                  <div className="aspect-[3/4] overflow-hidden">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  
                  <div className="p-6 relative flex-1 flex flex-col">
                    <div className="absolute -top-6 right-6 w-12 h-12 bg-accent text-ink flex items-center justify-center shadow-lg">
                      {item.icon}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">{item.level}</div>
                    <h3 className="text-2xl mb-3">{item.title}</h3>
                    <p className="text-sm text-ink/60 font-light leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-2 mb-6">
                      <Clock className="w-3 h-3 text-accent" />
                      <span className="text-[10px] font-mono uppercase tracking-widest text-ink/40">{item.duration}</span>
                    </div>

                    {/* Refactored Pricing Component */}
                    <div className="mt-auto pt-6 border-t border-ink/10 mb-8">
                      <div className="grid grid-cols-3 gap-2">
                        {/* Single Class */}
                        <div className="flex flex-col items-center justify-center p-2 border border-ink/10 bg-white">
                          <span className="text-[7px] font-bold uppercase tracking-tighter opacity-40 mb-1">Single</span>
                          <span className="text-lg font-display">${item.pricing.single}</span>
                        </div>
                        
                        {/* 5 Pack */}
                        <div className="flex flex-col items-center justify-center p-2 border border-ink/10 bg-white relative">
                          <span className="text-[7px] font-bold uppercase tracking-tighter opacity-40 mb-1">5 Pack</span>
                          <span className="text-lg font-display">${item.pricing.fivePack}</span>
                        </div>

                        {/* 10 Pack - Featured */}
                        <div className="flex flex-col items-center justify-center p-2 bg-ink text-paper border border-ink relative overflow-hidden">
                          <div className="absolute top-0 right-0 bg-accent text-ink text-[6px] px-1 font-bold uppercase tracking-tighter">Best</div>
                          <span className="text-[7px] font-bold uppercase tracking-tighter opacity-60 mb-1">10 Pack</span>
                          <span className="text-lg font-display text-accent">${item.pricing.tenPack}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => handleBookClass(item.title)}
                        className="text-xs font-bold uppercase tracking-widest border-b border-ink/20 pb-1 hover:border-accent transition-colors"
                      >
                        Learn More
                      </button>
                      <button 
                        onClick={() => handleBookClass(item.title)}
                        className="bg-ink text-paper px-6 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-ink transition-all"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-24 text-center border border-dashed border-ink/10"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-ink/40">No classes match your search criteria.</p>
                <button 
                  onClick={() => { setSearchTerm(''); setActiveFilter('All Levels'); }}
                  className="mt-4 text-accent font-bold uppercase tracking-widest text-[10px] border-b border-accent/20 hover:border-accent transition-colors"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialClass={selectedClassForModal}
      />
    </section>
  );
};

export default Classes;
