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
  Coffee,
  Sun,
  Moon
} from 'lucide-react';

// Using the overlay.png provided by the user
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
        <div className="glass-surface p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-[320px] animate-in fade-in zoom-in duration-300">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full" />
                <Coffee size={24} className="text-yellow-400 relative z-10" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1" style={{ color: 'var(--text-tertiary)' }}>Support Overlay</span>
                <span className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Buy me a coffee</span>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="transition-colors"
              style={{ color: 'var(--text-tertiary)' }}
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
                  ? 'border-current'
                  : 'hover:opacity-80'
                  }`}
                style={{
                  backgroundColor: amount === val ? 'var(--btn-bg)' : 'var(--bg-card)',
                  color: amount === val ? 'var(--btn-text)' : 'var(--text-secondary)',
                  borderColor: amount === val ? 'var(--btn-bg)' : 'var(--border-subtle)',
                }}
              >
                ${val}
              </button>
            ))}
          </div>

          <div className="relative mb-6">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold" style={{ color: 'var(--text-tertiary)' }}>$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-xl py-3 pl-8 pr-4 text-sm font-bold focus:outline-none transition-all"
              placeholder="Custom amount"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
              }}
            />
          </div>

          <div id="paypal-button-container" className="w-full min-h-[100px]" />
        </div>
      ) : (
        <button
          onClick={() => setIsExpanded(true)}
          className="group flex items-center gap-3 px-6 py-4 backdrop-blur-xl rounded-2xl transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400/20 blur-xl rounded-full group-hover:bg-yellow-400/40 transition-all duration-500" />
            <Coffee size={24} className="text-yellow-400 relative z-10 animate-bounce group-hover:animate-none" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1" style={{ color: 'var(--text-tertiary)' }}>Support Overlay</span>
            <span className="text-sm font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Buy me a coffee</span>
          </div>
        </button>
      )}
    </div>
  );
};

const StarShower = () => {
  const [stars, setStars] = useState<{ id: number; left: number; top: number; delay: number }[]>([]);
  const [starCount, setStarCount] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/Tzgold/Overlay')
      .then(res => res.json())
      .then(data => {
        if (typeof data.stargazers_count === 'number') {
          const count = data.stargazers_count;
          if (count >= 1000) {
            setStarCount((count / 1000).toFixed(1).replace(/\.0$/, '') + 'k');
          } else {
            setStarCount(String(count));
          }
        }
      })
      .catch(() => {
        setStarCount('★');
      });
  }, []);

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
      className="relative px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2 overflow-visible group"
      style={{
        border: '1px solid var(--border-primary)',
        backgroundColor: 'var(--bg-card)',
        color: 'var(--text-secondary)',
      }}
    >
      <Github size={20} />
      <span>GitHub</span>
      <div className="h-4 w-[1px] mx-1 transition-colors" style={{ backgroundColor: 'var(--border-primary)' }} />
      <Star size={14} className="text-yellow-400 fill-yellow-400" />
      <span className="transition-colors" style={{ color: 'var(--text-tertiary)' }}>{starCount ?? '·'}</span>
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
      className={`relative overflow-hidden rounded-[32px] backdrop-blur-2xl transition-all duration-500 ${className}`}
      style={{
        border: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-card)',
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, var(--spotlight-color), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

const ThemeToggle = ({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) => {
  const [animKey, setAnimKey] = useState(0);

  const handleClick = () => {
    setAnimKey(prev => prev + 1);
    onToggle();
  };

  return (
    <button
      onClick={handleClick}
      className="relative w-14 h-14 rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 hover:scale-110 active:scale-90 group"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-primary)',
        boxShadow: isDark
          ? '0 0 20px rgba(255, 255, 255, 0.05), inset 0 0 20px rgba(255, 255, 255, 0.02)'
          : '0 0 20px rgba(0, 0, 0, 0.05), inset 0 0 20px rgba(0, 0, 0, 0.02)',
      }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {/* Glow ring */}
      <div
        className="absolute inset-0 rounded-full transition-all duration-700"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(250, 204, 21, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
        }}
      />
      <div key={animKey} className="theme-icon-enter relative z-10" style={{ color: 'var(--text-primary)' }}>
        {isDark ? <Sun size={22} /> : <Moon size={22} />}
      </div>
    </button>
  );
};

const LandingPage: React.FC<{ onOpenDashboard: () => void }> = ({ onOpenDashboard }) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    const html = document.documentElement;
    // Enable transitions
    html.classList.add('theme-transitioning');
    // Toggle theme
    if (isDark) {
      html.classList.add('light');
    } else {
      html.classList.remove('light');
    }
    setIsDark(!isDark);
    // Remove transition class after animation completes
    setTimeout(() => {
      html.classList.remove('theme-transitioning');
    }, 750);
  };

  return (
    <div className="min-h-screen selection:bg-white/20 overflow-x-hidden" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>

      {/* Main Frame Wrapper */}
      <div className="main-frame flex flex-col items-center relative overflow-hidden mx-5 my-5 rounded-[40px]" style={{ minHeight: 'calc(100vh - 40px)' }}>

        {/* Navigation - Pill Design */}
        <div className="w-full pt-10 flex justify-center sticky top-0 z-50 px-6">
          <nav className="glass-surface flex items-center gap-2 p-1.5 rounded-full shadow-2xl max-w-fit backdrop-blur-xl" style={{ backgroundColor: 'var(--bg-nav)' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden group p-1.5" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-faint)' }}>
              <img src={LOGO_PATH} alt="Overlay Logo" className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity theme-logo" />
            </div>

            <div className="hidden md:flex items-center gap-8 px-8">
              <a href="#how-it-works" className="text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:opacity-100" style={{ color: 'var(--text-secondary)' }}>How it works</a>
              <a href="#use-cases" className="text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:opacity-100" style={{ color: 'var(--text-secondary)' }}>Use Cases</a>
              <a href="#features" className="text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:opacity-100" style={{ color: 'var(--text-secondary)' }}>Features</a>
            </div>

            <button
              onClick={onOpenDashboard}
              className="text-[11px] font-bold uppercase tracking-[0.1em] px-8 h-10 rounded-full transition-all active:scale-95"
              style={{ backgroundColor: 'var(--btn-bg)', color: 'var(--btn-text)' }}
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
                opacity: isDark ? 1 : 0.15,
                transition: 'opacity 700ms',
              }}
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, var(--hero-overlay-from), transparent, var(--hero-overlay-to))` }} />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md text-[10px] font-bold mb-8 tracking-[0.2em] uppercase" style={{ border: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-card)', color: 'var(--text-tertiary)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--text-tertiary)' }} />
              Overlay Intelligence v3.0
            </div>

            <h1 className="text-5xl md:text-7xl mb-8 max-w-4xl mx-auto leading-[1.1] font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>
              AI, right where<br />you work
            </h1>

            <p className="text-base md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Unleash a high-performance command center on any website — instantly, with zero context switching.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onOpenDashboard}
                className="px-10 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2 group hover:scale-105 active:scale-95 shadow-xl"
                style={{ backgroundColor: 'var(--btn-bg)', color: 'var(--btn-text)' }}
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
        <section id="how-it-works" className="w-full py-32 px-10 z-10 flex flex-col items-center" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>How It Works</h2>
            <p className="text-[11px] font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--text-muted)' }}>THE PATH TO FRICTIONLESS INTELLIGENCE</p>
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
                <div className="mb-2 transition-all duration-500 flex items-center justify-center" style={{ color: 'var(--text-tertiary)' }}>
                  {step.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                    {step.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed max-w-[260px] mx-auto transition-colors duration-300 font-medium" style={{ color: 'var(--text-tertiary)' }}>
                    {step.desc}
                  </p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Section: Built for the Modern Workflow */}
        <section id="use-cases" className="w-full py-32 px-10 z-10" style={{ backgroundColor: 'var(--bg-primary)' }}>
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Built for the Modern Workflow</h2>
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
                className={`flex flex-col items-start text-left gap-10 p-10 transition-all duration-500 group hover:-translate-y-1 ${useCase.highlight ? 'shadow-lg' : ''}`}
              >
                <div className="transition-all duration-500" style={{ color: 'var(--text-tertiary)' }}>
                  {useCase.icon}
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>{useCase.role}</h3>
                  <p className="text-sm font-medium leading-relaxed transition-colors duration-300" style={{ color: 'var(--text-tertiary)' }}>{useCase.text}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-32 px-10 z-10" style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--section-border)', borderBottom: '1px solid var(--section-border)' }}>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <h2 className="text-5xl font-bold leading-tight tracking-tight italic" style={{ color: 'var(--text-primary)' }}>AI, right where<br />you work.</h2>
              <p className="text-lg font-medium leading-relaxed max-w-md" style={{ color: 'var(--text-tertiary)' }}>
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
                  <li key={i} className="flex items-center gap-5 font-bold text-sm group cursor-default" style={{ color: 'var(--text-secondary)' }}>
                    <div className="w-6 h-6 flex items-center justify-center shrink-0 transition-all" style={{ border: '1px solid var(--border-primary)' }}>
                      <div className="w-1 h-1 opacity-40 group-hover:opacity-100 transition-all" style={{ backgroundColor: 'var(--text-primary)' }} />
                    </div>
                    <span className="transition-all group-hover:translate-x-1 uppercase tracking-tight italic" style={{ color: 'var(--text-secondary)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-1 rounded-[40px] overflow-hidden group shadow-2xl transition-all duration-700" style={{ border: '1px solid var(--border-primary)', backgroundColor: 'var(--bg-card)' }}>
              <div className="backdrop-blur-3xl p-16 h-[460px] flex flex-col items-center justify-center text-center gap-10 transition-all duration-700 rounded-[38px]" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)' }}>
                <div className="relative">
                  <div className="absolute inset-0 blur-[100px] rounded-full transition-all duration-700" style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.05)' }} />
                  <div className="w-32 h-32 opacity-20 group-hover:opacity-100 transition-all duration-1000 relative z-10 group-hover:scale-110 flex items-center justify-center">
                    <img src={LOGO_PATH} alt="Overlay Logo" className="w-full h-full object-contain filter brightness-125 theme-logo" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-3xl tracking-tight italic" style={{ color: 'var(--text-primary)' }}>AI, right where you work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full relative z-10 py-24 px-10" style={{ backgroundColor: 'var(--bg-primary)', borderTop: '1px solid var(--section-border)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-12 md:gap-6 mb-24">
              <div className="col-span-2 space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center overflow-hidden">
                    <img src={LOGO_PATH} alt="Overlay Logo" className="w-full h-full object-contain theme-logo" />
                  </div>
                  <span className="text-2xl font-bold tracking-tight italic uppercase" style={{ color: 'var(--text-primary)' }}>Overlay</span>
                </div>
                <p className="text-[11px] leading-relaxed max-w-[240px] uppercase font-bold tracking-[0.15em]" style={{ color: 'var(--text-tertiary)' }}>
                  The high-performance intelligence layer for the modern browser environment.
                </p>
                <div className="flex items-center gap-5 pt-2">
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity" style={{ color: 'var(--text-muted)' }}>
                    <Twitter size={20} />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity" style={{ color: 'var(--text-muted)' }}>
                    <Github size={20} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity" style={{ color: 'var(--text-muted)' }}>
                    <Linkedin size={20} />
                  </a>
                  <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity" style={{ color: 'var(--text-muted)' }}>
                    <Send size={20} />
                  </a>
                  <a href="#" className="hover:opacity-100 transition-opacity" style={{ color: 'var(--text-muted)' }}>
                    <Youtube size={20} />
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Product</h4>
                <ul className="space-y-4 text-[11px] uppercase font-bold" style={{ color: 'var(--text-tertiary)' }}>
                  <li><a href="#" className="hover:opacity-100 transition-opacity">Features</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-opacity">Security</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-opacity">Pricing</a></li>
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Support</h4>
                <ul className="space-y-4 text-[11px] uppercase font-bold" style={{ color: 'var(--text-tertiary)' }}>
                  <li><a href="#" className="hover:opacity-100 transition-opacity">Docs</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-opacity">Guides</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-opacity">API</a></li>
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Company</h4>
                <ul className="space-y-4 text-[11px] uppercase font-bold" style={{ color: 'var(--text-tertiary)' }}>
                  <li><a href="#" className="hover:opacity-100 transition-opacity">About</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-opacity">Blog</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-opacity">Legal</a></li>
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="text-[11px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>Social</h4>
                <ul className="space-y-4 text-[11px] uppercase font-bold" style={{ color: 'var(--text-tertiary)' }}>
                  <li><a href="https://x.com/Tequam710487" className="hover:opacity-100 transition-opacity">X</a></li>
                  <li><a href="https://github.com/Tzgold/Overlay" className="hover:opacity-100 transition-opacity">GitHub</a></li>
                  <li><a href="https://www.linkedin.com/in/tequam-zework-96b4382b3" className="hover:opacity-100 transition-opacity">LinkedIn</a></li>
                  <li><a href="https://t.me/T_zgold" className="hover:opacity-100 transition-opacity">Telegram</a></li>
                  <li><a href="#" className="hover:opacity-100 transition-opacity">Discord</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderTop: '1px solid var(--section-border)' }}>
              <p className="text-[10px] font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--text-muted)' }}>
                © 2025 Overlay
              </p>
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
                  {isDark ? 'Dark' : 'Light'} Mode
                </span>
                <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
              </div>
            </div>
          </div>
        </footer>
      </div>
      <BuyMeCoffee />
    </div>
  );
};

export default LandingPage;