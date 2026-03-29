"use client";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/utils/trpc";
import { ChartOfAccounts } from "./chart-of-accounts";
import { FinancialReports } from "./financial-reports";
import { JournalEntryDialog } from "./journal-entry-dialog";

export default function BooksPage() {
  const [journalDialogOpen, setJournalDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const utils = trpc.useUtils();
  const { data: organizations } = useQuery(
    trpc.organization.list.queryOptions(),
  );
  const organizationId = organizations?.[0]?.id;

  const { data: accounts } = useQuery(
    trpc.books.listAccounts.queryOptions(
      { organizationId: organizationId ?? "" },
      { enabled: !!organizationId },
    ),
  );

  const { data: trialBalance } = useQuery(
    trpc.books.getTrialBalance.queryOptions(
      {
        organizationId: organizationId ?? "",
        startDate: new Date(new Date().getFullYear(), 0, 1),
        endDate: new Date(),
      },
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
          <h1 className="font-bold text-3xl text-white">Books</h1>
          <p className="text-muted-foreground">
            Accounting and financial management
          </p>
        </div>
        <Button onClick={() => setJournalDialogOpen(true)}>
          Create Journal Entry
        </Button>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-white/5 bg-[#0f1218]">
          <CardHeader className="pb-2">
            <CardDescription className="text-muted-foreground">
              Chart of Accounts
            </CardDescription>
            <CardTitle className="text-2xl text-white">
              {accounts?.length || 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">Active accounts</p>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-[#0f1218]">
          <CardHeader className="pb-2">
            <CardDescription className="text-muted-foreground">
              Trial Balance
            </CardDescription>
            <CardTitle className="text-2xl text-white">
              $
              {trialBalance
                ?.reduce((sum, item) => sum + Math.abs(item.balance), 0)
                .toFixed(2) || "0.00"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">Total balance</p>
          </CardContent>
        </Card>

        <Card className="border-white/5 bg-[#0f1218]">
          <CardHeader className="pb-2">
            <CardDescription className="text-muted-foreground">
              Period
            </CardDescription>
            <CardTitle className="text-2xl text-white">
              {new Date().getFullYear()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-xs">Fiscal year</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="border-white/10 bg-[#0f1218]">
          <TabsTrigger
            value="overview"
            className="data-[state=active]:bg-white/10"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="accounts"
            className="data-[state=active]:bg-white/10"
          >
            Chart of Accounts
          </TabsTrigger>
          <TabsTrigger
            value="reports"
            className="data-[state=active]:bg-white/10"
          >
            Financial Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-white/5 bg-[#0f1218]">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription>Common accounting tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setJournalDialogOpen(true)}
                >
                  Create Journal Entry
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setActiveTab("accounts")}
                >
                  Manage Accounts
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setActiveTab("reports")}
                >
                  View Financial Reports
                </Button>
              </CardContent>
            </Card>

            <Card className="border-white/5 bg-[#0f1218]">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription>Latest journal entries</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  No recent activity
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accounts">
          <ChartOfAccounts
            organizationId={organizationId}
            accounts={accounts || []}
            onRefresh={() => utils.books.listAccounts.invalidate()}
          />
        </TabsContent>

        <TabsContent value="reports">
          <FinancialReports organizationId={organizationId} />
        </TabsContent>
      </Tabs>

      {/* Journal Entry Dialog */}
      <JournalEntryDialog
        open={journalDialogOpen}
        onOpenChange={setJournalDialogOpen}
        organizationId={organizationId}
      />
    </motion.div>
  );
}
