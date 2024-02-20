"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Item } from "@/types/item";
import { formatDateForUserJoining } from "@/utils/date-utils";
import { type ColumnDef } from "@tanstack/react-table";
import * as React from "react";

interface UsersTableShellProps {
  data: Item[];
  pageCount: number;
}

export function ItemsTableShell({ data, pageCount }: UsersTableShellProps) {

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<Item, unknown>[]>(
    () => [
      {
        accessorKey: "code",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Code" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate font-medium">
                {row.getValue("code")}
              </span>
            </div>
          );
        },
        enableSorting: false,
      },
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
        accessorKey: "count",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Count" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate font-medium">
                {row.getValue("count")}
              </span>
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "type",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate font-medium">
                {row.getValue("type")}
              </span>
            </div>
          );
        },
        enableSorting: false,
      },
      {
        accessorKey: "state",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="State" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate">
                {row.getValue("state")}
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
        accessorKey: "details",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Details" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate">
                {row.getValue("details")}
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
        accessorKey: "createdAt",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created At" />
        ),
        cell: ({ row }) => {
          return (
            <div className="flex space-x-2">
              <span className="max-w-[500px] truncate">
                {formatDateForUserJoining(row.getValue("createdAt"))}
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
          id: "state",
          title: "State",
          options: [
            {
              label: "Working",
              value: "working",
            },
            {
              label: "Not Working",
              value: "not_working",
            },
          ],
        },
      ]}
      searchableColumns={[
        {
          id: "name",
          title: "Name",
        },
      ]}
    />
  );
}
