import { SignatureIcon } from "@hugeicons/core-free-icons";
import { ModuleShell } from "@/components/layout/module-shell";

export default function SignPage() {
  return (
    <ModuleShell
      title="Sign"
      description="Collect legally binding digital signatures and manage your business documents with ease and security."
      icon={SignatureIcon}
      color="bg-indigo-500/10 text-indigo-500"
    />
  );
}
