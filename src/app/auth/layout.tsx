import { BackgroundBeams } from "@/components/ui/background-beams";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden bg-white dark:bg-zinc-950 transition-colors">
      <BackgroundBeams />
      <div className="relative z-10 w-full flex justify-center">
        {children}
      </div>
    </div>
  );
}
