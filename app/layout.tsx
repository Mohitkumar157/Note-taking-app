import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";


import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Note App",
  description: "Lets create a Note",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >
      <body className={`min-h-full flex  flex-col ${inter.className}`}>
      {children}
      <Toaster position="top-right" />
      </body>
    </html>
  );
}
