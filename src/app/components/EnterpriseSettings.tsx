import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  User,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  LogOut,
  Trash2,
  Camera,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Languages,
  Accessibility,
  Users,
  Building,
  FileText,
  Target,
  BarChart3,
  Settings,
  CheckCircle,
  UserPlus,
} from "lucide-react";
import BottomNav from "./BottomNav";

export default function EnterpriseSettings() {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [requireApproval, setRequireApproval] = useState(true);
  const [autoInvoicing, setAutoInvoicing] = useState(true);
  const [teamNotifications, setTeamNotifications] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const settingsSections = [
    {
      title: "Company Account",
      items: [
        {
          icon: Building,
          label: "Company Profile",
          value: "TechCorp Industries",
          onClick: () => navigate("/profile"),
        },
        {
          icon: Mail,
          label: "Company Email",
          value: "contact@techcorp.com",
          onClick: () => {},
        },
        {
          icon: Phone,
          label: "Business Phone",
          value: "+1 (555) 888-9999",
          onClick: () => {},
        },
        {
          icon: MapPin,
          label: "Office Locations",
          value: "New York, NY • 5 more",
          onClick: () => {},
        },
        {
          icon: FileText,
          label: "Business License",
          value: "Verified",
          onClick: () => {},
        },
      ],
    },
    {
      title: "Team Management",
      items: [
        {
          icon: Users,
          label: "Team Members",
          value: "12 administrators",
          onClick: () => navigate("/team"),
        },
        {
          icon: UserPlus,
          label: "Invite Team Members",
          value: "Add new admins",
          onClick: () => {},
        },
        {
          icon: Shield,
          label: "Roles & Permissions",
          value: "Manage access levels",
          onClick: () => {},
        },
        {
          icon: CheckCircle,
          label: "Approval Workflow",
          value: "Require manager approval",
          toggle: true,
          checked: requireApproval,
          onChange: () => setRequireApproval(!requireApproval),
        },
      ],
    },
    {
      title: "Avatar Management",
      items: [
        {
          icon: Users,
          label: "Approved Avatars",
          value: "8 operators in your network",
          onClick: () => navigate("/team"),
        },
        {
          icon: Target,
          label: "Avatar Preferences",
          value: "Set required qualifications",
          onClick: () => {},
        },
        {
          icon: BarChart3,
          label: "Performance Metrics",
          value: "Track avatar analytics",
          onClick: () => {},
        },
        {
          icon: DollarSign,
          label: "Rate Negotiation",
          value: "Manage pricing agreements",
          onClick: () => {},
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          icon: Bell,
          label: "Push Notifications",
          value: "",
          toggle: true,
          checked: notificationsEnabled,
          onChange: () => setNotificationsEnabled(!notificationsEnabled),
        },
        {
          icon: Users,
          label: "Team Activity",
          value: "Member actions & updates",
          toggle: true,
          checked: teamNotifications,
          onChange: () => setTeamNotifications(!teamNotifications),
        },
        {
          icon: Target,
          label: "Task Updates",
          value: "Job status changes",
          onClick: () => {},
        },
        {
          icon: DollarSign,
          label: "Billing Alerts",
          value: "Invoices & payments",
          onClick: () => {},
        },
        {
          icon: Volume2,
          label: "Sound Effects",
          value: "",
          toggle: true,
          checked: soundEnabled,
          onChange: () => setSoundEnabled(!soundEnabled),
        },
      ],
    },
    {
      title: "Privacy & Security",
      items: [
        {
          icon: Shield,
          label: "Security Settings",
          value: "Company data protection",
          onClick: () => {},
        },
        {
          icon: Lock,
          label: "Change Password",
          value: "",
          onClick: () => {},
        },
        {
          icon: Shield,
          label: "Two-Factor Authentication",
          value: "Required for all admins",
          onClick: () => {},
        },
        {
          icon: Eye,
          label: "Data Privacy",
          value: "GDPR & compliance",
          onClick: () => {},
        },
        {
          icon: FileText,
          label: "Audit Logs",
          value: "View all account activity",
          onClick: () => {},
        },
      ],
    },
    {
      title: "Billing & Payments",
      items: [
        {
          icon: CreditCard,
          label: "Payment Methods",
          value: "Company credit cards",
          onClick: () => navigate("/payment-methods"),
        },
        {
          icon: DollarSign,
          label: "Billing Dashboard",
          value: "View all expenses",
          onClick: () => navigate("/enterprise"),
        },
        {
          icon: FileText,
          label: "Auto Invoicing",
          value: "Automatic monthly invoices",
          toggle: true,
          checked: autoInvoicing,
          onChange: () => setAutoInvoicing(!autoInvoicing),
        },
        {
          icon: BarChart3,
          label: "Spending Analytics",
          value: "Track department budgets",
          onClick: () => {},
        },
        {
          icon: FileText,
          label: "Tax Documents",
          value: "Download receipts & reports",
          onClick: () => {},
        },
      ],
    },
    {
      title: "Integrations",
      items: [
        {
          icon: Settings,
          label: "API Access",
          value: "Developer tools",
          onClick: () => {},
        },
        {
          icon: Globe,
          label: "Webhooks",
          value: "Event notifications",
          onClick: () => {},
        },
        {
          icon: FileText,
          label: "Export Data",
          value: "Download company data",
          onClick: () => {},
        },
      ],
    },
    {
      title: "Preferences",
      items: [
        {
          icon: darkMode ? Moon : Sun,
          label: "Dark Mode",
          value: "",
          toggle: true,
          checked: darkMode,
          onChange: () => setDarkMode(!darkMode),
        },
        {
          icon: Languages,
          label: "Language",
          value: "English",
          onClick: () => {},
        },
        {
          icon: Accessibility,
          label: "Text Size",
          value: "Medium",
          onClick: () => {},
        },
        {
          icon: Globe,
          label: "Region & Timezone",
          value: "United States (EST)",
          onClick: () => {},
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          icon: Globe,
          label: "Help Center",
          value: "Enterprise resources",
          onClick: () => navigate("/help"),
        },
        {
          icon: Mail,
          label: "Enterprise Support",
          value: "24/7 priority assistance",
          onClick: () => {},
        },
        {
          icon: Users,
          label: "Account Manager",
          value: "Contact your dedicated rep",
          onClick: () => {},
        },
        {
          icon: FileText,
          label: "Service Agreement",
          value: "View enterprise contract",
          onClick: () => {},
        },
        {
          icon: Globe,
          label: "Terms of Service",
          value: "",
          onClick: () => {},
        },
        {
          icon: Shield,
          label: "Privacy Policy",
          value: "",
          onClick: () => {},
        },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    navigate("/role-selection");
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem("userRole");
    navigate("/role-selection");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-xl border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/profile")}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h2 className="text-2xl font-bold">Enterprise Settings</h2>
              <p className="text-sm text-muted-foreground">Company preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Company Preview */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                <Building size={32} className="text-white" />
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                <Camera size={14} className="text-white" />
              </button>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">TechCorp Industries</h3>
              <p className="text-sm text-muted-foreground">contact@techcorp.com</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="px-2 py-0.5 bg-orange-500/10 text-orange-500 text-xs font-semibold rounded-full">
                  Enterprise Account
                </div>
                <div className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs font-semibold rounded-full">
                  ✓ Verified
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/profile")}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:opacity-90 transition-all"
            >
              View Profile
            </button>
          </div>
        </div>

        {/* Settings Sections */}
        {settingsSections.map((section, index) => (
          <div key={index}>
            <h3 className="text-sm font-bold text-muted-foreground uppercase mb-3 px-2">
              {section.title}
            </h3>
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex}>
                  {item.toggle ? (
                    <div className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center">
                          <item.icon size={20} className="text-orange-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{item.label}</p>
                          {item.value && (
                            <p className="text-xs text-muted-foreground">{item.value}</p>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={item.onChange}
                        className={`w-12 h-6 rounded-full transition-all relative ${
                          item.checked ? "bg-orange-500" : "bg-secondary"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${
                            item.checked ? "left-7" : "left-1"
                          }`}
                        />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={item.onClick}
                      className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-all text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center">
                          <item.icon size={20} className="text-orange-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{item.label}</p>
                          {item.value && (
                            <p className="text-xs text-muted-foreground">{item.value}</p>
                          )}
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-muted-foreground" />
                    </button>
                  )}
                  {itemIndex < section.items.length - 1 && (
                    <div className="border-b border-border ml-16" />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Danger Zone */}
        <div>
          <h3 className="text-sm font-bold text-muted-foreground uppercase mb-3 px-2">
            Danger Zone
          </h3>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center">
                  <LogOut size={20} className="text-red-500" />
                </div>
                <div>
                  <p className="font-semibold text-red-500">Log Out</p>
                  <p className="text-xs text-muted-foreground">Sign out of your account</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>

            <div className="border-b border-border ml-16" />

            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center justify-between p-4 hover:bg-secondary/50 transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/10 rounded-full flex items-center justify-center">
                  <Trash2 size={20} className="text-red-500" />
                </div>
                <div>
                  <p className="font-semibold text-red-500">Delete Enterprise Account</p>
                  <p className="text-xs text-muted-foreground">
                    Permanently delete company account
                  </p>
                </div>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* App Version */}
        <div className="text-center text-sm text-muted-foreground py-4">
          <p>CoTask Enterprise v1.0.0</p>
          <p className="text-xs mt-1">© 2026 CoTask. All rights reserved.</p>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl p-6 max-w-md w-full"
          >
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 size={32} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">Delete Enterprise Account?</h3>
            <p className="text-muted-foreground text-center mb-6">
              Are you sure you want to delete your enterprise account? This action cannot be
              undone. All company data, team members, billing history, and active tasks will be
              permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 bg-secondary text-foreground rounded-xl font-semibold hover:bg-secondary/80 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
