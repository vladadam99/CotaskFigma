import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Heart,
  Star,
  MapPin,
  DollarSign,
  Video,
  Clock,
  Filter,
  SortAsc,
  Grid3x3,
  List,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { BottomNav } from "./BottomNav";

interface FavoriteOperator {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  price: number;
  isLive: boolean;
  image: string;
  totalSessions: number;
  lastSession?: string;
}

export default function Favorites() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"recent" | "rating" | "price">("recent");
  const [favorites, setFavorites] = useState<FavoriteOperator[]>([
    {
      id: "1",
      name: "Sarah Chen",
      specialty: "Virtual Tours",
      location: "Tokyo, Japan",
      rating: 4.9,
      price: 25,
      isLive: true,
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
      totalSessions: 8,
      lastSession: "2 days ago",
    },
    {
      id: "2",
      name: "Marcus Stone",
      specialty: "Shopping Assistant",
      location: "New York, USA",
      rating: 4.8,
      price: 30,
      isLive: false,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      totalSessions: 5,
      lastSession: "1 week ago",
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      specialty: "Museum Guide",
      location: "Barcelona, Spain",
      rating: 5.0,
      price: 35,
      isLive: true,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      totalSessions: 3,
      lastSession: "3 days ago",
    },
    {
      id: "4",
      name: "Yuki Tanaka",
      specialty: "Food Explorer",
      location: "Osaka, Japan",
      rating: 4.7,
      price: 28,
      isLive: false,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      totalSessions: 6,
      lastSession: "5 days ago",
    },
    {
      id: "5",
      name: "Alex Rivera",
      specialty: "Adventure Guide",
      location: "Patagonia, Chile",
      rating: 4.9,
      price: 40,
      isLive: true,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      totalSessions: 4,
      lastSession: "1 day ago",
    },
  ]);

  const toggleFavorite = (id: string) => {
    setFavorites(favorites.filter((f) => f.id !== id));
  };

  const sortedFavorites = [...favorites].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "price":
        return a.price - b.price;
      case "recent":
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-xl hover:bg-secondary transition-colors"
              >
                <ArrowLeft className="text-foreground" size={20} />
              </button>
              <div>
                <h2 className="text-foreground font-semibold text-xl">Favorites</h2>
                <p className="text-sm text-muted-foreground">
                  {favorites.length} saved operators
                </p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3">
            {/* Sort */}
            <div className="flex items-center gap-2 flex-1">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="flex-1 bg-card border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="recent">Recently Added</option>
                <option value="rating">Highest Rated</option>
                <option value="price">Lowest Price</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-1 bg-card border border-border rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <Grid3x3 size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {favorites.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="text-muted-foreground mx-auto mb-4" size={48} />
            <p className="text-muted-foreground">No favorites yet</p>
            <button
              onClick={() => navigate("/home")}
              className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all"
            >
              Explore Operators
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-4">
            {sortedFavorites.map((operator) => (
              <motion.div
                key={operator.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-card border border-border rounded-2xl overflow-hidden"
              >
                {/* Image */}
                <div className="relative aspect-square">
                  <ImageWithFallback
                    src={operator.image}
                    alt={operator.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Live Badge */}
                  {operator.isLive && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(operator.id);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all"
                  >
                    <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                  </button>

                  {/* Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {operator.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-white/80">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span>{operator.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-3 space-y-2">
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {operator.specialty}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {operator.totalSessions} sessions
                    </span>
                    <span className="font-semibold text-primary">
                      ${operator.price}/hr
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/operator/${operator.id}`)}
                    className="w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-all"
                  >
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {sortedFavorites.map((operator) => (
              <motion.div
                key={operator.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate(`/operator/${operator.id}`)}
                className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:border-primary/50 transition-all cursor-pointer"
              >
                {/* Image */}
                <div className="relative w-20 h-20 flex-shrink-0">
                  <ImageWithFallback
                    src={operator.image}
                    alt={operator.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  {operator.isLive && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background" />
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {operator.name}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {operator.specialty}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(operator.id);
                      }}
                      className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
                    >
                      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      {operator.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {operator.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {operator.price}/hr
                    </span>
                  </div>

                  {operator.lastSession && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Last session: {operator.lastSession}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}