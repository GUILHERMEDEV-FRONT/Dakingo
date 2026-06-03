import React from 'react';
import { Truck, Sparkles, Trophy, Flame } from 'lucide-react';
import { motion } from 'motion/react';

export const OurPromise: React.FC = () => {
  const promises = [
    {
      title: 'ON-TIME DELIVERY',
      desc: 'Carefully handled, scheduled shipping',
      icon: <Truck className="h-6 w-6 text-brand-primary" />,
    },
    {
      title: '500+ DESIGNS',
      desc: 'Exclusive, artistic shapes for any mood',
      icon: <Sparkles className="h-6 w-6 text-brand-primary" />,
    },
    {
      title: '2 CR+ ORDERS',
      desc: 'Trusted and loved by dessert fans worldwide',
      icon: <Trophy className="h-6 w-6 text-brand-primary" />,
    },
    {
      title: 'BAKED FRESH',
      desc: '0% preservatives, made entirely from scratch',
      icon: <Flame className="h-6 w-6 text-brand-primary" />,
    },
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&auto=format&fit=crop&q=80', // baking cake prep
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&auto=format&fit=crop&q=80', // girl celebrating
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&auto=format&fit=crop&q=80', // baker making icing
    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&auto=format&fit=crop&q=80', // baking together joy
    'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&auto=format&fit=crop&q=80', // luxurious wedding cake
    'https://images.unsplash.com/photo-1734692928513-351516b38869?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // chocolate decorations
  ];

  return (
    <section className="bg-stone-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title Section */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl font-extrabold text-stone-900 sm:text-4xl">
            Our Promise
          </h2>
          <p className="mt-2 text-xs font-semibold tracking-wide text-brand-primary uppercase">
            There's no secret spell - only honest handwork!
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          
          {/* Left: Interactive Promise Cards */}
          <div className="space-y-6 lg:col-span-5">
            {promises.map((promise, index) => (
              <motion.div
                key={promise.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm border border-stone-100 hover:shadow-md transitionduration-200"
              >
                {/* Round icon badge */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFECEE]">
                  {promise.icon}
                </div>

                <div>
                  <h3 className="font-serif text-sm font-extrabold tracking-wider text-stone-900">
                    {promise.title}
                  </h3>
                  <p className="mt-1 text-xs text-stone-500 font-light leading-relaxed">
                    {promise.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Beautiful grid matching screenshot layout */}
          <div className="mt-8 lg:mt-0 lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {galleryImages.map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  className="overflow-hidden rounded-2xl bg-stone-100 shadow-sm aspect-[4/5] relative group"
                >
                  <img
                    src={img}
                    alt="Dakingo baking gallery craft"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover group-hover:brightness-95 transition duration-300"
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/60 to-transparent p-3 text-white text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Dakingo Passion
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
