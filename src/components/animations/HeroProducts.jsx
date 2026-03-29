import { motion } from "framer-motion";

const heroProducts = [
  {
    name: "Forest Honey",
    image: "https://wonderlyf.com/wp-content/uploads/2025/12/Forest-Honey-300x300.png",
    size: 140,
    x: "50%",
    y: "45%",
    delay: 0,
    duration: 5,
    floatY: -18,
    floatX: 8,
    rotate: [-3, 3, -3],
    z: 10,
  },
  {
    name: "Kambu Ladoo",
    image: "https://wonderlyf.com/wp-content/uploads/2026/03/01-300x300.png",
    size: 100,
    x: "15%",
    y: "20%",
    delay: 0.5,
    duration: 6,
    floatY: -14,
    floatX: -10,
    rotate: [2, -4, 2],
    z: 5,
  },
  {
    name: "Keshkalpa",
    image: "https://wonderlyf.com/wp-content/uploads/2026/02/01-2-300x300.png",
    size: 110,
    x: "78%",
    y: "18%",
    delay: 0.8,
    duration: 7,
    floatY: -16,
    floatX: 12,
    rotate: [-2, 5, -2],
    z: 6,
  },
  {
    name: "Moringa Relish",
    image: "https://wonderlyf.com/wp-content/uploads/2026/02/PNG-1-300x300.png",
    size: 90,
    x: "20%",
    y: "72%",
    delay: 1.1,
    duration: 5.5,
    floatY: -12,
    floatX: -8,
    rotate: [3, -2, 3],
    z: 4,
  },
  {
    name: "Paruthipal Mix",
    image: "https://wonderlyf.com/wp-content/uploads/2025/12/Paruthipal-Mix-2-300x300.png",
    size: 85,
    x: "75%",
    y: "70%",
    delay: 1.4,
    duration: 6.5,
    floatY: -10,
    floatX: 6,
    rotate: [-4, 2, -4],
    z: 3,
  },
  {
    name: "Banana Stem Soup",
    image: "https://wonderlyf.com/wp-content/uploads/2026/02/PNG-300x300.png",
    size: 75,
    x: "48%",
    y: "85%",
    delay: 1.7,
    duration: 5.8,
    floatY: -8,
    floatX: -5,
    rotate: [1, -3, 1],
    z: 2,
  },
];

export default function HeroProducts() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-honey/8 rounded-full blur-3xl" />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 rounded-full border border-honey/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 md:w-72 md:h-72 rounded-full border border-warm-brown/5"
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
      />

      {heroProducts.map((product) => (
        <motion.div
          key={product.name}
          className="absolute"
          style={{
            left: product.x,
            top: product.y,
            zIndex: product.z,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            delay: product.delay,
            duration: 0.7,
            type: "spring",
            stiffness: 120,
            damping: 12,
          }}
        >
          <motion.div
            animate={{
              y: [0, product.floatY, 0],
              x: [0, product.floatX, 0],
              rotate: product.rotate,
            }}
            transition={{
              duration: product.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.15, zIndex: 20 }}
            className="relative group cursor-pointer"
          >
            <div
              className="absolute inset-0 rounded-full bg-honey/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ transform: "scale(1.3)" }}
            />
            <img
              src={product.image}
              alt={product.name}
              className="relative drop-shadow-lg"
              style={{ width: product.size, height: product.size, objectFit: "contain" }}
              draggable={false}
            />
            <motion.div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-white shadow-warm text-[10px] text-honey-dark px-2.5 py-1 rounded-full font-medium border border-honey/10">
                {product.name}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.2, type: "spring", stiffness: 100 }}
      >
        <div className="bg-white shadow-warm-lg rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center border border-honey/15">
          <div className="text-center">
            <div className="text-honey font-bold text-sm md:text-base">19+</div>
            <div className="text-warm-light text-[8px] md:text-[10px] uppercase tracking-wider">Products</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
