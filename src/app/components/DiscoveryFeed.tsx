import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, useAnimation } from "motion/react";
import {
  Heart,
  MessageCircle,
  UserPlus,
  MapPin,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Share2,
  MoreVertical,
} from "lucide-react";
import BottomNav from "./BottomNav";

interface Reel {
  id: string;
  avatarId: string;
  avatarName: string;
  avatarLevel: number;
  category: string;
  location: string;
  thumbnail: string;
  videoUrl: string;
  likes: number;
  comments: number;
  isLive: boolean;
  description: string;
}

export default function DiscoveryFeed() {
  const navigate = useNavigate();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());
  const [followedAvatars, setFollowedAvatars] = useState<Set<string>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  // Mock data for reels
  const reels: Reel[] = [
    {
      id: "1",
      avatarId: "avatar-1",
      avatarName: "Sarah Chen",
      avatarLevel: 5,
      category: "Travel Guide",
      location: "Tokyo, Japan",
      thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=800&fit=crop",
      videoUrl: "",
      likes: 12400,
      comments: 342,
      isLive: true,
      description: "Exploring hidden shrines in Tokyo 🏯✨ #JapanTravel",
    },
    {
      id: "2",
      avatarId: "avatar-2",
      avatarName: "Marcus Rodriguez",
      avatarLevel: 4,
      category: "Tech Setup",
      location: "San Francisco, USA",
      thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=800&fit=crop",
      videoUrl: "",
      likes: 8900,
      comments: 201,
      isLive: false,
      description: "Building the perfect home office setup 💻🎮",
    },
    {
      id: "3",
      avatarId: "avatar-3",
      avatarName: "Emma Williams",
      avatarLevel: 5,
      category: "Cooking Class",
      location: "Paris, France",
      thumbnail: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=800&fit=crop",
      videoUrl: "",
      likes: 15200,
      comments: 489,
      isLive: true,
      description: "Making authentic French pastries 🥐🇫🇷",
    },
    {
      id: "4",
      avatarId: "avatar-4",
      avatarName: "Alex Kumar",
      avatarLevel: 3,
      category: "Shopping Helper",
      location: "New York, USA",
      thumbnail: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=800&fit=crop",
      videoUrl: "",
      likes: 6700,
      comments: 156,
      isLive: false,
      description: "Best thrift stores in Brooklyn 🛍️",
    },
  ];

  const currentReel = reels[currentReelIndex];

  const handleScroll = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && currentReelIndex < reels.length - 1) {
      setCurrentReelIndex(currentReelIndex + 1);
    } else if (e.deltaY < 0 && currentReelIndex > 0) {
      setCurrentReelIndex(currentReelIndex - 1);
    }
  };

  const toggleLike = (reelId: string) => {
    const newLikedReels = new Set(likedReels);
    if (newLikedReels.has(reelId)) {
      newLikedReels.delete(reelId);
    } else {
      newLikedReels.add(reelId);
    }
    setLikedReels(newLikedReels);
  };

  const toggleFollow = (avatarId: string) => {
    const newFollowedAvatars = new Set(followedAvatars);
    if (newFollowedAvatars.has(avatarId)) {
      newFollowedAvatars.delete(avatarId);
    } else {
      newFollowedAvatars.add(avatarId);
    }
    setFollowedAvatars(newFollowedAvatars);
  };

  const getLevelBadge = (level: number) => {
    const badges = [
      { level: 1, name: "Beginner", color: "bg-gray-500" },
      { level: 2, name: "Verified", color: "bg-blue-500" },
      { level: 3, name: "Specialist", color: "bg-purple-500" },
      { level: 4, name: "Professional", color: "bg-yellow-500" },
      { level: 5, name: "Elite Expert", color: "bg-gradient-to-r from-yellow-400 to-primary" },
    ];
    return badges[level - 1] || badges[0];
  };

  const levelBadge = getLevelBadge(currentReel.avatarLevel);

  return (
    <div
      ref={containerRef}
      onWheel={handleScroll}
      className="relative h-screen w-full bg-black overflow-hidden"
    >
      {/* Reel Container */}
      <motion.div
        key={currentReel.id}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0"
      >
        {/* Background Image/Video */}
        <div className="absolute inset-0">
          <img
            src={currentReel.thumbnail}
            alt={currentReel.description}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 z-10 p-6 flex items-center justify-between">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/home")}
            className="text-white/80 hover:text-white"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </motion.button>
          <div className="text-white text-sm">Discover</div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="text-white/80 hover:text-white"
          >
            <MoreVertical size={24} />
          </motion.button>
        </div>

        {/* Play/Pause Overlay */}
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="absolute inset-0 flex items-center justify-center z-5"
        >
          {isPaused && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <Play className="text-white" size={40} />
            </motion.div>
          )}
        </button>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 pb-8">
          <div className="flex items-end justify-between gap-4">
            {/* Left Side - Info */}
            <div className="flex-1 space-y-3">
              {/* Avatar Info */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                      <span className="text-foreground">
                        {currentReel.avatarName.charAt(0)}
                      </span>
                    </div>
                  </div>
                  {currentReel.isLive && (
                    <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-red-500 text-white text-xs">
                      LIVE
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white">{currentReel.avatarName}</span>
                    <div
                      className={`px-2 py-0.5 rounded-full text-xs text-white ${levelBadge.color}`}
                    >
                      L{currentReel.avatarLevel}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <span>{currentReel.category}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      <span>{currentReel.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-white text-sm max-w-xs">
                {currentReel.description}
              </p>
            </div>

            {/* Right Side - Actions */}
            <div className="flex flex-col items-center gap-6">
              {/* Like */}
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => toggleLike(currentReel.id)}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    likedReels.has(currentReel.id)
                      ? "bg-primary/20"
                      : "bg-white/20 backdrop-blur-sm"
                  }`}
                >
                  <Heart
                    className={
                      likedReels.has(currentReel.id)
                        ? "text-primary fill-primary"
                        : "text-white"
                    }
                    size={24}
                  />
                </div>
                <span className="text-white text-xs">
                  {(currentReel.likes + (likedReels.has(currentReel.id) ? 1 : 0)) / 1000}K
                </span>
              </motion.button>

              {/* Comment */}
              <motion.button
                whileTap={{ scale: 0.8 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <MessageCircle className="text-white" size={24} />
                </div>
                <span className="text-white text-xs">{currentReel.comments}</span>
              </motion.button>

              {/* Follow */}
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => toggleFollow(currentReel.avatarId)}
                className="flex flex-col items-center gap-1"
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    followedAvatars.has(currentReel.avatarId)
                      ? "bg-primary"
                      : "bg-white/20 backdrop-blur-sm"
                  }`}
                >
                  <UserPlus
                    className={
                      followedAvatars.has(currentReel.avatarId)
                        ? "text-primary-foreground"
                        : "text-white"
                    }
                    size={20}
                  />
                </div>
              </motion.button>

              {/* Share */}
              <motion.button
                whileTap={{ scale: 0.8 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Share2 className="text-white" size={20} />
                </div>
              </motion.button>

              {/* Volume */}
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => setIsMuted(!isMuted)}
                className="flex flex-col items-center gap-1"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {isMuted ? (
                    <VolumeX className="text-white" size={20} />
                  ) : (
                    <Volume2 className="text-white" size={20} />
                  )}
                </div>
              </motion.button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(`/operator/${currentReel.avatarId}`)}
              className="py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              View Profile
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                currentReel.isLive
                  ? navigate(`/session/${currentReel.id}`)
                  : navigate(`/booking/${currentReel.avatarId}`)
              }
              className="py-3 rounded-xl bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/30 transition-all"
            >
              {currentReel.isLive ? "Join Live" : "Book Session"}
            </motion.button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-2">
          {reels.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-8 rounded-full transition-all ${
                index === currentReelIndex
                  ? "bg-primary"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </motion.div>
      <BottomNav />
    </div>
  );
}