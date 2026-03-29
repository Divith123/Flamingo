import {
  CheckmarkCircle01Icon as CircleCheckIcon,
  InformationCircleIcon as InfoIcon,
  Loading01Icon as Loader2Icon,
  AlertCircleIcon as OctagonXIcon,
  Alert01Icon as TriangleAlertIcon,
} from "@hugeicons/core-free-icons";

import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import type { ToasterProps } from "sonner";
import { Toaster as Sonner } from "sonner";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Sonner Toaster crashed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ErrorBoundary>
      <Sonner
        theme={theme as ToasterProps["theme"]}
        className="toaster group"
        icons={{
          success: <HugeiconsIcon icon={CircleCheckIcon} className="size-4" />,
          info: <HugeiconsIcon icon={InfoIcon} className="size-4" />,
          warning: (
            <HugeiconsIcon icon={TriangleAlertIcon} className="size-4" />
          ),
          error: <HugeiconsIcon icon={OctagonXIcon} className="size-4" />,
          loading: (
            <HugeiconsIcon icon={Loader2Icon} className="size-4 animate-spin" />
          ),
        }}
        style={
          {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",
            "--border-radius": "var(--radius)",
          } as React.CSSProperties
        }
        toastOptions={{
          classNames: {
            toast: "cn-toast",
          },
        }}
        {...props}
      />
    </ErrorBoundary>
  );
};

export { Toaster };
