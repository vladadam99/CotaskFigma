import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Video, Camera, Sparkles, CheckCircle, Settings as SettingsIcon, TrendingUp } from "lucide-react";
import BottomNav from "./BottomNav";
import { useEffect, useState } from "react";

export default function AvatarHomeScreen() {
  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState(true);

  useEffect(() => {
    // Check if user has completed their first session
    const hasCompletedFirstSession = localStorage.getItem("avatarFirstSessionComplete");
    setIsNewUser(!hasCompletedFirstSession);
  }, []);

  // Get onboarding data to personalize welcome
  const onboardingData = JSON.parse(localStorage.getItem("avatarOnboardingData") || "{}");
  const accountInfo = JSON.parse(localStorage.getItem("avatarAccountInfo") || "{}");
  const userName = accountInfo.name?.split(" ")[0] || "there";

  if (isNewUser) {
    return (
      <div className="min-h-screen px-6 py-6 pb-24">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="text-yellow-400" size={28} />
            <h2 className="text-3xl font-bold text-white">Welcome, {userName}!</h2>
          </div>
          <p className="text-sm" style={{ color: "#9CA3AF" }}>
            Your profile is ready. Let's get you started! 🎉
          </p>
        </motion.div>

        {/* Profile Complete Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl p-6 mb-6 border backdrop-blur-[20px]"
          style={{
            background: "linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(153, 27, 27, 0.15) 100%)",
            borderColor: "rgba(220, 38, 38, 0.2)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(220, 38, 38, 0.1) inset",
          }}
        >
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(34, 197, 94, 0.2)", border: "1px solid rgba(34, 197, 94, 0.3)" }}
            >
              <CheckCircle className="text-green-400" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-1">Profile Complete!</h3>
              <p className="text-sm mb-3" style={{ color: "#D1D5DB" }}>
                Your avatar profile is now live on CoTask. Users can discover and book sessions with you.
              </p>
              {onboardingData.skills?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {onboardingData.skills.slice(0, 3).map((skill: string) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{
                        background: "rgba(220, 38, 38, 0.2)",
                        color: "#DC2626",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                  {onboardingData.skills.length > 3 && (
                    <span className="px-3 py-1 text-xs" style={{ color: "#9CA3AF" }}>
                      +{onboardingData.skills.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Getting Started Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Getting Started Checklist</h3>
          <div className="space-y-3">
            {/* Step 1: Profile Complete */}
            <div
              className="rounded-2xl p-4 border backdrop-blur-[20px]"
              style={{
                background: "rgba(45, 21, 21, 0.6)",
                borderColor: "rgba(255, 255, 255, 0.08)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="text-green-400" size={20} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">Complete your profile</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>
                    Done!
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Connect Device */}
            <button
              onClick={() => navigate("/connect-device")}
              className="w-full rounded-2xl p-4 border backdrop-blur-[20px] text-left active:scale-95 transition-transform"
              style={{
                background: "rgba(45, 21, 21, 0.6)",
                borderColor: "rgba(255, 255, 255, 0.08)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(220, 38, 38, 0.2)", border: "1px solid rgba(220, 38, 38, 0.3)" }}
                >
                  <Camera style={{ color: "#DC2626" }} size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">Connect your camera</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>
                    Setup your 360° device
                  </p>
                </div>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "rgba(220, 38, 38, 0.2)", color: "#DC2626" }}
                >
                  2
                </div>
              </div>
            </button>

            {/* Step 3: Go Live */}
            <div
              className="rounded-2xl p-4 border backdrop-blur-[20px]"
              style={{
                background: "rgba(45, 21, 21, 0.6)",
                borderColor: "rgba(255, 255, 255, 0.08)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(255, 255, 255, 0.05)" }}
                >
                  <Video style={{ color: "#9CA3AF" }} size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">Start your first stream</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>
                    Connect camera first
                  </p>
                </div>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "rgba(255, 255, 255, 0.05)", color: "#9CA3AF" }}
                >
                  3
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Action: Go Live (if device connected) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3 mb-8"
        >
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/go-live")}
            className="w-full text-white font-bold py-6 rounded-2xl flex items-center justify-center gap-3 border-0"
            style={{
              background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
              boxShadow: "0 8px 24px rgba(220, 38, 38, 0.5)",
            }}
          >
            <Video size={24} />
            <span className="text-lg font-semibold">Go Live Now</span>
          </motion.button>

          <p className="text-xs text-center" style={{ color: "#9CA3AF" }}>
            Make sure your camera is connected before going live
          </p>
        </motion.div>

        {/* Stats - Show zeros for new user */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-3 mb-8"
        >
          <div
            className="rounded-2xl p-4 border backdrop-blur-[20px] text-center"
            style={{
              background: "rgba(45, 21, 21, 0.6)",
              borderColor: "rgba(255, 255, 255, 0.08)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
            }}
          >
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>
              Sessions
            </p>
          </div>
          <div
            className="rounded-2xl p-4 border backdrop-blur-[20px] text-center"
            style={{
              background: "rgba(45, 21, 21, 0.6)",
              borderColor: "rgba(255, 255, 255, 0.08)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
            }}
          >
            <p className="text-2xl font-bold text-white">0</p>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>
              Viewers
            </p>
          </div>
          <div
            className="rounded-2xl p-4 border backdrop-blur-[20px] text-center"
            style={{
              background: "rgba(45, 21, 21, 0.6)",
              borderColor: "rgba(255, 255, 255, 0.08)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
            }}
          >
            <p className="text-2xl font-bold text-white">$0</p>
            <p className="text-xs" style={{ color: "#9CA3AF" }}>
              Earned
            </p>
          </div>
        </motion.div>

        {/* Tips for Success */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Tips for Success</h3>
          <div
            className="rounded-2xl p-5 border backdrop-blur-[20px]"
            style={{
              background: "rgba(45, 21, 21, 0.6)",
              borderColor: "rgba(255, 255, 255, 0.08)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
                <div>
                  <p className="text-sm font-medium text-white mb-1">Test your equipment first</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>
                    Make sure your camera, audio, and internet connection are working properly
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
                <div>
                  <p className="text-sm font-medium text-white mb-1">Be engaging and interactive</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>
                    Respond to viewer messages and make them feel part of the experience
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2" />
                <div>
                  <p className="text-sm font-medium text-white mb-1">Share your unique perspective</p>
                  <p className="text-xs" style={{ color: "#9CA3AF" }}>
                    Show viewers things they can't experience anywhere else
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <BottomNav />
      </div>
    );
  }

  // Existing dashboard for users who have completed sessions
  return (
    <div className="min-h-screen px-6 py-6 pb-24">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-1 text-white">Dashboard</h2>
        <p className="text-sm" style={{ color: "#9CA3AF" }}>Manage your sessions</p>
      </div>

      {/* Earnings Card */}
      <div 
        className="rounded-2xl p-6 mb-6 border backdrop-blur-[20px]"
        style={{ 
          background: "linear-gradient(135deg, rgba(220, 38, 38, 0.15) 0%, rgba(153, 27, 27, 0.15) 100%)",
          borderColor: "rgba(220, 38, 38, 0.2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(220, 38, 38, 0.1) inset"
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: "#D1D5DB" }}>Total Earnings</span>
          <TrendingUp style={{ color: "#22c55e" }} size={24} />
        </div>
        <p className="text-4xl font-bold text-white mb-1">$745</p>
        <p className="text-xs" style={{ color: "#9CA3AF" }}>This month • +23% from last month</p>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3 mb-8">
        {/* Connect Device */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/connect-device")}
          className="w-full backdrop-blur-[20px] rounded-2xl p-5 flex items-center gap-4 border active:scale-95 transition-transform"
          style={{ 
            background: "rgba(45, 21, 21, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
          }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(220, 38, 38, 0.2)", border: "1px solid rgba(220, 38, 38, 0.3)" }}>
            <Camera style={{ color: "#DC2626" }} size={24} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-base font-semibold text-white">Connect Device</p>
            <p className="text-sm" style={{ color: "#9CA3AF" }}>Setup your 360° camera</p>
          </div>
        </motion.button>

        {/* Go Live Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/go-live")}
          className="w-full text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 border-0"
          style={{ 
            background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)",
            boxShadow: "0 8px 24px rgba(220, 38, 38, 0.5)"
          }}
        >
          <Video size={24} />
          <span className="text-lg font-semibold">Go Live Now</span>
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div 
          className="rounded-2xl p-5 border backdrop-blur-[20px]"
          style={{ 
            background: "rgba(45, 21, 21, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)"
          }}
        >
          <Video style={{ color: "#9CA3AF" }} size={24} className="mb-3" />
          <p className="text-3xl font-bold text-white">24</p>
          <p className="text-xs" style={{ color: "#9CA3AF" }}>Total Sessions</p>
        </div>
        <div 
          className="rounded-2xl p-5 border backdrop-blur-[20px]"
          style={{ 
            background: "rgba(45, 21, 21, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)"
          }}
        >
          <TrendingUp className="text-green-400 mb-3" size={24} />
          <p className="text-3xl font-bold text-white">4.9</p>
          <p className="text-xs" style={{ color: "#9CA3AF" }}>Rating</p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}