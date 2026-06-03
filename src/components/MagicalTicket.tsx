import React, { useState } from 'react';
import { Gift, Calendar, Plus, Trash2, Milestone, Sparkles, Check } from 'lucide-react';
import { useApp } from './AppContext';
import { motion, AnimatePresence } from 'motion/react';

interface MagicalTicketProps {
  onOpenAuth: () => void;
}

export const MagicalTicket: React.FC<MagicalTicketProps> = ({ onOpenAuth }) => {
  const { 
    user, 
    guestUser, 
    reminders, 
    addReminder, 
    deleteReminder, 
    activeCoupon,
    isFirebaseLive
  } = useApp();

  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('Mom');
  const [date, setDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMess, setErrorMess] = useState('');

  const isLoggedIn = user || guestUser;
  const remindersCount = reminders.length;
  const progressPercent = Math.min(100, (remindersCount / 3) * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date) {
      setErrorMess('Please provide both name and celebration date!');
      return;
    }
    setErrorMess('');
    setIsSubmitting(true);
    try {
      await addReminder(name, relationship, date);
      setName('');
      setDate('');
    } catch (err) {
      console.error(err);
      setErrorMess('Could not persist reminder. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-[#FFF8F3] to-[#FFF3EB] py-16 border-t border-stone-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Side: The Magical Ticket description & progress */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent/20 text-brand-accent mb-4 animate-bounce-slow">
              <Gift className="h-5 w-5" />
            </div>

            <h2 className="font-serif text-3xl font-extrabold tracking-tight text-brand-dark sm:text-4xl">
              The Magical Ticket
            </h2>
            
            <p className="mt-4 text-stone-600 font-light text-sm leading-relaxed max-w-lg">
              Add just <strong>3 birthday, anniversary, or celebration reminders</strong> to your account, and instantly unlock a **₹750 reward coupon** to use on any decadent cake order above ₹1000!
            </p>

            {/* Progress indicators */}
            <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm border border-stone-100 max-w-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-700 tracking-wide uppercase flex items-center gap-1.5">
                  <Milestone className="h-3.5 w-3.5 text-brand-primary" />
                  <span>Your Ticket Progress</span>
                </span>
                <span className="text-sm font-extrabold text-brand-primary">{remindersCount} / 3 Additions</span>
              </div>
              
              {/* Progress Bar container */}
              <div className="h-2.5 w-full rounded-full bg-stone-100 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <p className="mt-3 text-[10px] text-stone-400 font-medium leading-relaxed">
                {remindersCount < 3 
                  ? `Add ${3 - remindersCount} more reminder${3 - remindersCount === 1 ? '' : 's'} to activate your voucher!` 
                  : 'Awesome! Your Magical Ticket code is now fully unlocked and ready!'}
              </p>
            </div>

            {/* Scratch Ticket Reveal UI */}
            <div className="mt-6 max-w-md">
              {remindersCount >= 3 ? (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FFD700] via-[#F1C40F] to-[#E67E22] p-5 shadow-lg text-brand-dark border-2 border-white"
                >
                  <div className="absolute top-0 right-0 h-16 w-16 -translate-y-4 translate-x-4 rotate-45 bg-white/25" />
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-primary shadow-sm font-serif text-lg font-black">
                      🎟️
                    </span>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[#FFF6D4] font-black">Magical Voucher Unlocked!</p>
                      <p className="font-serif text-lg font-black text-white">CODE: MAGICAL750</p>
                      <p className="text-[9px] text-[#FFEDCD] font-medium">Enjoy ₹750 off on checkout totals!</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="rounded-3xl border-2 border-dashed border-stone-200 bg-stone-50/50 p-6 text-center text-xs text-stone-400">
                  🎁 Scratch here to reveal Coupon once you reach 3 reminders!
                </div>
              )}
            </div>

          </div>

          {/* Right Side: Interactive management form & reminders list */}
          <div className="lg:col-span-7">
            
            <div className="overflow-hidden rounded-[2.5rem] bg-white p-6 shadow-sm border border-stone-100">
              
              {!isLoggedIn ? (
                /* Unauthenticated view asking them to login to participate */
                <div className="py-10 text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FFECEE] text-brand-primary mb-4">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-stone-900">Unlock Reminder Syncing</h3>
                  <p className="mt-2 text-xs text-stone-500 max-w-sm mx-auto px-4 font-light leading-relaxed">
                    Kindly log in using your Google account (or enter as guest) to securely persistent reminders and map birthdays.
                  </p>
                  <button
                    onClick={onOpenAuth}
                    className="mt-6 rounded-full bg-brand-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-brand-primary/95 transition cursor-pointer"
                  >
                    Login / Sign In Now
                  </button>
                </div>
              ) : (
                /* Authenticated view with form and lists */
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                      <span>🎉 Celebration Calendar</span>
                      {isFirebaseLive && (
                        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[9px] font-extrabold text-emerald-600 uppercase border border-emerald-100">
                          cloud synced
                        </span>
                      )}
                    </h3>
                    <p className="text-[11px] text-stone-400 mt-0.5">Define your loved ones' events, and we will remind you to order.</p>
                  </div>

                  {/* Add Reminder Form */}
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-4 items-end">
                    
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold text-stone-700 uppercase mb-1">Occasion / Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ana's 18th Birthday"
                        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-xs outline-none focus:border-brand-primary focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-stone-700 uppercase mb-1">Relationship</label>
                      <select
                        value={relationship}
                        onChange={(e) => setRelationship(e.target.value)}
                        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs outline-none focus:border-brand-primary focus:bg-white"
                      >
                        {['Mom', 'Dad', 'Partner', 'Friend', 'Brother', 'Sister', 'Work'].map((rel) => (
                          <option key={rel} value={rel}>{rel}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-stone-700 uppercase mb-1">Date</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs outline-none focus:border-brand-primary focus:bg-white"
                      />
                    </div>

                    <div className="sm:col-span-4 mt-1 flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center gap-1.5 rounded-xl bg-brand-primary px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brand-primary/95 disabled:bg-stone-300 transition cursor-pointer"
                      >
                        {isSubmitting ? (
                          <span>Adding...</span>
                        ) : (
                          <>
                            <Plus className="h-4 w-4" />
                            <span>Add to Calendar</span>
                          </>
                        )}
                      </button>
                    </div>

                  </form>

                  {errorMess && (
                    <p className="text-xs text-brand-primary font-semibold">{errorMess}</p>
                  )}

                  {/* List of active reminders */}
                  <div className="border-t border-stone-150 pt-5">
                    <h4 className="text-xs font-bold text-stone-700 uppercase tracking-widest mb-3">Your Event List</h4>
                    
                    {reminders.length === 0 ? (
                      <p className="text-center py-6 text-xs text-stone-400">
                        No reminders created yet. Add one above to unlock your reward ticket!
                      </p>
                    ) : (
                      <div className="max-h-52 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                        <AnimatePresence>
                          {reminders.map((rem) => (
                            <motion.div
                              key={rem.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="flex items-center justify-between rounded-2xl bg-stone-50 p-3 hover:bg-stone-100 transition-colors border border-stone-100"
                            >
                              <div className="flex items-center gap-3">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent/20 text-brand-accent text-xs font-bold">
                                  🍰
                                </span>
                                <div>
                                  <p className="text-xs font-bold text-stone-800">{rem.name}</p>
                                  <p className="text-[10px] text-stone-400 font-medium">
                                    {rem.relationship} • {new Date(rem.date).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>

                              <button
                                onClick={() => deleteReminder(rem.id)}
                                className="rounded-full p-2 text-stone-400 hover:text-brand-primary hover:bg-white transition cursor-pointer"
                                title="Delete reminder"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
