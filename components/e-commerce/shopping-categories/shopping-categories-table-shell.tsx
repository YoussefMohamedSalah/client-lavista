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
import { formatCreatedDateForTable } from "@/utils/date-utils";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { type ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "@/components/ui/use-toast";
import { shoppingCategoryService } from "@/services/shopping-category.service";
import { ShoppingCategory } from "@/types/shopping-category";

interface ShoppingCategoryTableShellProps {
  data: ShoppingCategory[];
  pageCount: number;
}

async function deleteShoppingCategory(shoppingCategoryId: number) {
  const response = await shoppingCategoryService.deleteShoppingCategory(shoppingCategoryId);
  if (response.status) {
    return true;
  }

  toast({
    title: "Something went wrong.",
    description: "Shopping category was not deleted. Please try again.",
    variant: "destructive",
  });
}

export function ShoppingCategoryTableShell({ data, pageCount }: ShoppingCategoryTableShellProps) {
  const [isPending, startTransition] = React.useTransition();

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<ShoppingCategory, unknown>[]>(
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
        accessorKey: "updated_at",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Updated At" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate">
                {formatCreatedDateForTable(row.getValue("updated_at"))}
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
          const shoppingCategory = row.original;
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
                  {/* <DropdownMenuItem
                    className="cursor-pointer"
                    onSelect={() => {
                      router.push(``);
                    }}
                  >
                    Edit
                  </DropdownMenuItem> */}
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
                      Are you sure you want to delete this shopping category?
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

                        const deleted = await deleteShoppingCategory(shoppingCategory.id);

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
