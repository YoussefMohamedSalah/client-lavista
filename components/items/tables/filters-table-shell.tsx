"use client";

import { DataTable } from "@/components/ui/data-table/data-table";
import { DataTableColumnHeader } from "@/components/ui/data-table/data-table-column-header";
import { FilterType } from "@/types/item";
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
import FilterItemForm from "../forms/filter-item-form";

interface UsersTableShellProps {
    data: FilterType[];
    pageCount: number;
    itemTypes: any[];
    selectedItemType: any;
    selectedSectionId: string;
    token: string;
    refetch: () => void;
}

export function FiltersItemsTableShell({ data, pageCount, itemTypes, selectedItemType, selectedSectionId, token, refetch }: UsersTableShellProps) {
    const [initialized, setInitialized] = React.useState<boolean>(false);
    const [items, setItems] = React.useState<any[]>([])
    const [filteredData, setFilteredData] = React.useState<any[]>([]);
    const [filteredValue, setFilteredValue] = React.useState<string>(""); const [isModal, setIsModal] = React.useState<boolean>(false);
    const [selectedItem, setSelectedItem] = React.useState<FilterType>({} as FilterType);

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
                refetch()
                return true;
            }
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    const handleModalOpen = (item: FilterType) => {
        setSelectedItem(item);
        setIsModal(true);
    }

    const handleModelClose = () => {
        setIsModal(false);
        if (selectedItemType) {
            refetch()
        }
    };

    const handleEdit = async (data: FilterType) => {
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
    const columns = React.useMemo<ColumnDef<FilterType, unknown>[]>(
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
                    {selectedItem && <FilterItemForm closeModal={handleModelClose} selectedItem={selectedItem} handleEdit={handleEdit} itemTypeId={selectedItemType?.id!} sectionId={selectedSectionId} />}
                    <div className="modal-action">
                        <button className="btn bg-destructive text-white" onClick={handleModelClose}>Close</button>
                    </div>
                </div>
            </dialog>
        </>
    );
}
