"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { FilterType, Item } from "@/types/item";
import { formatDateForUserJoining } from "@/utils/date-utils";
import { type ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import ItemsFormModal from "../items-form-modal";
import { Input } from "@/components/ui/input";

interface UsersTableShellProps {
    data: FilterType[];
    pageCount: number;
    itemTypes: any[];
    selectedItemType: any;
    selectedSectionId: string;
}

export function FiltersItemsTableShell({ data, pageCount, itemTypes, selectedItemType, selectedSectionId }: UsersTableShellProps) {

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
                item.filter_type?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.filter_diameter?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.filter_flow?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.area?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.sand?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.sand_size?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.max_pressure?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.o_ring?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
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
                accessorKey: "filter_type",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Type" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate font-medium">
                                {row.getValue("filter_type")}
                            </span>
                        </div>
                    );
                },
                enableSorting: false,
            },
            {
                accessorKey: "filter_diameter",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Diameter" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate font-medium">
                                {row.getValue("filter_diameter")}
                            </span>
                        </div>
                    );
                },
                enableSorting: false,
            },
            {
                accessorKey: "filter_flow",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Flow" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate font-medium">
                                {row.getValue("filter_flow")}
                            </span>
                        </div>
                    );
                },
                enableSorting: false,
            },
            {
                accessorKey: "area",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Area" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate font-medium">
                                {row.getValue("area")}
                            </span>
                        </div>
                    );
                },
                enableSorting: false,
            },
            {
                accessorKey: "sand",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Sand Weight" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate font-medium">
                                {row.getValue("sand")}
                            </span>
                        </div>
                    );
                },
                enableSorting: false,
            },
            {
                accessorKey: "sand_size",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Sand Size" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate font-medium">
                                {row.getValue("sand_size")}
                            </span>
                        </div>
                    );
                },
                enableSorting: false,
            },
            {
                accessorKey: "max_pressure",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Max Pressure" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate font-medium">
                                {row.getValue("max_pressure")}
                            </span>
                        </div>
                    );
                },
                enableSorting: false,
            },
            {
                accessorKey: "o_ring",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="O Ring" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate font-medium">
                                {row.getValue("o_ring")}
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
