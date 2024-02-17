import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { BASE_API_URL } from "@/constants/constants";
import { LOCATIONS_ENDPOINT } from "@/constants/routes";
import { Suspense } from "react";
import DashboardLoadingSkeleton from "@/components/dashboard/dashboard-loading";
import LocationVillageCards from "@/components/locations/location_village-cards";
import { VillageHeader } from "@/components/village/village-header";

export default async function SingleLocationPage({
  params
}: {
  params: { id: string };
}) {


  const session = await getServerSession(authOptions);
  const apiResponse = await fetch(`${BASE_API_URL}${LOCATIONS_ENDPOINT}village/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  const location: any = await apiResponse.json();
  const {name, villages} = location;


  return (
    <div>
      <VillageHeader heading={`${name} Villages`} text="Create and manage villages" />
      <Suspense fallback={<DashboardLoadingSkeleton />}>
        <LocationVillageCards villages={villages} />
      </Suspense>
    </div>
  );
}
