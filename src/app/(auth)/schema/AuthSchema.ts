import { z } from "zod";

export const signInSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(6, "Password must contain at least one uppercase letter, one number, and be at least 8 characters long."),
});

export const signUpSchema = z.object({
    firstName: z.string().min(1, "Please fill your name."),
    lastName: z.string().min(1, "Please fill your name."),
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(6, "Password must contain at least one uppercase letter, one number, and be at least 8 characters long."),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
});

export type SignInType = z.infer<typeof signInSchema>;
export type SignUpType = z.infer<typeof signUpSchema>;
export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
