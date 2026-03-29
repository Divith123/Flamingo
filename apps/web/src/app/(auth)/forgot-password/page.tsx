"use client";

import { LobeHub } from "@lobehub/icons";
import { motion } from "motion/react";
import type { Route } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/verify-email" as Route);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex w-full flex-col gap-[32px]"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center gap-[16px]"
      >
        <div className="flex items-center gap-3">
          <LobeHub size={36} className="text-foreground dark:text-white" />
          <h1 className="font-bold text-[28px] text-foreground uppercase leading-none tracking-tight dark:text-white">
            Recover
          </h1>
        </div>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center gap-2 text-center"
      >
        <h2 className="font-medium text-[14px] text-muted-foreground">
          Enter your email to reset your password
        </h2>
      </motion.div>

      <motion.form
        variants={itemVariants}
        className="flex w-full flex-col gap-[16px]"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col gap-[8px]">
          <input
            type="email"
            placeholder="Email Address"
            className="h-[48px] w-full shrink-0 rounded-lg border border-border bg-white px-4 text-[15px] text-foreground transition-all placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#008ef0] dark:border-none dark:bg-[#3c4656] dark:text-white"
          />
        </div>

        <div className="mt-2 flex w-full flex-col gap-[20px]">
          <button
            type={mounted ? "submit" : undefined}
            className="flex h-[48px] w-full shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#008ef0] px-5 font-bold text-[16px] text-white uppercase tracking-wider transition-all hover:bg-[#0070bd] active:bg-[#00528a]"
          >
            Reset Password
          </button>

          <div className="flex items-center justify-center px-1">
            <Link
              href={"/login" as Route}
              className="font-medium text-[13px] text-muted-foreground transition-colors hover:text-foreground dark:hover:text-white"
            >
              Return to login
            </Link>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
}
