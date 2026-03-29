import { InvoiceIcon } from "@hugeicons/core-free-icons";
import { ModuleShell } from "@/components/layout/module-shell";

export default function BillingPage() {
  return (
    <ModuleShell
      title="Billing"
      description="End-to-end subscription management and payment automation for your growing SaaS or services business."
      icon={InvoiceIcon}
      color="bg-pink-500/10 text-pink-500"
    />
  );
}
