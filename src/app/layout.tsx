import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Logo from "../../src/assets/LogoEmailIQ.png";
import UserIcon from "../assets/images/userIcon.png";
import SearchIcon from "../assets/images/search-icon.png";
import SearchBar from "./searchBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Email Organizer",
  description: "Organize your emails efficiently",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <video
          autoPlay
          loop
          muted
          className="fixed w-screen h-screen object-cover z-0"
        >
          <source src="/BgVideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <nav className="p-4 bg-transparent text-white fixed top-0 left-0 w-full z-50 flex items-center justify-between backdrop-blur-sm">
          <div className="flex items-center">
            <img src={Logo.src} alt="EmailIQ Logo" className="h-8 mr-4" />
            <h1 className="text-lg font-bold">Email Organizer</h1>
            <SearchBar />
          </div>
          <div className="flex items-center">
            <Link href="/" className="ml-2 mr-4 hover:underline">Home</Link>
            <Link href="/dashboard" className="mr-4 hover:underline">Dashboard</Link>
            <Link href="/settings" className="hover:underline">Settings</Link>
            <img src={UserIcon.src} alt="User Icon" className="h-8 ml-2" />
          </div>
        </nav>
        <main className="pt-[60px]">{children}</main>
        <footer className="p-4 text-center text-black bg-transparent fixed bottom-0 left-0 w-full z-50">
          © 2025 Email Organizer. All JoeRights Reserved.
        </footer>
      </body>
    </html>
  );
}