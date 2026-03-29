import { Package01Icon } from "@hugeicons/core-free-icons";
import { ModuleShell } from "@/components/layout/module-shell";

export default function InventoryPage() {
  return (
    <ModuleShell
      title="Inventory"
      description="Real-time stock tracking and inventory management. Optimize your levels, track movements, and reduce carrying costs."
      icon={Package01Icon}
      color="bg-purple-500/10 text-purple-500"
    />
  );
}
