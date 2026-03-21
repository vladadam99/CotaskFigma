import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  User,
  Camera,
  Heart,
  Zap,
  Languages,
  DollarSign,
  Bell,
  Shield,
  CheckCircle,
  Sparkles,
  MapPin,
  Calendar,
  Plane,
  GraduationCap,
  ShoppingBag,
  Utensils,
  Dumbbell,
  Music,
  Home,
  Briefcase,
  Globe,
  Clock,
  Eye,
  Video,
  MessageCircle,
  CreditCard,
  Lock,
  FileText,
} from "lucide-react";

const TOTAL_STEPS = 9;

// Categories for interests
const interestCategories = [
  { id: "travel", label: "Travel & Tourism", icon: Plane, color: "#3B82F6" },
  { id: "events", label: "Events & Concerts", icon: Music, color: "#8B5CF6" },
  { id: "learning", label: "Learning & Education", icon: GraduationCap, color: "#10B981" },
  { id: "shopping", label: "Shopping & Fashion", icon: ShoppingBag, color: "#EC4899" },
  { id: "food", label: "Food & Restaurants", icon: Utensils, color: "#F59E0B" },
  { id: "sports", label: "Sports & Fitness", icon: Dumbbell, color: "#EF4444" },
  { id: "realestate", label: "Real Estate", icon: Home, color: "#06B6D4" },
  { id: "business", label: "Business & Professional", icon: Briefcase, color: "#6366F1" },
];

// Adventure levels
const adventureLevels = [
  { id: "relaxed", label: "Relaxed", description: "Calm, peaceful experiences", icon: "🧘" },
  { id: "moderate", label: "Moderate", description: "Balanced mix of comfort and excitement", icon: "🚶" },
  { id: "adventurous", label: "Adventurous", description: "Thrilling, exciting experiences", icon: "🏃" },
];

// Languages
const languages = [
  { id: "en", label: "English", flag: "🇺🇸" },
  { id: "es", label: "Spanish", flag: "🇪🇸" },
  { id: "fr", label: "French", flag: "🇫🇷" },
  { id: "de", label: "German", flag: "🇩🇪" },
  { id: "zh", label: "Chinese", flag: "🇨🇳" },
  { id: "ja", label: "Japanese", flag: "🇯🇵" },
  { id: "ar", label: "Arabic", flag: "🇸🇦" },
  { id: "pt", label: "Portuguese", flag: "🇧🇷" },
];

// Budget ranges
const budgetRanges = [
  { id: "budget", label: "Budget", range: "$10-25/hour", icon: "💵" },
  { id: "moderate", label: "Moderate", range: "$25-50/hour", icon: "💰" },
  { id: "premium", label: "Premium", range: "$50-100/hour", icon: "💎" },
  { id: "luxury", label: "Luxury", range: "$100+/hour", icon: "👑" },
];

export default function UserOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // Load saved data from signup
  const savedAccountInfo = JSON.parse(localStorage.getItem("userAccountInfo") || "{}");

  // Form state for all steps
  const [formData, setFormData] = useState({
    // Step 1: Profile Setup
    bio: "",
    dateOfBirth: "",
    location: "",
    profilePicture: null as File | null,
    
    // Step 2: Interests
    interests: [] as string[],
    
    // Step 3: Experience Preferences
    adventureLevel: "",
    preferredView: "fpv",
    sessionLength: "medium",
    
    // Step 4: Languages
    languages: ["en"] as string[],
    
    // Step 5: Budget & Payment
    budgetRange: "",
    paymentMethod: "",
    
    // Step 6: Notifications
    notifications: {
      newAvatars: true,
      favoritesLive: true,
      sessionReminders: true,
      deals: true,
      messages: true,
    },
    
    // Step 7: Privacy & Safety
    profileVisibility: "public",
    ageRestricted: false,
    safetyAgreement: false,
    termsAccepted: false,
    
    // Step 8: Goals
    goals: [] as string[],
  });

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    // Save all onboarding data
    const completeUserData = {
      ...savedAccountInfo,
      ...formData,
      onboardingCompleted: true,
      onboardingDate: new Date().toISOString(),
    };
    
    localStorage.setItem("userOnboardingData", JSON.stringify(completeUserData));
    localStorage.setItem("userRole", "user");
    
    // Navigate to home
    navigate("/home");
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return formData.bio && formData.dateOfBirth && formData.location;
      case 2:
        return formData.interests.length > 0;
      case 3:
        return formData.adventureLevel;
      case 4:
        return formData.languages.length > 0;
      case 5:
        return formData.budgetRange;
      case 6:
        return true; // Notifications are optional
      case 7:
        return formData.safetyAgreement && formData.termsAccepted;
      case 8:
        return formData.goals.length > 0;
      case 9:
        return true; // Final review
      default:
        return false;
    }
  };

  const toggleInterest = (id: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(id)
        ? formData.interests.filter((i) => i !== id)
        : [...formData.interests, id],
    });
  };

  const toggleLanguage = (id: string) => {
    if (id === "en" && formData.languages.includes("en") && formData.languages.length === 1) {
      return; // Keep at least English
    }
    setFormData({
      ...formData,
      languages: formData.languages.includes(id)
        ? formData.languages.filter((l) => l !== id)
        : [...formData.languages, id],
    });
  };

  const toggleGoal = (goal: string) => {
    setFormData({
      ...formData,
      goals: formData.goals.includes(goal)
        ? formData.goals.filter((g) => g !== goal)
        : [...formData.goals, goal],
    });
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "linear-gradient(135deg, #4FB6FF 0%, #3B9FE8 100%)",
                  boxShadow: "0 4px 20px rgba(79, 182, 255, 0.4)",
                }}
              >
                <User className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Complete Your Profile</h2>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>
                Tell us a bit about yourself
              </p>
            </div>

            {/* Profile Picture */}
            <div className="text-center">
              <div
                className="w-24 h-24 rounded-full mx-auto mb-3 border-2 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                style={{
                  background: "linear-gradient(135deg, rgba(79, 182, 255, 0.2), rgba(59, 159, 232, 0.1))",
                  borderColor: "rgba(79, 182, 255, 0.3)",
                }}
              >
                {formData.profilePicture ? (
                  <img
                    src={URL.createObjectURL(formData.profilePicture)}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Camera className="text-blue-400" size={32} />
                )}
              </div>
              <label className="text-sm font-medium cursor-pointer" style={{ color: "#4FB6FF" }}>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    setFormData({ ...formData, profilePicture: e.target.files?.[0] || null })
                  }
                />
                Upload Photo (Optional)
              </label>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Bio <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Tell avatars about yourself and what experiences you're looking for..."
                rows={4}
                className="w-full border rounded-xl px-4 py-3 focus:outline-none transition-all text-white placeholder-[#9CA3AF] resize-none"
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  borderColor: "rgba(255, 255, 255, 0.08)",
                }}
              />
              <p className="text-xs mt-1" style={{ color: "#7E8AA8" }}>
                {formData.bio.length}/500 characters
              </p>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Date of Birth <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  size={18}
                  style={{ color: "#9CA3AF" }}
                />
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                  className="w-full border rounded-xl pl-11 pr-4 py-3 focus:outline-none transition-all text-white"
                  style={{
                    background: "rgba(15, 23, 42, 0.6)",
                    borderColor: "rgba(255, 255, 255, 0.08)",
                  }}
                />
              </div>
              <p className="text-xs mt-1" style={{ color: "#7E8AA8" }}>
                You must be 18+ to use CoTask
              </p>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Location <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  size={18}
                  style={{ color: "#9CA3AF" }}
                />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="City, Country"
                  className="w-full border rounded-xl pl-11 pr-4 py-3 focus:outline-none transition-all text-white placeholder-[#9CA3AF]"
                  style={{
                    background: "rgba(15, 23, 42, 0.6)",
                    borderColor: "rgba(255, 255, 255, 0.08)",
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "linear-gradient(135deg, #EC4899 0%, #DB2777 100%)",
                  boxShadow: "0 4px 20px rgba(236, 72, 153, 0.4)",
                }}
              >
                <Heart className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">What Interests You?</h2>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>
                Select all the categories you'd like to explore (choose at least one)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {interestCategories.map((category) => {
                const Icon = category.icon;
                const isSelected = formData.interests.includes(category.id);
                return (
                  <button
                    key={category.id}
                    onClick={() => toggleInterest(category.id)}
                    className="rounded-2xl p-4 border backdrop-blur-[18px] text-left transition-all active:scale-95"
                    style={{
                      background: isSelected
                        ? `${category.color}20`
                        : "rgba(20, 25, 35, 0.65)",
                      borderColor: isSelected
                        ? `${category.color}60`
                        : "rgba(255, 255, 255, 0.06)",
                      boxShadow: isSelected
                        ? `0 0 0 2px ${category.color}40`
                        : "0 4px 12px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <Icon
                      size={24}
                      className="mb-2"
                      style={{ color: isSelected ? category.color : "#9CA3AF" }}
                    />
                    <p
                      className="text-sm font-semibold"
                      style={{ color: isSelected ? category.color : "#FFFFFF" }}
                    >
                      {category.label}
                    </p>
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-center" style={{ color: "#7E8AA8" }}>
              {formData.interests.length} categor{formData.interests.length === 1 ? "y" : "ies"}{" "}
              selected
            </p>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                  boxShadow: "0 4px 20px rgba(245, 158, 11, 0.4)",
                }}
              >
                <Zap className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Experience Preferences</h2>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>
                Customize how you want to experience sessions
              </p>
            </div>

            {/* Adventure Level */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Adventure Level <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <div className="space-y-3">
                {adventureLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => setFormData({ ...formData, adventureLevel: level.id })}
                    className="w-full rounded-2xl p-4 border backdrop-blur-[18px] text-left transition-all active:scale-95 flex items-center gap-4"
                    style={{
                      background:
                        formData.adventureLevel === level.id
                          ? "rgba(79, 182, 255, 0.2)"
                          : "rgba(20, 25, 35, 0.65)",
                      borderColor:
                        formData.adventureLevel === level.id
                          ? "rgba(79, 182, 255, 0.6)"
                          : "rgba(255, 255, 255, 0.06)",
                      boxShadow:
                        formData.adventureLevel === level.id
                          ? "0 0 0 2px rgba(79, 182, 255, 0.4)"
                          : "0 4px 12px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <span className="text-3xl">{level.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{level.label}</p>
                      <p className="text-xs" style={{ color: "#9CA3AF" }}>
                        {level.description}
                      </p>
                    </div>
                    {formData.adventureLevel === level.id && (
                      <CheckCircle className="text-blue-400" size={20} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred View */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">Preferred View</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFormData({ ...formData, preferredView: "fpv" })}
                  className="rounded-2xl p-4 border backdrop-blur-[18px] text-center transition-all active:scale-95"
                  style={{
                    background:
                      formData.preferredView === "fpv"
                        ? "rgba(79, 182, 255, 0.2)"
                        : "rgba(20, 25, 35, 0.65)",
                    borderColor:
                      formData.preferredView === "fpv"
                        ? "rgba(79, 182, 255, 0.6)"
                        : "rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <Eye className="mx-auto mb-2" style={{ color: "#4FB6FF" }} size={24} />
                  <p className="font-semibold text-white text-sm">First-Person</p>
                  <p className="text-xs" style={{ color: "#7E8AA8" }}>
                    FPV
                  </p>
                </button>
                <button
                  onClick={() => setFormData({ ...formData, preferredView: "tpv" })}
                  className="rounded-2xl p-4 border backdrop-blur-[18px] text-center transition-all active:scale-95"
                  style={{
                    background:
                      formData.preferredView === "tpv"
                        ? "rgba(79, 182, 255, 0.2)"
                        : "rgba(20, 25, 35, 0.65)",
                    borderColor:
                      formData.preferredView === "tpv"
                        ? "rgba(79, 182, 255, 0.6)"
                        : "rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <Video className="mx-auto mb-2" style={{ color: "#4FB6FF" }} size={24} />
                  <p className="font-semibold text-white text-sm">Third-Person</p>
                  <p className="text-xs" style={{ color: "#7E8AA8" }}>
                    TPV
                  </p>
                </button>
              </div>
            </div>

            {/* Session Length */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Preferred Session Length
              </label>
              <div className="space-y-2">
                {[
                  { id: "short", label: "Quick (15-30 min)", icon: "⚡" },
                  { id: "medium", label: "Medium (30-60 min)", icon: "⏱️" },
                  { id: "long", label: "Extended (60+ min)", icon: "🕐" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setFormData({ ...formData, sessionLength: option.id })}
                    className="w-full rounded-xl p-3 border backdrop-blur-[18px] text-left transition-all active:scale-95 flex items-center justify-between"
                    style={{
                      background:
                        formData.sessionLength === option.id
                          ? "rgba(79, 182, 255, 0.15)"
                          : "rgba(20, 25, 35, 0.65)",
                      borderColor:
                        formData.sessionLength === option.id
                          ? "rgba(79, 182, 255, 0.4)"
                          : "rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{option.icon}</span>
                      <span className="text-sm text-white">{option.label}</span>
                    </div>
                    {formData.sessionLength === option.id && (
                      <CheckCircle className="text-blue-400" size={18} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  boxShadow: "0 4px 20px rgba(16, 185, 129, 0.4)",
                }}
              >
                <Languages className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Language Preferences</h2>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>
                Select languages you speak or understand
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang) => {
                const isSelected = formData.languages.includes(lang.id);
                return (
                  <button
                    key={lang.id}
                    onClick={() => toggleLanguage(lang.id)}
                    className="rounded-2xl p-4 border backdrop-blur-[18px] text-center transition-all active:scale-95"
                    style={{
                      background: isSelected
                        ? "rgba(16, 185, 129, 0.2)"
                        : "rgba(20, 25, 35, 0.65)",
                      borderColor: isSelected
                        ? "rgba(16, 185, 129, 0.6)"
                        : "rgba(255, 255, 255, 0.06)",
                      boxShadow: isSelected
                        ? "0 0 0 2px rgba(16, 185, 129, 0.4)"
                        : "0 4px 12px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <div className="text-3xl mb-2">{lang.flag}</div>
                    <p className="text-sm font-semibold text-white">{lang.label}</p>
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-center" style={{ color: "#7E8AA8" }}>
              {formData.languages.length} language{formData.languages.length === 1 ? "" : "s"}{" "}
              selected
            </p>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)",
                  boxShadow: "0 4px 20px rgba(139, 92, 246, 0.4)",
                }}
              >
                <DollarSign className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Budget & Payment</h2>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>
                Set your preferred budget range
              </p>
            </div>

            {/* Budget Range */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Budget Range <span style={{ color: "#EF4444" }}>*</span>
              </label>
              <div className="space-y-3">
                {budgetRanges.map((budget) => (
                  <button
                    key={budget.id}
                    onClick={() => setFormData({ ...formData, budgetRange: budget.id })}
                    className="w-full rounded-2xl p-4 border backdrop-blur-[18px] text-left transition-all active:scale-95 flex items-center gap-4"
                    style={{
                      background:
                        formData.budgetRange === budget.id
                          ? "rgba(139, 92, 246, 0.2)"
                          : "rgba(20, 25, 35, 0.65)",
                      borderColor:
                        formData.budgetRange === budget.id
                          ? "rgba(139, 92, 246, 0.6)"
                          : "rgba(255, 255, 255, 0.06)",
                      boxShadow:
                        formData.budgetRange === budget.id
                          ? "0 0 0 2px rgba(139, 92, 246, 0.4)"
                          : "0 4px 12px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <span className="text-3xl">{budget.icon}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-white">{budget.label}</p>
                      <p className="text-xs" style={{ color: "#9CA3AF" }}>
                        {budget.range}
                      </p>
                    </div>
                    {formData.budgetRange === budget.id && (
                      <CheckCircle className="text-purple-400" size={20} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Payment Method (Optional)
              </label>
              <div className="space-y-3">
                <button
                  onClick={() => setFormData({ ...formData, paymentMethod: "card" })}
                  className="w-full rounded-xl p-4 border backdrop-blur-[18px] text-left transition-all active:scale-95 flex items-center gap-3"
                  style={{
                    background:
                      formData.paymentMethod === "card"
                        ? "rgba(139, 92, 246, 0.15)"
                        : "rgba(20, 25, 35, 0.65)",
                    borderColor:
                      formData.paymentMethod === "card"
                        ? "rgba(139, 92, 246, 0.4)"
                        : "rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <CreditCard style={{ color: "#8B5CF6" }} size={20} />
                  <span className="text-sm text-white">Credit/Debit Card</span>
                  {formData.paymentMethod === "card" && (
                    <CheckCircle className="text-purple-400 ml-auto" size={18} />
                  )}
                </button>
                <p className="text-xs text-center" style={{ color: "#7E8AA8" }}>
                  You can add payment methods later in settings
                </p>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
                  boxShadow: "0 4px 20px rgba(6, 182, 212, 0.4)",
                }}
              >
                <Bell className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Notification Preferences</h2>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>
                Choose what updates you want to receive
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  key: "newAvatars",
                  icon: Sparkles,
                  label: "New Avatars",
                  description: "Get notified when new avatars join in your interests",
                },
                {
                  key: "favoritesLive",
                  icon: Heart,
                  label: "Favorites Go Live",
                  description: "Alert when your favorite avatars start streaming",
                },
                {
                  key: "sessionReminders",
                  icon: Clock,
                  label: "Session Reminders",
                  description: "Reminders for upcoming booked sessions",
                },
                {
                  key: "deals",
                  icon: Zap,
                  label: "Deals & Promotions",
                  description: "Special offers and discounts from avatars",
                },
                {
                  key: "messages",
                  icon: MessageCircle,
                  label: "Messages",
                  description: "New messages from avatars",
                },
              ].map((notification) => {
                const Icon = notification.icon;
                const isEnabled = formData.notifications[notification.key as keyof typeof formData.notifications];
                return (
                  <button
                    key={notification.key}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        notifications: {
                          ...formData.notifications,
                          [notification.key]: !isEnabled,
                        },
                      })
                    }
                    className="w-full rounded-2xl p-4 border backdrop-blur-[18px] text-left transition-all active:scale-95"
                    style={{
                      background: "rgba(20, 25, 35, 0.65)",
                      borderColor: "rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isEnabled
                            ? "rgba(6, 182, 212, 0.2)"
                            : "rgba(255, 255, 255, 0.05)",
                        }}
                      >
                        <Icon
                          size={20}
                          style={{ color: isEnabled ? "#06B6D4" : "#9CA3AF" }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm mb-1">
                          {notification.label}
                        </p>
                        <p className="text-xs" style={{ color: "#7E8AA8" }}>
                          {notification.description}
                        </p>
                      </div>
                      <div
                        className="w-12 h-6 rounded-full flex items-center transition-all flex-shrink-0"
                        style={{
                          background: isEnabled
                            ? "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)"
                            : "rgba(255, 255, 255, 0.1)",
                          padding: "2px",
                        }}
                      >
                        <motion.div
                          className="w-5 h-5 rounded-full bg-white"
                          animate={{ x: isEnabled ? 24 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
                  boxShadow: "0 4px 20px rgba(239, 68, 68, 0.4)",
                }}
              >
                <Shield className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Privacy & Safety</h2>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>
                Your safety and privacy are our priority
              </p>
            </div>

            {/* Profile Visibility */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Profile Visibility
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: "public",
                    label: "Public",
                    description: "Anyone can see your profile",
                    icon: Globe,
                  },
                  {
                    id: "private",
                    label: "Private",
                    description: "Only avatars you connect with can see details",
                    icon: Lock,
                  },
                ].map((option) => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() =>
                        setFormData({ ...formData, profileVisibility: option.id })
                      }
                      className="w-full rounded-xl p-4 border backdrop-blur-[18px] text-left transition-all active:scale-95 flex items-center gap-3"
                      style={{
                        background:
                          formData.profileVisibility === option.id
                            ? "rgba(79, 182, 255, 0.15)"
                            : "rgba(20, 25, 35, 0.65)",
                        borderColor:
                          formData.profileVisibility === option.id
                            ? "rgba(79, 182, 255, 0.4)"
                            : "rgba(255, 255, 255, 0.06)",
                      }}
                    >
                      <Icon style={{ color: "#9CA3AF" }} size={20} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{option.label}</p>
                        <p className="text-xs" style={{ color: "#7E8AA8" }}>
                          {option.description}
                        </p>
                      </div>
                      {formData.profileVisibility === option.id && (
                        <CheckCircle className="text-blue-400" size={18} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Age-Restricted Content */}
            <div
              className="rounded-2xl p-4 border backdrop-blur-[18px]"
              style={{
                background: "rgba(20, 25, 35, 0.65)",
                borderColor: "rgba(255, 255, 255, 0.06)",
              }}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.ageRestricted}
                  onChange={(e) =>
                    setFormData({ ...formData, ageRestricted: e.target.checked })
                  }
                  className="mt-1 rounded"
                  style={{ accentColor: "#4FB6FF" }}
                />
                <div>
                  <p className="text-sm font-medium text-white mb-1">
                    Filter Age-Restricted Content
                  </p>
                  <p className="text-xs" style={{ color: "#7E8AA8" }}>
                    Hide experiences marked as 18+ or mature
                  </p>
                </div>
              </label>
            </div>

            {/* Safety Agreement */}
            <div
              className="rounded-2xl p-4 border backdrop-blur-[18px]"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                borderColor: "rgba(239, 68, 68, 0.3)",
              }}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.safetyAgreement}
                  onChange={(e) =>
                    setFormData({ ...formData, safetyAgreement: e.target.checked })
                  }
                  className="mt-1 rounded"
                  style={{ accentColor: "#EF4444" }}
                  required
                />
                <div>
                  <p className="text-sm font-medium text-white mb-1">
                    Safety Guidelines <span style={{ color: "#EF4444" }}>*</span>
                  </p>
                  <p className="text-xs" style={{ color: "#B8C1D9" }}>
                    I understand and agree to follow CoTask's safety guidelines and community
                    standards
                  </p>
                </div>
              </label>
            </div>

            {/* Terms & Conditions */}
            <div
              className="rounded-2xl p-4 border backdrop-blur-[18px]"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                borderColor: "rgba(239, 68, 68, 0.3)",
              }}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) =>
                    setFormData({ ...formData, termsAccepted: e.target.checked })
                  }
                  className="mt-1 rounded"
                  style={{ accentColor: "#EF4444" }}
                  required
                />
                <div>
                  <p className="text-sm font-medium text-white mb-1">
                    Terms & Conditions <span style={{ color: "#EF4444" }}>*</span>
                  </p>
                  <p className="text-xs" style={{ color: "#B8C1D9" }}>
                    I agree to CoTask's{" "}
                    <button type="button" className="underline" style={{ color: "#4FB6FF" }}>
                      Terms of Service
                    </button>{" "}
                    and{" "}
                    <button type="button" className="underline" style={{ color: "#4FB6FF" }}>
                      Privacy Policy
                    </button>
                  </p>
                </div>
              </label>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                  boxShadow: "0 4px 20px rgba(245, 158, 11, 0.4)",
                }}
              >
                <Sparkles className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Your Goals</h2>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>
                What do you want to achieve with CoTask?
              </p>
            </div>

            <div className="space-y-3">
              {[
                { id: "explore", label: "🌍 Explore new places and cultures", color: "#3B82F6" },
                { id: "learn", label: "📚 Learn new skills and knowledge", color: "#10B981" },
                { id: "shop", label: "🛍️ Shop remotely with expert help", color: "#EC4899" },
                { id: "events", label: "🎉 Attend events I can't physically be at", color: "#8B5CF6" },
                { id: "connect", label: "🤝 Connect with interesting people", color: "#06B6D4" },
                { id: "decision", label: "✅ Make informed decisions before purchasing", color: "#F59E0B" },
                { id: "experience", label: "🎭 Have unique experiences", color: "#EF4444" },
                { id: "help", label: "💡 Get expert guidance on tasks", color: "#6366F1" },
              ].map((goal) => {
                const isSelected = formData.goals.includes(goal.id);
                return (
                  <button
                    key={goal.id}
                    onClick={() => toggleGoal(goal.id)}
                    className="w-full rounded-2xl p-4 border backdrop-blur-[18px] text-left transition-all active:scale-95 flex items-center justify-between"
                    style={{
                      background: isSelected
                        ? `${goal.color}20`
                        : "rgba(20, 25, 35, 0.65)",
                      borderColor: isSelected ? `${goal.color}60` : "rgba(255, 255, 255, 0.06)",
                      boxShadow: isSelected
                        ? `0 0 0 2px ${goal.color}40`
                        : "0 4px 12px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <span className="text-sm text-white">{goal.label}</span>
                    {isSelected && <CheckCircle style={{ color: goal.color }} size={20} />}
                  </button>
                );
              })}
            </div>

            <p className="text-xs text-center" style={{ color: "#7E8AA8" }}>
              Select at least one goal
            </p>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                  boxShadow: "0 4px 20px rgba(16, 185, 129, 0.4)",
                }}
              >
                <CheckCircle className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">You're All Set!</h2>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>
                Review your preferences before you start exploring
              </p>
            </div>

            {/* Summary Cards */}
            <div className="space-y-3">
              {/* Profile */}
              <div
                className="rounded-2xl p-4 border backdrop-blur-[18px]"
                style={{
                  background: "rgba(20, 25, 35, 0.65)",
                  borderColor: "rgba(255, 255, 255, 0.06)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <User style={{ color: "#4FB6FF" }} size={18} />
                  <h3 className="font-semibold text-white text-sm">Profile</h3>
                </div>
                <p className="text-xs" style={{ color: "#7E8AA8" }}>
                  {savedAccountInfo.name} • {formData.location}
                </p>
              </div>

              {/* Interests */}
              <div
                className="rounded-2xl p-4 border backdrop-blur-[18px]"
                style={{
                  background: "rgba(20, 25, 35, 0.65)",
                  borderColor: "rgba(255, 255, 255, 0.06)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Heart style={{ color: "#EC4899" }} size={18} />
                  <h3 className="font-semibold text-white text-sm">Interests</h3>
                </div>
                <p className="text-xs" style={{ color: "#7E8AA8" }}>
                  {formData.interests.length} categories selected
                </p>
              </div>

              {/* Preferences */}
              <div
                className="rounded-2xl p-4 border backdrop-blur-[18px]"
                style={{
                  background: "rgba(20, 25, 35, 0.65)",
                  borderColor: "rgba(255, 255, 255, 0.06)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Zap style={{ color: "#F59E0B" }} size={18} />
                  <h3 className="font-semibold text-white text-sm">Preferences</h3>
                </div>
                <p className="text-xs" style={{ color: "#7E8AA8" }}>
                  {adventureLevels.find((l) => l.id === formData.adventureLevel)?.label} •{" "}
                  {formData.preferredView.toUpperCase()} •{" "}
                  {budgetRanges.find((b) => b.id === formData.budgetRange)?.label}
                </p>
              </div>

              {/* Languages */}
              <div
                className="rounded-2xl p-4 border backdrop-blur-[18px]"
                style={{
                  background: "rgba(20, 25, 35, 0.65)",
                  borderColor: "rgba(255, 255, 255, 0.06)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Languages style={{ color: "#10B981" }} size={18} />
                  <h3 className="font-semibold text-white text-sm">Languages</h3>
                </div>
                <p className="text-xs" style={{ color: "#7E8AA8" }}>
                  {formData.languages.length} language{formData.languages.length > 1 ? "s" : ""}
                </p>
              </div>

              {/* Goals */}
              <div
                className="rounded-2xl p-4 border backdrop-blur-[18px]"
                style={{
                  background: "rgba(20, 25, 35, 0.65)",
                  borderColor: "rgba(255, 255, 255, 0.06)",
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Sparkles style={{ color: "#F59E0B" }} size={18} />
                  <h3 className="font-semibold text-white text-sm">Goals</h3>
                </div>
                <p className="text-xs" style={{ color: "#7E8AA8" }}>
                  {formData.goals.length} goal{formData.goals.length > 1 ? "s" : ""} selected
                </p>
              </div>
            </div>

            {/* Welcome Message */}
            <div
              className="rounded-2xl p-5 border backdrop-blur-[18px]"
              style={{
                background: "rgba(16, 185, 129, 0.1)",
                borderColor: "rgba(16, 185, 129, 0.3)",
              }}
            >
              <p className="text-sm text-center text-white mb-2">
                🎉 Welcome to the CoTask community!
              </p>
              <p className="text-xs text-center" style={{ color: "#B8C1D9" }}>
                Start exploring live experiences from avatars around the world
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
        }}
      />

      {/* Animated Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
        style={{ background: "rgba(79, 182, 255, 0.15)" }}
      />

      {/* Header */}
      <div
        className="sticky top-0 z-20 backdrop-blur-[18px] border-b"
        style={{
          background: "rgba(15, 23, 42, 0.9)",
          borderColor: "rgba(255, 255, 255, 0.06)",
        }}
      >
        <div className="max-w-2xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="w-10 h-10 border rounded-full flex items-center justify-center disabled:opacity-30 transition-all active:scale-95"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.06)",
              }}
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="text-center">
              <p className="text-xs font-medium" style={{ color: "#7E8AA8" }}>
                Step {currentStep} of {TOTAL_STEPS}
              </p>
            </div>
            <div className="w-10" /> {/* Spacer */}
          </div>

          {/* Progress Bar */}
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: "rgba(255, 255, 255, 0.1)" }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #4FB6FF 0%, #3B9FE8 100%)",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-8 flex gap-3">
          {currentStep < TOTAL_STEPS && (
            <button
              onClick={() => {
                // Skip to end
                setDirection(1);
                setCurrentStep(TOTAL_STEPS);
              }}
              className="px-6 py-3 rounded-2xl font-medium transition-all active:scale-95 text-sm"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                color: "#9CA3AF",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              Skip
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!isStepComplete()}
            className="flex-1 py-4 rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #4FB6FF 0%, #3B9FE8 100%)",
              color: "#FFFFFF",
              boxShadow: isStepComplete() ? "0 4px 20px rgba(79, 182, 255, 0.4)" : "none",
            }}
          >
            {currentStep === TOTAL_STEPS ? (
              <>
                <Sparkles size={20} />
                Start Exploring
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
