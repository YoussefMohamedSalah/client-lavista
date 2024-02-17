import CreateLocationForm from "@/components/locations/create-location-form";
import { DashboardHeader } from "@/components/header";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { BASE_API_URL } from "@/constants/constants";
import { LOCATIONS_ENDPOINT } from "@/constants/routes";

export const metadata: Metadata = {
  title: "Create location"
};

export default async function CreateLocationPage() {
  return (
    <div>
      <DashboardHeader heading="Create location" />
      <CreateLocationForm shoppingCategories={[]} />
    </div>
  );
}
