import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  DollarSign,
  Star,
  Video,
  Filter,
  Download,
  Search,
  MapPin,
  Eye,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Session {
  id: string;
  operatorName: string;
  operatorImage: string;
  specialty: string;
  date: string;
  duration: string;
  price: number;
  rating?: number;
  location: string;
  status: "completed" | "cancelled" | "upcoming";
  thumbnail?: string;
}

export default function SessionHistory() {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "upcoming">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const sessions: Session[] = [
    {
      id: "1",
      operatorName: "Sarah Chen",
      operatorImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
      specialty: "Virtual Tours",
      date: "March 8, 2026",
      duration: "1h 23m",
      price: 30,
      rating: 5,
      location: "Tokyo, Japan",
      status: "completed",
      thumbnail: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400",
    },
    {
      id: "2",
      operatorName: "Marcus Stone",
      operatorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      specialty: "Shopping Assistant",
      date: "March 5, 2026",
      duration: "2h 15m",
      price: 45,
      rating: 5,
      location: "New York, USA",
      status: "completed",
      thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
    },
    {
      id: "3",
      operatorName: "Elena Rodriguez",
      operatorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      specialty: "Museum Guide",
      date: "March 1, 2026",
      duration: "1h 45m",
      price: 35,
      rating: 4,
      location: "Barcelona, Spain",
      status: "completed",
      thumbnail: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400",
    },
    {
      id: "4",
      operatorName: "Yuki Tanaka",
      operatorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      specialty: "Food Explorer",
      date: "March 10, 2026",
      duration: "1h 30m",
      price: 28,
      location: "Osaka, Japan",
      status: "upcoming",
    },
    {
      id: "5",
      operatorName: "Alex Rivera",
      operatorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      specialty: "Adventure Guide",
      date: "February 28, 2026",
      duration: "3h 00m",
      price: 60,
      location: "Patagonia, Chile",
      status: "cancelled",
    },
  ];

  const filteredSessions = sessions.filter((session) => {
    const matchesStatus = filterStatus === "all" || session.status === filterStatus;
    const matchesSearch =
      searchQuery === "" ||
      session.operatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalSpent = sessions
    .filter((s) => s.status === "completed")
    .reduce((sum, s) => sum + s.price, 0);

  const totalHours = sessions
    .filter((s) => s.status === "completed")
    .reduce((sum, s) => {
      const [hours, minutes] = s.duration.split(" ");
      return sum + parseInt(hours.replace("h", "")) + parseInt(minutes.replace("m", "")) / 60;
    }, 0);

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
            <div>
              <h2 className="text-foreground font-semibold text-xl">Session History</h2>
              <p className="text-sm text-muted-foreground">
                {sessions.length} total sessions
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-card border border-border rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-1">Total Spent</p>
              <p className="text-lg font-semibold text-primary">${totalSpent}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-1">Total Hours</p>
              <p className="text-lg font-semibold text-primary">
                {Math.round(totalHours)}h
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-3">
              <p className="text-xs text-muted-foreground mb-1">Completed</p>
              <p className="text-lg font-semibold text-primary">
                {sessions.filter((s) => s.status === "completed").length}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-3">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sessions..."
              className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {["all", "completed", "upcoming"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status as any)}
                className={`px-4 py-2 rounded-xl text-sm font-medium capitalize transition-all ${
                  filterStatus === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border hover:border-primary/50"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sessions List */}
      <div className="px-6 py-6 space-y-4">
        {filteredSessions.length === 0 ? (
          <div className="text-center py-16">
            <Video className="text-muted-foreground mx-auto mb-4" size={48} />
            <p className="text-muted-foreground">No sessions found</p>
          </div>
        ) : (
          filteredSessions.map((session) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => {
                if (session.status === "completed") {
                  navigate(`/summary/${session.id}`);
                } else if (session.status === "upcoming") {
                  navigate(`/session/${session.id}`);
                }
              }}
              className={`rounded-2xl border overflow-hidden transition-all ${
                session.status === "cancelled"
                  ? "bg-secondary/30 border-border opacity-60"
                  : "bg-card border-border hover:border-primary/50 cursor-pointer"
              }`}
            >
              <div className="flex gap-4 p-4">
                {/* Thumbnail */}
                {session.thumbnail ? (
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                    <ImageWithFallback
                      src={session.thumbnail}
                      alt={session.location}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                        <Eye size={16} className="text-black" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <ImageWithFallback
                      src={session.operatorImage}
                      alt={session.operatorName}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                )}

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {session.operatorName}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {session.specialty}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        session.status === "completed"
                          ? "bg-green-500/10 text-green-500"
                          : session.status === "upcoming"
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {session.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {session.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {session.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} />
                        {session.location}
                      </span>
                      {session.rating && (
                        <span className="flex items-center gap-1">
                          <Star
                            size={12}
                            className="text-yellow-500 fill-yellow-500"
                          />
                          {session.rating}
                        </span>
                      )}
                    </div>
                    <span className="font-semibold text-primary">${session.price}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
