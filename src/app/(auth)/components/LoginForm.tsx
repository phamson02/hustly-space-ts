"use client";

import { Input } from "@/components/common/input";
import { Button } from "@/components/common/button";
import { AuthFormProps } from "@/constants/interfaces";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, SignInType } from "../schema/AuthSchema";
import { useLogin } from "@/api/auth/useAuth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";
import { useToast } from "@/hooks/useToast";
import { LoaderCircle } from "lucide-react";

export default function LoginForm({
  onSwitchToSignup,
  onSwitchToForgotPassword,
}: AuthFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const { mutate: login, isPending } = useLogin();
  const redirectFrom = useAuthStore((state) => state.redirectFrom);
  const clearRedirectFrom = useAuthStore((state) => state.clearRedirectFrom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
  });

  const { toast } = useToast();

  useEffect(() => {
    if (redirectFrom) {
      switch (redirectFrom) {
        case "forgot-password":
          toast({ description: "Check your email to get password." });
          break;
        case "signup":
          toast({ description: "Check your email to verify your account." });
          break;
      }
      clearRedirectFrom();
    }
  }, [redirectFrom]);

  const onSubmit = (data: SignInType) => {
    setServerError("");

    if (!data.username || !data.password) {
      toast({
        variant: "destructive",
        description: "Email and password are required",
      });
      return;
    }

    login(
      { username: data.username, password: data.password },
      {
        onSuccess: async (response) => {
          if (!response.access) {
            toast({
              variant: "destructive",
              description: "Invalid response from server",
            });
            return;
          }
          
          await fetch("/api/auth/setToken", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: response.access }),
          });
  
          toast({ description: "Login successful!" });
          router.push("/home");
        },
        onError: (error) => {
          console.error(error);
          toast({
            variant: "destructive",
            description: "Password or email is incorrect.",
          });
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-light text-white mb-2">Login account</h1>
        <p className="text-gray-400">Welcome to hustly.space, dong chi</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {serverError && (
          <p className="text-red-500 text-sm text-center">{serverError}</p>
        )}
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Email</label>
          <Input
            {...register("username")}
            type="email"
            placeholder="Enter your email..."
            className="bg-white/10 border-0 text-white placeholder-gray-500 h-12"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Password</label>
          <Input
            {...register("password")}
            type="password"
            placeholder="Enter your password..."
            className="bg-white/10 border-0 text-white h-12"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
          <div className="text-right">
            <span
              onClick={onSwitchToForgotPassword}
              className="text-sm text-gray-400 hover:text-white cursor-pointer"
            >
              Forgot password?
            </span>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-white text-black hover:bg-white/90 h-12"
          disabled={isPending}
        >
          {isPending ? <LoaderCircle className="animate-spin" /> : "Sign in"}
        </Button>
        <p className="text-center text-gray-400 text-sm">
          Do not have an account?{" "}
          <span
            onClick={onSwitchToSignup}
            className="text-white hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}
