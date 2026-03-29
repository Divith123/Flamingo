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

type Invoice = RouterOutputs["invoice"]["list"]["invoices"][number];

interface InvoiceListProps {
  organizationId: string;
  invoices: Invoice[];
  onRefresh: () => void;
}

export function InvoiceList({ invoices, onRefresh }: InvoiceListProps) {
  const sendMutation = trpc.invoice.send.useMutation({
    onSuccess: () => {
      onRefresh();
    },
  });

  const handleSend = (id: string) => {
    sendMutation.mutate({ id });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-500/20 text-gray-400";
      case "sent":
        return "bg-blue-500/20 text-blue-400";
      case "viewed":
        return "bg-purple-500/20 text-purple-400";
      case "partial":
        return "bg-yellow-500/20 text-yellow-400";
      case "paid":
        return "bg-green-500/20 text-green-400";
      case "overdue":
        return "bg-red-500/20 text-red-400";
      case "void":
        return "bg-gray-500/20 text-gray-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  if (invoices.length === 0) {
    return (
      <Card className="border-white/5 bg-[#0f1218]">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <HugeiconsIcon
            icon={File02Icon}
            size={48}
            className="mb-4 text-muted-foreground"
          />
          <h3 className="font-medium text-white">No invoices yet</h3>
          <p className="mt-1 text-muted-foreground text-sm">
            Create your first invoice to get started
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
            <TableHead className="text-white">Invoice #</TableHead>
            <TableHead className="text-white">Customer</TableHead>
            <TableHead className="text-white">Amount</TableHead>
            <TableHead className="text-white">Issued</TableHead>
            <TableHead className="text-white">Due</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-right text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice, index) => (
            <motion.tr
              key={invoice.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border-white/5 hover:bg-white/[0.02]"
            >
              <TableCell className="font-medium text-white">
                {invoice.invoiceNumber}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {invoice.customer.name}
              </TableCell>
              <TableCell className="text-white">
                ${Number.parseFloat(invoice.total).toFixed(2)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {format(new Date(invoice.issueDate), "MMM d, yyyy")}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {format(new Date(invoice.dueDate), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(invoice.status)}>
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {invoice.status === "draft" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleSend(invoice.id)}
                    >
                      Send
                    </Button>
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
