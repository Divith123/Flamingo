"use client";

import { motion } from "motion/react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-slate-50 font-sans transition-colors duration-500 dark:bg-[#2c3338]">
      <div className="flex w-full flex-col items-center justify-center px-4 py-12 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full max-w-[400px] flex-col gap-[32px] rounded-2xl border border-transparent bg-white/50 p-6 shadow-sm backdrop-blur-sm dark:border-none dark:bg-transparent dark:p-0 dark:shadow-none dark:backdrop-blur-none"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
