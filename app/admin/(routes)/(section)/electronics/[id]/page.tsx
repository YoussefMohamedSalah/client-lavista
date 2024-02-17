import React from 'react'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { SECTIONS_ENDPOINT } from "@/constants/routes";
import { BASE_API_URL } from "@/constants/constants";

export default async function SectionPage({
  params
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  const apiResponse = await fetch(`${BASE_API_URL}${SECTIONS_ENDPOINT}electronics/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.user.accessToken}`,
    },
  });

  const location: any = await apiResponse.json();
	console.log(location)

  return (
    <div>
      this is section page 
    </div>
  )
}