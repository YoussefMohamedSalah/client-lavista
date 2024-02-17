import React from "react";
import { DashboardHeader } from "@/components/header";
import { DataTableLoading } from "@/components/ui/data-table/data-table-loading";
import { BASE_API_URL } from "@/constants/constants";
import { ALL_VILLAGES_ENDPOINT } from "@/constants/routes";
import { Metadata } from "next";
import { Suspense } from "react";
import VillagesTable from "@/components/village/villages-table";
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
