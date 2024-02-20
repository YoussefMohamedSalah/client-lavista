import { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import CardsLoadingSkeleton from "@/components/loading/cards-loading";
import LocationsCards from "@/components/locations/locations-cards";
import CreateLocationForm from "@/components/locations/create-location-form";

export const metadata: Metadata = {
	title: "Locations",
	description: "Lavista Locations"
};

export default async function LocationsPage() {
	return (
		<div>
			<PageHeader heading="Locations" text="Lavista Locations">
				<CreateLocationForm />
			</PageHeader>
			<Suspense fallback={<CardsLoadingSkeleton />}>
				<LocationsCards />
			</Suspense>
		</div>
	);
}
