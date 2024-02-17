"use client";

import { Icons } from "@/components/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { brandService } from "@/services/brand.service";
import { BrandSubmission } from "@/types/brand-submission";
import { formatCreatedDateForTable } from "@/utils/date-utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "@/components/ui/use-toast";

interface BrandSubmissionTableShellProps {
  data: BrandSubmission[];
  pageCount: number;
}

export function BrandSubmissionsTableShell({
  data,
  pageCount,
}: BrandSubmissionTableShellProps) {
  const [isPending, startTransition] = React.useTransition();

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<BrandSubmission, unknown>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
          const brandSubmission = row.original;
          return (
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate font-medium">
                <a
                  href={`brands/view/${brandSubmission.id}`}
                  className="max-w-[500px] truncate"
                >
                  {row.getValue("name")}
                </a>
              </span>
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "website",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Website" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <a
                href={row.getValue("website")}
                target="_blank"
                className="max-w-[500px] truncate"
              >
                {row.getValue("website")}
              </a>
            </div>
          );
        },
        enableSorting: false,
        filterFn: (row, id, value) => {
          return value instanceof Array && value.includes(row.getValue(id));
        },
      },
      {
        accessorKey: "created_at",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Submitted On" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate">
                {formatCreatedDateForTable(row.getValue("created_at"))}
              </span>
            </div>
          );
        },
        enableSorting: false,
        filterFn: (row, id, value) => {
          return value instanceof Array && value.includes(row.getValue(id));
        },
      },
      {
        id: "actions",
        cell: function Cell({ row }) {
          const brandSubmission = row.original;
          const router = useRouter();
          const [showDeleteAlert, setShowDeleteAlert] =
            React.useState<boolean>(false);
          const [isDeleteLoading, setIsDeleteLoading] =
            React.useState<boolean>(false);
          return (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-label="Open menu"
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                  >
                    <DotsHorizontalIcon
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px]">
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={() => {
                      router.push(`brands/view/${brandSubmission.id}`);
                    }}
                  >
                    View
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          );
        },
      },
    ],
    [isPending]
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
    />
  );
}
