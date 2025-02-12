"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInType } from "@/app/(auth)/schema/AuthSchema";
import { Input } from "@/components/common/input";
import { Button } from "@/components/common/button";

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: SignInType) => {
    console.log("Sign in data:", data);
  };

  return (
    <div className="px-20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          {...register("email")}
          placeholder="Enter your email"
        />
        <div className="mb-3 mt-1 text-white">
          {errors.email && errors.email.message}
        </div>

        <Input
          type="password"
          {...register("password")}
          placeholder="Enter your password"
        />
        <div className="mb-3 mt-1 text-white font-bold">
          {errors.password && errors.password.message}
        </div>

        <Button
          className="bg-white text-black hover:bg-white hover:text-black hover:opacity-85 transition-opacity"
          type="submit"
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}
