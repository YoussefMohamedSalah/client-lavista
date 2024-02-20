"use client"
import { useState } from "react";
import ItemsTable from "../items/items-table";
import { BASE_API_URL } from "@/constants/constants";
import { Session } from "next-auth";
import { SECTIONS_ENDPOINT } from "@/constants/routes";

interface Props {
  session: Session | null;
  sections: any[];
  items: any[];
};

export default async function VillageSectionsCards({ session, sections, items }: Props) {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [itemsToShow, setItemsToShow] = useState<any[]>([...items])

  const handleSectionChange = async (sectionId: string) => {
    if (sectionId) {
      if (sectionId === "All") {
        return setItemsToShow([...items]);
      }
      else if (sectionId !== "All" && session) {
        const itemsResponse = await fetch(`${BASE_API_URL}${SECTIONS_ENDPOINT}items/${sectionId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        });
        const items: any[] = await itemsResponse.json();
        return setItemsToShow([...items]);
      }
    }
  }

  return (
    <>
      {sections && sections?.length > 0 ? (
        <>
          {/* {sections?.map((section: any) => (
            <div onClick={() => handleSectionChange(section.id)} key={section?.id!}>
              <Card>
                <CardHeader>
                  <CardTitle>{section.name}</CardTitle>
                </CardHeader>
              </Card>
            </div>
          )
          )} */}
        </>
      ) : (
        <div className="container flex w-screen flex-col items-center justify-center mt-10">
          <h1 className="text-2xl font-semibold tracking-tight">
            No Villages For This Location!
          </h1>
        </div>
      )}
      <ItemsTable items={itemsToShow} />
    </>
  );
}