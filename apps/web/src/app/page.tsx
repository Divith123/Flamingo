"use client";

import {
  ArrowRight01Icon as ArrowRight,
  ChartBarLineIcon as ChartIcon,
  Shield01Icon as ShieldIcon,
  ZapIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Github } from "@lobehub/icons";
import type { Route } from "next";
import Link from "next/link";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-[calc(100vh-64px)] w-full flex-col items-center bg-background font-sans">
        {/* Hero Section */}
        <section className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 pt-20 pb-32 text-center md:pt-32">
          {/* Background Gradients */}
          <div className="absolute top-0 -z-10 h-full w-full">
            <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#008ef0]/10 blur-[120px]" />
            <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-[#008ef0]/5 blur-[100px]" />
          </div>

          <div className="flex max-w-[800px] flex-col items-center gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-muted/50 px-4 py-1.5 font-medium text-[13px] transition-colors hover:bg-muted">
              <span className="flex h-2 w-2 rounded-full bg-[#008ef0]" />
              <span className="text-muted-foreground">
                Introducing Flamingo v1.0
              </span>
            </div>

            <h1 className="text-balance font-bold text-[48px] text-foreground uppercase leading-[1.1] tracking-tight md:text-[72px]">
              The ultimate tool for{" "}
              <span className="text-[#008ef0]">Goals</span>.
            </h1>

            <p className="max-w-[600px] text-balance text-[16px] text-muted-foreground leading-relaxed md:text-[18px]">
              Beautifully designed, highly efficient, and built for modern
              teams. Experience the future of productivity with Flamingo.
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
              <Link
                href={"/login" as Route}
                className="flex h-[52px] items-center justify-center gap-2 rounded-lg bg-[#008ef0] px-8 font-bold text-[16px] text-white uppercase tracking-wider transition-all hover:bg-[#0070bd] hover:shadow-[0_0_20px_0_rgba(0,142,240,0.3)] active:scale-95"
              >
                Get Started
                <HugeiconsIcon icon={ArrowRight} size={20} />
              </Link>
              <Link
                href="https://github.com/suzume/flamingo"
                target="_blank"
                className="flex h-[52px] items-center justify-center gap-2 rounded-lg border border-border bg-background px-8 font-bold text-[16px] text-foreground uppercase tracking-wider transition-all hover:bg-muted active:scale-95"
              >
                <Github size={20} />
                Star on GitHub
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto max-w-7xl px-4 py-24 sm:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="group flex flex-col gap-4 rounded-2xl border border-border/50 bg-muted/30 p-8 transition-all hover:bg-muted/50 hover:shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#008ef0]/10 text-[#008ef0] transition-colors group-hover:bg-[#008ef0] group-hover:text-white">
                <HugeiconsIcon icon={ZapIcon} size={24} />
              </div>
              <h3 className="font-bold text-[20px]">Lightning Fast</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                Optimized for speed. Built with Bun and Next.js for sub-second
                interactions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group flex flex-col gap-4 rounded-2xl border border-border/50 bg-muted/30 p-8 transition-all hover:bg-muted/50 hover:shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#008ef0]/10 text-[#008ef0] transition-colors group-hover:bg-[#008ef0] group-hover:text-white">
                <HugeiconsIcon icon={ShieldIcon} size={24} />
              </div>
              <h3 className="font-bold text-[20px]">Secure by Default</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                Enterprise-grade authentication with Better Auth and strict
                security protocols.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group flex flex-col gap-4 rounded-2xl border border-border/50 bg-muted/30 p-8 transition-all hover:bg-muted/50 hover:shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#008ef0]/10 text-[#008ef0] transition-colors group-hover:bg-[#008ef0] group-hover:text-white">
                <HugeiconsIcon icon={ChartIcon} size={24} />
              </div>
              <h3 className="font-bold text-[20px]">Insights & Analytics</h3>
              <p className="text-[15px] text-muted-foreground leading-relaxed">
                Understand your progress with real-time data and beautiful
                visualizations.
              </p>
            </div>
          </div>
        </section>

        {/* Social Proof / Integrity Section */}
        <section className="w-full border-border/50 border-t bg-muted/10 py-24">
          <div className="container mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 sm:px-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="font-bold text-[32px] uppercase tracking-tight md:text-[40px]">
                Built with the best{" "}
                <span className="text-[#008ef0]">Tech Stack</span>
              </h2>
              <p className="max-w-[500px] text-muted-foreground">
                Leveraging modern technologies to deliver a world-class
                experience.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0">
              <div className="flex items-center gap-2 font-bold text-[24px]">
                <span>NEXT.JS</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-[24px]">
                <span>BUN</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-[24px]">
                <span>TAILWIND</span>
              </div>
              <div className="flex items-center gap-2 font-bold text-[24px]">
                <span>POSTGRES</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
