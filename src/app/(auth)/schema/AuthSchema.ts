import { z } from "zod";

export const signInSchema = z.object({
    username: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
});

export const signUpSchema = z.object({
    firstName: z.string().min(1, "Please fill your name."),
    lastName: z.string().min(1, "Please fill your name."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string()
        .min(8, "Password must be at least 8 characters long.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
});

export const resetPasswordSchema = z.object({
    old_password: z.string().min(8, "Password must be at least 8 characters long."),
    new_password: z.string()
        .min(8, "Password must be at least 8 characters long.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
});

export const verifyEmailSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    code: z.string().min(1, "Verification code is required"),
});

export const changePasswordSchema = z.object({
    old_password: z.string().min(8, "Password must be at least 8 characters long."),
    new_password: z.string()
        .min(8, "Password must be at least 8 characters long.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
});

// Export types
export type SignInType = z.infer<typeof signInSchema>;
export type SignUpType = z.infer<typeof signUpSchema>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailType = z.infer<typeof verifyEmailSchema>;
export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
