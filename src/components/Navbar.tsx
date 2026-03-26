import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Facebook, Youtube } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Classes', href: '#classes' },
    { name: 'Schedule', href: '#schedule' },
    { name: 'Instructors', href: '#instructors' },
    { name: 'AI Lab', href: '#ai-lab', highlight: true },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b',
        isScrolled 
          ? 'bg-paper/90 backdrop-blur-md py-4 border-ink/10' 
          : 'bg-transparent py-6 border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="font-display text-2xl tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-ink text-paper flex items-center justify-center font-bold italic">UV</div>
          <span>URBAN VIBE</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-2",
                link.highlight && "text-accent"
              )}
            >
              {link.highlight && <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />}
              {link.name}
            </a>
          ))}
          <button className="bg-ink text-paper px-6 py-2 text-sm font-bold uppercase tracking-widest hover:bg-accent hover:text-ink transition-all">
            Join Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-paper border-b border-ink/10 p-6 md:hidden flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-display uppercase tracking-tight"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-ink text-paper w-full py-4 font-display uppercase tracking-widest text-xl">
              Join Now
            </button>
            <div className="flex gap-4 pt-4 border-t border-ink/5">
              <Instagram className="w-6 h-6" />
              <Facebook className="w-6 h-6" />
              <Youtube className="w-6 h-6" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
