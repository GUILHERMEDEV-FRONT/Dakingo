import React, { useState } from 'react';
import { AppProvider } from './components/AppContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryMenu } from './components/CategoryMenu';
import { Bestsellers } from './components/Bestsellers';
import { OurPromise } from './components/OurPromise';
import { MagicalTicket } from './components/MagicalTicket';
import { Footer } from './components/Footer';
import { CartModal } from './components/CartModal';
import { AuthModal } from './components/AuthModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { CAKE_MENU, CakeCategory } from './types';

function AppContent() {
  const [activeCategory, setActiveCategory] = useState<CakeCategory>('classic');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Filter menu items by selected category
  const filteredCakes = CAKE_MENU.filter((cake) => cake.category === activeCategory);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openReminders = () => {
    const el = document.getElementById('magical-ticket');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] text-stone-850 selection:bg-brand-primary/10 selection:text-brand-primary font-sans">
      
      {/* Header element */}
      <Header
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenReminders={openReminders}
      />

      {/* Main Body content blocks */}
      <main>
        
        {/* Decadent Chocolate Bliss Hero Section */}
        <HeroBanner onExploreClick={scrollToMenu} />

        {/* Filter Selection Category Buttons */}
        <CategoryMenu
          activeCategory={activeCategory}
          onSelectCategory={(category) => setActiveCategory(category)}
        />

        {/* Bestseller Grid Rows & Catalog Display */}
        <Bestsellers 
          cakes={filteredCakes} 
          onOpenCart={() => setIsCartOpen(true)} 
        />

        {/* Value Promise Section */}
        <OurPromise />

        {/* Birthday Calendar Reminders (The Magical Ticket Game Challenge) */}
        <div id="magical-ticket">
          <MagicalTicket onOpenAuth={() => setIsAuthOpen(true)} />
        </div>

      </main>

      {/* Certified Bakery Footer */}
      <Footer />

      {/* Cart Slider Drawer */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Auth Modal Trigger */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Order history receipt drawer */}
      <OrderHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
