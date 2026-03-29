"use client";

import { Github, Google, LobeHub } from "@lobehub/icons";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/sign-up/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password,
          callbackURL: "/dashboard",
        }),
      });

      // Better Auth returns user data on success
      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Signup failed");
      }

      const data = await response.json();
      console.log("Signup successful:", data);

      toast.success("Account created successfully", {
        description: "Redirecting to dashboard...",
      });

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup failed", {
        description:
          error instanceof Error ? error.message : "Could not create account",
      });
    } finally {
      setIsLoading(false);
    }
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
      {/* Header / Logo + Signup Title */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center gap-[16px]"
      >
        <div className="flex items-center gap-3">
          <LobeHub size={36} className="text-foreground dark:text-white" />
          <h1 className="font-bold text-[28px] text-foreground uppercase leading-none tracking-tight dark:text-white">
            Sign Up
          </h1>
        </div>
        <p className="text-muted-foreground text-sm">
          Create your account to get started
        </p>
      </motion.div>

      {/* Inputs Section */}
      <motion.form
        variants={itemVariants}
        className="flex w-full flex-col gap-[16px]"
        onSubmit={handleSubmit}
      >
        {/* Name Field */}
        <div className="flex w-full flex-col gap-[8px]">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-[48px] w-full shrink-0 rounded-lg border border-border bg-white px-4 text-[15px] text-foreground transition-all placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#008ef0] dark:border-none dark:bg-[#3c4656] dark:text-white"
            required
          />
        </div>
        {/* Email Field */}
        <div className="flex w-full flex-col gap-[8px]">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[48px] w-full shrink-0 rounded-lg border border-border bg-white px-4 text-[15px] text-foreground transition-all placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#008ef0] dark:border-none dark:bg-[#3c4656] dark:text-white"
            required
          />
        </div>
        {/* Password Field */}
        <div className="flex w-full flex-col gap-[8px]">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-[48px] w-full shrink-0 rounded-lg border border-border bg-white px-4 text-[15px] text-foreground transition-all placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[#008ef0] dark:border-none dark:bg-[#3c4656] dark:text-white"
            required
            minLength={8}
          />
        </div>

        {/* Actions */}
        <div className="mt-2 flex w-full flex-col gap-[20px]">
          <button
            type="submit"
            disabled={isLoading}
            className="flex h-[48px] w-full shrink-0 cursor-pointer items-center justify-center rounded-lg bg-[#008ef0] px-5 font-bold text-[16px] text-white uppercase tracking-wider transition-all hover:bg-[#0070bd] hover:shadow-[0_0_15px_0_rgba(0,142,240,0.3)] active:bg-[#00528a] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>

          <div className="flex items-center justify-between px-1">
            <span className="font-medium text-[13px] text-muted-foreground">
              Already have an account?
            </span>
            <Link
              href="/login"
              className="font-medium text-[#008ef0] text-[13px] hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </motion.form>

      {/* Divider */}
      <motion.div
        variants={itemVariants}
        className="flex w-full items-center gap-[16px] pt-4"
      >
        <div className="h-px flex-1 bg-border dark:bg-[#434a52]" />
        <span className="font-semibold text-[11px] text-muted-foreground uppercase tracking-[0.5px]">
          Or continue with
        </span>
        <div className="h-px flex-1 bg-border dark:bg-[#434a52]" />
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex w-full flex-col gap-[12px]"
      >
        <button
          type="button"
          onClick={() => {
            window.location.href = "/api/auth/signin/google";
          }}
          className="flex h-[44px] shrink-0 cursor-pointer items-center justify-center gap-[12px] rounded-lg border border-border bg-white px-5 text-[14px] text-foreground transition-colors hover:bg-muted/50 dark:border-none dark:bg-[#3c4656] dark:text-white dark:hover:bg-[#434a52]"
        >
          <Google size={18} />
          <span>Continue with Google</span>
        </button>
        <button
          type="button"
          onClick={() => {
            window.location.href = "/api/auth/signin/github";
          }}
          className="flex h-[44px] shrink-0 cursor-pointer items-center justify-center gap-[12px] rounded-lg border border-border bg-white px-5 text-[14px] text-foreground transition-colors hover:bg-muted/50 dark:border-none dark:bg-[#3c4656] dark:text-white dark:hover:bg-[#434a52]"
        >
          <Github size={18} />
          <span>Continue with GitHub</span>
        </button>
      </motion.div>
    </motion.div>
  );
}
