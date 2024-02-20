import React from "react";
import { DataTableLoading } from "@/components/ui/data-table/data-table-loading";
import { BASE_API_URL } from "@/constants/constants";
import { ALL_VILLAGES_ENDPOINT } from "@/constants/routes";
import { Suspense } from "react";
import VillageCards from "@/components/village/village-cards";
import { VillageHeader } from "@/components/village/village-header";

export default function VillagesPage() {
  return (
    <div>
      <VillageHeader heading="Villages" text="Create and manage villages" />
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={5} />}>
        <VillageCards url={`${BASE_API_URL}${ALL_VILLAGES_ENDPOINT}`} />
      </Suspense>
    </div>
  );
}
