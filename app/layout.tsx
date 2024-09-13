import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavigationMenu from "@/components/custom/NavigationMenu";
import SmoothScrolling from "@/components/custom/SmoothScroll";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smashe",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={`${inter.className} overflow-x-hidden`}>
          {/* <SmoothScrolling> */}
          {children}
          {/* </SmoothScrolling> */}
          <NavigationMenu />
          <Toaster />
        </body>
      </html>
  );
}
