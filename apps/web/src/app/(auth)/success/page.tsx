"use client";

import { Tick01Icon as CheckIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";
import type { Route } from "next";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex w-full flex-col gap-[32px]"
    >
      <div className="flex flex-col items-center gap-[32px] py-4">
        <div className="flex flex-col items-center gap-[24px]">
          <motion.div
            variants={iconVariants}
            className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-[#008ef0] shadow-[0_0_20px_0_rgba(0,142,240,0.3)]"
          >
            <HugeiconsIcon icon={CheckIcon} size={40} className="text-white" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-2 text-center"
          >
            <h2 className="font-semibold text-[24px] text-foreground dark:text-white">
              Authentication Successful
            </h2>
            <p className="max-w-[300px] text-[15px] text-muted-foreground leading-relaxed">
              Your account is ready. Redirecting you to your workspace...
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-4 flex w-full flex-col gap-[20px]"
        >
          <button
            type="button"
            onClick={() => router.push("/dashboard" as Route)}
            className="flex h-[48px] w-full shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#008ef0] px-5 font-bold text-[16px] text-white uppercase tracking-wider transition-all hover:bg-[#0070bd] hover:shadow-[0_0_15px_0_rgba(0,142,240,0.2)] active:bg-[#00528a]"
          >
            Launch Dashboard
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
