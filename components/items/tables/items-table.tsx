import { DataTableLoading } from "@/components/loading/data-table-loading";
import { Suspense } from "react";
import { MotorsItemsTableShell } from "./motors-table-shell";
import { FiltersItemsTableShell } from "./filters-table-shell";
import { ElecItemsTableShell } from "./elec-table-shell";
import { PoolsItemsTableShell } from "./pools-table-shell";

interface ItemsTableProps {
    items: any[];
    selectedSectionId: string;
    selectedItemType: any;
    itemTypes: any[];
}

async function ItemsTable({ items, selectedItemType, itemTypes, selectedSectionId }: ItemsTableProps) {

    return (
        <div className="px-2 py-10">
            <Suspense fallback={<DataTableLoading columnCount={5} rowCount={5} />}>
                {selectedItemType.name! === "Motor" && (<MotorsItemsTableShell data={items} pageCount={1} itemTypes={itemTypes} selectedItemType={selectedItemType} selectedSectionId={selectedSectionId} />)}
                {selectedItemType.name! === "Filter" && (<FiltersItemsTableShell data={items} pageCount={1} itemTypes={itemTypes} selectedItemType={selectedItemType} selectedSectionId={selectedSectionId} />)}
                {selectedItemType.name! === "Elec Panel" && (<ElecItemsTableShell data={items} pageCount={1} itemTypes={itemTypes} selectedItemType={selectedItemType} selectedSectionId={selectedSectionId} />)}
                {selectedItemType.name! === "Pool" && (<PoolsItemsTableShell data={items} pageCount={1} itemTypes={itemTypes} selectedItemType={selectedItemType} selectedSectionId={selectedSectionId} />)}
            </Suspense>
        </div>
    );
}

export default ItemsTable;