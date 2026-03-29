"use client";

import { Github, LobeHub } from "@lobehub/icons";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AUTH_ROUTES = [
  "/login",
  "/signup",
  "/forgot-password",
  "/verify-email",
  "/reset-password",
  "/success",
];

export default function Footer() {
  const pathname = usePathname();

  if (AUTH_ROUTES.includes(pathname)) {
    return null;
  }

  return (
    <footer className="w-full border-border/40 border-t bg-background py-12">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-4 sm:px-8 md:flex-row">
        {/* Brand Section */}
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Link
            href={"/" as Route}
            className="flex items-center gap-2 transition-opacity hover:opacity-90"
          >
            <LobeHub size={24} className="text-[#008ef0]" />
            <span className="font-bold text-[18px] uppercase tracking-tight">
              Flamingo
            </span>
          </Link>
          <p className="text-[13px] text-muted-foreground">
            Built with ❤️ for modern teams.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[12px] text-foreground uppercase tracking-wider">
              Product
            </h4>
            <Link
              href={"/" as Route}
              className="text-[13px] text-muted-foreground hover:text-foreground"
            >
              Features
            </Link>
            <Link
              href={"/" as Route}
              className="text-[13px] text-muted-foreground hover:text-foreground"
            >
              Pricing
            </Link>
            <Link
              href={"/dashboard" as Route}
              className="text-[13px] text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[12px] text-foreground uppercase tracking-wider">
              Legal
            </h4>
            <Link
              href={"/" as Route}
              className="text-[13px] text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href={"/" as Route}
              className="text-[13px] text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-[12px] text-foreground uppercase tracking-wider">
              Social
            </h4>
            <Link
              href="https://github.com/suzume/flamingo"
              target="_blank"
              className="flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground"
            >
              <Github size={14} />
              GitHub
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center gap-2 md:items-end">
          <p className="text-center text-[12px] text-muted-foreground md:text-right">
            © 2026 Flamingo Inc. <br /> All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
