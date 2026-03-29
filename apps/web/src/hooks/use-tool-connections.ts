"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ToolId } from "./use-onboarding";

export type ConnectionType =
  | "data-sync"
  | "import"
  | "export"
  | "reference"
  | "automation";

export interface ToolConnection {
  sourceTool: ToolId;
  targetTool: ToolId;
  connectionType: ConnectionType;
  enabled: boolean;
  lastSynced?: Date;
  autoSync?: boolean;
}

export interface CrossToolData {
  toolId: ToolId;
  dataType: string;
  recordId: string;
  linkedTools: ToolId[];
  createdAt: Date;
  updatedAt: Date;
}

interface ToolConnectionsState {
  connections: ToolConnection[];
  crossToolData: CrossToolData[];

  addConnection: (connection: Omit<ToolConnection, "enabled">) => void;
  removeConnection: (sourceTool: ToolId, targetTool: ToolId) => void;
  toggleConnection: (sourceTool: ToolId, targetTool: ToolId) => void;
  setAutoSync: (
    sourceTool: ToolId,
    targetTool: ToolId,
    autoSync: boolean,
  ) => void;
  getConnections: (toolId?: ToolId) => ToolConnection[];
  getConnectedTools: (toolId: ToolId) => ToolId[];

  addCrossToolData: (
    data: Omit<CrossToolData, "createdAt" | "updatedAt">,
  ) => void;
  removeCrossToolData: (toolId: ToolId, recordId: string) => void;
  getCrossToolData: (toolId: ToolId) => CrossToolData[];
  getLinkedData: (toolId: ToolId, recordId: string) => CrossToolData[];
}

export const TOOL_CONNECTIONS: ToolConnection[] = [
  // Books connections
  {
    sourceTool: "expense",
    targetTool: "books",
    connectionType: "data-sync",
    enabled: false,
  },
  {
    sourceTool: "invoice",
    targetTool: "books",
    connectionType: "data-sync",
    enabled: false,
  },
  {
    sourceTool: "billing",
    targetTool: "books",
    connectionType: "data-sync",
    enabled: false,
  },
  {
    sourceTool: "payroll",
    targetTool: "books",
    connectionType: "data-sync",
    enabled: false,
  },
  {
    sourceTool: "commerce",
    targetTool: "books",
    connectionType: "data-sync",
    enabled: false,
  },

  // Inventory connections
  {
    sourceTool: "commerce",
    targetTool: "inventory",
    connectionType: "data-sync",
    enabled: false,
  },
  {
    sourceTool: "procurement",
    targetTool: "inventory",
    connectionType: "data-sync",
    enabled: false,
  },
  {
    sourceTool: "erp",
    targetTool: "inventory",
    connectionType: "data-sync",
    enabled: false,
  },

  // Procurement connections
  {
    sourceTool: "procurement",
    targetTool: "books",
    connectionType: "reference",
    enabled: false,
  },
  {
    sourceTool: "procurement",
    targetTool: "erp",
    connectionType: "data-sync",
    enabled: false,
  },

  // Commerce connections
  {
    sourceTool: "commerce",
    targetTool: "billing",
    connectionType: "data-sync",
    enabled: false,
  },
  {
    sourceTool: "commerce",
    targetTool: "invoice",
    connectionType: "data-sync",
    enabled: false,
  },
  {
    sourceTool: "commerce",
    targetTool: "sign",
    connectionType: "import",
    enabled: false,
  },

  // Sign connections
  {
    sourceTool: "sign",
    targetTool: "invoice",
    connectionType: "reference",
    enabled: false,
  },
  {
    sourceTool: "sign",
    targetTool: "commerce",
    connectionType: "reference",
    enabled: false,
  },
  {
    sourceTool: "sign",
    targetTool: "procurement",
    connectionType: "reference",
    enabled: false,
  },

  // ERP connections
  {
    sourceTool: "erp",
    targetTool: "books",
    connectionType: "data-sync",
    enabled: false,
  },
  {
    sourceTool: "erp",
    targetTool: "payroll",
    connectionType: "data-sync",
    enabled: false,
  },
  {
    sourceTool: "erp",
    targetTool: "commerce",
    connectionType: "data-sync",
    enabled: false,
  },

  // Expense connections
  {
    sourceTool: "expense",
    targetTool: "invoice",
    connectionType: "reference",
    enabled: false,
  },
  {
    sourceTool: "expense",
    targetTool: "payroll",
    connectionType: "reference",
    enabled: false,
  },
];

export const useToolConnections = create<ToolConnectionsState>()(
  persist(
    (set, get) => ({
      connections: TOOL_CONNECTIONS,
      crossToolData: [],

      addConnection: (connection) => {
        set((state) => ({
          connections: [...state.connections, { ...connection, enabled: true }],
        }));
      },

      removeConnection: (sourceTool, targetTool) => {
        set((state) => ({
          connections: state.connections.filter(
            (c) =>
              !(
                (c.sourceTool === sourceTool && c.targetTool === targetTool) ||
                (c.sourceTool === targetTool && c.targetTool === sourceTool)
              ),
          ),
        }));
      },

      toggleConnection: (sourceTool, targetTool) => {
        set((state) => ({
          connections: state.connections.map((c) => {
            if (
              (c.sourceTool === sourceTool && c.targetTool === targetTool) ||
              (c.sourceTool === targetTool && c.targetTool === sourceTool)
            ) {
              return { ...c, enabled: !c.enabled };
            }
            return c;
          }),
        }));
      },

      setAutoSync: (sourceTool, targetTool, autoSync) => {
        set((state) => ({
          connections: state.connections.map((c) => {
            if (
              (c.sourceTool === sourceTool && c.targetTool === targetTool) ||
              (c.sourceTool === targetTool && c.targetTool === sourceTool)
            ) {
              return {
                ...c,
                autoSync,
                lastSynced: autoSync ? new Date() : undefined,
              };
            }
            return c;
          }),
        }));
      },

      getConnections: (toolId) => {
        if (!toolId) return get().connections;
        return get().connections.filter(
          (c) => c.sourceTool === toolId || c.targetTool === toolId,
        );
      },

      getConnectedTools: (toolId) => {
        const connections = get().connections.filter(
          (c) =>
            c.enabled && (c.sourceTool === toolId || c.targetTool === toolId),
        );
        const connectedTools = new Set<ToolId>();
        connections.forEach((c) => {
          if (c.sourceTool !== toolId) connectedTools.add(c.sourceTool);
          if (c.targetTool !== toolId) connectedTools.add(c.targetTool);
        });
        return Array.from(connectedTools);
      },

      addCrossToolData: (data) => {
        set((state) => ({
          crossToolData: [
            ...state.crossToolData,
            {
              ...data,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
        }));
      },

      removeCrossToolData: (toolId, recordId) => {
        set((state) => ({
          crossToolData: state.crossToolData.filter(
            (d) => !(d.toolId === toolId && d.recordId === recordId),
          ),
        }));
      },

      getCrossToolData: (toolId) => {
        return get().crossToolData.filter((d) => d.toolId === toolId);
      },

      getLinkedData: (toolId, recordId) => {
        const data = get().crossToolData.find(
          (d) => d.toolId === toolId && d.recordId === recordId,
        );
        if (!data) return [];
        return get().crossToolData.filter(
          (d) => data.linkedTools.includes(d.toolId) && d.recordId !== recordId,
        );
      },
    }),
    {
      name: "flamingo-tool-connections",
    },
  ),
);

export const getToolDisplayName = (toolId: ToolId): string => {
  const names: Record<ToolId, string> = {
    books: "Books",
    expense: "Expense",
    payroll: "Payroll",
    inventory: "Inventory",
    sign: "Sign",
    billing: "Billing",
    invoice: "Invoice",
    commerce: "Commerce",
    erp: "ERP",
    procurement: "Procurement",
  };
  return names[toolId] || toolId;
};

export const getConnectionTypeLabel = (type: ConnectionType): string => {
  const labels: Record<ConnectionType, string> = {
    "data-sync": "Data Sync",
    import: "Import",
    export: "Export",
    reference: "Reference",
    automation: "Automation",
  };
  return labels[type];
};
