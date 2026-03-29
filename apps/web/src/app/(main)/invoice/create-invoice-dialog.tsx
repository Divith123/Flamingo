"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/utils/trpc";

interface CreateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId: string;
}

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
  discountPercent: number;
  _id?: string;
}

export function CreateInvoiceDialog({
  open,
  onOpenChange,
  organizationId,
}: CreateInvoiceDialogProps) {
  const utils = trpc.useUtils();

  const { data: customers } = useQuery(
    trpc.invoice.listCustomers.queryOptions({ organizationId }),
  );

  const createMutation = trpc.invoice.create.useMutation({
    onSuccess: () => {
      utils.invoice.list.invalidate();
      onOpenChange(false);
      resetForm();
    },
  });

  const [customerId, setCustomerId] = useState("");
  const [issueDate, setIssueDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [dueDate, setDueDate] = useState(
    format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
  );
  const [notes, setNotes] = useState("");
  const [terms, setTerms] = useState("");
  const [lines, setLines] = useState<LineItem[]>([
    {
      _id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      taxRate: 0,
      discountPercent: 0,
    },
  ]);

  const resetForm = () => {
    setCustomerId("");
    setIssueDate(format(new Date(), "yyyy-MM-dd"));
    setDueDate(
      format(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
    );
    setNotes("");
    setTerms("");
    setLines([
      {
        description: "",
        quantity: 1,
        unitPrice: 0,
        taxRate: 0,
        discountPercent: 0,
      },
    ]);
  };

  const addLine = () => {
    setLines([
      ...lines,
      {
        _id: crypto.randomUUID(),
        description: "",
        quantity: 1,
        unitPrice: 0,
        taxRate: 0,
        discountPercent: 0,
      },
    ]);
  };

  const removeLine = (index: number) => {
    setLines(lines.filter((_, i) => i !== index));
  };

  const updateLine = (
    index: number,
    field: keyof LineItem,
    value: number | string,
  ) => {
    const newLines = [...lines];
    newLines[index] = { ...newLines[index], [field]: value };
    setLines(newLines);
  };

  const calculateSubtotal = () => {
    return lines.reduce((sum, line) => {
      const lineTotal = line.quantity * line.unitPrice;
      const afterDiscount = lineTotal * (1 - line.discountPercent / 100);
      return sum + afterDiscount;
    }, 0);
  };

  const calculateTax = () => {
    return lines.reduce((sum, line) => {
      const lineTotal =
        line.quantity * line.unitPrice * (1 - line.discountPercent / 100);
      return sum + (lineTotal * line.taxRate) / 100;
    }, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleSubmit = () => {
    if (!customerId) return;

    createMutation.mutate({
      organizationId,
      customerId,
      issueDate: new Date(issueDate),
      dueDate: new Date(dueDate),
      notes,
      terms,
      lines: lines.map((line) => ({
        description: line.description,
        quantity: line.quantity,
        unitPrice: line.unitPrice,
        taxRate: line.taxRate,
        discountPercent: line.discountPercent,
      })),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-white/10 bg-[#0f1218]">
        <DialogHeader>
          <DialogTitle className="text-white">Create Invoice</DialogTitle>
          <DialogDescription>
            Create a new invoice for your customer
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Customer Selection */}
          <div className="grid gap-2">
            <Label htmlFor="customer" className="text-white">
              Customer
            </Label>
            <Select value={customerId} onValueChange={setCustomerId}>
              <SelectTrigger className="border-white/10 bg-[#1a1d24] text-white">
                <SelectValue placeholder="Select a customer" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[#1a1d24]">
                {customers?.map((customer) => (
                  <SelectItem
                    key={customer.id}
                    value={customer.id}
                    className="text-white"
                  >
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="issueDate" className="text-white">
                Issue Date
              </Label>
              <Input
                id="issueDate"
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="border-white/10 bg-[#1a1d24] text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="dueDate" className="text-white">
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="border-white/10 bg-[#1a1d24] text-white"
              />
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-white">Line Items</Label>
              <Button
                type="button"
                size="sm"
                onClick={addLine}
                variant="outline"
              >
                Add Line
              </Button>
            </div>

            <div className="space-y-3">
              {lines.map((line) => (
                <div
                  key={line._id}
                  className="grid grid-cols-12 items-end gap-3"
                >
                  <div className="col-span-5">
                    <Label className="text-muted-foreground text-xs">
                      Description
                    </Label>
                    <Textarea
                      value={line.description}
                      onChange={(e) =>
                        updateLine(index, "description", e.target.value)
                      }
                      className="min-h-[80px] border-white/10 bg-[#1a1d24] text-white"
                      placeholder="Item description"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground text-xs">
                      Quantity
                    </Label>
                    <Input
                      type="number"
                      value={line.quantity}
                      onChange={(e) =>
                        updateLine(
                          index,
                          "quantity",
                          Number.parseFloat(e.target.value) || 0,
                        )
                      }
                      className="border-white/10 bg-[#1a1d24] text-white"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground text-xs">
                      Unit Price
                    </Label>
                    <Input
                      type="number"
                      value={line.unitPrice}
                      onChange={(e) =>
                        updateLine(
                          index,
                          "unitPrice",
                          Number.parseFloat(e.target.value) || 0,
                        )
                      }
                      className="border-white/10 bg-[#1a1d24] text-white"
                    />
                  </div>
                  <div className="col-span-1">
                    <Label className="text-muted-foreground text-xs">
                      Tax %
                    </Label>
                    <Input
                      type="number"
                      value={line.taxRate}
                      onChange={(e) =>
                        updateLine(
                          index,
                          "taxRate",
                          Number.parseFloat(e.target.value) || 0,
                        )
                      }
                      className="border-white/10 bg-[#1a1d24] text-white"
                    />
                  </div>
                  <div className="col-span-1">
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => removeLine(index)}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes and Terms */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="notes" className="text-white">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border-white/10 bg-[#1a1d24] text-white"
                placeholder="Additional notes for the customer"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="terms" className="text-white">
                Terms
              </Label>
              <Textarea
                id="terms"
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                className="border-white/10 bg-[#1a1d24] text-white"
                placeholder="Payment terms and conditions"
              />
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-2 border-white/10 border-t pt-4">
            <div className="flex justify-between text-white">
              <span>Subtotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white">
              <span>Tax:</span>
              <span>${calculateTax().toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-white">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={createMutation.isPending || !customerId}
          >
            {createMutation.isPending ? "Creating..." : "Create Invoice"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
