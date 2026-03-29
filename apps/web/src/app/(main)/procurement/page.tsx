import { DeliveryBox01Icon } from "@hugeicons/core-free-icons";
import { ModuleShell } from "@/components/layout/module-shell";

export default function ProcurementPage() {
  return (
    <ModuleShell
      title="Procurement"
      description="Streamline your supply chain and purchasing. Manage vendors, purchase orders, and procurement cycles efficiently."
      icon={DeliveryBox01Icon}
      color="bg-emerald-500/10 text-emerald-500"
    />
  );
}
