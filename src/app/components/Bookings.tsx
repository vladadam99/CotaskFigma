import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  DollarSign,
  Video,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageCircle,
  Navigation,
  User,
} from "lucide-react";
import BottomNav from "./BottomNav";

interface Booking {
  id: string;
  operatorName: string;
  operatorImage: string;
  operatorRating: number;
  status: "upcoming" | "completed" | "cancelled";
  date: string;
  time: string;
  duration: string;
  location: string;
  category: string;
  price: number;
  equipment: string;
}

export default function Bookings() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "completed" | "cancelled">(
    "upcoming"
  );

  const bookings: Booking[] = [
    {
      id: "1",
      operatorName: "Sarah Chen",
      operatorImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
      operatorRating: 4.9,
      status: "upcoming",
      date: "March 12, 2026",
      time: "2:00 PM",
      duration: "1.5 hours",
      location: "Downtown NYC",
      category: "Real Estate",
      price: 150,
      equipment: "360° Camera",
    },
    {
      id: "2",
      operatorName: "Marcus Stone",
      operatorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      operatorRating: 4.7,
      status: "upcoming",
      date: "March 13, 2026",
      time: "10:00 AM",
      duration: "3 hours",
      location: "Fashion District",
      category: "Shopping",
      price: 200,
      equipment: "Phone Camera",
    },
    {
      id: "3",
      operatorName: "Elena Rodriguez",
      operatorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      operatorRating: 5.0,
      status: "completed",
      date: "March 1, 2026",
      time: "9:00 AM",
      duration: "4 hours",
      location: "Art Museum",
      category: "Virtual Tours",
      price: 300,
      equipment: "Smart Glasses",
    },
    {
      id: "4",
      operatorName: "David Kim",
      operatorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      operatorRating: 4.6,
      status: "completed",
      date: "February 25, 2026",
      time: "3:00 PM",
      duration: "2 hours",
      location: "Construction Site",
      category: "Inspection",
      price: 180,
      equipment: "360° Camera",
    },
    {
      id: "5",
      operatorName: "Olivia Park",
      operatorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      operatorRating: 4.8,
      status: "cancelled",
      date: "February 20, 2026",
      time: "1:00 PM",
      duration: "2 hours",
      location: "Tech Store",
      category: "Shopping",
      price: 180,
      equipment: "Phone Camera",
    },
  ];

  const filteredBookings = bookings.filter((booking) => booking.status === selectedTab);

  const statusConfig = {
    upcoming: {
      icon: Clock,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
    },
    completed: {
      icon: CheckCircle,
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
    },
    cancelled: {
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/20",
    },
  };

  const stats = {
    upcoming: bookings.filter((b) => b.status === "upcoming").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-2xl font-bold">My Bookings</h2>
              <p className="text-sm text-muted-foreground">
                {filteredBookings.length} {selectedTab} session{filteredBookings.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="flex gap-2">
            {(["upcoming", "completed", "cancelled"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedTab(status)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold capitalize transition-all ${
                  selectedTab === status
                    ? "bg-gradient-to-r from-primary to-blue-500 text-white shadow-lg shadow-primary/50"
                    : "bg-card border border-border text-foreground hover:border-primary/50"
                }`}
              >
                {status}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    selectedTab === status ? "bg-white/20" : "bg-secondary"
                  }`}
                >
                  {stats[status]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-6 py-6">
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="text-xl font-bold text-foreground mb-2">No {selectedTab} bookings</h3>
            <p className="text-muted-foreground mb-6">
              {selectedTab === "upcoming"
                ? "You don't have any upcoming sessions scheduled."
                : selectedTab === "completed"
                ? "You haven't completed any sessions yet."
                : "No cancelled bookings."}
            </p>
            {selectedTab === "upcoming" && (
              <button
                onClick={() => navigate("/map")}
                className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all"
              >
                Browse Operators
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking, index) => {
              const config = statusConfig[booking.status];
              const StatusIcon = config.icon;

              return (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-card border border-border rounded-2xl p-5 hover:border-primary/50 transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={booking.operatorImage}
                      alt={booking.operatorName}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-foreground mb-1">
                            {booking.operatorName}
                          </h3>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="text-yellow-500 fill-yellow-500" size={14} />
                              <span className="text-sm font-bold">{booking.operatorRating}</span>
                            </div>
                            <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                              {booking.category}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">${booking.price}</p>
                          <div
                            className={`flex items-center gap-1 mt-1 ${config.bg} ${config.border} border px-2 py-1 rounded-full`}
                          >
                            <StatusIcon size={12} className={config.color} />
                            <span className={`text-xs font-bold capitalize ${config.color}`}>
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} />
                      <span>
                        {booking.time} • {booking.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} />
                      <span>{booking.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Video size={14} />
                      <span>{booking.equipment}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-border">
                    {booking.status === "upcoming" && (
                      <>
                        <button
                          onClick={() => navigate(`/session/${booking.id}`)}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-primary to-blue-500 text-white font-bold rounded-xl hover:opacity-90 transition-all"
                        >
                          Join Session
                        </button>
                        <button
                          onClick={() => navigate(`/messages`)}
                          className="px-4 py-2 bg-secondary text-foreground rounded-xl hover:bg-secondary/80 transition-all"
                        >
                          <MessageCircle size={16} />
                        </button>
                        <button
                          onClick={() => navigate("/map")}
                          className="px-4 py-2 bg-secondary text-foreground rounded-xl hover:bg-secondary/80 transition-all"
                        >
                          <Navigation size={16} />
                        </button>
                      </>
                    )}
                    {booking.status === "completed" && (
                      <>
                        <button
                          onClick={() => navigate(`/summary/${booking.id}`)}
                          className="flex-1 px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all"
                        >
                          View Summary
                        </button>
                        <button
                          onClick={() => navigate(`/booking/${booking.id}`)}
                          className="px-4 py-2 bg-secondary text-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-all"
                        >
                          Rebook
                        </button>
                      </>
                    )}
                    {booking.status === "cancelled" && (
                      <>
                        <button
                          onClick={() => navigate(`/operator/${booking.id}`)}
                          className="flex-1 px-4 py-2 bg-secondary text-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-all"
                        >
                          View Operator
                        </button>
                        <button
                          onClick={() => navigate(`/booking/${booking.id}`)}
                          className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all"
                        >
                          Rebook
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
