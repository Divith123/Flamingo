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

interface JournalEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organizationId: string;
}

interface LineItem {
  accountId: string;
  description: string;
  debitAmount: number;
  creditAmount: number;
  _id?: string;
}

export function JournalEntryDialog({
  open,
  onOpenChange,
  organizationId,
}: JournalEntryDialogProps) {
  const utils = trpc.useUtils();

  const { data: accounts } = useQuery(
    trpc.books.listAccounts.queryOptions({ organizationId }),
  );

  const createMutation = trpc.books.createJournalEntry.useMutation({
    onSuccess: () => {
      utils.books.listAccounts.invalidate();
      utils.books.getTrialBalance.invalidate();
      onOpenChange(false);
      resetForm();
    },
  });

  const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");
  const [lines, setLines] = useState<LineItem[]>([
    {
      _id: crypto.randomUUID(),
      accountId: "",
      description: "",
      debitAmount: 0,
      creditAmount: 0,
    },
    {
      _id: crypto.randomUUID(),
      accountId: "",
      description: "",
      debitAmount: 0,
      creditAmount: 0,
    },
  ]);

  const resetForm = () => {
    setDate(format(new Date(), "yyyy-MM-dd"));
    setDescription("");
    setReference("");
    setLines([
      { accountId: "", description: "", debitAmount: 0, creditAmount: 0 },
      { accountId: "", description: "", debitAmount: 0, creditAmount: 0 },
    ]);
  };

  const addLine = () => {
    setLines([
      ...lines,
      {
        _id: crypto.randomUUID(),
        accountId: "",
        description: "",
        debitAmount: 0,
        creditAmount: 0,
      },
    ]);
  };

  const removeLine = (index: number) => {
    if (lines.length <= 2) return;
    setLines(lines.filter((_, i) => i !== index));
  };

  const updateLine = (
    index: number,
    field: keyof LineItem,
    value: string | number,
  ) => {
    const newLines = [...lines];
    newLines[index] = { ...newLines[index], [field]: value };
    setLines(newLines);
  };

  const totalDebits = lines.reduce((sum, line) => sum + line.debitAmount, 0);
  const totalCredits = lines.reduce((sum, line) => sum + line.creditAmount, 0);
  const isBalanced = Math.abs(totalDebits - totalCredits) < 0.01;

  const handleSubmit = () => {
    if (!isBalanced || totalDebits === 0) return;

    createMutation.mutate({
      organizationId,
      date: new Date(date),
      description,
      reference: reference || undefined,
      lines: lines.filter((line) => line.accountId),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-white/10 bg-[#0f1218]">
        <DialogHeader>
          <DialogTitle className="text-white">Create Journal Entry</DialogTitle>
          <DialogDescription>
            Record a financial transaction with debits and credits
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Date and Reference */}
          <div className="grid grid-cols-2 gap-4">
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
            <div className="grid gap-2">
              <Label htmlFor="reference" className="text-white">
                Reference
              </Label>
              <Input
                id="reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="border-white/10 bg-[#1a1d24] text-white"
                placeholder="Optional reference number"
              />
            </div>
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
              placeholder="Enter journal entry description"
            />
          </div>

          {/* Lines */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-white">Lines</Label>
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
              {lines.map((line, index) => (
                <div
                  key={line._id}
                  className="grid grid-cols-12 items-end gap-3"
                >
                  <div className="col-span-4">
                    <Label className="text-muted-foreground text-xs">
                      Account
                    </Label>
                    <Select
                      value={line.accountId}
                      onValueChange={(value) =>
                        updateLine(index, "accountId", value)
                      }
                    >
                      <SelectTrigger className="border-white/10 bg-[#1a1d24] text-white">
                        <SelectValue placeholder="Select account" />
                      </SelectTrigger>
                      <SelectContent className="border-white/10 bg-[#1a1d24]">
                        {accounts?.map((account) => (
                          <SelectItem
                            key={account.id}
                            value={account.id}
                            className="text-white"
                          >
                            {account.code} - {account.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-3">
                    <Label className="text-muted-foreground text-xs">
                      Description
                    </Label>
                    <Input
                      value={line.description}
                      onChange={(e) =>
                        updateLine(index, "description", e.target.value)
                      }
                      className="border-white/10 bg-[#1a1d24] text-white"
                      placeholder="Line description"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground text-xs">
                      Debit
                    </Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={line.debitAmount || ""}
                      onChange={(e) =>
                        updateLine(
                          index,
                          "debitAmount",
                          Number.parseFloat(e.target.value) || 0,
                        )
                      }
                      className="border-white/10 bg-[#1a1d24] text-white"
                    />
                  </div>
                  <div className="col-span-2">
                    <Label className="text-muted-foreground text-xs">
                      Credit
                    </Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={line.creditAmount || ""}
                      onChange={(e) =>
                        updateLine(
                          index,
                          "creditAmount",
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
                      disabled={lines.length <= 2}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="grid grid-cols-3 gap-4 border-white/10 border-t pt-4">
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Total Debits</p>
              <p
                className={`font-bold text-lg ${isBalanced ? "text-white" : "text-red-400"}`}
              >
                ${totalDebits.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Total Credits</p>
              <p
                className={`font-bold text-lg ${isBalanced ? "text-white" : "text-red-400"}`}
              >
                ${totalCredits.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground text-sm">Difference</p>
              <p
                className={`font-bold text-lg ${isBalanced ? "text-green-400" : "text-red-400"}`}
              >
                ${(totalDebits - totalCredits).toFixed(2)}
              </p>
            </div>
          </div>

          {!isBalanced && (
            <p className="text-center text-red-400 text-sm">
              ⚠️ Debits and credits must be equal
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              createMutation.isPending || !isBalanced || totalDebits === 0
            }
          >
            {createMutation.isPending ? "Creating..." : "Create Entry"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
