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

interface CreateExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId: string;
}

export function CreateExpenseDialog({
  open,
  onOpenChange,
  organizationId,
}: CreateExpenseDialogProps) {
  const utils = trpc.useUtils();

  const { data: categories } = useQuery(
    trpc.expense.listCategories.queryOptions({ organizationId }),
  );

  const createMutation = trpc.expense.create.useMutation({
    onSuccess: () => {
      utils.expense.list.invalidate();
      utils.expense.getStats.invalidate();
      onOpenChange(false);
      resetForm();
    },
  });

  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    | "cash"
    | "personal_card"
    | "company_card"
    | "bank_transfer"
    | "check"
    | "other"
  >("personal_card");
  const [billable, setBillable] = useState(false);

  const resetForm = () => {
    setCategoryId("");
    setAmount("");
    setDate(format(new Date(), "yyyy-MM-dd"));
    setDescription("");
    setNotes("");
    setPaymentMethod("personal_card");
    setBillable(false);
  };

  const handleSubmit = () => {
    if (!amount || !description || !date) return;

    createMutation.mutate({
      organizationId,
      categoryId: categoryId || undefined,
      amount: Number.parseFloat(amount),
      currency: "USD",
      date: new Date(date),
      description,
      notes,
      paymentMethod,
      billable,
      receiptRequired: false,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-white/10 bg-[#0f1218]">
        <DialogHeader>
          <DialogTitle className="text-white">Add Expense</DialogTitle>
          <DialogDescription>Record a business expense</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Category */}
          <div className="grid gap-2">
            <Label htmlFor="category" className="text-white">
              Category
            </Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger className="border-white/10 bg-[#1a1d24] text-white">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[#1a1d24]">
                {categories?.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className="text-white"
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="grid gap-2">
            <Label htmlFor="amount" className="text-white">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-white/10 bg-[#1a1d24] text-white"
            />
          </div>

          {/* Date */}
          <div className="grid gap-2">
            <Label htmlFor="date" className="text-white">
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-white/10 bg-[#1a1d24] text-white"
            />
          </div>

          {/* Description */}
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-white">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-white/10 bg-[#1a1d24] text-white"
              placeholder="What was this expense for?"
            />
          </div>

          {/* Payment Method */}
          <div className="grid gap-2">
            <Label htmlFor="paymentMethod" className="text-white">
              Payment Method
            </Label>
            <Select
              value={paymentMethod}
              onValueChange={(v) => setPaymentMethod(v as typeof paymentMethod)}
            >
              <SelectTrigger className="border-white/10 bg-[#1a1d24] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[#1a1d24]">
                <SelectItem value="cash" className="text-white">
                  Cash
                </SelectItem>
                <SelectItem value="personal_card" className="text-white">
                  Personal Card
                </SelectItem>
                <SelectItem value="company_card" className="text-white">
                  Company Card
                </SelectItem>
                <SelectItem value="bank_transfer" className="text-white">
                  Bank Transfer
                </SelectItem>
                <SelectItem value="check" className="text-white">
                  Check
                </SelectItem>
                <SelectItem value="other" className="text-white">
                  Other
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Notes */}
          <div className="grid gap-2">
            <Label htmlFor="notes" className="text-white">
              Notes (optional)
            </Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border-white/10 bg-[#1a1d24] text-white"
              placeholder="Additional details"
            />
          </div>

          {/* Billable */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="billable"
              checked={billable}
              onChange={(e) => setBillable(e.target.checked)}
              className="h-4 w-4 rounded border-white/10 bg-[#1a1d24]"
            />
            <Label htmlFor="billable" className="text-white">
              Billable to client
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={createMutation.isPending || !amount || !description}
          >
            {createMutation.isPending ? "Adding..." : "Add Expense"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
