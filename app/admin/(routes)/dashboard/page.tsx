import { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/page-header";
import CardsLoadingSkeleton from "@/components/loading/cards-loading";
import DashboardCards from "@/components/dashboard/dashboard-cards";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "La vista Dashboard"
};

export default async function DashboardPage() {
    return (
        <div>
            <PageHeader heading="Dashboard" text="Admin Dashboard" />
            <Suspense fallback={<CardsLoadingSkeleton />}>
                <DashboardCards />
            </Suspense>
        </div>
    );
}
