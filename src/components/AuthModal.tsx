import React, { useState } from 'react';
import { X, Shield, Goal, LogIn } from 'lucide-react';
import { useApp } from './AppContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginWithGoogle, loginAsGuest, isFirebaseLive } = useApp();
  const [guestName, setGuestName] = useState('');
  const [errorMess, setErrorMess] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  if (!isOpen) return null;

  const handleGoogleAuth = async () => {
    setIsSyncing(true);
    setErrorMess('');
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      console.error(err);
      setErrorMess('Could not start Google Authentication popup. Using demo fallback.');
      
      // Automatic fallback so user can try out the app instantly in constraints
      loginAsGuest("Bakery Explorer");
      onClose();
    } finally {
      setIsSyncing(false);
    }
  };

  const handleGuestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) {
      setErrorMess('Please enter a username or guest title!');
      return;
    }
    setErrorMess('');
    loginAsGuest(guestName);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      
      {/* Background Mask */}
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* Dialog box wrapper */}
      <div className="relative w-full max-w-sm rounded-[2.5rem] bg-white p-7 text-center shadow-2xl border border-stone-100 mt-20 animate-scale-up">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1 text-stone-400 hover:bg-stone-50 hover:text-stone-700 transition cursor-pointer"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FFECEE] text-brand-primary mb-4 font-serif text-lg font-bold">
          🎂
        </span>

        <h3 className="font-serif text-xl font-black text-stone-900">
          Sign In to Dakingo
        </h3>
        
        <p className="mt-1.5 text-xs text-stone-500 font-light px-4 leading-relaxed">
          Create an account to track cake reminders, unlock ₹750 coupons, and review transaction order histories securely.
        </p>

        {isFirebaseLive ? (
          /* Real Google auth if Firebase credentials configured */
          <div className="mt-6 space-y-3">
            <button
              onClick={handleGoogleAuth}
              disabled={isSyncing}
              className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border border-stone-200 bg-white px-5 py-3 text-xs font-bold text-stone-700 hover:bg-stone-50 transition shadow-sm"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google G logo"
                className="h-4 w-4"
              />
              <span>{isSyncing ? 'Authorizing Sync...' : 'Sign In with Google'}</span>
            </button>
            <div className="text-[10px] text-stone-400 font-semibold flex items-center justify-center gap-1">
              <Shield className="h-3 w-3 text-emerald-500" />
              <span>Enterprise secured via Firestore Rules</span>
            </div>
          </div>
        ) : (
          /* Informative indicator that Auth is in local sandbox */
          <div className="mt-5 rounded-2xl bg-amber-50 p-3.5 text-left border border-amber-100 flex items-start gap-2.5">
            <Goal className="h-4 w-4 text-brand-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-[10px] font-bold text-[#9D5400] uppercase tracking-wide">Firebase Sandbox Preview</p>
              <p className="text-[9px] text-[#A66113] leading-relaxed mt-0.5 font-light">
                The Google Auth popups require a configured Firebase credentials bundle. In this sandbox preview, you can enter any name below to test 100% of the DB-linked ordering and reminders features!
              </p>
            </div>
          </div>
        )}

        {/* Guest fallback mode form */}
        <div className="mt-6 border-t border-stone-100 pt-5">
          <form onSubmit={handleGuestSubmit} className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Enter your name (e.g. Guilherme)"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-2.5 text-xs outline-none focus:border-brand-primary focus:bg-white text-center"
              />
            </div>

            <button
              type="submit"
              className="w-full flex cursor-pointer items-center justify-center gap-1.5 rounded-full bg-brand-primary py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-brand-primary/95 transition"
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Enter Guest Mode</span>
            </button>
          </form>

          {errorMess && (
            <p className="text-[10px] text-brand-primary font-bold mt-2.5">{errorMess}</p>
          )}
        </div>

      </div>
    </div>
  );
};
