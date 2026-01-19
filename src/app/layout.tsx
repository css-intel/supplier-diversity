import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FedMatch | Government Contractor Matchmaking Platform",
    template: "%s | FedMatch",
  },
  description: "Connect contractors with government procurement opportunities. Find teaming partners, browse RFPs, and grow your government contracting business.",
  keywords: ["government contracting", "procurement", "NAICS", "small business", "DBE", "MBE", "teaming", "RFP"],
  authors: [{ name: "FedMatch" }],
  openGraph: {
    title: "FedMatch | Government Contractor Matchmaking Platform",
    description: "Connect contractors with government procurement opportunities.",
    url: "https://supcourt.netlify.app",
    siteName: "FedMatch",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FedMatch | Government Contractor Matchmaking Platform",
    description: "Connect contractors with government procurement opportunities.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
