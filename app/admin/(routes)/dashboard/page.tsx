import DashboardCards from "@/components/dashboard/dashboard-cards";
import DashboardLoadingSkeleton from "@/components/dashboard/dashboard-loading";
import { DashboardHeader } from "@/components/header";
import { Metadata } from "next";
import { Suspense } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { BASE_API_URL } from "@/constants/constants";
import { LOCATIONS_ENDPOINT } from "@/constants/routes";
import { LocationHeader } from "@/components/locations/location-header";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Lavista Dashboard"
};

export default async function DashboardPage() {
  return (
    <div>
      <LocationHeader heading="Dashboard" text="Admin Panel" />
      <Suspense fallback={<DashboardLoadingSkeleton />}>
        <DashboardCards />
      </Suspense>
    </div>
  );
}
