import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import { poppins } from "@/config/fonts";
import { Toaster } from "react-hot-toast";
import UserLayout from "@/components/user/layout/layout";

export const metadata: Metadata = {
  title: "Filinvest | Official Website ",
  description: "We Build the Filipino Dream",
  icons: {
    icon: "/images/favicon.ico",
  },
};
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = "User";
  console.log()

  return (
    <html lang="en">
      <head />
      <body className={`min-h-screen antialiased ${poppins.className}`}>
        <Providers>
          <Toaster position="top-right" />
          {role == "User" ? (
            <UserLayout>{children}</UserLayout>
          ) : (
            <>{children}</>
          )}
        </Providers>
      </body>
    </html>
  );
}
