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
import { CreateExpenseDialog } from "./create-expense-dialog";
import { ExpenseList } from "./expense-list";

export default function ExpensePage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const utils = trpc.useUtils();
  const { data: organizations } = useQuery(
    trpc.organization.list.queryOptions(),
  );
  const organizationId = organizations?.[0]?.id;

  const { data: expenses } = useQuery(
    trpc.expense.list.queryOptions(
      { organizationId: organizationId ?? "", limit: 50 },
      { enabled: !!organizationId },
    ),
  );

  const { data: stats } = useQuery(
    trpc.expense.getStats.queryOptions(
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
          <h1 className="font-bold text-3xl text-white">Expenses</h1>
          <p className="text-muted-foreground">
            Track and manage business expenses
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <HugeiconsIcon icon={PlusIcon} size={18} className="mr-2" />
          Add Expense
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
            <p className="text-muted-foreground text-xs">
              ${stats?.totalAmount.toFixed(2) || "0.00"}
            </p>
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
            <p className="text-muted-foreground text-xs">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-[#0f1218]">
          <CardHeader className="pb-2">
            <CardDescription className="text-muted-foreground">
              Approved
            </CardDescription>
            <CardTitle className="text-2xl text-white">
              {stats?.approved || 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">
              Ready for reimbursement
            </p>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-[#0f1218]">
          <CardHeader className="pb-2">
            <CardDescription className="text-muted-foreground">
              Reimbursable
            </CardDescription>
            <CardTitle className="text-2xl text-white">
              ${stats?.reimbursable?.toFixed(2) || "0.00"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">From personal funds</p>
          </CardContent>
        </Card>
      </div>

      {/* Expense List */}
      <ExpenseList
        organizationId={organizationId}
        expenses={expenses?.expenses || []}
        onRefresh={() => utils.expense.list.invalidate()}
      />

      {/* Create Dialog */}
      <CreateExpenseDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        organizationId={organizationId}
      />
    </motion.div>
  );
}
