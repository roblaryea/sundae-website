'use client';

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated Floating Orb */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -8, 0]
          }}
          transition={{ 
            opacity: { duration: 0.8 },
            scale: { duration: 0.6 },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <Image
              src="/logos/sundae-orb.png"
              alt="Sundae Orb"
              width={120}
              height={120}
              className="drop-shadow-lg rounded-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
          </motion.div>
        </motion.div>

        {/* 404 Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
            Looks like this scoop melted
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Let's get you back to Sundae.
          </p>
          
          <p className="text-gray-500 mb-8">
            The page you're looking for might have been moved, deleted, or never existed.
          </p>

          <Link href="/">
            <Button variant="primary" size="lg">
              Return to Homepage
            </Button>
          </Link>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl"
          animate={{ x: [-20, 20, -20], y: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-purple-200/20 rounded-full blur-2xl"
          animate={{ x: [20, -20, 20], y: [10, -10, 10] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
