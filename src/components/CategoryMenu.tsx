import React from 'react';
import { Cake, Sparkles, ChefHat, Cookie } from 'lucide-react';
import { CakeCategory } from '../types';

interface CategoryMenuProps {
  activeCategory: CakeCategory;
  onSelectCategory: (category: CakeCategory) => void;
}

export const CategoryMenu: React.FC<CategoryMenuProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const categories: { id: CakeCategory; label: string; description: string; icon: React.ReactNode }[] = [
    {
      id: 'classic',
      label: 'CLASSIC',
      description: 'Traditional Truffles & Sponge',
      icon: <Cake className="h-5 w-5" />,
    },
    {
      id: 'gourmet',
      label: 'GOURMET',
      description: 'Artisanal & Exotic Flavours',
      icon: <ChefHat className="h-5 w-5" />,
    },
    {
      id: 'desserts',
      label: 'DESSERTS',
      description: 'Lava Cakes & Cheesecakes',
      icon: <Sparkles className="h-5 w-5" />,
    },
    {
      id: 'cookies',
      label: 'COOKIES',
      description: 'Flaky & Buttery Biscuits',
      icon: <Cookie className="h-5 w-5" />,
    },
  ];

  return (
    <section id="menu" className="bg-[#FFFDFB] py-12 border-t border-stone-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Section */}
        <div className="text-center md:text-left mb-8">
          <h2 className="font-serif text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
            Menu
          </h2>
          <p className="mt-1.5 text-sm font-semibold tracking-wide text-brand-primary uppercase">
            What will you wish for?
          </p>
        </div>

        {/* Category Grid Selection */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group flex flex-col items-center justify-center rounded-2xl border p-5 text-center transition-all duration-300 select-none cursor-pointer ${
                  isSelected
                    ? 'border-brand-primary bg-brand-primary text-white shadow-lg shadow-brand-primary/10'
                    : 'border-stone-100 bg-stone-50 text-stone-700 hover:border-brand-primary/35 hover:bg-white'
                }`}
              >
                {/* Round icon wrapper */}
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300 ${
                    isSelected
                      ? 'bg-white/20 text-brand-accent'
                      : 'bg-[#FFECEE] text-brand-primary group-hover:bg-brand-primary group-hover:text-white'
                  }`}
                >
                  {cat.icon}
                </span>

                <h3 className="mt-4 font-serif text-sm font-extrabold tracking-wider">
                  {cat.label}
                </h3>
                
                <p
                  className={`mt-1 text-[10px] ${
                    isSelected ? 'text-white/80' : 'text-stone-400'
                  } hidden sm:block`}
                >
                  {cat.description}
                </p>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
