"use client"

import { Input } from "@/components/common/input"
import { Button } from "@/components/common/button"
import { AuthFormProps, AuthState } from "@/constants/interfaces"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRegister } from "@/api/auth/useAuth"
import { SignUpType, signUpSchema } from "@/app/(auth)/schema/AuthSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import useAuthStore from "@/store/useAuthStore"
import { useToast } from "@/hooks/useToast"

interface SignUpFormProps extends AuthFormProps {
  onStateChange: (state: AuthState) => void
}

export default function SignupForm({ onSwitch, onStateChange }: SignUpFormProps) {
  const [serverError, setServerError] = useState("")
  const { mutate: signUp, isPending } = useRegister()
  const setRedirectFrom = useAuthStore((state) => state.setRedirectFrom)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange"
  })

  const { toast } = useToast();

  const onSubmit = (data: SignUpType) => {
    setServerError("")

    // Check if email already exists
    if (data.email == "Email đã tồn tại.") {
      setServerError("This email is already registered")
      return
    }

    signUp(
      {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          setRedirectFrom("signup")
          onStateChange("login")
        },
        onError: (error) => {
          if (error.message.includes("Email")) {
            setServerError("This email is already registered")
            toast({ variant: "destructive", description: "This email is already registered" });
          } else {
            setServerError(error.message)
          }
        }
      }
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-light text-white mb-2">Get started</h1>
        <p className="text-gray-400">Welcome to hustly.space, where you become a champion</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">First name</label>
            <Input
              {...register("first_name")}
              type="text"
              placeholder="First name"
              className="bg-white/10 border-0 text-white placeholder-gray-500 h-12"
            />
            {errors.first_name && (
              <p className="text-red-500 text-sm">{errors.first_name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Last name</label>
            <Input
              {...register("last_name")}
              type="text"
              placeholder="Last name"
              className="bg-white/10 border-0 text-white placeholder-gray-500 h-12"
            />
            {errors.last_name && (
              <p className="text-red-500 text-sm">{errors.last_name.message}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Email</label>
          <Input
            {...register("email")}
            type="email"
            placeholder="Enter your email..."
            className="bg-white/10 border-0 text-white placeholder-gray-500 h-12"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
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
        </div>
        {serverError && (
          <p className="text-red-500 text-sm text-center">{serverError}</p>
        )}
        <Button
          type="submit"
          className="w-full bg-white text-black hover:bg-white/90 h-12"
          disabled={isPending}
        >
          {isPending ? "Signing up..." : "Sign up"}
        </Button>
        <p className="text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <button type="button" onClick={onSwitch} className="text-white hover:underline">
            Login
          </button>
        </p>
      </form>
    </div>
  )
}