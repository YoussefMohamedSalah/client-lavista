import { DataTableLoading } from "@/components/loading/data-table-loading";
import { Suspense } from "react";
import { MotorsItemsTableShell } from "./motors-table-shell";
import { FiltersItemsTableShell } from "./filters-table-shell";
import { ElecItemsTableShell } from "./elec-table-shell";
import { PoolsItemsTableShell } from "./pools-table-shell";

interface ItemsTableProps {
    items: any[];
    selectedItemTypeName: string;
    itemTypes: any[];
}

async function ItemsTable({ items, selectedItemTypeName, itemTypes }: ItemsTableProps) {

    return (
        <div className="px-2 py-10">
            <Suspense fallback={<DataTableLoading columnCount={5} rowCount={5} />}>
                {selectedItemTypeName === "Motor" && (<MotorsItemsTableShell data={items} pageCount={1} itemTypes={itemTypes} />)}
                {selectedItemTypeName === "Filter" && (<FiltersItemsTableShell data={items} pageCount={1} itemTypes={itemTypes} />)}
                {selectedItemTypeName === "Elec Panel" && (<ElecItemsTableShell data={items} pageCount={1} itemTypes={itemTypes} />)}
                {selectedItemTypeName === "Pool" && (<PoolsItemsTableShell data={items} pageCount={1} itemTypes={itemTypes} />)}
            </Suspense>
        </div>
    );
}

export default ItemsTable;