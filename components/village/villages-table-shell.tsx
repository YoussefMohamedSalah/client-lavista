"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { User } from "@/types/user";
import { formatDateForUserJoining, formatLocationData } from "@/utils/date-utils";
import { type ColumnDef } from "@tanstack/react-table";
import * as React from "react";

interface UsersTableShellProps {
  data: any[];
  pageCount: number;
}

export function VillagesTableShell({ data, pageCount }: UsersTableShellProps) {
console.log(data)

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<any, unknown>[]>(
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
      //   accessorKey: "location",
      //   header: ({ column }) => (
      //     <DataTableColumnHeader column={column} title="Location" />
      //   ),
      //   cell: ({ row }) => {
      //     return (
      //       <div className="flex space-x-2">
      //         <span className="max-w-[500px] truncate">
      //           {/* {formatLocationData(row.getValue("location"))} */}
      //           {row.location}
      //         </span>
      //       </div>
      //     );
      //   },
      //   enableSorting: false,
      //   filterFn: (row, id, value) => {
      //     return value instanceof Array && value.includes(row.getValue(id));
      //   },
      // },
      // {
      //   accessorKey: "date_joined",
      //   header: ({ column }) => (
      //     <DataTableColumnHeader column={column} title="Date Joined" />
      //   ),
      //   cell: ({ row }) => {
      //     return (
      //       <div className="flex space-x-2">
      //         <span className="max-w-[500px] truncate">
      //           {formatDateForUserJoining(row.getValue("date_joined"))}
      //         </span>
      //       </div>
      //     );
      //   },
      //   enableSorting: false,
      //   filterFn: (row, id, value) => {
      //     return value instanceof Array && value.includes(row.getValue(id));
      //   },
      // },
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
          id: "name",
          title: "Name",
        },
      ]}
    />
  );
}
