/**
 * DashboardCards component fetches data from an API endpoint and displays card-based navigation links on the dashboard.
 * It fetches information such as the total number of brands and users from the API response and renders them as cards.
 *
 * @returns {JSX.Element} - A React JSX element representing the dashboard cards.
 */
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { BASE_API_URL } from "@/constants/constants";
import { ALL_LOCATIONS_ENDPOINT } from "@/constants/routes";
import { getServerSession } from "next-auth/next";
import Link from "next/link";

export default async function DashboardCards() {

  const session = await getServerSession(authOptions);
  const apiResponse = await fetch(`${BASE_API_URL}${ALL_LOCATIONS_ENDPOINT}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  const locations: any = await apiResponse.json();

  return (
    <div className="mt-4 grid grid-cols-2 md:grid-cols-2 gap-3 pt-2">
      {locations && locations?.length > 0 ? (
        <>
          {locations?.map((location: any) => (
            <Link href={`/admin/locations/${location?.id}`} key={location?.id!}>
              <Card>
                <CardHeader>
                  <CardTitle>{location.name}</CardTitle>
                  <CardDescription>
                    Total Villages: {location.villages_count || 0}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          )
          )}
        </>
      ) : (
        <div className="container flex w-screen flex-col items-center justify-center mt-10">
          <h1 className="text-2xl font-semibold tracking-tight">
            No Locations Exists!
          </h1>
        </div>
      )}
    </div>
  );
}
