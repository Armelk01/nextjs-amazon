import { Geist, Geist_Mono } from "next/font/google";
import { APP_DESCRIPTION, APP_NAME, APP_SLOGAN } from "@/lib/constants";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Metadata } from "next";
import ClientProviders from "@/components/shared/client-providers";
import { Toaster } from "sonner";
export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: `${APP_NAME}. ${APP_SLOGAN}`,
  },
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <ClientProviders>{children}</ClientProviders>
          <Toaster richColors /> {/* Ajoutez cette ligne */}
          
      </body>
    </html>
  );
}
