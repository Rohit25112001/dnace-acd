import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, User, CheckCircle } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialClass?: string;
}

const classes = [
  'Hip Hop Foundation',
  'Advanced Breaking',
  'Urban Choreo',
  'Popping & Locking',
  'House Grooves',
  'Elite Performance'
];

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialClass }) => {
  const [step, setStep] = React.useState(1);
  const [selectedClass, setSelectedClass] = React.useState('');
  const [formData, setFormData] = React.useState({ name: '', email: '' });

  React.useEffect(() => {
    if (isOpen) {
      if (initialClass) {
        setSelectedClass(initialClass);
        setStep(2);
      } else {
        setStep(1);
        setSelectedClass('');
      }
    }
  }, [isOpen, initialClass]);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(4); // Success step
  };

  const resetAndClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setSelectedClass('');
      setFormData({ name: '', email: '' });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-ink/90 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-paper text-ink p-8 shadow-2xl border border-ink/10 overflow-hidden"
          >
            <button
              onClick={resetAndClose}
              className="absolute top-6 right-6 p-2 hover:bg-ink/5 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {step < 4 && (
              <div className="mb-8">
                <div className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">Step {step} of 3</div>
                <h2 className="text-4xl font-display uppercase tracking-tight">Book Your Spot</h2>
              </div>
            )}

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <p className="text-sm text-ink/60 mb-6">Select the class you want to attend:</p>
                <div className="grid gap-2">
                  {classes.map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedClass(c);
                        handleNext();
                      }}
                      className="w-full text-left p-4 border border-ink/10 hover:border-accent hover:bg-neutral-50 transition-all font-medium flex justify-between items-center group"
                    >
                      {c}
                      <span className="opacity-0 group-hover:opacity-100 text-accent">→</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="p-4 bg-neutral-50 border border-ink/5 flex items-center gap-4">
                  <div className="w-10 h-10 bg-accent text-ink flex items-center justify-center font-bold italic">UV</div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest opacity-50">Selected Class</div>
                    <div className="font-bold">{selectedClass}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 border border-ink/10">
                    <Calendar className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium">Next Available: Tomorrow</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 border border-ink/10">
                    <Clock className="w-5 h-5 text-accent" />
                    <span className="text-sm font-medium">Time: 6:00 PM - 7:30 PM</span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={handleBack} className="flex-1 py-4 border border-ink/10 font-display uppercase tracking-widest hover:bg-neutral-50 transition-colors">Back</button>
                  <button onClick={handleNext} className="flex-1 py-4 bg-ink text-paper font-display uppercase tracking-widest hover:bg-accent hover:text-ink transition-colors">Continue</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/30" />
                    <input
                      required
                      type="text"
                      placeholder="FULL NAME"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-neutral-50 border border-ink/10 p-4 pl-12 font-mono text-xs uppercase tracking-widest focus:border-accent outline-none transition-colors"
                    />
                  </div>
                  <div className="relative">
                    <X className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink/30 rotate-45" />
                    <input
                      required
                      type="email"
                      placeholder="EMAIL ADDRESS"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-neutral-50 border border-ink/10 p-4 pl-12 font-mono text-xs uppercase tracking-widest focus:border-accent outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={handleBack} className="flex-1 py-4 border border-ink/10 font-display uppercase tracking-widest hover:bg-neutral-50 transition-colors">Back</button>
                  <button type="submit" className="flex-1 py-4 bg-accent text-ink font-display uppercase tracking-widest hover:bg-ink hover:text-paper transition-colors">Confirm Booking</button>
                </div>
              </motion.form>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-20 h-20 bg-accent text-ink rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-4xl font-display uppercase mb-2">Booking Confirmed!</h3>
                <p className="text-ink/60 font-light mb-8 max-w-xs mx-auto">
                  Get ready to move, <span className="font-bold text-ink">{formData.name.split(' ')[0]}</span>! You're officially on the list.
                </p>

                <div className="bg-neutral-50 border border-ink/10 p-6 mb-8 text-left space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-ink text-paper flex items-center justify-center font-bold italic text-xs">UV</div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest opacity-50">Class</div>
                      <div className="font-bold text-lg leading-tight">{selectedClass}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-ink/5">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Date</div>
                      <div className="text-sm font-medium">Tomorrow</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest opacity-50 mb-1">Time</div>
                      <div className="text-sm font-medium">6:00 PM - 7:30 PM</div>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-ink/40 mb-8">
                  A confirmation email has been sent to {formData.email}
                </p>

                <button
                  onClick={resetAndClose}
                  className="w-full bg-ink text-paper py-4 font-display uppercase tracking-widest hover:bg-accent hover:text-ink transition-all"
                >
                  Close & Return
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
