import type { Metadata } from "next";
import { Roboto, Playfair, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/app/navbar";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app/sidebar"

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const playfair = Playfair({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Illceramics",
  description: "Ecommerce ceramic shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${playfair.variable} ${playfairDisplay.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar/>
            <main className="grid grid-cols-3 relative">
              <Navbar className="col-span-3"/>
              {children}
            </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
