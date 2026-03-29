import { ShoppingBasket01Icon } from "@hugeicons/core-free-icons";
import { ModuleShell } from "@/components/layout/module-shell";

export default function CommercePage() {
  return (
    <ModuleShell
      title="Commerce"
      description="Powerful e-commerce tools to sell anywhere. Manage storefronts, orders, and customer engagement globally."
      icon={ShoppingBasket01Icon}
      color="bg-yellow-500/10 text-yellow-500"
    />
  );
}
