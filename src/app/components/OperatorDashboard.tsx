import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Calendar,
  Clock,
  Star,
  Users,
  Video,
  Zap,
  Award,
  MessageCircle,
  Bell,
  Settings,
  BarChart3,
  Target,
  Smartphone,
  Glasses,
  Camera,
  Wifi,
  Battery,
  Signal,
  Play,
  MapPin,
  CheckCircle,
  XCircle,
  Eye,
  TrendingDown,
  Flame,
  Trophy,
  Gift,
  Circle,
  User, // User icon for profile navigation
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import BottomNav from "./BottomNav";

interface Mission {
  id: string;
  title: string;
  location: string;
  duration: string;
  payment: number;
  requestedBy: string;
  userImage: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  deadline: string;
}

interface UpcomingSession {
  id: string;
  userName: string;
  userImage: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  location: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  reward: string;
  icon: string;
}

export default function OperatorDashboard() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<"phone" | "glasses" | "360">("phone");
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "missions" | "schedule" | "earnings" | "level"
  >("dashboard");

  const stats = {
    todayEarnings: 245,
    weeklyEarnings: 1820,
    sessionsCompleted: 42,
    activeViewers: isOnline ? 127 : 0,
    rating: 4.9,
    level: 42,
    xp: 18750,
    nextLevelXp: 20000,
  };

  const missions: Mission[] = [
    {
      id: "1",
      title: "Show me the new iPhone at Apple Store",
      location: "Apple Fifth Avenue, NYC",
      duration: "30 min",
      payment: 45,
      requestedBy: "Tech Enthusiast",
      userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      category: "Shopping",
      difficulty: "easy",
      deadline: "In 2 hours",
    },
    {
      id: "2",
      title: "Virtual tour of Shibuya Crossing",
      location: "Tokyo, Japan",
      duration: "1 hour",
      payment: 80,
      requestedBy: "Travel Corp",
      userImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
      category: "Tours",
      difficulty: "medium",
      deadline: "Tomorrow 10 AM",
    },
    {
      id: "3",
      title: "Explore luxury car showroom",
      location: "Ferrari Showroom, Dubai",
      duration: "45 min",
      payment: 120,
      requestedBy: "Auto Dealer",
      userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      category: "Shopping",
      difficulty: "hard",
      deadline: "Today 6 PM",
    },
  ];

  const upcomingSessions: UpcomingSession[] = [
    {
      id: "1",
      userName: "Alex Johnson",
      userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      date: "March 10, 2026",
      time: "2:00 PM",
      duration: "1 hour",
      price: 25,
      location: "Tokyo Tower Tour",
    },
    {
      id: "2",
      userName: "Sarah Williams",
      userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      date: "March 11, 2026",
      time: "10:00 AM",
      duration: "2 hours",
      price: 50,
      location: "Museum Visit",
    },
    {
      id: "3",
      userName: "Michael Chen",
      userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      date: "March 11, 2026",
      time: "4:00 PM",
      duration: "30 min",
      price: 15,
      location: "Shopping District",
    },
  ];

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "Rising Star",
      description: "Complete 50 sessions",
      progress: 42,
      total: 50,
      reward: "+500 XP",
      icon: "🌟",
    },
    {
      id: "2",
      title: "5-Star Master",
      description: "Maintain 4.9+ rating for 30 days",
      progress: 22,
      total: 30,
      reward: "+1000 XP + Badge",
      icon: "⭐",
    },
    {
      id: "3",
      title: "Crowd Pleaser",
      description: "Get 1000 total viewers",
      progress: 847,
      total: 1000,
      reward: "+750 XP",
      icon: "👥",
    },
  ];

  const difficultyColor = {
    easy: "bg-green-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500",
  };

  const handleStartLive = () => {
    if (!isOnline) {
      setIsOnline(true);
      // Navigate to live session
      setTimeout(() => {
        navigate("/session/live");
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/role-selection")}
                className="p-2 rounded-xl hover:bg-secondary transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  Creator Studio
                </h2>
                <p className="text-sm text-muted-foreground">Welcome back, Sarah</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/notifications")}
                className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary/50 transition-all relative"
              >
                <Bell size={20} />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs font-bold">
                  5
                </div>
              </button>
              <button
                onClick={() => navigate("/settings")}
                className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary/50 transition-all"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>

          {/* Level Badge & Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="backdrop-blur-[20px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.12)] rounded-[18px] p-3" style={{ boxShadow: "0 10px 40px rgba(0, 0, 0, 0.45)" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <Award className="text-white/90" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-white/60">Level</p>
                    <p className="text-2xl font-bold text-white">{stats.level}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Creator Dashboard</h3>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Star className="text-yellow-400 fill-yellow-400" size={14} />
                  <span className="font-semibold text-white/80">{stats.rating}</span>
                  <span>•</span>
                  <span>{stats.sessionsCompleted} sessions</span>
                </div>
              </div>
            </div>

            {/* Online Toggle */}
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`px-5 py-2.5 rounded-[16px] font-semibold transition-all flex items-center gap-2 ${
                isOnline
                  ? "bg-green-500 text-white"
                  : "backdrop-blur-[20px] bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.12)] text-white"
              }`}
              style={isOnline ? { boxShadow: "0 10px 40px rgba(34, 197, 94, 0.3)" } : { boxShadow: "0 10px 40px rgba(0, 0, 0, 0.45)" }}
            >
              <Circle
                className={isOnline ? "fill-white" : ""}
                size={12}
              />
              {isOnline ? "Online" : "Offline"}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {[
            { id: "dashboard", label: "Dashboard", icon: BarChart3 },
            { id: "missions", label: "Missions", icon: Target },
            { id: "schedule", label: "Schedule", icon: Calendar },
            { id: "earnings", label: "Earnings", icon: DollarSign },
            { id: "level", label: "Level Up", icon: Trophy },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/50"
                  : "bg-card border border-border text-foreground hover:border-primary/50"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <AnimatePresence mode="wait">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Start Live Session */}
              <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 border-2 border-primary/50 rounded-3xl p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {isOnline ? "You're Live!" : "Ready to Go Live?"}
                  </h3>
                  <p className="text-muted-foreground">
                    {isOnline
                      ? `${stats.activeViewers} viewers are watching you`
                      : "Start streaming to connect with viewers worldwide"}
                  </p>
                </div>

                {!isOnline && (
                  <>
                    {/* Device Selection */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      {[
                        { id: "phone", icon: Smartphone, label: "Phone" },
                        { id: "glasses", icon: Glasses, label: "Smart Glasses" },
                        { id: "360", icon: Camera, label: "360° Camera" },
                      ].map((device) => (
                        <button
                          key={device.id}
                          onClick={() => setSelectedDevice(device.id as any)}
                          className={`p-4 rounded-2xl border-2 transition-all ${
                            selectedDevice === device.id
                              ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/50"
                              : "bg-card border-border text-foreground hover:border-primary/50"
                          }`}
                        >
                          <device.icon className="mx-auto mb-2" size={28} />
                          <p className="text-xs font-semibold">{device.label}</p>
                        </button>
                      ))}
                    </div>

                    {/* Equipment Status */}
                    <div className="bg-background/50 backdrop-blur-xl border border-border rounded-2xl p-4 mb-6">
                      <p className="text-sm font-semibold text-foreground mb-3">
                        Equipment Status
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <Camera size={16} className="text-muted-foreground" />
                          <span className="text-muted-foreground">Ready</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Battery className="text-green-500" size={16} />
                          <span className="text-foreground font-semibold">85%</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Signal className="text-green-500" size={16} />
                          <span className="text-foreground font-semibold">5G</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <motion.button
                  onClick={handleStartLive}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-5 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                    isOnline
                      ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-2xl shadow-red-500/50 animate-pulse"
                      : "bg-gradient-to-r from-primary to-blue-500 text-white shadow-2xl shadow-primary/50"
                  }`}
                >
                  {isOnline ? (
                    <>
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                      Broadcasting Live
                    </>
                  ) : (
                    <>
                      <Zap className="fill-white" size={24} />
                      Start Live Session
                    </>
                  )}
                </motion.button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                      <DollarSign className="text-green-500" size={24} />
                    </div>
                    <TrendingUp className="text-green-500" size={18} />
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">
                    ${stats.todayEarnings}
                  </p>
                  <p className="text-sm text-muted-foreground">Today's Earnings</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Users className="text-primary" size={24} />
                    </div>
                    <Flame className="text-orange-500" size={18} />
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">
                    {isOnline ? stats.activeViewers : stats.sessionsCompleted}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isOnline ? "Active Viewers" : "Sessions Done"}
                  </p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <BarChart3 className="text-blue-500" size={24} />
                    </div>
                    <TrendingUp className="text-blue-500" size={18} />
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">
                    ${stats.weeklyEarnings}
                  </p>
                  <p className="text-sm text-muted-foreground">This Week</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                      <Star className="text-yellow-500 fill-yellow-500" size={24} />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">
                      TOP 10%
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">{stats.rating}</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
              </div>

              {/* Upcoming Sessions Preview */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <Calendar className="text-primary" size={20} />
                    Next Sessions
                  </h3>
                  <button
                    onClick={() => setActiveTab("schedule")}
                    className="text-sm text-primary font-semibold"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-3">
                  {upcomingSessions.slice(0, 2).map((session) => (
                    <div
                      key={session.id}
                      className="bg-card border border-border rounded-2xl p-4 hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <img
                          src={session.userImage}
                          alt={session.userName}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{session.userName}</h4>
                          <p className="text-sm text-muted-foreground">{session.location}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">${session.price}</p>
                          <p className="text-xs text-muted-foreground">{session.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{session.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Missions Tab */}
          {activeTab === "missions" && (
            <motion.div
              key="missions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Target className="text-primary" size={24} />
                  Available Missions
                </h3>
                <div className="bg-primary/10 px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-primary">
                    {missions.length} Active
                  </span>
                </div>
              </div>

              {missions.map((mission) => (
                <div
                  key={mission.id}
                  className="bg-card border border-border rounded-2xl p-5 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 ${
                            difficultyColor[mission.difficulty]
                          } text-white text-xs font-bold rounded-full capitalize`}
                        >
                          {mission.difficulty}
                        </span>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {mission.category}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-foreground mb-2">{mission.title}</h4>
                      <div className="space-y-1 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          <span>{mission.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          <span>{mission.duration} • Deadline: {mission.deadline}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={mission.userImage}
                        alt={mission.requestedBy}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs text-muted-foreground">Requested by</p>
                        <p className="text-sm font-semibold text-foreground">
                          {mission.requestedBy}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">${mission.payment}</p>
                      <button className="mt-2 px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all">
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Schedule Tab */}
          {activeTab === "schedule" && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Calendar className="text-primary" size={24} />
                  Upcoming Sessions
                </h3>
                <div className="bg-primary/10 px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-primary">
                    {upcomingSessions.length} Booked
                  </span>
                </div>
              </div>

              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-card border border-border rounded-2xl p-5 hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={session.userImage}
                      alt={session.userName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-foreground mb-1">
                        {session.userName}
                      </h4>
                      <p className="text-sm text-muted-foreground">{session.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">${session.price}</p>
                      <p className="text-xs text-muted-foreground">{session.duration}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-background/50 rounded-xl p-3">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Calendar size={14} />
                        <span className="text-xs font-medium">Date</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{session.date}</p>
                    </div>
                    <div className="bg-background/50 rounded-xl p-3">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Clock size={14} />
                        <span className="text-xs font-medium">Time</span>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{session.time}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-2 bg-secondary text-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-all">
                      Message
                    </button>
                    <button className="py-2 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Earnings Tab */}
          {activeTab === "earnings" && (
            <motion.div
              key="earnings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 border-2 border-primary/50 rounded-3xl p-8">
                <div className="text-center mb-6">
                  <p className="text-sm text-muted-foreground mb-2">Total Earnings</p>
                  <h2 className="text-5xl font-bold text-foreground mb-4">
                    ${stats.weeklyEarnings}
                  </h2>
                  <div className="flex items-center justify-center gap-2 text-green-500">
                    <TrendingUp size={18} />
                    <span className="font-semibold">+24% from last week</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground mb-1">
                      ${stats.todayEarnings}
                    </p>
                    <p className="text-xs text-muted-foreground">Today</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground mb-1">
                      ${stats.weeklyEarnings}
                    </p>
                    <p className="text-xs text-muted-foreground">This Week</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-foreground mb-1">
                      ${stats.weeklyEarnings * 4}
                    </p>
                    <p className="text-xs text-muted-foreground">This Month</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Performance Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Sessions Completed</span>
                      <span className="text-sm font-bold text-foreground">
                        {stats.sessionsCompleted}/50
                      </span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-blue-500"
                        style={{ width: `${(stats.sessionsCompleted / 50) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Average Session Time</span>
                      <span className="text-sm font-bold text-foreground">42 min</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        style={{ width: "70%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Client Satisfaction</span>
                      <span className="text-sm font-bold text-foreground">98%</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
                        style={{ width: "98%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Level Tab */}
          {activeTab === "level" && (
            <motion.div
              key="level"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Level Progress */}
              <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 border-2 border-primary/50 rounded-3xl p-8">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-primary/50">
                    <Award className="text-white" size={48} />
                  </div>
                  <h2 className="text-4xl font-bold text-foreground mb-2">Level {stats.level}</h2>
                  <p className="text-muted-foreground mb-4">Elite Avatar</p>
                  <div className="flex items-center justify-center gap-2 text-primary">
                    <Zap className="fill-primary" size={18} />
                    <span className="font-semibold">
                      {stats.xp.toLocaleString()} / {stats.nextLevelXp.toLocaleString()} XP
                    </span>
                  </div>
                </div>

                <div className="w-full h-4 bg-secondary rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-blue-500 transition-all duration-500"
                    style={{ width: `${(stats.xp / stats.nextLevelXp) * 100}%` }}
                  />
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  {stats.nextLevelXp - stats.xp} XP to Level {stats.level + 1}
                </p>
              </div>

              {/* Achievements */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Trophy className="text-primary" size={24} />
                    Achievements
                  </h3>
                </div>

                <div className="space-y-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="bg-card border border-border rounded-2xl p-5 hover:border-primary/50 transition-all"
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-blue-500/20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-foreground mb-1">
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            {achievement.description}
                          </p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary to-blue-500"
                                style={{
                                  width: `${(achievement.progress / achievement.total) * 100}%`,
                                }}
                              />
                            </div>
                            <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap">
                              {achievement.progress}/{achievement.total}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="bg-primary/10 px-3 py-1 rounded-full">
                            <span className="text-sm font-bold text-primary">
                              {achievement.reward}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Level Rewards */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Gift className="text-primary" size={20} />
                  Level {stats.level + 1} Rewards
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-background/50 rounded-xl">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Zap className="text-primary fill-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">+2000 XP Bonus</p>
                      <p className="text-xs text-muted-foreground">Level up reward</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-background/50 rounded-xl">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Award className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Exclusive Badge</p>
                      <p className="text-xs text-muted-foreground">Show off your rank</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-background/50 rounded-xl">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <DollarSign className="text-primary" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Higher Rates</p>
                      <p className="text-xs text-muted-foreground">Unlock premium pricing</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}