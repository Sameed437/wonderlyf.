import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Hero background video with honey pouring effect.
 *
 * To use your own video:
 * 1. Download a honey pouring video from https://www.pexels.com/search/videos/honey/
 * 2. Save it as: public/videos/honey-hero.mp4
 * 3. The component will automatically use it.
 *
 * Or set a direct URL below:
 */
const LOCAL_VIDEO = "/videos/honey-hero.mp4";

export default function HeroVideo() {
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onLoaded = () => setLoaded(true);
    const onError = () => setFailed(true);

    video.addEventListener("canplay", onLoaded);
    video.addEventListener("error", onError);

    // Try loading
    video.src = LOCAL_VIDEO;
    video.load();

    return () => {
      video.removeEventListener("canplay", onLoaded);
      video.removeEventListener("error", onError);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Video element */}
      {!failed && (
        <motion.video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        />
      )}

      {/* Animated golden fallback when no video */}
      {(failed || !loaded) && (
        <div className="absolute inset-0">
          {/* Animated honey glow spots */}
          <motion.div
            className="absolute rounded-full blur-3xl"
            style={{
              width: 500,
              height: 500,
              top: "10%",
              right: "10%",
              background: "radial-gradient(circle, rgba(240,193,75,0.2) 0%, transparent 70%)",
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 15, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute rounded-full blur-3xl"
            style={{
              width: 400,
              height: 400,
              bottom: "15%",
              left: "20%",
              background: "radial-gradient(circle, rgba(212,148,10,0.12) 0%, transparent 70%)",
            }}
            animate={{
              x: [0, -25, 15, 0],
              y: [0, 20, -10, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div
            className="absolute rounded-full blur-3xl"
            style={{
              width: 300,
              height: 300,
              top: "40%",
              left: "50%",
              background: "radial-gradient(circle, rgba(245,200,80,0.15) 0%, transparent 70%)",
            }}
            animate={{
              x: [0, 40, -30, 0],
              y: [0, -30, 20, 0],
              opacity: [0.5, 0.8, 0.4, 0.5],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </div>
      )}

      {/* Overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/40 to-cream/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-cream/80 via-cream/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-cream to-transparent" />
      <div className="absolute inset-0 bg-honey/[0.02]" />
    </div>
  );
}
