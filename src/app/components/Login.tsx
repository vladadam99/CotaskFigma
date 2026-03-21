import { motion } from "motion/react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export default function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to role selection for new users
    navigate(isSignUp ? "/role-selection" : "/home");
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    // Redirect to role selection for new sign-ups
    navigate("/role-selection");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full space-y-8"
      >
        {/* Logo/Title */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center mb-4">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1761044592252-cc6c1f3bf210?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNoJTIwbG9nbyUyMGhvbG9ncmFwaGljJTIwcHVycGxlJTIwbmVvbnxlbnwxfHx8fDE3NzMwODY0MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="CoTask Logo"
              className="w-24 h-24 rounded-2xl object-cover shadow-2xl shadow-primary/50 ring-2 ring-primary/30"
            />
          </div>
          <h1 className="text-4xl font-semibold">CoTask</h1>
          <p className="text-muted-foreground">
            {isSignUp ? "Create your account" : "Welcome back"}
          </p>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-background text-muted-foreground">Sign in with email</span>
          </div>
        </div>

        {/* Email/Password form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-input border border-border rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-input border border-border rounded-2xl py-3.5 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {!isSignUp && (
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3.5 rounded-2xl font-medium hover:bg-primary/90 transition-all active:scale-95"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        {/* Toggle sign up/sign in */}
        <div className="text-center">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <span className="text-primary font-medium">
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}