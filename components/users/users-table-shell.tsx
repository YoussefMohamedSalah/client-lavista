"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { User } from "@/types/user";
import { formatDateForUserJoining } from "@/utils/date-utils";
import { type ColumnDef } from "@tanstack/react-table";
import * as React from "react";

interface UsersTableShellProps {
  data: User[];
  pageCount: number;
}

export function UsersTableShell({ data, pageCount }: UsersTableShellProps) {

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<User, unknown>[]>(
    () => [
      {
        accessorKey: "first_name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate font-medium">
                {row.getValue("first_name")}
              </span>
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "permission_role",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Permission Level" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate">
                {row.getValue("permission_role")}
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
        accessorKey: "date_joined",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Date Joined" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate">
                {formatDateForUserJoining(row.getValue("date_joined"))}
              </span>
            </div>
          );
        },
        enableSorting: false,
        filterFn: (row, id, value) => {
          return value instanceof Array && value.includes(row.getValue(id));
        },
      },
    ],
    []
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      filterableColumns={[
        {
          id: "permission_role",
          title: "Role",
          options: [
            {
              label: "Is Staff",
              value: "staff",
            },
            {
              label: "Is Superuser",
              value: "superuser",
            },
          ],
        },
      ]}
      searchableColumns={[
        {
          id: "first_name",
          title: "Name",
        },
      ]}
    />
  );
}
