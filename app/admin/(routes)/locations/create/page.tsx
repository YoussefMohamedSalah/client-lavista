import CreateLocationForm from "@/components/locations/create-location-form";
import { DashboardHeader } from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create location"
};

export default async function CreateLocationPage() {
  return (
    <div>
      <DashboardHeader heading="Create location" />
      <CreateLocationForm />
    </div>
  );
}
