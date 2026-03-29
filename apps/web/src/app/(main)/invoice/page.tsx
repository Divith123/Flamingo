"use client";

import { PlusIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trpc } from "@/utils/trpc";
import { CreateInvoiceDialog } from "./create-invoice-dialog";
import { InvoiceList } from "./invoice-list";

export default function InvoicePage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const utils = trpc.useUtils();
  const { data: organizations } = useQuery(
    trpc.organization.list.queryOptions(),
  );
  const organizationId = organizations?.[0]?.id;

  const { data: invoices } = useQuery(
    trpc.invoice.list.queryOptions(
      { organizationId: organizationId ?? "", limit: 50 },
      { enabled: !!organizationId },
    ),
  );

  const { data: stats } = useQuery(
    trpc.invoice.stats.queryOptions(
      { organizationId: organizationId ?? "" },
      { enabled: !!organizationId },
    ),
  );

  if (!organizationId) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">No organization found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl text-white">Invoices</h1>
          <p className="text-muted-foreground">Create and manage invoices</p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <HugeiconsIcon icon={PlusIcon} size={18} className="mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-white/5 bg-[#0f1218]">
          <CardHeader className="pb-2">
            <CardDescription className="text-muted-foreground">
              Total
            </CardDescription>
            <CardTitle className="text-2xl text-white">
              {stats?.total || 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">All invoices</p>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-[#0f1218]">
          <CardHeader className="pb-2">
            <CardDescription className="text-muted-foreground">
              Draft
            </CardDescription>
            <CardTitle className="text-2xl text-white">
              {stats?.draft || 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">Not yet sent</p>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-[#0f1218]">
          <CardHeader className="pb-2">
            <CardDescription className="text-muted-foreground">
              Pending
            </CardDescription>
            <CardTitle className="text-2xl text-white">
              {stats?.pending || 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-[#0f1218]">
          <CardHeader className="pb-2">
            <CardDescription className="text-muted-foreground">
              Overdue
            </CardDescription>
            <CardTitle className="text-2xl text-white">
              {stats?.overdue || 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">Past due date</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoice List */}
      <InvoiceList
        organizationId={organizationId}
        invoices={invoices?.invoices || []}
        onRefresh={() => utils.invoice.list.invalidate()}
      />

      {/* Create Dialog */}
      <CreateInvoiceDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        organizationId={organizationId}
      />
    </motion.div>
  );
}
