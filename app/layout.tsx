import Layout from "@/components/globals/layout";
import { poppins } from "@/config/fonts";
import "@/styles/globals.css";
import { get as getCookies } from "@/utils/auth";
import { Metadata, Viewport } from "next";
import { Toaster } from "react-hot-toast";
import { Providers } from "./providers";

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

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const { record: cookies } = await getCookies();

  return (
    <html lang="en">
      <head />
      <body className={`min-h-screen antialiased ${poppins.className}`}>
        <Providers>
          <Toaster position="top-right" />
          <Layout isLoggedIn={cookies.isLoggedIn}>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
