import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "Create Next App",
   description: "Generated by create next app",
};

interface LayoutRootProps {
   children: React.ReactNode;
}

function LayoutRoot({ children }: LayoutRootProps) {
   return (
      <html lang="pt-BR">
         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <Link data-testid="home-link" href={"/"}>
               Home
            </Link>
            {children}
         </body>
      </html>
   );
}

export default LayoutRoot;