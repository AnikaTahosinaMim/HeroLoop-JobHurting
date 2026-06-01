"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Briefcase, Users, Search, Star } from "lucide-react";
// import { motion } from "motion/react"

const stats = [
  {
    icon: Briefcase,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: Users,
    value: "12K",
    label: "Companies",
  },
  {
    icon: Search,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: Star,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-black py-24 min-h-[750px] flex flex-col justify-between">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute bottom-0 left-20 h-64 w-64 rounded-full bg-purple-500/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 w-full flex flex-col items-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-10 text-center z-10"
        >
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-md">
            Trusted Worldwide
          </span>

          <h2 className="mt-6 text-4xl font-bold text-white md:text-6xl">
            Assisting over{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              15,000+
            </span>
            <br />
            Job Seekers
          </h2>
          <motion.p
            animate={{
              scale: 2,
              transition: { duration: 2 },
            }}
          >
            Animated here
          </motion.p>
          <motion.p
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => console.log("hover started!")}
          >
            Animated here now
          </motion.p>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
            Helping professionals discover meaningful opportunities and connect
            with top employers around the globe.
          </p>
        </motion.div>

        {/* Image and Cards Container */}
        <div className="relative w-full max-w-5xl flex flex-col items-center justify-center mt-12">
          {/* Globe Image (Stays in background layer) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full flex justify-center opacity-80"
          >
            <Image
              src="/globe.png" // আপনার ব্যাকগ্রাউন্ড ফাইল name_fcb0ae.png এখানে রিপ্লেস করতে পারেন
              alt="globe background"
              width={1000}
              height={600}
              className="object-contain"
              priority
            />
          </motion.div>

          {/* 4 Cards (Absolutely positioned OVER the image) */}
          <div className="absolute inset-x-0 bottom-10 md:bottom-16 grid gap-6 sm:grid-cols-2 md:grid-cols-4 z-20 px-4">
            {stats.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -10,
                    scale: 1.04,
                  }}
                  className="
                    group
                    rounded-3xl
                    border border-white/15
                    bg-black/40
                    p-6
                    backdrop-blur-xl
                    shadow-2xl
                    transition-all
                    duration-300
                    hover:border-blue-500/40
                    hover:bg-black/60
                    hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]
                  "
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 group-hover:bg-blue-500/20 transition-colors">
                    <Icon className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                  </div>

                  <h3 className="text-3xl font-bold text-white tracking-tight">
                    {item.value}
                  </h3>

                  <p className="mt-1 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
