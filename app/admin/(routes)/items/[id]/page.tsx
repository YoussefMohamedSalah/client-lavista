import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { BASE_API_URL } from "@/constants/constants";
import { LOCATIONS_ENDPOINT } from "@/constants/routes";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import CardsLoadingSkeleton from "@/components/loading/cards-loading";
import VillagesCards from "@/components/villages/villages-cards";
import CreateVillageForm from "@/components/villages/create-village-form";

export default async function SingleLocationPage({
    params
}: {
    params: { id: string };
}) {

    const session = await getServerSession(authOptions);

    const locationResponse = await fetch(`${BASE_API_URL}${LOCATIONS_ENDPOINT}${params.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
        },
    });

    const location: any = await locationResponse.json();
    let locationName = location?.name! || "Location";
    const villages: any[] = location?.villages! || [];

    return (
        <div>
            <Suspense fallback={<CardsLoadingSkeleton />}>
                <PageHeader heading={`${locationName} Details`} text={`Add Villages To ${locationName}`}>
                    <CreateVillageForm locationId={params.id} />
                </PageHeader>
                <VillagesCards villages={villages} />
            </Suspense>
        </div>
    );
}
