import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { Toaster } from "react-hot-toast";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Compontae Website",
  description: "Compontae adalah sebuah product compos dari limbah rumah tangga",
};

export default function RootLayout({
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <Navbar />
          <main className="w-full">{children}</main>
          <Toaster position="bottom-right" reverseOrder={false} />
      </body>
    </html>
  );
}
