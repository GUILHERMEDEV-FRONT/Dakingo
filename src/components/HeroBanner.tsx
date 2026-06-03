import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface HeroBannerProps {
  onExploreClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#FDFBF9] py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main curved banner wrapper */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-primary via-[#9B2129] to-[#6E1218] p-8 text-white shadow-xl md:p-14 lg:p-16">
          
          {/* Subtle gold decoration background */}
          <div className="absolute top-0 right-0 h-64 w-64 -translate-y-8 translate-x-8 rounded-full bg-brand-accent/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-48 w-48 translate-y-8 -translate-x-8 rounded-full bg-black/20 blur-2xl" />

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            
            {/* Left Texts Column */}
            <div className="z-10 text-center lg:col-span-7 lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent/20 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-[#FFF2B2]"
              >
                <Sparkles className="h-3 w-3 text-brand-accent animate-spin-slow" />
                <span>Bakehouse Masterpiece</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="mt-6 font-serif text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl"
              >
                DECADENT <br className="hidden sm:inline" />
                CHOCOLATE <br />
                <span className="text-brand-accent italic font-serif">BLISS!</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-4 text-base text-red-50/90 font-light subpixel-antialiased tracking-wide sm:text-lg max-w-lg mx-auto lg:mx-0"
              >
                Satisfy your sweetest cravings with artisanal chocolate, crafted by certified bakers using the finest cocoa beans.
              </motion.p>

              {/* Special Offer and Button */}
              <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row lg:justify-start">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', damping: 12, delay: 0.4 }}
                  className="rounded-2xl border-2 border-dashed border-brand-accent/80 bg-black/20 px-6 py-2.5 text-center"
                >
                  <p className="text-[10px] uppercase tracking-widest text-brand-accent font-extrabold">Special Offer!</p>
                  <p className="text-xl font-serif text-brand-accent tracking-tighter font-black">SAVE 20%</p>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onExploreClick}
                  className="rounded-full bg-white px-8 py-3.5 text-sm font-extrabold uppercase tracking-widest text-brand-primary shadow-lg hover:bg-stone-50 transition-all cursor-pointer"
                >
                  Satisfy Cravings
                </motion.button>
              </div>
            </div>

            {/* Right Images Column */}
            <div className="relative flex flex-col items-center justify-center lg:col-span-5">
              
              {/* Giant floating chocolate cake display */}
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring', delay: 0.2 }}
                className="relative"
              >
                {/* Visual Glow behind main image */}
                <span className="absolute inset-4 -z-10 rounded-full bg-stone-900/40 blur-xl scale-95" />
                <img
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80"
                  alt="Decadent chocolate cake with fresh berries"
                  referrerPolicy="no-referrer"
                  className="h-60 w-60 rounded-full border-4 border-white object-cover shadow-2xl sm:h-72 sm:w-72 md:h-80 md:w-80"
                />

                {/* Floating gold sparkle/badge */}
                <div className="absolute right-0 top-6 rotate-12 rounded-full bg-brand-accent px-4 py-1.5 text-[9px] font-black uppercase tracking-wider text-brand-dark shadow-md flex items-center gap-1">
                  <span>★</span> Best Seller
                </div>
              </motion.div>

              {/* Stack of auxiliary cakes shown on the far right */}
              <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col gap-4 lg:flex translate-x-12">
                
                {/* Molten Choco Lava mini preview */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                  className="group relative"
                >
                  <img
                    src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=160&auto=format&fit=crop&q=80"
                    alt="Molten cake lava"
                    referrerPolicy="no-referrer"
                    className="h-20 w-20 rounded-full border-2 border-white object-cover shadow-lg group-hover:scale-110 transition duration-300"
                  />
                  <span className="absolute -bottom-1 -right-1 block rounded-full bg-brand-primary p-1 text-[8px] font-black leading-none text-white shadow">lava</span>
                </motion.div>

                {/* Cake Slice Fudge premium preview */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="group relative animate-bounce-slow"
                >
                  <img
                    src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=160&auto=format&fit=crop&q=80"
                    alt="Delicious fudge slice"
                    referrerPolicy="no-referrer"
                    className="h-20 w-20 rounded-full border-2 border-white object-cover shadow-lg group-hover:scale-110 transition duration-300"
                  />
                  <span className="absolute -bottom-1 -right-1 block rounded-full bg-brand-accent p-1 text-[8px] font-black leading-none text-brand-dark shadow">fudge</span>
                </motion.div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
