"use client";

import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { trpc } from "@/utils/trpc";

interface FinancialReportsProps {
  organizationId: string;
}

export function FinancialReports({ organizationId }: FinancialReportsProps) {
  const [reportType, setReportType] = useState<
    "balance-sheet" | "profit-loss" | "trial-balance"
  >("balance-sheet");
  const [asOf, setAsOf] = useState(format(new Date(), "yyyy-MM-dd"));
  const [startDate, setStartDate] = useState(
    format(new Date(new Date().getFullYear(), 0, 1), "yyyy-MM-dd"),
  );
  const [endDate, setEndDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const { data: balanceSheet } = useQuery(
    trpc.books.getBalanceSheet.queryOptions(
      {
        organizationId,
        asOf: new Date(asOf),
      },
      { enabled: reportType === "balance-sheet" },
    ),
  );

  const { data: profitLoss } = useQuery(
    trpc.books.getProfitAndLoss.queryOptions(
      {
        organizationId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
      { enabled: reportType === "profit-loss" },
    ),
  );

  const { data: trialBalance } = useQuery(
    trpc.books.getTrialBalance.queryOptions(
      {
        organizationId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
      { enabled: reportType === "trial-balance" },
    ),
  );

  return (
    <div className="space-y-6">
      {/* Report Controls */}
      <div className="flex items-center justify-between">
        <Tabs
          value={reportType}
          onValueChange={(v) => setReportType(v as typeof reportType)}
        >
          <TabsList className="border-white/10 bg-[#0f1218]">
            <TabsTrigger
              value="balance-sheet"
              className="data-[state=active]:bg-white/10"
            >
              Balance Sheet
            </TabsTrigger>
            <TabsTrigger
              value="profit-loss"
              className="data-[state=active]:bg-white/10"
            >
              Profit & Loss
            </TabsTrigger>
            <TabsTrigger
              value="trial-balance"
              className="data-[state=active]:bg-white/10"
            >
              Trial Balance
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          {reportType === "balance-sheet" ? (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">As of:</span>
              <input
                type="date"
                value={asOf}
                onChange={(e) => setAsOf(e.target.value)}
                className="rounded border-white/10 bg-[#1a1d24] px-3 py-1.5 text-sm text-white"
              />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">From:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded border-white/10 bg-[#1a1d24] px-3 py-1.5 text-sm text-white"
              />
              <span className="text-muted-foreground text-sm">to:</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="rounded border-white/10 bg-[#1a1d24] px-3 py-1.5 text-sm text-white"
              />
            </div>
          )}
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      {/* Balance Sheet */}
      {reportType === "balance-sheet" && balanceSheet && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-white/5 bg-[#0f1218]">
            <CardHeader>
              <CardTitle className="text-white">Assets</CardTitle>
              <CardDescription>What the company owns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium text-sm text-white">Current Assets</p>
                {balanceSheet.assets.current.map((item) => (
                  <div key={item.code} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.account}
                    </span>
                    <span className="text-white">
                      ${item.balance.toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between border-white/10 border-t pt-2 font-medium text-white">
                  <span>Total Current Assets</span>
                  <span>
                    $
                    {balanceSheet.assets.current
                      .reduce((sum, i) => sum + i.balance, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>

              <div>
                <p className="font-medium text-sm text-white">Fixed Assets</p>
                {balanceSheet.assets.fixed.map((item) => (
                  <div key={item.code} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.account}
                    </span>
                    <span className="text-white">
                      ${item.balance.toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between border-white/10 border-t pt-2 font-medium text-white">
                  <span>Total Fixed Assets</span>
                  <span>
                    $
                    {balanceSheet.assets.fixed
                      .reduce((sum, i) => sum + i.balance, 0)
                      .toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex justify-between border-white/10 border-t pt-4 font-bold text-lg text-white">
                <span>Total Assets</span>
                <span>${balanceSheet.assets.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-white/5 bg-[#0f1218]">
              <CardHeader>
                <CardTitle className="text-white">Liabilities</CardTitle>
                <CardDescription>What the company owes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium text-sm text-white">
                    Current Liabilities
                  </p>
                  {balanceSheet.liabilities.current.map((item) => (
                    <div
                      key={item.code}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {item.account}
                      </span>
                      <span className="text-white">
                        ${item.balance.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between border-white/10 border-t pt-2 font-medium text-white">
                    <span>Total Current Liabilities</span>
                    <span>
                      $
                      {balanceSheet.liabilities.current
                        .reduce((sum, i) => sum + i.balance, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="font-medium text-sm text-white">
                    Long-term Liabilities
                  </p>
                  {balanceSheet.liabilities.longTerm.map((item) => (
                    <div
                      key={item.code}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">
                        {item.account}
                      </span>
                      <span className="text-white">
                        ${item.balance.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between border-white/10 border-t pt-2 font-medium text-white">
                    <span>Total Long-term Liabilities</span>
                    <span>
                      $
                      {balanceSheet.liabilities.longTerm
                        .reduce((sum, i) => sum + i.balance, 0)
                        .toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between border-white/10 border-t pt-4 font-bold text-lg text-white">
                  <span>Total Liabilities</span>
                  <span>${balanceSheet.liabilities.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/5 bg-[#0f1218]">
              <CardHeader>
                <CardTitle className="text-white">Equity</CardTitle>
                <CardDescription>Owner's stake in the company</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {balanceSheet.equity.items.map((item) => (
                  <div key={item.code} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.account}
                    </span>
                    <span className="text-white">
                      ${item.balance.toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between border-white/10 border-t pt-4 font-bold text-lg text-white">
                  <span>Total Equity</span>
                  <span>${balanceSheet.equity.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Profit & Loss */}
      {reportType === "profit-loss" && profitLoss && (
        <Card className="border-white/5 bg-[#0f1218]">
          <CardHeader>
            <CardTitle className="text-white">
              Profit & Loss Statement
            </CardTitle>
            <CardDescription>
              {format(new Date(startDate), "MMM d, yyyy")} -{" "}
              {format(new Date(endDate), "MMM d, yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="font-medium text-sm text-white">Income</p>
              {profitLoss.income.map((item) => (
                <div key={item.code} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.account}</span>
                  <span className="text-white">${item.balance.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between border-white/10 border-t pt-2 font-medium text-white">
                <span>Total Income</span>
                <span>${profitLoss.totalIncome.toFixed(2)}</span>
              </div>
            </div>

            <div>
              <p className="font-medium text-sm text-white">
                Cost of Goods Sold
              </p>
              {profitLoss.cogs.map((item) => (
                <div key={item.code} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.account}</span>
                  <span className="text-white">${item.balance.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between border-white/10 border-t pt-2 font-medium text-white">
                <span>Total COGS</span>
                <span>${profitLoss.totalCogs.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between border-white/10 border-t pt-4 font-bold text-lg text-white">
              <span>Gross Profit</span>
              <span>${profitLoss.grossProfit.toFixed(2)}</span>
            </div>

            <div>
              <p className="font-medium text-sm text-white">Expenses</p>
              {profitLoss.expenses.map((item) => (
                <div key={item.code} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{item.account}</span>
                  <span className="text-white">${item.balance.toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between border-white/10 border-t pt-2 font-medium text-white">
                <span>Total Expenses</span>
                <span>${profitLoss.totalExpenses.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between border-white/20 border-t-2 pt-4 font-bold text-white text-xl">
              <span>Net Income</span>
              <span
                className={
                  profitLoss.netIncome >= 0 ? "text-green-400" : "text-red-400"
                }
              >
                ${profitLoss.netIncome.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Trial Balance */}
      {reportType === "trial-balance" && trialBalance && (
        <Card className="border-white/5 bg-[#0f1218]">
          <CardHeader>
            <CardTitle className="text-white">Trial Balance</CardTitle>
            <CardDescription>
              {format(new Date(startDate), "MMM d, yyyy")} -{" "}
              {format(new Date(endDate), "MMM d, yyyy")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 border-white/10 border-b pb-2 font-medium text-sm text-white">
              <span>Account</span>
              <span className="text-right">Debits</span>
              <span className="text-right">Credits</span>
              <span className="text-right">Balance</span>
            </div>
            <div className="space-y-2 pt-2">
              {trialBalance.map((item) => (
                <div
                  key={item.account.id}
                  className="grid grid-cols-4 gap-4 text-sm"
                >
                  <span className="text-muted-foreground">
                    {item.account.code} - {item.account.name}
                  </span>
                  <span className="text-right text-white">
                    ${item.debits.toFixed(2)}
                  </span>
                  <span className="text-right text-white">
                    ${item.credits.toFixed(2)}
                  </span>
                  <span
                    className={`text-right ${item.balance >= 0 ? "text-white" : "text-red-400"}`}
                  >
                    ${Math.abs(item.balance).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
