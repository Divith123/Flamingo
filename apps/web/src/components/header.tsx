"use client";

import { LobeHub } from "@lobehub/icons";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

const AUTH_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/verify-email",
  "/reset-password",
  "/success",
];

export default function Header() {
  const pathname = usePathname();

  if (AUTH_ROUTES.includes(pathname)) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-border/40 border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
        {/* Logo Section */}
        <Link
          href={"/" as Route}
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <LobeHub size={28} className="text-[#008ef0]" />
          <span className="font-bold text-[20px] uppercase tracking-tight">
            Flamingo
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href={"/" as Route}
            className="font-medium text-[14px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </Link>
          <Link
            href={"/" as Route}
            className="font-medium text-[14px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href={"/dashboard" as Route}
            className="font-medium text-[14px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <ModeToggle />
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
