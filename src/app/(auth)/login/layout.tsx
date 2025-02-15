import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "hustly.space | Login",
  description: "hustly.space | Login",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-screen h-screen bg-black overflow-hidden">{children}</div>;
}
