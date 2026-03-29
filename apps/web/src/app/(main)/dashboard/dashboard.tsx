"use client";

import {
  Book02Icon,
  CreditCardIcon,
  DeliveryBox01Icon,
  File02Icon,
  GridIcon,
  InvoiceIcon,
  Layers01Icon,
  LinkSquare01Icon,
  Package01Icon,
  ShoppingBasket01Icon,
  SignatureIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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

type Tool = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  icon: typeof Book02Icon;
  href: string;
  color: string;
  bgColor: string;
  badge?: string;
  connections: string[];
  status: "active" | "coming_soon" | "free";
};

const tools: Tool[] = [
  {
    id: "books",
    name: "Books",
    description:
      "Complete accounting & financial management. Track transactions, reconcile accounts, generate financial reports, and maintain pristine books.",
    shortDescription: "Accounting & financials",
    icon: Book02Icon,
    href: "/books",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    status: "active",
    connections: ["expense", "invoice", "billing", "payroll", "commerce"],
  },
  {
    id: "expense",
    name: "Expense",
    description:
      "Streamlined expense management. Submit receipts, categorize spending, enforce policies, and get reimbursed faster.",
    shortDescription: "Track & manage expenses",
    icon: File02Icon,
    href: "/expense",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    status: "active",
    connections: ["books", "invoice", "payroll"],
  },
  {
    id: "payroll",
    name: "Payroll",
    description:
      "Effortless payroll processing. Calculate salaries, handle taxes, manage benefits, and pay employees on time, every time.",
    shortDescription: "Employee payroll & benefits",
    icon: UserGroupIcon,
    href: "/payroll",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    status: "active",
    connections: ["books", "expense", "billing"],
  },
  {
    id: "inventory",
    name: "Inventory",
    description:
      "Real-time inventory control. Track stock levels, manage warehouses, handle assemblies, and prevent stockouts.",
    shortDescription: "Stock & warehouse management",
    icon: Package01Icon,
    href: "/inventory",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    status: "active",
    connections: ["commerce", "procurement", "erp"],
  },
  {
    id: "sign",
    name: "Sign",
    description:
      "Legally-binding digital signatures. Sign contracts, collect signatures, and manage documents securely.",
    shortDescription: "Digital signatures",
    icon: SignatureIcon,
    href: "/sign",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
    badge: "FREE",
    status: "free",
    connections: ["books", "invoice", "commerce", "procurement"],
  },
  {
    id: "billing",
    name: "Billing",
    description:
      "Subscription billing & recurring invoices. Manage plans, handle payments, dunning, and revenue recognition.",
    shortDescription: "Subscription & billing",
    icon: CreditCardIcon,
    href: "/billing",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    status: "active",
    connections: ["books", "invoice", "commerce"],
  },
  {
    id: "invoice",
    name: "Invoice",
    description:
      "Professional invoicing made simple. Create beautiful invoices, track payments, and get paid faster.",
    shortDescription: "Create & send invoices",
    icon: InvoiceIcon,
    href: "/invoice",
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    badge: "FREE",
    status: "free",
    connections: ["books", "expense", "billing", "commerce", "sign"],
  },
  {
    id: "commerce",
    name: "Commerce",
    description:
      "Full-featured online store. Products, orders, payments, shipping, and customer management all in one.",
    shortDescription: "Online store builder",
    icon: ShoppingBasket01Icon,
    href: "/commerce",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    status: "active",
    connections: ["inventory", "billing", "invoice", "books", "sign"],
  },
  {
    id: "erp",
    name: "ERP",
    description:
      "Enterprise resource planning. Unify all your business processes - from manufacturing to HR, all connected.",
    shortDescription: "Business operations hub",
    icon: Layers01Icon,
    href: "/erp",
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    badge: "NEW",
    status: "active",
    connections: ["books", "inventory", "payroll", "procurement", "commerce"],
  },
  {
    id: "procurement",
    name: "Procurement",
    description:
      "Source-to-pay platform. Manage vendors, create purchase orders, track deliveries, and control spending.",
    shortDescription: "Vendor & purchase management",
    icon: DeliveryBox01Icon,
    href: "/procurement",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    badge: "NEW",
    status: "active",
    connections: ["inventory", "books", "erp", "billing"],
  },
];

export default function Dashboard({ session }: { session: Session }) {
  const _me = useQuery(trpc.auth.me.queryOptions());
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const userInitials = session.user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const connectedTools = (toolId: string): Tool[] => {
    const tool = tools.find((t) => t.id === toolId);
    if (!tool) return [];
    return tools.filter((t) => tool.connections.includes(t.id));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#0a0b0f]"
    >
      {/* Centered Profile Section */}
      <div className="flex flex-col items-center justify-center pt-16 pb-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          {/* Avatar Background Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-2xl" />

          {/* Avatar */}
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#1a1d26] bg-gradient-to-br from-blue-600 to-purple-600 font-bold text-3xl text-white shadow-2xl">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name}
                fill
                className="rounded-full object-cover"
              />
            ) : (
              userInitials
            )}
          </div>

          {/* Online Status Indicator */}
          <div className="absolute right-2 bottom-2 h-5 w-5 rounded-full border-4 border-[#0a0b0f] bg-green-500" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-center"
        >
          <h1 className="font-bold text-3xl text-white capitalize tracking-tight">
            {session.user.name}
          </h1>
          <p className="mt-2 text-[15px] text-muted-foreground">
            {session.user.email}
          </p>
        </motion.div>

        {/* Quick Stats Row */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex items-center gap-8"
        >
          {[
            { label: "Tools Connected", value: tools.length.toString() },
            {
              label: "Active Since",
              value: new Date(session.user.createdAt).toLocaleDateString(
                "en-US",
                { month: "short", year: "numeric" },
              ),
            },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-bold text-white text-xl">{stat.value}</p>
              <p className="text-muted-foreground text-xs">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Separator Line */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Tools Section */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h2 className="flex items-center gap-2 font-bold text-white text-xl">
              <HugeiconsIcon
                icon={GridIcon}
                size={20}
                className="text-blue-500"
              />
              Your Tools
            </h2>
            <p className="mt-1 text-muted-foreground text-sm">
              Click any tool to get started. Each tool works seamlessly
              together.
            </p>
          </div>
        </motion.div>

        {/* Tool Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
            >
              <Link href={tool.href as Route}>
                <div
                  className={cn(
                    "group relative cursor-pointer rounded-2xl border border-white/5 bg-[#0f1218] p-5 transition-all hover:border-white/10 hover:bg-[#151a22]",
                    selectedTool === tool.id && "ring-2 ring-blue-500/50",
                  )}
                >
                  {/* Badge */}
                  {tool.badge && (
                    <span
                      className={cn(
                        "absolute top-4 right-4 rounded-full px-2 py-0.5 font-bold text-[10px] leading-none tracking-tight",
                        tool.status === "free"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-emerald-500/20 text-emerald-400",
                      )}
                    >
                      {tool.badge}
                    </span>
                  )}

                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                        tool.bgColor,
                      )}
                    >
                      <HugeiconsIcon
                        icon={tool.icon}
                        size={24}
                        className={tool.color}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="font-bold text-[17px] text-white transition-colors group-hover:text-blue-400">
                        {tool.name}
                      </h3>
                      <p className="mt-1 text-[13px] text-muted-foreground leading-snug">
                        {tool.shortDescription}
                      </p>
                    </div>
                  </div>

                  {/* Connection Indicators */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {connectedTools(tool.id)
                        .slice(0, 4)
                        .map((connected) => (
                          <div
                            key={connected.id}
                            className={cn(
                              "flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#0f1218]",
                              connected.bgColor,
                            )}
                            title={`Connected to ${connected.name}`}
                          >
                            <HugeiconsIcon
                              icon={connected.icon}
                              size={12}
                              className={connected.color}
                            />
                          </div>
                        ))}
                    </div>
                    <span className="text-[11px] text-muted-foreground">
                      {connectedTools(tool.id).length} connected
                    </span>
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute right-4 bottom-4 opacity-0 transition-all group-hover:opacity-100">
                    <HugeiconsIcon
                      icon={LinkSquare01Icon}
                      size={16}
                      className="text-blue-500"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tool Interconnections Modal (shown when clicking a tool) */}
      {selectedTool && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setSelectedTool(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0f1218] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-white text-xl">
              {tools.find((t) => t.id === selectedTool)?.name} Connections
            </h3>
            <p className="mt-2 text-muted-foreground text-sm">
              This tool integrates with the following modules in your suite:
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {connectedTools(selectedTool).map((tool) => (
                <Link
                  key={tool.id}
                  href={tool.href as Route}
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-3 transition-colors hover:bg-white/10"
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg",
                      tool.bgColor,
                    )}
                  >
                    <HugeiconsIcon
                      icon={tool.icon}
                      size={16}
                      className={tool.color}
                    />
                  </div>
                  <span className="font-medium text-sm text-white">
                    {tool.name}
                  </span>
                </Link>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setSelectedTool(null)}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-500"
            >
              Get Started with {tools.find((t) => t.id === selectedTool)?.name}
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
