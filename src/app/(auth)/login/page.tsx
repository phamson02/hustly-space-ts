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
    <div className="flex h-full">
      <div className="flex-1 relative flex items-center justify-center p-8">
        <div className="absolute inset-0 z-0 lg:hidden">
          <Image
            src="/images/banner.png"
            alt="Background"
            width={200}
            height={40}
            className="object-cover opacity-50 w-screen h-screen"
            priority
            unoptimized
          />
        </div>

        <div className="w-full max-w-[420px] space-y-8 z-10">
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

      <div className="lg:flex-1 hidden lg:flex lg:flex-col lg:justify-center lg:items-center p-8">
        <Image
          src="/images/banner.png"
          width={100}
          height={100}
          alt="Hero"
          className="h-full w-full rounded-2xl object-cover"
          unoptimized
        />
      </div>
    </div>
  );
}
