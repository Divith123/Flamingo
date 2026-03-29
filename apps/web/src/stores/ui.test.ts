import { describe, expect, it } from "vitest";

describe("UI Store", () => {
  it("should toggle sidebar", async () => {
    const { useUIStore } = await import("@/stores/ui");
    const state = useUIStore.getState();
    expect(state.sidebarOpen).toBe(true);
    state.toggleSidebar();
    expect(useUIStore.getState().sidebarOpen).toBe(false);
    state.toggleSidebar();
    expect(useUIStore.getState().sidebarOpen).toBe(true);
  });

  it("should set sidebar open", async () => {
    const { useUIStore } = await import("@/stores/ui");
    useUIStore.getState().setSidebarOpen(false);
    expect(useUIStore.getState().sidebarOpen).toBe(false);
    useUIStore.getState().setSidebarOpen(true);
    expect(useUIStore.getState().sidebarOpen).toBe(true);
  });
});
