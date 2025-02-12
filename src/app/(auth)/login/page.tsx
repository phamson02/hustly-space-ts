"use client";

import { useState } from "react";
import SignIn from "@/app/(auth)/components/SignIn";

type AuthStep = "sign-in" | "sign-up" | "forgot-password";

export default function Login() {
  const [authStep, setAuthStep] = useState<AuthStep>("sign-in");

  return (
    <div className="lg:w-1/2 h-full flex flex-col justify-center">
      {authStep === "sign-in" && <SignIn />}
    </div>
  );
}
