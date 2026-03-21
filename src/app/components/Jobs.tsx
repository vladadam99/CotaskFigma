import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Filter,
  Search,
  Calendar,
  Video,
  User,
  Briefcase,
  TrendingUp,
  Award,
  Zap,
} from "lucide-react";
import BottomNav from "./BottomNav";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Job {
  id: string;
  title: string;
  client: string;
  clientImage: string;
  category: string;
  location: string;
  date: string;
  time: string;
  duration: string;
  pay: number;
  difficulty: "easy" | "medium" | "hard";
  equipment: string;
  description: string;
  requirements: string[];
  clientRating: number;
  urgency?: "urgent" | "scheduled";
}

export default function Jobs() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const jobs: Job[] = [
    {
      id: "1",
      title: "Virtual Home Tour - Luxury Apartment",
      client: "Sarah Chen",
      clientImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      category: "Real Estate",
      location: "Downtown NYC",
      date: "Today",
      time: "2:00 PM - 3:30 PM",
      duration: "1.5 hours",
      pay: 150,
      difficulty: "easy",
      equipment: "360° Camera",
      description: "Show luxury 2-bedroom apartment to potential buyers. Walk through all rooms, highlight amenities.",
      requirements: ["360° Camera experience", "Real estate knowledge", "Professional communication"],
      clientRating: 4.9,
      urgency: "urgent",
    },
    {
      id: "2",
      title: "Product Photography Session",
      client: "Marcus Stone",
      clientImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      category: "Shopping",
      location: "Fashion District",
      date: "Tomorrow",
      time: "10:00 AM - 1:00 PM",
      duration: "3 hours",
      pay: 200,
      difficulty: "medium",
      equipment: "Phone Camera",
      description: "Photograph new clothing collection for online store. Multiple angles, good lighting required.",
      requirements: ["Photography skills", "Fashion knowledge", "Attention to detail"],
      clientRating: 4.7,
    },
    {
      id: "3",
      title: "Museum Exhibition Virtual Tour",
      client: "Elena Rodriguez",
      clientImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      category: "Virtual Tours",
      location: "Art Museum",
      date: "March 12",
      time: "9:00 AM - 1:00 PM",
      duration: "4 hours",
      pay: 300,
      difficulty: "medium",
      equipment: "Smart Glasses",
      description: "Conduct live virtual tour of new art exhibition. Provide detailed commentary on artworks.",
      requirements: ["Art history knowledge", "Public speaking", "Smart glasses experience"],
      clientRating: 5.0,
    },
    {
      id: "4",
      title: "Factory Equipment Inspection",
      client: "TechCorp Ltd",
      clientImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
      category: "Inspection",
      location: "Industrial Zone",
      date: "Today",
      time: "4:00 PM - 9:00 PM",
      duration: "5 hours",
      pay: 450,
      difficulty: "hard",
      equipment: "360° Camera",
      description: "Inspect factory machinery and report any issues. Technical knowledge required.",
      requirements: ["Technical expertise", "Safety certification", "Report writing"],
      clientRating: 4.8,
      urgency: "urgent",
    },
    {
      id: "5",
      title: "Live Shopping Stream - Electronics",
      client: "Olivia Park",
      clientImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      category: "Shopping",
      location: "Tech Store",
      date: "March 11",
      time: "6:00 PM - 8:00 PM",
      duration: "2 hours",
      pay: 180,
      difficulty: "easy",
      equipment: "Phone Camera",
      description: "Live stream shopping experience at electronics store. Help viewers choose products.",
      requirements: ["Tech knowledge", "Engaging personality", "Live streaming experience"],
      clientRating: 4.6,
    },
    {
      id: "6",
      title: "Remote Site Inspection - Construction",
      client: "David Kim",
      clientImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      category: "Construction",
      location: "Construction Site",
      date: "March 13",
      time: "7:00 AM - 12:00 PM",
      duration: "5 hours",
      pay: 400,
      difficulty: "hard",
      equipment: "360° Camera",
      description: "Inspect construction progress and document everything for remote client.",
      requirements: ["Construction knowledge", "Safety gear", "Detailed documentation"],
      clientRating: 4.9,
    },
  ];

  const categories = [
    { id: "all", label: "All Jobs", icon: Briefcase },
    { id: "Real Estate", label: "Real Estate", icon: MapPin },
    { id: "Shopping", label: "Shopping", icon: Video },
    { id: "Virtual Tours", label: "Tours", icon: Calendar },
    { id: "Inspection", label: "Inspection", icon: Award },
  ];

  const difficultyColor = {
    easy: "bg-green-500",
    medium: "bg-yellow-500",
    hard: "bg-red-500",
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                  Available Jobs
                </h2>
                <p className="text-sm text-muted-foreground">{filteredJobs.length} missions available</p>
              </div>
            </div>
            <button className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary/50 transition-all">
              <Filter size={20} />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs by title, category, location..."
              className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="px-6 pb-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-primary to-blue-500 text-white shadow-lg shadow-primary/50"
                    : "bg-card border border-border text-foreground hover:border-primary/50"
                }`}
              >
                <cat.icon size={18} />
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="text-primary" size={20} />
              <p className="text-sm font-semibold text-muted-foreground">Urgent</p>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {jobs.filter((j) => j.urgency === "urgent").length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="text-green-500" size={20} />
              <p className="text-sm font-semibold text-muted-foreground">High Pay</p>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {jobs.filter((j) => j.pay >= 300).length}
            </p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="text-yellow-500" size={20} />
              <p className="text-sm font-semibold text-muted-foreground">Easy</p>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {jobs.filter((j) => j.difficulty === "easy").length}
            </p>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-2xl p-5 hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => navigate(`/job/${job.id}`)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {job.urgency === "urgent" && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <Zap size={12} />
                        URGENT
                      </span>
                    )}
                    <span
                      className={`px-2 py-1 ${
                        difficultyColor[job.difficulty]
                      } text-white text-xs font-bold rounded-full capitalize`}
                    >
                      {job.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {job.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{job.title}</h3>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">${job.pay}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{job.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{job.date} • {job.time.split(" - ")[0]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video size={14} />
                  <span>{job.equipment}</span>
                </div>
              </div>

              {/* Client Info */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <img
                    src={job.clientImage}
                    alt={job.client}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{job.client}</p>
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-500 fill-yellow-500" size={12} />
                      <span className="text-xs font-semibold">{job.clientRating}</span>
                      <span className="text-xs text-muted-foreground">• Client Rating</span>
                    </div>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-primary/50"
                >
                  Apply Now
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="text-xl font-bold text-foreground mb-2">No jobs found</h3>
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
