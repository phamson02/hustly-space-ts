"use client"

import { Input } from "@/components/common/input"
import { Button } from "@/components/common/button"
import { AuthFormProps } from "@/constants/interfaces"
import { useForm } from "react-hook-form"

interface ForgotPasswordFormData {
  email: string
}

export default function ForgotPasswordForm({ onSwitch }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>()

  const onSubmit = (data: ForgotPasswordFormData) => {
    console.log(data)
    // Handle form submission
  }

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-light text-white mb-2">Forgot password</h1>
        <p className="text-gray-400">Welcome to hustly.space, đăng chí</p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Email</label>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            })}
            type="email"
            placeholder="Enter your email..."
            className="bg-white/10 border-0 text-white placeholder-gray-500 h-12"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full bg-white text-black hover:bg-white/90 h-12">
          Confirm
        </Button>
        <p className="text-center text-gray-400 text-sm">
          Wait I remember my password.{" "}
          <button type="button" onClick={onSwitch} className="text-white hover:underline">
            Click here
          </button>
        </p>
      </form>
    </div>
  )
} 