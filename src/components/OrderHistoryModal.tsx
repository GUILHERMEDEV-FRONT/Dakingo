import React from 'react';
import { X, Calendar, MapPin, Receipt, Clock } from 'lucide-react';
import { useApp } from './AppContext';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({ isOpen, onClose }) => {
  const { orders } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      
      {/* Background Mask */}
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg rounded-[2.5rem] bg-white p-7 shadow-2xl border border-stone-100 mt-20 flex flex-col max-h-[80vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <h2 className="text-lg font-serif font-extrabold text-stone-900 flex items-center gap-2">
            <Receipt className="text-brand-primary h-5 w-5" />
            <span>Order Transaction History</span>
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-stone-400 hover:bg-stone-50 hover:text-stone-700 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Orders list */}
        <div className="flex-1 overflow-y-auto py-5 space-y-4 scrollbar-thin">
          {orders.length === 0 ? (
            <div className="text-center py-16 text-stone-400">
              <Receipt className="h-12 w-12 mb-3 mx-auto text-stone-300 stroke-1" />
              <p className="font-serif text-sm font-bold text-stone-800">No transactions recorded</p>
              <p className="text-xs text-stone-400 mt-1">
                Your past chocolate purchases and cake deliveries will secure here!
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="rounded-2xl border border-stone-100 bg-stone-50 p-4 space-y-3.5 hover:shadow-sm transition"
              >
                {/* ID, Status & Date */}
                <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-stone-400">ORDER EX: #{order.id.slice(0, 8).toUpperCase()}</span>
                    <span className="text-[10px] text-stone-500 font-medium mt-0.5 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(order.createdAt).toLocaleDateString()} • {new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>

                  <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[9px] font-black uppercase text-amber-600 border border-amber-100 flex items-center gap-1 animate-pulse">
                    <Clock className="h-2.5 w-2.5" />
                    <span>{order.status}</span>
                  </span>
                </div>

                {/* Items in order */}
                <div className="space-y-2">
                  {order.items.map((item, id) => (
                    <div key={id} className="flex items-center justify-between text-xs text-stone-700">
                      <div className="flex flex-col">
                        <span className="font-bold text-stone-900">{item.cakeName}</span>
                        <span className="text-[9px] text-stone-400 font-medium">
                          {item.weight} kg • {item.flavour}
                        </span>
                      </div>
                      <span className="text-stone-500 font-medium">
                        ₹{item.price} x {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Delivery details & Subtotals */}
                <div className="border-t border-stone-150 pt-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-stone-400 pr-4 max-w-xs">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-primary" />
                    <span className="text-[10px] truncate leading-tight font-light">{order.deliveryAddress}</span>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-[9px] uppercase tracking-wide text-stone-400 font-bold">Total Bill</span>
                    <span className="text-sm font-extrabold text-brand-primary">₹{order.totalAmount}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
