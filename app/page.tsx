import { Metadata } from "next";
import UserAuthForm from "@/components/user-auth-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/options";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account"
};
export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <main>
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              La vista Admin Panel
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email to sign in to your account
            </p>
          </div>
          <UserAuthForm />
          <p className="px-7 text-center text-sm text-muted-foreground">
            Don&apos;t have an account? Contact your admin.
          </p>
        </div>
      </div>
    </main>
  );
}
