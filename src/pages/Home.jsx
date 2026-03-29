import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Star, ChevronRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import ProductCard from "../components/ProductCard";
import HeroProducts from "../components/animations/HeroProducts";
import HoneyProcess from "../components/animations/HoneyProcess";
import AnimatedCounter from "../components/animations/AnimatedCounter";
import StaggeredReveal from "../components/animations/StaggeredReveal";
import Marquee from "../components/animations/Marquee";
import CategoryCarousel from "../components/animations/CategoryCarousel";
import WhyChooseUs from "../components/animations/WhyChooseUs";
import ProductJourney from "../components/animations/ProductJourney";
import ProductShowcase from "../components/animations/ProductShowcase";
import HeroVideo from "../components/animations/HeroVideo";
import {
  products,
  testimonials,
  stats,
  marqueeItems,
  categoryImages,
  whyChooseUs,
} from "../data/products";

export default function Home() {
  const featuredProducts = [
    products.find((p) => p.name === "Toor Dal"),
    products.find((p) => p.name === "Kambu Ladoo"),
    products.find((p) => p.name === "Moringa Relish"),
    products.find((p) => p.name === "Wonderlyf's Keshkalpa"),
    products.find((p) => p.name === "Banana Stem Soup Mix"),
    products.find((p) => p.name === "Mudakathan Thokku"),
  ].filter(Boolean);

  return (
    <>
      {/* ─── MARQUEE ─── */}
      <div className="pt-16">
        <Marquee items={marqueeItems} />
      </div>

      {/* ─── HERO (Full-screen video) ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroVideo />

        {/* Hero content — centered over video */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
            <motion.p
              className="text-honey-light text-sm md:text-base tracking-widest uppercase mb-5 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Crafting Authentic, Nutritious Food
            </motion.p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 text-white drop-shadow-lg">
              Bring Wonders
              <br />
              <span className="text-honey-light">to your Life</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto drop-shadow">
              Traditional wellness products rooted in ancient wisdom. Pure. Natural. Homemade.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/shop" className="inline-flex items-center gap-2 bg-honey text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-honey-light hover:text-warm-brown transition-all duration-300 no-underline shadow-warm-lg cta-pulse">
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link to="/about" className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/25 transition-all duration-300 no-underline">
                Our Story <ChevronRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <motion.div className="w-1.5 h-3 bg-honey rounded-full" animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          </div>
        </motion.div>
      </section>

      {/* ─── FLOATING PRODUCTS SECTION ─── */}
      <section className="py-20 bg-cream relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading
            subtitle="Our Range"
            title="Products Made with Love"
            description="Explore our handcrafted collection of traditional wellness products."
          />
          <HeroProducts />
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="relative py-12 border-y border-honey/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
              <AnimatedCounter value={stat.value} className="text-2xl md:text-3xl font-bold honey-text" />
              <div className="text-warm-light text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading subtitle="Browse Categories" title="Explore Our Range" description="From healing bowls to grandma's crunchy treats, discover wellness in every category." />
          <CategoryCarousel categories={categoryImages} />
        </div>
      </section>

      {/* ─── PRODUCT SHOWCASE ─── */}
      <section className="border-y border-honey/10 bg-white">
        <ProductShowcase />
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading subtitle="Featured Products" title="Crafted With Care" description="Our most loved products, handpicked from across our collection." />
          <StaggeredReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </StaggeredReveal>
          <div className="text-center mt-12">
            <Link to="/shop" className="inline-flex items-center gap-2 bg-white border border-honey/20 text-honey-dark px-8 py-3 rounded-full font-semibold hover:shadow-warm-hover transition-all no-underline shadow-warm">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOREST HONEY JOURNEY ─── */}
      <section className="py-24 border-y border-honey/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <ProductJourney />
        </div>
      </section>

      {/* ─── HONEY MAKING PROCESS ─── */}
      <section className="border-y border-honey/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-24">
          <SectionHeading subtitle="Our Process" title="From Our Kitchen" description="Every product follows a journey from nature to your doorstep, preserving purity at every step." />
        </div>
        <HoneyProcess />
      </section>

      {/* ─── ABOUT ─── */}
      <section className="py-24 relative overflow-hidden bg-cream">
        <div className="relative max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <img src="https://wonderlyf.com/wp-content/uploads/2026/02/About-US_Wonderlyf.jpg" alt="About Wonderlyf" className="rounded-2xl w-full shadow-warm-lg" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-honey text-sm tracking-widest uppercase mb-4 font-medium">About Us</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-warm-brown mb-6">Purity, Warmth & Wonders of Home</h2>
            <p className="text-warm-light text-base leading-relaxed mb-8">
              Wonderlyf is dedicated to crafting authentic, nutritious food products rooted in traditional wisdom. Born from a passion for preserving time-honored recipes and promoting holistic well-being, Wonderlyf brings you the purity, warmth, and wonders of home.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 bg-honey text-white px-8 py-3.5 rounded-full font-bold hover:bg-honey-dark transition-all no-underline shadow-warm">
              Discover Our Story <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-24 border-y border-honey/10 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading subtitle="Why Wonderlyf" title="Why Choose Us" description="What makes Wonderlyf different from the rest." />
          <WhyChooseUs items={whyChooseUs} />
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeading subtitle="Testimonials" title="Loved by Families" description="Hear from the families who've made Wonderlyf a part of their daily wellness." />
          <StaggeredReveal className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl p-6 border border-honey/10 shadow-warm">
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} className="fill-honey text-honey" />)}
                </div>
                <p className="text-warm-gray text-sm leading-relaxed mb-4 italic">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="text-warm-brown font-semibold text-sm">{t.name}</p>
                  <p className="text-warm-light text-xs">{t.location}</p>
                </div>
              </div>
            ))}
          </StaggeredReveal>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 bg-warm-brown">
        <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-honey-light mb-4">Pure. Natural. Wonderlyf.</h2>
            <p className="text-cream-dark/60 mb-8">Join thousands of families who trust Wonderlyf for their wellness journey. Safe & Secure Payments. Fast Delivery Across India.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-honey text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-honey-light hover:text-warm-brown transition-all no-underline">
              Shop Now <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
