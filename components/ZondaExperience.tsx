"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { CAR_DATA } from "@/data/carData";

interface ZondaExperienceProps {
  scrollYProgress: MotionValue<number>;
}

export default function ZondaExperience({ scrollYProgress }: ZondaExperienceProps) {
  // --- Animation Ranges ---
  // Hero: 0 - 0.25 (Fade out by 0.3)
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "-20%"]);

  // Design: 0.35 - 0.60 (Fade out by 0.65)
  const designOpacity = useTransform(scrollYProgress, [0.3, 0.35, 0.6, 0.65], [0, 1, 1, 0]);
  const designY = useTransform(scrollYProgress, [0.3, 0.6], ["20%", "0%"]);

  // Engine: 0.70 - 1.0
  const engineOpacity = useTransform(scrollYProgress, [0.65, 0.7, 1], [0, 1, 1]);
  const engineY = useTransform(scrollYProgress, [0.65, 1], ["20%", "0%"]);

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center items-center">
      
      {/* SECTION 1: HERO */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center p-4"
      >
        <h1 className="text-[12vw] md:text-[10vw] leading-none font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-br from-white via-bright-gold to-yellow-600 uppercase tracking-tighter drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]">
          Lamborghini
        </h1>
        <h2 className="text-2xl md:text-5xl font-rajdhani text-white font-medium tracking-[0.5em] mt-2 uppercase">
          {CAR_DATA.model}
        </h2>
      </motion.div>

      {/* SECTION 2: DESIGN */}
      <motion.div
        style={{ opacity: designOpacity, y: designY }}
        className="absolute inset-0 flex items-center justify-start px-6 md:px-24"
      >
        <div className="max-w-md p-8">
          <h3 className="text-4xl md:text-6xl font-orbitron text-white mb-6 uppercase drop-shadow-md">
            Aerodynamic <span className="text-bright-gold">Sculpture</span>
          </h3>
          <p className="text-lg md:text-xl font-rajdhani text-white/90 leading-relaxed drop-shadow-sm">
            {CAR_DATA.designDescription}
          </p>
        </div>
      </motion.div>

      {/* SECTION 3: ENGINE */}
      <motion.div
        style={{ opacity: engineOpacity, y: engineY }}
        className="absolute inset-0 flex items-center justify-end px-6 md:px-24"
      >
        <div className="text-right">
           <h3 className="text-4xl md:text-6xl font-orbitron text-white mb-8 uppercase drop-shadow-md">
             Performance <span className="text-bright-gold">Core</span>
           </h3>
           
           <div className="flex flex-col gap-6 font-rajdhani">
             <div className="pr-4">
                <span className="block text-sm text-bright-gold uppercase tracking-widest mb-1">Engine</span>
                <span className="text-4xl font-bold text-white drop-shadow-md">{CAR_DATA.engine.type}</span>
             </div>
             <div className="pr-4">
                <span className="block text-sm text-bright-gold uppercase tracking-widest mb-1">Power</span>
                <span className="text-4xl font-bold text-white drop-shadow-md">{CAR_DATA.engine.power}</span>
             </div>
             <div className="pr-4">
                <span className="block text-sm text-bright-gold uppercase tracking-widest mb-1">Acceleration</span>
                <span className="text-4xl font-bold text-white drop-shadow-md">{CAR_DATA.engine.acceleration}</span>
             </div>
             <div className="pr-4">
                <span className="block text-sm text-bright-gold uppercase tracking-widest mb-1">Max Speed</span>
                <span className="text-4xl font-bold text-white drop-shadow-md">{CAR_DATA.engine.maxSpeed}</span>
             </div>
           </div>
        </div>
      </motion.div>

      {/* GLOBAL HUD ELEMENTS (PERSISTENT) */}

    </div>
  );
}
