import { DashboardHeader } from "@/components/header";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { BASE_API_URL } from "@/constants/constants";
import { ALL_SECTIONS_ENDPOINT } from "@/constants/routes";
import CreateItemForm from "@/components/items/create-item-form";

export const metadata: Metadata = {
  title: "Create Village"
};

export default async function CreateSectionPage() {
  const session = await getServerSession(authOptions);

  const apiResponse = await fetch(
    `${BASE_API_URL}${ALL_SECTIONS_ENDPOINT}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.accessToken}`,
      },
    }
  );

  const sections = await apiResponse.json();

  return (
    <div>
      <DashboardHeader heading="Create Section" />
      <CreateItemForm sections={sections} />
    </div>
  );
}
