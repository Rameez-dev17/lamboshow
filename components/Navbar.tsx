"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  
  // Glass effect removed - always transparent
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0]);
  const backdropBlur = useTransform(scrollY, [0, 100], ["0px", "0px"]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0]);

  return (
    <motion.nav
      style={{
        backgroundColor: useTransform(backgroundOpacity, (v) => `rgba(26, 26, 26, ${v})`),
        backdropFilter: useTransform(backdropBlur, (v) => `blur(${v})`),
        borderBottom: useTransform(borderOpacity, (v) => `1px solid rgba(255, 255, 255, ${v})`),
      }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 md:py-6 transition-all"
    >
      <div className="flex items-center gap-4">
        <img 
          src="https://upload.wikimedia.org/wikipedia/en/d/df/Lamborghini_Logo.svg" 
          alt="Lamborghini Logo" 
          className="h-10 w-auto drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]"
        />
        <span className="hidden md:block text-xl font-bold tracking-widest font-orbitron text-white">
          LAMBORGHINI
        </span>
      </div>

      <a href="#contact" className="relative overflow-hidden group px-6 py-2 border border-white/20 text-white font-rajdhani font-semibold tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300">
        Contact Now
      </a>
    </motion.nav>
  );
}
