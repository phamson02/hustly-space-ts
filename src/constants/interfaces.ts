export interface AuthFormProps {
  onSwitch?: () => void
  onSwitchToSignup?: () => void
  onSwitchToForgotPassword?: () => void
}

export type AuthState = "login" | "signup" | "forgot-password"
