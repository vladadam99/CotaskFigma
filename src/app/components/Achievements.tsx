import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Star,
  Trophy,
  Award,
  Zap,
  Heart,
  Target,
  Globe,
  Users,
  MessageCircle,
  Camera,
  Crown,
  Shield,
  Sparkles,
  Lock,
} from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: any;
  unlocked: boolean;
  progress?: { current: number; total: number };
  unlockedDate?: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  xpReward: number;
}

export default function Achievements() {
  const navigate = useNavigate();

  const achievements: Achievement[] = [
    {
      id: "first-session",
      name: "First Steps",
      description: "Complete your first session",
      icon: Star,
      unlocked: true,
      unlockedDate: "March 1, 2026",
      rarity: "common",
      xpReward: 100,
    },
    {
      id: "five-sessions",
      name: "Getting Started",
      description: "Complete 5 sessions",
      icon: Zap,
      unlocked: true,
      unlockedDate: "March 5, 2026",
      rarity: "common",
      xpReward: 200,
    },
    {
      id: "ten-sessions",
      name: "Regular User",
      description: "Complete 10 sessions",
      icon: Trophy,
      unlocked: true,
      unlockedDate: "March 7, 2026",
      rarity: "rare",
      xpReward: 500,
    },
    {
      id: "top-rated",
      name: "Quality Reviewer",
      description: "Give 5-star ratings to 10 operators",
      icon: Star,
      unlocked: true,
      progress: { current: 10, total: 10 },
      unlockedDate: "March 8, 2026",
      rarity: "rare",
      xpReward: 300,
    },
    {
      id: "fifty-sessions",
      name: "Veteran",
      description: "Complete 50 sessions",
      icon: Award,
      unlocked: false,
      progress: { current: 12, total: 50 },
      rarity: "epic",
      xpReward: 1000,
    },
    {
      id: "explorer",
      name: "World Explorer",
      description: "Book sessions in 10 different countries",
      icon: Globe,
      unlocked: false,
      progress: { current: 3, total: 10 },
      rarity: "epic",
      xpReward: 800,
    },
    {
      id: "social",
      name: "Social Butterfly",
      description: "Follow 20 different operators",
      icon: Users,
      unlocked: false,
      progress: { current: 5, total: 20 },
      rarity: "rare",
      xpReward: 400,
    },
    {
      id: "chat-master",
      name: "Chat Master",
      description: "Send 1000 messages in sessions",
      icon: MessageCircle,
      unlocked: false,
      progress: { current: 234, total: 1000 },
      rarity: "epic",
      xpReward: 600,
    },
    {
      id: "camera-enthusiast",
      name: "Camera Enthusiast",
      description: "Try all 4 camera types",
      icon: Camera,
      unlocked: false,
      progress: { current: 2, total: 4 },
      rarity: "rare",
      xpReward: 500,
    },
    {
      id: "loyal-supporter",
      name: "Loyal Supporter",
      description: "Book the same operator 10 times",
      icon: Heart,
      unlocked: false,
      progress: { current: 3, total: 10 },
      rarity: "epic",
      xpReward: 700,
    },
    {
      id: "perfectionist",
      name: "Perfectionist",
      description: "Maintain a perfect 5.0 average rating given",
      icon: Sparkles,
      unlocked: false,
      progress: { current: 4.8, total: 5.0 },
      rarity: "legendary",
      xpReward: 2000,
    },
    {
      id: "legend",
      name: "Platform Legend",
      description: "Complete 500 sessions",
      icon: Crown,
      unlocked: false,
      progress: { current: 12, total: 500 },
      rarity: "legendary",
      xpReward: 5000,
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "from-gray-500 to-gray-600";
      case "rare":
        return "from-blue-500 to-blue-600";
      case "epic":
        return "from-purple-500 to-pink-500";
      case "legendary":
        return "from-yellow-400 to-orange-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getRarityBorderColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-500/30";
      case "rare":
        return "border-blue-500/30";
      case "epic":
        return "border-purple-500/30";
      case "legendary":
        return "border-yellow-500/30";
      default:
        return "border-gray-500/30";
    }
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalXP = achievements.filter((a) => a.unlocked).reduce((sum, a) => sum + a.xpReward, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="text-foreground" size={20} />
            </button>
            <h2 className="text-foreground font-semibold text-xl">Achievements</h2>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <Trophy className="text-primary mx-auto mb-1" size={20} />
              <p className="text-xl font-semibold text-foreground">{unlockedCount}/{achievements.length}</p>
              <p className="text-xs text-muted-foreground">Unlocked</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <Sparkles className="text-yellow-500 mx-auto mb-1" size={20} />
              <p className="text-xl font-semibold text-foreground">{totalXP}</p>
              <p className="text-xs text-muted-foreground">Total XP</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3 text-center">
              <Target className="text-green-500 mx-auto mb-1" size={20} />
              <p className="text-xl font-semibold text-foreground">{Math.round((unlockedCount / achievements.length) * 100)}%</p>
              <p className="text-xs text-muted-foreground">Complete</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto space-y-4">
        {achievements.map((achievement, index) => {
          const Icon = achievement.icon;
          const rarityGradient = getRarityColor(achievement.rarity);
          const rarityBorder = getRarityBorderColor(achievement.rarity);

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-2xl border p-4 ${
                achievement.unlocked
                  ? `bg-card ${rarityBorder}`
                  : "bg-secondary/30 border-border"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center relative ${
                    achievement.unlocked
                      ? `bg-gradient-to-br ${rarityGradient}`
                      : "bg-secondary"
                  }`}
                >
                  {achievement.unlocked ? (
                    <Icon className="text-white" size={28} />
                  ) : (
                    <Lock className="text-muted-foreground" size={28} />
                  )}
                  {achievement.unlocked && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-background">
                      <Shield size={12} className="text-white" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <h3 className={`font-semibold ${
                        achievement.unlocked ? "text-foreground" : "text-muted-foreground"
                      }`}>
                        {achievement.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5">
                        {achievement.description}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs capitalize ${
                      achievement.unlocked
                        ? `bg-gradient-to-r ${rarityGradient} text-white`
                        : "bg-secondary text-muted-foreground"
                    }`}>
                      {achievement.rarity}
                    </span>
                  </div>

                  {/* Progress or Date */}
                  {achievement.unlocked ? (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Sparkles size={12} className="text-yellow-500" />
                        <span>+{achievement.xpReward} XP</span>
                      </div>
                      {achievement.unlockedDate && (
                        <div className="text-xs text-muted-foreground">
                          • Unlocked {achievement.unlockedDate}
                        </div>
                      )}
                    </div>
                  ) : (
                    achievement.progress && (
                      <div className="mt-3 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {achievement.progress.current} / {achievement.progress.total}
                          </span>
                          <span className="text-foreground font-medium">
                            {Math.round((achievement.progress.current / achievement.progress.total) * 100)}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ 
                              width: `${(achievement.progress.current / achievement.progress.total) * 100}%` 
                            }}
                            transition={{ duration: 0.8, delay: index * 0.05 }}
                            className="h-full bg-primary rounded-full"
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
