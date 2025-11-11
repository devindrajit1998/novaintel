import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Zap, FileText, Sparkles, ArrowRight, Brain, Target, TrendingUp } from "lucide-react";

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered RFP Analysis",
      description: "Automatically reads and understands complex client RFPs, extracting key requirements and pain points."
    },
    {
      icon: Target,
      title: "Smart Discovery Questions",
      description: "Generate targeted questionnaires that uncover critical business insights and build stronger proposals."
    },
    {
      icon: FileText,
      title: "Intelligent Proposals",
      description: "Build custom proposals using AI insights, relevant case studies, and proven value propositions."
    },
    {
      icon: TrendingUp,
      title: "Case Study Matching",
      description: "Automatically recommend the most relevant case studies based on industry and client challenges."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold gradient-text">NovaIntel</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/login">
                <Button variant="hero">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="glass-card px-4 py-2 rounded-full text-sm font-medium text-primary">
              AI-Powered Presales Intelligence
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Accelerate Your <span className="gradient-text">Presales Process</span> with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Automate RFP analysis, discovery, and proposal creation with NovaIntel — your AI-powered presales partner that turns insights into winning proposals.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login">
              <Button variant="hero" size="xl" className="group">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="glass" size="xl">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-40 left-20 floating opacity-20">
          <div className="w-20 h-20 rounded-full bg-primary blur-3xl" />
        </div>
        <div className="absolute top-60 right-32 floating opacity-20" style={{ animationDelay: '1s' }}>
          <div className="w-32 h-32 rounded-full bg-secondary blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Supercharge Your <span className="gradient-text">Presales Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            NovaIntel combines AI intelligence with presales expertise to deliver faster, smarter, and more compelling proposals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="glass-card p-6 rounded-xl hover:scale-105 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-shadow">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="glass-card rounded-2xl p-12">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold gradient-text mb-2">10x</div>
              <div className="text-muted-foreground">Faster RFP Analysis</div>
            </div>
            <div>
              <div className="text-5xl font-bold gradient-text mb-2">98%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-5xl font-bold gradient-text mb-2">500+</div>
              <div className="text-muted-foreground">Hours Saved Monthly</div>
            </div>
            <div>
              <div className="text-5xl font-bold gradient-text mb-2">85%</div>
              <div className="text-muted-foreground">Win Rate Increase</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="glass-card rounded-2xl p-12 text-center pulse-glow">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Transform Your Presales?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join leading teams using NovaIntel to win more deals and close faster.
          </p>
          <Link to="/login">
            <Button variant="hero" size="xl" className="group">
              Sign In to Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <span className="font-bold">NovaIntel</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">About</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
