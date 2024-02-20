import React from "react";
import { DataTableLoading } from "@/components/ui/data-table/data-table-loading";
import { BASE_API_URL } from "@/constants/constants";
import { ALL_SECTIONS_ENDPOINT } from "@/constants/routes";
import { Suspense } from "react";
import VillageCards from "@/components/village/village-cards";
import { ItemsHeader } from "@/components/items/items-header";

export default function VillagesPage() {
  return (
    <div>
      <ItemsHeader heading="Items" text="Admin Panel" />
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={5} />}>
        <VillageCards url={`${BASE_API_URL}${ALL_SECTIONS_ENDPOINT}`} />
      </Suspense>
    </div>
  );
}
