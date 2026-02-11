"use client";

import { MotionValue, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ZondaScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
  totalFrames: number;
  imageFolderPath: string;
}

export default function ZondaScrollCanvas({
  scrollYProgress,
  totalFrames,
  imageFolderPath,
}: ZondaScrollCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    let active = true;
    const loadImages = async () => {
      const promises = [];
      for (let i = 0; i < totalFrames; i++) {
        // Filename format: ezgif-frame-001.jpg -> ezgif-frame-240.jpg
        const frameNumber = (i + 1).toString().padStart(3, "0");
        const src = `${imageFolderPath}/ezgif-frame-${frameNumber}.jpg`;
        promises.push(
          new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = () => resolve(img); // Continue even on error
          })
        );
      }

      const loadedImages = await Promise.all(promises);
      if (active) {
        setImages(loadedImages);
        setIsLoaded(true);
      }
    };

    loadImages();
    return () => {
      active = false;
    };
  }, [totalFrames, imageFolderPath]);

  // Render logic
  const render = (progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !isLoaded || images.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Resize canvas if needed (avoid clearing if size hasn't changed, but we redraw anyway)
    if (
      canvas.width !== rect.width * dpr ||
      canvas.height !== rect.height * dpr
    ) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }

    // Optimize for quality
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // Frame calculation
    // Clamp between 0 and totalFrames - 1
    const frameIndex = Math.min(
      totalFrames - 1,
      Math.max(0, Math.floor(progress * totalFrames))
    );

    const img = images[frameIndex];
    if (!img) return;

    // "Object-fit: contain" logic with slight zoom to hide watermark "Veo"
    // The watermark is likely at the edges. A scaling factor > 1 acts as a zoom.
    const zoomFactor = 1.15; // 15% zoom to crop edges
    
    // Calculate ratio to cover/contain
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    // maximizing ratio to fill screen (cover) instead of contain might also help remove watermark if it's in letterbox
    // But user asked for "contain" logic originally. 
    // Let's stick to contain but scaled up.
    const ratio = Math.min(hRatio, vRatio) * zoomFactor;

    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply optional filter for sharpness directly on context if needed, but CSS is better for performance usually.
    // However, drawing it slightly larger and downscaling is hard here since source is smaller than screen.
    // We rely on high quality smoothing.
    
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  };

  // Sync with scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    requestAnimationFrame(() => render(latest));
  });

  // Handle window resize and initial render
  useEffect(() => {
    if (isLoaded) {
        render(scrollYProgress.get());
    }
    
    const handleResize = () => {
      if (isLoaded) render(scrollYProgress.get());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, images]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full filter contrast-125 saturate-110 drop-shadow-2xl" 
    />
  );
}
