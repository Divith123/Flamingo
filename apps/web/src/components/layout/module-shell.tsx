"use client";

import {
  AlertCircleIcon,
  Download01Icon,
  FilterIcon,
  PlusSignIcon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface ModuleShellProps {
  title: string;
  description: string;
  icon: IconSvgElement;
  color: string;
  children?: React.ReactNode;
}

export function ModuleShell({
  title,
  description,
  icon,
  color,
  children,
}: ModuleShellProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      {/* Module Header */}
      <div className="flex flex-col justify-between gap-6 border-white/5 border-b pb-8 md:flex-row md:items-end">
        <div className="space-y-4">
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl",
              color,
            )}
          >
            <HugeiconsIcon icon={icon} size={24} />
          </div>
          <div className="space-y-1">
            <h1 className="font-bold text-[32px] text-white tracking-tight">
              {title}
            </h1>
            <p className="max-w-[600px] text-[16px] text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type={mounted ? "button" : undefined}
            className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 font-bold text-[14px] text-white transition-colors hover:bg-white/10"
          >
            <HugeiconsIcon icon={FilterIcon} size={18} />
            Filters
          </button>
          <button
            type={mounted ? "button" : undefined}
            className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 font-bold text-[14px] text-white transition-colors hover:bg-white/10"
          >
            <HugeiconsIcon icon={Download01Icon} size={18} />
            Export
          </button>
          <button
            type={mounted ? "button" : undefined}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2.5 font-bold text-[14px] text-white shadow-lg transition-all hover:opacity-90 active:scale-95",
              color.split(" ")[0].replace("/10", ""),
            )}
          >
            <HugeiconsIcon icon={PlusSignIcon} size={18} />
            Create New
          </button>
        </div>
      </div>

      {/* Analytics Summary */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="space-y-4 rounded-[24px] border border-white/5 bg-[#15181e] p-6"
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-[13px] text-muted-foreground">
                Metric {i}
              </span>
              <HugeiconsIcon
                icon={AlertCircleIcon}
                size={16}
                className="text-white/20"
              />
            </div>
            <div className="space-y-1">
              <p className="font-bold text-[28px] text-white tracking-tight">
                $0.00
              </p>
              <p className="font-medium text-[12px] text-green-500">
                +0% from last month
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden rounded-[28px] border border-white/5 bg-[#15181e]">
        <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
        <div className="z-10 space-y-4 text-center">
          <div className="mb-2 inline-flex h-16 w-16 items-center justify-center rounded-3xl border border-white/5 bg-white/[0.03]">
            <HugeiconsIcon icon={icon} size={32} className="text-white/20" />
          </div>
          <h2 className="font-bold text-[20px] text-white">
            No Data Available
          </h2>
          <p className="mx-auto max-w-[320px] text-[14px] text-muted-foreground leading-relaxed">
            Configure your {title.toLowerCase()} settings or import data to
            start monitoring your business performance.
          </p>
          <div className="flex justify-center gap-3 pt-4">
            <button
              type={mounted ? "button" : undefined}
              className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-6 py-2.5 font-bold text-[14px] text-white transition-colors hover:bg-white/10"
            >
              <HugeiconsIcon icon={Settings02Icon} size={18} />
              Configure {title}
            </button>
          </div>
        </div>
      </div>

      {children}
    </motion.div>
  );
}
