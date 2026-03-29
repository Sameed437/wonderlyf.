import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { products } from "../data/products";

const initialCart = [
  { ...products[1], quantity: 2 },
  { ...products[12], quantity: 1 },
  { ...products[5], quantity: 1 },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCart);
  const updateQuantity = (id, delta) => setCartItems((prev) => prev.map((item) => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item).filter((item) => item.quantity > 0));
  const removeItem = (id) => setCartItems((prev) => prev.filter((item) => item.id !== id));
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 499 ? 0 : 49;
  const total = subtotal + shipping;

  return (
    <div className="pt-28 pb-24 bg-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-warm-brown mb-2">Your Cart</h1>
          <p className="text-warm-light text-sm">{cartItems.length} item{cartItems.length !== 1 && "s"} in your cart</p>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <ShoppingBag size={48} className="mx-auto text-warm-brown/10 mb-4" />
            <p className="text-warm-light mb-6">Your cart is empty</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-honey text-white px-8 py-3 rounded-full font-bold no-underline">Start Shopping <ArrowRight size={16} /></Link>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              {cartItems.map((item, i) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-4 flex gap-4 border border-honey/10 shadow-warm">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-contain bg-cream flex-shrink-0 p-2" />
                  <div className="flex-1 min-w-0">
                    <p className="text-honey text-xs font-medium">{item.category}</p>
                    <h3 className="text-warm-brown font-semibold">{item.name}</h3>
                    <p className="text-honey-dark font-bold mt-1">₹{item.price}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeItem(item.id)} className="text-warm-brown/20 hover:text-red-400 transition-colors p-1"><Trash2 size={16} /></button>
                    <div className="flex items-center gap-3 bg-cream rounded-full px-2 py-1 border border-honey/10">
                      <button onClick={() => updateQuantity(item.id, -1)} className="text-warm-light hover:text-warm-brown p-1"><Minus size={14} /></button>
                      <span className="text-warm-brown text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="text-warm-light hover:text-warm-brown p-1"><Plus size={14} /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div>
              <div className="bg-white rounded-2xl p-6 sticky top-28 border border-honey/10 shadow-warm">
                <h3 className="text-warm-brown font-semibold mb-6">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm"><span className="text-warm-light">Subtotal</span><span className="text-warm-brown">₹{subtotal}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-warm-light">Shipping</span><span className="text-warm-brown">{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
                  {shipping > 0 && <p className="text-honey text-xs">Free shipping on orders above ₹499</p>}
                  <div className="border-t border-honey/10 pt-3 flex justify-between"><span className="text-warm-brown font-semibold">Total</span><span className="text-honey-dark font-bold text-lg">₹{total}</span></div>
                </div>
                <button className="w-full bg-honey text-white py-3.5 rounded-full font-bold hover:bg-honey-dark transition-all">Proceed to Checkout</button>
                <Link to="/shop" className="block text-center text-warm-light text-sm mt-4 hover:text-honey transition-colors no-underline">Continue Shopping</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
