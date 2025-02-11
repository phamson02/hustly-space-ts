import type { Metadata } from "next";
import "@/styles/globals.scss";
import QueryProvider from "@/components/provider/QueryProvider";

export const metadata: Metadata = {
  title: "hustly.space",
  description: "hustly.space",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
