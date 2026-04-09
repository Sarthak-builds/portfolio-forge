import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/query-provider";
import { AppShell } from "@/components/layout/app-shell";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio Forge",
  description: "Create and rank developer portfolios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          <AppShell>
            {children}
            <Toaster richColors position="top-center" theme="dark" />
          </AppShell>
        </Providers>
      </body>
    </html>
  );
}
