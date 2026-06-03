import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, MapPin, Phone, Check, CreditCard } from 'lucide-react';
import { useApp } from './AppContext';
import { motion, AnimatePresence } from 'motion/react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    removeFromCart,
    clearCart,
    getCartTotal,
    activeCoupon,
    isCouponApplied,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    placeOrder,
    user,
    guestUser
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [checkingOut, setCheckingOut] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [addressError, setAddressError] = useState('');

  const isLoggedIn = user || guestUser;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput) return;
    
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponInput('');
    } else {
      setCouponError('Invalid coupon code or challenge incomplete!');
    }
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddressError('');
    
    if (!isLoggedIn) {
      setAddressError('Please sign in or log in to complete checkout.');
      return;
    }
    if (!address || !phone) {
      setAddressError('Kindly provide both a delivery address and phone number.');
      return;
    }

    setCheckingOut(true);
    try {
      await placeOrder(address, phone);
      setAddress('');
      setPhone('');
      setPurchaseSuccess(true);
      setTimeout(() => {
        setPurchaseSuccess(false);
        onClose();
      }, 3000);
    } catch (err) {
      console.error(err);
      setAddressError('Checkout failed. Please try again.');
    } finally {
      setCheckingOut(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      
      {/* Background Mask */}
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        
        {/* Slid-out Panel */}
        <div className="pointer-events-auto w-screen max-w-md bg-white shadow-2xl flex flex-col h-full ring-1 ring-black/5">
          
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-stone-100 p-5">
            <h2 className="text-lg font-serif font-extrabold text-stone-900 flex items-center gap-2">
              <ShoppingBag className="text-brand-primary h-5 w-5" />
              <span>Your Dakingo Basket</span>
            </h2>
            <button
              onClick={onClose}
              className="rounded-full p-1.5 text-stone-400 hover:bg-stone-50 hover:text-stone-700 transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-thin">
            
            {/* Success message popup */}
            {purchaseSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4 animate-bounce-slow">
                  <Check className="h-8 w-8" />
                </span>
                <h3 className="font-serif text-xl font-bold text-stone-900">Order Placed Successfully!</h3>
                <p className="mt-2 text-xs text-stone-500 max-w-sm font-light px-4 leading-relaxed">
                  Your cake is being baked with love! You can check your transactions inside your Order history.
                </p>
              </div>
            ) : cart.length === 0 ? (
              
              /* Empty Basket view */
              <div className="flex flex-col items-center justify-center text-center py-20 text-stone-400">
                <ShoppingBag className="h-14 w-14 mb-4 stroke-1 text-stone-300" />
                <p className="font-serif text-sm font-bold text-stone-800">Your basket is empty</p>
                <p className="text-xs text-stone-400 mt-1.5 max-w-xs font-light leading-relaxed">
                  Go ahead and browse our decadent Bestsellers. Select custom coatings and weights to proceed!
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 rounded-full border border-brand-primary px-5 py-2 text-[10px] font-bold text-brand-primary uppercase tracking-wider hover:bg-brand-primary hover:text-white transition cursor-pointer"
                >
                  Start Browsing
                </button>
              </div>
            ) : (
              
              /* Populated list elements */
              <>
                <div className="space-y-4">
                  {cart.map((item, idx) => {
                    const weightMultiplier = item.weight / 1.0;
                    const cakePrice = Math.round(item.cake.price * weightMultiplier);
                    const itemTotal = cakePrice * item.quantity;
                    return (
                      <div
                        key={`${item.cake.id}-${item.flavour}-${item.weight}-${idx}`}
                        className="flex items-center justify-between rounded-2xl bg-stone-50 border border-stone-100 p-3 hover:bg-stone-50/85 transition"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={item.cake.image}
                            alt={item.cake.name}
                            referrerPolicy="no-referrer"
                            className="h-14 w-14 rounded-xl object-cover shadow-sm bg-white border border-stone-100 shrink-0"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-stone-800 line-clamp-1">{item.cake.name}</h4>
                            <p className="text-[10px] text-stone-400 font-medium mt-0.5">
                              {item.weight} kg • {item.flavour}
                            </p>
                            <p className="text-xs font-black text-brand-primary mt-1">
                              ₹{cakePrice} <span className="text-[10px] font-light text-stone-400">x {item.quantity}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3.5 pl-2">
                          <span className="text-xs font-extrabold text-stone-800 shrink-0">₹{itemTotal}</span>
                          <button
                            onClick={() => removeFromCart(item.cake.id, item.flavour, item.weight)}
                            className="rounded-full p-1.5 text-stone-300 hover:text-brand-primary hover:bg-white transition cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Coupon Code submission block */}
                <div className="border-t border-b border-stone-100 py-4">
                  {isCouponApplied ? (
                    <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-100 p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 text-sm">🎟️</span>
                        <div>
                          <p className="text-[10px] uppercase font-black tracking-wider text-emerald-800">Coupon Code Applied</p>
                          <p className="text-[11px] font-bold text-emerald-600">MAGICAL750 (₹750 Voucher)</p>
                        </div>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs font-bold text-red-500 hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-bold text-stone-700 mb-2">Have a promo card or coupon?</p>
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="e.g. MAGICAL750"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-3 py-2 text-xs outline-none focus:border-brand-primary focus:bg-white uppercase font-serif tracking-wider"
                        />
                        <button
                          type="submit"
                          className="rounded-xl bg-brand-primary px-4 py-2 text-xs font-bold text-white hover:bg-stone-900 transition cursor-pointer"
                        >
                          Apply
                        </button>
                      </form>
                      {activeCoupon === 'MAGICAL750' && (
                        <p className="text-[10px] text-emerald-500 font-bold mt-1.5">
                          🎁 Type and Apply code <strong>MAGICAL750</strong> to claim your ₹750 discount!
                        </p>
                      )}
                      {couponError && (
                        <p className="text-[10px] text-brand-primary font-bold mt-1">{couponError}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Secure Checkout Delivery Form */}
                <div className="space-y-4">
                  <h3 className="font-serif text-sm font-bold text-stone-900 flex items-center gap-1.5 border-b border-stone-50 pb-2">
                    <MapPin className="h-4 w-4 text-brand-primary" />
                    <span>Secure Delivery Details</span>
                  </h3>

                  <form onSubmit={handleCheckoutSubmit} className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                        Shipping Delivery Address
                      </label>
                      <textarea
                        rows={2}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="House Number, Street Name, City, Pincode"
                        className="w-full rounded-xl border border-stone-200 bg-stone-50 p-3 text-xs outline-none focus:border-brand-primary focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                        Contact Telephone Number
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-stone-400">
                          <Phone className="h-3.5 w-3.5" />
                        </span>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full rounded-xl border border-stone-200 bg-stone-50 py-2 pl-9 pr-3 text-xs outline-none focus:border-brand-primary focus:bg-white"
                        />
                      </div>
                    </div>

                    {addressError && (
                      <p className="text-xs text-brand-primary font-semibold">{addressError}</p>
                    )}

                    {!isLoggedIn && (
                      <p className="text-[11px] text-[#A06D1A] bg-[#FFFBEA] border border-[#FBE3B5] px-3 py-2 rounded-xl">
                        ⚠️ Kindly **Login or Signup** using account credentials above to trigger authentic database ordering.
                      </p>
                    )}

                    {isLoggedIn && (
                      <button
                        type="submit"
                        disabled={checkingOut}
                        className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-brand-primary py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-brand-primary/95 transition-all disabled:bg-stone-300 cursor-pointer"
                      >
                        <CreditCard className="h-4 w-4" />
                        <span>{checkingOut ? 'Placing Order...' : 'Confirm Order (COD)'}</span>
                      </button>
                    )}
                  </form>
                </div>
              </>
            )}

          </div>

          {/* Checkout Totals Summary */}
          {!purchaseSuccess && cart.length > 0 && (
            <div className="border-t border-stone-100 bg-[#FFFDFB] p-5 space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>Subtotal</span>
                <span>₹{getCartTotal()}</span>
              </div>
              
              {isCouponApplied && (
                <div className="flex items-center justify-between text-xs text-emerald-600 font-semibold">
                  <span>Voucher Offer</span>
                  <span>- ₹{couponDiscount}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                <span>Delivery fees</span>
                <span className="text-emerald-500 uppercase font-bold text-[10px]">Free Shipping</span>
              </div>

              <div className="flex items-center justify-between border-t border-stone-100 pt-3 text-sm">
                <span className="font-serif font-black text-stone-900">Final Order Total</span>
                <span className="text-lg font-black text-brand-primary">
                  ₹{Math.max(0, getCartTotal() - couponDiscount)}
                </span>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
