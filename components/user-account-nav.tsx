"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export function UserAccountNav() {
  const { data: session } = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={session?.user.image ?? "/profile_picture_placeholder.png"}
          />
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            signOut({ callbackUrl: "/" });
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
