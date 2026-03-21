import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  Search,
  MapPin,
  ChevronDown,
  Star,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

interface Reel {
  id: number;
  avatarId: string;
  avatarName: string;
  avatarLevel: number;
  avatarImage: string;
  category: string;
  location: string;
  title: string;
  viewers: number;
  isLive: boolean;
  likes: number;
  comments: number;
  shares: number;
  isFollowing: boolean;
  isLiked: boolean;
  thumbnail: string;
  rating: number;
  price: number;
}

interface UserHomeScreenProps {
  reelsData: Reel[];
  selectedLocation: string;
  setShowLocationSelector: (show: boolean) => void;
  setShowReels: (show: boolean) => void;
  setActiveCategory: (cat: string) => void;
  setCurrentReelIndex: (index: number) => void;
}

export default function UserHomeScreen({
  reelsData,
  selectedLocation,
  setShowLocationSelector,
  setShowReels,
  setActiveCategory,
  setCurrentReelIndex,
}: UserHomeScreenProps) {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleLiveClick = (reelId: number) => {
    const index = reelsData.findIndex(r => r.id === reelId);
    if (index !== -1) {
      setCurrentReelIndex(index);
      setShowReels(true);
    }
  };

  const categories = [
    { icon: "🏠", label: "Home" },
    { icon: "🔧", label: "Repair" },
    { icon: "💻", label: "Tech" },
    { icon: "🍳", label: "Cooking" },
    { icon: "✈️", label: "Travel" },
    { icon: "✨", label: "More" },
  ];

  return (
    <>
      {/* Top Section */}
      <div className="bg-white px-5 pt-8 pb-5 border-b border-gray-100">
        {/* Headline */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Find help instantly
        </h1>

        {/* Location */}
        <button
          onClick={() => setShowLocationSelector(true)}
          className="flex items-center gap-2 mb-5 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <MapPin size={18} className="text-gray-500" />
          <span className="font-medium">{selectedLocation}</span>
          <ChevronDown size={16} className="text-gray-400" />
        </button>

        {/* Search Bar */}
        <button
          onClick={() => navigate("/search")}
          className="w-full bg-gray-50 hover:bg-gray-100 rounded-2xl px-5 py-4 flex items-center gap-3 transition-colors border border-gray-200"
        >
          <Search size={22} className="text-gray-400" />
          <span className="text-[16px] text-gray-500">Search help or service</span>
        </button>
      </div>

      {/* Categories */}
      <div className="bg-white px-5 py-4 border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-5 px-5">
          {categories.map((cat) => (
            <motion.button
              key={cat.label}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedCategory(cat.label);
                setActiveCategory(cat.label);
                navigate("/search");
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.label
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="mr-1.5">{cat.icon}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="bg-white pb-24">
        {/* Available Now Section */}
        <div className="px-5 pt-6 pb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Available Now</h2>

          <div className="space-y-4">
            {reelsData
              .filter((r) => r.isLive)
              .slice(0, 6)
              .map((reel) => (
                <motion.div
                  key={reel.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLiveClick(reel.id)}
                  className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex gap-4">
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-100">
                        <ImageWithFallback
                          src={reel.avatarImage}
                          alt={reel.avatarName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* Green dot indicator */}
                      <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-green-500 rounded-full border-3 border-white" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[17px] font-semibold text-gray-900 mb-1">
                        {reel.avatarName}
                      </h3>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-600">{reel.category}</span>
                        <span className="text-gray-300">•</span>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="fill-gray-900 text-gray-900" />
                          <span className="text-sm font-medium text-gray-900">
                            {reel.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-500 mb-3">Online now</p>

                      <button className="bg-gray-900 hover:bg-gray-800 text-white px-5 py-2 rounded-xl text-sm font-medium transition-colors">
                        Connect
                      </button>
                    </div>

                    {/* Price Badge */}
                    <div className="flex-shrink-0">
                      <div className="bg-gray-100 px-3 py-1.5 rounded-xl">
                        <div className="text-lg font-bold text-gray-900">${reel.price}</div>
                        <div className="text-xs text-gray-500 text-center">/hour</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Recommended Section */}
        <div className="px-5 py-6 bg-gray-50">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Recommended for you</h2>

          <div className="grid grid-cols-2 gap-4">
            {reelsData.slice(6, 12).map((reel) => (
              <motion.div
                key={reel.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleLiveClick(reel.id)}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
              >
                {/* Avatar */}
                <div className="p-4 pb-3">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3">
                    <ImageWithFallback
                      src={reel.avatarImage}
                      alt={reel.avatarName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <h3 className="text-[15px] font-semibold text-gray-900 mb-1 truncate">
                    {reel.avatarName}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-2 truncate">{reel.category}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star size={13} className="fill-gray-900 text-gray-900" />
                      <span className="text-sm font-medium text-gray-900">
                        {reel.rating.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-[15px] font-bold text-gray-900">
                      ${reel.price}/hr
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}