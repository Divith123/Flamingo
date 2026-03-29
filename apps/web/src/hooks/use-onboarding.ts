"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ToolId =
  | "books"
  | "expense"
  | "payroll"
  | "inventory"
  | "sign"
  | "billing"
  | "invoice"
  | "commerce"
  | "erp"
  | "procurement";

export type OnboardingStep = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  optional?: boolean;
};

export type ToolOnboarding = {
  toolId: ToolId;
  started: boolean;
  completed: boolean;
  currentStep: number;
  steps: OnboardingStep[];
  data: Record<string, unknown>;
};

interface OnboardingState {
  toolOnboardings: Partial<Record<ToolId, ToolOnboarding>>;
  overallProgress: number;

  startToolOnboarding: (toolId: ToolId, steps: OnboardingStep[]) => void;
  completeStep: (toolId: ToolId, stepId: string) => void;
  nextStep: (toolId: ToolId) => void;
  previousStep: (toolId: ToolId) => void;
  finishToolOnboarding: (toolId: ToolId) => void;
  resetToolOnboarding: (toolId: ToolId) => void;
  getToolOnboarding: (toolId: ToolId) => ToolOnboarding | undefined;
  updateToolData: (toolId: ToolId, data: Record<string, unknown>) => void;
}

const defaultSteps: Record<ToolId, OnboardingStep[]> = {
  books: [
    {
      id: "setup-organization",
      title: "Organization Setup",
      description: "Set up your business details and preferences",
      completed: false,
    },
    {
      id: "chart-of-accounts",
      title: "Chart of Accounts",
      description: "Configure your account structure",
      completed: false,
    },
    {
      id: "tax-settings",
      title: "Tax Configuration",
      description: "Set up tax rates and filings",
      completed: false,
    },
    {
      id: "connect-bank",
      title: "Bank Connection",
      description: "Link your bank accounts for automatic reconciliation",
      completed: false,
      optional: true,
    },
    {
      id: "invite-team",
      title: "Invite Team",
      description: "Add team members with appropriate roles",
      completed: false,
      optional: true,
    },
  ],
  expense: [
    {
      id: "expense-policy",
      title: "Expense Policy",
      description: "Define spending policies and approval workflows",
      completed: false,
    },
    {
      id: "categories",
      title: "Categories",
      description: "Set up expense categories",
      completed: false,
    },
    {
      id: "connect-bank",
      title: "Bank Sync",
      description: "Connect bank accounts for receipt capture",
      completed: false,
      optional: true,
    },
    {
      id: "approvals",
      title: "Approval Workflow",
      description: "Configure who approves expenses",
      completed: false,
      optional: true,
    },
  ],
  payroll: [
    {
      id: "company-info",
      title: "Company Information",
      description: "Business details for payroll",
      completed: false,
    },
    {
      id: "employees",
      title: "Add Employees",
      description: "Import or add employee information",
      completed: false,
    },
    {
      id: "salary-structure",
      title: "Salary Structure",
      description: "Configure pay schedules and salary components",
      completed: false,
    },
    {
      id: "tax-setup",
      title: "Tax Configuration",
      description: "Set up payroll taxes and deductions",
      completed: false,
    },
    {
      id: "payment-methods",
      title: "Payment Setup",
      description: "Configure how employees get paid",
      completed: false,
      optional: true,
    },
  ],
  inventory: [
    {
      id: "warehouse-setup",
      title: "Warehouse Setup",
      description: "Define your storage locations",
      completed: false,
    },
    {
      id: "products",
      title: "Add Products",
      description: "Create product catalog",
      completed: false,
    },
    {
      id: "suppliers",
      title: "Supplier Management",
      description: "Add your suppliers",
      completed: false,
      optional: true,
    },
    {
      id: "stock-levels",
      title: "Initial Stock",
      description: "Set starting inventory levels",
      completed: false,
      optional: true,
    },
  ],
  sign: [
    {
      id: "template-setup",
      title: "Templates",
      description: "Create document templates",
      completed: false,
      optional: true,
    },
    {
      id: "branding",
      title: "Branding",
      description: "Add your company branding",
      completed: false,
      optional: true,
    },
    {
      id: "signers",
      title: "Invite Signers",
      description: "Add frequently used signers",
      completed: false,
      optional: true,
    },
  ],
  billing: [
    {
      id: "plans",
      title: "Subscription Plans",
      description: "Create your pricing plans",
      completed: false,
    },
    {
      id: "payment-gateway",
      title: "Payment Gateway",
      description: "Connect payment processor",
      completed: false,
    },
    {
      id: "taxes",
      title: "Tax Settings",
      description: "Configure taxes for subscriptions",
      completed: false,
      optional: true,
    },
    {
      id: "webhooks",
      title: "Webhooks",
      description: "Set up event notifications",
      completed: false,
      optional: true,
    },
  ],
  invoice: [
    {
      id: "business-info",
      title: "Business Details",
      description: "Your information on invoices",
      completed: false,
    },
    {
      id: "invoice-template",
      title: "Template",
      description: "Customize invoice appearance",
      completed: false,
      optional: true,
    },
    {
      id: "payment-terms",
      title: "Payment Terms",
      description: "Set payment due dates and terms",
      completed: false,
      optional: true,
    },
  ],
  commerce: [
    {
      id: "store-setup",
      title: "Store Configuration",
      description: "Store name, currency, timezone",
      completed: false,
    },
    {
      id: "products",
      title: "Product Catalog",
      description: "Add products to sell",
      completed: false,
    },
    {
      id: "payments",
      title: "Payment Methods",
      description: "Configure how you'll get paid",
      completed: false,
    },
    {
      id: "shipping",
      title: "Shipping",
      description: "Set up shipping rates and zones",
      completed: false,
      optional: true,
    },
    {
      id: "taxes",
      title: "Tax Configuration",
      description: "Configure sales taxes",
      completed: false,
      optional: true,
    },
  ],
  erp: [
    {
      id: "modules",
      title: "Select Modules",
      description: "Choose which ERP modules to use",
      completed: false,
    },
    {
      id: "organization",
      title: "Organization Structure",
      description: "Define departments and teams",
      completed: false,
    },
    {
      id: "integrations",
      title: "Connect Tools",
      description: "Link your existing tools",
      completed: false,
      optional: true,
    },
  ],
  procurement: [
    {
      id: "vendors",
      title: "Vendor Management",
      description: "Add and manage suppliers",
      completed: false,
    },
    {
      id: "purchase-flow",
      title: "Purchase Workflow",
      description: "Define approval process",
      completed: false,
    },
    {
      id: "products",
      title: "Procurement Catalog",
      description: "Items you commonly purchase",
      completed: false,
      optional: true,
    },
  ],
};

export const useOnboarding = create<OnboardingState>()(
  persist(
    (set, get) => ({
      toolOnboardings: {} as Record<ToolId, ToolOnboarding>,
      overallProgress: 0,

      startToolOnboarding: (toolId, steps) => {
        set((state) => ({
          toolOnboardings: {
            ...state.toolOnboardings,
            [toolId]: {
              toolId,
              started: true,
              completed: false,
              currentStep: 0,
              steps: steps.map((s) => ({ ...s, completed: false })),
              data: {},
            },
          },
        }));
      },

      completeStep: (toolId, stepId) => {
        set((state) => {
          const onboarding = state.toolOnboardings[toolId];
          if (!onboarding) return state;

          const updatedSteps = onboarding.steps.map((step) =>
            step.id === stepId ? { ...step, completed: true } : step,
          );

          return {
            toolOnboardings: {
              ...state.toolOnboardings,
              [toolId]: { ...onboarding, steps: updatedSteps },
            },
          };
        });
      },

      nextStep: (toolId) => {
        set((state) => {
          const onboarding = state.toolOnboardings[toolId];
          if (!onboarding) return state;

          const nextIndex = Math.min(
            onboarding.currentStep + 1,
            onboarding.steps.length - 1,
          );

          return {
            toolOnboardings: {
              ...state.toolOnboardings,
              [toolId]: { ...onboarding, currentStep: nextIndex },
            },
          };
        });
      },

      previousStep: (toolId) => {
        set((state) => {
          const onboarding = state.toolOnboardings[toolId];
          if (!onboarding) return state;

          const prevIndex = Math.max(onboarding.currentStep - 1, 0);

          return {
            toolOnboardings: {
              ...state.toolOnboardings,
              [toolId]: { ...onboarding, currentStep: prevIndex },
            },
          };
        });
      },

      finishToolOnboarding: (toolId) => {
        set((state) => {
          const onboarding = state.toolOnboardings[toolId];
          if (!onboarding) return state;

          const allSteps = onboarding.steps.map((step) => ({
            ...step,
            completed: true,
          }));

          return {
            toolOnboardings: {
              ...state.toolOnboardings,
              [toolId]: {
                ...onboarding,
                completed: true,
                steps: allSteps,
              },
            },
          };
        });
      },

      resetToolOnboarding: (toolId) => {
        set((state) => {
          const { [toolId]: _, ...rest } = state.toolOnboardings;
          return { toolOnboardings: rest };
        });
      },

      getToolOnboarding: (toolId) => {
        return get().toolOnboardings[toolId];
      },

      updateToolData: (toolId, data) => {
        set((state) => {
          const onboarding = state.toolOnboardings[toolId];
          if (!onboarding) return state;

          return {
            toolOnboardings: {
              ...state.toolOnboardings,
              [toolId]: {
                ...onboarding,
                data: { ...onboarding.data, ...data },
              },
            },
          };
        });
      },
    }),
    {
      name: "flamingo-onboarding",
    },
  ),
);

export const getDefaultOnboardingSteps = (toolId: ToolId): OnboardingStep[] => {
  return defaultSteps[toolId] || [];
};
