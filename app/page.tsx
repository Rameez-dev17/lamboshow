"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import ZondaScrollCanvas from "@/components/ZondaScrollCanvas";
import ZondaExperience from "@/components/ZondaExperience";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="bg-lamborghini-black min-h-screen text-white">
      <Navbar />
      
      {/* SCROLL CONTAINER (500vh to ensure enough scroll distance) */}
      <section ref={containerRef} className="h-[500vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
            {/* CANVAS LAYER (Background) */}
            <ZondaScrollCanvas 
                scrollYProgress={scrollYProgress} 
                totalFrames={240} 
                imageFolderPath="/car-frames" 
            />
            
            {/* HUD / EXPERIENCE LAYER (Overlay) */}
            <ZondaExperience scrollYProgress={scrollYProgress} />
        </div>
      </section>

      {/* ADDITIONAL CONTENT (Below the scroll experience) */}
      <div className="relative z-20 bg-lamborghini-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-24">
            <h3 className="text-4xl font-orbitron mb-12 text-center text-lamborghini-gold">
                Detailed Specifications
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                <SpecCard title="Chassis" value="Monofuselage Carbon" />
                <SpecCard title="Combustion Engine" value="6.5L V12" />
                <SpecCard title="Electric Motors" value="3x Axial Flux" />
                <SpecCard title="Top Speed" value="> 350 km/h" />
                <SpecCard title="0-100 km/h" value="2.5 s" />
                <SpecCard title="Dry Weight" value="1772 kg" />
            </div>

            <footer className="text-center text-white/50 font-rajdhani border-t border-white/10 pt-12 pb-12">
                <p className="text-sm tracking-widest uppercase mb-2">Designed by</p>
                <p className="text-2xl font-orbitron text-lamborghini-gold tracking-wider">RAMEEZ RAHMAN</p>
            </footer>
        </div>
      </div>
    </main>
  );
}

function SpecCard({ title, value }: { title: string; value: string }) {
    return (
        <div className="border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-colors">
            <h4 className="text-white/50 uppercase tracking-widest text-sm mb-2">{title}</h4>
            <p className="text-2xl font-rajdhani font-bold text-white">{value}</p>
        </div>
    );
}
