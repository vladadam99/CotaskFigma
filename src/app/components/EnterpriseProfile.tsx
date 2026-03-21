import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { 
  ArrowLeft, 
  Building2, 
  Users, 
  DollarSign, 
  Bell, 
  HelpCircle,
  LogOut,
  ChevronRight,
  Settings,
  BarChart3,
  Shield,
  CreditCard,
  FileText,
  Globe,
  Briefcase,
  Target
} from "lucide-react";
import BottomNav from "./BottomNav";

const teamStats = [
  {
    id: 1,
    metric: "Active Avatars",
    value: "12",
    change: "+2 this month",
    icon: Users,
  },
  {
    id: 2,
    metric: "Total Sessions",
    value: "248",
    change: "+34 this week",
    icon: Target,
  },
  {
    id: 3,
    metric: "Total Spent",
    value: "$8,420",
    change: "+$1,240 this month",
    icon: DollarSign,
  },
];

const menuItems = [
  {
    icon: Settings,
    label: "Company Settings",
    path: "/settings",
  },
  {
    icon: Users,
    label: "Team Management",
    path: "/enterprise",
    badge: "12 active",
  },
  {
    icon: BarChart3,
    label: "Analytics Dashboard",
    path: "/enterprise",
  },
  {
    icon: CreditCard,
    label: "Billing & Payments",
    path: "/payment-methods",
  },
  {
    icon: FileText,
    label: "Reports & Invoices",
    path: "/reports",
  },
  {
    icon: Shield,
    label: "Security & Compliance",
    path: "/security",
  },
  {
    icon: Bell,
    label: "Notifications",
    path: "/notifications",
  },
];

export default function EnterpriseProfile() {
  const navigate = useNavigate();

  const enterprise = {
    companyName: "TechCorp Solutions",
    industry: "Technology Services",
    email: "admin@techcorp.com",
    memberSince: "December 2025",
    plan: "Enterprise Pro",
    teamSize: 12,
    activeAvatars: 12,
    totalSessions: 248,
    monthlyBudget: 15000,
    spent: 8420,
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-md mx-auto p-6 flex items-center gap-4">
          <button
            onClick={() => navigate("/enterprise")}
            className="w-10 h-10 bg-card border border-border rounded-full flex items-center justify-center hover:border-primary/50 transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">Enterprise Profile</h2>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 space-y-6 mt-6">
        {/* Enterprise Info */}
        <div className="bg-gradient-to-br from-violet-500/10 via-indigo-500/10 to-violet-600/10 border border-violet-500/20 rounded-2xl p-6 text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold">{enterprise.companyName}</h3>
            <p className="text-violet-500 text-sm font-medium">{enterprise.industry}</p>
            <p className="text-muted-foreground text-xs mt-1">{enterprise.email}</p>
            <p className="text-muted-foreground text-xs">Member since {enterprise.memberSince}</p>
          </div>

          {/* Plan Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-500 to-indigo-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            <Shield className="w-4 h-4" />
            {enterprise.plan}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-violet-500/20">
            <div>
              <p className="text-xl font-semibold text-violet-500">{enterprise.teamSize}</p>
              <p className="text-xs text-muted-foreground">Team Members</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-violet-500">{enterprise.activeAvatars}</p>
              <p className="text-xs text-muted-foreground">Active Avatars</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-violet-500">{enterprise.totalSessions}</p>
              <p className="text-xs text-muted-foreground">Sessions</p>
            </div>
          </div>

          {/* Budget Overview */}
          <div className="bg-gradient-to-r from-violet-500 to-indigo-500 rounded-xl p-4 mt-4">
            <div className="text-white">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm opacity-90">Monthly Budget</p>
                <p className="text-sm font-semibold">${enterprise.monthlyBudget.toLocaleString()}</p>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mb-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all"
                  style={{ width: `${(enterprise.spent / enterprise.monthlyBudget) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs opacity-80">Spent: ${enterprise.spent.toLocaleString()}</p>
                <p className="text-xs opacity-80">
                  {Math.round((enterprise.spent / enterprise.monthlyBudget) * 100)}% used
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="space-y-3">
          {teamStats.map((stat) => (
            <div key={stat.id} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-500/10 rounded-lg flex items-center justify-center">
                    <stat.icon className="text-violet-500" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.metric}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-green-500 font-medium">{stat.change}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Menu Items */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 p-4 hover:bg-secondary transition-all ${
                index !== menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="w-10 h-10 bg-violet-500/10 rounded-xl flex items-center justify-center">
                <item.icon className="text-violet-500" size={20} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-foreground">{item.label}</p>
                {item.badge && (
                  <p className="text-xs text-muted-foreground">{item.badge}</p>
                )}
              </div>
              <ChevronRight className="text-muted-foreground" size={20} />
            </button>
          ))}
        </div>

        {/* Help & Support */}
        <button
          onClick={() => navigate("/help")}
          className="w-full bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:bg-secondary transition-all"
        >
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
            <HelpCircle className="text-primary" size={20} />
          </div>
          <div className="flex-1 text-left">
            <p className="font-medium text-foreground">Enterprise Support</p>
            <p className="text-sm text-muted-foreground">24/7 priority assistance</p>
          </div>
          <ChevronRight className="text-muted-foreground" size={20} />
        </button>

        {/* Logout */}
        <button
          onClick={() => {
            localStorage.removeItem('userRole');
            navigate("/role-selection");
          }}
          className="w-full bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl p-4 flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all font-medium"
        >
          <LogOut size={20} />
          Log Out
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
