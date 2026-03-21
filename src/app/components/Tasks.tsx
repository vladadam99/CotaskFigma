import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Plus,
  Search,
  Filter,
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Video,
  CheckCircle2,
  AlertCircle,
  Target,
  Activity,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import BottomNav from "./BottomNav";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Task {
  id: string;
  title: string;
  assignedTo: string;
  avatarImage: string;
  status: "active" | "scheduled" | "completed";
  category: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
  location: string;
  estimatedHours: number;
  budget: number;
  equipment: string;
  progress?: number;
}

export default function Tasks() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<"all" | "active" | "scheduled" | "completed">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const tasks: Task[] = [
    {
      id: "1",
      title: "Site inspection - Downtown Office",
      assignedTo: "Sarah Chen",
      avatarImage: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
      status: "active",
      category: "Real Estate",
      priority: "high",
      dueDate: "Today, 2:00 PM",
      location: "123 Main St, NYC",
      estimatedHours: 2,
      budget: 150,
      equipment: "360° Camera",
      progress: 65,
    },
    {
      id: "2",
      title: "Product photography - New Collection",
      assignedTo: "Marcus Stone",
      avatarImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      status: "active",
      category: "Shopping",
      priority: "medium",
      dueDate: "Tomorrow, 10:00 AM",
      location: "Fashion District",
      estimatedHours: 3,
      budget: 200,
      equipment: "Phone Camera",
      progress: 30,
    },
    {
      id: "3",
      title: "Virtual tour - Museum Exhibition",
      assignedTo: "Elena Rodriguez",
      avatarImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      status: "completed",
      category: "Virtual Tours",
      priority: "low",
      dueDate: "Completed",
      location: "Art Museum",
      estimatedHours: 4,
      budget: 300,
      equipment: "Smart Glasses",
      progress: 100,
    },
    {
      id: "4",
      title: "Equipment inspection - Factory Floor",
      assignedTo: "David Kim",
      avatarImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      status: "scheduled",
      category: "Inspection",
      priority: "high",
      dueDate: "March 12, 9:00 AM",
      location: "Manufacturing Plant",
      estimatedHours: 5,
      budget: 450,
      equipment: "360° Camera",
    },
    {
      id: "5",
      title: "Live shopping stream - Electronics",
      assignedTo: "Olivia Park",
      avatarImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400",
      status: "active",
      category: "Shopping",
      priority: "medium",
      dueDate: "March 11, 6:00 PM",
      location: "Tech Store",
      estimatedHours: 2,
      budget: 180,
      equipment: "Phone Camera",
      progress: 45,
    },
    {
      id: "6",
      title: "Construction site documentation",
      assignedTo: "James Wilson",
      avatarImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
      status: "scheduled",
      category: "Construction",
      priority: "high",
      dueDate: "March 13, 7:00 AM",
      location: "Construction Site",
      estimatedHours: 5,
      budget: 400,
      equipment: "360° Camera",
    },
  ];

  const priorityColor = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };

  const statusColor = {
    active: "bg-blue-500",
    scheduled: "bg-purple-500",
    completed: "bg-green-500",
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = selectedStatus === "all" || task.status === selectedStatus;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const taskStats = {
    active: tasks.filter((t) => t.status === "active").length,
    scheduled: tasks.filter((t) => t.status === "scheduled").length,
    completed: tasks.filter((t) => t.status === "completed").length,
    totalBudget: tasks.reduce((sum, t) => sum + t.budget, 0),
  };

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
                  All Tasks
                </h2>
                <p className="text-sm text-muted-foreground">{filteredTasks.length} tasks found</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-orange-500/50 transition-all">
                <Filter size={20} />
              </button>
              <motion.button
                onClick={() => navigate("/enterprise")} // Navigate back to create task
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/50 flex items-center gap-2"
              >
                <Plus size={20} />
                Create
              </motion.button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks by title, avatar, location..."
              className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {[
              { id: "all", label: "All", count: tasks.length },
              { id: "active", label: "Active", count: taskStats.active },
              { id: "scheduled", label: "Scheduled", count: taskStats.scheduled },
              { id: "completed", label: "Completed", count: taskStats.completed },
            ].map((status) => (
              <button
                key={status.id}
                onClick={() => setSelectedStatus(status.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                  selectedStatus === status.id
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50"
                    : "bg-card border border-border text-foreground hover:border-orange-500/50"
                }`}
              >
                {status.label}
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    selectedStatus === status.id ? "bg-white/20" : "bg-secondary"
                  }`}
                >
                  {status.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-3">
            <div className="flex items-center gap-1 mb-1">
              <Activity className="text-blue-500" size={16} />
              <p className="text-xs font-semibold text-muted-foreground">Active</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{taskStats.active}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20 rounded-2xl p-3">
            <div className="flex items-center gap-1 mb-1">
              <Calendar className="text-purple-500" size={16} />
              <p className="text-xs font-semibold text-muted-foreground">Scheduled</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{taskStats.scheduled}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-3">
            <div className="flex items-center gap-1 mb-1">
              <CheckCircle2 className="text-green-500" size={16} />
              <p className="text-xs font-semibold text-muted-foreground">Done</p>
            </div>
            <p className="text-2xl font-bold text-foreground">{taskStats.completed}</p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-3">
            <div className="flex items-center gap-1 mb-1">
              <DollarSign className="text-orange-500" size={16} />
              <p className="text-xs font-semibold text-muted-foreground">Budget</p>
            </div>
            <p className="text-xl font-bold text-foreground">${(taskStats.totalBudget / 1000).toFixed(1)}K</p>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-card border border-border rounded-2xl p-5 hover:border-orange-500/50 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-1 ${
                        priorityColor[task.priority]
                      } text-white text-xs font-bold rounded-full capitalize`}
                    >
                      {task.priority}
                    </span>
                    <span
                      className={`px-2 py-1 ${
                        statusColor[task.status]
                      } text-white text-xs font-bold rounded-full capitalize`}
                    >
                      {task.status}
                    </span>
                    <span className="px-2 py-1 bg-orange-500/10 text-orange-500 text-xs font-semibold rounded-full">
                      {task.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{task.title}</h3>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-orange-500">${task.budget}</p>
                  <p className="text-xs text-muted-foreground">Budget</p>
                </div>
              </div>

              {/* Progress bar (only for active tasks) */}
              {task.status === "active" && task.progress !== undefined && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-muted-foreground">Progress</span>
                    <span className="text-xs font-bold text-foreground">{task.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span>{task.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{task.estimatedHours} hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{task.dueDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Video size={14} />
                  <span>{task.equipment}</span>
                </div>
              </div>

              {/* Avatar Info & Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <img
                    src={task.avatarImage}
                    alt={task.assignedTo}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-foreground">{task.assignedTo}</p>
                    <p className="text-xs text-muted-foreground">Assigned Avatar</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-2 bg-secondary text-foreground rounded-xl hover:bg-secondary/80 transition-all">
                    <Edit size={16} />
                  </button>
                  {task.status === "active" && (
                    <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:opacity-90 transition-all flex items-center gap-2">
                      <Eye size={16} />
                      Monitor
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <Target className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="text-xl font-bold text-foreground mb-2">No tasks found</h3>
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
