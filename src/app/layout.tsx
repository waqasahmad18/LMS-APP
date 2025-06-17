import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientNavbar from "../components/ClientNavbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../components/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple LMS",
  description: "A simple Learning Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ClientNavbar />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
