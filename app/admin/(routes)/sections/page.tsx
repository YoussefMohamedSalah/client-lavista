import { Metadata } from "next";
import { Suspense } from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { BASE_API_URL } from "@/constants/constants";
import { ALL_VILLAGES_ENDPOINT } from "@/constants/routes";
import { PageHeader } from "@/components/page-header";
import CardsLoadingSkeleton from "@/components/loading/cards-loading";
import VillagesCards from "@/components/villages/villages-cards";

export const metadata: Metadata = {
	title: "Villages",
	description: "Lavista Villages"
};

export default async function LocationsPage() {

	const session = await getServerSession(authOptions);
	const apiResponse = await fetch(`${BASE_API_URL}${ALL_VILLAGES_ENDPOINT}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	});

	const villages: any[] = await apiResponse.json();

	return (
		<div>
			<PageHeader heading="Villages" text="Lavista Villages" btnText="Add Village" btnHref="/admin/villages/create/" />
			<Suspense fallback={<CardsLoadingSkeleton />}>
				<VillagesCards villages={villages} />
			</Suspense>
		</div>
	);
}
