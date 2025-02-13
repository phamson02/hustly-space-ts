"use client"

import { Input } from "@/components/common/input"
import { Button } from "@/components/common/button"
import { AuthFormProps, AuthState } from "@/constants/interfaces"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuthToken } from "@/api/apiClient"
import { useRegister } from "@/api/auth/useAuth"
import { SignUpType, signUpSchema } from "@/app/(auth)/schema/AuthSchema"
import { zodResolver } from "@hookform/resolvers/zod"

interface SignUpFormProps extends AuthFormProps {
  onStateChange: (state: AuthState) => void
}

export default function SignupForm({ onSwitch, onStateChange }: SignUpFormProps) {
  const router = useRouter()
  const [serverError, setServerError] = useState("")
  const { mutate: signUp, isPending } = useRegister()

  useEffect(() => {
    const accessToken = getAuthToken();
    if (!!accessToken) {
      router.push("/news");
    }
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    mode: "onChange"
  })

  const onSubmit = (data: SignUpType) => {
    setServerError("")

    // Check if email already exists
    if (data.email == "Email đã tồn tại.") {
      setServerError("This email is already registered")
      return
    }

    signUp(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          onStateChange("login")
        },
        onError: (error) => {
          if (error.message.includes("Email")) {
            setServerError("This email is already registered")
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
              {...register("firstName")}
              type="text"
              placeholder="First name"
              className="bg-white/10 border-0 text-white placeholder-gray-500 h-12"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Last name</label>
            <Input
              {...register("lastName")}
              type="text"
              placeholder="Last name"
              className="bg-white/10 border-0 text-white placeholder-gray-500 h-12"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName.message}</p>
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