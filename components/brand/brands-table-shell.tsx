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
import { Brand } from "@/types/brand";
import { formatCreatedDateForTable } from "@/utils/date-utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "../ui/use-toast";

interface BrandsTableShellProps {
  data: any[];
  pageCount: number;
}

async function deleteBrand(brandId: number) {
  const response = await brandService.deleteBrand(brandId);

  if (response.status) {
    return true;
  }

  toast({
    title: "Something went wrong.",
    description: "Brand was not deleted. Please try again.",
    variant: "destructive",
  });
}

export function BrandsTableShell({ data, pageCount }: BrandsTableShellProps) {
  const [isPending, startTransition] = React.useTransition();

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<Brand, unknown>[]>(
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
          <DataTableColumnHeader column={column} title="Created At" />
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
          const brand = row.original;
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
                      router.push(`brands/edit/${brand.id}`);
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
                      Are you sure you want to delete this brand?
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

                        const deleted = await deleteBrand(brand.id);

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
