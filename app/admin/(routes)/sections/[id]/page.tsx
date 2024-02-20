import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth/next";
import { BASE_API_URL } from "@/constants/constants";
import { SECTIONS_ENDPOINT, VILLAGES_ENDPOINT } from "@/constants/routes";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import CardsLoadingSkeleton from "@/components/loading/cards-loading";

export default async function SingleLocationPage({
    params
}: {
    params: { id: string };
}) {

    const session = await getServerSession(authOptions);
    const villageResponse = await fetch(`${BASE_API_URL}${VILLAGES_ENDPOINT}${params.id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
        },
    });

    const village: any = await villageResponse.json();
    let sectionName = village?.name! || "Village";

    // const sectionsResponse = await fetch(`${BASE_API_URL}${VILLAGES_ENDPOINT}sections/${params.id}`, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${session?.user.accessToken}`,
    //     },
    // });

    // const sections: any[] = await sectionsResponse.json();

    return (
        <div>
            {/* <PageHeader heading={`${sectionName} Details`} text={`Add Sections To ${sectionName}`} btnText="Add Section" btnHref={`/admin/sections/create/`} /> */}
            <Suspense fallback={<CardsLoadingSkeleton />}>
                {/* <SectionsCards sections={sections} /> */}
            </Suspense>
        </div>
    );
}
