import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div 
      className="fixed inset-0 bg-black dark:bg-black flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }} // Transición más suave
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-bmw-blue dark:border-white border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-bmw-blue dark:text-white text-lg font-medium">Loading...</p>
      </div>
    </motion.div>
  );
}
