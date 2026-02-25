"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactSection() {
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, rating, message }),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
        setRating(0);
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative z-20 bg-lamborghini-black py-24 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-orbitron mb-4 text-lamborghini-gold uppercase tracking-wider"
          >
            Contact <span className="text-white">Now</span>
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/60 font-rajdhani text-lg"
          >
            Share your experience with us.
          </motion.p>
        </div>

        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-2xl backdrop-blur-md shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="text-left">
              <label htmlFor="email" className="block text-white/50 uppercase tracking-widest text-[10px] mb-2 font-bold">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-rajdhani outline-none focus:border-lamborghini-gold transition-all rounded-lg text-lg"
              />
            </div>

            <div className="text-left">
              <label className="block text-white/50 uppercase tracking-widest text-[10px] mb-2 font-bold">
                Your Rating
              </label>
              <div className="flex gap-2 h-[52px] items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                  >
                    <svg
                      className={`w-8 h-8 ${
                        (hover || rating) >= star ? "text-lamborghini-gold" : "text-white/10"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-10 text-left">
            <label htmlFor="message" className="block text-white/50 uppercase tracking-widest text-[10px] mb-2 font-bold">
              Opinion Box
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Tell us what you think..."
              rows={5}
              className="w-full bg-white/5 border border-white/10 px-4 py-4 text-white font-rajdhani outline-none focus:border-lamborghini-gold transition-all rounded-xl text-lg resize-none"
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={status === "sending"}
              className={`w-full md:w-auto px-12 py-3 font-rajdhani font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-full border-2 ${
                status === "sending"
                  ? "border-white/20 text-white/50 cursor-not-allowed"
                  : "bg-lamborghini-gold border-lamborghini-gold text-black hover:bg-transparent hover:text-lamborghini-gold"
              }`}
            >
              {status === "sending" ? "Sending..." : "Submit"}
            </button>
          </div>

          {status === "success" && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-green-400 font-rajdhani tracking-wider text-center"
            >
              Feedback sent successfully!
            </motion.p>
          )}
          {status === "error" && (
            <p className="mt-6 text-red-400 font-rajdhani text-center">
              Submission failed. Please try again.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
