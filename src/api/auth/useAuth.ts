import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/api/apiClient"
import { 
  SignInType, 
  SignUpType, 
  ForgotPasswordType,
  ResetPasswordType,
  VerifyEmailType,
  ChangePasswordType
} from "@/app/(auth)/schema/AuthSchema"

// API functions
const authLogin = async (data: SignInType) => {
  const res = await apiClient.post(`/signin`, data)
  return res.data
}

const authRegister = async (data: SignUpType) => {
  const res = await apiClient.post(`/signup`, data)
  return res.data
}

const forgetPassword = async (data: ForgotPasswordType) => {
  const res = await apiClient.post(`/authentication/forget_password`, data)
  return res.data
}

const resetPassword = async (data: ResetPasswordType) => {
  const res = await apiClient.post(`/profile/change_password`, data)
  return res.data
}

const verifyEmail = async (data: VerifyEmailType) => {
  const res = await apiClient.post(`/authentication/verify_email`, data)
  return res.data
}

const changePassword = async (data: ChangePasswordType) => {
  const res = await apiClient.post(`/profile/change_password`, data)
  return res.data
}

// Hook exports
export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: authLogin,
    onSuccess: (data) => {
      console.log("Login successful:", data)
      queryClient.invalidateQueries({ queryKey: ["userProfile"] })
    },
  })
}

export function useRegister() {
  return useMutation({
    mutationFn: authRegister,
    onSuccess: (data) => {
      console.log("Registration successful:", data)
    },
  })
}

export function useForgetPassword() {
  return useMutation({
    mutationFn: forgetPassword,
    onSuccess: (data) => {
      console.log("Password reset email sent successfully:", data)
    },
  })
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      console.log("Password reset successful:", data)
    },
  })
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      console.log("Email verification successful:", data)
    },
  })
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      console.log("Password change successful:", data)
    },
  })
}

// Export raw functions
export {
  authLogin,
  authRegister,
  forgetPassword,
  resetPassword,
  verifyEmail,
  changePassword,
}
