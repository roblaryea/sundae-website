'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useCta } from '@/lib/cta';

export default function SignInComingSoonPage() {
  const cta = useCta();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/80 via-purple-50/30 to-blue-50/60 dark:from-graphite dark:via-gray-900 dark:to-deep-blue/20 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-electric-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-lg w-full text-center"
      >
        {/* Floating Orb */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            scale: [1, 1.02, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="mx-auto mb-8"
        >
          <div className="relative">
            <Image
              src="/logos/sundae-orb.png"
              alt="Sundae"
              width={120}
              height={120}
              className="mx-auto drop-shadow-2xl"
              priority
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-2xl"
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Sundae is Almost Ready to Serve
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-6"
        >
          Your 4D Intelligence platform is baking in the final touches.
        </motion.p>

        {/* Body Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 space-y-4"
        >
          <p>
            We're preparing the new Sundae experience — where decisions become intelligent, insights become proactive, and operators move beyond dashboards into real decision clarity.
          </p>
          <p>
            We're currently in private beta with our early adopter partners. Public access is launching soon.
          </p>
        </motion.div>

        {/* Playful Line */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-8"
        >
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200">
            🍨 Good things take time… especially Sundaes.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={() => cta("/demo", "join_waitlist_signin", { location: "signin-coming-soon" })}
            data-cta="join_waitlist_signin"
            data-source="signin-coming-soon"
          >
            Join the Waitlist
          </Button>
          <Link href="/">
            <Button
              variant="outline"
              size="lg"
            >
              Explore the Platform →
            </Button>
          </Link>
        </motion.div>

        {/* Beta Status Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="pt-6 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              <span>Beta Status: <span className="font-semibold text-gray-700 dark:text-gray-300">Private Beta</span></span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Next Release: <span className="font-semibold text-gray-700 dark:text-gray-300">Early Access Q1 2026</span></span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
