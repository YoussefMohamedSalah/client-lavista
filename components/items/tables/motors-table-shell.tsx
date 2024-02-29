"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { Item, MotorType } from "@/types/item";
import { type ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import ItemsFormModal from "../items-form-modal";
import { Input } from "@/components/ui/input";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import { BASE_API_URL } from "@/constants/constants";
import { ITEMS_ENDPOINT } from "@/constants/routes";
import MotorItemForm from "../forms/motor-item-form";

interface MotorsTableShellProps {
    data: MotorType[];
    pageCount: number;
    itemTypes: any[];
    selectedItemType: any;
    selectedSectionId: string;
    token: string;
    refetch: () => void;
}

export function MotorsItemsTableShell({ data, pageCount, itemTypes, selectedItemType, selectedSectionId, token, refetch }: MotorsTableShellProps) {
    const [initialized, setInitialized] = React.useState<boolean>(false);
    const [items, setItems] = React.useState<any[]>([])
    const [filteredData, setFilteredData] = React.useState<any[]>([]);
    const [filteredValue, setFilteredValue] = React.useState<string>("");
    const [isModal, setIsModal] = React.useState<boolean>(false);
    const [selectedItem, setSelectedItem] = React.useState<MotorType>({} as MotorType);

    React.useEffect(() => {
        setItems([...data])
    }, [data])

    React.useEffect(() => {
        if (!initialized) {
            setItems([...data])
            setInitialized(true)
        }
    }, [])

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

    const handleDelete = async (id: string) => {
        try {
            let delRes = await fetch(`${BASE_API_URL}${ITEMS_ENDPOINT}${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (delRes) {
                refetch(selectedSectionId, selectedItemType.id)
                return true;
            }
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    const handleModalOpen = (item: MotorType) => {
        setSelectedItem(item);
        setIsModal(true);
    }

    const handleModelClose = () => {
        setIsModal(false);
        if (selectedItemType) {
            refetch(selectedSectionId, selectedItemType.id)
        }
    };

    const handleEdit = async (data: MotorType) => {
        try {
            let editRes = await fetch(`${BASE_API_URL}${ITEMS_ENDPOINT}${data.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data)
            });

            if (editRes.ok) {
                const updatedData = await editRes.json();
                const newData = items.map((item) => (item.id === data.id ? updatedData : item));
                setItems(newData);
                setIsModal(false);
                return true;
            } else {
                console.error("Error editing item:", editRes.statusText);
                return false;
            }
        } catch (error) {
            console.error("Error editing item:", error);
            return false;
        }
    };

    // Memoize the columns so they don't re-render on every render
    const columns = React.useMemo<ColumnDef<MotorType, unknown>[]>(
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
            {
                id: "actions",
                cell: function Cell({ row }) {
                    const item = row.original;
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
                                            handleModalOpen(item);
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
                                            Are you sure you want to delete this item?
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
                                                const deleted = await handleDelete(item.id!);
                                                if (deleted) {
                                                    setIsDeleteLoading(false);
                                                    setShowDeleteAlert(false);
                                                    // router.refresh();
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
        []
    );

    if (!initialized) return <></>
    return (
        <>
            <ItemsFormModal closeModal={handleModelClose} itemTypes={itemTypes} defaultItemType={selectedItemType} selectedSectionId={selectedSectionId} />
            <div className="flex gap-1">
                <Input
                    placeholder={`Search...`}
                    value={filteredValue}
                    onChange={(event) => setFilteredValue(event?.target?.value)}
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                <Button className="h-8 w-[150px] lg:w-[100px]">
                    Count: {!filteredValue ? items.length : filteredData.length}
                </Button>
            </div>
            <DataTable
                columns={columns}
                data={!filteredValue ? items : filteredData}
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
            <dialog id="my_modal_1" className="modal" open={isModal}>
                <div className="modal-box flex flex-col justify-between lg:min-w-[800px] min-h-[60vh]">
                    {selectedItem && <MotorItemForm closeModal={handleModelClose} selectedItem={selectedItem} handleEdit={handleEdit} itemTypeId={selectedItemType?.id!} sectionId={selectedSectionId} />}
                    <div className="modal-action">
                        <button className="btn bg-destructive text-white" onClick={handleModelClose}>Close</button>
                    </div>
                </div>
            </dialog>
        </>
    );
}
