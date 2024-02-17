"use client";

import { PropsWithChildren } from "react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/toaster";

export default function LayoutProviders({
  children,
  session,
}: PropsWithChildren<{ session: Session | null }>) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider session={session}>
        {children}
        <Toaster />
      </SessionProvider>
    </ThemeProvider>
  );
}
