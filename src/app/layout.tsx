import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Providers } from "@/providers/query-provider";
import { AppShell } from "@/components/layout/app-shell";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { SmoothScroll } from "@/components/layout/smooth-scroll";

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Providers>
            <SmoothScroll>
              <AppShell>
                {children}
                <Toaster richColors position="top-center" />
              </AppShell>
            </SmoothScroll>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
