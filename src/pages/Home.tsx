import { useNavigate } from "react-router-dom";
import { Leaf, BarChart3, Zap, Globe, Users, TrendingDown, Shield, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

const FEATURES = [
  { icon: Leaf, title: "Carbon Prediction", desc: "AI-powered estimation of your web app's carbon footprint using trained ML models." },
  { icon: BarChart3, title: "6-Month Forecast", desc: "Project future emissions with 10% monthly traffic growth modeling." },
  { icon: Zap, title: "Green Score", desc: "Instant sustainability rating from 0–100 with actionable breakdowns." },
  { icon: Globe, title: "Smart Suggestions", desc: "Data-driven recommendations ranked by feature importance." },
];

const STATS = [
  { value: "2.4M+", label: "Predictions Made" },
  { value: "12K+", label: "Teams Using" },
  { value: "340 tons", label: "CO₂ Saved" },
  { value: "98%", label: "Accuracy Rate" },
];

const TESTIMONIALS = [
  {
    quote: "GreenCode AI helped us reduce our platform's carbon footprint by 40% in just 3 months.",
    name: "Sarah Chen",
    role: "CTO, NovaTech",
  },
  {
    quote: "The feature importance analysis was a game-changer for our optimization roadmap.",
    name: "Marcus Rivera",
    role: "Lead Engineer, EcoApps",
  },
  {
    quote: "We integrated GreenCode into our CI/CD pipeline. Every deploy is now sustainability-aware.",
    name: "Priya Sharma",
    role: "DevOps Lead, GreenStack",
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="gradient-dark text-primary-foreground py-28 px-6 relative overflow-hidden">
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(hsl(152 60% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(152 60% 50%) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-1.5 text-sm mb-8 font-body">
            <Leaf className="w-4 h-4" />
            ML-Powered Sustainability Analysis
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
            Measure Your Code's
            <br />
            <span className="text-primary">Carbon Footprint</span>
          </h1>
          <p className="text-lg md:text-xl opacity-70 max-w-2xl mx-auto mb-10 font-body leading-relaxed">
            Predict, analyze, and reduce the environmental impact of your web applications 
            with machine learning — in under 30 seconds.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="gradient-hero text-primary-foreground font-display font-semibold text-lg px-8 py-4 rounded-lg shadow-glow hover:shadow-card-hover transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Start Free Analysis
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/history")}
              className="font-display font-semibold text-lg px-8 py-4 rounded-lg border border-primary/30 hover:bg-primary/10 transition-all duration-300"
            >
              View History
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-0 px-6 bg-background relative">
        <div className="max-w-4xl mx-auto -mt-8 relative z-20">
          <div className="bg-card rounded-2xl shadow-card-hover grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {STATS.map((s) => (
              <div key={s.label} className="p-6 text-center">
                <p className="font-display text-2xl md:text-3xl font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground font-body mt-1 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary font-body uppercase tracking-wider mb-2">Features</p>
            <h2 className="font-display text-4xl font-bold text-foreground">
              Everything you need to go green
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 animate-fade-in-up group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg gradient-hero flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                  <f.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary font-body uppercase tracking-wider mb-2">How It Works</p>
            <h2 className="font-display text-4xl font-bold text-foreground">
              Three steps to sustainability
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", icon: Users, title: "Input Metrics", desc: "Enter your app's page size, API calls, images, users, and response times." },
              { step: "02", icon: TrendingDown, title: "AI Analysis", desc: "Our ML model predicts emissions, calculates green scores, and generates forecasts." },
              { step: "03", icon: Shield, title: "Optimize", desc: "Get ranked suggestions and track improvement over time with prediction history." },
            ].map((item, i) => (
              <div key={item.step} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 150}ms` }}>
                <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-5 shadow-glow">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <span className="font-display text-xs text-primary font-bold tracking-widest">{item.step}</span>
                <h3 className="font-display text-xl font-bold text-foreground mt-1 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-primary font-body uppercase tracking-wider mb-2">Testimonials</p>
            <h2 className="font-display text-4xl font-bold text-foreground">
              Loved by engineering teams
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <p className="text-foreground font-body leading-relaxed mb-5 text-sm">"{t.quote}"</p>
                <div>
                  <p className="font-display font-semibold text-foreground text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground font-body">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-dark text-primary-foreground py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold mb-4">Ready to build greener?</h2>
          <p className="text-lg opacity-70 font-body mb-8">
            Join thousands of teams using GreenCode AI to reduce their digital carbon footprint.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="gradient-hero text-primary-foreground font-display font-semibold text-lg px-8 py-4 rounded-lg shadow-glow hover:shadow-card-hover transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Start Free Analysis →
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-background border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-primary" />
            <span className="font-display font-bold text-foreground">GreenCode AI</span>
          </div>
          <p className="text-xs text-muted-foreground font-body">
            © 2026 GreenCode AI. Built for a sustainable web.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
