"use client"

import { Input } from "@/components/common/input"
import { Button } from "@/components/common/button"
import { AuthFormProps, AuthState } from "@/constants/interfaces"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ForgotPasswordType, forgotPasswordSchema } from "../schema/AuthSchema"
import { useForgetPassword } from "@/api/auth/useAuth"
import { useState } from "react"
import useAuthStore from "@/store/useAuthStore"

interface ForgotPasswordFormProps extends AuthFormProps {
  onStateChange: (state: AuthState) => void
}

export default function ForgotPasswordForm({ onSwitch, onStateChange }: ForgotPasswordFormProps) {
  const [serverError, setServerError] = useState("")
  const { mutate: forgetPassword, isPending } = useForgetPassword()
  const setRedirectFrom = useAuthStore((state) => state.setRedirectFrom)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordType>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const onSubmit = (data: ForgotPasswordType) => {
    setServerError("")

    forgetPassword(data, {
      onSuccess: () => {
        setRedirectFrom("forgot-password")
        onStateChange("login")
      },
      onError: (error) => {
        console.error(error)
        setServerError("Something went wrong. Please try again later.")
      }
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-light text-white mb-2">Forgot password</h1>
        <p className="text-gray-400">Welcome to hustly.space, đăng chí</p>
      </div>
      {serverError && (
        <p className="text-red-500 text-sm">{serverError}</p>
      )}
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Email</label>
          <Input
            {...register("email")}
            type="email"
            placeholder="Enter your email..."
            className="bg-white/10 border-0 text-white placeholder-gray-500 h-12"
            disabled={isPending}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full bg-white text-black hover:bg-white/90 h-12"
          disabled={isPending}
        >
          {isPending ? "Processing..." : "Confirm"}
        </Button>
        <p className="text-center text-gray-400 text-sm">
          Wait I remember my password.{" "}
          <button
            type="button"
            onClick={onSwitch}
            className="text-white hover:underline"
            disabled={isPending}
          >
            Click here
          </button>
        </p>
      </form>
    </div>
  )
} 