"use client";

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

type Account = RouterOutputs["books"]["listAccounts"][number];

interface ChartOfAccountsProps {
  organizationId: string;
  accounts: Account[];
  onRefresh: () => void;
}

export function ChartOfAccounts({ accounts }: ChartOfAccountsProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "asset":
        return "bg-blue-500/20 text-blue-400";
      case "liability":
        return "bg-red-500/20 text-red-400";
      case "equity":
        return "bg-purple-500/20 text-purple-400";
      case "income":
        return "bg-green-500/20 text-green-400";
      case "expense":
        return "bg-orange-500/20 text-orange-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const sortedAccounts = [...accounts].sort((a, b) =>
    a.code.localeCompare(b.code),
  );

  return (
    <Card className="border-white/5 bg-[#0f1218]">
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5">
              <TableHead className="text-white">Code</TableHead>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Type</TableHead>
              <TableHead className="text-white">Subtype</TableHead>
              <TableHead className="text-white">Currency</TableHead>
              <TableHead className="text-right text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAccounts.map((account, index) => (
              <motion.tr
                key={account.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.03 }}
                className="border-white/5 hover:bg-white/[0.02]"
              >
                <TableCell className="font-mono text-white">
                  {account.code}
                </TableCell>
                <TableCell className="font-medium text-white">
                  {account.name}
                </TableCell>
                <TableCell>
                  <Badge className={getTypeColor(account.type)}>
                    {account.type}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground capitalize">
                  {account.subtype?.replace(/_/g, " ") || "-"}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {account.currency}
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" disabled>
                    Edit
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
