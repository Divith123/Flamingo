"use client";

import {
  ArrowRight01Icon,
  Book02Icon,
  CircleIcon,
  CreditCardIcon,
  DeliveryBox01Icon,
  File02Icon,
  GridIcon,
  InvoiceIcon,
  Layers01Icon,
  Package01Icon,
  Search01Icon,
  Settings02Icon,
  ShoppingBasket01Icon,
  SignatureIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import type { Route } from "next";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { trpc } from "@/utils/trpc";

type Session = {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null;
  };
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
    token: string;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
};

type ToolCategory = "all" | "finance" | "operations" | "commerce";

type Tool = {
  id: string;
  name: string;
  shortDescription: string;
  icon: typeof Book02Icon;
  href: string;
  status: "active" | "coming_soon" | "free";
  category: ToolCategory;
  tags: string[];
};

const tools: Tool[] = [
  {
    id: "books",
    name: "Books",
    shortDescription: "Ledger & Financial Reporting",
    icon: Book02Icon,
    href: "/books",
    status: "active",
    category: "finance",
    tags: ["Accounting", "ERP"],
  },
  {
    id: "expense",
    name: "Expense",
    shortDescription: "Claims & Reimbursements",
    icon: File02Icon,
    href: "/expense",
    status: "active",
    category: "finance",
    tags: ["Spend"],
  },
  {
    id: "payroll",
    name: "Payroll",
    shortDescription: "Compensation & Compliance",
    icon: UserGroupIcon,
    href: "/payroll",
    status: "active",
    category: "operations",
    tags: ["HR"],
  },
  {
    id: "inventory",
    name: "Inventory",
    shortDescription: "Stock & Warehouse Logic",
    icon: Package01Icon,
    href: "/inventory",
    status: "active",
    category: "operations",
    tags: ["SCM"],
  },
  {
    id: "sign",
    name: "Sign",
    shortDescription: "Cryptographic Signatures",
    icon: SignatureIcon,
    href: "/sign",
    status: "free",
    category: "operations",
    tags: ["Legal"],
  },
  {
    id: "billing",
    name: "Billing",
    shortDescription: "Subscription Lifecycle",
    icon: CreditCardIcon,
    href: "/billing",
    status: "active",
    category: "finance",
    tags: ["Revenue"],
  },
  {
    id: "invoice",
    name: "Invoice",
    shortDescription: "Accounts Receivable",
    icon: InvoiceIcon,
    href: "/invoice",
    status: "free",
    category: "finance",
    tags: ["Payments"],
  },
  {
    id: "commerce",
    name: "Commerce",
    shortDescription: "Storefront & Catalog",
    icon: ShoppingBasket01Icon,
    href: "/commerce",
    status: "active",
    category: "commerce",
    tags: ["Sales"],
  },
  {
    id: "erp",
    name: "ERP",
    shortDescription: "Resource Planning Core",
    icon: Layers01Icon,
    href: "/erp",
    status: "active",
    category: "operations",
    tags: ["Enterprise"],
  },
  {
    id: "procurement",
    name: "Procurement",
    shortDescription: "Sourcing & P.O. Management",
    icon: DeliveryBox01Icon,
    href: "/procurement",
    status: "active",
    category: "operations",
    tags: ["Vendor"],
  },
];

export default function Dashboard({ session }: { session: Session }) {
  const me = useQuery(trpc.auth.me.queryOptions());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ToolCategory>("all");

  // Determine if it's a connection error (fetch failed) vs a server error (e.g. 401)
  const isOffline =
    me.isError && !me.data && me.error.message.includes("Failed to fetch");
  const isAuthError =
    me.isError && me.error.message.includes("Authentication required");

  const filteredTools = useMemo(() => {
    return tools.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );
      const matchesCat =
        activeCategory === "all" || t.category === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="flex min-h-screen bg-[#08090a] text-[#ededed] selection:bg-blue-500/30">
      <main className="mx-auto w-full max-w-[1200px] px-6 py-12">
        {/* Workspace Header */}
        <header className="mb-12 flex items-end justify-between border-[#1f2123] border-b pb-8">
          <div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm uppercase tracking-[0.1em]">
              <HugeiconsIcon icon={GridIcon} size={14} />
              <span>Workspace Root</span>
            </div>
            <h1 className="mt-2 font-semibold text-3xl tracking-tight">
              Flamingo Suite
            </h1>
          </div>

          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <span className="flex items-center gap-2">
              <HugeiconsIcon
                icon={CircleIcon}
                size={8}
                className={
                  isOffline ? "animate-pulse text-rose-500" : "text-emerald-500"
                }
              />
              {isOffline ? "System Offline" : "All Systems Operational"}
            </span>
            <div className="h-4 w-px bg-[#1f2123]" />
            <span className="font-mono text-xs">{session.user.email}</span>
          </div>
        </header>

        {isOffline ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-[#1f2123] border-dashed bg-[#0d0e10]/50 py-32">
            <HugeiconsIcon
              icon={CircleIcon}
              size={32}
              className="mb-4 text-rose-500/50"
            />
            <h2 className="font-medium text-xl">Backend Connection Lost</h2>
            <p className="mt-2 max-w-sm text-center text-muted-foreground text-sm">
              Unable to reach the Flamingo Engine at localhost:3001. Please
              ensure the server is running.
            </p>
            <button
              onClick={() => me.refetch()}
              className="mt-8 rounded bg-[#1f2123] px-4 py-2 font-medium text-sm transition-colors hover:bg-[#2a2d30]"
            >
              Attempt Reconnect
            </button>
          </div>
        ) : isAuthError ? (
          <div className="flex flex-col items-center justify-center rounded-lg border border-[#1f2123] border-dashed bg-[#0d0e10]/50 py-32">
            <HugeiconsIcon
              icon={CircleIcon}
              size={32}
              className="mb-4 text-amber-500/50"
            />
            <h2 className="font-medium text-xl">Access Denied</h2>
            <p className="mt-2 max-w-sm text-center text-muted-foreground text-sm">
              Your session has expired or is invalid. Please sign in again to
              access the workspace.
            </p>
            <Link
              href="/login"
              className="mt-8 rounded bg-blue-600 px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-blue-500"
            >
              Sign In
            </Link>
          </div>
        ) : (
          <>
            {/* Action Bar */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="relative max-w-md flex-1">
                <HugeiconsIcon
                  icon={Search01Icon}
                  size={16}
                  className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search tools, modules, or tags..."
                  className="h-9 w-full rounded-md border border-[#1f2123] bg-transparent pr-4 pl-9 text-sm outline-none transition-all placeholder:text-muted-foreground/50 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <nav className="flex items-center gap-1 rounded-md border border-[#1f2123] bg-[#0d0e10] p-1">
                {["all", "finance", "operations", "commerce"].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat as ToolCategory)}
                    className={cn(
                      "rounded px-3 py-1 font-medium text-[13px] capitalize transition-all",
                      activeCategory === cat
                        ? "bg-[#1f2123] text-white shadow-sm"
                        : "text-muted-foreground hover:text-white",
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </nav>
            </div>

            {/* Directory Grid */}
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[#1f2123] bg-[#1f2123] md:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    href={tool.href as Route}
                    className="group relative flex h-full flex-col bg-[#0d0e10] p-6 transition-colors hover:bg-[#121417]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded border border-[#1f2123] bg-[#16181b] text-white transition-colors group-hover:border-blue-500/30 group-hover:bg-blue-500/5">
                        <HugeiconsIcon icon={tool.icon} size={20} />
                      </div>
                      <div className="flex items-center gap-2">
                        {tool.status !== "active" && (
                          <Badge
                            variant="outline"
                            className="h-5 rounded border-[#1f2123] px-1.5 font-bold text-[10px] text-muted-foreground uppercase tracking-wider"
                          >
                            {tool.status}
                          </Badge>
                        )}
                        <HugeiconsIcon
                          icon={ArrowRight01Icon}
                          size={14}
                          className="-translate-x-2 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex-1">
                      <h3 className="font-medium text-[15px] text-white tracking-tight group-hover:text-blue-400">
                        {tool.name}
                      </h3>
                      <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
                        {tool.shortDescription}
                      </p>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {tool.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded border border-transparent bg-[#16181b] px-1.5 py-0.5 font-medium text-[11px] text-muted-foreground transition-colors group-hover:border-[#1f2123]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* System Footer */}
        <footer className="mt-12 flex flex-col gap-6 border-[#1f2123] border-t pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-white"
            >
              <HugeiconsIcon icon={Settings02Icon} size={16} />
              Global Settings
            </button>
            <button
              type="button"
              className="flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-white"
            >
              <HugeiconsIcon icon={UserGroupIcon} size={16} />
              Manage Workspace
            </button>
          </div>
          <p className="font-mono text-muted-foreground text-xs">
            Flamingo Engine v2.4.0-stable
          </p>
        </footer>
      </main>
    </div>
  );
}
