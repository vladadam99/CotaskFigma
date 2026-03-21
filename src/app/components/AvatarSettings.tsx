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
  Video,
  DollarSign,
  Languages,
  Accessibility,
  Wifi,
  Battery,
  Smartphone,
  Glasses,
  Clock,
  Target,
  TrendingUp,
} from "lucide-react";
import BottomNav from "./BottomNav";

export default function AvatarSettings() {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [publicProfile, setPublicProfile] = useState(true);
  const [autoAcceptBookings, setAutoAcceptBookings] = useState(false);
  const [instantPayouts, setInstantPayouts] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const settingsSections = [
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Edit Profile",
          value: "Update your avatar profile",
          onClick: () => navigate("/profile"),
        },
        {
          icon: Mail,
          label: "Email",
          value: "avatar@email.com",
          onClick: () => {},
        },
        {
          icon: Phone,
          label: "Phone Number",
          value: "+1 (555) 987-6543",
          onClick: () => {},
        },
        {
          icon: MapPin,
          label: "Service Locations",
          value: "New York, NY • 2 more",
          onClick: () => {},
        },
      ],
    },
    {
      title: "Creator Settings",
      items: [
        {
          icon: publicProfile ? Eye : EyeOff,
          label: "Public Profile",
          value: "Visible in operator search",
          toggle: true,
          checked: publicProfile,
          onChange: () => setPublicProfile(!publicProfile),
        },
        {
          icon: Target,
          label: "Auto-Accept Bookings",
          value: "Automatically accept new jobs",
          toggle: true,
          checked: autoAcceptBookings,
          onChange: () => setAutoAcceptBookings(!autoAcceptBookings),
        },
        {
          icon: Clock,
          label: "Availability Schedule",
          value: "Set your working hours",
          onClick: () => {},
        },
        {
          icon: DollarSign,
          label: "Pricing & Rates",
          value: "$45/hour",
          onClick: () => {},
        },
        {
          icon: Video,
          label: "Service Categories",
          value: "Manage what you offer",
          onClick: () => {},
        },
      ],
    },
    {
      title: "Equipment & Streaming",
      items: [
        {
          icon: Smartphone,
          label: "Connected Devices",
          value: "Phone, Smart Glasses",
          onClick: () => {},
        },
        {
          icon: Video,
          label: "Stream Quality",
          value: "HD 1080p",
          onClick: () => {},
        },
        {
          icon: Battery,
          label: "Low Battery Alert",
          value: "Get notified at 20%",
          onClick: () => {},
        },
        {
          icon: Wifi,
          label: "Network Preferences",
          value: "Wi-Fi only for live streams",
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
          icon: Target,
          label: "New Job Requests",
          value: "Get notified immediately",
          onClick: () => {},
        },
        {
          icon: DollarSign,
          label: "Payment Received",
          value: "Earnings notifications",
          onClick: () => {},
        },
        {
          icon: TrendingUp,
          label: "Performance Updates",
          value: "Ratings & reviews",
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
          label: "Privacy Settings",
          value: "Control who sees your info",
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
          value: "Enabled",
          onClick: () => {},
        },
        {
          icon: Eye,
          label: "Blocked Users",
          value: "Manage blocked clients",
          onClick: () => {},
        },
      ],
    },
    {
      title: "Payments & Earnings",
      items: [
        {
          icon: DollarSign,
          label: "Instant Payouts",
          value: "Get paid immediately",
          toggle: true,
          checked: instantPayouts,
          onChange: () => setInstantPayouts(!instantPayouts),
        },
        {
          icon: CreditCard,
          label: "Payment Methods",
          value: "Bank accounts & cards",
          onClick: () => navigate("/payment-methods"),
        },
        {
          icon: DollarSign,
          label: "Earnings Dashboard",
          value: "View detailed analytics",
          onClick: () => navigate("/operator-dashboard"),
        },
        {
          icon: CreditCard,
          label: "Tax Information",
          value: "W-9 & 1099 forms",
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
          value: "Avatar resources",
          onClick: () => navigate("/help"),
        },
        {
          icon: Mail,
          label: "Contact Support",
          value: "Get creator assistance",
          onClick: () => {},
        },
        {
          icon: Video,
          label: "Creator Guidelines",
          value: "Best practices & policies",
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
              <h2 className="text-2xl font-bold">Creator Settings</h2>
              <p className="text-sm text-muted-foreground">Avatar preferences</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Profile Preview */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400"
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-2 border-background">
                <Camera size={14} className="text-white" />
              </button>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">Sarah Chen</h3>
              <p className="text-sm text-muted-foreground">avatar@email.com</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                  Avatar Account
                </div>
                <div className="px-2 py-0.5 bg-green-500/10 text-green-500 text-xs font-semibold rounded-full">
                  ⭐ 4.9 Rating
                </div>
              </div>
            </div>
            <button
              onClick={() => navigate("/profile")}
              className="px-4 py-2 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all"
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
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <item.icon size={20} className="text-primary" />
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
                          item.checked ? "bg-primary" : "bg-secondary"
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
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <item.icon size={20} className="text-primary" />
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
                  <p className="font-semibold text-red-500">Delete Account</p>
                  <p className="text-xs text-muted-foreground">
                    Permanently delete your creator account
                  </p>
                </div>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* App Version */}
        <div className="text-center text-sm text-muted-foreground py-4">
          <p>CoTask Creator v1.0.0</p>
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
            <h3 className="text-xl font-bold text-center mb-2">Delete Creator Account?</h3>
            <p className="text-muted-foreground text-center mb-6">
              Are you sure you want to delete your creator account? This action cannot be undone.
              All your earnings data, sessions, and ratings will be permanently deleted.
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
