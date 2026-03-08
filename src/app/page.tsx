import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white text-zinc-950 relative w-full overflow-hidden">
      <BackgroundBeams />
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter">Portfolio Forge</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
            <Link href="#explore" className="hover:text-zinc-950 transition-colors">Explore</Link>
            <Link href="#leaderboard" className="hover:text-zinc-950 transition-colors">Leaderboard</Link>
            <Link href="#about" className="hover:text-zinc-950 transition-colors">Community</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/sign-in">
              <Button variant="ghost" className="hidden sm:inline-flex text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100">
                Log in
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button className="bg-zinc-950 text-white hover:bg-zinc-800 shadow-sm rounded-full px-6">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4 text-center relative z-10">
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm font-medium text-zinc-600 mb-4 transition-colors hover:bg-zinc-100 cursor-pointer">
            ✨ The Gamified Ecosystem for Creative Professionals
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight lg:leading-[1.1] text-zinc-950">
            Showcase your work. <br className="hidden md:inline" />
            <span className="text-zinc-400">Discover inspiration.</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-zinc-500 sm:text-xl sm:leading-8 mx-auto font-medium">
            Revolutionize how you share your portfolio with swipe-based discovery. Receive community-driven ratings, get rich feedback, and climb the global leaderboards based on engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link href="/sign-up">
              <Button size="lg" className="bg-zinc-950 text-white hover:bg-zinc-800 shadow-sm rounded-full px-8 text-base">
                Join the Community
              </Button>
            </Link>
            <Link href="#explore">
              <Button size="lg" variant="outline" className="rounded-full px-8 text-base border-zinc-200 text-zinc-700 hover:bg-zinc-50">
                Start Swiping
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Preview or Graphic placeholder */}
        <div className="mt-20 w-full max-w-5xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-zinc-200 to-zinc-100 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative rounded-2xl border border-zinc-200 bg-white p-2 shadow-2xl">
            <div className="rounded-xl border border-zinc-100 bg-zinc-50 aspect-video flex items-center justify-center overflow-hidden">
              <p className="text-zinc-400 font-medium text-lg">Swipe-Style Discovery Feed Preview</p>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="border-t border-zinc-100 mt-20 py-8 text-center text-sm text-zinc-500 relative z-10">
        <p>© {new Date().getFullYear()} Portfolio Forge</p>
      </footer>
    </div>
  );
}
