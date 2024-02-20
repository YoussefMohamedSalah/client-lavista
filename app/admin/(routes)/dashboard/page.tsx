import DashboardCards from "@/components/dashboard/dashboard-cards";
import DashboardLoadingSkeleton from "@/components/dashboard/dashboard-loading";
import { Metadata } from "next";
import { Suspense } from "react";
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
