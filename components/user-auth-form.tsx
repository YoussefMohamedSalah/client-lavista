"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { userAuthSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Icons } from "./icons";
import { useRouter } from "next/navigation";

import { useToast } from "./ui/use-toast";

type FormData = z.infer<typeof userAuthSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
  });

  function onSubmit(data: FormData) {
    setIsLoading(true);
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((res) => {
      if (res?.error === null) {
        // Handle successful login
        setIsLoading(false);
        router.push("/admin/dashboard");
      } else {
        // Handle error
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Invalid Email/password",
        });
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]"
    >
      <Input type="email" placeholder="Email" {...register("email")} />
      <Input type="password" placeholder="Password" {...register("password")} />
      <Button disabled={isLoading}>
        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
        Login
      </Button>
      {errors?.email && (
        <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
      )}
    </form>
  );
}
