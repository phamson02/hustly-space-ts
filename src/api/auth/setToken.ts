import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { token } = await req.json();

    const response = NextResponse.json({ message: "Token set" });

    response.cookies.delete("accessToken");

    response.cookies.set("accessToken", token, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24 * 365,
    });

    return response;
}