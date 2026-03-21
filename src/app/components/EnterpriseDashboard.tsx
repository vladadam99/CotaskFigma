import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Plus,
  Search,
  Building2,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  TrendingUp,
  DollarSign,
  BarChart3,
  FileText,
  Settings,
  MapPin,
  Video,
  AlertCircle,
  Target,
  Briefcase,
  Activity,
  Star,
  Bell,
  Filter,
  TrendingDown,
  Play,
  Eye,
} from "lucide-react";
import CreateTaskModal from "./CreateTaskModal";
import EditTaskModal from "./EditTaskModal";
import BottomNav from "./BottomNav";

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
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  activeTasks: number;
  completedTasks: number;
  status: "available" | "busy" | "offline";
  rating: number;
}

export default function EnterpriseDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"dashboard" | "tasks" | "avatars" | "analytics">(
    "dashboard"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showEditTask, setShowEditTask] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [allTasks, setAllTasks] = useState<Task[]>([
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
  ]);

  const stats = {
    activeTasks: 24,
    completedTasks: 156,
    totalSpending: 48750,
    teamSize: 12,
    averageRating: 4.8,
    monthlyGrowth: 12,
  };

  const teamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Sarah Chen",
      role: "Senior Avatar",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400",
      activeTasks: 3,
      completedTasks: 45,
      status: "busy",
      rating: 4.9,
    },
    {
      id: "2",
      name: "Marcus Stone",
      role: "Specialist",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      activeTasks: 2,
      completedTasks: 38,
      status: "available",
      rating: 4.7,
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      role: "Expert",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
      activeTasks: 1,
      completedTasks: 52,
      status: "available",
      rating: 5.0,
    },
    {
      id: "4",
      name: "David Kim",
      role: "Technician",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
      activeTasks: 0,
      completedTasks: 21,
      status: "offline",
      rating: 4.6,
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

  const memberStatusColor = {
    available: "bg-green-500",
    busy: "bg-yellow-500",
    offline: "bg-gray-500",
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/role-selection")}
                className="p-2 rounded-xl hover:bg-secondary transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Enterprise Dashboard
                </h2>
                <p className="text-sm text-muted-foreground">TechCorp International</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/notifications")}
                className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-orange-500/50 transition-all relative"
              >
                <Bell size={20} />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold">
                  4
                </div>
              </button>
              <button
                onClick={() => navigate("/settings")}
                className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-orange-500/50 transition-all"
              >
                <Settings size={20} />
              </button>
            </div>
          </div>

          {/* Search & Create Task */}
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={18}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tasks, avatars, projects..."
                className="w-full bg-card border border-border rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
              />
            </div>
            <motion.button
              onClick={() => setShowCreateTask(true)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl flex items-center gap-2 shadow-xl shadow-orange-500/50"
            >
              <Plus size={20} />
              Create Task
            </motion.button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {[
            { id: "dashboard", label: "Dashboard", icon: BarChart3 },
            { id: "tasks", label: "Tasks", icon: Target },
            { id: "avatars", label: "Avatars", icon: Users },
            { id: "analytics", label: "Analytics", icon: Activity },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/50"
                  : "bg-card border border-border text-foreground hover:border-orange-500/50"
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        <AnimatePresence mode="wait">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                      <Target className="text-blue-500" size={24} />
                    </div>
                    <TrendingUp className="text-green-500" size={18} />
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">{stats.activeTasks}</p>
                  <p className="text-sm text-muted-foreground">Active Tasks</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                      <CheckCircle2 className="text-green-500" size={24} />
                    </div>
                    <TrendingUp className="text-green-500" size={18} />
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">{stats.completedTasks}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                      <Users className="text-purple-500" size={24} />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {stats.teamSize} Total
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">
                    {teamMembers.filter((m) => m.status === "available").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Available Now</p>
                </div>

                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                      <DollarSign className="text-orange-500" size={24} />
                    </div>
                    <TrendingDown className="text-red-500" size={18} />
                  </div>
                  <p className="text-3xl font-bold text-foreground mb-1">
                    ${(stats.totalSpending / 1000).toFixed(1)}K
                  </p>
                  <p className="text-sm text-muted-foreground">This Month</p>
                </div>
              </div>

              {/* Company Overview */}
              <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/50 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl shadow-orange-500/50">
                    <Building2 className="text-white" size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-1">TechCorp International</h3>
                    <p className="text-sm text-muted-foreground">
                      Enterprise • Technology • Since 2020
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-foreground mb-1">
                      {stats.completedTasks}
                    </p>
                    <p className="text-xs text-muted-foreground">Total Projects</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="text-yellow-500 fill-yellow-500" size={20} />
                      <p className="text-3xl font-bold text-foreground">{stats.averageRating}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Avg Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-500 mb-1">+{stats.monthlyGrowth}%</p>
                    <p className="text-xs text-muted-foreground">Growth</p>
                  </div>
                </div>
              </div>

              {/* Active Tasks Preview */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Activity className="text-orange-500" size={24} />
                    Active Tasks
                  </h3>
                  <button
                    onClick={() => setActiveTab("tasks")}
                    className="text-sm text-orange-500 font-semibold"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {allTasks
                    .filter((t) => t.status === "active")
                    .slice(0, 3)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="bg-card border border-border rounded-2xl p-5 hover:border-orange-500/50 transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className={`px-2 py-1 ${
                                  priorityColor[task.priority]
                                } text-white text-xs font-bold rounded-full capitalize`}
                              >
                                {task.priority}
                              </span>
                              <span className="px-2 py-1 bg-orange-500/10 text-orange-500 text-xs font-semibold rounded-full">
                                {task.category}
                              </span>
                            </div>
                            <h4 className="text-lg font-bold text-foreground mb-2">{task.title}</h4>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <MapPin size={14} />
                                <span>{task.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock size={14} />
                                <span>
                                  {task.estimatedHours}h • {task.dueDate}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-orange-500">${task.budget}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="flex items-center gap-3">
                            <img
                              src={task.avatarImage}
                              alt={task.assignedTo}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-sm font-semibold text-foreground">
                                {task.assignedTo}
                              </p>
                              <p className="text-xs text-muted-foreground">{task.equipment}</p>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-orange-500/10 text-orange-500 font-semibold rounded-xl hover:bg-orange-500/20 transition-all flex items-center gap-2">
                            <Eye size={16} />
                            Monitor
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Tasks Tab */}
          {activeTab === "tasks" && (
            <motion.div
              key="tasks"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Target className="text-orange-500" size={24} />
                  All Tasks
                </h3>
                <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl hover:border-orange-500/50 transition-all">
                  <Filter size={16} />
                  <span className="text-sm font-medium">Filter</span>
                </button>
              </div>

              {allTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-card border border-border rounded-2xl p-5 hover:border-orange-500/50 transition-all"
                >
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
                      <h4 className="text-lg font-bold text-foreground mb-2">{task.title}</h4>
                      <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          <span>{task.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={14} />
                          <span>{task.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Video size={14} />
                          <span>{task.equipment}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Activity size={14} />
                          <span>{task.estimatedHours} hours</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-orange-500 mb-1">${task.budget}</p>
                      <p className="text-xs text-muted-foreground">Budget</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border">
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
                      <button
                        onClick={() => {
                          setSelectedTask(task);
                          setShowEditTask(true);
                        }}
                        className="px-4 py-2 bg-secondary text-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-all"
                      >
                        Edit
                      </button>
                      {task.status === "active" && (
                        <button className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-500/90 transition-all flex items-center gap-2">
                          <Play size={16} />
                          Monitor Live
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Avatars Tab */}
          {activeTab === "avatars" && (
            <motion.div
              key="avatars"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Users className="text-orange-500" size={24} />
                  Team Avatars
                </h3>
                <div className="bg-orange-500/10 px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-orange-500">
                    {teamMembers.length} Members
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-card border border-border rounded-2xl p-5 hover:border-orange-500/50 transition-all"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-5 h-5 ${
                            memberStatusColor[member.status]
                          } rounded-full border-2 border-background`}
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground mb-1">{member.name}</h4>
                        <p className="text-xs text-muted-foreground mb-1">{member.role}</p>
                        <div className="flex items-center gap-1">
                          <Star className="text-yellow-500 fill-yellow-500" size={12} />
                          <span className="text-xs font-semibold">{member.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-background/50 rounded-xl p-2 text-center">
                        <p className="text-lg font-bold text-foreground">{member.activeTasks}</p>
                        <p className="text-xs text-muted-foreground">Active</p>
                      </div>
                      <div className="bg-background/50 rounded-xl p-2 text-center">
                        <p className="text-lg font-bold text-foreground">{member.completedTasks}</p>
                        <p className="text-xs text-muted-foreground">Done</p>
                      </div>
                    </div>

                    <button className="w-full py-2 bg-orange-500/10 text-orange-500 font-semibold rounded-xl hover:bg-orange-500/20 transition-all">
                      View Profile
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                <BarChart3 className="text-orange-500" size={24} />
                Performance Analytics
              </h3>

              {/* Performance Metrics */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h4 className="text-lg font-bold text-foreground mb-4">Monthly Performance</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Tasks Completed</span>
                      <span className="text-sm font-bold text-foreground">156/180</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                        style={{ width: "87%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Budget Utilization</span>
                      <span className="text-sm font-bold text-foreground">$48.7K / $60K</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                        style={{ width: "81%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Client Satisfaction</span>
                      <span className="text-sm font-bold text-foreground">96%</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        style={{ width: "96%" }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-card border border-border rounded-2xl p-6">
                <h4 className="text-lg font-bold text-foreground mb-4">Cost Breakdown</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-xl">
                    <span className="text-sm text-muted-foreground">Avatar Services</span>
                    <span className="text-sm font-bold text-foreground">$32,450</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-xl">
                    <span className="text-sm text-muted-foreground">Equipment Rental</span>
                    <span className="text-sm font-bold text-foreground">$8,900</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-background/50 rounded-xl">
                    <span className="text-sm text-muted-foreground">Platform Fees</span>
                    <span className="text-sm font-bold text-foreground">$7,400</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Create Task Modal */}
      <CreateTaskModal
        isOpen={showCreateTask}
        onClose={() => setShowCreateTask(false)}
        onCreateTask={(newTask) => setAllTasks([...allTasks, newTask])}
      />

      {/* Edit Task Modal */}
      <EditTaskModal
        isOpen={showEditTask}
        onClose={() => {
          setShowEditTask(false);
          setSelectedTask(null);
        }}
        onSaveTask={(updatedTask) => {
          setAllTasks(allTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
        }}
        task={selectedTask}
      />
    </div>
  );
}