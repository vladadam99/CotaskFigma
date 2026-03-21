import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Search,
  Filter,
  Star,
  MapPin,
  Video,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  Plus,
  MessageCircle,
  Briefcase,
  Clock,
  DollarSign,
} from "lucide-react";
import BottomNav from "./BottomNav";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Avatar {
  id: string;
  name: string;
  avatar: string;
  role: string;
  rating: number;
  totalJobs: number;
  hourlyRate: number;
  location: string;
  specialties: string[];
  equipment: string[];
  status: "available" | "busy" | "offline";
  responseTime: string;
  successRate: number;
  isTeamMember?: boolean;
}

export default function Team() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<"team" | "available">("team");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");

  const teamMembers: Avatar[] = [
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
      role: "Senior Avatar",
      rating: 4.9,
      totalJobs: 245,
      hourlyRate: 85,
      location: "New York, NY",
      specialties: ["Real Estate", "Virtual Tours"],
      equipment: ["360° Camera", "Smart Glasses"],
      status: "busy",
      responseTime: "< 5 min",
      successRate: 98,
      isTeamMember: true,
    },
    {
      id: "2",
      name: "Marcus Stone",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      role: "Specialist",
      rating: 4.7,
      totalJobs: 182,
      hourlyRate: 70,
      location: "Los Angeles, CA",
      specialties: ["Shopping", "Product Demo"],
      equipment: ["Phone Camera", "360° Camera"],
      status: "available",
      responseTime: "< 10 min",
      successRate: 95,
      isTeamMember: true,
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      role: "Expert",
      rating: 5.0,
      totalJobs: 328,
      hourlyRate: 100,
      location: "Miami, FL",
      specialties: ["Virtual Tours", "Museums"],
      equipment: ["Smart Glasses", "360° Camera"],
      status: "available",
      responseTime: "< 3 min",
      successRate: 99,
      isTeamMember: true,
    },
    {
      id: "4",
      name: "David Kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      role: "Technician",
      rating: 4.6,
      totalJobs: 156,
      hourlyRate: 65,
      location: "Chicago, IL",
      specialties: ["Inspection", "Construction"],
      equipment: ["360° Camera", "Phone Camera"],
      status: "offline",
      responseTime: "< 15 min",
      successRate: 93,
      isTeamMember: true,
    },
  ];

  const availableAvatars: Avatar[] = [
    {
      id: "5",
      name: "Olivia Park",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      role: "Shopping Expert",
      rating: 4.8,
      totalJobs: 215,
      hourlyRate: 75,
      location: "San Francisco, CA",
      specialties: ["Shopping", "Live Streaming"],
      equipment: ["Phone Camera", "Smart Glasses"],
      status: "available",
      responseTime: "< 8 min",
      successRate: 96,
      isTeamMember: false,
    },
    {
      id: "6",
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      role: "Real Estate Pro",
      rating: 4.9,
      totalJobs: 289,
      hourlyRate: 90,
      location: "Seattle, WA",
      specialties: ["Real Estate", "Virtual Tours"],
      equipment: ["360° Camera", "Smart Glasses"],
      status: "available",
      responseTime: "< 5 min",
      successRate: 97,
      isTeamMember: false,
    },
    {
      id: "7",
      name: "Sophia Anderson",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400",
      role: "Tour Specialist",
      rating: 4.7,
      totalJobs: 198,
      hourlyRate: 80,
      location: "Boston, MA",
      specialties: ["Virtual Tours", "Museums"],
      equipment: ["Smart Glasses", "360° Camera"],
      status: "busy",
      responseTime: "< 10 min",
      successRate: 94,
      isTeamMember: false,
    },
  ];

  const specialties = ["all", "Real Estate", "Shopping", "Virtual Tours", "Inspection", "Construction"];

  const statusColor = {
    available: "bg-green-500",
    busy: "bg-yellow-500",
    offline: "bg-gray-500",
  };

  const statusLabel = {
    available: "Available",
    busy: "Busy",
    offline: "Offline",
  };

  const currentList = selectedTab === "team" ? teamMembers : availableAvatars;

  const filteredAvatars = currentList.filter((avatar) => {
    const matchesSearch =
      avatar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      avatar.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      avatar.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "all" || avatar.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/enterprise")}
                className="p-2 rounded-xl hover:bg-secondary transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  {selectedTab === "team" ? "Your Team" : "Browse Avatars"}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {filteredAvatars.length} {selectedTab === "team" ? "team members" : "available avatars"}
                </p>
              </div>
            </div>
            <button className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-orange-500/50 transition-all">
              <Filter size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-4">
            {[
              { id: "team", label: "My Team", count: teamMembers.length },
              { id: "available", label: "Browse All", count: availableAvatars.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all ${
                  selectedTab === tab.id
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50"
                    : "bg-card border border-border text-foreground hover:border-orange-500/50"
                }`}
              >
                {tab.label}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    selectedTab === tab.id
                      ? "bg-white/20"
                      : "bg-secondary"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
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
              placeholder="Search by name, specialty, location..."
              className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
            />
          </div>

          {/* Specialties Filter */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2">
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => setSelectedSpecialty(specialty)}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                    selectedSpecialty === specialty
                      ? "bg-orange-500 text-white"
                      : "bg-card border border-border text-foreground hover:border-orange-500/50"
                  }`}
                >
                  {specialty === "all" ? "All" : specialty}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Stats (only show for team tab) */}
      {selectedTab === "team" && (
        <div className="px-6 py-6">
          <div className="grid grid-cols-4 gap-3 mb-6">
            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-3">
              <div className="flex items-center gap-1 mb-1">
                <CheckCircle className="text-green-500" size={16} />
                <p className="text-xs font-semibold text-muted-foreground">Active</p>
              </div>
              <p className="text-xl font-bold text-foreground">
                {teamMembers.filter((m) => m.status !== "offline").length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-3">
              <div className="flex items-center gap-1 mb-1">
                <Star className="text-yellow-500" size={16} />
                <p className="text-xs font-semibold text-muted-foreground">Avg Rating</p>
              </div>
              <p className="text-xl font-bold text-foreground">
                {(teamMembers.reduce((sum, m) => sum + m.rating, 0) / teamMembers.length).toFixed(1)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-3">
              <div className="flex items-center gap-1 mb-1">
                <Briefcase className="text-blue-500" size={16} />
                <p className="text-xs font-semibold text-muted-foreground">Jobs</p>
              </div>
              <p className="text-xl font-bold text-foreground">
                {teamMembers.reduce((sum, m) => sum + m.totalJobs, 0)}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-2xl p-3">
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp className="text-purple-500" size={16} />
                <p className="text-xs font-semibold text-muted-foreground">Success</p>
              </div>
              <p className="text-xl font-bold text-foreground">
                {Math.round(teamMembers.reduce((sum, m) => sum + m.successRate, 0) / teamMembers.length)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Avatars List */}
      <div className="px-6 pb-6">
        <div className="space-y-4">
          {filteredAvatars.map((avatar, index) => (
            <motion.div
              key={avatar.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-2xl p-5 hover:border-orange-500/50 transition-all"
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="relative">
                  <img
                    src={avatar.avatar}
                    alt={avatar.name}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-6 h-6 ${
                      statusColor[avatar.status]
                    } rounded-full border-2 border-background`}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{avatar.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{avatar.role}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="text-yellow-500 fill-yellow-500" size={14} />
                          <span className="text-sm font-bold">{avatar.rating}</span>
                          <span className="text-xs text-muted-foreground">({avatar.totalJobs})</span>
                        </div>
                        <div className={`px-2 py-1 ${statusColor[avatar.status]} text-white text-xs font-bold rounded-full`}>
                          {statusLabel[avatar.status]}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-500">${avatar.hourlyRate}</p>
                      <p className="text-xs text-muted-foreground">/hour</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={14} />
                  <span>{avatar.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock size={14} />
                  <span>{avatar.responseTime} response</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle size={14} />
                  <span>{avatar.successRate}% success rate</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Video size={14} />
                  <span>{avatar.equipment.length} devices</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {avatar.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-orange-500/10 text-orange-500 text-xs font-semibold rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Equipment */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground mb-2">Equipment</p>
                <div className="flex flex-wrap gap-2">
                  {avatar.equipment.map((equip) => (
                    <span
                      key={equip}
                      className="px-3 py-1 bg-secondary text-foreground text-xs font-semibold rounded-full"
                    >
                      {equip}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-border">
                {avatar.isTeamMember ? (
                  <>
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2">
                      <Briefcase size={16} />
                      Assign Task
                    </button>
                    <button className="px-4 py-2 bg-secondary text-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-all">
                      <MessageCircle size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2">
                      <Plus size={16} />
                      Add to Team
                    </button>
                    <button className="px-4 py-2 bg-secondary text-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-all">
                      View Profile
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredAvatars.length === 0 && (
          <div className="text-center py-12">
            <Users className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="text-xl font-bold text-foreground mb-2">No avatars found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
