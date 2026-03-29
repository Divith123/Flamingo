"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideSidebar = pathname === "/dashboard";

  return (
    <div className="flex h-screen w-full bg-[#0a0b0d]">
      {!hideSidebar && <Sidebar />}
      <main
        className={
          hideSidebar
            ? "flex-1 overflow-y-auto pb-12"
            : "flex-1 overflow-y-auto pb-12 pl-[260px]"
        }
      >
        {/* Page Content */}
        <div className="w-full px-8 pt-8">{children}</div>
      </main>
    </div>
  );
}
