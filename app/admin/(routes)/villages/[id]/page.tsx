import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { BASE_API_URL } from "@/constants/constants";
import { ALL_ITEMS_TYPE_ENDPOINT, VILLAGES_ENDPOINT } from "@/constants/routes";
import { Suspense } from "react";
import CardsLoadingSkeleton from "@/components/loading/cards-loading";
import ItemsWrapper from "@/components/items/items-wrapper";

export default async function SingleVillagePage({
    params
}: {
    params: { id: string };
}) {

    const session = await getServerSession(authOptions);

    const lavistaResponse = await fetch(`${BASE_API_URL}${ALL_ITEMS_TYPE_ENDPOINT}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
        },
    });

    const itemTypes: any[] = await lavistaResponse.json() || [];


    const villageResponse = await fetch(`${BASE_API_URL}${VILLAGES_ENDPOINT}data/${params.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
        },
    });

    const village: any = await villageResponse.json();
    let villageName = village?.name! || "Village";
    const sections: any[] = village?.sections! || [];

    return (
        <div>
            <Suspense fallback={<CardsLoadingSkeleton />}>
                <ItemsWrapper villageName={villageName} villageId={params.id} sections={sections} token={session?.user.accessToken || ""} itemTypes={itemTypes} />
            </Suspense>
        </div>
    );
}
