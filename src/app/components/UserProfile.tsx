import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  User, 
  CreditCard, 
  Clock, 
  Bell, 
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
  Calendar,
  Award,
  Trophy,
  Zap,
  Heart,
  Settings,
  Wallet,
  Bookmark,
  Sparkles,
  CheckCircle,
  Search,
  Video
} from "lucide-react";
import BottomNav from "./BottomNav";
import { useEffect, useState } from "react";

const recentSessions = [
  {
    id: 1,
    operatorName: "Sarah Chen",
    date: "March 8, 2026",
    duration: "1h 23m",
    price: 30,
    rating: 5,
  },
  {
    id: 2,
    operatorName: "Marcus Stone",
    date: "March 5, 2026",
    duration: "2h 15m",
    price: 45,
    rating: 5,
  },
  {
    id: 3,
    operatorName: "Elena Rodriguez",
    date: "March 1, 2026",
    duration: "1h 45m",
    price: 35,
    rating: 4,
  },
];

const menuItems = [
  {
    icon: Wallet,
    label: "Wallet",
    path: "/wallet",
  },
  {
    icon: Calendar,
    label: "Bookings",
    path: "/bookings",
  },
  {
    icon: Heart,
    label: "Favorites",
    path: "/favorites",
  },
  {
    icon: Bookmark,
    label: "Saved Sessions",
    path: "/saved",
  },
];

export default function UserProfile() {
  const navigate = useNavigate();
  const [isNewUser, setIsNewUser] = useState(true);

  useEffect(() => {
    // Check if user has completed their first session
    const hasCompletedFirstSession = localStorage.getItem("userFirstSessionComplete");
    setIsNewUser(!hasCompletedFirstSession);
  }, []);

  // Get user info from localStorage or use defaults
  const userInfo = JSON.parse(localStorage.getItem("userAccountInfo") || "{}");
  const userName = userInfo.name?.split(" ")[0] || "there";

  const user = {
    name: userInfo.name || "Alex Johnson",
    email: userInfo.email || "alex.johnson@email.com",
    memberSince: "January 2026",
    totalSessions: 12,
    totalSpent: 380,
    achievements: 8,
    favoriteOperators: 5,
  };

  // First-time user experience
  if (isNewUser) {
    return (
      <div className="min-h-screen pb-24">
        {/* Header */}
        <div 
          className="sticky top-0 z-10 backdrop-blur-[18px] border-b"
          style={{
            background: "rgba(20, 25, 35, 0.9)",
            borderColor: "rgba(255, 255, 255, 0.06)"
          }}
        >
          <div className="max-w-md mx-auto p-6 flex items-center gap-4">
            <button
              onClick={() => navigate("/home")}
              className="w-10 h-10 border rounded-full flex items-center justify-center active:scale-95 transition-all"
              style={{ background: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(255, 255, 255, 0.06)" }}
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h2 className="text-[20px] font-semibold text-white">Profile</h2>
          </div>
        </div>

        <div className="max-w-md mx-auto px-6 space-y-6 mt-8">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="text-blue-400" size={28} />
              <h2 className="text-2xl font-bold text-white">Welcome, {userName}!</h2>
            </div>
            <p className="text-sm" style={{ color: "#B8C1D9" }}>
              Your profile is ready. Start exploring live experiences! 🎉
            </p>
          </motion.div>

          {/* User Info Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-6 text-center space-y-4 border backdrop-blur-[18px]" 
            style={{ 
              background: "rgba(20, 25, 35, 0.65)",
              borderColor: "rgba(255, 255, 255, 0.06)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(79, 182, 255, 0.05) inset"
            }}
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto border-2" style={{ background: "linear-gradient(135deg, rgba(79, 182, 255, 0.2), rgba(139, 198, 255, 0.1))", borderColor: "rgba(79, 182, 255, 0.3)" }}>
              <span className="text-[28px] font-bold text-white">
                {user.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            
            <div>
              <h3 className="text-[20px] font-semibold text-white">{user.name}</h3>
              <p className="text-[13px]" style={{ color: "#B8C1D9" }}>{user.email}</p>
              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full" style={{ background: "rgba(34, 197, 94, 0.2)", border: "1px solid rgba(34, 197, 94, 0.3)" }}>
                <CheckCircle className="text-green-400" size={14} />
                <span className="text-xs font-medium text-green-400">Account Active</span>
              </div>
            </div>

            {/* Stats - Show zeros for new user */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t" style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}>
              <div>
                <p className="text-[20px] font-semibold text-white">0</p>
                <p className="text-[11px]" style={{ color: "#7E8AA8" }}>Sessions</p>
              </div>
              <div>
                <p className="text-[20px] font-semibold text-white">0</p>
                <p className="text-[11px]" style={{ color: "#7E8AA8" }}>Favorites</p>
              </div>
              <div>
                <p className="text-[20px] font-semibold text-white">$0</p>
                <p className="text-[11px]" style={{ color: "#7E8AA8" }}>Spent</p>
              </div>
            </div>
          </motion.div>

          {/* Getting Started Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Getting Started</h3>
            <div className="space-y-3">
              {/* Step 1: Profile Complete */}
              <div
                className="rounded-2xl p-4 border backdrop-blur-[18px]"
                style={{
                  background: "rgba(20, 25, 35, 0.65)",
                  borderColor: "rgba(255, 255, 255, 0.06)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-green-400" size={20} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">Create your account</p>
                    <p className="text-xs" style={{ color: "#7E8AA8" }}>Done!</p>
                  </div>
                </div>
              </div>

              {/* Step 2: Browse Avatars */}
              <button
                onClick={() => navigate("/home")}
                className="w-full rounded-2xl p-4 border backdrop-blur-[18px] text-left active:scale-95 transition-transform"
                style={{
                  background: "rgba(20, 25, 35, 0.65)",
                  borderColor: "rgba(255, 255, 255, 0.06)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(79, 182, 255, 0.2)", border: "1px solid rgba(79, 182, 255, 0.3)" }}
                  >
                    <Search style={{ color: "#4FB6FF" }} size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">Explore live avatars</p>
                    <p className="text-xs" style={{ color: "#7E8AA8" }}>Browse available experiences</p>
                  </div>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "rgba(79, 182, 255, 0.2)", color: "#4FB6FF" }}
                  >
                    2
                  </div>
                </div>
              </button>

              {/* Step 3: Join First Session */}
              <div
                className="rounded-2xl p-4 border backdrop-blur-[18px]"
                style={{
                  background: "rgba(20, 25, 35, 0.65)",
                  borderColor: "rgba(255, 255, 255, 0.06)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(255, 255, 255, 0.05)" }}
                  >
                    <Video style={{ color: "#7E8AA8" }} size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">Join your first session</p>
                    <p className="text-xs" style={{ color: "#7E8AA8" }}>Connect with a live avatar</p>
                  </div>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: "rgba(255, 255, 255, 0.05)", color: "#7E8AA8" }}
                  >
                    3
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Search, label: "Browse Avatars", path: "/home", color: "#4FB6FF" },
                { icon: Heart, label: "Favorites", path: "/favorites", color: "#EC4899" },
                { icon: Wallet, label: "Wallet", path: "/wallet", color: "#10B981" },
                { icon: Settings, label: "Settings", path: "/settings", color: "#9CA3AF" },
              ].map((action, index) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={index}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(action.path)}
                    className="rounded-2xl p-4 border backdrop-blur-[18px] flex flex-col items-center gap-2 active:scale-95 transition-transform"
                    style={{
                      background: "rgba(20, 25, 35, 0.65)",
                      borderColor: "rgba(255, 255, 255, 0.06)",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ 
                        background: `${action.color}20`,
                        border: `1px solid ${action.color}30`
                      }}
                    >
                      <Icon style={{ color: action.color }} size={24} />
                    </div>
                    <span className="text-sm font-medium text-white">{action.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Tips for Users */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Tips for a Great Experience</h3>
            <div
              className="rounded-2xl p-5 border backdrop-blur-[18px]"
              style={{
                background: "rgba(20, 25, 35, 0.65)",
                borderColor: "rgba(255, 255, 255, 0.06)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Check avatar ratings</p>
                    <p className="text-xs" style={{ color: "#7E8AA8" }}>
                      Look for highly-rated avatars with positive reviews
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Use chat to communicate</p>
                    <p className="text-xs" style={{ color: "#7E8AA8" }}>
                      Ask questions and guide the avatar to show you what you want to see
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
                  <div>
                    <p className="text-sm font-medium text-white mb-1">Switch between views</p>
                    <p className="text-xs" style={{ color: "#7E8AA8" }}>
                      Use FPV (first-person) and TPV (third-person) modes for different perspectives
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Logout */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              localStorage.removeItem('userRole');
              localStorage.removeItem('userAccountInfo');
              navigate("/role-selection");
            }}
            className="w-full bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl p-4 font-medium flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all backdrop-blur-xl"
          >
            <LogOut className="w-5 h-5" />
            Log Out
          </motion.button>
        </div>
        <BottomNav />
      </div>
    );
  }

  // Existing profile for returning users
  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div 
        className="sticky top-0 z-10 backdrop-blur-[18px] border-b"
        style={{
          background: "rgba(20, 25, 35, 0.9)",
          borderColor: "rgba(255, 255, 255, 0.06)"
        }}
      >
        <div className="max-w-md mx-auto p-6 flex items-center gap-4">
          <button
            onClick={() => navigate("/home")}
            className="w-10 h-10 border rounded-full flex items-center justify-center active:scale-95 transition-all"
            style={{ background: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(255, 255, 255, 0.06)" }}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-[20px] font-semibold text-white">Profile</h2>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 space-y-6 mt-8">
        {/* User Info */}
        <div 
          className="rounded-2xl p-6 text-center space-y-4 border backdrop-blur-[18px]" 
          style={{ 
            background: "rgba(20, 25, 35, 0.65)",
            borderColor: "rgba(255, 255, 255, 0.06)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(79, 182, 255, 0.05) inset"
          }}
        >
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto border-2" style={{ background: "linear-gradient(135deg, rgba(79, 182, 255, 0.2), rgba(139, 198, 255, 0.1))", borderColor: "rgba(79, 182, 255, 0.3)" }}>
            <span className="text-[28px] font-bold text-white">
              {user.name.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          
          <div>
            <h3 className="text-[20px] font-semibold text-white">{user.name}</h3>
            <p className="text-[13px]" style={{ color: "#B8C1D9" }}>{user.email}</p>
            <p className="text-[11px] mt-1" style={{ color: "#7E8AA8" }}>Member since {user.memberSince}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t" style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}>
            <div>
              <p className="text-[20px] font-semibold text-white">{user.totalSessions}</p>
              <p className="text-[11px]" style={{ color: "#7E8AA8" }}>Sessions</p>
            </div>
            <div>
              <p className="text-[20px] font-semibold text-white">{user.achievements}</p>
              <p className="text-[11px]" style={{ color: "#7E8AA8" }}>Achievements</p>
            </div>
            <div>
              <p className="text-[20px] font-semibold text-white">${user.totalSpent}</p>
              <p className="text-[11px]" style={{ color: "#7E8AA8" }}>Total Spent</p>
            </div>
          </div>
        </div>

        {/* Quick Achievements Preview */}
        <div 
          className="rounded-2xl p-4 border backdrop-blur-[18px]" 
          style={{ 
            background: "rgba(20, 25, 35, 0.65)",
            borderColor: "rgba(255, 255, 255, 0.06)",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)"
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Trophy className="text-white/90" size={20} />
              Recent Achievements
            </h3>
            <button 
              onClick={() => navigate("/achievements")}
              className="text-sm text-white/80 hover:text-white"
            >
              View All
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { icon: Star, label: "First Session", unlocked: true },
              { icon: Zap, label: "5 Sessions", unlocked: true },
              { icon: Trophy, label: "Top Rated", unlocked: true },
              { icon: Award, label: "Explorer", unlocked: false },
            ].map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: achievement.unlocked ? 1.05 : 1 }}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center gap-1 ${
                    achievement.unlocked
                      ? "bg-white/10 backdrop-blur-sm border border-white/20"
                      : "bg-white/5 border border-white/10 opacity-40"
                  }`}
                >
                  <Icon 
                    className={achievement.unlocked ? "text-white" : "text-white/40"} 
                    size={20} 
                  />
                  <span className="text-[10px] text-center leading-tight text-white/70">
                    {achievement.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Recent Sessions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Recent Sessions</h3>
            <button className="text-sm text-white/80 hover:text-white">View All</button>
          </div>

          <div className="space-y-3">
            {recentSessions.map((session) => (
              <motion.div
                key={session.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/summary/${session.id}`)}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium text-white">{session.operatorName}</p>
                    <div className="flex items-center gap-3 text-sm text-white/60 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {session.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {session.duration}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">${session.price}</p>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(session.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                whileTap={{ scale: 0.98 }}
                onClick={() => item.path && navigate(item.path)}
                className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center gap-4 hover:border-white/20 transition-all text-left"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white/90" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">{item.label}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/60" />
              </motion.button>
            );
          })}
        </div>

        {/* Logout */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            localStorage.removeItem('userRole');
            navigate("/role-selection");
          }}
          className="w-full bg-red-500/10 text-red-400 border border-red-500/20 rounded-2xl p-4 font-medium flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all backdrop-blur-xl"
        >
          <LogOut className="w-5 h-5" />
          Log Out
        </motion.button>
      </div>
      <BottomNav />
    </div>
  );
}