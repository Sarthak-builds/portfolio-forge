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
  title: {
    default: "Portfolio Forge | Discover & Rank Developer Portfolios",
    template: "%s | Portfolio Forge"
  },
  description: "The definitive stage for designers and developers to showcase their best work, get rated by the community, and climb the global leaderboard.",
  keywords: ["developer portfolio", "design inspiration", "portfolio ranking", "showcase work", "web design", "frontend development"],
  authors: [{ name: "Sarthakbuilds" }],
  creator: "Sarthakbuilds",
  metadataBase: new URL("https://portfolio-forge.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-forge.com",
    title: "Portfolio Forge | Discover & Rank Developer Portfolios",
    description: "Submit your masterpiece, enter the arena, and climb the global leaderboard.",
    siteName: "Portfolio Forge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Portfolio Forge - The Arena for Developers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio Forge | Discover & Rank Developer Portfolios",
    description: "The definitive stage for designers and developers to showcase their best work.",
    creator: "@Sarthakbuilds",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
