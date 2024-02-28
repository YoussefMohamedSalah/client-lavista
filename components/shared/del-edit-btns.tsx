"use client"
import React from 'react';
import { BASE_API_URL } from '@/constants/constants';
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
import { Input } from '../ui/input';

interface Props {
    route: string;
    token: string;
    item: any;
}

const DelEditBtns = ({ route, token, item }: Props) => {
    const router = useRouter();
    const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);
    const [showEditAlert, setShowEditAlert] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>()

    const handleDelete = async () => {
        try {
            let delRes = await fetch(`${BASE_API_URL}${route}${item?.id!}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (delRes) return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

    const handleEdit = async () => {
        try {
            let delRes = await fetch(`${BASE_API_URL}${route}${item?.id!}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name })
            });
            if (delRes) return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }

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
                        onSelect={() => setShowEditAlert(true)}
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
                            Are you sure you want to delete this?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowDeleteAlert(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async (event) => {
                                event.preventDefault();
                                setIsLoading(true);
                                const deleted = await handleDelete();
                                if (deleted) {
                                    setIsLoading(false);
                                    setShowDeleteAlert(false);
                                    router.refresh();
                                }
                            }}
                            className="bg-red-600 focus:ring-red-600"
                        >
                            {isLoading ? (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Icons.trash className="mr-2 h-4 w-4" />
                            )}
                            <span>Delete</span>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {/*  */}
            <AlertDialog
                open={showEditAlert}
                onOpenChange={setShowDeleteAlert}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Input defaultValue={item?.name!} value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setShowEditAlert(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async (event) => {
                                event.preventDefault();
                                setIsLoading(true);
                                const edited = await handleEdit();
                                if (edited) {
                                    setIsLoading(false);
                                    setShowEditAlert(false);
                                    router.refresh();
                                }
                            }}
                            className="bg-green-600 focus:ring-green-600"
                        >
                            {isLoading && (
                                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            <span>Edit</span>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

export default DelEditBtns
