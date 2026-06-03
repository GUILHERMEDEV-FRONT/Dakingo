import React, { useState } from 'react';
import { HelpCircle, Mail, ArrowUpCircle } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setIsSubscribed(false);
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#FFFDFB] border-t border-stone-100 pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic banner row included in image */}
        <div className="mb-12 rounded-3xl bg-brand-primary p-6 text-center text-white shadow shadow-brand-primary/10">
          <p className="font-serif text-base font-extrabold sm:text-lg">
            Dakingo - Your Trusted FSSAI Certified Online Bakery for Every Celebration
          </p>
          <p className="text-[10px] text-red-100 mt-1 uppercase tracking-widest font-black">
            License No: 10020031109405 • Bakehouse Approved
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start border-b border-stone-100 pb-12">
          
          {/* Logo Column */}
          <div className="md:col-span-4 space-y-4 text-center md:text-left">
            <h3 className="font-serif text-3xl font-black text-brand-primary tracking-tight">
              Dakingo
            </h3>
            <p className="text-xs text-stone-500 font-light leading-relaxed max-w-xs mx-auto md:mx-0">
              Satisfying your sweetest cravings with artisanal chocolate, gourmet theme cakes, and certified fresh bake goods for over a decade.
            </p>
            <div className="flex justify-center md:justify-start gap-4 text-stone-400">
              <a href="#" className="hover:text-brand-primary transition">Facebook</a>
              <a href="#" className="hover:text-brand-primary transition">Instagram</a>
              <a href="#" className="hover:text-brand-primary transition">Twitter</a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:col-span-8">
            
            {/* Column 1 */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#B5915F] mb-4">
                KNOW US
              </h4>
              <ul className="space-y-2.5 text-xs text-stone-500 font-medium">
                <li><a href="#" className="hover:text-brand-primary transition">Our Story</a></li>
                <li><a href="#" className="hover:text-brand-primary transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-brand-primary transition">Blog Directory</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#B5915F] mb-4">
                NEED HELP
              </h4>
              <ul className="space-y-2.5 text-xs text-stone-500 font-medium">
                <li><a href="#" className="hover:text-brand-primary transition">Cancellation & Refund</a></li>
                <li><a href="#" className="hover:text-brand-primary transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand-primary transition">Careers</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-[#B5915F] mb-4">
                MORE INFO
              </h4>
              <ul className="space-y-2.5 text-xs text-stone-500 font-medium">
                <li><a href="#" className="hover:text-brand-primary transition">Terms and Conditions</a></li>
                <li><a href="#" className="hover:text-brand-primary transition">Custom Cake Catalog</a></li>
                <li><a href="#" className="hover:text-brand-primary transition font-bold text-brand-primary">FSSAI Verification</a></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Footer Bottom Subscribe and Copyright */}
        <div className="mt-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          
          {/* Subscribe Field */}
          <div className="w-full max-w-sm">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-700 mb-2">
              SUBSCRIBE TO RECEIVE DEALS
            </h4>
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-stone-400">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                required
                placeholder="Enter Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-stone-200 bg-stone-50 py-3 pl-10 pr-28 text-xs outline-none focus:border-brand-primary focus:bg-white transition"
              />
              <button
                type="submit"
                className="absolute right-1 hover:brightness-105 active:scale-95 transition-all cursor-pointer rounded-full bg-brand-primary px-5 py-2 text-[10px] font-black uppercase tracking-wider text-white"
              >
                SUBSCRIBE
              </button>
            </form>
            {isSubscribed && (
              <p className="text-[10px] text-emerald-600 font-bold mt-2">
                🎉 Awesome! You have subscribed to Dakingo's sweet newsletters!
              </p>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs font-light text-stone-400">
            <span>© 2026 Dakingo Bakery Inc.</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-brand-primary transition cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUpCircle className="h-4 w-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Floating help section matching "Hey, need any help?" */}
      <div className="fixed bottom-6 right-6 z-40">
        <div className="relative">
          {helpOpen && (
            <div className="absolute bottom-16 right-0 w-64 rounded-3xl bg-white p-4 shadow-2xl border border-stone-100 text-stone-800 text-xs animate-scale-up space-y-2">
              <p className="font-bold font-serif text-brand-primary">🎂 Hey! Welcome to Dakingo!</p>
              <p className="text-[11px] leading-relaxed font-light font-stone-500">
                Hope you are enjoying our decadent baker shop! Set up your **Birthday Reminders** to unlock a whopping **₹750 off coupon** immediately!
              </p>
              <button
                onClick={() => setHelpOpen(false)}
                className="w-full text-center py-1.5 bg-stone-100 hover:bg-stone-200 font-bold rounded-xl text-[10px] transition cursor-pointer"
              >
                Awesome!
              </button>
            </div>
          )}

          <button
            onClick={() => setHelpOpen(!helpOpen)}
            className="flex items-center gap-2 rounded-full bg-[#1A1A1A] text-white px-5 py-3 shadow-2xl hover:bg-black transition-transform active:scale-95 cursor-pointer"
          >
            <HelpCircle className="h-4.5 w-4.5 text-brand-accent animate-pulse" />
            <span className="text-xs font-bold tracking-wide">Hey, need any help?</span>
          </button>
        </div>
      </div>

    </footer>
  );
};
