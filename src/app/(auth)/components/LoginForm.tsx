"use client"

import { Input } from "@/components/common/input"
import { Button } from "@/components/common/button"
import { AuthFormProps } from "@/constants/interfaces"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema, SignInType } from "../schema/AuthSchema"
import { useLogin } from "@/api/auth/useAuth"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import useAuthStore from "@/store/useAuthStore"
import { toast } from 'react-toastify'

export default function LoginForm({ onSwitchToSignup, onSwitchToForgotPassword }: AuthFormProps) {
  const router = useRouter()
  const [serverError, setServerError] = useState("")
  const { mutate: login, isPending } = useLogin()
  const redirectFrom = useAuthStore((state) => state.redirectFrom)
  const clearRedirectFrom = useAuthStore((state) => state.clearRedirectFrom)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInType>({
    resolver: zodResolver(signInSchema)
  })

  useEffect(() => {
    // Show toast based on redirect source
    if (redirectFrom) {
      switch (redirectFrom) {
        case "forgot-password":
          toast.success("Check your email to get password.");
          break;
        case "signup":
          toast.success("Check your email to verify your account.");
          break;
      }
      clearRedirectFrom();
    }
  }, [redirectFrom, clearRedirectFrom]);

  const onSubmit = (data: SignInType) => {
    setServerError("")

    if (!data.username || !data.password) {
      toast.error("Email and password are required");
      return;
    }

    login(
      { username: data.username, password: data.password },
      {
        onSuccess: (response) => {
          if (!response.access) {
            toast.error("Invalid response from server");
            return;
          }
          document.cookie = `accessToken=${response.access}; path=/news;`;
          toast.success("Login successful!");
          router.push("/news");
        },
        onError: (error) => {
          console.error(error);
          toast.error("Password or email is incorrect.");
        }
      }
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-light text-white mb-2">Login account</h1>
        <p className="text-gray-400">Welcome to hustly.space, đăng chí</p>
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
            <button
              type="button"
              onClick={onSwitchToForgotPassword}
              className="text-sm text-gray-400 hover:text-white"
            >
              Forgot password?
            </button>
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-white text-black hover:bg-white/90 h-12"
          disabled={isPending}
        >
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
        <p className="text-center text-gray-400 text-sm">
          Do not have an account?{" "}
          <button type="button" onClick={onSwitchToSignup} className="text-white hover:underline">
            Sign up
          </button>
        </p>
      </form>
    </div>
  )
} 