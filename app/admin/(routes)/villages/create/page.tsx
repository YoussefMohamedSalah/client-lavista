import CreateVillageForm from "@/components/village/create-village-form";
import { DashboardHeader } from "@/components/header";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { BASE_API_URL } from "@/constants/constants";
import { ALL_LOCATIONS_ENDPOINT } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Create Village"
};

export default async function CreateVillagePage() {
  const session = await getServerSession(authOptions);

  const apiResponse = await fetch(
    `${BASE_API_URL}${ALL_LOCATIONS_ENDPOINT}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    }
  );

  const locations = await apiResponse.json();
  console.log(locations)
  return (
    <div>
      <DashboardHeader heading="Create Village" />
      <CreateVillageForm locations={locations.locations} />
    </div>
  );
}
