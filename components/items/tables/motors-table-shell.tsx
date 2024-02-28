"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Item, MotorType } from "@/types/item";
import { type ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import ItemsFormModal from "../items-form-modal";
import { Input } from "@/components/ui/input";

interface MotorsTableShellProps {
    data: MotorType[];
    pageCount: number;
    itemTypes: any[];
    selectedItemType: any;
    selectedSectionId: string;
}

export function MotorsItemsTableShell({ data, pageCount, itemTypes, selectedItemType, selectedSectionId }: MotorsTableShellProps) {
    const [filteredData, setFilteredData] = React.useState<any[]>(data);
    const [filteredValue, setFilteredValue] = React.useState<string>("");

    React.useEffect(() => {
        handleFilterItems(filteredValue)
    }, [filteredValue])

    const handleFilterItems = (value: string) => {
        const filtered = data.filter((item) => {
            // Customize this condition based on your filtering requirements
            return (
                item.name?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.serial_num?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.pump_type?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.hp?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.amp?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.phase?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.capacitor?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.front_bearing?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.back_bearing?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.q?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.h?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
                item.mechanical_seal?.toString()?.toLowerCase().includes(value?.toString()?.toLowerCase()) ||
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
                accessorKey: "serial_num",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Serial Number" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate font-medium">
                                {row.getValue("serial_num")}
                            </span>
                        </div>
                    );
                },
                enableSorting: false,
            },
            {
                accessorKey: "pump_type",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Pump Type" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate font-medium">
                                {row.getValue("pump_type")}
                            </span>
                        </div>
                    );
                },
                enableSorting: false,
            },
            {
                accessorKey: "hp",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="HP" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate font-medium">
                                {row.getValue("hp")}
                            </span>
                        </div>
                    );
                },
                enableSorting: false,
            },
            {
                accessorKey: "amp",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="AMP" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate font-medium">
                                {row.getValue("amp")}
                            </span>
                        </div>
                    );
                },
                enableSorting: false,
            },
            {
                accessorKey: "phase",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Phase" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate font-medium">
                                {row.getValue("phase")}
                            </span>
                        </div>
                    );
                },
                enableSorting: false,
            },
            {
                accessorKey: "capacitor",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Capacitor" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate font-medium">
                                {row.getValue("capacitor")}
                            </span>
                        </div>
                    );
                },
                enableSorting: false,
            },
            {
                accessorKey: "front_bearing",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="F Bearing" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate font-medium">
                                {row.getValue("front_bearing")}
                            </span>
                        </div>
                    );
                },
                enableSorting: false,
            },
            {
                accessorKey: "back_bearing",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="B Bearing" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate font-medium">
                                {row.getValue("back_bearing")}
                            </span>
                        </div>
                    );
                },
                enableSorting: false,
            },
            {
                accessorKey: "q",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Q" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate">
                                {row.getValue("q")}
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
                accessorKey: "h",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="H" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate">
                                {row.getValue("h")}
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
                accessorKey: "mechanical_seal",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="Mechanical Seal" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate">
                                {row.getValue("mechanical_seal")}
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
                accessorKey: "o_ring",
                header: ({ column }) => (
                    <DataTableColumnHeader column={column} title="O Ring" />
                ),
                cell: ({ row }) => {
                    return (
                        <div className="flex space-x-2">
                            <span className="max-w-[500px] truncate">
                                {row.getValue("o_ring")}
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
            // {
            //     accessorKey: "createdAt",
            //     header: ({ column }) => (
            //         <DataTableColumnHeader column={column} title="Created At" />
            //     ),
            //     cell: ({ row }) => {
            //         return (
            //             <div className="flex space-x-2">
            //                 <span className="max-w-[500px] truncate">
            //                     {formatDateForUserJoining(row.getValue("createdAt"))}
            //                 </span>
            //             </div>
            //         );
            //     },
            //     enableSorting: false,
            //     filterFn: (row, id, value) => {
            //         return value instanceof Array && value.includes(row.getValue(id));
            //     },
            // },
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
