import * as React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Bricolage_Grotesque } from "next/font/google";

const bricolage = Bricolage_Grotesque({
  display: "auto",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["cyrillic-ext"],
});

export const metadata: Metadata = {
  title: "Onit",
  description: "✨ Your AI Project Manager ✨",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bricolage.className}>{children}</body>
    </html>
  );
}
