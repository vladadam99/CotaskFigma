import { useNavigate } from "react-router";
import { ArrowLeft, User, Bell, Lock, HelpCircle, Info, LogOut, ChevronRight, Shield, Globe, Moon, Volume2, Eye, Smartphone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function Settings() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole") || "user";
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("avatarOnboardingData");
    localStorage.removeItem("avatarAccountInfo");
    navigate("/");
  };

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { 
          icon: User, 
          label: "Edit Profile", 
          action: () => navigate("/profile"),
          showArrow: true 
        },
        { 
          icon: Lock, 
          label: "Change Password", 
          action: () => {},
          showArrow: true 
        },
      ]
    },
    {
      title: "Preferences",
      items: [
        { 
          icon: Bell, 
          label: "Notifications", 
          action: () => setNotificationsEnabled(!notificationsEnabled),
          showArrow: false,
          toggle: true,
          toggleValue: notificationsEnabled
        },
        { 
          icon: Moon, 
          label: "Dark Mode", 
          action: () => setDarkMode(!darkMode),
          showArrow: false,
          toggle: true,
          toggleValue: darkMode
        },
        { 
          icon: Globe, 
          label: "Language", 
          action: () => {},
          showArrow: true,
          subtitle: "English"
        },
        { 
          icon: Volume2, 
          label: "Sound & Vibration", 
          action: () => {},
          showArrow: true 
        },
      ]
    },
    {
      title: "Privacy & Security",
      items: [
        { 
          icon: Shield, 
          label: "Privacy Settings", 
          action: () => {},
          showArrow: true 
        },
        { 
          icon: Eye, 
          label: "Blocked Users", 
          action: () => {},
          showArrow: true 
        },
        { 
          icon: Smartphone, 
          label: "Connected Devices", 
          action: () => {},
          showArrow: true 
        },
      ]
    },
    {
      title: "Support",
      items: [
        { 
          icon: HelpCircle, 
          label: "Help Center", 
          action: () => {},
          showArrow: true 
        },
        { 
          icon: Info, 
          label: "About CoTask", 
          action: () => {},
          showArrow: true 
        },
      ]
    }
  ];

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div 
        className="sticky top-0 z-20 backdrop-blur-[20px] border-b"
        style={{
          background: "rgba(45, 21, 21, 0.9)",
          borderColor: "rgba(255, 255, 255, 0.08)"
        }}
      >
        <div className="px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate(userRole === "avatar" ? "/avatar-home" : "/home")}
            className="w-10 h-10 border rounded-full flex items-center justify-center active:scale-95 transition-all"
            style={{ background: "rgba(255, 255, 255, 0.05)", borderColor: "rgba(255, 255, 255, 0.08)" }}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
            <p className="text-sm" style={{ color: "#9CA3AF" }}>Manage your preferences</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* User Info Card */}
        <div 
          className="rounded-2xl p-5 border backdrop-blur-[20px]"
          style={{ 
            background: "rgba(45, 21, 21, 0.6)",
            borderColor: "rgba(255, 255, 255, 0.08)",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)"
          }}
        >
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)" }}
            >
              <User className="text-white" size={32} />
            </div>
            <div className="flex-1">
              <p className="text-lg font-semibold text-white">
                {userRole === "avatar" ? "Avatar User" : "User"}
              </p>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>user@cotask.com</p>
            </div>
          </div>
        </div>

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="text-sm font-semibold mb-3" style={{ color: "#9CA3AF" }}>
              {group.title}
            </h3>
            <div 
              className="rounded-2xl border backdrop-blur-[20px] overflow-hidden"
              style={{ 
                background: "rgba(45, 21, 21, 0.6)",
                borderColor: "rgba(255, 255, 255, 0.08)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.5)"
              }}
            >
              {group.items.map((item, itemIndex) => (
                <motion.button
                  key={itemIndex}
                  whileTap={{ scale: 0.98 }}
                  onClick={item.action}
                  className="w-full px-5 py-4 flex items-center gap-4 border-b last:border-b-0 active:scale-95 transition-all"
                  style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(220, 38, 38, 0.15)" }}
                  >
                    <item.icon style={{ color: "#DC2626" }} size={20} />
                  </div>
                  <span className="flex-1 text-left text-white font-medium">{item.label}</span>
                  {item.subtitle && !item.toggle && (
                    <span className="text-sm" style={{ color: "#9CA3AF" }}>{item.subtitle}</span>
                  )}
                  {item.toggle && (
                    <div 
                      className="relative w-12 h-6 rounded-full transition-colors"
                      style={{ 
                        background: item.toggleValue 
                          ? "linear-gradient(135deg, #DC2626 0%, #991B1B 100%)" 
                          : "rgba(255, 255, 255, 0.1)"
                      }}
                    >
                      <div 
                        className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform"
                        style={{ 
                          transform: item.toggleValue ? "translateX(24px)" : "translateX(0)"
                        }}
                      />
                    </div>
                  )}
                  {item.showArrow && <ChevronRight size={20} style={{ color: "#9CA3AF" }} />}
                </motion.button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold border transition-all active:scale-95"
          style={{
            background: "rgba(220, 38, 38, 0.15)",
            borderColor: "rgba(220, 38, 38, 0.3)",
            color: "#DC2626"
          }}
        >
          <LogOut size={20} />
          Log Out
        </motion.button>

        {/* App Version */}
        <div className="text-center pt-4">
          <p className="text-xs" style={{ color: "#9CA3AF" }}>
            CoTask Beta v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
}