import { BackgroundBeams } from "@/components/ui/background-beams";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark min-h-screen w-full flex bg-zinc-950 transition-colors">
      <div className="relative flex-1 flex flex-col items-center justify-center p-4 lg:p-8 overflow-hidden">
        <BackgroundBeams />
        <div className="relative z-10 w-full max-w-md">
          <div className="mb-8 flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <span className="text-xl font-bold text-zinc-50 tracking-tight">Portfolio Forge</span>
          </div>
          {children}
        </div>
      </div>
      
      <div className="hidden lg:block relative flex-1 overflow-hidden">
        <Image
          src="/greenbg.jpg"
          alt="Authentication background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/20" />
        <div className="absolute bottom-12 left-12 right-12 z-20">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white tracking-tight leading-tight">
              Design your future, <br />
              <span className="text-emerald-400">one portfolio at a time.</span>
            </h2>
            <p className="text-zinc-300 text-lg max-w-md">
              Join thousands of creators who are building their professional presence with our intuitive platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
