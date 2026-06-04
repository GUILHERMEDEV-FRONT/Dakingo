import React, { useState } from 'react';
import { Search, ShoppingBag, User as UserIcon, LogOut, History, CalendarDays } from 'lucide-react';
import { useApp } from './AppContext';

interface HeaderProps {
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onOpenHistory: () => void;
  onOpenReminders: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCart,
  onOpenAuth,
  onOpenHistory,
  onOpenReminders,
}) => {
  const { user, guestUser, logout, cart } = useApp();
  const [searchOpen, setSearchOpen] = useState(false);
  const loggedInUser = user || guestUser;

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-brand-dark/5 bg-brand-secondary/90 backdrop-blur-md">
      {/* Top bar */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand logo */}
        <div className="flex items-center gap-2">
          <a href="#" className="font-serif text-3xl font-black tracking-tight text-brand-primary">
            Dakingo
          </a>
        </div>

        {/* Search Input Bar */}
        <div className="hidden max-w-md flex-1 px-8 md:block">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search decadent cravings, themes, cupcakes..."
              className="w-full rounded-full border border-stone-200 bg-stone-50 py-2 pl-9 pr-4 text-sm outline-none transition-all placeholder:text-stone-400 focus:border-brand-primary focus:bg-white focus:ring-1 focus:ring-brand-primary/20"
            />
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-4">
          {/* Quick links for reminders challenge */}
          <button 
            onClick={onOpenReminders}
            className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-brand-primary bg-red-50 hover:bg-red-100 transition"
          >
            <CalendarDays className="h-3.5 w-3.5" />
            <span>Reminders</span>
          </button>

          {/* User Section */}
          {loggedInUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenHistory}
                title="Order History"
                className="rounded-full p-2 text-stone-600 hover:bg-stone-50 transition"
              >
                <History className="h-5 w-5" />
              </button>
              
              <div className="flex items-center gap-2 rounded-full border border-stone-100 bg-stone-50 p-1">
                <img
                  src={loggedInUser.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${loggedInUser.displayName}`}
                  alt={loggedInUser.displayName || 'Profile'}
                  referrerPolicy="no-referrer"
                  className="h-7 w-7 rounded-full object-cover shadow-sm"
                />
                <span className="hidden pr-2 text-xs font-medium text-stone-700 md:inline-block">
                  {loggedInUser.displayName?.split(' ')[0]}
                </span>
                <button
                  onClick={logout}
                  title="Logout"
                  className="rounded-full p-1 text-stone-400 hover:text-brand-primary"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-stone-600 hover:text-brand-primary transition"
            >
              <UserIcon className="h-4 w-4" />
              <span>Login / Signup</span>
            </button>
          )}

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center justify-center rounded-full p-2.5 text-stone-700 hover:bg-stone-50 transition"
          >
            <ShoppingBag className="h-5.5 w-5.5" />
            {totalCartCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-primary text-[9px] font-black leading-none text-white shadow-sm animate-pulse">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Quick Order Now button */}
          <button 
            onClick={onOpenCart}
            className="hidden rounded-full bg-brand-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-red-850 active:scale-95 transition-all lg:block"
          >
            ORDER NOW
          </button>
        </div>
      </div>

      {/* Nav Categories */}
     
    </header>
  );
};
