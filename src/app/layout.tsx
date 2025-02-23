import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link"; // Import Link for navigation
import "./globals.css";
import Logo from "../../src/assets/LogoEmailIQ.png"

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
        {/* Navigation Bar */}
<nav className="p-4 bg-blue-600 text-white flex items-center justify-between">
  <div className="flex items-center"> {/* Group logo and title */}
    <img src={Logo.src} alt="EmailIQ Logo" className="h-8 mr-2" /> {/* Reduced right margin */}
    <h1 className="text-lg font-bold">Email Organizer</h1>
  </div>
  <div>
    <Link href="/" className="mr-4 hover:underline">Home</Link>
    <Link href="/dashboard" className="mr-4 hover:underline">Dashboard</Link>
    <Link href="/settings" className="hover:underline">Settings</Link>
  </div>
</nav>

        {/* Main Content */}
        <main className="p-6">{children}</main>

        {/* Footer */}
        <footer className="p-4 text-center text-gray-500">
          © 2025 Email Organizer. All JoeRights Reserved.
        </footer>
      </body>
    </html>
  );
}
