import { BASE_API_URL } from "@/constants/constants";
import { USERS_ENDPOINT } from "@/constants/routes";
import { Metadata } from "next";
import { Suspense } from "react";
import DashboardLoadingSkeleton from "@/components/dashboard/dashboard-loading";
import DashboardCards from "@/components/dashboard/dashboard-cards";
import { LocationHeader } from "@/components/locations/location-header";

export const metadata: Metadata = {
  title: "Locations",
  description: "Locations"
};

interface IndexPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function LocationsPage({ searchParams }: IndexPageProps) {
  const { page, per_page, first_name, permission_role } = searchParams;

  // Number of items per page
  const pageSize = typeof per_page === "string" ? parseInt(per_page) : 10;
  // Current page number
  const pageNumber = page === undefined ? 1 : page;

  let getAllUsersUrl = `${BASE_API_URL}${USERS_ENDPOINT}?page=${pageNumber}&size=${pageSize}`;
  if (first_name !== null && first_name !== undefined) {
    getAllUsersUrl = getAllUsersUrl + `&name=${first_name}`;
  }

  if (permission_role !== null && permission_role !== undefined) {
    if (typeof permission_role === "string") {
      const result = permission_role.split(".");

      if (result.includes("staff")) {
        getAllUsersUrl += `&is_staff=true`;
      }
      if (result.includes("superuser")) {
        getAllUsersUrl += `&is_superuser=true`;
      }
    }
  }

  return (
    <div>
      <LocationHeader heading="Locations" text="Admin Panel" />
      <Suspense fallback={<DashboardLoadingSkeleton />}>
        <DashboardCards />
      </Suspense>
    </div>
  );
}
