"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/app/auth/components/auth-button";
import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "next-themes";
import { 
  ArrowRight, 
  Sparkles, 
  Code2, 
  Cpu, 
  TrendingUp,
  Flame,
  Zap,
  Layout,
  MessageSquareText,
  Users,
  Twitter,
  Heart,
  Globe,
  Trophy,
  Menu
} from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetTitle,
  SheetDescription 
} from "@/components/ui/sheet";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, setCredentials } = useAuthStore();
  const { scrollYProgress } = useScroll();
  const { theme, resolvedTheme } = useTheme();
  const router = useRouter();
  
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.2], [20, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Handle OAuth token from URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      const verifyAndLogin = async () => {
        try {
          // Verify token and get user profile
          const res = await apiClient.get("auth/me", {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          const user = res.data;
          console.log("OAuth Login Success:", user);
          
          // Save credentials to store (local storage)
          setCredentials(user, token);
          
          // Clean URL
          window.history.replaceState({}, document.title, window.location.pathname);
          
          toast.success("Welcome back, " + (user.name || "Architect") + "!");
          
          // Redirect to dashboard
          router.push("/dashboard");
        } catch (err: any) {
          console.error("OAuth Verification Failed Detail:", err.response?.data || err.message);
          toast.error("Authentication failed. Please try again.");
        }
      };
      verifyAndLogin();
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, [setCredentials]);

  const features = [
    {
      id: 1,
      title: "The Arena (Swipe-to-Rate)",
      description: "The heart of discovery. A high-speed, gesture-based interface where users can swipe through portfolios. Give a quick star rating or a 'Super-Vote' to the ones that truly stand out.",
      icon: Layout,
      comingSoon: false,
      gridClass: "sm:col-span-2 md:col-span-2 lg:col-span-2 md:row-span-1"
    },
    {
      id: 2,
      title: "Forge Rank",
      description: "Your position on the global leaderboard isn't just based on likes. Our algorithm calculates your Forge Score by weighing ratings, engagement, and trend velocity.",
      icon: TrendingUp,
      comingSoon: false,
      gridClass: "sm:col-span-1 md:col-span-1 md:row-span-2"
    },
    {
      id: 3,
      title: "Heatmaps",
      description: "See exactly where your portfolio shines. Get visual feedback on which projects are getting the most 'clicks' and 'highest ratings'.",
      icon: Flame,
      comingSoon: false,
      gridClass: "sm:col-span-1 md:col-span-1 md:row-span-1"
    },
    {
      id: 4,
      title: "The Gauntlet",
      description: "Every week, a new category goes live. Top performers earn exclusive profile badges and a permanent boost to their global ranking.",
      icon: Zap,
      comingSoon: true,
      gridClass: "sm:col-span-1 md:col-span-1 md:row-span-1"
    },
    {
      id: 5,
      title: "Peer-Review",
      description: "Move beyond 'Looks great!' with structured feedback. Users can leave 'Scraps'—short, constructive notes categorized by UI, UX, or Tech Stack.",
      icon: MessageSquareText,
      comingSoon: true,
      gridClass: "sm:col-span-1 md:col-span-1 md:row-span-1"
    },
    {
      id: 6,
      title: "Recruiter God Mode",
      description: "A specialized view for hiring managers. Filter the leaderboard by specific tech stacks to find proven, community-vetted talent.",
      icon: Users,
      comingSoon: true,
      gridClass: "sm:col-span-2 md:col-span-1 md:row-span-1"
    }
  ];

  const steps = [
    {
      number: "1",
      icon: Layout,
      title: "Submit your Masterpiece",
      description: "Link your live portfolio. Our engine scrapes the metadata and generates a high-fidelity preview."
    },
    {
      number: "2",
      icon: Zap,
      title: "Enter the Arena",
      description: "Get discovered in the swipe-to-rate feed. Collect ratings and feedback from top-tier designers."
    },
    {
      number: "3",
      icon: Trophy,
      title: "Climb the Forge",
      description: "Watch your Forge Score grow as you gain momentum. Break into the top 100 and claim your spot."
    }
  ];

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans selection:bg-accent/30 selection:text-accent-foreground overflow-x-hidden">
      
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-12">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer shrink-0">
            <div className="h-10 w-10 rounded-lg bg-foreground flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
              <span className="text-background font-black text-xs">PF</span>
            </div>
            <span className="text-sm font-medium tracking-tight uppercase whitespace-nowrap hidden sm:block">Portfolio Forge</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em]">
            <Link href="/dashboard" className="px-4 py-2 rounded-lg hover:border-accent hover:border-1  transition-all duration-300">Dashboard</Link>
            <Link href="/explore" className="px-4 py-2 rounded-lg hover:border-accent hover:border-1 transition-all duration-300">Explore</Link>
            <Link href="/leaderboard" className="px-4 py-2 rounded-lg hover:border-accent hover:border-1  transition-all duration-300">Leaderboard</Link>
          </nav>
          
          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />
            <div className="hidden sm:block h-6 w-[1px] bg-border mx-1" />
            <div className="hidden sm:block">
              <AuthButton />
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full bg-background border-none p-0 flex flex-col text-foreground">
                  <div className="flex flex-col h-full px-8 pt-20 pb-12">
                    <nav className="flex flex-col gap-8">
                      <Link 
                        href="/dashboard" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-3xl font-light tracking-tighter hover:text-accent transition-colors"
                      >
                        Dashboard
                      </Link>
                      
                      <Link 
                        href="/explore" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-3xl font-light tracking-tighter hover:text-accent transition-colors"
                      >
                        Explore
                      </Link>
                      <Link 
                        href="/leaderboard" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-3xl font-light tracking-tighter hover:text-accent transition-colors"
                      >
                        Leaderboard
                      </Link>
                      <Link 
                        href="/privacy" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-3xl font-light tracking-tighter hover:text-accent transition-colors"
                      >
                        Privacy
                      </Link>
                      <Link 
                        href="/terms" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-3xl font-light tracking-tighter hover:text-accent transition-colors"
                      >
                        Terms
                      </Link>
                    </nav>

                    <div className="mt-auto flex flex-col gap-8">
                      <div className="flex flex-col gap-4">
                        <AuthButton />
                      </div>
                      
                    </div>
                  </div>
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <SheetDescription className="sr-only">Access platform pages and account settings</SheetDescription>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative w-full hero-bg min-h-[90vh] lg:min-h-screen flex flex-col items-center justify-start z-30">
          <div className="pt-24 md:pt-40 lg:pt-48 pb-64 md:pb-80 lg:pb-96 text-left max-w-7xl mx-auto flex flex-col items-start relative z-10 px-6 md:px-12 w-full">
            
            {/* Decorative Icons */}
            <motion.div 
              initial={{ opacity: 0, rotate: -10, x: 50 }}
              animate={{ opacity: 0.1, rotate: 12, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-10 right-12 hidden lg:block"
            >
              <Code2 className="w-20 h-20 text-foreground" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, rotate: 10, x: 70 }}
              animate={{ opacity: 0.08, rotate: -8, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute bottom-1/3 right-20 hidden lg:block"
            >
              <Cpu className="w-24 h-24 text-foreground" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-[10px] md:text-[12px] font-medium uppercase tracking-[0.1em] text-accent mb-6 md:mb-10 shadow-sm self-start"
            >
              <Sparkles className="w-4 h-4" />
              place to flaunt your portfolio
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-7xl tracking-tighter mb-4 md:mb-8 leading-[1] md:leading-[1] dark:text-foreground text-[#000000] max-w-4xl text-left"
            >
              Where High-End <br className="hidden sm:block" />
              Portfolios Compete <br className="hidden sm:block" />
              for the <span className="text-accent">Crown</span>.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-xl text-muted-foreground font-medium text-sm md:text-lg md:leading-relaxed mb-8 md:mb-12 text-left"
            >
              Showcase your best work, get rated by the community, and climb the global leaderboard. The definitive stage for designers and developers.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-row gap-4 md:gap-6 w-auto md:mb-12 self-start"
            >
              <Link href={isAuthenticated ? "/dashboard" : "/auth"} className="relative group">
                <Button size="lg" className="relative h-9 md:h-12 px-6 md:px-8 rounded-xl bg-accent text-accent-foreground hover:opacity-90 font-bold text-xs md:text-sm transition-all active:scale-95 shadow-md shadow-accent/20">
                  Join the Forge
                </Button>
              </Link>
              <Link href="/leaderboard" className="relative group">
                <Button size="lg" variant="outline" className="relative h-9 md:h-12 px-6 md:px-8 rounded-xl border-border bg-background/50 backdrop-blur-sm hover:bg-muted text-foreground font-bold text-xs md:text-sm transition-all active:scale-95">
                  Leaderboard
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Scroll-Animated Live Preview Mockup */}
          <div className="absolute bottom-35 md:bottom-0 left-1/2 -translate-x-1/2 w-[90%] md:w-full max-w-5xl px-0 md:px-6 translate-y-1/2 pointer-events-none z-50">
            <motion.div 
              style={{ 
                scale: isMobile ? 1 : scale, 
                rotateX: isMobile ? 0 : rotateX, 
                opacity: isMobile ? 1 : opacity,
                perspective: "1000px"
              }}
              className="relative p-1.5 md:p-2 rounded-2xl md:rounded-3xl bg-muted/40 border border-border/50 backdrop-blur-xl shadow-2xl overflow-hidden pointer-events-auto"
            >
              <div className="relative rounded-xl md:rounded-2xl bg-card border border-border aspect-[16/10] overflow-hidden shadow-inner flex flex-col pointer-events-auto">
                {/* Browser Header */}
                <div className="h-8 md:h-10 border-b border-border bg-muted/20 flex items-center justify-between px-3 md:px-5">
                  <div className="flex items-center gap-1 md:gap-1.5">
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-400/20 border border-red-400/40" />
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-amber-400/20 border border-amber-400/40" />
                    <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-400/20 border border-emerald-400/40" />
                  </div>
                  <div className="flex-1 max-w-[120px] md:max-w-sm mx-auto h-5 md:h-6 bg-muted/30 rounded-full flex items-center px-2 md:px-3 border border-border/50">
                    <span className="text-[8px] md:text-[10px] text-muted-foreground truncate opacity-50">portfolio-forge.com/explore</span>
                  </div>
                </div>
                
                {/* Hero Preview Image */}
                <div className="flex-1 bg-background overflow-hidden relative">
                   <img 
                      src={ "/heropreview.png"} 
                      alt="Portfolio Forge Preview" 
                      className="w-full h-full object-cover object-top animate-in fade-in duration-700"
                   />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Spacer for the Mockup overlap */}
        <div className="h-48 sm:h-64 md:h-96" />

        {/* Features Section - Bento Grid Style */}
        <section className="-mt-30 md:pt-24 pb-14 px-6 container mx-auto relative z-10">
          <div className="text-center mb-12 md:mb-20">
             <h2 className="text-3xl md:text-6xl tracking-tighter mb-3 flex flex-wrap items-center justify-center gap-2 md:gap-4">
                <span className="text-accent font-mono text-2xl md:text-5xl">&lt;&gt;</span>
                Built for the Elite
                <span className="text-accent font-mono text-2xl md:text-5xl">&lt;/&gt;</span>
             </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-auto lg:auto-rows-[260px]">
            {features.map((feature) => (
              <motion.div 
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-8 flex flex-col justify-between transition-all hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 bg-accent/5",
                  feature.gridClass
                )}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-8 md:w-12 md:h-10 rounded-xl md:rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                      <feature.icon className="w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    {feature.comingSoon && (
                      <span className="px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-muted text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground">Coming Soon</span>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-medium tracking-tight mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground font-medium text-xs md:text-sm leading-relaxed group-hover:line-clamp-none transition-all duration-500">
                    {feature.description}
                  </p>
                </div>
                
                <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                   <feature.icon className="w-32 h-32 md:w-40 md:h-40" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 md:py-24 bg-background relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-12 md:mb-24">
               <h2 className="text-3xl md:text-5xl tracking-tighter mb-1 uppercase">How it works</h2>
               <div className="h-1.5 w-16 md:w-20 bg-accent mx-auto rounded-full mb-5" />
               <p className="text-muted-foreground font-medium max-w-2xl mx-auto text-base md:text-lg">Three steps to global recognition. No fluff, just craft.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 relative max-w-6xl mx-auto">
              {/* Dashed Connecting Lines (Desktop) */}
              <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] -z-0">
                <svg width="100%" height="2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="12 12" className="text-accent/30" />
                </svg>
              </div>
              
              {steps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="flex flex-col items-center text-center group relative z-10"
                >
                  {/* Icon Circle Container */}
                  <div className="relative mb-6 md:mb-10">
                    {/* Step Number Badge */}
                    <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-black text-[10px] md:text-sm shadow-lg z-20">
                      {step.number}
                    </div>
                    
                    {/* Large Icon Circle */}
                    <div className="w-[80px] h-[80px] md:w-[120px] md:h-[120px] rounded-full bg-card border border-border flex items-center justify-center shadow-xl group-hover:border-accent group-hover:shadow-accent/10 transition-all duration-500 relative overflow-hidden">
                      <step.icon className="w-8 h-8 md:w-10 md:h-10 text-accent group-hover:scale-110 transition-transform duration-500" />
                      
                      {/* Subtle Inner Glow */}
                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-xl md:text-2xl font-medium tracking-tight">{step.title}</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed text-xs md:text-sm max-w-[240px] md:max-w-[280px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] text-[#F5F5F5] pt-16 md:pt-24 pb-8 md:pb-12 px-6 border-t border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-16 md:mb-20">
            {/* Column 1: Brand Info */}
            <div className="col-span-2 lg:col-span-1 space-y-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-white flex items-center justify-center">
                  <span className="text-black font-black text-xs">PF</span>
                </div>
                <span className="text-xl font-black tracking-tighter uppercase">Portfolio Forge</span>
              </Link>
              <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-xs">
                The definitive stage for designers and developers to showcase their best work, get rated, and climb the global leaderboard.
              </p>
              <div className="flex gap-3">
                 <Link href="https://x.com/Sarthakbuilds" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group">
                    <Twitter className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                 </Link>
                 <Link href="https://Sarthakbuilds.in" target="_blank" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-accent hover:border-accent transition-all group">
                    <Globe className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                 </Link>
              </div>
            </div>
            
            {/* Column 2: Platform Links */}
            <div className="space-y-4 md:space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Platform</h4>
              <ul className="space-y-3 md:space-y-4 text-sm font-medium text-muted-foreground">
                <li><Link href="/explore" className="hover:text-white transition-colors">Explore Arena</Link></li>
                <li><Link href="/leaderboard" className="hover:text-white transition-colors">Global Rankings</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">User Dashboard</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Submit Portfolio</Link></li>
              </ul>
            </div>

            {/* Column 3: Community Links */}
            <div className="space-y-4 md:space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Community</h4>
              <ul className="space-y-3 md:space-y-4 text-sm font-medium text-muted-foreground">
                <li><Link href="#" className="hover:text-white transition-colors">The Gauntlet</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Peer Review Scraps</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Weekly Challenges</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Recruiter Mode</Link></li>
              </ul>
            </div>

            {/* Column 4: Support & Legal */}
            <div className="hidden lg:block space-y-4 md:space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Support</h4>
              <ul className="space-y-3 md:space-y-4 text-sm font-medium text-muted-foreground">
                <li><Link href="mailto:sarthakshiroty20@gmail.com" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="mailto:sarthakshiroty20@gmail.com" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              © {new Date().getFullYear()} Portfolio Forge. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              Built with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by <Link href="https://Sarthakbuilds.in" target="_blank" className="text-white hover:text-accent underline decoration-accent/30 underline-offset-4 transition-colors">Sarthakbuilds.in</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
