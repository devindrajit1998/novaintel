import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in production, this would connect to Lovable Cloud
    if (email && password) {
      toast.success("Welcome back!");
      navigate("/dashboard");
    } else {
      toast.error("Please enter your credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-40 h-40 bg-primary rounded-full blur-3xl floating" />
          <div className="absolute bottom-32 right-20 w-56 h-56 bg-secondary rounded-full blur-3xl floating" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <Sparkles className="w-10 h-10 text-primary" />
            <span className="text-3xl font-bold gradient-text">NovaIntel</span>
          </Link>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Welcome Back to <br />
            <span className="gradient-text">NovaIntel</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            AI that accelerates your presales intelligence and transforms RFPs into winning proposals.
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="glass-card p-8 rounded-2xl">
            <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
              <span className="text-2xl font-bold gradient-text">NovaIntel</span>
            </div>

            <h2 className="text-3xl font-bold mb-2">Sign In</h2>
            <p className="text-muted-foreground mb-8">
              Enter your credentials to access your workspace
            </p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-input/50 border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-input/50 border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-sm text-muted-foreground">Remember me</span>
                </label>
                <a href="#" className="text-sm text-primary hover:text-primary-glow transition-colors">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full">
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              New to NovaIntel?{" "}
              <Link to="/login" className="text-primary hover:text-primary-glow transition-colors font-semibold">
                Sign up now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
