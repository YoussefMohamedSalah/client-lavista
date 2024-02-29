"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { type Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { replaceUnderscoresWithSpace } from "@/utils/string-utils"
import React from "react"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const [initialized, setInitialized] = React.useState<boolean>(false)

  const toggleVisibility = (name: string, state: boolean) => {
    if (typeof window !== "undefined" && name) {
      let typeName = localStorage.getItem("itemTypeName");
      if (typeName) {
        let selectedView = localStorage.getItem(`${typeName}`)
        let newArray: string[] = [];

        if (selectedView) {
          let selectedViewArray = JSON.parse(selectedView);
          let newArr;
          for (let i = 0; i < selectedViewArray.length; i++) {
            const element = selectedViewArray[i];
            if (element === name && state === false) {
              newArr = selectedViewArray.filter((item: string) => item !== name);
              break;
            } else {
              newArr = [...selectedViewArray, name]
            }
          }
          newArray = [...newArr];
        } else {
          let allKeysExceptThis = table.getAllColumns().filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.id !== name
          )
          for (let i = 0; i < allKeysExceptThis.length; i++) {
            let element = allKeysExceptThis[i].id;
            newArray.push(element)
          }
        }
        localStorage.setItem(`${typeName}`, JSON.stringify(newArray))
      }
    }
  }

  const handleVisibility = () => {
    console.log("ONCE ONCE")
    // Retrieve the typeName from localStorage
    let typeName = localStorage.getItem("itemTypeName");

    if (typeName) {
      let selectedView = localStorage.getItem(`${typeName}`);

      if (selectedView) {
        let selectedViewArray = JSON.parse(selectedView);

        // Loop through all columns and set visibility based on whether they exist in the selectedViewArray
        table.getAllColumns().forEach((column) => {
          const isVisible = selectedViewArray.includes(column.id);
          column.toggleVisibility(isVisible);
        });
      }
    }
  };

  React.useEffect(() => {
    if (!initialized) {
      handleVisibility()
      setInitialized(true)
    }
  }, [])


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[170px]">
        {/* <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => {
                  toggleVisibility(column.id, !!value)
                  column.toggleVisibility(!!value)
                }}
              >
                {replaceUnderscoresWithSpace(column.id)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
