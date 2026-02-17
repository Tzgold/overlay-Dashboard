import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Github,
  Twitter,
  Youtube,
  Linkedin,
  Send,
  Monitor,
  Download,
  Keyboard,
  CheckCircle2,
  GraduationCap,
  Code2,
  PenTool,
  Search,
  Star,
  Layers,
  ShoppingBag,
  CreditCard,
  Coffee
} from 'lucide-react';

// Using the overlay.png provided by the user
//the logo for the overlay
const LOGO_PATH = "/overlay.png";

const BuyMeCoffee = () => {
  const [amount, setAmount] = useState('5.00');
  const [isExpanded, setIsExpanded] = useState(false);

  React.useEffect(() => {
    if (!isExpanded) return;

    const container = document.getElementById('paypal-button-container');
    if (container && (window as any).paypal) {
      container.innerHTML = '';
      (window as any).paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'paypal'
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            alert('Thank you for the coffee, ' + details.payer.name.given_name + '!');
            setIsExpanded(false);
          });
        }
      }).render('#paypal-button-container');
    }
  }, [isExpanded, amount]);

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
      {isExpanded ? (
        <div className="glass-surface p-6 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-[320px] animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full" />
                <Coffee size={24} className="text-yellow-400 relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1">Support Overlay</span>
                <span className="text-sm font-bold text-white tracking-tight">Buy me a coffee</span>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-white/40 hover:text-white transition-colors"
            >
              <ArrowRight size={20} className="rotate-90" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6">
            {['5.00', '10.00', '25.00'].map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val)}
                className={`py-2 rounded-xl border text-xs font-bold transition-all ${amount === val
                  ? 'bg-white text-black border-white'
                  : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'
                  }`}
              >
                ${val}
              </button>
            ))}
          </div>

          <div className="relative mb-6">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-bold">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-sm font-bold text-white focus:outline-none focus:border-white/30 transition-all"
              placeholder="Custom amount"
            />
          </div>

          <div id="paypal-button-container" className="w-full min-h-[100px]" />
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="group flex items-center gap-3 px-6 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full group-hover:bg-yellow-400/40 transition-all duration-500" />
            <Coffee size={24} className="text-yellow-400 relative z-10 animate-bounce group-hover:animate-none" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none mb-1">Support Overlay</span>
            <span className="text-sm font-bold text-white tracking-tight">Buy me a coffee</span>
          </div>
        </button>
      )}
    </div>
  );
};

const StarShower = () => {
  const [stars, setStars] = useState<{ id: number; left: number; top: number; delay: number }[]>([]);

  const handleMouseEnter = () => {
    const newStars = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 80 + 10,
      top: Math.random() * 20 + 20,
      delay: Math.random() * 0.4
    }));
    setStars(prev => [...prev, ...newStars]);
    setTimeout(() => {
      setStars(prev => prev.slice(8));
    }, 1500);
  };

  return (
    <a
      href="https://github.com/Tzgold/Overlay"
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      className="relative px-10 py-4 rounded-xl border border-white/15 hover:border-white/30 text-white/60 hover:text-white font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2 bg-white/5 overflow-visible group"
    >
      <Github size={20} />
      <span>GitHub</span>
      <div className="h-4 w-[1px] bg-white/20 mx-1 group-hover:bg-white/40 transition-colors" />
      <span className="text-white/40 group-hover:text-white transition-colors">1.2k</span>
      {stars.map(star => (
        <Star
          key={star.id}
          size={12}
          className="star-particle text-yellow-400 fill-yellow-400"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
    </a>
  );
};

const SpotlightCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setOpacity(1);
  };

  const handleBlur = () => {
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.03] backdrop-blur-2xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const LandingPage: React.FC<{ onOpenDashboard: () => void }> = ({ onOpenDashboard }) => {
  return (
    <div className="min-h-screen bg-[#000000] text-white selection:bg-white/20 overflow-x-hidden">

      {/* Main Frame Wrapper */}
      <div className="main-frame flex flex-col items-center relative overflow-hidden bg-black/40 border-white/10 mx-5 my-5 rounded-[40px] border min-h-[calc(100vh-40px)]">

        {/* Navigation - Pill Design */}
        <div className="w-full pt-10 flex justify-center sticky top-0 z-50 px-6">
          <nav className="glass-surface flex items-center gap-2 p-1.5 rounded-full border border-white/15 shadow-2xl max-w-fit bg-black/60 backdrop-blur-xl text-white">
            <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden border border-white/5 group p-1.5">
              <img src={LOGO_PATH} alt="Overlay Logo" className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="hidden md:flex items-center gap-8 px-8">
              <a href="#how-it-works" className="text-[11px] font-bold text-white/50 hover:text-white uppercase tracking-[0.2em] transition-all">How it works</a>
              <a href="#use-cases" className="text-[11px] font-bold text-white/50 hover:text-white uppercase tracking-[0.2em] transition-all">Use Cases</a>
              <a href="#features" className="text-[11px] font-bold text-white/50 hover:text-white uppercase tracking-[0.2em] transition-all">Features</a>
            </div>

            <button
              onClick={onOpenDashboard}
              className="bg-white text-black text-[11px] font-bold uppercase tracking-[0.1em] px-8 h-10 rounded-full hover:bg-zinc-200 transition-all active:scale-95"
            >
              Get Extension
            </button>
          </nav>
        </div>

        {/* Hero Section */}
        <section className="relative w-full flex flex-col items-center justify-center text-center px-6 min-h-[85vh] z-10 pt-10 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat grayscale contrast-[1.5] brightness-[0.4]"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop")',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] font-bold text-white/40 mb-8 tracking-[0.2em] uppercase">
              <div className="w-1.5 h-1.5 bg-white/30 rounded-full" />
              Overlay Intelligence v3.0
            </div>

            <h1 className="text-5xl md:text-7xl mb-8 max-w-4xl mx-auto leading-[1.1] font-bold tracking-tight text-white">
              AI, right where<br />you work
            </h1>

            <p className="text-base md:text-xl max-w-2xl mx-auto mb-12 text-white/60 font-medium leading-relaxed">
              Unleash a high-performance command center on any website — instantly, with zero context switching.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenDashboard}
                className="px-10 py-4 rounded-xl bg-white text-black font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2 group hover:scale-105 active:scale-95 shadow-xl"
              >
                <CheckCircle2 size={18} />
                Install Extension
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <StarShower />
            </div>
          </div>
        </section>

        {/* Section: How It Works */}
        <section id="how-it-works" className="w-full py-32 px-10 z-10 bg-[#000000] flex flex-col items-center">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold tracking-tight mb-4 text-white">How It Works</h2>
            <p className="text-[11px] font-bold text-white/20 uppercase tracking-[0.4em]">THE PATH TO FRICTIONLESS INTELLIGENCE</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Download size={40} />,
                title: "Install Extension",
                desc: "Add Overlay to Chrome in one click. Experience native integration deep in the browser."
              },
              {
                icon: <Keyboard size={40} />,
                title: "Summon Instantly",
                desc: "Press ⌘ / Ctrl + A to open anywhere. Bring the AI dashboard into any page without leaving your flow."
              },
              {
                icon: <Layers size={40} />,
                title: "Universal Layer",
                desc: "Precision Intelligence. Without compromise. Use the dashboard on any page instantly."
              }
            ].map((step, i) => (
              <SpotlightCard key={i} className="flex flex-col items-center text-center gap-8 p-12">
                <div className="mb-2 transition-all duration-500 group-hover:scale-110 text-white/30 group-hover:text-white flex items-center justify-center">
                  {step.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-white transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-white/40 group-hover:text-white/90 text-[15px] leading-relaxed max-w-[260px] mx-auto transition-colors duration-300 font-medium">
                    {step.desc}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Section: Built for the Modern Workflow */}
        <section id="use-cases" className="w-full py-32 px-10 z-10 bg-[#000000]">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold tracking-tight text-white">Built for the Modern Workflow</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: <GraduationCap size={24} />,
                role: "Students",
                text: "Summarize a PDF while reading it"
              },
              {
                icon: <Code2 size={24} />,
                role: "Developers",
                text: "Explain a function without leaving GitHub"
              },
              {
                icon: <PenTool size={24} />,
                role: "Writers",
                text: "Draft an email reply while staying in your flow",
                highlight: true
              },
              {
                icon: <Search size={24} />,
                role: "Researchers",
                text: "Cross-reference facts while browsing live news"
              }
            ].map((useCase, i) => (
              <SpotlightCard
                key={i}
                className={`flex flex-col items-start text-left gap-10 p-10 transition-all duration-500 group hover:-translate-y-1 ${useCase.highlight ? 'border-white/30 shadow-[0_0_40px_rgba(255,255,255,0.05)] bg-white/5 hover:bg-white/10' : ''}`}
              >
                <div className="text-white/30 group-hover:text-white group-hover:scale-110 transition-all duration-500">
                  {useCase.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-white tracking-tight">{useCase.role}</h3>
                  <p className="text-white/40 group-hover:text-white/80 text-sm font-medium leading-relaxed transition-colors duration-300">{useCase.text}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-32 px-10 z-10 bg-[#000000] border-y border-white/15">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h2 className="text-5xl font-bold leading-tight text-white tracking-tight italic">AI, right where<br />you work.</h2>
              <p className="text-white/40 text-lg font-medium leading-relaxed max-w-md">
                Access your entire AI stack by clicking keys without leaving the page you're working on. Pure efficiency, zero friction.
              </p>
              <ul className="space-y-6">
                {[
                  "Context-aware AI command center",
                  "Direct HTML/DOM element parsing",
                  "One-click multi-language logic",
                  "Code refactor and logic explanation",
                  "Optimized keyboard-first navigation",
                  "Isolated secure sandbox compute"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-5 text-white/50 font-bold text-sm group cursor-default">
                    <div className="w-6 h-6 border border-white/20 flex items-center justify-center shrink-0 transition-all group-hover:border-white/40">
                      <div className="w-1 h-1 bg-white opacity-40 group-hover:opacity-100 transition-all" />
                    </div>
                    <span className="transition-all group-hover:translate-x-1 group-hover:text-white uppercase tracking-tight italic">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-white/15 p-1 bg-white/5 rounded-[40px] overflow-hidden group shadow-2xl transition-all duration-700 hover:border-white/30">
              <div className="bg-[#050505]/80 backdrop-blur-3xl p-16 h-[460px] flex flex-col items-center justify-center text-center gap-10 transition-all duration-700 border border-white/10 rounded-[38px] group-hover:bg-[#080808]">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 blur-[100px] rounded-full transition-all duration-700 group-hover:bg-white/20" />
                  <div className="w-32 h-32 opacity-20 group-hover:opacity-100 transition-all duration-1000 relative z-10 group-hover:scale-110 flex items-center justify-center">
                    <img src={LOGO_PATH} alt="Overlay Logo" className="w-full h-full object-contain filter brightness-125" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-white font-bold text-3xl tracking-tight italic">AI, right where you work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-[#000000] border-t border-white/15 relative z-10 py-24 px-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-12 md:gap-6 mb-24">
              <div className="col-span-2 space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                    <img src={LOGO_PATH} alt="Overlay Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-2xl font-bold tracking-tight text-white italic uppercase">Overlay</span>
                </div>
                <p className="text-[11px] text-white/40 leading-relaxed max-w-[240px] uppercase font-bold tracking-[0.15em]">
                  The high-performance intelligence layer for the modern browser environment.
                </p>
                <div className="flex items-center gap-5 pt-2">
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors">
                    <Twitter size={20} />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors">
                    <Github size={20} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-white transition-colors">
                    <Send size={20} />
                  </a>
                  <a href="#" className="text-white/20 hover:text-white transition-colors">
                    <Youtube size={20} />
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/80">Product</h4>
                <ul className="space-y-4 text-[11px] text-white/40 uppercase font-bold">
                  <li><a href="#" className="hover:text-white">Features</a></li>
                  <li><a href="#" className="hover:text-white">Security</a></li>
                  <li><a href="#" className="hover:text-white">Pricing</a></li>
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/80">Support</h4>
                <ul className="space-y-4 text-[11px] text-white/40 uppercase font-bold">
                  <li><a href="#" className="hover:text-white">Docs</a></li>
                  <li><a href="#" className="hover:text-white">Guides</a></li>
                  <li><a href="#" className="hover:text-white">API</a></li>
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/80">Company</h4>
                <ul className="space-y-4 text-[11px] text-white/40 uppercase font-bold">
                  <li><a href="#" className="hover:text-white">About</a></li>
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                  <li><a href="#" className="hover:text-white">Legal</a></li>
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/80">Social</h4>
                <ul className="space-y-4 text-[11px] text-white/40 uppercase font-bold">
                  <li><a href="https://x.com/Tequam710487" className="hover:text-white">X</a></li>
                  <li><a href="https://github.com/Tzgold/Overlay" className="hover:text-white">GitHub</a></li>
                  <li><a href="https://www.linkedin.com/in/tequam-zework-96b4382b3" className="hover:text-white">LinkedIn</a></li>
                  <li><a href="https://t.me/T_zgold" className="hover:text-white">Telegram</a></li>
                  <li><a href="#" className="hover:text-white">Discord</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-12 border-t border-white/15 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
                © 2025 Overlay
              </p>
            </div>
          </div>
        </footer>
      </div>
      <BuyMeCoffee />
    </div>
  );
};

export default LandingPage;