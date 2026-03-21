import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Video, Mail, Lock, Eye, EyeOff, User, MapPin, Phone } from "lucide-react";

export default function AvatarSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Store basic account info and navigate to onboarding
    localStorage.setItem("avatarAccountInfo", JSON.stringify({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
    }));
    
    navigate("/onboarding/avatar");
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-12">
      {/* Gradient Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #1a0e0e 0%, #2d1515 100%)"
        }}
      />

      {/* Animated Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "rgba(220, 38, 38, 0.2)" }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-8 flex items-center gap-2 transition-colors active:scale-95"
          style={{ color: "#9CA3AF" }}
        >
          <ArrowLeft size={20} />
          <span>Back to role selection</span>
        </button>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-8 border backdrop-blur-[20px]"
          style={{
            background: "rgba(45, 21, 21, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)"
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
              style={{ 
                background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
                boxShadow: "0 4px 20px rgba(220, 38, 38, 0.5)"
              }}
            >
              <Video className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-white">
              Become an Avatar
            </h1>
            <p className="text-sm" style={{ color: "#9CA3AF" }}>
              Create your account and start streaming
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: "#9CA3AF" }} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border rounded-xl pl-11 pr-4 py-3 focus:outline-none transition-all text-white placeholder-[#9CA3AF]"
                  style={{
                    background: "rgba(26, 14, 14, 0.6)",
                    borderColor: "rgba(255, 255, 255, 0.08)"
                  }}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: "#9CA3AF" }} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="avatar@example.com"
                  className="w-full border rounded-xl pl-11 pr-4 py-3 focus:outline-none transition-all text-white placeholder-[#9CA3AF]"
                  style={{
                    background: "rgba(26, 14, 14, 0.6)",
                    borderColor: "rgba(255, 255, 255, 0.08)"
                  }}
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: "#9CA3AF" }} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full border rounded-xl pl-11 pr-4 py-3 focus:outline-none transition-all text-white placeholder-[#9CA3AF]"
                  style={{
                    background: "rgba(26, 14, 14, 0.6)",
                    borderColor: "rgba(255, 255, 255, 0.08)"
                  }}
                  required
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: "#9CA3AF" }} />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="City, Country"
                  className="w-full border rounded-xl pl-11 pr-4 py-3 focus:outline-none transition-all text-white placeholder-[#9CA3AF]"
                  style={{
                    background: "rgba(26, 14, 14, 0.6)",
                    borderColor: "rgba(255, 255, 255, 0.08)"
                  }}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: "#9CA3AF" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className="w-full border rounded-xl pl-11 pr-11 py-3 focus:outline-none transition-all text-white placeholder-[#9CA3AF]"
                  style={{
                    background: "rgba(26, 14, 14, 0.6)",
                    borderColor: "rgba(255, 255, 255, 0.08)"
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "#9CA3AF" }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2" size={18} style={{ color: "#9CA3AF" }} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="w-full border rounded-xl pl-11 pr-11 py-3 focus:outline-none transition-all text-white placeholder-[#9CA3AF]"
                  style={{
                    background: "rgba(26, 14, 14, 0.6)",
                    borderColor: "rgba(255, 255, 255, 0.08)"
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "#9CA3AF" }}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-sm">
              <input 
                type="checkbox" 
                className="mt-1 rounded" 
                required
                style={{ accentColor: "#DC2626" }}
              />
              <span style={{ color: "#9CA3AF" }}>
                I agree to the{" "}
                <button type="button" className="font-semibold" style={{ color: "#DC2626" }}>
                  Terms of Service
                </button>
                {" "}and{" "}
                <button type="button" className="font-semibold" style={{ color: "#DC2626" }}>
                  Privacy Policy
                </button>
              </span>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full text-white font-bold py-4 rounded-2xl transition-all"
              style={{
                background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
                boxShadow: "0 4px 20px rgba(220, 38, 38, 0.5)"
              }}
            >
              Create Account
            </motion.button>
          </form>

          {/* Sign In Link */}
          <p className="text-center text-sm mt-6" style={{ color: "#9CA3AF" }}>
            Already have an account?{" "}
            <button 
              onClick={() => navigate("/login/avatar")}
              className="font-semibold" 
              style={{ color: "#DC2626" }}
            >
              Sign In
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}