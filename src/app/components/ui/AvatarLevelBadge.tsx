import { Award, Shield, Star, Crown, Zap } from "lucide-react";
import { motion } from "motion/react";

interface AvatarLevelBadgeProps {
  level: number;
  showName?: boolean;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

export function AvatarLevelBadge({ 
  level, 
  showName = false, 
  size = "md",
  animated = false 
}: AvatarLevelBadgeProps) {
  const levels = [
    { 
      level: 1, 
      name: "Beginner", 
      icon: Award,
      color: "bg-gray-500", 
      textColor: "text-gray-500",
      gradient: "from-gray-600 to-gray-500",
      description: "Starting your journey"
    },
    { 
      level: 2, 
      name: "Verified", 
      icon: Shield,
      color: "bg-blue-500", 
      textColor: "text-blue-500",
      gradient: "from-blue-600 to-blue-500",
      description: "Trusted by the community"
    },
    { 
      level: 3, 
      name: "Specialist", 
      icon: Star,
      color: "bg-purple-500", 
      textColor: "text-purple-500",
      gradient: "from-purple-600 to-purple-500",
      description: "Expert in specific categories"
    },
    { 
      level: 4, 
      name: "Professional", 
      icon: Zap,
      color: "bg-yellow-500", 
      textColor: "text-yellow-500",
      gradient: "from-yellow-600 to-yellow-500",
      description: "High-quality service provider"
    },
    { 
      level: 5, 
      name: "Elite Expert", 
      icon: Crown,
      color: "bg-gradient-to-r from-yellow-400 to-primary", 
      textColor: "text-primary",
      gradient: "from-yellow-400 via-primary to-purple-500",
      description: "Top-tier professional"
    },
  ];

  const badgeData = levels[level - 1] || levels[0];
  const Icon = badgeData.icon;

  const sizeClasses = {
    sm: {
      badge: "px-2 py-0.5 text-xs",
      icon: 12,
      text: "text-xs",
    },
    md: {
      badge: "px-3 py-1 text-sm",
      icon: 14,
      text: "text-sm",
    },
    lg: {
      badge: "px-4 py-1.5 text-base",
      icon: 16,
      text: "text-base",
    },
  };

  const classes = sizeClasses[size];

  const BadgeContent = () => (
    <div className={`inline-flex items-center gap-1.5 rounded-full ${badgeData.color} text-white ${classes.badge}`}>
      <Icon size={classes.icon} />
      {showName ? (
        <span>{badgeData.name}</span>
      ) : (
        <span>L{level}</span>
      )}
    </div>
  );

  if (animated) {
    return (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.05 }}
      >
        <BadgeContent />
      </motion.div>
    );
  }

  return <BadgeContent />;
}

export function AvatarLevelCard({ level }: { level: number }) {
  const levels = [
    { 
      level: 1, 
      name: "Beginner", 
      icon: Award,
      color: "bg-gray-500", 
      gradient: "from-gray-600 to-gray-500",
      xpRequired: 0,
      xpNext: 1000,
      unlocks: ["Basic categories", "Standard equipment"],
      earnings: "$15-20/hr"
    },
    { 
      level: 2, 
      name: "Verified", 
      icon: Shield,
      color: "bg-blue-500", 
      gradient: "from-blue-600 to-blue-500",
      xpRequired: 1000,
      xpNext: 3000,
      unlocks: ["Identity verification", "Priority support", "Profile badge"],
      earnings: "$20-30/hr"
    },
    { 
      level: 3, 
      name: "Specialist", 
      icon: Star,
      color: "bg-purple-500", 
      gradient: "from-purple-600 to-purple-500",
      xpRequired: 3000,
      xpNext: 7000,
      unlocks: ["Advanced categories", "360° camera access", "Custom rates"],
      earnings: "$30-45/hr"
    },
    { 
      level: 4, 
      name: "Professional", 
      icon: Zap,
      color: "bg-yellow-500", 
      gradient: "from-yellow-600 to-yellow-500",
      xpRequired: 7000,
      xpNext: 15000,
      unlocks: ["Enterprise clients", "Smart glasses", "Featured profile"],
      earnings: "$45-65/hr"
    },
    { 
      level: 5, 
      name: "Elite Expert", 
      icon: Crown,
      color: "bg-gradient-to-r from-yellow-400 to-primary", 
      gradient: "from-yellow-400 via-primary to-purple-500",
      xpRequired: 15000,
      xpNext: null,
      unlocks: ["All categories", "Premium equipment", "VIP support", "Highest earnings"],
      earnings: "$65-100+/hr"
    },
  ];

  const levelData = levels[level - 1] || levels[0];
  const Icon = levelData.icon;

  return (
    <div className="rounded-2xl bg-card border border-border p-6 space-y-4">
      <div className="flex items-center gap-4">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${levelData.gradient} flex items-center justify-center`}>
          <Icon className="text-white" size={32} />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-xl font-semibold text-foreground">{levelData.name}</h3>
            <span className={`px-3 py-1 rounded-full ${levelData.color} text-white text-sm`}>
              Level {level}
            </span>
          </div>
          <p className="text-muted-foreground">{levelData.earnings}</p>
        </div>
      </div>

      {levelData.xpNext && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress to Level {level + 1}</span>
            <span className="text-foreground font-medium">{levelData.xpRequired}/{levelData.xpNext} XP</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${levelData.gradient} rounded-full transition-all`}
              style={{ width: `${(levelData.xpRequired / levelData.xpNext) * 100}%` }}
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <h4 className="text-sm font-medium text-foreground">Unlocked Benefits:</h4>
        <div className="space-y-2">
          {levelData.unlocks.map((unlock, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-muted-foreground">{unlock}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
