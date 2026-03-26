import React, { useState } from 'react';
import { Instagram, Facebook, Youtube, Mail, MapPin, Phone, Send } from 'lucide-react';

const Footer = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  return (
    <footer className="bg-ink text-paper pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <a href="#" className="font-display text-4xl tracking-tighter flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-accent text-ink flex items-center justify-center font-bold italic">UV</div>
              <span>URBAN VIBE</span>
            </a>
            <p className="text-paper/50 mb-8 font-light leading-relaxed">
              We are a community-driven dance academy dedicated to preserving and evolving urban dance culture.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-paper/10 flex items-center justify-center hover:bg-accent hover:text-ink transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-8">
            <div>
              <h4 className="font-display text-xl uppercase tracking-widest mb-6">Quick Links</h4>
              <ul className="space-y-3 text-paper/60 font-light text-sm">
                <li><a href="#classes" className="hover:text-accent transition-colors">Classes</a></li>
                <li><a href="#schedule" className="hover:text-accent transition-colors">Schedule</a></li>
                <li><a href="#instructors" className="hover:text-accent transition-colors">Instructors</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Membership</a></li>
              </ul>
            </div>
            <div id="location">
              <h4 className="font-display text-xl uppercase tracking-widest mb-6">Contact</h4>
              <ul className="space-y-4 text-paper/60 font-light text-sm">
                <li className="flex gap-3">
                  <MapPin className="w-4 h-4 text-accent shrink-0" />
                  <span>123 Street Dance Ave, NY</span>
                </li>
                <li className="flex gap-3">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <span>hello@urbanvibe.dance</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-xl uppercase tracking-widest mb-8">Drop a Message</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  required
                  type="text"
                  placeholder="NAME"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full bg-paper/5 border border-paper/10 p-4 font-mono text-xs uppercase tracking-widest focus:border-accent outline-none transition-colors"
                />
                <input
                  required
                  type="email"
                  placeholder="EMAIL"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full bg-paper/5 border border-paper/10 p-4 font-mono text-xs uppercase tracking-widest focus:border-accent outline-none transition-colors"
                />
              </div>
              <textarea
                required
                rows={4}
                placeholder="MESSAGE"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full bg-paper/5 border border-paper/10 p-4 font-mono text-xs uppercase tracking-widest focus:border-accent outline-none transition-colors resize-none"
              />
              <button
                disabled={isSubmitting}
                className="w-full bg-accent text-ink py-4 font-display text-xl uppercase tracking-widest hover:bg-paper transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : isSent ? 'Message Sent!' : (
                  <>Send Message <Send className="w-5 h-5" /></>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-paper/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-paper/30 uppercase tracking-widest">
            © 2024 Urban Vibe Dance Academy. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold text-paper/30">
            <a href="#" className="hover:text-accent">Privacy Policy</a>
            <a href="#" className="hover:text-accent">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
