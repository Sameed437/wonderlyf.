import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";

export default function ProductCard({ product, index = 0 }) {
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group bg-white rounded-2xl overflow-hidden border border-honey/10 shadow-warm hover:shadow-warm-hover transition-all duration-300 perspective-800"
    >
      <div className="relative h-52 overflow-hidden bg-cream">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
        />
        {product.badge && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
            className="absolute top-3 left-3 bg-honey text-white text-xs font-bold px-3 py-1 rounded-full"
          >
            {product.badge}
          </motion.span>
        )}
        {discount > 0 && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }}
            className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
          >
            -{discount}%
          </motion.span>
        )}
      </div>

      <div className="p-5">
        <p className="text-honey text-xs tracking-wider uppercase mb-1 font-medium">
          {product.category}
        </p>
        <h3 className="text-warm-brown font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-warm-light text-sm leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className={
                i < Math.floor(product.rating)
                  ? "fill-honey text-honey"
                  : "text-warm-brown/15"
              }
            />
          ))}
          <span className="text-warm-light text-xs ml-1">
            ({product.reviews})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-honey-dark font-bold text-lg">
              ₹{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-warm-brown/30 line-through text-sm">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <button className="flex items-center gap-2 bg-honey/10 hover:bg-honey text-honey hover:text-white px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300">
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
