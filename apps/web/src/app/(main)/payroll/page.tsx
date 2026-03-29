import { UserGroupIcon } from "@hugeicons/core-free-icons";
import { ModuleShell } from "@/components/layout/module-shell";

export default function PayrollPage() {
  return (
    <ModuleShell
      title="Payroll"
      description="Process employee salaries, manage withholdings, and ensure compliance across all your jurisdictions."
      icon={UserGroupIcon}
      color="bg-green-500/10 text-green-500"
    />
  );
}
