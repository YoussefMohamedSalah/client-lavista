import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { DataTableLoading } from "@/components/ui/data-table/data-table-loading";
import { BASE_API_URL } from "@/constants/constants";
import { Suspense } from "react";
import VillageSectionsCards from "@/components/section/village_section_card";
import { getServerSession } from "next-auth/next";
import { SectionHeader } from "@/components/section/section-header";
import { VILLAGES_ENDPOINT } from "@/constants/routes";

export default async function SingleVillagePage({
  params
}: {
  params: { id: string };
}) {

  const session = await getServerSession(authOptions);
  // All Sections for this village
  const sectionsResponse = await fetch(`${BASE_API_URL}${VILLAGES_ENDPOINT}sections/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  const sections: any[] = await sectionsResponse.json();
  let villageName = sections[0]?.location?.name! || "";

  // -------------------------
  // All Sections for this village
  const itemsResponse = await fetch(`${BASE_API_URL}${VILLAGES_ENDPOINT}items/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  const items: any[] = await itemsResponse.json();

  return (
    <div>
      <SectionHeader heading={`${villageName} sections`} text="Create village sections" />
      <Suspense fallback={<DataTableLoading columnCount={5} rowCount={5} />}>
        <VillageSectionsCards sections={sections} items={items} session={session} />
      </Suspense>
    </div>
  );
}
