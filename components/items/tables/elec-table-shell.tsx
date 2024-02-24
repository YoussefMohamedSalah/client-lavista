"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { ElecType, Item } from "@/types/item";
import { type ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import ItemsFormModal from "../items-form-modal";
import { Input } from "@/components/ui/input";

interface UsersTableShellProps {
    data: ElecType[];
    pageCount: number;
    itemTypes: any[];
    selectedItemType: any;
    selectedSectionId: string;
}

export function ElecItemsTableShell({ data, pageCount, itemTypes, selectedItemType, selectedSectionId }: UsersTableShellProps) {
    const [filteredData, setFilteredData] = React.useState<any[]>([...data]);
    const [filteredValue, setFilteredValue] = React.useState<string>("");

    React.useEffect(() => {
        handleFilterItems(filteredValue)
    }, [filteredValue])

    const handleFilterItems = (value: string) => {
        const filtered = data.filter((item) => {
            // Customize this condition based on your filtering requirements
            return (
                item.name?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.state?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.details?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase())
            );
        });
        setFilteredData(filtered);
    };

    // Memoize the columns so they don't re-render on every render
    const columns = React.useMemo<ColumnDef<Item, unknown>[]>(
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
        ],
        []
    );

    return (
        <>
            <ItemsFormModal itemTypes={itemTypes} defaultItemType={selectedItemType} selectedSectionId={selectedSectionId} />
            <Input
                placeholder={`Search...`}
                value={filteredValue}
                onChange={(event) => setFilteredValue(event?.target?.value)}
                className="h-8 w-[150px] lg:w-[250px]"
            />
            <DataTable
                columns={columns}
                data={filteredData ? filteredData : data}
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
        </>
    );
}
