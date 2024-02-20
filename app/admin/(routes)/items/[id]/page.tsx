import React from "react";
import { DashboardHeader } from "@/components/header";
import { DataTableLoading } from "@/components/ui/data-table/data-table-loading";
import { BASE_API_URL } from "@/constants/constants";
import { Suspense } from "react";
import VillageSectionsCards from "@/components/section/village_section_card";

export default function SingleVillagePage({
  params
}: {
  params: { id: string };
}) {
  return (
    <div>
      <DashboardHeader heading="Section" text="Create and village sections" />
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={5} />}>
        {/* <VillageSectionsCards
          url={`${BASE_API_URL}/village/sections/${params.id}`}
        /> */}
      </Suspense>
    </div>
  );
}
