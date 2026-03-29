"use client";

import {
  Book02Icon,
  ChartBarLineIcon,
  DeliveryBox01Icon,
  File02Icon,
  InvoiceIcon,
  Layers01Icon,
  Package01Icon,
  Settings02Icon,
  ShoppingBasket01Icon,
  SignatureIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { LobeHub } from "@lobehub/icons";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const modules = [
  { name: "Books", icon: Book02Icon, href: "/books", color: "text-blue-500" },
  {
    name: "Expense",
    icon: File02Icon,
    href: "/expense",
    color: "text-orange-500",
  },
  {
    name: "Payroll",
    icon: UserGroupIcon,
    href: "/payroll",
    color: "text-green-500",
  },
  {
    name: "Inventory",
    icon: Package01Icon,
    href: "/inventory",
    color: "text-purple-500",
  },
  {
    name: "Sign",
    icon: SignatureIcon,
    href: "/sign",
    color: "text-indigo-500",
    badge: "FREE",
  },
  {
    name: "Billing",
    icon: InvoiceIcon,
    href: "/billing",
    color: "text-pink-500",
  },
  {
    name: "Invoice",
    icon: InvoiceIcon,
    href: "/invoice",
    color: "text-blue-400",
    badge: "FREE",
  },
  {
    name: "Commerce",
    icon: ShoppingBasket01Icon,
    href: "/commerce",
    color: "text-yellow-500",
  },
  {
    name: "ERP",
    icon: Layers01Icon,
    href: "/erp",
    color: "text-cyan-500",
    badge: "NEW",
  },
  {
    name: "Procurement",
    icon: DeliveryBox01Icon,
    href: "/procurement",
    color: "text-emerald-500",
    badge: "NEW",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-[260px] border-border border-r bg-[#0f1115] text-white">
      <div className="flex h-full flex-col">
        {/* Brand */}
        <div className="flex h-[64px] items-center gap-3 px-6">
          <LobeHub size={28} className="text-white" />
          <span className="font-bold text-[20px] uppercase tracking-tight">
            Flamingo
          </span>
        </div>

        {/* Modules Nav */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="mb-4 px-3 font-bold text-[11px] text-muted-foreground/50 uppercase tracking-wider">
            Unified Suite
          </div>
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 font-medium text-[14px] transition-colors hover:bg-white/5",
                pathname === "/dashboard"
                  ? "bg-white/10 text-white"
                  : "text-muted-foreground",
              )}
            >
              <HugeiconsIcon icon={ChartBarLineIcon} size={20} />
              Home
            </Link>

            <div className="mx-3 my-4 h-px bg-white/5" />

            {modules.map((module) => {
              const isActive = pathname.startsWith(module.href);

              return (
                <Link
                  key={module.name}
                  href={module.href as Route}
                  className={cn(
                    "group flex items-center justify-between rounded-lg px-3 py-2 font-medium text-[14px] transition-all hover:bg-white/5",
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-muted-foreground",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <HugeiconsIcon
                      icon={module.icon}
                      size={20}
                      className={isActive ? module.color : "text-current"}
                    />
                    {module.name}
                  </div>
                  {module.badge && (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 font-bold text-[10px] leading-none tracking-tight",
                        module.badge === "FREE"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-emerald-500/20 text-emerald-400",
                      )}
                    >
                      {module.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="border-white/5 border-t p-4">
          <button
            type={mounted ? "button" : undefined}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 font-medium text-[14px] text-muted-foreground transition-colors hover:bg-white/5"
          >
            <HugeiconsIcon icon={Settings02Icon} size={20} />
            Settings
          </button>
        </div>
      </div>
    </aside>
  );
}
