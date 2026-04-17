"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/app/auth/components/auth-button";
import { useAuthStore } from "@/app/auth/lib/useAuthstore";
import { ThemeToggle } from "@/components/theme-toggle";
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
  Star,
  Trophy
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { scrollYProgress } = useScroll();
  
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.2], [20, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      id: 1,
      title: "The Arena (Swipe-to-Rate)",
      description: "The heart of discovery. A high-speed, gesture-based interface where users can swipe through portfolios. Give a quick star rating or a 'Super-Vote' to the ones that truly stand out. It turns the boring task of browsing portfolios into a game.",
      icon: Layout,
      comingSoon: false,
      gridClass: "md:col-span-2 md:row-span-1"
    },
    {
      id: 2,
      title: "Dynamic Forge Rank",
      description: "Your position on the global leaderboard isn't just based on likes. Our algorithm calculates your Forge Score by weighing average ratings, community engagement, and 'trend velocity'—ensuring fresh talent always has a chance to dethrone the veterans.",
      icon: TrendingUp,
      comingSoon: false,
      gridClass: "md:col-span-1 md:row-span-2"
    },
    {
      id: 3,
      title: "Real-Time Heatmaps",
      description: "See exactly where your portfolio shines. Get visual feedback on which projects are getting the most 'clicks' and 'highest ratings,' allowing you to iterate and improve your presentation based on actual community data.",
      icon: Flame,
      comingSoon: false,
      gridClass: "md:col-span-1 md:row-span-1"
    },
    {
      id: 4,
      title: "The Gauntlet",
      description: "Every week, a new category (e.g., “Best Minimalist Design” or “Dark Mode Masters”) goes live. Top performers earn exclusive profile badges and a permanent boost to their global ranking.",
      icon: Zap,
      comingSoon: true,
      gridClass: "md:col-span-1 md:row-span-1"
    },
    {
      id: 5,
      title: "Peer-Review Scraps",
      description: "Move beyond 'Looks great!' with structured feedback. Users can leave 'Scraps'—short, constructive notes categorized by UI, UX, Tech Stack, or Storytelling—giving you actionable insights from fellow professionals.",
      icon: MessageSquareText,
      comingSoon: true,
      gridClass: "md:col-span-1 md:row-span-1"
    },
    {
      id: 6,
      title: "Recruiter God Mode",
      description: "A specialized view for hiring managers and founders. They can filter the leaderboard by specific tech stacks or rating tiers to find proven, community-vetted talent without digging through thousands of static resumes.",
      icon: Users,
      comingSoon: true,
      gridClass: "md:col-span-1 md:row-span-1"
    }
  ];

  const steps = [
    {
      number: "1",
      icon: Layout,
      title: "Submit your Masterpiece",
      description: "Link your live portfolio. Our engine scrapes the metadata and generates a high-fidelity preview for the community to witness."
    },
    {
      number: "2",
      icon: Zap,
      title: "Enter the Arena",
      description: "Get discovered in the swipe-to-rate feed. Collect ratings and feedback from top-tier designers and developers worldwide."
    },
    {
      number: "3",
      icon: Trophy,
      title: "Climb the Forge",
      description: "Watch your Forge Score grow as you gain momentum. Break into the top 100 and claim your spot among the elite."
    }
  ];

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans selection:bg-accent/30 selection:text-accent-foreground overflow-x-hidden">
      
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6 md:px-12">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="h-10 w-10 rounded-lg bg-foreground flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg">
              <span className="text-background font-black text-xs">PF</span>
            </div>
            <span className="text-sm font-medium tracking-tight uppercase whitespace-nowrap hidden sm:block">Portfolio Forge</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.2em]">
            <Link href="/explore" className="px-4 py-2 rounded-lg hover:border-accent hover:border-1 transition-all duration-300">Explore</Link>
            <Link href="/leaderboard" className="px-4 py-2 rounded-lg hover:border-accent hover:border-1  transition-all duration-300">Leaderboard</Link>
            <Link href="/dashboard" className="px-4 py-2 rounded-lg hover:border-accent hover:border-1  transition-all duration-300">Dashboard</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="h-6 w-[1px] bg-border mx-1" />
            <AuthButton />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative w-full hero-bg min-h-[90vh] flex flex-col items-center justify-start z-20">
          <div className="pt-40 pb-120 text-left max-w-7xl mx-auto flex flex-col items-start relative z-10 px-6 md:px-12 w-full">
            
            {/* Smaller SVGs on the far right */}
            <motion.div 
              initial={{ opacity: 0, rotate: -10, x: 50 }}
              animate={{ opacity: 0.1, rotate: 12, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute top-1 left-4 md:right-12 hidden lg:block"
            >
              <Code2 className="w-20 h-20 text-foreground" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, rotate: 10, x: 70 }}
              animate={{ opacity: 0.08, rotate: -8, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute bottom-1/3 right-8 md:right-20 hidden lg:block"
            >
              <Cpu className="w-24 h-24 text-foreground" />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-[12px] font-medium uppercase tracking-[0.1em] text-accent mb-10 inset-shadow-2xs"
            >
              <Sparkles className="w-4 h-4" />
              place to flaunt your portfolio
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-7xl  tracking-tighter mb-8 leading-[1] dark:text-foreground text-[#000000] max-w-3xl "
            >
              Where High-End <br />
              Portfolios Compete <br />
              for the <span className="text-accent">Crown</span>.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-xl text-muted-foreground font-medium text-sm md:text-lg md:leading-relaxed mb-12"
            >
              Showcase your best work, get rated by the community, and climb the global leaderboard. The definitive stage for designers and developers to see how they truly stack up.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link href={isAuthenticated ? "/dashboard" : "/auth"} className="relative group">
                <div className="absolute -inset-1 bg-accent/40 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
                <Button size="lg" className="relative h-12 px-8 rounded-xl bg-accent text-accent-foreground hover:opacity-90 font-medium text-sm transition-all active:scale-95 shadow-md shadow-accent/20">
                  Join the Forge
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/leaderboard" className="relative group">
                <div className="absolute -inset-1 bg-foreground/10 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
                <Button size="lg" variant="outline" className="relative h-12 px-8 rounded-xl border-border bg-background/50 backdrop-blur-sm hover:bg-muted text-foreground font-medium text-sm transition-all active:scale-95">
                  Explore the Leaderboard
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Scroll-Animated Live Preview Mockup */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl px-6 translate-y-1/2 pointer-events-none">
            <motion.div 
              style={{ 
                scale, 
                rotateX, 
                opacity,
                perspective: "1000px"
              }}
              className="relative p-2 rounded-3xl bg-muted/40 border border-border/50 backdrop-blur-xl shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden z-30"
            >
              <div className="relative rounded-2xl bg-card border border-border aspect-[16/10] overflow-hidden shadow-inner flex flex-col pointer-events-auto ">
                {/* Browser Header */}
                <div className="h-10 border-b border-border bg-muted/20 flex items-center justify-between px-5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/20 border border-red-400/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/20 border border-amber-400/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/20 border border-emerald-400/40" />
                  </div>
                  <div className="flex-1 max-w-sm mx-auto h-6 bg-muted/30 rounded-full flex items-center px-3 border border-border/50">
                    <span className="text-[10px] text-muted-foreground truncate opacity-50">portfolio-forge.com/showcase/sarthakbuilds</span>
                  </div>
                </div>
                
                {/* Simulated Content */}
                <div className="flex-1 bg-background p-8 flex flex-col gap-6">
                   <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-muted rounded-full" />
                        <div className="h-2 w-48 bg-muted/50 rounded-full" />
                      </div>
                      <div className="h-10 w-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                        <Star className="w-5 h-5 text-accent fill-accent" />
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-6 mt-4">
                      <div className="aspect-[4/3] bg-muted/30 rounded-2xl border border-border/50 p-4 flex items-end">
                         <div className="h-2 w-20 bg-muted rounded-full" />
                      </div>
                      <div className="aspect-[4/3] bg-muted/30 rounded-2xl border border-border/50 p-4 flex items-end">
                         <div className="h-2 w-24 bg-muted rounded-full" />
                      </div>
                   </div>
                   <div className="mt-auto flex items-center gap-4">
                      <div className="h-8 w-8 rounded-lg bg-muted" />
                      <div className="h-8 w-24 rounded-lg bg-muted" />
                      <div className="h-8 w-8 rounded-lg bg-muted ml-auto" />
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Spacer for the Mockup overlap */}
        <div className="h-64 md:h-96" />

        {/* Features Section - Bento Grid Style */}
        <section className="pt-24 pb-14 px-6 container mx-auto relative z-10">
          <div className="text-center mb-20">
             <h2 className="text-4xl md:text-6xl tracking-tighter mb-3 flex items-center justify-center gap-4">
                <span className="text-accent font-mono text-3xl md:text-5xl">&lt;&gt;</span>
                Built for the Elite
                <span className="text-accent font-mono text-3xl md:text-5xl">&lt;/&gt;</span>
             </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[260px]">
            {features.map((feature) => (
              <motion.div 
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                  "group relative overflow-hidden rounded-[2rem] border border-border bg-card p-8 flex flex-col justify-between transition-all hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 bg-accent/5",
                  feature.gridClass
                )}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-10 rounded-2xl bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    {feature.comingSoon && (
                      <span className="px-3 py-1 rounded-full bg-muted text-[9px] font-black uppercase tracking-widest text-muted-foreground">Coming Soon</span>
                    )}
                  </div>
                  <h3 className="text-xl font-normal tracking-tight mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground font-medium text-sm leading-relaxed  group-hover:line-clamp-none transition-all duration-500">
                    {feature.description}
                  </p>
                </div>
                
                <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                   <feature.icon className="w-40 h-40" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-24">
               <h2 className="text-4xl md:text-5xl tracking-tighter mb-1 uppercase">How it works</h2>
               <div className="h-1.5 w-20 bg-accent mx-auto rounded-full mb-5" />
               <p className="text-muted-foreground font-medium max-w-2xl mx-auto text-lg">Three steps to global recognition. No fluff, just craft.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative max-w-6xl mx-auto">
              {/* Dashed Connecting Lines (Desktop) */}
              <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] -z-0">
                <svg width="100%" height="2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="12 12" className="text-green-500" />
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
                  <div className="relative mb-10">
                    {/* Step Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-black text-sm shadow-lg z-20">
                      {step.number}
                    </div>
                    
                    {/* Large Icon Circle */}
                    <div className="w-[120px] h-[120px] rounded-full bg-card border border-border flex items-center justify-center shadow-xl group-hover:border-accent group-hover:shadow-accent/10 transition-all duration-500 relative overflow-hidden">
                      <step.icon className="w-10 h-10 text-accent group-hover:scale-110 transition-transform duration-500" />
                      
                      {/* Subtle Inner Glow */}
                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-medium tracking-tight">{step.title}</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed text-sm max-w-[280px] mx-auto">
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
      <footer className="bg-[#0A0A0A] text-[#F5F5F5] pt-24 pb-12 px-6 border-t border-white/5">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {/* Column 1: Brand Info */}
            <div className="space-y-6">
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
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Platform</h4>
              <ul className="space-y-4 text-sm font-bold text-muted-foreground">
                <li><Link href="/explore" className="hover:text-white transition-colors">Explore Arena</Link></li>
                <li><Link href="/leaderboard" className="hover:text-white transition-colors">Global Rankings</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">User Dashboard</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Submit Portfolio</Link></li>
              </ul>
            </div>

            {/* Column 3: Community Links */}
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Community</h4>
              <ul className="space-y-4 text-sm font-bold text-muted-foreground">
                <li><Link href="#" className="hover:text-white transition-colors">The Gauntlet</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Peer Review Scraps</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Weekly Challenges</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Recruiter Mode</Link></li>
              </ul>
            </div>

            {/* Column 4: Support & Legal */}
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Support</h4>
              <ul className="space-y-4 text-sm font-bold text-muted-foreground">
                <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
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
