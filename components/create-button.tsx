"use client";

import { Icons } from "./icons";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface CreateButtonProps {
  text: string;
  route: string;
}

export default function CreateButton({ text, route }: CreateButtonProps) {
  const router = useRouter();

  return (
    <Button onClick={() => router.push(route)}>
      <Icons.add className="mr-2 h-4 w-4" />
      {text}
    </Button>
  );
}
