import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const classDescriptions: Record<string, string> = {
  'Hip Hop Found.': 'Foundational bounce, rock, and groove for beginners.',
  'Breaking Beg.': 'Introduction to toprock, footwork, and basic freezes.',
  'Urban Choreo': 'Intricate routines set to modern hits with focus on musicality.',
  'Popping': 'Precision body control, hits, and animation techniques.',
  'House Dance': 'High-energy footwork and soulful grooves from club culture.',
  'Afrobeats': 'Dynamic, rhythmic movement rooted in African street dance.',
  'Locking': 'Funk-based style focusing on sharp freezes and character.',
  'Breaking Adv.': 'Complex power moves and advanced transition sequences.',
  'Hip Hop Adv.': 'High-level choreography and freestyle development.',
  'Workshop': 'Special intensive sessions with guest instructors.',
  'Open Session': 'Free practice time to work on your own skills.',
  'Battles': 'Competitive dance exchanges in a cypher environment.',
  'Social': 'Community gathering to dance, connect, and share vibes.',
  'Closed': 'Studio is currently closed.',
};

const ScheduleCell = ({ name }: { name: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const description = classDescriptions[name];

  if (name === 'Closed') return <td className="p-6 border border-paper/10 text-sm font-light opacity-20">{name}</td>;

  return (
    <td 
      className="p-6 border border-paper/10 text-sm font-light relative cursor-help group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="group-hover:text-accent transition-colors">{name}</span>
      
      <AnimatePresence>
        {isHovered && description && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-paper text-ink shadow-2xl border border-ink/10 pointer-events-none"
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-accent mb-1">Class Info</div>
            <p className="text-[11px] leading-relaxed font-medium">{description}</p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-paper" />
          </motion.div>
        )}
      </AnimatePresence>
    </td>
  );
};

const schedule = [
  { time: '10:00 AM', mon: 'Hip Hop Found.', tue: 'Breaking Beg.', wed: 'Urban Choreo', thu: 'Popping', fri: 'House Dance', sat: 'Open Session', sun: 'Closed' },
  { time: '12:00 PM', mon: 'House Dance', tue: 'Afrobeats', wed: 'Hip Hop Found.', thu: 'Locking', fri: 'Urban Choreo', sat: 'Workshop', sun: 'Closed' },
  { time: '04:00 PM', mon: 'Breaking Adv.', tue: 'Urban Choreo', wed: 'Popping', thu: 'Hip Hop Adv.', fri: 'Breaking Beg.', sat: 'Battles', sun: 'Closed' },
  { time: '06:00 PM', mon: 'Urban Choreo', tue: 'Hip Hop Found.', wed: 'Breaking Adv.', thu: 'House Dance', fri: 'Afrobeats', sat: 'Social', sun: 'Closed' },
  { time: '08:00 PM', mon: 'Open Session', tue: 'Open Session', wed: 'Open Session', thu: 'Open Session', fri: 'Open Session', sat: 'Closed', sun: 'Closed' },
];

const Schedule = () => {
  return (
    <section id="schedule" className="py-24 bg-ink text-paper">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl mb-6">WEEKLY FLOW</h2>
          <div className="w-20 h-1 bg-accent mb-6" />
          <p className="text-paper/50 max-w-xl font-light">
            Our schedule is built for consistency. Find your rhythm and stick to it. All classes are 90 minutes unless specified.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-paper/10">
            <thead>
              <tr className="bg-paper/5">
                <th className="p-6 text-left font-mono text-xs uppercase tracking-widest border border-paper/10">Time</th>
                <th className="p-6 text-left font-mono text-xs uppercase tracking-widest border border-paper/10">Mon</th>
                <th className="p-6 text-left font-mono text-xs uppercase tracking-widest border border-paper/10">Tue</th>
                <th className="p-6 text-left font-mono text-xs uppercase tracking-widest border border-paper/10">Wed</th>
                <th className="p-6 text-left font-mono text-xs uppercase tracking-widest border border-paper/10">Thu</th>
                <th className="p-6 text-left font-mono text-xs uppercase tracking-widest border border-paper/10">Fri</th>
                <th className="p-6 text-left font-mono text-xs uppercase tracking-widest border border-paper/10">Sat</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, idx) => (
                <tr key={idx} className="hover:bg-paper/5 transition-colors">
                  <td className="p-6 border border-paper/10 font-mono text-sm text-accent">{row.time}</td>
                  <ScheduleCell name={row.mon} />
                  <ScheduleCell name={row.tue} />
                  <ScheduleCell name={row.wed} />
                  <ScheduleCell name={row.thu} />
                  <ScheduleCell name={row.fri} />
                  <ScheduleCell name={row.sat} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-12 flex flex-wrap gap-8 items-center justify-between border-t border-paper/10 pt-12">
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent" />
              <span className="text-xs uppercase tracking-widest opacity-60">Beginner Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-paper/30" />
              <span className="text-xs uppercase tracking-widest opacity-60">Advanced Only</span>
            </div>
          </div>
          <button className="bg-paper text-ink px-8 py-3 font-display uppercase tracking-widest hover:bg-accent transition-colors">
            Download PDF
          </button>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
