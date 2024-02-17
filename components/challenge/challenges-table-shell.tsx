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
import { Challenge } from "@/types/challenge";
import { formatCreatedDateForTable } from "@/utils/date-utils";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { type ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "../ui/use-toast";
import { challengeService } from "@/services/challenge.service";

interface ChallengesTableShellProps {
  data: Challenge[];
  pageCount: number;
}

async function deleteChallenge(challengeId: number) {
  const response = await challengeService.deleteChallenge(challengeId);

  if (response.status) {
    return true;
  }

  toast({
    title: "Something went wrong.",
    description: "Challenge was not deleted. Please try again.",
    variant: "destructive",
  });
}

export function ChallengesTableShell({
  data,
  pageCount,
}: ChallengesTableShellProps) {
  const [isPending, startTransition] = React.useTransition();

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<Challenge, unknown>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate font-medium">
                {row.getValue("name")}
              </span>
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "start_date",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Start Date" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate">
                {formatCreatedDateForTable(row.getValue("start_date"))}
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
        accessorKey: "end_date",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="End Date" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate">
                {formatCreatedDateForTable(row.getValue("end_date"))}
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
        accessorKey: "deleted",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Deleted" />
        ),
        cell: ({ row }) => {
          return (
            <div>
              {row.getValue("deleted") ? (
                <CheckCircledIcon className="text-green-600" />
              ) : (
                <CrossCircledIcon className="text-red-600" />
              )}
            </div>
          );
        },
        enableSorting: true,
        filterFn: (row, id, value) => {
          return value instanceof Array && value.includes(row.getValue(id));
        },
      },
      {
        id: "actions",
        cell: function Cell({ row }) {
          const challenge = row.original;
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
                      router.push(`challenges/edit/${challenge.id}`);
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                    onSelect={() => setShowDeleteAlert(true)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <AlertDialog
                open={showDeleteAlert}
                onOpenChange={setShowDeleteAlert}
              >
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this challenge?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async (event) => {
                        event.preventDefault();
                        setIsDeleteLoading(true);

                        const deleted = await deleteChallenge(challenge.id);

                        if (deleted) {
                          setIsDeleteLoading(false);
                          setShowDeleteAlert(false);
                          router.refresh();
                        }
                      }}
                      className="bg-red-600 focus:ring-red-600"
                    >
                      {isDeleteLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Icons.trash className="mr-2 h-4 w-4" />
                      )}
                      <span>Delete</span>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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
      searchableColumns={[
        {
          id: "name",
          title: "Name",
        },
      ]}
    />
  );
}
