import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
	CardContent
} from "@/components/ui/card";
import { BASE_API_URL } from "@/constants/constants";
import { ALL_LOCATIONS_ENDPOINT, LOCATIONS_ENDPOINT } from "@/constants/routes";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import DelEditBtns from "../shared/del-edit-btns";


export default async function LocationsCards() {

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
						<Card key={location?.id!}>
							<CardHeader className="flex flex-row justify-between">
								<Link href={`/admin/locations/${location?.id}`}>
									<CardTitle>{location.name}</CardTitle>
								</Link>
								<DelEditBtns route={`${LOCATIONS_ENDPOINT}`} token={session?.user?.accessToken! || ""} item={location} />
							</CardHeader>
							<Link href={`/admin/locations/${location?.id}`}>
								<CardContent>
									<CardDescription>
										Total Villages: {location.villages_count || 0}
									</CardDescription>
								</CardContent>
							</Link>
						</Card>
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
