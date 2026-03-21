import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Play,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Clock,
  Calendar,
  TrendingUp,
  Star,
  Download,
  Trash2,
  Edit,
  MoreVertical,
} from "lucide-react";
import BottomNav from "./BottomNav";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Stream {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  date: string;
  views: number;
  likes: number;
  comments: number;
  earnings: number;
  category: string;
  client: string;
  clientImage: string;
  rating?: number;
}

export default function Streams() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"all" | "recent" | "popular">("all");

  const streams: Stream[] = [
    {
      id: "1",
      title: "Luxury Apartment Virtual Tour - Downtown NYC",
      thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
      duration: "1:32:45",
      date: "2 days ago",
      views: 2847,
      likes: 523,
      comments: 89,
      earnings: 150,
      category: "Real Estate",
      client: "Sarah Chen",
      clientImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      rating: 5.0,
    },
    {
      id: "2",
      title: "Live Shopping - Fashion Store New Collection",
      thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
      duration: "2:15:30",
      date: "5 days ago",
      views: 5231,
      likes: 892,
      comments: 156,
      earnings: 200,
      category: "Shopping",
      client: "Marcus Stone",
      clientImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      rating: 4.8,
    },
    {
      id: "3",
      title: "Museum Art Exhibition Virtual Tour",
      thumbnail: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
      duration: "3:45:20",
      date: "1 week ago",
      views: 8945,
      likes: 1523,
      comments: 234,
      earnings: 300,
      category: "Virtual Tours",
      client: "Elena Rodriguez",
      clientImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      rating: 5.0,
    },
    {
      id: "4",
      title: "Factory Equipment Inspection - Industrial Site",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
      duration: "4:30:15",
      date: "2 weeks ago",
      views: 1234,
      likes: 245,
      comments: 45,
      earnings: 450,
      category: "Inspection",
      client: "TechCorp Ltd",
      clientImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
      rating: 4.9,
    },
    {
      id: "5",
      title: "Live Product Demo - Electronics Store",
      thumbnail: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800",
      duration: "1:58:40",
      date: "3 weeks ago",
      views: 3421,
      likes: 678,
      comments: 112,
      earnings: 180,
      category: "Shopping",
      client: "Olivia Park",
      clientImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      rating: 4.7,
    },
    {
      id: "6",
      title: "Construction Site Remote Inspection",
      thumbnail: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
      duration: "5:12:30",
      date: "1 month ago",
      views: 987,
      likes: 156,
      comments: 28,
      earnings: 400,
      category: "Construction",
      client: "David Kim",
      clientImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      rating: 5.0,
    },
  ];

  const totalStats = {
    totalViews: streams.reduce((sum, s) => sum + s.views, 0),
    totalLikes: streams.reduce((sum, s) => sum + s.likes, 0),
    totalEarnings: streams.reduce((sum, s) => sum + s.earnings, 0),
    totalStreams: streams.length,
    avgRating: (streams.reduce((sum, s) => sum + (s.rating || 0), 0) / streams.length).toFixed(1),
  };

  const filteredStreams = (() => {
    switch (selectedTab) {
      case "recent":
        return [...streams].sort((a, b) => {
          // Sort by date (most recent first)
          return 0; // Simplified for demo
        });
      case "popular":
        return [...streams].sort((a, b) => b.views - a.views);
      default:
        return streams;
    }
  })();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/operator-dashboard")}
                className="p-2 rounded-xl hover:bg-secondary transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  My Streams
                </h2>
                <p className="text-sm text-muted-foreground">{streams.length} recorded sessions</p>
              </div>
            </div>
            <button className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary/50 transition-all">
              <MoreVertical size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {[
              { id: "all", label: "All Streams" },
              { id: "recent", label: "Recent" },
              { id: "popular", label: "Most Viewed" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                  selectedTab === tab.id
                    ? "bg-gradient-to-r from-primary to-blue-500 text-white shadow-lg shadow-primary/50"
                    : "bg-card border border-border text-foreground hover:border-primary/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Play className="text-primary" size={20} />
              <p className="text-xs font-semibold text-muted-foreground">Streams</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{totalStats.totalStreams}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="text-green-500" size={20} />
              <p className="text-xs font-semibold text-muted-foreground">Views</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{(totalStats.totalViews / 1000).toFixed(1)}K</p>
          </div>
          <div className="bg-gradient-to-br from-pink-500/10 to-red-500/10 border border-pink-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Heart className="text-pink-500" size={20} />
              <p className="text-xs font-semibold text-muted-foreground">Likes</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{(totalStats.totalLikes / 1000).toFixed(1)}K</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="text-yellow-500" size={20} />
              <p className="text-xs font-semibold text-muted-foreground">Rating</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{totalStats.avgRating}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-purple-500" size={20} />
              <p className="text-xs font-semibold text-muted-foreground">Earned</p>
            </div>
            <p className="text-2xl font-bold text-foreground">${(totalStats.totalEarnings / 1000).toFixed(1)}K</p>
          </div>
        </div>

        {/* Streams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStreams.map((stream, index) => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all group"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden bg-secondary">
                <img
                  src={stream.thumbnail}
                  alt={stream.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Duration */}
                <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/90 text-white text-xs font-bold rounded">
                  {stream.duration}
                </div>

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-2xl shadow-primary/50">
                    <Play className="text-white fill-white ml-1" size={28} />
                  </div>
                </div>

                {/* Stats overlay */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <div className="px-2 py-1 bg-black/90 text-white text-xs font-bold rounded flex items-center gap-1">
                    <Eye size={12} />
                    {stream.views.toLocaleString()}
                  </div>
                  <div className="px-2 py-1 bg-black/90 text-white text-xs font-bold rounded flex items-center gap-1">
                    <Heart size={12} />
                    {stream.likes}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1 line-clamp-2">{stream.title}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {stream.category}
                      </span>
                      {stream.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="text-yellow-500 fill-yellow-500" size={12} />
                          <span className="text-xs font-semibold">{stream.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-primary">${stream.earnings}</p>
                    <p className="text-xs text-muted-foreground">Earned</p>
                  </div>
                </div>

                {/* Client info */}
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border">
                  <img
                    src={stream.clientImage}
                    alt={stream.client}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{stream.client}</p>
                    <p className="text-xs text-muted-foreground">{stream.date}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Eye size={14} />
                    <span className="text-xs">{stream.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Heart size={14} />
                    <span className="text-xs">{stream.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MessageCircle size={14} />
                    <span className="text-xs">{stream.comments}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
                    <Play size={16} />
                    Watch
                  </button>
                  <button className="px-3 py-2 bg-secondary text-foreground rounded-xl hover:bg-secondary/80 transition-all">
                    <Share2 size={16} />
                  </button>
                  <button className="px-3 py-2 bg-secondary text-foreground rounded-xl hover:bg-secondary/80 transition-all">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
