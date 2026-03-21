import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { useState } from "react";
import {
  MapPin,
  Star,
  Users,
  MessageCircle,
  Heart,
  Zap,
  DollarSign,
  Play,
  ArrowLeft,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Avatar {
  id: string;
  name: string;
  verified: boolean;
  image: string;
  location: string;
  followers: string;
  rating: number;
  reviews: number;
  price: number;
  level: number;
  description: string;
  gradientFrom: string;
  gradientTo: string;
  videoThumbnails: string[];
  isLive: boolean;
  category: string;
}

const avatars: Avatar[] = [
  {
    id: "1",
    name: "Subaru Rahman",
    verified: true,
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
    location: "Tokyo, Japan",
    followers: "1.2M",
    rating: 4.9,
    reviews: 234,
    price: 32,
    level: 42,
    description: "Professional Tokyo street food guide & cultural explorer",
    gradientFrom: "#1a1a1a",
    gradientTo: "#1a1a1a",
    videoThumbnails: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300",
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=300",
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=300",
    ],
    isLive: true,
    category: "Food Tours",
  },
  {
    id: "2",
    name: "Marcus Stone",
    verified: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    location: "New York, USA",
    followers: "856K",
    rating: 4.8,
    reviews: 189,
    price: 45,
    level: 38,
    description: "Streetwear shopping expert • Supreme & exclusive drops",
    gradientFrom: "#1a1a1a",
    gradientTo: "#1a1a1a",
    videoThumbnails: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300",
      "https://images.unsplash.com/photo-1549488344-cbb179c929e3?w=300",
    ],
    isLive: false,
    category: "Shopping",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    verified: true,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    location: "Barcelona, Spain",
    followers: "2.1M",
    rating: 5.0,
    reviews: 512,
    price: 38,
    level: 56,
    description: "Art historian • Museum tours • Sagrada Familia specialist",
    gradientFrom: "#1a1a1a",
    gradientTo: "#1a1a1a",
    videoThumbnails: [
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300",
      "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=300",
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=300",
    ],
    isLive: true,
    category: "Museums",
  },
  {
    id: "4",
    name: "Yuki Tanaka",
    verified: true,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
    location: "Osaka, Japan",
    followers: "1.5M",
    rating: 4.7,
    reviews: 421,
    price: 28,
    level: 44,
    description: "Osaka street food master • Takoyaki & ramen expert",
    gradientFrom: "#1a1a1a",
    gradientTo: "#1a1a1a",
    videoThumbnails: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300",
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=300",
    ],
    isLive: true,
    category: "Food",
  },
  {
    id: "5",
    name: "Ahmed Hassan",
    verified: true,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    location: "Cairo, Egypt",
    followers: "923K",
    rating: 4.9,
    reviews: 298,
    price: 35,
    level: 61,
    description: "Ancient history guide • Pyramids & archaeological sites",
    gradientFrom: "#1a1a1a",
    gradientTo: "#1a1a1a",
    videoThumbnails: [
      "https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=300",
      "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=300",
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=300",
    ],
    isLive: false,
    category: "Tours",
  },
  {
    id: "6",
    name: "Isabella Martinez",
    verified: true,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
    location: "Paris, France",
    followers: "1.8M",
    rating: 4.95,
    reviews: 623,
    price: 42,
    level: 52,
    description: "Louvre expert • Art & culture • After-hours museum tours",
    gradientFrom: "#1a1a1a",
    gradientTo: "#1a1a1a",
    videoThumbnails: [
      "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=300",
      "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?w=300",
      "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=300",
    ],
    isLive: true,
    category: "Museums",
  },
];

export default function DiscoverFeed() {
  const navigate = useNavigate();
  const [likedAvatars, setLikedAvatars] = useState<string[]>([]);
  const userRole = localStorage.getItem("userRole") || "user";

  const toggleLike = (avatarId: string) => {
    setLikedAvatars((prev) =>
      prev.includes(avatarId)
        ? prev.filter((id) => id !== avatarId)
        : [...prev, avatarId]
    );
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div
        className="sticky top-0 z-20 backdrop-blur-[20px] border-b"
        style={{
          background: "rgba(45, 21, 21, 0.9)",
          borderColor: "rgba(255, 255, 255, 0.08)",
        }}
      >
        <div className="px-6 py-4 flex items-center gap-4">
          <button
            onClick={() =>
              navigate(userRole === "avatar" ? "/avatar-home" : "/home")
            }
            className="w-10 h-10 border rounded-full flex items-center justify-center active:scale-95 transition-all"
            style={{ background: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(255, 255, 255, 0.08)" }}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-white text-2xl font-bold mb-1">Explore</h1>
            <p className="text-sm" style={{ color: "#9CA3AF" }}>
              Discover live avatars worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-4">
        <div
          className="backdrop-blur-[20px] rounded-2xl border px-4 py-3 flex items-center gap-3"
          style={{
            background: "rgba(45, 21, 21, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          }}
        >
          <MessageCircle size={18} style={{ color: "#9CA3AF" }} />
          <input
            type="text"
            placeholder="Search avatars, locations..."
            className="flex-1 bg-transparent text-white placeholder-[#9CA3AF] outline-none text-sm"
          />
        </div>
      </div>

      {/* Avatar Cards Grid */}
      <div className="px-6 space-y-6">
        {avatars.map((avatar, index) => (
          <motion.div
            key={avatar.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl overflow-hidden relative border"
            style={{
              background: "rgba(45, 21, 21, 0.6)",
              backdropFilter: "blur(20px)",
              borderColor: "rgba(255, 255, 255, 0.08)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)",
            }}
            onClick={() => navigate(`/operator/${avatar.id}`)}
          >
            {/* Live Badge */}
            {avatar.isLive && (
              <div className="absolute top-4 right-4 z-10 bg-red-500/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-1.5 shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE
              </div>
            )}

            {/* Card Content */}
            <div className="p-6 pb-5">
              {/* Avatar Header */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-2 border-white/20 overflow-hidden shadow-xl">
                      <ImageWithFallback
                        src={avatar.image}
                        alt={avatar.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Level Badge */}
                    <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-xs font-bold shadow-lg text-gray-900">
                      {avatar.level}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold text-lg">
                        {avatar.name}
                      </h3>
                      {avatar.verified && (
                        <div className="w-5 h-5 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <svg
                            viewBox="0 0 24 24"
                            className="w-3 h-3 text-gray-900"
                            fill="currentColor"
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-white/70 text-sm mt-0.5">
                      <MapPin size={13} />
                      <span>{avatar.location}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => toggleLike(avatar.id)}
                  className="p-2 active:scale-90 transition-transform"
                >
                  <Heart
                    size={24}
                    className={`${
                      likedAvatars.includes(avatar.id)
                        ? "fill-white text-white"
                        : "text-white/60"
                    }`}
                  />
                </button>
              </div>

              {/* Stats Row */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-white/80 text-sm">
                  <Users size={15} className="text-white/60" />
                  <span className="font-semibold">{avatar.followers}</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/80 text-sm">
                  <Star className="fill-white/80 text-white/80" size={15} />
                  <span className="font-semibold">{avatar.rating}</span>
                  <span className="text-white/50">({avatar.reviews})</span>
                </div>
                <div className="flex items-center gap-1.5 text-white/80 text-sm">
                  <DollarSign size={15} className="text-white/60" />
                  <span className="font-semibold">${avatar.price}/hr</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/70 text-sm mb-4 line-clamp-2">
                {avatar.description}
              </p>

              {/* Video Thumbnails */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {avatar.videoThumbnails.map((thumb, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-[9/16] rounded-xl overflow-hidden group cursor-pointer border border-white/10"
                    onClick={() => navigate(`/profile/${avatar.id}`)}
                  >
                    <ImageWithFallback
                      src={thumb}
                      alt={`Video ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                      <Play
                        className="text-white opacity-70 group-hover:opacity-100 transition-opacity"
                        size={24}
                        fill="white"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (avatar.isLive) {
                      navigate(`/live/${avatar.id}`);
                    }
                  }}
                  disabled={!avatar.isLive}
                  className="flex-1 font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: avatar.isLive
                      ? "linear-gradient(135deg, #4FB6FF 0%, #2F8BFF 100%)"
                      : "rgba(255, 255, 255, 0.1)",
                    color: "white",
                  }}
                >
                  <Zap size={18} />
                  {avatar.isLive ? "Join Live" : "Offline"}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/messages`);
                  }}
                  className="border text-white px-4 py-3.5 rounded-2xl flex items-center justify-center active:scale-95 transition-transform"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <MessageCircle size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}