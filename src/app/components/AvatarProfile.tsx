import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Video, 
  DollarSign, 
  Clock, 
  Bell, 
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
  Calendar,
  Award,
  Trophy,
  TrendingUp,
  Users,
  Settings,
  Wallet,
  Eye,
  Zap,
  BarChart3
} from "lucide-react";
import BottomNav from "./BottomNav";
import { AvatarLevelBadge } from "./ui/AvatarLevelBadge";

const recentStreams = [
  {
    id: 1,
    title: "Tokyo Night Walk",
    date: "March 8, 2026",
    duration: "2h 15m",
    earnings: 68,
    viewers: 23,
    rating: 4.9,
  },
  {
    id: 2,
    title: "Virtual Shopping Tour",
    date: "March 5, 2026",
    duration: "1h 30m",
    earnings: 45,
    viewers: 15,
    rating: 5.0,
  },
  {
    id: 3,
    title: "Museum Experience",
    date: "March 1, 2026",
    duration: "3h 00m",
    earnings: 90,
    viewers: 30,
    rating: 4.8,
  },
];

const menuItems = [
  {
    icon: Settings,
    label: "Account Settings",
    path: "/settings",
  },
  {
    icon: Wallet,
    label: "Earnings & Payouts",
    path: "/wallet",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    path: "/operator-dashboard",
  },
  {
    icon: Calendar,
    label: "Schedule",
    path: "/schedule",
  },
  {
    icon: Trophy,
    label: "Achievements",
    path: "/achievements",
  },
  {
    icon: Bell,
    label: "Notifications",
    path: "/notifications",
  },
];

export default function AvatarProfile() {
  const navigate = useNavigate();

  const avatar = {
    name: "Sarah Chen",
    username: "@sarahstreams",
    email: "sarah.chen@email.com",
    memberSince: "January 2026",
    level: 3,
    totalStreams: 42,
    totalEarnings: 2340,
    totalViewers: 856,
    averageRating: 4.9,
    followers: 234,
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-md mx-auto p-6 flex items-center gap-4">
          <button
            onClick={() => navigate("/operator-dashboard")}
            className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary/50 transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">Avatar Profile</h2>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 space-y-6 mt-6">
        {/* Avatar Info */}
        <div className="bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-600/10 border border-blue-500/20 rounded-2xl p-6 text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
            <span className="text-2xl font-semibold text-white">
              {avatar.name.split(" ").map(n => n[0]).join("")}
            </span>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold">{avatar.name}</h3>
            <p className="text-blue-500 text-sm font-medium">{avatar.username}</p>
            <p className="text-muted-foreground text-xs mt-1">{avatar.email}</p>
            <p className="text-muted-foreground text-xs">Streaming since {avatar.memberSince}</p>
          </div>

          {/* Level Badge */}
          <div className="flex justify-center">
            <AvatarLevelBadge level={avatar.level} showName size="lg" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-blue-500/20">
            <div>
              <p className="text-xl font-semibold text-blue-500">{avatar.totalStreams}</p>
              <p className="text-xs text-muted-foreground">Streams</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-blue-500">{avatar.followers}</p>
              <p className="text-xs text-muted-foreground">Followers</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <p className="text-xl font-semibold text-blue-500">{avatar.averageRating}</p>
              </div>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
          </div>

          {/* Earnings Highlight */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-4 mt-4">
            <div className="flex items-center justify-between text-white">
              <div className="text-left">
                <p className="text-sm opacity-90">Total Earnings</p>
                <p className="text-2xl font-bold">${avatar.totalEarnings}</p>
              </div>
              <DollarSign className="w-10 h-10 opacity-80" />
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="text-blue-500" size={20} />
              <p className="text-sm text-muted-foreground">Total Views</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{avatar.totalViewers}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-green-500" size={20} />
              <p className="text-sm text-muted-foreground">Avg. Duration</p>
            </div>
            <p className="text-2xl font-bold text-foreground">2.1h</p>
          </div>
        </div>

        {/* Recent Streams */}
        <div className="bg-card border border-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Video className="text-blue-500" size={20} />
              Recent Streams
            </h3>
            <button 
              onClick={() => navigate("/operator-dashboard")}
              className="text-sm text-primary hover:underline"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentStreams.map((stream) => (
              <div key={stream.id} className="flex items-center justify-between p-3 bg-secondary rounded-xl hover:bg-secondary/80 transition-all">
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">{stream.title}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {stream.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} />
                      {stream.viewers}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="fill-yellow-500 text-yellow-500" size={12} />
                      {stream.rating}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-500 text-sm">${stream.earnings}</p>
                  <p className="text-xs text-muted-foreground">{stream.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 p-4 hover:bg-secondary transition-all ${
                index !== menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <item.icon className="text-blue-500" size={20} />
              </div>
              <span className="flex-1 text-left font-medium text-foreground">{item.label}</span>
              <ChevronRight className="text-muted-foreground" size={20} />
            </button>
          ))}
        </div>

        {/* Help & Support */}
        <button
          onClick={() => navigate("/help")}
          className="w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:bg-secondary transition-all"
        >
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <HelpCircle className="text-primary" size={20} />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium text-foreground">Help & Support</p>
            <p className="text-sm text-muted-foreground">Get help with streaming</p>
          </div>
          <ChevronRight className="text-muted-foreground" size={20} />
        </button>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem('userRole');
            navigate("/role-selection");
          }}
          className="w-full bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl p-4 flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all font-medium"
        >
          <LogOut size={20} />
          Log Out
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
