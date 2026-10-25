import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Layout3D } from "@/components/dom/Layout3D";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "R3F baked light demo",
  description: "Next.js + React Three Fiber template: baked light with real-time shading.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <Layout3D>{children}</Layout3D>
      </body>
    </html>
  );
}
