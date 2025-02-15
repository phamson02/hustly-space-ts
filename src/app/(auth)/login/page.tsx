"use client";

import { useState } from "react";
import Image from "next/image";
import ForgotPasswordForm from "@/app/(auth)/components/ForgotPasswordForm";
import LoginForm from "@/app/(auth)/components/LoginForm";
import SignupForm from "@/app/(auth)/components/SignUpForm";
import { AuthState } from "@/constants/interfaces";
import Logo from "@assets/images/logo.svg";

export default function Login() {
  const [authState, setAuthState] = useState<AuthState>("login");

  const renderForm = () => {
    switch (authState) {
      case "forgot-password":
        return (
          <ForgotPasswordForm
            onSwitch={() => setAuthState("login")}
            onStateChange={setAuthState}
          />
        );
      case "signup":
        return (
          <SignupForm
            onSwitch={() => setAuthState("login")}
            onStateChange={setAuthState}
          />
        );
      default:
        return (
          <LoginForm
            onSwitchToSignup={() => setAuthState("signup")}
            onSwitchToForgotPassword={() => setAuthState("forgot-password")}
          />
        );
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-black">
      {/* Left side - Auth Form */}
      <div className="flex-1 relative flex items-center justify-center p-8100">
        {/* Background Image (visible on mobile, hidden on desktop) */}
        <div className="absolute inset-0 z-0 lg:hidden">
          <Image
            src="/images/banner.png"
            alt="Background"
            fill
            sizes="100%"
            className="object-cover opacity-30"
            priority
          />
        </div>

        <div className="w-full max-w-[420px] space-y-8 z-10">
          {/* Logo */}
          <div className="flex justify-center lg:justify-start lg:mb-20">
            <Image
              src={Logo}
              alt="Logo"
              width={200}
              height={40}
              className="text-white w-auto h-auto"
              priority
            />
          </div>

          {renderForm()}
        </div>
      </div>

      {/* Right side - Image (hidden on mobile, visible on desktop) */}
      <div className="hidden lg:block flex-1 p-8">
        <div className="w-full">
          <Image
            src="/images/banner.png"
            width={100}
            height={100}
            alt="Hero"
            className="w-full object-cover"
            unoptimized
          />
        </div>
      </div>
    </div>
  );
}
