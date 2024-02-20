import { ItemsTableShell } from "@/components/items/items-table-shell";
import { DataTableLoading } from "@/components/loading/data-table-loading";
import { Suspense } from "react";

interface ItemsTableProps {
    items: any[];
}

async function ItemsTable({ items }: ItemsTableProps) {

    return (
        <div className="px-2 py-10">
            <Suspense fallback={<DataTableLoading columnCount={5} rowCount={5} />}>
                <ItemsTableShell data={items} pageCount={1} />
            </Suspense>
        </div>
    );
}

export default ItemsTable;