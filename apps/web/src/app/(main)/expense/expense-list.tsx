"use client";

import { File02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { format } from "date-fns";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { RouterOutputs } from "@/utils/trpc";
import { trpc } from "@/utils/trpc";

type Expense = RouterOutputs["expense"]["list"]["expenses"][number];

interface ExpenseListProps {
  organizationId: string;
  expenses: Expense[];
  onRefresh: () => void;
}

export function ExpenseList({ expenses, onRefresh }: ExpenseListProps) {
  const submitMutation = trpc.expense.submit.useMutation({
    onSuccess: () => {
      onRefresh();
    },
  });

  const approveMutation = trpc.expense.approve.useMutation({
    onSuccess: () => {
      onRefresh();
    },
  });

  const rejectMutation = trpc.expense.reject.useMutation({
    onSuccess: () => {
      onRefresh();
    },
  });

  const handleSubmit = (id: string) => {
    submitMutation.mutate({ id });
  };

  const handleApprove = (id: string) => {
    approveMutation.mutate({ id });
  };

  const handleReject = (id: string) => {
    const reason = prompt("Enter reason for rejection:");
    if (reason) {
      rejectMutation.mutate({ id, reason });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-500/20 text-gray-400";
      case "pending_approval":
        return "bg-yellow-500/20 text-yellow-400";
      case "approved":
        return "bg-green-500/20 text-green-400";
      case "rejected":
        return "bg-red-500/20 text-red-400";
      case "reimbursed":
        return "bg-blue-500/20 text-blue-400";
      case "paid":
        return "bg-emerald-500/20 text-emerald-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  if (expenses.length === 0) {
    return (
      <Card className="border-white/5 bg-[#0f1218]">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <HugeiconsIcon
            icon={File02Icon}
            size={48}
            className="mb-4 text-muted-foreground"
          />
          <h3 className="font-medium text-white">No expenses yet</h3>
          <p className="mt-1 text-muted-foreground text-sm">
            Add your first expense to get started
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-white/5 bg-[#0f1218]">
      <Table>
        <TableHeader>
          <TableRow className="border-white/5">
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white">Description</TableHead>
            <TableHead className="text-white">Category</TableHead>
            <TableHead className="text-white">Amount</TableHead>
            <TableHead className="text-white">Payment Method</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-right text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense, index) => (
            <motion.tr
              key={expense.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-white/5 hover:bg-white/[0.02]"
            >
              <TableCell className="text-muted-foreground">
                {format(new Date(expense.date), "MMM d, yyyy")}
              </TableCell>
              <TableCell className="font-medium text-white">
                {expense.description}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {expense.category?.name || "Uncategorized"}
              </TableCell>
              <TableCell className="text-white">
                ${Number.parseFloat(expense.totalAmount).toFixed(2)}
              </TableCell>
              <TableCell className="text-muted-foreground capitalize">
                {expense.paymentMethod.replace("_", " ")}
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(expense.status)}>
                  {expense.status.replace("_", " ")}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {expense.status === "draft" && (
                    <Button
                      size="sm"
                      onClick={() => handleSubmit(expense.id)}
                      disabled={submitMutation.isPending}
                    >
                      Submit
                    </Button>
                  )}
                  {expense.status === "pending_approval" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleApprove(expense.id)}
                        disabled={approveMutation.isPending}
                        className="text-green-400 hover:text-green-300"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleReject(expense.id)}
                        disabled={rejectMutation.isPending}
                        className="text-red-400 hover:text-red-300"
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
