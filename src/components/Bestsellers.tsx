import React, { useState } from 'react';
import { Heart, Star, ShoppingCart, Check, SlidersHorizontal } from 'lucide-react';
import { Cake, FLAVOUR_OPTIONS, WEIGHT_OPTIONS } from '../types';
import { useApp } from './AppContext';
import { motion, AnimatePresence } from 'motion/react';

interface BestsellersProps {
  cakes: Cake[];
  onOpenCart: () => void;
}

export const Bestsellers: React.FC<BestsellersProps> = ({ cakes, onOpenCart }) => {
  const { addToCart } = useApp();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [addingState, setAddingState] = useState<Record<string, boolean>>({});
  
  // Custom selection states map to let user configure flavour and weight per item prior to adding!
  const [selectedFlavours, setSelectedFlavours] = useState<Record<string, string>>({});
  const [selectedWeights, setSelectedWeights] = useState<Record<string, number>>({});
  const [showConfig, setShowConfig] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (cake: Cake) => {
    const flavour = selectedFlavours[cake.id] || FLAVOUR_OPTIONS[0];
    const weight = selectedWeights[cake.id] || WEIGHT_OPTIONS[0];

    // Trigger adding animation state
    setAddingState((prev) => ({ ...prev, [cake.id]: true }));
    addToCart(cake, 1, flavour, weight);

    setTimeout(() => {
      setAddingState((prev) => ({ ...prev, [cake.id]: false }));
    }, 1500);
  };

  // Extract bestsellers and remaining catalog for beautiful organization
  const bestsellerCakes = cakes.filter((c) => c.isBestseller);
  const regularCakes = cakes.filter((c) => !c.isBestseller);

  const renderCakeCard = (cake: Cake) => {
    const isFav = favorites.includes(cake.id);
    const isAdding = addingState[cake.id];
    
    const configuredFlavour = selectedFlavours[cake.id] || FLAVOUR_OPTIONS[0];
    const configuredWeight = selectedWeights[cake.id] || WEIGHT_OPTIONS[0];
    const isConfigOpen = showConfig[cake.id];

    // Weight multiplier calculation: base weight is 1.0kg. E.g. 0.5kg is half price
    const computedPrice = Math.round(cake.price * (configuredWeight / 1.0));
    const computedOriginalPrice = Math.round(cake.originalPrice * (configuredWeight / 1.0));

    return (
      <div
        key={cake.id}
        className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-stone-100 bg-white p-4 shadow-sm hover:shadow-md transition-all duration-300"
      >
        {/* Heart Badge */}
        <button
          onClick={() => toggleFavorite(cake.id)}
          className={`absolute left-3 top-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full shadow-sm backdrop-blur-sm transition-all duration-150 ${
            isFav 
              ? 'bg-[#FFECEE] text-brand-primary' 
              : 'bg-white/80 text-stone-400 hover:text-red-500'
          }`}
        >
          <Heart className="h-4.5 w-4.5" fill={isFav ? "currentColor" : "none"} />
        </button>

        {/* Thumbnail Image */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-50">
          <img
            src={cake.image}
            alt={cake.name}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          <button
            onClick={() => setShowConfig((prev) => ({ ...prev, [cake.id]: !prev[cake.id] }))}
            className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-stone-600 shadow-sm hover:bg-brand-primary hover:text-white transition cursor-pointer"
            title="Configure weight & flavour"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Title, rating and reviews */}
        <div className="mt-4 flex flex-col flex-grow">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-brand-accent text-brand-accent" />
            <span className="text-xs font-bold text-stone-700">{cake.rating}</span>
            <span className="text-[10px] text-stone-400">({cake.reviewsCount}+ reviews)</span>
          </div>

          <h3 className="mt-2 text-stone-900 font-serif text-base font-extrabold line-clamp-1 group-hover:text-brand-primary transition-colors">
            {cake.name}
          </h3>

          <p className="mt-1 text-[11px] text-stone-400 leading-relaxed font-light line-clamp-2">
            {cake.description}
          </p>
        </div>

        {/* Config drawer selection if expanded */}
        <AnimatePresence>
          {isConfigOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-3 overflow-hidden border-t border-stone-100 pt-3 flex flex-col gap-2.5 text-xs text-stone-600"
            >
              <div>
                <p className="font-semibold text-stone-700 mb-1">Select Weight:</p>
                <div className="flex gap-1.5">
                  {WEIGHT_OPTIONS.map((w) => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeights((prev) => ({ ...prev, [cake.id]: w }))}
                      className={`px-2 py-1 rounded bg-stone-50 border font-semibold text-[10px] transition cursor-pointer ${
                        configuredWeight === w
                          ? 'border-brand-primary bg-brand-primary/10 text-brand-primary'
                          : 'border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      {w} kg
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="font-semibold text-stone-700 mb-1">Cake Flavour:</p>
                <select
                  value={configuredFlavour}
                  onChange={(e) => setSelectedFlavours((prev) => ({ ...prev, [cake.id]: e.target.value }))}
                  className="w-full rounded border border-stone-200 bg-stone-50 px-2 py-1 outline-none text-[11px]"
                >
                  {FLAVOUR_OPTIONS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prices and dynamic add to cart action */}
        <div className="mt-4 flex items-center justify-between border-t border-stone-50 pt-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-stone-400 font-medium">
              {configuredWeight} kg - {configuredFlavour.split(' ')[0]}
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold tracking-tight text-stone-900">
                ₹{computedPrice}
              </span>
              <span className="text-xs text-stone-400 line-through">
                ₹{computedOriginalPrice}
              </span>
            </div>
          </div>

          <button
            onClick={() => handleAddToCart(cake)}
            className={`flex h-10 w-10 items-center justify-center rounded-full shadow-sm active:scale-95 transition-all cursor-pointer ${
              isAdding
                ? 'bg-[#31C48D] text-white'
                : 'bg-brand-primary text-white hover:bg-brand-primary/95'
            }`}
          >
            {isAdding ? <Check className="h-4.5 w-4.5" /> : <ShoppingCart className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>
    );
  };

  return (
    <section className="bg-stone-50/50 pb-16">
      
      {/* 1. Bestsellers row matching screenshot layout */}
      <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl font-extrabold text-stone-900 sm:text-3xl">
              Bestsellers from Across the Country
            </h2>
            <p className="text-xs text-stone-500 font-medium mt-1">
              Perfected over centuries of recipes, delivered fresh to your door
            </p>
          </div>

          <button
            onClick={onOpenCart}
            className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-bold text-stone-600 hover:border-brand-primary hover:text-brand-primary transition"
          >
            <span>VIEW ALL</span>
          </button>
        </div>

        {bestsellerCakes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellerCakes.map((cake) => renderCakeCard(cake))}
          </div>
        ) : (
          <p className="text-center text-stone-400 py-10">No items available in this selection.</p>
        )}
      </div>

      {/* 2. Dynamic Filtered Selections row */}
      {regularCakes.length > 0 && (
        <div className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8 border-t border-stone-100">
          <div className="mb-8 text-center sm:text-left">
            <h2 className="font-serif text-2xl font-extrabold text-stone-900 sm:text-3xl">
              Gourmet Selections
            </h2>
            <p className="text-xs text-stone-500 font-medium mt-1">
              Specially curated for premium experiences
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {regularCakes.map((cake) => renderCakeCard(cake))}
          </div>
        </div>
      )}

    </section>
  );
};
