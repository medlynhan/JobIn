import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import "./globals.css";


const inter = Inter({
  variable: "--font-inter", 
  subsets: ["latin"],      
});

export const metadata: Metadata = {
  title: "JobIn",            
  description: "JobIn adalah web app inklusif untuk pekerja informal di Indonesia. Cari kerja, apply, dan belajar skill baru dengan AI voice assistant, meski internet lemah.", 
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
