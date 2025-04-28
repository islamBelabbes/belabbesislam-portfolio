import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";

import "./globals.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Belabbes Islam",
  description: "A personal portfolio of a web developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.JSX.Element[] | React.JSX.Element;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div id="modal"></div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
