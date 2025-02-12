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
      <head>
        <meta name="description" content="hustly.space" />
        <link rel="icon" href="/logo-icon.svg" type="image/svg" />
        <meta property="og:title" content="hustly.space" />
        <meta property="og:description" content="hustly.space" />
        <meta property="og:image" content="/logo-icon.svg" />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
