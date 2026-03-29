import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Package, Heart, LogOut } from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
  ];

  return (
    <div className="pt-28 pb-24 bg-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-warm-brown mb-2">My Account</h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-6 border border-honey/10 shadow-warm">
          <div className="w-20 h-20 rounded-full bg-honey/10 flex items-center justify-center"><User size={32} className="text-honey" /></div>
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-warm-brown text-xl font-semibold">Priya Sharma</h2>
            <p className="text-warm-light text-sm">Member since 2024</p>
          </div>
          <button className="flex items-center gap-2 bg-cream text-warm-light hover:text-red-400 px-4 py-2 rounded-full text-sm transition-colors border border-honey/10"><LogOut size={14} /> Sign Out</button>
        </motion.div>

        <div className="flex gap-2 mb-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeTab === id ? "bg-honey text-white shadow-warm" : "bg-white text-warm-gray hover:text-warm-brown border border-honey/10"}`}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {activeTab === "profile" && (
            <div className="bg-white rounded-2xl p-8 border border-honey/10 shadow-warm">
              <h3 className="text-warm-brown font-semibold mb-6">Personal Information</h3>
              <div className="grid sm:grid-cols-2 gap-5">
                {[
                  { icon: User, label: "Full Name", value: "Priya Sharma" },
                  { icon: Mail, label: "Email", value: "priya@example.com" },
                  { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                  { icon: MapPin, label: "Address", value: "Mumbai, Maharashtra" },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label}>
                    <label className="text-warm-light text-xs uppercase tracking-wider flex items-center gap-1 mb-2"><Icon size={12} /> {label}</label>
                    <input type="text" defaultValue={value} className="w-full bg-cream border border-honey/10 rounded-xl px-4 py-3 text-sm text-warm-brown outline-none focus:border-honey/30 transition-colors" />
                  </div>
                ))}
              </div>
              <button className="mt-6 bg-honey text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-honey-dark transition-all">Save Changes</button>
            </div>
          )}
          {activeTab === "orders" && (
            <div className="bg-white rounded-2xl p-8 text-center py-16 border border-honey/10 shadow-warm">
              <Package size={40} className="mx-auto text-warm-brown/10 mb-4" />
              <p className="text-warm-light">No orders yet. Start exploring our products!</p>
            </div>
          )}
          {activeTab === "wishlist" && (
            <div className="bg-white rounded-2xl p-8 text-center py-16 border border-honey/10 shadow-warm">
              <Heart size={40} className="mx-auto text-warm-brown/10 mb-4" />
              <p className="text-warm-light">Your wishlist is empty. Browse and save items you love!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
